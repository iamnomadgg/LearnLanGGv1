import React, { useEffect, useState } from 'react';
import api from '../api';

const LessonList = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await api.get('/lessons');
                console.log(response.data)
                setLessons(response.data);
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
            }
        };
        fetchLessons();
    }, []);

    return (
        <div>
            <h2>Lessons</h2>
            {lessons.length === 0 ? (
                <p>No lessons available.</p>
            ) : (
                <ul>
                    {lessons.map((lesson) => (
                        <li key={lesson._id}>
                            <h4>{lesson.title}</h4>
                            <p>{lesson.content}</p>
                            {lesson.audioUrl && <audio controls src={lesson.audioUrl} />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LessonList;
