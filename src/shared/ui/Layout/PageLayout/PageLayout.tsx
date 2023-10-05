import { FC, ReactNode } from 'react';
import classes from './PageLayout.module.scss';

interface PageLayoutProps {
    className?: string;
    children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({className, children}) => {

  return (
    <div className={classes.PageLayout}>{children}</div>
  );
}