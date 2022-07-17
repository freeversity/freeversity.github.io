import {FC, useMemo, useRef, useState} from 'react';
import cx from 'classnames';
import './PreviewFrame.scss';
import { ExpectType } from '../../pages/Task/Task';

const domParser = new DOMParser();

export interface PreviewFrameProps {
  markup: string;
  markupFileName: string;
  css: string;
  cssFileName?: string;
  baseUrl: string;
  className?: string;
  scripts?: ExpectType['scripts'];
  onReady?: (iFrame: HTMLIFrameElement) => void;
}

const PreviewFrame: FC<PreviewFrameProps> = ({
  markup,
  markupFileName,
  css,
  cssFileName,
  baseUrl,
  className,
  scripts,
  onReady
}) => {
  const [framePathName, setFramePathName] = useState<string>('srcdoc');
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const isSvg = markupFileName.endsWith('svg');

  const {content: srcDoc, title} = useMemo(() => {
    let parsedDoc = domParser.parseFromString(markup, isSvg ? 'image/svg+xml' : 'text/html');

    if (isSvg) {
      const doc = domParser.parseFromString(`
        <!DOCTYPE html>
        <html>
          <head>
            <style id="${cssFileName}">
            ${css}
            </style>
          </head>
          <body>
          </body>
        </html>
      `, 'text/html');

      doc.body.append(parsedDoc.querySelector('svg')!);

      parsedDoc = doc;
    }

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

    return {
      content: `
      ${parsedDoc.doctype ? `<!DOCTYPE ${parsedDoc.doctype.name}>` : ''}
      ${parsedDoc.documentElement.outerHTML}
      `, 
      title: title?.innerHTML
    };
  }, [markup, css, cssFileName, baseUrl, isSvg]);

  const onLoad = () => {
    let pathName: string;
    let win: Window | undefined;
    let doc: Document | undefined;
    try {
      pathName = iFrameRef.current?.contentWindow?.location.pathname!;
      win = iFrameRef.current!.contentWindow!;
      doc = win.document;
    } catch {
      pathName = 'RESTRICTED'
    }
    
    if (pathName === 'srcdoc') {
      const win = iFrameRef.current!.contentWindow!;

      const anchorLinks = win.document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

      for (let anchor of anchorLinks) {
        const hashLink = anchor.getAttribute('href')!;
        anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const doc = iFrameRef.current!.contentWindow!.document;

          doc.location.hash = '';
          doc.location.hash = hashLink;    
        });
      }
    }

    for (let script of scripts ?? []) {
      switch (script.type) {
        case 'handler': {
          const { target, eventType, handler} = script;

          const parsedHandler = new Function('document', 'window', 'e', handler);

          iFrameRef.current!.contentWindow!.addEventListener(eventType, (e) => {
            if ((e!.target! as HTMLElement).closest(target)) {
              parsedHandler.call(win, doc, win, e);
            }
          });
          break;
        }
        case 'exec': {
          const { body } = script;

          const parsedScript = new Function('document', 'window', body);

          parsedScript.call(win, doc, win);
        }

      }

    }

    if (framePathName !== pathName) {
      setFramePathName(pathName);      
    };

    onReady?.(iFrameRef.current!);
  };

  const onGoBack = () => {
    try {
      iFrameRef.current?.contentWindow?.history.back();
    } catch {
      iFrameRef.current!.srcdoc = srcDoc;
    }
  };

  return (
    <div 
      className={cx('preview-frame', className)} 
    >
      <div className={cx('preview-frame__grid')}>
        <div className={cx('preview-frame__header')}>
          {framePathName !== 'srcdoc' && (
              <button 
                onClick={onGoBack}  
                className={cx('preview-frame__back-btn')}
              >
                &lt;
              </button>
          )}
          <div className={cx('preview-frame__title')}>{title}</div>
        </div>
        <iframe onLoad={onLoad}
          ref={iFrameRef}
          srcDoc={srcDoc} 
          title={title ?? markupFileName}
          // sandbox='allow-scripts allow-same-origin'
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
