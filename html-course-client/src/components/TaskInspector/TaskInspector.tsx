import {FC, useEffect, useState} from 'react';
import cx from 'classnames';
import './TaskInspector.scss';
import {expect as expectFunc} from '../../expect'

import { ExpectType } from '../../pages/Task/Task';
import { Markdown } from '../Markdown/Markdown';

export interface TaskInspectorProps {
    previewWindow: Window;
    expect: ExpectType;
    className?: string;
    html: string;
    css?: string;
}

const TaskInspector: FC<TaskInspectorProps> = ({
    previewWindow,
    expect,
    className,
    html,
    css,
}) => {
    const [doneAsserts, setDoneAsserts] = useState<Set<string>>(new Set());

    useEffect(() => {
        const timerId = setTimeout(() => {
            const passedAsserts: string[] = expect.assertions
                .map(({name, expect: expectBody}) => {
                    const func = new Function('expect', 'document', expectBody);
    
                    try {
                        func.call(previewWindow, expectFunc, previewWindow.document);
    
                        return name;
                    } catch {
                        return null
                    }
                })
                .filter((name): name is string => !!name);
    
            setDoneAsserts((doneAsserts) => new Set([...Array.from(doneAsserts), ...passedAsserts]));

        }, 200);

        return () => {
            clearTimeout(timerId);
        }
    }, [previewWindow, expect.assertions, html, css]);


  return (
    <div 
      className={cx('task-inspector', className)} 
    >
      <div className={cx('task-inspector__wrapper')}>
          <ul>
              {expect.introTitle && (
                  <p>{expect.introTitle}</p>
              )}
              {
                 expect.assertions.map(({name, title}) => (
                     <li 
                        key={name}
                        className={cx(
                            'task-inspector__assert-item', 
                            {'task-inspector__assert-item--done': doneAsserts.has(name)}
                        )}
                    >
                        <Markdown>{title}</Markdown>
                    </li>
                 )) 
              }
          </ul>
      </div>

    </div>
  );
}

export {TaskInspector}
