import { initializeApp, cert } from "firebase-admin/app"
import { getStorage } from "firebase-admin/storage"

let serviceAccount
if (process.env.FIREBASE_CREDENTIALS) {
  serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)
}

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

export const bucket = getStorage().bucket()
