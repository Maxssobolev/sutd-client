import { AbonementFormatter, ActionFormatter, LastCallFormatter } from '../helpers/formatters';

import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: 'client_id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'client_fio',
    headerName: 'ФИО клиента',
    flex: 1,
  },
  {
    field: 'client_dob',
    headerName: 'Дата рождения',
    flex: 0.5,
  },
  {
    field: 'client_phone',
    headerName: 'Телефон',
    flex: 0.7,
  },
  {
    field: 'abonement_status',
    headerName: 'Абонемент',
    //renderCell: cellData => (<AbonementFormatter cell={cellData} />),
    sortable: false,
    flex: 0.5,
  },
  {
    field: 'last_order_date',
    headerName: 'Последнее обращение',
    renderCell: cellData => (<LastCallFormatter cell={cellData} />),
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