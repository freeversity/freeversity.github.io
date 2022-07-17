import {FC, useEffect, useState} from 'react';
import './Summary.scss'
import cx from 'classnames';
import { Link } from 'react-router-dom';

export interface SummaryProps {
    className?: string;
}

export interface Course {
    name: string;
    levels: ({
        name: string;
        sections: ({
            name: string;
            chapters: ({
                name: string;
                id: number;
                entry: string;
                disabled?: boolean;
                unfinished?: boolean;
            })[]

        })[]
    })[]

}

const Summary: FC<SummaryProps> = ({className}) => {
    const [course, setCourse] = useState<Course>();
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        fetch('/resources/course.json')
            .then(req => req.json())
            .then((summary: Course) => {
                setCourse(summary);
                setPending(false);
            })
            .catch((err) => {
                console.error(err)
            });
    }, []);


    return (
        <main className={cx(className)} >
            {isPending && 'Loading...'}
            {course && (
                <section>
                    <h2>{course.name}</h2>
                    <ul>
                    {course.levels.map(({name, sections}) => (
                        <li key={name}>
                            <h3>{name}</h3>
                            <ul>
                                {sections.map(({name, chapters}) => (
                                    <li key={name}>
                                        <h4 id={name}>{name}</h4>
                                        <ol>
                                            {chapters.map(({name, id, disabled, unfinished}) => (
                                                <li key={id}>
                                                    {disabled && <span>{name}</span>}
                                                    {!disabled && <Link to={`/chapters/${id}`} className={cx({unfinished})}>{name}</Link>}
                                                </li>
                                            ))}
                                        </ol>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                    </ul>
                </section>
            )}
        </main>
    );
}

export {Summary}