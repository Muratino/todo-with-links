import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardContent } from '@mui/material';
import BodyTask from './BodyTask';
import HeaderName from './HeaderName';
import CompletedTask from './CompletedTask';
import {
  deletFilters,
  setCreateNewTask,
  setCreateTaskName,
} from '../redux/Slice/todo';

const TodoDataGrid = ({ columns }) => {
  const dispatch = useDispatch();
  const { createTask, todos, complatedTasks, isFiltering, filterTodos } = useSelector(state => state.todo)
  const [createTaskValue, setCreateTaskValue] = React.useState('');

  const handleChangeTaskName = (event) => {
    const {
      target: { value },
    } = event;
    setCreateTaskValue(value);
    setTimeout(() => {
      dispatch(setCreateTaskName(value))
    }, 400);
  };

  const createNewTask = () => {
    let newTask = {
      id: createTask.id ? createTask.id : Math.floor(Math.random() * (1000 - 10)) + 10,
      date: createTask.date ? createTask.date : new Date().toLocaleDateString(),
      status: createTask.status ? createTask.status : 'Minor',
      task: createTask.task ? createTask.task : 'New Task ...',
      assign: createTask.assign ? createTask.assign : 'Me',
      links: createTask.links ? createTask.links : '',
      result: createTask.result ? createTask.result : 'In work',
      cheked: false
    }
    dispatch(setCreateNewTask(newTask))
  };

  useEffect(() => {
    dispatch(deletFilters())
  }, [])

  return (
    <CardContent>
      <div className="parent">
        <div className="parent__header">
          {
            columns.map((el) => <HeaderName
              key={el.field}
              {...el}
            />)
          }
        </div>
        <div className="parent__body">
          <div className="parent__body-task">
            <input type="text" name='createTask' placeholder='type to create a task' value={createTaskValue} onChange={handleChangeTaskName} />
            <button className='parent__body-button' onClick={createNewTask}>Create</button>
          </div>
          <div className="body__task">
            {
              isFiltering
                ? filterTodos.map((el) => <BodyTask key={el.id} {...el} />)
                : todos.map((el) => <BodyTask key={el.id} {...el} />)
            }
          </div>
          <div className="completed__tasks completed">
            {
              complatedTasks.map((el) => <CompletedTask key={el.id} {...el} />)
            }
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default TodoDataGrid;