import React from 'react'
import { useFirestore } from '../../hooks/useFirestore'

function DiaryList({ diary }) {
    const { deleteDocument } = useFirestore('diary');

    return (
        <>
            {diary.map((item) => (
                <li key={item.id}>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                    <button type='button' onClick={() => {
                        deleteDocument(item.id)
                    }}>삭제하기</button>
                </li>
            ))}
        </>
    )
}

export default DiaryList