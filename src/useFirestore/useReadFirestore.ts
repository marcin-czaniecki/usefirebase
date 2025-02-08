import * as firestore from 'firebase/firestore';
import { useMemo } from 'react';

export const useReadFirestore = (
  db: firestore.Firestore,
  doc: <AppModelType, DbModelType extends firestore.DocumentData>(
    path: string,
    ...pathSegments: string[]
  ) => firestore.DocumentReference<AppModelType, DbModelType>,
  collection: <AppModelType, DbModelType extends firestore.DocumentData>(
    path: string,
    ...pathSegments: string[]
  ) => firestore.CollectionReference<AppModelType, DbModelType>,
) => {
  const getDocs = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.getDocs<AppModelType, DbModelType>(collection(path, ...pathSegments)),
    [collection],
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
      <AppModelType, DbModelType extends firestore.DocumentData>(constraints: firestore.QueryConstraint[], path: string, ...pathSegments: string[]) =>
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
