export const fileterAndLocalTodos = (state, action) => {
  const newArr = state.todos.filter(
    (el) => Number(el.id) !== Number(action.payload)
  );
  localStorage.setItem("todos", JSON.stringify(newArr));
  return { newArr };
};

export const findObjTodo = (state, action) => {
  return state.todos.find((el) => Number(el.id) === Number(action.payload.id));
};

export const createStatusArrTodos = (state, action) => {
  const criticalStatusArr = state.todos.filter(
    (el) =>
      String(el.status) === "Critical" &&
      Number(el.id) !== Number(action.payload.id)
  );
  const majorStatusArr = state.todos.filter(
    (el) =>
      String(el.status) === "Major" &&
      Number(el.id) !== Number(action.payload.id)
  );
  const minorStatusArr = state.todos.filter(
    (el) =>
      String(el.status) === "Minor" &&
      Number(el.id) !== Number(action.payload.id)
  );

  return { criticalStatusArr, majorStatusArr, minorStatusArr };
};

export const switchStatusArrTodos = (
  obj,
  criticalStatusArr,
  majorStatusArr,
  minorStatusArr
) => {
  switch (obj.status) {
    case "Critical":
      return [obj, ...criticalStatusArr, ...majorStatusArr, ...minorStatusArr];
    case "Major":
      return [...criticalStatusArr, obj, ...majorStatusArr, ...minorStatusArr];
    case "Minor":
      return [...criticalStatusArr, ...majorStatusArr, obj, ...minorStatusArr];
    default:
      break;
  }
};

export const fileterAndLocalCompletedTask = (state, action) => {
  const newArr = state.complatedTasks.filter(
    (el) => Number(el.id) !== Number(action.payload.id)
  );
  localStorage.setItem("completed", JSON.stringify(newArr));
  return { newArr };
};
