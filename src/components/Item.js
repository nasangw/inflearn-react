import React from 'react'

export const Item = ({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
}) => {

  const changeCompleteCheck = (id) => {
    if (!id) {
      return;
    }

    const newTodo = todoData.map((data) => {
      return id !== data.id
        ? data
        : {
            id: data.id,
            title: data.title,
            completed: !data.completed,
          };
    });

    setTodoData(newTodo);
  };


  const clickRemoveTodo = (ev) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (!check) {
      return;
    }

    const elem = ev.currentTarget;
    const id = elem.getAttribute("data-id");

    let newTodoData = [...todoData.filter((v) => v.id !== id)];
    setTodoData(newTodoData);
  };

  return (
    <label 
      ref={provided.innerRef} 
      key={id} 
      {...provided.draggableProps} 
      {...provided.dragHandleProps}
      className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
    >
      <span className='items-center'>
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={() => changeCompleteCheck(id)}
        />
        <em className={completed ? 'line-through' : undefined}>{title}</em>
      </span>
      <button
        type="button"
        className='items-center px-4 py-2 float-right'
        data-id={id}
        onClick={clickRemoveTodo}
      >
        X
      </button>
    </label>
  )
}
