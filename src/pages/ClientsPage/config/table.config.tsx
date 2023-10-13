import { AbonementFormatter, ActionFormatter, LastCallFormatter, MentorFormatter } from '../helpers/formatters';
import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'fio',
    headerName: 'ФИО клиента',
    flex: 1,
  },
  {
    field: 'dob',
    headerName: 'Дата рождения',
    flex: 0.5,
  },
  {
    field: 'phone',
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