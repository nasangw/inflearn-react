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
        <label>
          <input
            type="checkbox"
            defaultChecked={v.completed}
            onChange={() => changeCompleteCheck(v.id)}
          />
          {v.title}
        </label>
        <button
          type="button"
          data-id={v.id}
          onClick={clickRemoveTodo}
        >
          X
        </button>
      </div>
    ))
  );
}
