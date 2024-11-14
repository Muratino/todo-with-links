import React from 'react';
import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
import { Box, Accordion, MenuItem } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Iconify } from '../../utils/iconify';
import { TableMoreMenu } from '../../section/TableMoreMenu';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { LinksHeader } from '../linksHeader/LinksHeader';
import { LinkChildren } from '../linkChildren/LinkChildren';
// import { useDispatch } from 'react-redux';
// import { deletefilter } from '../../redux/Slice/links';

export const LinksGrid = ({
  columns,
  childElemnts,
  createNewChildren,
  deleteChild,
  onChangeChildren,
  createNewRow,
  onDeleteRow,
  onDeleteTags,
  handleChildSummary,
  onfilterTags
}) => {
  // const dispatch = useDispatch();

  return (
    <>
      <div className="parent">
        <div className="parent__header links-grid">
          {
            columns.map((el) => <LinksHeader
              onfilterTags={onfilterTags}
              key={el.field}
              {...el}
            />)
          }
          {/* <IconButton
            onClick={() => dispatch(deletefilter())}
            sx={{ padding: 0, width: '20px' }}
            aria-label="delete" size="large">
            <ClearIcon />
          </IconButton> */}
        </div>
        <div className="parent__body">
          <Box sx={{ margin: 0, padding: 0, width: '100%' }}>
            {
              childElemnts.map(el => <View
                key={el.childrenId}
                deleteChild={deleteChild}
                onChangeChildren={onChangeChildren}
                createNewRow={createNewRow}
                onDeleteRow={onDeleteRow}
                onDeleteTags={onDeleteTags}
                handleChildSummary={handleChildSummary}
                {...el} />)
            }
          </Box>
        </div>
        <IconButton
          onClick={createNewChildren}
          sx={{ padding: 0, width: '20px', position: 'absolute', bottom: '15px', left: '15px' }} color='warning'>
          <AddCircleOutlineRoundedIcon fontSize='large' />
        </IconButton>
      </div>
    </>
  );
};

const View = ({
  childrenId,
  childrenSummary,
  deleteChild,
  onChangeChildren,
  createNewRow,
  valueItem,
  onDeleteRow,
  onDeleteTags,
  handleChildSummary,
  // children
}) => {
  const [openMenuAccordion, setOpenMenuAccordion] = React.useState(null);
  const [childInput, setChildInput] = React.useState(childrenSummary);

  const openAccordion = (event) => {
    setOpenMenuAccordion(event.currentTarget);
  };

  const closeAccordion = () => {
    setOpenMenuAccordion(null);
  };

  const handleChild = (e) => {
    setChildInput(e.target.value)
    handleChildSummary({ childrenId, value: e.target.value })
  }

  return (
    <Accordion defaultExpanded sx={{ marginBottom: '18px !important' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ backgroundColor: '#fbf0d4' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <input type='text' style={{ background: 'none', border: '1px solid #000' }} value={childInput} onChange={handleChild}
          />
          <TableMoreMenu
            open={openMenuAccordion}
            horizontal={true}
            onOpen={openAccordion}
            onClose={closeAccordion}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    deleteChild(childrenId);
                    closeAccordion();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete rows
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    createNewRow(childrenId);
                    closeAccordion();
                  }}
                  sx={{ color: 'success.main' }}
                >
                  <Iconify icon={'material-symbols:add-circle-outline'} />
                  Add new row
                </MenuItem>
              </>
            }
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {
          valueItem.map(el => <LinkChildren
            key={el.valueId}
            childrenId={childrenId}
            onChangeChildren={onChangeChildren}
            onDeleteRow={onDeleteRow}
            onDeleteTags={onDeleteTags}
            {...el} />)
        }
      </AccordionDetails>
    </Accordion>
  )
}
