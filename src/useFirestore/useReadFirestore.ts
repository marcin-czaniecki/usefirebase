import * as firestore from 'firebase/firestore';
import { useMemo } from 'react';

export const useReadFirestore = (db: firestore.Firestore) => {
  const collection = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.collection(db, path, ...pathSegments) as firestore.CollectionReference<AppModelType, DbModelType>,
    [db],
  );

  const getDocs = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.getDocs<AppModelType, DbModelType>(collection(path, ...pathSegments)),
    [collection],
  );

  const doc = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.doc(db, path, ...pathSegments) as firestore.DocumentReference<AppModelType, DbModelType>,
    [db],
  );

  const getDoc = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.getDoc<AppModelType, DbModelType>(doc(path, ...pathSegments)),
    [doc],
  );

  const onSnapshot = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
      (callback: (snapshot: firestore.QuerySnapshot<AppModelType, DbModelType>) => void) =>
        firestore.onSnapshot<AppModelType, DbModelType>(collection(path, ...pathSegments), callback),
    [collection],
  );

  const query = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, constraints: firestore.QueryConstraint[], ...pathSegments: string[]) =>
        firestore.query<AppModelType, DbModelType>(collection(path, ...pathSegments), ...constraints),
    [collection],
  );

  return {
    firestore: db,
    getDocs,
    getDoc,
    onSnapshot,
    query,
  };
};
