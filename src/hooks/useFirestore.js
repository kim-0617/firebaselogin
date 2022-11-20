import { useReducer } from 'react';
import { addDoc, deleteDoc, collection, doc } from 'firebase/firestore';
import { appFireStore, timestamp } from '../firebase/config';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return { isPending: true, document: null, error: null, success: false };
    case 'addDoc':
      return { isPending: false, document: action.payload, error: null, success: true };
    case 'deleteDoc':
      return { isPending: false, document: action.payload, error: null, success: true };
    case 'error':
      return { isPending: false, document: null, error: action.payload, success: false };
    default:
      return { ...state };
  }
};

// 저장할 컬렉션을 인자로 전달합니다.
export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initialState);

  // 컬렉션의 참조를 요구합니다.
  const colRef = collection(appFireStore, transaction);

  // 컬렉션에 문서를 추가합니다.
  const addDocument = async (doc) => {
    dispatch({ type: 'isPending' });

    try {
      const created = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, created });
      console.log(docRef);
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: 'isPending' });

    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: 'deleteDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  return { addDocument, deleteDocument, response };
};
