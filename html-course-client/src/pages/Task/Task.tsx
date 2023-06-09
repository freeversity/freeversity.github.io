import { FC, useEffect, useState } from "react";
import './Task.scss';
import cx from 'classnames';
import { useParams } from "react-router";
import { WorkDesk } from "../../components/WorkDesk/WorkDesk";
import { ChapterType } from "../../routers/ChapterRouter";
import { Link } from "react-router-dom";
import { TaskHeader } from "../../components/TaskHeader/TaskHeader";

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
    globalAssertion?: string;
    onDone?: string;
    footnote?: string;
    footnoteTitle?: string;
    assertions: ({
        name: string;
        type?: "expect";
        title: string;
        expect: string;
        onSuccess?: string;
        successTimeout?: number;
        onFailure?: string;
    } | {
        title: string;
        name: string;
        type: "action";
        eventType: string;
        target: string;
        expect?: string;
        debounce?: number;
    })[];
    scripts: ({
        type: "handler",
        target: string;
        eventType: string;
        handler: string;
    } | {
        type: "exec",
        body: string,
    })[];
}

export interface TaskProps {
    className?: string;
    baseUrl: string;
    tasks: ChapterType['tasks'];
}

const isProd = process.env.NODE_ENV === 'production';

const Task: FC<TaskProps> = ({className, baseUrl, tasks}) => {
    const [articleShown, setArticleShown] = useState(isProd);
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

    const taskType = tasks[currentIndex]?.type;

    useEffect(() => {
        window.gtag('config', 'G-NKBY28H61Z', {
            'page_location': window.location.pathname,
            custom_map: {
              dimension1: 'value' 
            }
          });
    }, [chapterId, taskId])

    const onTaskDoneChange = (isDone: boolean) => {
        if (nextTaskActive === isDone) return;

        setNextTaskActive(isDone);

        if (isDone) {
            window.gtag?.('event', 'task_done', {
                'page_location': window.location.pathname,
                'event_category': 'engagement',
                'event_label': 'method',
            });
        }
    }

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
                setArticleShown(isProd);
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
            setNextTaskActive(false);
        }
    }, [chapterId, taskId, taskType]);

    return (
        <div className={cx('task', className)}>
            <div className={cx('task__wrapper', className)}>
                <TaskHeader 
                    taskName={task?.name}
                    className={cx('task__header')}
                    tasks={tasks}
                    taskDone={nextTaskActive}
                    onArticleToggle={() => {setArticleShown((isShown) => !isShown)}}
                />
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
                                setNextTaskActive={onTaskDoneChange}
                                cssReadonly={task.cssReadonly}
                                markupReadonly={task.markupReadonly}
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