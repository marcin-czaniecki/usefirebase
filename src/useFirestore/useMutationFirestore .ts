import { useMemo } from 'react';
import * as firestore from 'firebase/firestore';

export const useMutationFirestore = (db: firestore.Firestore) => {
  const batch = useMemo(() => firestore.writeBatch(db), [db]);

  const batchSet = useMemo(
    () =>
      <AppModelType extends firestore.DocumentData>(path: string, data: firestore.WithFieldValue<AppModelType>, ...pathSegments: string[]) => {
        const docRef = firestore.doc(db, path, ...pathSegments) as firestore.DocumentReference<AppModelType>;
        batch.set(docRef, data);
      },
    [batch, db],
  );

  const batchUpdate = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, data: firestore.UpdateData<DbModelType>, ...pathSegments: string[]) => {
        const docRef = firestore.doc(db, path, ...pathSegments) as firestore.DocumentReference<AppModelType, DbModelType>;
        batch.update(docRef, data);
      },
    [batch, db],
  );

  const batchDelete = useMemo(
    () =>
      (path: string, ...pathSegments: string[]) => {
        const docRef = firestore.doc(db, path, ...pathSegments);
        batch.delete(docRef);
      },
    [batch, db],
  );

  const commit = useMemo(() => () => batch.commit(), [batch]);

  return {
    firestore: db,
    batchSet,
    batchUpdate,
    batchDelete,
    commit,
  };
};
