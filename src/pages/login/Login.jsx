import styles from './Login.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isPending, login } = useLogin();

  const handleData = (e) => {
    if (e.target.type === 'email') {
      setEmail(e.target.value)
    } else if (e.target.type === 'password') {
      setPassword(e.target.value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const { user } = useAuthContext();

  if (user) {
    return <Navigate replace to="/" />
  }

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>로그인</legend>
          <div>
            <label htmlFor="myEmail">이메일 주소</label>
            <input
              type="email"
              id="myEmail"
              required
              onChange={handleData}
              value={email}
            />
          </div>

          <div>
            <label htmlFor="myPassword">비밀번호</label>
            <input
              type="password"
              id="myPassword"
              required
              onChange={handleData}
              value={password}
            />
          </div>

          {!isPending ? <button type="submit" className={styles.button}>로그인</button> : <strong>로그인 진행중...</strong>}
          {error && <strong>{error}</strong>}
        </fieldset>
      </form>
      <p className={styles.signup}>아직 회원이 아니신가요?&nbsp;<Link to='/signup'>회원가입 하러가기</Link></p>
    </>
  );
}

export default Login;
