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
    htmlEntry: string;
    cssEntry?: string;
    articleEntry: string;
    expectEntry: string;
    htmlReadonly?: boolean;
    cssReadonly?: boolean;
    refHtmlEntry?: string;
}

export interface ExpectType {
    strict?: boolean;
    intro?: string;
    introTitle?: string;
    footnote?: string;
    assertions: ({
        name: string;
        title: string;
        expect: string;
        onDone?: string;
    })[]
}

export interface TaskProps {
    className?: string;
    baseUrl: string;
    tasks: ChapterType['tasks'];
}


const Task: FC<TaskProps> = ({className, baseUrl, tasks}) => {
    const [task, setTask] = useState<TaskType>();
    const [isPending, setPending] = useState(true);
    const [article, setArticle] = useState<string | undefined>();
    const [html, setHtml] = useState<string | undefined>();
    const [css, setCss] = useState<string | undefined>();
    const [expect, setExpect] = useState<ExpectType | undefined>();
    const [refHtml, setRefHtml] = useState<string | undefined>();

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
                const {htmlEntry, cssEntry, articleEntry, expectEntry, refHtmlEntry} = task;
                return Promise.all([
                    fetch(`/resources/${chapterId}/tasks/${taskId}/${articleEntry}`)
                        .then(req => req.text()),
                    fetch(`/resources/${chapterId}/tasks/${taskId}/${htmlEntry}`)
                        .then(req => req.text()),
                    cssEntry ? fetch(`/resources/${chapterId}/tasks/${taskId}/${cssEntry}`)
                        .then(req => req.text()) : Promise.resolve(undefined),
                    taskType === 'task' ? fetch(`/resources/${chapterId}/tasks/${taskId}/${expectEntry}`)
                        .then(req => req.json()) : Promise.resolve(undefined),
                    taskType === 'challenge' ? fetch(`/resources/${chapterId}/tasks/${taskId}/${refHtmlEntry}`)
                        .then(req => req.text()) : Promise.resolve(undefined),
                    ]
                )
            })
            .then(([article, html, css, expect, refHtml]) => {
                setArticle(article);
                setHtml(html);
                setCss(css);
                setExpect(expect);
                setRefHtml(refHtml);

                setPending(false);
            })
            .catch((err) => {
                console.error(err)
            });

        return () => {
            setTask(undefined);
            setArticle(undefined);
            setHtml(undefined);
            setCss(undefined);
            setExpect(undefined);
            setRefHtml(undefined)
        }
    }, [chapterId, taskId, taskType]);

    return (
        <main className={cx('task', className)}>
            <div className={cx('task__content')}>
                {isPending && 'Loading...'}
                {task && html && (expect || refHtml) && article && (!task.cssEntry || css) && (
                    <>
                        <h2  className={cx('task__heading')}>
                            {prevTaskId && (<Link to={`../tasks/${prevTaskId}`}>Prev Task</Link>)}
                            {task.name}
                            {nextTaskId && (<Link to={`../tasks/${nextTaskId}`}>Next Task</Link>)}
                        </h2>
                        <WorkDesk 
                            className={cx('task__workdesk')}
                            baseUrl={baseUrl}
                            expect={expect}
                            htmlFileName={task.htmlEntry}
                            initialHtml={html}
                            refHtml={refHtml}
                            cssFileName={task.cssEntry}
                            initialCss={css}
                            article={article}
                        />
                    </>
                )}

            </div>

        </main>
    );

}

export {Task};