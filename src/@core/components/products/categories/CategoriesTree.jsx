import React from 'react'
import Box from '@mui/material/Box'
import TreeItem from '@mui/lab/TreeItem'
import { alpha, styled } from '@mui/material/styles'
import MuiTreeView from '@mui/lab/TreeView'
import Icon from 'src/@core/components/icon'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

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

const renderTree = node => (
  <TreeItem key={node.id} nodeId={node.id.toString()} label={node.label}>
    {Array.isArray(node.children) ? node.children.map(child => renderTree(child)) : null}
  </TreeItem>
)

const CategoriesTree = ({ data }) => {
  console.log(data)

  return (
    <TreeView
      sx={{ margin: '10px 20px' }}
      defaultExpanded={['1']}
      defaultExpandIcon={
        <Box sx={{ display: 'flex', padding: '5px 10px' }}>
          <Icon icon='mdi:plus-box-outline' />
        </Box>
      }
      defaultCollapseIcon={
        <Box sx={{ display: 'flex', padding: '5px 10px' }}>
          <Icon icon='mdi:minus-box-outline' />
        </Box>
      }
      defaultEndIcon={
        <Box sx={{ display: 'flex', padding: '5px 10px' }}>
          <Icon icon='mdi:close-box-outline' className='close' />
        </Box>
      }
    >
      {data ? (
        <>{data.map(node => renderTree(node))}</>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '16px 0'
          }}
        >
          <Box>
            <ProgressCustomization />
          </Box>
        </Box>
      )}
    </TreeView>
  )
}

export default CategoriesTree
