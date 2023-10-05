import { FC, MouseEvent } from 'react';
import classes from './Sidebar.module.scss';
import { Sidebar as FSidebar } from 'flowbite-react';
import { HiChartPie, HiUsers, HiClipboard } from 'react-icons/hi';
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
            <FSidebar.Item
              href=""
              icon={HiChartPie}
              onClick={(e: MouseEvent<HTMLElement>) => linkTo(e)('/dashboard')}
            >
              <p>
                Панель управления
              </p>
            </FSidebar.Item>
            <FSidebar.Item
              href=""
              icon={HiUsers}
              onClick={(e: MouseEvent<HTMLElement>) => linkTo(e)('/clients')}
            >
              <p>
                Клиенты
              </p>
            </FSidebar.Item>
            <FSidebar.Item
              href=""
              icon={HiClipboard}
              onClick={(e: MouseEvent<HTMLElement>) => linkTo(e)('/orders')}
            >
              <p>
                Заявки
              </p>
            </FSidebar.Item>
            
          </FSidebar.ItemGroup>
        </FSidebar.Items>
      </FSidebar>
    </div>
  );
}