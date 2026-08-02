import { ref, computed } from 'vue'
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useFirebase } from './useFirebase'

export function useFirestore() {
  const { userId } = useFirebase()
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Generic CRUD operations
  const addDocument = async (collectionName: string, data: DocumentData) => {
    if (!userId.value) {
      throw new Error('User must be authenticated')
    }

    try {
      loading.value = true
      error.value = null
      
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        userId: userId.value,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      return { success: true, id: docRef.id }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateDocument = async (collectionName: string, docId: string, data: DocumentData) => {
    try {
      loading.value = true
      error.value = null
      
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      })
      
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteDocument = async (collectionName: string, docId: string) => {
    try {
      loading.value = true
      error.value = null
      
      const docRef = doc(db, collectionName, docId)
      await deleteDoc(docRef)
      
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getDocument = async (collectionName: string, docId: string) => {
    try {
      loading.value = true
      error.value = null
      
      const docRef = doc(db, collectionName, docId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } }
      } else {
        return { success: false, error: 'Document not found' }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getDocuments = async (collectionName: string, constraints: any[] = []) => {
    try {
      loading.value = true
      error.value = null
      
      let q = query(collection(db, collectionName))
      
      // Add user constraint if user is authenticated
      if (userId.value) {
        q = query(q, where('userId', '==', userId.value))
      }
      
      // Add additional constraints
      constraints.forEach(constraint => {
        q = query(q, constraint)
      })
      
      const querySnapshot = await getDocs(q)
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      return { success: true, data: documents }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Real-time listener
  const subscribeToCollection = (
    collectionName: string, 
    callback: (docs: any[]) => void,
    constraints: any[] = []
  ) => {
    if (!userId.value) {
      console.warn('User must be authenticated to subscribe to collection')
      return () => {}
    }

    let q = query(collection(db, collectionName), where('userId', '==', userId.value))
    
    constraints.forEach(constraint => {
      q = query(q, constraint)
    })

    return onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      callback(documents)
    })
  }

  return {
    // State
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    
    // Methods
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
    subscribeToCollection
  }
}
