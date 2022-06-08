import { FC, MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import cx from 'classnames';
import './ChallengeInspector.scss'
import { domToPng } from "../../services/domToPng";
import { imageDiff } from "../../services/imageDiff";

export interface ChallengeInspectorProps {
    className?: string;
    refHtml: string;
    previewWindow: Window;
    html: string;
    css: string;
}

enum ChallengeTabs {
    REF = 'reference',
    RESULT = 'result',
    OVERLAY = 'overlay',
    DIFF = 'diff',
}

const ChallengeInspector: FC<ChallengeInspectorProps> = ({className, previewWindow, refHtml}) => {
    const [activeTab, setActiveTab] = useState(ChallengeTabs.REF);
    const [iFrameDoc, setIFrameDoc] = useState<Document | null>(null);
    const [refPngUrl, setRefPngUrl] = useState<string | null>(null);
    const [resultPngUrl, setResultPngUrl] = useState<string | null>(null);

    const [diffPngUrl, setDiffPngUrl] = useState<string | null>(null);
    const [match, setMatch] = useState<number | null>(null);

    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const refImageRef = useRef<HTMLImageElement>(null);
    const examImageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const iFrameWindow = iFrameRef.current?.contentWindow;

        if (!iFrameWindow) return;

        const onLoad = () => {
            setIFrameDoc(iFrameWindow.document);
        }

        iFrameWindow.addEventListener('load', onLoad)

        return () => {
            iFrameWindow.removeEventListener('load', onLoad)
        }
    }, []);

    useLayoutEffect(() => {
        if (!resultPngUrl || !refPngUrl) return;

        const timerId = requestAnimationFrame(() => {
            const {width = 500, height = 500} = refImageRef.current ?? {};
    
            const {diffUrl, match} = imageDiff(refImageRef.current!, examImageRef.current!, width, height);

            setMatch(match);    
            setDiffPngUrl(diffUrl ?? null);
            setActiveTab(ChallengeTabs.DIFF);
        });

        return () => {
            cancelAnimationFrame(timerId);
        }
    }, [resultPngUrl, refPngUrl]);

    useEffect(() => {
        if (!iFrameDoc) return;

        domToPng(iFrameDoc.documentElement, 550)
            .then((pngUrl) => {
                setRefPngUrl(pngUrl ?? null)
            });
    }, [iFrameDoc]);

    const onCompare = () => {
        if (!refPngUrl) return;

        const {height = 500} = refImageRef.current ?? {};

        domToPng(previewWindow.document.documentElement, 550, height)
            .then((pngUrl) => {
                setResultPngUrl(pngUrl ?? null);

                return pngUrl;
            });
    }

    const onTabClick = (e: MouseEvent<HTMLButtonElement>) => {
        const tab = (e.target as HTMLButtonElement).dataset.tab as ChallengeTabs;

        setActiveTab(tab);
    }

    return (
        <div className={cx(className, 'challenge-inspector')}>
            <div className={cx('challenge-inspector__content')}>
                <div className={cx('challenge-inspector__header')}>
                    <button 
                        onClick={onTabClick}
                        className={cx(
                            'challenge-inspector__header-btn', {
                            'challenge-inspector__header-btn--active': activeTab === ChallengeTabs.REF
                        })}
                        data-tab={ChallengeTabs.REF}
                    >
                        Reference
                    </button>
                    <button 
                        onClick={onTabClick}
                        className={cx(
                            'challenge-inspector__header-btn', {
                            'challenge-inspector__header-btn--active': activeTab === ChallengeTabs.RESULT
                        })}
                        data-tab={ChallengeTabs.RESULT}
                        disabled={!resultPngUrl}
                    >
                        Result
                    </button>
                    <button 
                        onClick={onTabClick}
                        className={cx(
                            'challenge-inspector__header-btn', {
                            'challenge-inspector__header-btn--active': activeTab === ChallengeTabs.OVERLAY
                        })}
                        data-tab={ChallengeTabs.OVERLAY}
                        disabled={!resultPngUrl}
                    >
                        Overlay
                    </button>
                    <button 
                        onClick={onTabClick}
                        className={cx(
                            'challenge-inspector__header-btn', {
                            'challenge-inspector__header-btn--active': activeTab === ChallengeTabs.DIFF
                        })}
                        data-tab={ChallengeTabs.DIFF}
                        disabled={!diffPngUrl}
                    >
                        Difference
                    </button>                  
                </div>
                <div className={cx('challenge-inspector__body')}>
                    <div 
                        className={cx(
                            'challenge-inspector__tab', 
                            {'challenge-inspector__tab--active': activeTab === ChallengeTabs.REF}
                        )}
                    >
                        {refPngUrl && (
                            <img src={refPngUrl} alt="reference"/>
                        )}
                    </div>
                    <div 
                        className={cx(
                            'challenge-inspector__tab', 
                            {'challenge-inspector__tab--active': activeTab === ChallengeTabs.RESULT}
                        )}
                    >
                        {resultPngUrl && (
                            <img src={resultPngUrl} alt="result"/>
                        )}
                    </div>
                    <div 
                        className={cx(
                            'challenge-inspector__tab', 
                            {'challenge-inspector__tab--active': activeTab === ChallengeTabs.OVERLAY}
                        )}
                    >
                        {refPngUrl && (
                            <img src={refPngUrl} alt="reference"/>
                        )}
                        {resultPngUrl && (
                            <div className={cx('challenge-inspector__overlay')}>
                                <img 
                                    src={resultPngUrl} 
                                    alt="result"
                                />
                            </div>
                        )}
                    </div>
                    <div 
                        className={cx(
                            'challenge-inspector__tab', 
                            {'challenge-inspector__tab--active': activeTab === ChallengeTabs.DIFF}
                        )}
                    >
                        {diffPngUrl && (
                            <img src={diffPngUrl} alt="diff"/>
                        )}
                    </div>
                </div>

                <div className={cx('challenge-inspector__footer')}>
                    {match !== null && `Match: ${Math.floor(match * 100)}%`}
                    <button onClick={onCompare}>Compare</button>
                </div>
                <div  className={cx('challenge-inspector__iframe-container')}>
                    <iframe 
                        ref={iFrameRef}
                        className={cx('challenge-inspector__reference-frame')}
                        sandbox="allow-same-origin allow-scripts" 
                        title='reference' 
                        frameBorder="0" 
                        srcDoc={refHtml}
                    />
                    {refPngUrl && (
                        <img ref={refImageRef} src={refPngUrl} alt="reference"/>
                    )}
                    {resultPngUrl && (
                        <img ref={examImageRef} src={resultPngUrl} alt="result"/>
                    )}
                </div>
            </div>
        </div>
    );
}

export {ChallengeInspector}
