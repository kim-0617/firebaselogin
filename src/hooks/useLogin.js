import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  // 현재 서버와의 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = (email, password) => {
    setError(null); // 아직은 에러 없음
    setIsPending(true); // 통신 진행중

    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (!user) {
          throw new Error('회원가입 실패');
        }
        dispatch({ type: 'login', payload: user });
        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { error, isPending, login };
};
