import { ActionFormatter } from '../helpers/formatters';
import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: 'abonement_id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'abonement_title',
    headerName: 'Наименование',
    flex: 1,
  },
  
  {
    field: 'abonement_description',
    headerName: 'Описание',
    flex: 0.7,
  },
  {
    field: 'abonement_price',
    headerName: 'Стоимость, руб.',
    flex: 0.5,
  },
  {
    field: 'abonement_duration',
    headerName: 'Длительность, дн.',
    //renderCell: cellData => (<LastCallFormatter cell={cellData} />),
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