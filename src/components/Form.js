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
    <form 
      className='flex pt-2'
      onSubmit={submitForm}>
      <input
        type="text"
        name="value"
        className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow'
        placeholder="해야 할 일을 입력하세요"
        value={value}
        onChange={changeValue}
      />
      <button
        type="submit"
        className='p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200'>
        추가
      </button>
    </form>
  );
}
