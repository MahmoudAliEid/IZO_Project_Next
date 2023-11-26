// ** MUI Imports
import Box from '@mui/material/Box'
import TreeItem from '@mui/lab/TreeItem'
import { alpha, styled } from '@mui/material/styles'
import MuiTreeView from '@mui/lab/TreeView'

// import { Button } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled TreeView component
const TreeView = styled(MuiTreeView)(({ theme }) => ({
  minHeight: 264,
  '& .MuiTreeItem-iconContainer .close': {
    opacity: 0.3
  },
  '& .MuiTreeItem-group': {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}))

const dummyData = {
  id: '1',
  label: 'Main',
  children: [
    {
      id: '2',
      label: 'Hello'
    },
    {
      id: '3',
      label: 'Subtree with children',
      children: [
        {
          id: '6',
          label: 'Hello'
        },
        {
          id: '7',
          label: 'Sub-subtree with children',
          children: [
            {
              id: '9',
              label: 'Child 1'
            },
            {
              id: '10',
              label: 'Child 2'
            },
            {
              id: '11',
              label: 'Child 3'
            }
          ]
        },
        {
          id: '8',
          label: 'Hello'
        }
      ]
    },
    {
      id: '4',
      label: 'World'
    },
    {
      id: '5',
      label: 'Something something'
    }
  ]
}
const CategoriesTree = () => {
  const renderTree = nodes => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label}>
      {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
    </TreeItem>
  )

  return (
    <TreeView
      defaultExpanded={['1']}
      defaultExpandIcon={
        <Box sx={{ display: 'flex' }}>
          <Icon icon='mdi:plus-box-outline' />
        </Box>
      }
      defaultCollapseIcon={
        <Box sx={{ display: 'flex' }}>
          <Icon icon='mdi:minus-box-outline' />
        </Box>
      }
      defaultEndIcon={
        <Box sx={{ display: 'flex' }}>
          <Icon icon='mdi:close-box-outline' className='close' />
        </Box>
      }
    >
      {renderTree(dummyData)}
    </TreeView>
  )
}

export default CategoriesTree
