import { GetAllOrders, GetOneOrder } from "shared/types/api/orders";

import { AiOutlineDelete } from "react-icons/ai";
import { FC } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { modalActions } from "entities/Modal";
import { orderActions } from "entities/Order";
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


export const OrderNotesFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData: GetAllOrders = cell.row;
  return (
    <div className="MuiDataGrid-cellContent">
      {!cellData.order_notes || cellData.order_notes == 'null' ?  'нет' : cellData.order_notes}
    </div>
  );
};


export const ActionFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData: GetOneOrder = cell.row;
  const open = () => store.dispatch(orderActions.select(cellData.order_id));
  const openDeleteModal = () => store.dispatch(modalActions.openWith({
    type: 'delete',
    confirmationText: `${cellData.client_fio}`,
    payload: {
      entityId: cellData.order_id,
      entityName: 'order'
    },
    
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