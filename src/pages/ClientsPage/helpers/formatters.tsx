import "moment/locale/ru";

import { GetAllClients, GetOneClient } from "shared/types/api/clients";

import { AiOutlineDelete } from "react-icons/ai";
import { FC } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { clientActions } from "entities/Client/slice";
import { modalActions } from "entities/Modal";
import moment from "moment";
import { store } from "app/providers/ReduxProvider/ui/ReduxProvider";

export const AbonementFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData: GetAllClients = cell.row;
  const data = cellData.purchase_enddate ? moment(cellData.purchase_enddate).format('DD.MM.YYYY') : null;
  return (
    <div className="flex flex-col">
      <div>{cellData.abonement_status}</div>
      {data && cellData.purchase_ispaid && <sub className="text-green-600">до {data}</sub>}
    </div>
  );
};

export const LastCallFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData: GetAllClients = cell.row;
  const mData = moment(cellData.last_order_date)
  const data = cellData.last_order_date ? mData.format('DD.MM.YYYY HH:mm:ss') : null;
  if(data) {
    return <div className="flex flex-col">
      <div>{data}</div>
      {!cellData.purchase_ispaid && <sub className="text-red-600">{moment().diff(mData, 'days') >= 10 ? 'Прошло больше 10 дней' : ''}</sub>}
    </div>
  }
  return (
    <div>
      Нет
    </div>
  );
};

export const ActionFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData: GetAllClients = cell.row;
  const open = () => store.dispatch(clientActions.select(cellData.client_id))
  const openDeleteModal = () => store.dispatch(modalActions.openWith({
    type: 'delete',
    confirmationText: `${cellData.client_fio}`,
    payload: {
      entityId: cellData.client_id,
      entityName: 'client'
    },
    additionalText: 'Помните, что будут удалены так же связанные записи в других таблицах',
    isShow: true
  }));
  
  return (
    <div className="table-controls">
      <button onClick={open}>
        <HiOutlineBookOpen />
      </button>
      <button onClick={openDeleteModal}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};