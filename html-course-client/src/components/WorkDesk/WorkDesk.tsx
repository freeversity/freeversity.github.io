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
import debounce from 'lodash/debounce';

declare global {
    interface Window { gtag: (type: string, name: string, data: any) => void; }
}

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
    markupReadonly?: boolean;
    cssReadonly?: boolean;
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
    markupReadonly,
    cssReadonly
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
        const isActive = !!expect && doneAsserts.size === expect.assertions.length;

        if (expect?.onDone && isActive) {
            try {
                const func = new Function('expect', 'document', expect?.onDone);
    
                func.call(previewWindow, expectFunc, previewWindow!.document);
            } catch (e) {
                console.error(e);
            }
        }

        setNextTaskActive(isActive);
    }, [doneAsserts, setNextTaskActive, expect, previewWindow])

    const onValidate = (previewFrame: HTMLIFrameElement) => {
        const previewWindow = previewFrame.contentWindow as Window;

        if (!previewWindow) return;

        setPreviewWindow(previewFrame?.contentWindow);

        const isStrict = expect!.strict;

        const globalAssert = expect!.globalAssertion ? new Function('expect', 'document', expect!.globalAssertion) : () => {};

        const passedAsserts: (string | null)[] = expect!.assertions
            .map((assertion, index, assertions) => {
                switch (assertion.type) {
                    case 'action': {
                        const {target, eventType, name, expect: expectBody, debounce: debounceTimeout} = assertion;

                        let handler = (e: Event) => {
                            if (target && !(e.target as HTMLElement).closest(target)) {
                              return;
                            }

                            const func = expectBody ? new Function('expect', 'document', expectBody) : () => {};

                            try {
                                globalAssert.call(previewWindow, expectFunc, previewWindow.document);
                                func.call(previewWindow, expectFunc, previewWindow.document);

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
                            } catch (err) {
                                console.error(err);
                            }
                        };

                        if (debounceTimeout !== undefined) {
                            handler = debounce(handler, debounceTimeout);
                        }

                        previewWindow.addEventListener(eventType, handler);

                        return null;
                    }
                    default: {
                        const {onSuccess, name, onFailure, expect: expectBody, successTimeout } = assertion;

                        const func = new Function('expect', 'document', expectBody);
                        try {
                            globalAssert.call(previewWindow, expectFunc, previewWindow.document);
                            func.call(previewWindow, expectFunc, previewWindow.document);

                            if (onSuccess) {
                                const onSuccessFunc = new Function('document', onSuccess);

                                if (!successTimeout || doneAsserts.has(name)) {
                                    onSuccessFunc?.call(previewWindow, previewWindow.document);
                                } else {
                                    previewWindow.setTimeout(() => {
                                        onSuccessFunc?.call(previewWindow, previewWindow.document);
                                    }, successTimeout);
                                }
                 
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
                                    readOnly={markupReadonly}
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
                                        readOnly={cssReadonly}
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
                                scripts={expect?.scripts}
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
