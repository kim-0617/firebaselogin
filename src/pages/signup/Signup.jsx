import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';


function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [mismatchError, setMismatchError] = useState(false);

    // hook
    const { error, ispending, signup } = useSignup();

    const handleData = (e) => {
        if (e.target.id === 'myEmail') {
            setEmail(e.target.value);
        }
        else if (e.target.id === 'myPassword') {
            setPassword(e.target.value);
            setMismatchError(e.target.value !== passwordCheck);
        }
        else if (e.target.id === 'myNickname') {
            setName(e.target.value);
        }
        else if (e.target.id === 'myPasswordCheck') {
            setPasswordCheck(e.target.value);
            setMismatchError(e.target.value !== password);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, name, password, passwordCheck);
        if (!mismatchError) {
            signup(email, password, name);
        }
    };

    const { user } = useAuthContext();

    if (user) {
        return <Navigate replace to="/" />
    }

    return (
        <>
            <h2 className={styles.title}>Sign up</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>회원가입</legend>
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
                        <label htmlFor="myNickname">닉네임</label>
                        <input
                            type="text"
                            id="myNickname"
                            required
                            onChange={handleData}
                            value={name}
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

                    <div>
                        <label htmlFor="myPasswordCheck">비밀번호 확인</label>
                        <input
                            type="password"
                            id="myPasswordCheck"
                            required
                            onChange={handleData}
                            value={passwordCheck}
                        />
                    </div>
                    {mismatchError && <div className={styles.error}>비밀번호가 일치하지 않습니다.</div>}

                    <button type="submit" className={styles.button}>
                        회원가입
                    </button>
                </fieldset>
            </form>
        </>
    );
}

export default SignUp