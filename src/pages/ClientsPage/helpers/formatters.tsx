import "moment/locale/ru";

import { FC } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { clientActions } from "entities/Client/slice";
import moment from "moment";
import { store } from "app/providers/ReduxProvider/ui/ReduxProvider";

//TODO:change
export const AbonementFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  return (
    <div>
      нет
    </div>
  );
};

//TODO:change
export const LastCallFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  const mData = moment(cellData.last_order_date)
  const data = cellData.last_order_date ? mData.format('DD.MM.YYYY HH:mm:ss') : null;
  if(data) {
    return <div className="flex flex-col">
      {data}
      <sub className="text-red-600">{moment().diff(mData, 'days') >= 10 ? 'Прошло больше 10 дней' : ''}</sub>
    </div>
  }
  return (
    <div>
      Нет
    </div>
  );
};


//TODO:change
export const ActionFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  const open = () => store.dispatch(clientActions.select(cellData.client_id))
  
  return (
    <div>
      <button onClick={open}>
        <HiOutlineBookOpen />
      </button>
    </div>
  );
};