export const refCompletedCheck = (todo, todos) => {
  const refArr = todo.reference.toString().split(',');
  let check = true;
  for (let i = 0; i < refArr.length; i++) {
    const ref = refArr[i];
    const flag = todos.findIndex((v) => v.id === Number(ref) && !v.completed);

    if (flag > -1) {
      check = false;
      break;
    }
  }
  return check;
};

export const relationCheck = (item, todo) => {
  const itemRefArr = item.reference.toString().split(',');
  const todoRefArr = todo.reference.toString().split(',');

  return (
    itemRefArr.includes(todo.id.toString()) ||
    todoRefArr.includes(item.id.toString())
  );
};
