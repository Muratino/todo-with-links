import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
  setComplatedTask,
  setDeleteTask,
  setChangeTaskStatus,
  setChangeTaskDate,
  setChangeTaskAssign,
  setChangeTaskLinks,
  setChangeTaskName,
} from '../redux/Slice/todo';
import { assignMoclArr, statusTasks } from './Todo';
import strDate from '../utils/strDate';
import { statusStyle } from '../utils/statusStyle';

const BodyTask = ({ id, date, task, status, links, result, assign }) => {
  const dispatch = useDispatch();
  const [valueCheckBox, setValueCheckBox] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState(false);
  const [valueDate, setValueDate] = React.useState(date);
  const [valueAssign, setValueAssign] = React.useState(assign);
  const [valueInputLinks, setValueInputLinks] = React.useState(links);
  const [valueInputTask, setValueInputTask] = React.useState(task);

  const handleChangeLabel = () => {
    setValueCheckBox(prev => !prev)
    dispatch(setComplatedTask(id))
  };

  const handleDeleteTask = () => {
    dispatch(setDeleteTask(id))
  };

  const handleChangeStatus = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    dispatch(setChangeTaskStatus({ id, status: value }));
  };

  const handleChangeDate = (event) => {
    const {
      target: { value },
    } = event;
    setValueDate(value);
    dispatch(setChangeTaskDate({ id, date: strDate(value) }));
  };

  const handleChangeAssign = (event) => {
    const {
      target: { value },
    } = event;
    setValueAssign(value);
    dispatch(setChangeTaskAssign({ id, assign: value }));
  };

  const handleChangeLinks = (event) => {
    const {
      target: { value },
    } = event;
    setValueInputLinks(value);
    setTimeout(() => {
      dispatch(setChangeTaskLinks({ id, links: value }))
    }, 400);
  };

  const handleChangeTaskName = (event) => {
    const {
      target: { value },
    } = event;
    setValueInputTask(value);
    setTimeout(() => {
      dispatch(setChangeTaskName({ id, task: value }))
    }, 400);
  };

  const style = statusStyle(status);

  return (
    <div className='task'>
      <div
        className="task__input d-flex bordered">
        <input type="checkbox" id={id} checked={valueCheckBox} onChange={handleChangeLabel} />
        <input type="date" name={`date${id}`} value={strDate(valueDate, true)} onChange={handleChangeDate} />
      </div>
      <div className="task__status d-flex bordered">
        <div style={style} className="task__status-oval bordered">
          <select style={style} name={`status${id}`} id={`status${id}`} value={selectValue} onChange={handleChangeStatus}>
            <option value="">{status}</option>
            {statusTasks.map((el, index) => el === status ? null : <option key={index} value={el} >{el}</option>)}
          </select>
        </div>
      </div>
      <div style={{ padding: '8px', boxSizing: 'border-box' }} className="task__name bordered">
        <input type="text" name={`task${id}`} value={valueInputTask} onChange={handleChangeTaskName} />
      </div>
      <div className="task__name d-flex bordered">
        <span>Assign:</span>
        <select name={`assign${id}`} id={`assign${id}`} value={valueAssign} onChange={handleChangeAssign}>
          <option value="">{assign}</option>
          {assignMoclArr.map((el, index) => el === assign ? null : <option key={index} value={el} >{el}</option>)}
        </select>
      </div>
      <div className="task__name d-flex bordered">
        <input type="text" name={`links${id}`} value={valueInputLinks} onChange={handleChangeLinks} />
      </div>
      <div className="task__name d-flex bordered">
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

export default BodyTask;
