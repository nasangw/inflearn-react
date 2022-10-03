import React, { useState } from 'react';

export default function List({ todoData, setTodoData }) {
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

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
      <div style={getStyle(v.completed)} key={v.id}>
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
          style={btnStyle}
          data-id={v.id}
          onClick={clickRemoveTodo}
        >
          X
        </button>
      </div>
    ))
  );
}
