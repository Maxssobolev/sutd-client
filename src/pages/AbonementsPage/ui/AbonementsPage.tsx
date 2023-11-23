import { FC, useCallback, useState } from 'react';
import classes from './AbonementsPage.module.scss';
import { IPage } from 'shared/types/page.interface';
import { DataGrid, GridSortItem, GridSortModel } from '@mui/x-data-grid';
import { myDG } from 'shared/config/dataGridCustomOpt';
import { columns } from '../config/table.config';
import useSWR, { SWRResponse } from 'swr';
import { type Client } from 'entities/Client';
import { $hostGet } from 'shared/http/helpers/hostGet';
import { GetResponse } from 'shared/types/api/getResponse';
import { GetAllClients } from 'shared/types/api/clients';
import { TextInput } from 'flowbite-react';
import {HiOutlineSearch} from 'react-icons/hi'
import { GetAllAbonements } from 'shared/types/api/abonements';
import { CButton } from '@coreui/react';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { abonementActions } from 'entities/Abonement';

export const AbonementsPage: FC<IPage> = ({name}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [term, setTerm] = useState('');
  const [queryOptions, setQueryOptions] = useState<{ sortModel: GridSortItem[] } | ''>('');
  
  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    setQueryOptions({ sortModel: [...sortModel] });
  }, []);
  
  const { data: abonements, isLoading }: SWRResponse<GetResponse<GetAllAbonements>> = useSWR(
    `api/abonements?page=${paginationModel.page}&limit=${paginationModel.pageSize}&search=${term}&sortmodel=${JSON.stringify(queryOptions)}`,
    $hostGet,
  );

  return (
    <div className={classes.OrdersPage}>
      <h1 className='text-lg'>{name}</h1>
      <div className="mt-9 flex justify-between">
        <div className={classes.controls}>
          <CButton color='primary' variant="outline" onClick={() => store.dispatch(abonementActions.select(-1))}>Добавить</CButton>
        </div>
        <TextInput
          sizing="large"
          type="text"
          rightIcon={HiOutlineSearch}
          placeholder='Поиск по названию'
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </div>
      <div className='mt-9'>
        <DataGrid
          {...myDG}
          getRowId={(row) => row.abonement_id}
          autoHeight
          columns={columns}
          rows={abonements?.rows || []}
          rowCount={abonements?.count}
          disableColumnMenu
          onSortModelChange={handleSortModelChange}
          sortingMode="server"
          pagination
          loading={isLoading}
          pageSizeOptions={[25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          keepNonExistentRowsSelected
        />
      </div>
    </div>
  );
}