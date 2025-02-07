import type { Firestore } from 'firebase/firestore';
import { useWriteFirestore } from './useWriteFirestore';
import { useReadFirestore } from './useReadFirestore';
import { useMutationFirestore } from './useMutationFirestore ';

export function useFirestore(db: Firestore) {
  return {
    ...useReadFirestore(db),
    ...useWriteFirestore(db),
    ...useMutationFirestore(db),
  };
}
