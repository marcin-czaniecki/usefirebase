import { useMemo } from 'react';
import * as firestore from 'firebase/firestore';

export const useWriteFirestore = (
  db: firestore.Firestore,
  doc: <AppModelType, DbModelType extends firestore.DocumentData>(
    path: string,
    ...pathSegments: string[]
  ) => firestore.DocumentReference<AppModelType, DbModelType>,
) => {
  const setDoc = useMemo(
    () =>
      <AppModelType extends firestore.DocumentData, DbModelType extends firestore.WithFieldValue<AppModelType>>(
        path: string,
        data: DbModelType,
        ...pathSegments: string[]
      ) =>
        firestore.setDoc(doc<AppModelType, DbModelType>(path, ...pathSegments), data),
    [doc],
  );

  const updateDoc = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, data: firestore.UpdateData<DbModelType>, ...pathSegments: string[]) =>
        firestore.updateDoc(doc<AppModelType, DbModelType>(path, ...pathSegments), data),
    [doc],
  );

  const deleteDoc = useMemo(
    () =>
      (path: string, ...pathSegments: string[]) =>
        firestore.deleteDoc(doc(path, ...pathSegments)),
    [doc],
  );

  return {
    firestore: db,
    setDoc,
    updateDoc,
    deleteDoc,
  };
};
