# useFirebase

> React Hooks for Firebase integration

## Description

This library provides convenient hooks for integrating Firebase into React applications.
Features include:

- The `FirebaseProvider` context for initializing Firebase.
- The `useFirebase` hook to retrieve instances of Firebase App, Auth, and Firestore.
- The `useFirestore` hook that offers methods for Firestore operations.

## Installation

```bash
npm install @janossik/usefirebase
```

## Setup

1. Import the provider and wrap your application:

```tsx
// ...existing code...
import { FirebaseProvider } from '@janossik/usefirebase';

const options = {
  /* Firebase configuration */
};

ReactDOM.render(
  <FirebaseProvider options={options} enableAuth={true} enableFirestore={true}>
    <App />
  </FirebaseProvider>,
  document.getElementById('root'),
);
```

## Usage

In your components, you can use the `useFirebase` hook:

```tsx
// ...existing code...
import { useFirebase } from '@janossik/usefirebase';

const MyComponent = () => {
  const { getFirestore, getAuth } = useFirebase();
  const firestoreUtils = getFirestore();
  const authInstance = getAuth();

  // ...use the instances for your operations...
  return <div>My Firebase App</div>;
};
```

## Using `useFirestore`

The `useFirestore` hook provides several methods to interact with Firestore. Here's how you can use it in your components:

```tsx
import { useFirebase } from '@janossik/usefirebase';

const FirestoreComponent = () => {
  const { getFirestore } = useFirebase();
  const { getDocs, getDoc, onSnapshot, query, setDoc, updateDoc, deleteDoc, batchSet, batchUpdate, batchDelete, commit } = getFirestore();

  // Example: Fetching documents from a collection
  useEffect(() => {
    const fetchDocuments = async () => {
      const snapshot = await getDocs('collectionName');
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    };

    fetchDocuments();
  }, [getDocs]);

  // Example: Fetching a single document
  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = await getDoc('collectionName/docId');
      console.log(docRef.id, '=>', docRef.data());
    };

    fetchDocument();
  }, [getDoc]);

  // Example: Real-time updates with onSnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot('collectionName', (snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    });

    return () => unsubscribe();
  }, [onSnapshot]);

  // Example: Querying documents with constraints
  useEffect(() => {
    const fetchQuery = async () => {
      const constraints = [
        /* your query constraints */
      ];
      const snapshot = await query('collectionName', constraints);
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    };

    fetchQuery();
  }, [query]);

  // Example: Setting a document
  const handleSetDoc = async () => {
    await setDoc('collectionName/docId', { field: 'value' });
  };

  // Example: Updating a document
  const handleUpdateDoc = async () => {
    await updateDoc('collectionName/docId', { field: 'newValue' });
  };

  // Example: Deleting a document
  const handleDeleteDoc = async () => {
    await deleteDoc('collectionName/docId');
  };

  // Example: Batch operations
  const handleBatchOperations = async () => {
    batchSet('collectionName/docId1', { field: 'value1' });
    batchUpdate('collectionName/docId2', { field: 'value2' });
    batchDelete('collectionName/docId3');
    await commit();
  };

  return (
    <div>
      <button onClick={handleSetDoc}>Set Document</button>
      <button onClick={handleUpdateDoc}>Update Document</button>
      <button onClick={handleDeleteDoc}>Delete Document</button>
      <button onClick={handleBatchOperations}>Batch Operations</button>
    </div>
  );
};
```

This example demonstrates how to fetch documents, fetch a single document, listen for real-time updates, query documents, set a document, update a document, delete a document, and perform batch operations using the `useFirestore` hook.

## Testing and Building

- To check the code, run:
  ```bash
  npm run lint
  ```
- To build the project:
  ```bash
  npm run build
  ```

## License

This project is released under the MIT License.
