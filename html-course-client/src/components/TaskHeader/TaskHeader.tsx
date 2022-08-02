import { FC, useLayoutEffect, useState } from "react";
import './TaskHeader.scss';
import cx from 'classnames';
import { useParams } from "react-router";
import { ChapterType } from "../../routers/ChapterRouter";
import { Link } from "react-router-dom";

export interface TaskHeaderProps {
    className?: string;
    tasks: ChapterType['tasks'];
    taskName?: string;
    taskDone: boolean;
    onArticleToggle: () => void;
}


const TaskHeader: FC<TaskHeaderProps> = ({className, tasks, taskName, taskDone, onArticleToggle}) => {
    const {taskId} = useParams();
    const [tasksNavShown, setTasksNavShown] = useState(false);

    const currentIndex = tasks.findIndex(({id})=> `${id}` === taskId)

    const nextTaskId = tasks[currentIndex + 1]?.id;
    const prevTaskId = tasks[currentIndex - 1]?.id;

    useLayoutEffect(() => {
        const onClick = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('.task-header__current-task')) return;

            setTasksNavShown(false);
        }

        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('click', onClick);
        }
    })

    return (
        <header className={cx('task-header', className)}>
            <div  className={cx('task-header__content')}>
                <Link to="/" className={cx('task-header__logo')}>{'<- Home'}</Link>
                <nav className={cx('task-header__nav')}>
                    <Link 
                        className={cx('task-header__task-link', {
                            'task-header__task-link--prev': !!prevTaskId,
                            'task-header__task-link--chapter': !prevTaskId
                        })} 
                        to={prevTaskId ? `../tasks/${prevTaskId}` : '../'}
                        title={prevTaskId ? "Previous Task" : "To Chapter"}
                    >
                        {prevTaskId ? '<' : '^'}
                    </Link>
                    <div 
                        className={cx('task-header__current-task', {
                            'task-header__current-task--nav-open': tasksNavShown
                        })}  
                        onClick={() => {setTasksNavShown((isShown) => !isShown)}}
                    >
                        <h1 className={cx('task-header__heading')}>{taskName}</h1>
                        <ol className={cx('task-header__tasks-nav', {'task-header__tasks-nav--open': tasksNavShown})}>
                            {tasks.map(({name, id}) => (
                                <li key={id}>
                                    <Link 
                                        to={`../tasks/${id}`} 
                                        className={cx('task-header__task-nav-link', {
                                            'task-header__task-nav-link--active': taskId === `${id}`
                                        })}
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ol>

                    </div>
                    <Link 
                        className={cx('task-header__task-link', {
                            'task-header__task-link--next': !!nextTaskId,
                            'task-header__task-link--chapter': !nextTaskId,
                            'task-header__task-link--active': taskDone
                        })} 
                        to={nextTaskId ? `../tasks/${nextTaskId}` : '../'}
                        title={nextTaskId ? "Next Task" : "To Chapter"}
                    >
                        {nextTaskId ? '>' : '^'}
                    </Link>
                </nav>
                <button className={cx('task-header__article-btn')} onClick={onArticleToggle}>Article</button>
            </div>
        </header>

    );

}

export {TaskHeader};