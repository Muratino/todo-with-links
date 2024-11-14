import { createSlice } from '@reduxjs/toolkit'
import { createStatusArrTodos, fileterAndLocalCompletedTask, fileterAndLocalTodos, findObjTodo, switchStatusArrTodos } from '../../utils/stateFunc'

const initialState = {
  todos: [],
  filterTodos: [],
  isFiltering: false,
  createTask: {
    id: null,
    date: '',
    status: '',
    task: '',
    assign: '',
    links: '',
    result: ''
  },
  complatedTasks: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo(state, action) {
      state.todos = [...action.payload]
    },
    setCompletedTodo(state, action) {
      state.complatedTasks = [...action.payload]
    },
    setDeleteTask(state, action) {
      const { newArr } = fileterAndLocalTodos(state, action)
      state.todos = newArr
    },
    setChangeTaskStatus(state, action) {
      const changedStatus = findObjTodo(state, action)

      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      changedStatus.status = action.payload.status;

      state.todos = switchStatusArrTodos(changedStatus, criticalStatusArr, majorStatusArr, minorStatusArr)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setChangeTaskDate(state, action) {
      const changedDate = findObjTodo(state, action)
      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      changedDate.date = action.payload.date;

      state.todos = switchStatusArrTodos(changedDate, criticalStatusArr, majorStatusArr, minorStatusArr)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setChangeTaskAssign(state, action) {
      const changedAssign = findObjTodo(state, action)

      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      changedAssign.assign = action.payload.assign;

      state.todos = switchStatusArrTodos(changedAssign, criticalStatusArr, majorStatusArr, minorStatusArr)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setChangeTaskLinks(state, action) {
      const changedLinks = findObjTodo(state, action)

      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      changedLinks.links = action.payload.links;

      state.todos = switchStatusArrTodos(changedLinks, criticalStatusArr, majorStatusArr, minorStatusArr)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setChangeTaskName(state, action) {
      const changedTask = findObjTodo(state, action)

      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      changedTask.task = action.payload.task;

      state.todos = switchStatusArrTodos(changedTask, criticalStatusArr, majorStatusArr, minorStatusArr)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setDeleteCompletedTask(state, action) {
      const { newArr } = fileterAndLocalCompletedTask(state, action)
      state.complatedTasks = newArr
    },
    setComplatedTask(state, action) {
      const completTask = state.todos.filter(el => Number(el.id) === Number(action.payload))
      const { newArr } = fileterAndLocalTodos(state, action);

      const criticalStatusArr = state.complatedTasks.filter(el => String(el.status) === 'Critical' && Number(el.id) !== Number(action.payload))
      const majorStatusArr = state.complatedTasks.filter(el => String(el.status) === 'Major' && Number(el.id) !== Number(action.payload))
      const minorStatusArr = state.complatedTasks.filter(el => String(el.status) === 'Minor' && Number(el.id) !== Number(action.payload))

      switch (completTask[0].status) {
        case 'Critical':
          state.complatedTasks = [...completTask, ...criticalStatusArr, ...majorStatusArr, ...minorStatusArr]
          break;
        case 'Major':
          state.complatedTasks = [...criticalStatusArr, ...completTask, ...majorStatusArr, ...minorStatusArr]
          break;
        case 'Minor':
          state.complatedTasks = [...criticalStatusArr, ...majorStatusArr, ...completTask, ...minorStatusArr]
          break;
      }

      state.todos = newArr
      localStorage.setItem('completed', JSON.stringify(state.complatedTasks))

    },
    setReturnTask(state, action) {
      const task = state.complatedTasks.filter(el => Number(el.id) === Number(action.payload.id))
      const { newArr } = fileterAndLocalCompletedTask(state, action)
      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      switch (task[0].status) {
        case 'Critical':
          state.todos = [...task, ...criticalStatusArr, ...majorStatusArr, ...minorStatusArr]
          break;
        case 'Major':
          state.todos = [...criticalStatusArr, ...task, ...majorStatusArr, ...minorStatusArr]
          break;
        case 'Minor':
          state.todos = [...criticalStatusArr, ...majorStatusArr, ...task, ...minorStatusArr]
          break;
      }

      state.complatedTasks = newArr
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setCreateDate(state, action) {
      state.createTask = { ...state.createTask, date: action.payload }
    },
    setCreateAssing(state, action) {
      state.createTask = { ...state.createTask, assign: action.payload }
    },
    setCreateStatus(state, action) {
      state.createTask = { ...state.createTask, status: action.payload }
    },
    setCreateNewTask(state, action) {
      const { criticalStatusArr, majorStatusArr, minorStatusArr } = createStatusArrTodos(state, action);

      switch (action.payload.status) {
        case 'Critical':
          state.todos = [action.payload, ...criticalStatusArr, ...majorStatusArr, ...minorStatusArr]
          state.filterTodos = [action.payload, ...criticalStatusArr]
          break;
        case 'Major':
          state.todos = [...criticalStatusArr, action.payload, ...majorStatusArr, ...minorStatusArr]
          state.filterTodos = [action.payload, ...majorStatusArr]
          break;
        case 'Minor':
          state.todos = [...criticalStatusArr, ...majorStatusArr, action.payload, ...minorStatusArr]
          state.filterTodos = [action.payload, ...minorStatusArr]
          break;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    setCreateLinks(state, action) {
      state.createTask = { ...state.createTask, links: action.payload }
    },
    setCreateResult(state, action) {
      state.createTask = { ...state.createTask, result: action.payload }
    },
    setCreateTaskName(state, action) {
      state.createTask = { ...state.createTask, task: action.payload }
    },
    setFileter(state, action) {
      if (!action.payload.value) {
        state.isFiltering = false
        state.filterTodos = []
        return
      }

      state.isFiltering = true;
      switch (action.payload.type) {
        case 'date':
          state.filterTodos = [...state.todos]
          const filteredDateArr = state.filterTodos.filter(el => el.date == action.payload.value)
          state.filterTodos = [...filteredDateArr]
          break;
        case 'status':
          state.filterTodos = [...state.todos]
          const filteredStatusArr = state.filterTodos.filter(el => el.status == action.payload.value)
          state.filterTodos = [...filteredStatusArr]
          break;
        case 'assign':
          state.filterTodos = [...state.todos]
          const filteredAssignArr = state.filterTodos.filter(el => el.assign == action.payload.value)
          state.filterTodos = [...filteredAssignArr]
          break;
      }
    },
    deletFilters(state) {
      state.isFiltering = false
      state.filterTodos = []
      for (let key in state.createTask) {
        key == 'id' ? state.createTask[key] = null : state.createTask[key] = ''
      }
    },
  },
})

export const {
  setChangeTaskStatus,
  setChangeTaskName,
  deletFilters,
  setFileter,
  setChangeTaskLinks,
  setChangeTaskDate,
  setChangeTaskAssign,
  setTodo,
  setCompletedTodo,
  setDeleteCompletedTask,
  setDeleteTask,
  setCreateDate,
  setCreateAssing,
  setCreateStatus,
  setCreateNewTask,
  setCreateTaskName,
  setCreateResult,
  setCreateLinks,
  setReturnTask,
  setComplatedTask
} = todoSlice.actions

export default todoSlice.reducer