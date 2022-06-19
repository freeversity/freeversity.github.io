import {FC, useEffect, useState} from 'react';
import cx from 'classnames';
import AceEditor from "react-ace";

import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from '../SplitPane';

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow";

import './WorkDesk.scss';

import { PreviewFrame } from '../PreviewFrame/PreviewFrame';
import { TaskInspector } from '../TaskInspector/TaskInspector';
import { ExpectType } from '../../pages/Task/Task';
import { Markdown } from '../Markdown/Markdown';
import { ChallengeInspector } from '../ChallengeInspector/ChallengeInspector';
import {expect as expectFunc} from '../../expect'

export interface WorkDeskProps {
    initialMarkup: string;
    initialCss?: string;
    className?: string
    baseUrl: string;
    markupFileName: string;
    cssFileName?: string;
    article: string;
    expect?: ExpectType;
    refMarkup?: string;
    refWidth?: number;
    isSvg?: boolean;
    articleShown?: boolean;
    setArticleShown: (isShown: boolean) => void;
    setNextTaskActive: (isActive: boolean) => void;
}

const WorkDesk: FC<WorkDeskProps> = ({
    initialMarkup,
    markupFileName,
    initialCss,
    cssFileName,
    baseUrl,
    className,
    expect,
    article,
    refMarkup,
    refWidth,
    isSvg,
    articleShown,
    setArticleShown,
    setNextTaskActive,
}) => {
    const [doneAsserts, setDoneAsserts] = useState<Set<string>>(new Set());
    const [previewWindow, setPreviewWindow] = useState<
        Window  | null
    >(null);

    const [markup, setMarkup] = useState(initialMarkup);
    const [css, setCss] = useState(initialCss ?? '');

    const onIFrameReady = (previewFrame: HTMLIFrameElement) => {
        const previewWindow = previewFrame.contentWindow as Window;

        if (!previewWindow) return;

        setPreviewWindow(previewFrame?.contentWindow);
    }

    useEffect(() => {
        setNextTaskActive(!!expect && doneAsserts.size === expect.assertions.length);
    }, [doneAsserts, setNextTaskActive, expect])

    const onValidate = (previewFrame: HTMLIFrameElement) => {
        const previewWindow = previewFrame.contentWindow as Window;

        if (!previewWindow) return;

        setPreviewWindow(previewFrame?.contentWindow);

        const isStrict = expect!.strict;

        const passedAsserts: (string | null)[] = expect!.assertions
            .map((assertion, index, assertions) => {
                switch (assertion.type) {
                    case 'action': {
                        const {target, eventType, name} = assertion;

                        const handler = (e: Event) => {
                            if (target && !(e.target as HTMLElement).closest(target)) {
                              return;
                            }

                            if (!isStrict) {
                                setDoneAsserts((doneAsserts) => new Set([...Array.from(doneAsserts), name]));
                                return;
                            }

                            setDoneAsserts((doneAsserts) => { 
                                if (!assertions.slice(0, index).every(({name}) => doneAsserts.has(name))) return doneAsserts;
                                
                                requestAnimationFrame(() => {
                                    onValidate(previewFrame);
                                });

                                return new Set([...Array.from(doneAsserts), name]);
                            });
                        };

                        previewWindow.addEventListener(eventType, handler);

                        return null;
                    }
                    default: {
                        const {onSuccess, name, onFailure, expect: expectBody } = assertion;

                        const func = new Function('expect', 'document', expectBody);
                        try {
                            func.call(previewWindow, expectFunc, previewWindow.document);

                            if (onSuccess) {
                                const onSuccessFunc = new Function('document', onSuccess);
                
                                onSuccessFunc?.call(previewWindow, previewWindow.document);
                            }
                            
                            return name;
                        } catch (err) {
                            console.log(err);
                            if (onFailure) {
                                const onFailureFunc = new Function('document', onFailure);
                
                                onFailureFunc?.call(previewWindow, previewWindow.document);

                            }
                            return null
                        }
                    }
                }
            });
            

        setDoneAsserts((doneAsserts) => {
            const newAsserts = passedAsserts.filter((name, index, newAsserts): name is string => !!name && (
                !isStrict || 
                expect!.assertions.slice(0, index)
                    .every(({name}) => doneAsserts.has(name)) ||
                expect!.assertions.slice(0, index)
                    .filter(({name}) => !doneAsserts.has(name))
                    .every(({name}) => newAsserts.includes(name))
            ));

            return new Set([...Array.from(doneAsserts), ...newAsserts]);
        });

    }

    return (
        <div className={cx('workdesk', className)}>
            <div  
                className={cx(
                    'workdesk__article-container', 
                    {'workdesk__article-container--visible': articleShown}
                )}
            >
                <div 
                    className={cx('workdesk__article-backdrop')}
                    onClick={() => setArticleShown(false)}
                />
                <div className={cx('workdesk__article-content')}>
                    <button 
                        className={cx(
                            'workdesk__article-close-btn',
                        )}
                        onClick={() => setArticleShown(false)}                    
                    >
                        X
                    </button>
                    
                    <article className={cx('workdesk__article')}>
                        <Markdown>{article}</Markdown>
                    </article>
                </div>

            </div>
            <div className={cx('workdesk__wrapper')}>
                <ReflexContainer orientation='vertical' className={'workdesk__split-pane'}>
                    <ReflexElement className={cx("workdesk__editors-pane")} minSize={200}>
                        <ReflexContainer className={cx("workdesk__editors-split-pane")} orientation='horizontal'>
                            <ReflexElement minSize={200} >
                                <AceEditor
                                    defaultValue={markup}
                                    setOptions={{ useWorker: false }}
                                    className={cx('workdesk__editor')}
                                    mode='html' 
                                    wrapEnabled                                    
                                    theme="tomorrow"
                                    name={markupFileName}
                                    onChange={setMarkup}
                                    height='100%'
                                    width='100%'
                                    debounceChangePeriod={500}
                                />
                            </ReflexElement>
                            {cssFileName && <ReflexSplitter/>}
                            {cssFileName && (
                                <ReflexElement  minSize={200}>
                                    <AceEditor
                                        defaultValue={css}
                                        setOptions={{ useWorker: false }}
                                        className='workdesk__editor'
                                        mode='css'
                                        theme="tomorrow"
                                        name={cssFileName}
                                        onChange={setCss}
                                        height='100%'
                                        wrapEnabled
                                        width='100%'
                                        debounceChangePeriod={500}
                                    />
                                </ReflexElement>
                            )}
                        </ReflexContainer>
                    </ReflexElement>
                    <ReflexSplitter/> 
                    <ReflexElement minSize={300}>

                    <ReflexContainer className={cx("workdesk__editors-split-pane")} orientation='horizontal'>
                        
                        <ReflexElement minSize={refMarkup ? undefined : 500}>
                            <PreviewFrame 
                                baseUrl={baseUrl}
                                onReady={ expect ? onValidate : onIFrameReady}
                                markup={markup} 
                                css={css} 
                                cssFileName={cssFileName} 
                                markupFileName={markupFileName} 
                                className={'workdesk__preview'} 
                            />
                        </ReflexElement>
                        <ReflexSplitter/> 
                        <ReflexElement flex={refMarkup ? 0.5 : 0.2}>
                            {previewWindow && expect &&  (
                                <TaskInspector 
                                    doneAsserts={doneAsserts}
                                    className={'workdesk__inspector'} 
                                    expect={expect}
                                />
                            )}
                            {previewWindow && refMarkup &&  (
                                <ChallengeInspector
                                    className={'workdesk__inspector'} 
                                    previewWindow={previewWindow}
                                    refMarkup={refMarkup}
                                    refWidth={refWidth}
                                    markup={markup}
                                    css={css}
                                    isSvg={isSvg}
                                />
                            )}
                        </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                </ReflexContainer>
            </div>
        </div>
      )
    
}

export {WorkDesk}
