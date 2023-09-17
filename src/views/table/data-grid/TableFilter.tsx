'use client'

// ** React Imports
import { ChangeEvent, useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType, SalesGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColDef[] = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Name',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderClient(params)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.contact ? row.contact : 'John Doe'}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Total',
    field: 'final_total',
    valueGetter: (params: GridRenderCellParams) => {
      if (params.value !== null && params.value !== undefined) {
        return Math.round(params.value * 100) / 100;
      } else {
        return 'John Doe';
      }
    },
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.value}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'invoice_no',
    headerName: 'Invoice',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.invoice_no ? params.row.invoice_no : 'John Doe'}
      </Typography>
    )
  },

  {
    flex: 0.125,
    field: 'payment_status',
    minWidth: 80,
    headerName: 'payment status',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.payment_status ? params.row.payment_status : 'John Doe'}
      </Typography>
    )
  },


  {

    flex: 0.2,
    minWidth: 140,
    field: 'transaction_date',
    headerName: 'Date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.transaction_date ? params.row.transaction_date.split(" ")[0] : 'John Doe'}
      </Typography>
    )

  },

  {
    flex: 0.2,
    minWidth: 140,
    field: 'type',
    headerName: 'Type',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.type ? params.row.type : 'John Doe'}
      </Typography>
    )
  }
]

const TableColumns = ({ UserData, title }: any) => {
  if (title === "purchase" && UserData) {
    console.log(UserData.purchase)
  }


  // ** States
  const [data, setData] = useState<SalesGridRowType[]>([])
  useEffect(() => {
    if (UserData) {
      if (title === "sale") {
        setData(UserData.sale)
      } else if (title === "purchase") {
        setData(UserData.purchase)
      } else (
        setData([])
      )
    }
  }, [UserData])
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<SalesGridRowType[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  // lisght to card height 
  const cardRef = useRef(null);

  const handleCardHeightChange = (newHeight) => {
    // Your custom logic for handling the height change goes here
    // You can call any function or update state as needed
    console.log('Handling card height change:', newHeight);
  };
  useEffect(() => {
    const observeCardHeight = () => {
      const card = cardRef.current;

      if (card) {
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            // Handle the height change here
            const newHeight = entry.contentRect.height;
            console.log(`Card height changed to ${newHeight}px`);

            // Call your custom function here with the new height
            handleCardHeightChange(newHeight);
          }
        });

        observer.observe(card);

        return () => {
          observer.unobserve(card);
        };
      }
    };

    observeCardHeight();
  }, []);





  return (
    <Card style={{ height: "100%", width: "100%" }} ref={cardRef}>
      <CardHeader title={`${title} Report`} />
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default TableColumns
