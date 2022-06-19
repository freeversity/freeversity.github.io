import {FC} from 'react';
import cx from 'classnames';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

import './Markdown.scss';

export interface MarkdownProps {
    children: string;
    className?: string
}

const Markdown: FC<MarkdownProps> = ({className, children}) => {
    return (
        <ReactMarkdown 
            className={cx('markdown-container', className)} 
            rehypePlugins={[rehypeRaw]}
        >
            {children}
        </ReactMarkdown>
    )
}

export {Markdown}