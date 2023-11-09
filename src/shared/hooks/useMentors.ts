import { useEffect, useState } from 'react';

import { $host } from 'shared/http/host';
import { GetAllMentors } from 'shared/types/api/mentors';
import { GetResponse } from 'shared/types/api/getResponse';

export interface ISelectData {
  id: number;
  value: number;
  label: string | null;
}

function useMentors(forSelect = true) {
  //GETTING TAGS
  const [data, setData] = useState<ISelectData[]>([]);
  useEffect(() => {
    $host.get<GetResponse<GetAllMentors>>('/api/mentors?page=0&limit=1000&sortmodel=""').then(({ data }) => {
      
      const preparedData: ISelectData[] = data.rows.map(mentor => ({
        id: mentor.mentor_id,
        label: mentor.mentor_name,
        value: mentor.mentor_id,

      }));

      setData(preparedData);
      
    }).catch(e => { console.log(e)});
  }, [forSelect]);

  return data;
}

export default useMentors;
