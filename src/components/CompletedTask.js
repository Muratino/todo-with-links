import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { setReturnTask, setDeleteCompletedTask } from '../redux/Slice/todo';
import { statusStyle } from '../utils/statusStyle';

const CompletedTask = ({ id, date, task, status, links, result, assign }) => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = React.useState(true);

  const handleChangeLabel = (e) => {
    setSelectValue(e.target.checked)
    dispatch(setReturnTask({id}))
  };

  const handleDeleteTask = () => {
    dispatch(setDeleteCompletedTask(id))
  };

  const style = statusStyle(status);

  return (
    <div className='task'>
      <div
        className="task__input d-flex bordered">
        <input type="checkbox" id={id} checked={selectValue} onChange={handleChangeLabel} />
        <label htmlFor={id}>{date}</label>
      </div>
      <div className="task__status d-flex bordered" >
        <div style={style} className="task__status-oval">
          <span>{status}</span>
        </div>
      </div>
      <div className="task__name bordered" style={{ padding: '8px', boxSizing: 'border-box' }}>
        <span>{task}</span>
      </div>
      <div className="task__name d-flex bordered" >
        <span>Assign: {assign}</span>
      </div>
      <div className="task__name d-flex bordered" style={{ border: '1px solid rgb(209, 209, 209)' }}>
        <span>{links}</span>
      </div>
      <div className="task__name d-flex bordered " >
        <span>{result}</span>
      </div>
      <div className="task__name d-flex bordered">
        <IconButton
          onClick={handleDeleteTask}
          color="error"
          aria-label="delete"
          size="large"
          sx={{ padding: 0 }}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CompletedTask;