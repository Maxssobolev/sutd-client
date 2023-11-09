import { useEffect, useState } from 'react';

import { $host } from 'shared/http/host';
import { Abonement } from 'entities/Abonement/model';
import { GetAllAbonements } from 'shared/types/api/abonements';
import { GetAllMentors } from 'shared/types/api/mentors';
import { GetResponse } from 'shared/types/api/getResponse';

export interface IAbonementSelectData {
  id: number;
  value: string;
  label: string | null;
}

function useAbonements(forSelect = true) {
  //GETTING TAGS
  const [data, setData] = useState<IAbonementSelectData[]>([]);
  useEffect(() => {
    $host.get<GetResponse<GetAllAbonements>>('/api/abonements?page=0&limit=1000&sortmodel=""').then(({ data }) => {
      
      const preparedData: IAbonementSelectData[] = data.rows.map(abn => ({
        id: abn.abonement_id || 0,
        label: `${abn.abonement_id} | ${abn.abonement_title}`,
        value: JSON.stringify(abn),

      }));

      setData(preparedData);
      
    }).catch(e => { console.log(e)});
  }, [forSelect]);

  return data;
}

export default useAbonements;
