import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { v4 as uuidv4 } from 'uuid';
import { Trip, DieselConsumptionRecord, MissedLoad } from './types';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSvvlVBiZ_QL-FVkjFrQBKIajkIhXNZgE",
  authDomain: "matanuska-491ad.firebaseapp.com",
  databaseURL: "https://matanuska-491ad-default-rtdb.firebaseio.com",
  projectId: "matanuska-491ad",
  storageBucket: "matanuska-491ad.appspot.com",
  messagingSenderId: "801621513780",
  appId: "1:801621513780:web:e78dc5bc75d846932e1c61",
  measurementId: "G-52ZKDP6J7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// Trip Services
export const tripsCollection = collection(db, 'trips');

export const addTripToFirebase = async (tripData: Trip): Promise<string> => {
  try {
    const docRef = await addDoc(tripsCollection, tripData);
    console.log("Trip added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding trip: ", error);
    throw error;
  }
};

export const updateTripInFirebase = async (id: string, tripData: Partial<Trip>): Promise<void> => {
  try {
    const tripRef = doc(db, 'trips', id);
    await updateDoc(tripRef, tripData);
    console.log("Trip updated: ", id);
  } catch (error) {
    console.error("Error updating trip: ", error);
    throw error;
  }
};

export const deleteTripFromFirebase = async (id: string): Promise<void> => {
  try {
    const tripRef = doc(db, 'trips', id);
    await deleteDoc(tripRef);
    console.log("Trip deleted: ", id);
  } catch (error) {
    console.error("Error deleting trip: ", error);
    throw error;
  }
};

// Real-time listeners
export const listenToTrips = (callback: (trips: Trip[]) => void): (() => void) => {
  const q = query(tripsCollection, orderBy('startDate', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const trips: Trip[] = [];
    snapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() } as Trip);
    });
    callback(trips);
  });
};

// Diesel Records Services
export const dieselCollection = collection(db, 'diesel');

export const addDieselToFirebase = async (dieselData: DieselConsumptionRecord): Promise<string> => {
  try {
    const docRef = await addDoc(dieselCollection, dieselData);
    console.log("Diesel record added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding diesel record: ", error);
    throw error;
  }
};

export const updateDieselInFirebase = async (id: string, dieselData: Partial<DieselConsumptionRecord>): Promise<void> => {
  try {
    const dieselRef = doc(db, 'diesel', id);
    await updateDoc(dieselRef, dieselData);
    console.log("Diesel record updated: ", id);
  } catch (error) {
    console.error("Error updating diesel record: ", error);
    throw error;
  }
};

export const deleteDieselFromFirebase = async (id: string): Promise<void> => {
  try {
    const dieselRef = doc(db, 'diesel', id);
    await deleteDoc(dieselRef);
    console.log("Diesel record deleted: ", id);
  } catch (error) {
    console.error("Error deleting diesel record: ", error);
    throw error;
  }
};

export const listenToDieselRecords = (callback: (records: DieselConsumptionRecord[]) => void): (() => void) => {
  const q = query(dieselCollection, orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const records: DieselConsumptionRecord[] = [];
    snapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() } as DieselConsumptionRecord);
    });
    callback(records);
  });
};

// Missed Loads Services
export const missedLoadsCollection = collection(db, 'missedLoads');

export const addMissedLoadToFirebase = async (loadData: MissedLoad): Promise<string> => {
  try {
    const docRef = await addDoc(missedLoadsCollection, loadData);
    console.log("Missed load added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding missed load: ", error);
    throw error;
  }
};

export const updateMissedLoadInFirebase = async (id: string, loadData: Partial<MissedLoad>): Promise<void> => {
  try {
    const loadRef = doc(db, 'missedLoads', id);
    await updateDoc(loadRef, loadData);
    console.log("Missed load updated: ", id);
  } catch (error) {
    console.error("Error updating missed load: ", error);
    throw error;
  }
};

export const deleteMissedLoadFromFirebase = async (id: string): Promise<void> => {
  try {
    const loadRef = doc(db, 'missedLoads', id);
    await deleteDoc(loadRef);
    console.log("Missed load deleted: ", id);
  } catch (error) {
    console.error("Error deleting missed load: ", error);
    throw error;
  }
};

export const listenToMissedLoads = (callback: (loads: MissedLoad[]) => void): (() => void) => {
  const q = query(missedLoadsCollection, orderBy('recordedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const loads: MissedLoad[] = [];
    snapshot.forEach((doc) => {
      loads.push({ id: doc.id, ...doc.data() } as MissedLoad);
    });
    callback(loads);
  });
};

// Helper function to generate trip IDs
export const generateTripId = (): string => {
  return uuidv4();
};