import { AbonementFormatter, ActionFormatter, LastCallFormatter, MentorFormatter } from '../helpers/formatters';

import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'client_name',
    headerName: 'ФИО клиента',
    flex: 1,
  },
  
  {
    field: 'notes',
    headerName: 'Заметки',
    flex: 0.7,
  },
  {
    field: 'status',
    headerName: 'Статус',
    flex: 0.5,
  },
  {
    field: 'createdat',
    headerName: 'Последнее обращение',
    //renderCell: cellData => (<LastCallFormatter cell={cellData} />),
    sortable: false,
    flex: 1,
  },
  {
    field: 'mentor_name',
    headerName: 'Сотрудник',
    //renderCell: cellData => (<MentorFormatter cell={cellData} />),
    sortable: false,
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