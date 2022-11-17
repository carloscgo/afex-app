/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  orderBy,
  doc
} from 'firebase/firestore/lite';

import { VITE_APP } from '../constants';
import { mapError } from './'

const store = initializeApp({
  apiKey: VITE_APP.FIREBASE.KEY,
  authDomain: VITE_APP.FIREBASE.AUTHDOMAIN,
  projectId: VITE_APP.FIREBASE.PROJECTID,
  storageBucket: VITE_APP.FIREBASE.STORAGEBUCKET,
  messagingSenderId: VITE_APP.FIREBASE.MESSAGINGSENDERID,
  appId: VITE_APP.FIREBASE.APPID
});

const db = getFirestore(store);

interface IVideo {
  id: string;
  url: string;
  title: string;
  summary: string;
  thumbnail: string;
}

class DataService {
  private error: string = ''
  private PATH: string = 'youtube-video'

  getError() {
    return this.error
  }

  setError(message: string) {
    this.error = mapError(message) as string
  }

  async getAll() {
    const videos = query(collection(db, this.PATH), orderBy('timestamp', 'desc'));

    return getDocs(videos);
  }

  async create(video: IVideo) {
    try {
      await addDoc(collection(db, this.PATH), {
        ...video,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      this.setError(err as string)
    }
  }

  async delete(key: string) {
    try {
      await deleteDoc(doc(db, this.PATH, key));
    } catch (err) {
      this.setError(err as string)
    }
  }
}

export default new DataService()