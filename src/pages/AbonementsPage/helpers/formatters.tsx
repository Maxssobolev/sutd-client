import { FC } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineBookOpen } from 'react-icons/hi';

//TODO:change
export const ActionFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  const open = () => {

  }
  return (
    <div>
      <button onClick={open}>
        <HiOutlineBookOpen />
      </button>
    </div>
  );
};