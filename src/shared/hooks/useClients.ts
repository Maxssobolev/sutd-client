import { useEffect, useState } from 'react';

import { $host } from 'shared/http/host';
import { GetAllClients } from 'shared/types/api/clients';
import { GetResponse } from 'shared/types/api/getResponse';

export interface ISelectData {
  id: number;
  value: number;
  label: string | null;
}

function useClients(forSelect = true) {
  //GETTING TAGS
  const [data, setData] = useState<ISelectData[]>([]);
  useEffect(() => {
    $host.get<GetResponse<GetAllClients>>(`/api/clients?page=0&limit=1000&sortmodel=${JSON.stringify({sortModel: [{field: 'client_id', sort: 'ASC'}]})}`).then(({ data }) => {
      
      const preparedData: ISelectData[] = data.rows.map(client => ({
        id: client.client_id,
        label: `${client.client_id} | ${client.client_fio}`,
        value: client.client_id,

      }));

      setData(preparedData);
      
    }).catch(e => { console.log(e)});
  }, [forSelect]);

  return data;
}

export default useClients;
