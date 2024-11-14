import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@mui/material';
import { Iconify } from '../../utils/iconify';
import { TableMoreMenu } from '../../section/TableMoreMenu';

import { addNewRow, changeChildElements, changeChildSummary, changeParentSummary, createChild, deleteRow, deleteRowTags, filterTags, onDeleteChild, onDeleteParent } from '../../redux/Slice/links'
import { LinksGrid } from '../linksGrid/LinksGrid';

export const FieldLinks = {
  TITLE: 'title',
  LINKS: 'links',
  DESC: 'description',
  TAGS: 'tags',
}

const columns = [
  { field: FieldLinks.TITLE, headerName: 'Title' },
  { field: FieldLinks.LINKS, headerName: 'Links' },
  { field: FieldLinks.DESC, headerName: 'Description' },
  { field: FieldLinks.TAGS, headerName: 'Tags' }
];

export const LinkParent = ({ parentId, parentSummary, childrens }) => {
  const [openMenu, setOpenMenuActions] = React.useState(null);
  const [parentInput, setParentInput] = React.useState(parentSummary);
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleParentSummary = (e) => {
    setParentInput(e.target.value)
    dispatch(changeParentSummary({ parentId, value: e.target.value }))
  };
  const handleChildSummary = ({ childrenId, value }) => {
    dispatch(changeChildSummary({ parentId, value, childrenId }))
  };
  const deleteParent = () => {
    dispatch(onDeleteParent(parentId))
  }
  const deleteChild = (childrenId) => {
    dispatch(onDeleteChild({ childrenId, parentId }))
  }
  const createNewRow = (childrenId) => {
    const row = {
      valueId: Math.floor(Math.random() * (1950 - 50)) + 100,
      title: '',
      links: '',
      desc: '',
      tags: [],
    }
    dispatch(addNewRow({ parentId, childrenId, row }))
  }
  const createNewChildren = () => {
    const children = {
      childrenSummary: 'child title',
      childrenId: Math.floor(Math.random() * (1000 - 10)) + 10,
      valueItem: [
        {
          valueId: Math.floor(Math.random() * (1950 - 50)) + 100,
          title: '',
          links: '',
          desc: '',
          tags: [],
        },
      ],
      children: []
    }

    dispatch(createChild({ children, parentId }))
  };
  const onChangeChildren = ({ childrenId, value, type, valueId }) => {
    dispatch(changeChildElements({ childrenId, parentId, value, type, valueId }))
  };
  const onDeleteRow = ({ childrenId, valueId }) => {
    dispatch(deleteRow({ parentId, childrenId, valueId }))
  }
  const onDeleteTags = ({ childrenId, valueId, tagId }) => {
    dispatch(deleteRowTags({ parentId, childrenId, valueId, tagId }))
  }
  const onfilterTags = (value) => {
    dispatch(filterTags({ value, parentId }))
  }

  const styleInput = {
    width: '80%',
    padding: '10px',
    fontSize: '15px',
    borderКadius: '5px',
    border: '1px solid #000',
  }

  return (
    <Box sx={{ width: '100%', marginBottom: '10px !important' }}>
      <Accordion defaultExpanded	>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: '#fbd573' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input type='text' style={{ background: 'none', ...styleInput }} value={parentInput} onChange={handleParentSummary}
            />
            <TableMoreMenu
              open={openMenu}
              horizontal={true}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={
                <>
                  <MenuItem
                    onClick={() => {
                      deleteParent();
                      handleCloseMenu();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Delete rows
                  </MenuItem>
                </>
              }
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ position: 'relative' }}>
          <Container>
            <LinksGrid
              columns={columns}
              childElemnts={childrens}
              createNewChildren={createNewChildren}
              deleteChild={deleteChild}
              onChangeChildren={onChangeChildren}
              createNewRow={createNewRow}
              onDeleteRow={onDeleteRow}
              onDeleteTags={onDeleteTags}
              handleChildSummary={handleChildSummary}
              onfilterTags={onfilterTags}
            />
          </Container>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

