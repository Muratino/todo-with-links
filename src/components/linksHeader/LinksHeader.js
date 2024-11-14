import React, { useEffect } from 'react';
import { Typography } from '@mui/material';

export const LinksHeader = ({ field, headerName, onfilterTags }) => {
  const [valueInputDate, setValueInputDate] = React.useState(headerName);

  const handleChangeDate = (event) => {
    const {
      target: { value },
    } = event;
    setValueInputDate(value);
    setTimeout(() => {
      onfilterTags(value.toLowerCase())
    }, 500);
  };

  return (
    <>
      {
        field === 'tags'
          ? <input type='text' value={valueInputDate} onChange={handleChangeDate} />
          : <Typography className='borderRL'>{headerName}</Typography>
      }
    </>
  );
};
