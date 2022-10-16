import React from 'react';

export default function Form({ value, setValue, setTodoData }) {

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
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="value"
        placeholder="해야 할 일을 입력하세요"
        value={value}
        onChange={changeValue}
      />
      <button type="submit">
        추가
      </button>
    </form>
  );
}
