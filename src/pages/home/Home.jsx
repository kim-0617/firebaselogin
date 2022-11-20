import React from 'react';
import styles from './Home.module.css';
import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

function Home() {
    const { user } = useAuthContext();
    const { documents, error } = useCollection('diary', ["uid", "==", user.uid]);

    return (
        <>
            <main className={styles.cont}>
                <aside className={styles.side}>
                    <DiaryForm uid={user.uid}></DiaryForm>
                </aside>
                <ul className={styles.list}>
                    {error && <strong>{error}</strong>}
                    {documents && <DiaryList diary={documents}></DiaryList>}
                </ul>
            </main>
        </>
    );
}

export default Home