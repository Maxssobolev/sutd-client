import { FC, useCallback, useState } from 'react';
import classes from './ClientsPage.module.scss';
import { IPage } from 'shared/types/page.interface';
import { DataGrid, GridSortItem, GridSortModel } from '@mui/x-data-grid';
import { myDG } from 'shared/config/dataGridCustomOpt';
import { columns } from '../config/table.config';
import useSWR, { SWRResponse } from 'swr';
import { type Client } from 'entities/Client';
import { $hostGet } from 'shared/http/helpers/hostGet';


export const ClientsPage: FC<IPage> = ({name}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [term, setTerm] = useState('');
  const [queryOptions, setQueryOptions] = useState<{ sortModel: GridSortItem[] } | ''>('');
  
  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    setQueryOptions({ sortModel: [...sortModel] });
  }, []);
  
  const { data: clients, isLoading }: SWRResponse<{ count: number; rows: Client[] }> = useSWR(
    `api/clients?page=${paginationModel.page}&limit=${paginationModel.pageSize}&searchUser=${term}&sortmodel=${JSON.stringify(queryOptions)}`,
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