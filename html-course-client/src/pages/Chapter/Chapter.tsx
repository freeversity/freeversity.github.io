import { FC } from 'react';
import cx from 'classnames';
import './Chapter.scss';
import { ChapterType } from '../../routers/ChapterRouter';
import { Link } from 'react-router-dom';

export interface ChapterProps {
    className?: string;
    chapter?: ChapterType;
    isPending: boolean;
}


const Chapter: FC<ChapterProps> = ({className, isPending, chapter}) => {

    return (
        <main className={cx(className)}>
            {isPending && 'Loading...'}
            {chapter && (
                <>
                    <h2>{chapter.title}</h2>
                    <Link to='/'>{'<'}- Back to summary</Link>
                    <ol>
                        {chapter.tasks.map(({name, id}) => (
                            <li key={id}>
                                <Link to={`tasks/${id}`}>{name}</Link>
                            </li>
                        ))}
                    </ol>
                </>
            )}

        </main>
    )

}

export {Chapter}