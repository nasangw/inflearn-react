import React, { useState } from "react";
import "./App.css";
import List from './components/List';

export default function App() {
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
  const [value, setValue] = useState("");

  const changeValue = (ev) => {
    setValue(ev.target.value);
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

    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />

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
