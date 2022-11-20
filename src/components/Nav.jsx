import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import styles from './Nav.module.css';

function Nav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}><Link to='/'>오늘의 이슈</Link></h1>
            <ul className={styles.menu}>
                {user === null ? <>
                    <li>
                        <Link to='./login'>로그인</Link>
                    </li>
                    <li>
                        <Link to='./signup'>회원가입</Link>
                    </li>
                </> : <>
                    <li>
                        <strong>환영합니다 {user.displayName}님!</strong>
                        <button type='button' onClick={logout}>로그아웃</button>
                    </li>
                </>}

            </ul>
        </nav>
    )
}

export default Nav