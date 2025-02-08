import * as firestore from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { useWriteFirestore } from './useWriteFirestore';
import { useReadFirestore } from './useReadFirestore';
import { useMutationFirestore } from './useMutationFirestore ';
import { useMemo } from 'react';

export function useFirestore(db: Firestore) {
  const doc = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.doc(db, path, ...pathSegments) as firestore.DocumentReference<AppModelType, DbModelType>,
    [db],
  );

  const collection = useMemo(
    () =>
      <AppModelType, DbModelType extends firestore.DocumentData>(path: string, ...pathSegments: string[]) =>
        firestore.collection(db, path, ...pathSegments) as firestore.CollectionReference<AppModelType, DbModelType>,
    [db],
  );

  return {
    doc,
    collection,
    ...useReadFirestore(db, doc, collection),
    ...useWriteFirestore(db, doc),
    ...useMutationFirestore(db),
  };
}
