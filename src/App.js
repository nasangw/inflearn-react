import React, { useState } from "react";
import "./App.css";
import List from './components/List';
import Form from './components/Form';

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

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        <h2>Hello World!</h2>

        <List todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} setTodoData={setTodoData} />
      </div>
    </div>
  );
}
