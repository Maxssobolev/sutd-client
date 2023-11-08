import { FC } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineBookOpen } from 'react-icons/hi';
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

//TODO:change
export const LastCallFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  return (
    <div>
      нет
    </div>
  );
};


//TODO:change
export const ActionFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  const open = () => store.dispatch(orderActions.select(cellData.order_id));
  
  return (
    <div>
      <button onClick={open}>
        <HiOutlineBookOpen />
      </button>
    </div>
  );
};