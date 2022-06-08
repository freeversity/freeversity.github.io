import { FC, useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { Chapter } from '../pages/Chapter/Chapter';
import { Task } from '../pages/Task/Task';

export interface ChapterRouterProps {
    className?: string;
}

export interface ChapterType {
    name: string;
    title: string;
    baseUrl: string;
    tasks: ({
        entry: string;
        name: string;
        id: string;
        type: 'task' | 'challenge'
    })[]

}

const ChapterRouter: FC<ChapterRouterProps> = ({className}) => {
    const [chapter, setChapter] = useState<ChapterType>();
    const [isPending, setPending] = useState(true);

    const {chapterId} = useParams();
    useEffect(() => {
        fetch(`/resources/${chapterId}/chapter.json`)
            .then(req => req.json())
            .then((summary: ChapterType) => {
                setChapter(summary);
                setPending(false);
            })
            .catch((err) => {
                console.error(err)
            });
    }, [chapterId]);

    return (
        <Routes>
            <Route 
                path='tasks/:taskId' 
                element={chapter && <Task className={className} baseUrl={chapter.baseUrl} tasks={chapter.tasks}/>}/>
            <Route 
                path='/' 
                element={<Chapter chapter={chapter} isPending={isPending} className={className} />} 
            />
        </Routes>
    )

}

export {ChapterRouter}