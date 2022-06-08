import {FC, useState} from 'react';
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

export interface WorkDeskProps {
    initialHtml: string;
    initialCss?: string;
    className?: string
    baseUrl: string;
    htmlFileName: string;
    cssFileName?: string;
    article: string;
    expect?: ExpectType;
    refHtml?: string;
}

const WorkDesk: FC<WorkDeskProps> = ({
    initialHtml,
    htmlFileName,
    initialCss,
    cssFileName,
    baseUrl,
    className,
    expect,
    article,
    refHtml,
}) => {
    const [articleShown, setArticleShown] = useState(false);
    const [previewWindow, setPreviewWindow] = useState<Window | null>(null);
    const [html, setHtml] = useState(initialHtml);
    const [css, setCss] = useState(initialCss ?? '');

    return (
        <div className={cx('workdesk', className)}>
            <div  
                className={cx(
                    'workdesk__article-container', 
                    {'workdesk__article-container--visible': articleShown}
                )}
            >
                <button onClick={() => setArticleShown(false)}>Close</button>
                <Markdown>{article}</Markdown>
            </div>
            <div className={cx('workdesk__wrapper')}>
                <div className={cx('workdesk__sidepanel')}>
                    <button  className={cx('workdesk__theory-btn')} onClick={() => setArticleShown(true)}>Theory</button>
                </div>
                <ReflexContainer orientation='vertical' className={'workdesk__split-pane'}>
                    <ReflexElement className={cx("workdesk__editors-pane")} minSize={200}>
                        <ReflexContainer className={cx("workdesk__editors-split-pane")} orientation='horizontal'>
                            <ReflexElement minSize={200} >
                                <AceEditor
                                    value={html}
                                    setOptions={{ useWorker: false }}
                                    className={cx('workdesk__editor')}
                                    mode='html' 
                                    theme="tomorrow"
                                    name={htmlFileName}
                                    onChange={setHtml}
                                    height='100%'
                                    width='100%'
                                />
                            </ReflexElement>
                            {cssFileName && <ReflexSplitter/>}
                            {cssFileName && (
                                <ReflexElement  minSize={200}>
                                    <AceEditor
                                        value={css}
                                        setOptions={{ useWorker: false }}
                                        className='workdesk__editor'
                                        mode='css' 
                                        theme="tomorrow"
                                        name={cssFileName}
                                        onChange={setCss}
                                        height='100%'
                                        width='100%'
                                    />
                                </ReflexElement>
                            )}
                        </ReflexContainer>
                    </ReflexElement>
                    <ReflexSplitter/> 
                    <ReflexElement minSize={300}>

                    <ReflexContainer className={cx("workdesk__editors-split-pane")} orientation='horizontal'>
                        
                        <ReflexElement minSize={refHtml ? undefined: 500}>
                            <PreviewFrame 
                                baseUrl={baseUrl}
                                setPreviewWindow={setPreviewWindow}
                                html={html} 
                                css={css} 
                                cssFileName={cssFileName} 
                                htmlFileName={htmlFileName} 
                                className={'workdesk__preview'} 
                            />
                        </ReflexElement>
                        <ReflexSplitter/> 
                        <ReflexElement flex={refHtml ? 0.5 : 0.2}>
                            {previewWindow && expect &&  (
                                <TaskInspector 
                                    className={'workdesk__inspector'} 
                                    previewWindow={previewWindow}
                                    expect={expect}
                                    html={html}
                                    css={css}
                                />
                            )}
                            {previewWindow && refHtml &&  (
                                <ChallengeInspector
                                    className={'workdesk__inspector'} 
                                    previewWindow={previewWindow}
                                    refHtml={refHtml}
                                    html={html}
                                    css={css}
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
