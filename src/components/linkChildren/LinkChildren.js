import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Iconify } from '../../utils/iconify';
import { TableMoreMenu } from '../../section/TableMoreMenu';

export const LinkChildren = ({
  childrenId,
  valueId,
  title,
  links,
  desc,
  tags,
  onChangeChildren,
  onDeleteRow,
  onDeleteTags,
}) => {

  const [valueInputLinks, setValueInputLinks] = React.useState(links);
  const [valueInputTask, setValueInputTask] = React.useState(title);
  const [valueDesc, setValueDesc] = React.useState(desc);
  const [valueTags, setValueTags] = React.useState('');
  const [openInputTags, setOpenInputTags] = React.useState(false);
  const [isDeleteTags, setIsDeleteTags] = React.useState(false);
  const [openMenu, setOpenMenuActions] = React.useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleChangeLinks = (event) => {
    const {
      target: { value },
    } = event;
    setValueInputLinks(value);
    setTimeout(() => {
      onChangeChildren({ childrenId, value, type: 'links', valueId })
    }, 400);
  };

  const handleChangeTaskName = (event) => {
    const {
      target: { value },
    } = event;
    setValueInputTask(value);
    setTimeout(() => {
      onChangeChildren({ childrenId, value, type: 'title', valueId })
    }, 400);
  };

  const handleChangeDesc = (event) => {
    const {
      target: { value },
    } = event;
    setValueDesc(value);
    setTimeout(() => {
      onChangeChildren({ childrenId, value, type: 'desc', valueId })
    }, 400);
  };

  const handleChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setValueTags(value);
  };

  const saveNewTags = () => {
    if (valueTags) {
      onChangeChildren({ childrenId, value: { tagName: valueTags.toLowerCase(), tagId: Math.floor(Math.random() * (423 - 5)) + 10 }, type: 'tags', valueId })
      setOpenInputTags(false)
      setValueTags('')
    }
  }

  const deleteTag = (tagId) => {
    onDeleteTags({ childrenId, valueId, tagId })
    setIsDeleteTags(false)
  }

  return (
    <Box sx={{ margin: '5px 0', padding: 0, width: '100%' }}>
      <Table>
        <TableBody>
          <TableRow hover>
            <div className="links-task">
              <div className="links-task-item bordered">
                <input type="text" name={`title${childrenId}`} value={valueInputTask} onChange={handleChangeTaskName} />
              </div>

              <div className="links-task-item bordered">
                <input type="text" name={`links${childrenId}`} value={valueInputLinks} onChange={handleChangeLinks} />
              </div>

              <div className="links-task-item bordered">
                <textarea name={`desc${childrenId}`} value={valueDesc} onChange={handleChangeDesc} />
              </div>

              <div className='links-task-item bordered' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', overflowY: 'auto', flexWrap: 'wrap' }}>
                  {
                    isDeleteTags
                      ? tags.map((el) => <Button
                        onClick={() => deleteTag(el.tagId)}
                        key={el.tagId}
                        size='small'
                        variant="outlined"
                        endIcon={<ClearIcon />}
                        sx={{ padding: '0 2px', minWidth: '48px !important', fontSize: '12px' }}>{el.tagName}</Button>)
                      : tags.map((el) => <Button key={el.tagId} size='small' sx={{ padding: '0', minWidth: '48px !important', fontSize: '12px' }}>{el.tagName}</Button>)

                  }
                </Box>
              </div>

              <div className="links-task-item bordered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <TableMoreMenu
                  open={openMenu}
                  onOpen={handleOpenMenu}
                  onClose={handleCloseMenu}
                  actions={
                    <>
                      <MenuItem
                        onClick={() => {
                          setOpenInputTags(prev => !prev);
                          handleCloseMenu();
                        }}
                        sx={{ color: 'success.main' }}
                      >
                        <Iconify icon={'eva:edit-fill'} />
                        Add tags
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setIsDeleteTags(true);
                          handleCloseMenu();
                        }}
                      >
                        <Iconify icon={'eva:trash-2-outline'} />
                        Delete tags
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          onDeleteRow({ childrenId, valueId });
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
                {
                  openInputTags
                    ? <div style={{ position: 'absolute', left: '45px', bottom: 0, width: '100px', backgroundColor: 'rgb(225 225 225)', padding: '5px' }}>
                      <input
                        style={{ borderRadius: '3px', margin: '0 0 5px 0' }}
                        type='text'
                        value={valueTags} onChange={handleChangeTags} />
                      <Button
                        sx={{ padding: 0, margin: 0 }}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={saveNewTags}>
                        Save
                      </Button>
                    </div>
                    : null
                }
              </div>
            </div>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
