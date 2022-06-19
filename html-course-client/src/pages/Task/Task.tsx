import { FC, useEffect, useState } from "react";
import './Task.scss';
import cx from 'classnames';
import { useParams } from "react-router";
import { WorkDesk } from "../../components/WorkDesk/WorkDesk";
import { ChapterType } from "../../routers/ChapterRouter";
import { Link } from "react-router-dom";

export interface TaskType {
    id: number;
    name: string;
    htmlEntry?: string;
    svgEntry?: string;
    cssEntry?: string;
    articleEntry: string;
    expectEntry: string;
    markupReadonly?: boolean;
    cssReadonly?: boolean;
    refHtmlEntry?: string;
    refWidth?: number;
}

export interface ExpectType {
    strict?: boolean;
    intro?: string;
    introTitle?: string;
    footnote?: string;
    assertions: ({
        name: string;
        type?: "expect";
        title: string;
        expect: string;
        onSuccess?: string;
        onFailure?: string;
    } | {
        title: string;
        name: string;
        type: "action";
        eventType: string;
        target: string;
    })[]
}

export interface TaskProps {
    className?: string;
    baseUrl: string;
    tasks: ChapterType['tasks'];
}


const Task: FC<TaskProps> = ({className, baseUrl, tasks}) => {
    const [articleShown, setArticleShown] = useState(process.env.NODE_ENV === 'production');
    const [task, setTask] = useState<TaskType>();
    const [nextTaskActive, setNextTaskActive] = useState<boolean>(false);
    const [isPending, setPending] = useState(true);
    const [isSvg, setIsSvg] = useState(false);
    const [article, setArticle] = useState<string | undefined>();
    const [markup, setMarkup] = useState<string | undefined>();
    const [css, setCss] = useState<string | undefined>();
    const [expect, setExpect] = useState<ExpectType | undefined>();
    const [refMarkup, setRefMarkup] = useState<string | undefined>();

    const {chapterId, taskId} = useParams();

    const currentIndex = tasks.findIndex(({id})=> `${id}` === taskId)

    const nextTaskId = tasks[currentIndex + 1]?.id;
    const prevTaskId = tasks[currentIndex - 1]?.id;

    const taskType = tasks[currentIndex].type;

    useEffect(() => {
        fetch(`/resources/${chapterId}/tasks/${taskId}/task.json`)
            .then(req => req.json())
            .then((task: TaskType) => {
                setTask(task);
                const {htmlEntry, svgEntry, cssEntry, articleEntry, expectEntry, refHtmlEntry} = task;
                return Promise.all([
                    fetch(`/resources/${chapterId}/tasks/${taskId}/${articleEntry}`)
                        .then(req => req.text()),
                    htmlEntry ? fetch(`/resources/${chapterId}/tasks/${taskId}/${htmlEntry}`)
                        .then(req => req.text()) : Promise.resolve(undefined),
                    svgEntry ? fetch(`/resources/${chapterId}/tasks/${taskId}/${svgEntry}`)
                        .then(req => req.text()) : Promise.resolve(undefined),
                    cssEntry ? fetch(`/resources/${chapterId}/tasks/${taskId}/${cssEntry}`)
                        .then(req => req.text()) : Promise.resolve(undefined),
                    taskType === 'task' ? fetch(`/resources/${chapterId}/tasks/${taskId}/${expectEntry}`)
                        .then(req => req.json()) : Promise.resolve(undefined),
                    refHtmlEntry ? fetch(`/resources/${chapterId}/tasks/${taskId}/${refHtmlEntry}`)
                        .then(req => req.text()) : Promise.resolve(undefined),
                    ]
                )
            })
            .then(([article, html, svg, css, expect, refHtml]) => {
                setArticle(article);
                setMarkup(html ?? svg);
                setCss(css);
                setExpect(expect);
                setRefMarkup(refHtml);
                setIsSvg(!!svg);

                setPending(false);
            })
            .catch((err) => {
                console.error(err)
            });

        return () => {
            setTask(undefined);
            setArticle(undefined);
            setMarkup(undefined);
            setCss(undefined);
            setExpect(undefined);
            setRefMarkup(undefined)
        }
    }, [chapterId, taskId, taskType]);

    return (
        <div className={cx('task', className)}>
            <div className={cx('task__wrapper', className)}>
                <header className={cx('task__header')}>
                    <Link to="/" className={cx('task__header-logo')}>{'<- Home'}</Link>
                    <nav className={cx('task__nav')}>
                        {prevTaskId && (
                            <Link 
                                className={cx('task__task-link', 'task__task-link--prev')} 
                                to={`../tasks/${prevTaskId}`}
                            >
                                &lt;
                            </Link>
                        )}
                        {task ? <h1 className={cx('task__heading')}>{task.name}</h1> : <div className={cx('task__heading')} />}
                        {nextTaskId && (
                            <Link 
                                className={cx('task__task-link', 'task__task-link--prev', {'task__task-link--active': nextTaskActive})} 
                                to={`../tasks/${nextTaskId}`}
                            >
                                &gt;
                            </Link>
                        )}
                    </nav>
                    <button className={cx('task__article-btn')} onClick={() => setArticleShown(!articleShown)}>Article</button>
                </header>
                <main className={cx('task__content')}>
                    {isPending && 'Loading...'}
                    {task && markup && (expect || refMarkup) && article && (!task.cssEntry || css !== undefined) && (
                        <>
                            <WorkDesk 
                                articleShown={articleShown}
                                className={cx('task__workdesk')}
                                isSvg={isSvg}
                                baseUrl={baseUrl}
                                expect={expect}
                                markupFileName={task.htmlEntry ?? task.svgEntry ?? ''}
                                initialMarkup={markup}
                                refMarkup={refMarkup}
                                cssFileName={task.cssEntry}
                                refWidth={task.refWidth}
                                initialCss={css}
                                article={article}
                                setArticleShown={setArticleShown}
                                setNextTaskActive={setNextTaskActive}
                            />
                        </>
                    )}
                </main>
                <footer className={cx('task__footer')}>
                    <a href="https://github.com/freeversity/freeversity/issues">Баги та побажання писати сюди</a>
                </footer>
            </div>
        </div>
    );

}

export {Task};