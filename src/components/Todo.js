import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import TodoDataGrid from './TodoDataGrid';
import { setCompletedTodo, setTodo } from '../redux/Slice/todo';

export const Field = {
  DATE: 'date',
  STATUS: 'status',
  TASK: 'task',
  ASSING: 'assign',
  LINKS: 'links',
  RESULT: 'result',
}

export const statusTasks = ['Critical', 'Major', 'Minor']
export const assignMoclArr = ['Some', 'Bro', 'Me']

const columns = [
  { field: Field.DATE, headerName: 'Date', isInput: true },
  {
    field: Field.STATUS,
    headerName: 'Status',
    editable: true,
    value: statusTasks
  },
  {
    field: Field.TASK,
    headerName: 'Task',
    isInput: true
  },
  {
    field: Field.ASSING,
    headerName: 'Assign',
    editable: true,
    value: assignMoclArr
  },
  {
    field: Field.LINKS,
    headerName: 'Links',
    isInput: true
  },
  {
    field: Field.RESULT,
    isInput: true,
    headerName: 'Result',

  },
];
export const Todo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tasks = localStorage.getItem('todos');
    if (tasks) {
      dispatch(setTodo(JSON.parse(tasks)))
    }
    const completedTasks = localStorage.getItem('completed');
    if (completedTasks) {
      dispatch(setCompletedTodo(JSON.parse(completedTasks)))
    }
  }, [dispatch])

  return (
    <>
      <TodoDataGrid error={false} columns={columns} />
    </>
  );
};
