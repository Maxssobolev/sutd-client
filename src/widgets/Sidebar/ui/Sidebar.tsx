import { FC, MouseEvent } from 'react';

import { Sidebar as FSidebar } from 'flowbite-react';
import classes from './Sidebar.module.scss';
import routes from 'shared/config/routes';
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({className}) => {
  const navigate = useNavigate();
  const linkTo = (e: MouseEvent<HTMLElement>) => (link: string) => {
    e.preventDefault();
    navigate(link)
  }

  return (
    <div className={classes.Sidebar}>
      <FSidebar>
        <FSidebar.Logo 
          href=""
          img='/img/2.png'
          onClick={(e) => linkTo(e)('/dashboard')}
        >
          <p className='text-white text-lg tracking-wide'>Fiteness Panel</p> 
        </FSidebar.Logo>
        <FSidebar.Items>
          <FSidebar.ItemGroup>
            {routes.map((route, idx) => <FSidebar.Item
              key={idx}
              href=""
              icon={route.icon}
              onClick={(e: MouseEvent<HTMLElement>) => linkTo(e)(route.path)}
            >
              <p>
                {route.name}
              </p>
            </FSidebar.Item>
            )}
          </FSidebar.ItemGroup>
        </FSidebar.Items>
      </FSidebar>
    </div>
  );
}