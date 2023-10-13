import { FC, useCallback, useState } from 'react';
import classes from './ClientsPage.module.scss';
import { IPage } from 'shared/types/page.interface';
import { DataGrid, GridSortItem, GridSortModel } from '@mui/x-data-grid';
import { myDG } from 'shared/config/dataGridCustomOpt';
import { columns } from '../config/table.config';
import useSWR, { SWRResponse } from 'swr';
import { type Client } from 'entities/Client';
import { $hostGet } from 'shared/http/helpers/hostGet';
import { GetResponse } from 'shared/types/api/getResponse';
import { GetAllClients } from 'shared/types/api/clients';


export const ClientsPage: FC<IPage> = ({name}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [term, setTerm] = useState('');
  const [queryOptions, setQueryOptions] = useState<{ sortModel: GridSortItem[] } | ''>('');
  
  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    setQueryOptions({ sortModel: [...sortModel] });
  }, []);
  
  const { data: clients, isLoading }: SWRResponse<GetResponse<GetAllClients>> = useSWR(
    `api/clients?page=${paginationModel.page}&limit=${paginationModel.pageSize}&search=${term}&sortmodel=${JSON.stringify(queryOptions)}`,
    $hostGet,
  );

  return (
    <div className={classes.ClientsPage}>
      <h1 className='text-lg'>{name}</h1>
      <div className='mt-9'>
        <DataGrid
          {...myDG}
          autoHeight
          columns={columns}
          rows={clients?.rows || []}
          rowCount={clients?.count}
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