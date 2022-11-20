import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore';

function DiaryForm({ uid }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { addDocument, response } = useFirestore('diary');

    const handleData = (e) => {
        if (e.target.id === 'title') {
            setTitle(e.target.value);
        }
        else if (e.target.id === 'desc') {
            setDesc(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid, title, desc
        });
    }

    useEffect(() => {
        if (response.success) {
            setTitle('');
            setDesc('');
        }
    }, [response.success]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>오늘의 이슈</legend>
                    <div>
                        <label htmlFor="title">제목</label>
                        <input type="text" id='title' onChange={handleData} value={title} required placeholder='title' />
                    </div>
                    <div>
                        <label htmlFor="desc">내용</label>
                        <textarea id="desc" onChange={handleData} value={desc} placeholder="message" required></textarea>
                    </div>
                    <button type='submit'>저장하기</button>
                </fieldset>
            </form>
        </>
    )
}

export default DiaryForm