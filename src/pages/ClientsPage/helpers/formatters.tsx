import { GridRenderCellParams } from "@mui/x-data-grid";
import { FC } from "react";
import { HiOutlineBookOpen } from 'react-icons/hi';


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
export const MentorFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData = cell.row;
  return (
    <div>
      Соболев М.С.
    </div>
  );
};

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