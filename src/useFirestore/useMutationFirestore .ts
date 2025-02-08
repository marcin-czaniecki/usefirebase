import { useMemo } from 'react';
import * as firestore from 'firebase/firestore';

export const useMutationFirestore = (
  db: firestore.Firestore,
  doc: <AppModelType, DbModelType extends firestore.DocumentData = firestore.DocumentData>(
    path: string,
    ...pathSegments: string[]
  ) => firestore.DocumentReference<AppModelType, DbModelType>,
) => {
  const batch = useMemo(() => firestore.writeBatch(db), [db]);

  const batchSet = useMemo(
    () =>
      <AppModelType>(data: firestore.WithFieldValue<AppModelType>, path: string, ...pathSegments: string[]) => {
        batch.set(doc<AppModelType>(path, ...pathSegments), data);
      },
    [batch, db],
  );

  const batchUpdate = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(data: firestore.UpdateData<DbModelType>, path: string, ...pathSegments: string[]) => {
        batch.update(doc<AppModelType>(path, ...pathSegments), data);
      },
    [batch, db],
  );

  const batchDelete = useMemo(
    () =>
      (path: string, ...pathSegments: string[]) => {
        batch.delete(doc(path, ...pathSegments));
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
