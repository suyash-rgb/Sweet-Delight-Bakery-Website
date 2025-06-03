// npm i firebase
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
  projectId: 'YOUR_FIREBASE_PROJECT_ID',
  storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Auth Helpers
const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

const logOut = () => signOut(auth)

const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

// Firestore Helpers
const ordersCollection = collection(db, 'orders')
const productsCollection = collection(db, 'products')
const customOrdersCollection = collection(db, 'customOrders')

const fetchProducts = async () => {
  const snapshot = await getDocs(productsCollection)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

const fetchUserOrders = async (userId) => {
  const q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// ✅ Add Update Functions Here:
const updateProductStock = async (productId, newStock) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, { stock: newStock });
};

const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, { status });
};


const addOrder = async (order) => {
  const docRef = await addDoc(ordersCollection, order)
  return docRef.id
}

const addCustomOrder = async (customOrder) => {
  const docRef = await addDoc(customOrdersCollection, customOrder)
  return docRef.id
}

// Real-time stock updates listener (example)
const subscribeStockUpdates = (callback) => {
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(products)
  })
}

export {
  auth,
  signUp,
  logIn,
  logOut,
  onAuthChange,
  fetchProducts,
  fetchUserOrders,
  addOrder,
  addCustomOrder,
  subscribeStockUpdates,
  updateOrderStatus,
  updateProductStock
}