import {FC} from 'react';
import cx from 'classnames';
import './TaskInspector.scss';

import { ExpectType } from '../../pages/Task/Task';
import { Markdown } from '../Markdown/Markdown';

export interface TaskInspectorProps {
    doneAsserts: Set<string>;
    expect: ExpectType;
    className?: string;
}

const TaskInspector: FC<TaskInspectorProps> = ({
    doneAsserts,
    expect,
    className,
}) => {
  const items = expect.assertions.map(({name, title}) => (
    <li 
      key={name}
      className={cx(
          'task-inspector__assert-item', 
          {
              'task-inspector__assert-item--done': doneAsserts.has(name),
              'task-inspector__assert-item--strict': expect.strict
          }
      )}
    >
      <Markdown>{title}</Markdown>
    </li>
  )) ;

  return (
    <div 
      className={cx('task-inspector', className)} 
    >
      <div className={cx('task-inspector__wrapper')}>
          {expect.introTitle && (
            <Markdown>{expect.introTitle}</Markdown>
          )}
          {!expect.strict && (
            <ul className={cx('task-inspector__assertion-list--loose')}>{items}</ul>
          )}
          {expect.strict && (
            <ol className={cx('task-inspector__assertion-list--strict')}>{items}</ol>
          )}
          {expect.footnoteTitle && (
            <Markdown>{expect.footnoteTitle}</Markdown>
          )}
      </div>

    </div>
  );
}

export {TaskInspector}
