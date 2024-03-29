// ** React Imports
import { ChangeEvent } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {
  GridToolbarFilterButton,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

interface Props {
  value: string;
  clearSearch: () => void;
  onChange: (e: ChangeEvent) => void;
}

const QuickSearchToolbar = (props: Props) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const fileName = `exported_izo_data_${currentDate}`;

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(2, 6, 4, 6),
      }}
    >
      <GridToolbarFilterButton />
      <GridToolbarContainer>
        <GridToolbarExport
          options={{
            exportAllData: true,
            exportFileName: fileName,
            formats: ['csv', 'xls', 'pdf'],
          }}
        />

      </GridToolbarContainer>
      <TextField
        size="small"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon icon="bx:search" fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton
              size="small"
              title="Clear"
              aria-label="Clear"
              onClick={props.clearSearch}
            >
              <Icon icon="bx:x" fontSize={20} />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          '& .MuiInputBase-root > svg': {
            mr: 2,
          },
        }}
      />
    </Box>
  );
};

export default QuickSearchToolbar;
