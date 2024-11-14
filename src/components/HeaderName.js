import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  setCreateDate,
  setCreateAssing,
  setCreateStatus,
  setFileter
} from '../redux/Slice/todo';
import strDate from '../utils/strDate';
import { Field } from './Todo';

const HeaderName = ({ field, headerName, editable, value, isInput }) => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = React.useState('');
  const [valueInputDate, setValueInputDate] = React.useState('');

  const handleChangeDate = (event) => {
    const {
      target: { value },
    } = event;
    const newStr = strDate(value);
    setValueInputDate(value);
    dispatch(setCreateDate(newStr))
    dispatch(setFileter({ type: 'date', value: newStr }))
  };

  const handleChangeStatus = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    field === Field.STATUS ? dispatch(setCreateStatus(value)) : dispatch(setCreateAssing(value))
    dispatch(setFileter({ type: field === Field.STATUS ? Field.STATUS : 'assign', value }))
  };

  if (editable) {
    return (
      <select name={field} id={field} value={selectValue} onChange={handleChangeStatus} style={field === Field.STATUS ? { fontWeight: '400' } : {}}>
        {
          field === Field.STATUS ? <option value="">Priority</option> : <option value="">Assigns</option>
        }
        {value.map((el, index) => <option key={index} value={el} >{el}</option>)}
      </select>
    )
  }
  if (isInput && field === Field.DATE) {
    return (
      <input value={valueInputDate} onChange={handleChangeDate} type="date" name='date' />
    )
  }
  return (
    <>
      <Typography>{headerName}</Typography>
    </>
  );
};

export default HeaderName;