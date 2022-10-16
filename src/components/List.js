import React, { useState } from 'react';

export default function List({ todoData, setTodoData }) {
  
  const changeCompleteCheck = (id) => {
    if (!id) {
      return;
    }

    const newTodo = todoData.map((v) => {
      return id !== v.id
        ? v
        : {
            id: v.id,
            title: v.title,
            completed: !v.completed,
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
    todoData.map((v) => (
      <div  key={v.id}>
        <label className='flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded'>
          <span className='items-center'>
            <input
              type="checkbox"
              defaultChecked={v.completed}
              onChange={() => changeCompleteCheck(v.id)}
            />
            <em className={v.completed ? 'line-through' : undefined}>{v.title}</em>
          </span>
          <button
            type="button"
            className='items-center px-4 py-2 float-right'
            data-id={v.id}
            onClick={clickRemoveTodo}
          >
            X
          </button>
        </label>
      </div>
    ))
  );
}
