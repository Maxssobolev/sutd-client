import { AiOutlineDelete } from "react-icons/ai";
import { FC } from "react";
import { GetOneAbonement } from "shared/types/api/abonements";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { abonementActions } from "entities/Abonement";
import { modalActions } from "entities/Modal";
import { store } from "app/providers/ReduxProvider/ui/ReduxProvider";

export const ActionFormatter: FC<{ cell: GridRenderCellParams }> = ({ cell }) => {
  const cellData: GetOneAbonement = cell.row;
  const open = () => store.dispatch(abonementActions.select(cellData.abonement_id))
  const openDeleteModal = () => store.dispatch(modalActions.openWith({
    type: 'delete',
    confirmationText: `${cellData.abonement_title}`,
    payload: {
      entityId: cellData.abonement_id!,
      entityName: 'abonement'
    },
    additionalText: 'У всех клиентов будут удалены записи о покупке этого абонемента!',
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