import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [value, setValue] = useState("");
  const [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "청소하기",
      completed: false,
    },
    {
      id: "3",
      title: "요리하기",
      completed: false,
    },
  ]);

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

  const getCompletedStyle = () => {
    return {
      padding: "10px",
      textDecoration: "line-through",
    };
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

  const changeValue = (ev) => {
    setValue(ev.target.value);
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

  const submitForm = (ev) => {
    ev.preventDefault();
    if (value.length < 1) {
      alert("할 일을 입력하세요");
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      title: value,
      completed: false,
    };

    console.log(newTodo);
    // const newTodoData = todoData.push(newTodo);

    // setTodoData([...todoData, newTodo]);
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        {todoData.map((v) => (
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
        ))}

        <form style={{ display: "flex" }} onSubmit={submitForm}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="해야 할 일을 입력하세요"
            value={value}
            onChange={changeValue}
          />
          <button type="submit" className="btn" style={{ flex: "1" }}>
            추가
          </button>
        </form>
      </div>
    </div>
  );
}
