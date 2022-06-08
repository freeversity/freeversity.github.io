import {FC, useLayoutEffect, useMemo, useRef} from 'react';
import cx from 'classnames';
import './PreviewFrame.scss';

const domParser = new DOMParser();

export interface PreviewFrameProps {
  html: string;
  htmlFileName: string;
  css: string;
  cssFileName?: string;
  baseUrl: string;
  className?: string;
  setPreviewWindow: (window: Window) => void;
}

const PreviewFrame: FC<PreviewFrameProps> = ({
  html,
  htmlFileName,
  css,
  cssFileName,
  baseUrl,
  className,
  setPreviewWindow
}) => {
  const iFrameRef = useRef<HTMLIFrameElement & {isLoaded?: boolean}>(null);
  const {content: srcDoc, title} = useMemo(() => {
    const parsedDoc = domParser.parseFromString(html, 'text/html');

    const title = parsedDoc.querySelector(`title`)

    const cssLink = cssFileName && parsedDoc.querySelector(`link[href="${cssFileName}"]`);
    const baseTag = document.createElement('base');

    baseTag.href = baseUrl;

    parsedDoc.head.prepend(baseTag);

    if (cssLink) {
      cssLink.remove();
  
      const style = document.createElement('style');
  
      style.innerHTML = css;
      style.id = cssFileName;

      parsedDoc.head.append(style);
    }

    return {content: parsedDoc.documentElement.innerHTML, title: title?.innerHTML};
  }, [html,css, cssFileName, baseUrl]);

  useLayoutEffect(() => {
    const iFrameWindow = iFrameRef.current?.contentWindow;
    const onLoad = () => {
      setPreviewWindow(iFrameWindow!);
    }

    iFrameWindow?.addEventListener('load', onLoad);

    return () => {
      iFrameWindow?.removeEventListener('load', onLoad);
    }

  }, [setPreviewWindow]);

  return (
    <div 
      className={cx('preview-frame', className)} 
    >
      <div className={cx('preview-frame__grid')}>
        <div className={cx('preview-frame__header')}>{title}</div>
        <iframe 
          ref={iFrameRef}
          srcDoc={srcDoc} 
          title={title ?? htmlFileName}
          sandbox='allow-scripts allow-same-origin'
          frameBorder="0" 
          className={cx('preview-frame__iframe')}
      >
        Browser not compatible.
      </iframe>  
      </div>

    </div>
  );
}

export {PreviewFrame}
