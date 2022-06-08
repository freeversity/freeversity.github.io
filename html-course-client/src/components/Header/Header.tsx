import { FC } from 'react';
import cx from 'classnames';
import './Header.scss';

export interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = ({className}) => {
    return (
        <header className={cx(className)}>
            
            Logo
            <nav>

            </nav>
        </header>
    )

}

export {Header}