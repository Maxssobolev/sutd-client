import { LabelDisplayedRowsArgs, Stack } from '@mui/material';

export const myDG = {
  localeText: {
    MuiTablePagination: {
      labelDisplayedRows: ({ from, to, count }: LabelDisplayedRowsArgs) => `с ${from} по ${to} из ${count}`,
      labelRowsPerPage: `Показывать строк`,
    },
  },
  sx: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
      outline: 'none !important',
    },
  },
  components: {
    NoRowsOverlay: () => {
      return (
        <Stack height="100%" alignItems="center" justifyContent="center">
          Нет записей
        </Stack>
      );
    },
  },
};
