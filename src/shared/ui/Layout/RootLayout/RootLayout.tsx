import { FC, ReactNode } from 'react';
import classes from './RootLayout.module.scss';

interface RootLayoutProps {
    className?: string;
    children: ReactNode
}

export const RootLayout: FC<RootLayoutProps> = ({className, children}) => {

  return (
    <div className={classes.RootLayout}>{children}</div>
  );
}