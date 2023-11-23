import { ActionFormatter, OrderNotesFormatter } from '../helpers/formatters';

import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: 'order_id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'client_fio',
    headerName: 'ФИО клиента',
    flex: 1,
  },
  
  {
    field: 'order_notes',
    headerName: 'Заметки',
    flex: 0.7,
    renderCell: cellData => (<OrderNotesFormatter cell={cellData} />),
  },
  {
    field: 'order_status',
    headerName: 'Статус',
    flex: 0.5,
  },
  {
    field: 'order_createdat',
    headerName: 'Последнее обращение',
    //renderCell: cellData => (<LastCallFormatter cell={cellData} />),
    flex: 1,
  },
  {
    field: 'mentor_name',
    headerName: 'Сотрудник',
    //renderCell: cellData => (<MentorFormatter cell={cellData} />),
    flex: 1,
  },
  {
    field: 'action',
    headerName: '',
    renderCell: cellData => (<ActionFormatter cell={cellData} />),
    sortable: false,
    width:100
  },
    
];