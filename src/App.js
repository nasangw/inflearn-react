import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    value: "",
    todoData: [
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
    ],
  };
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  getCompletedStyle = () => {
    return {
      padding: "10px",
      textDecoration: "line-through",
    };
  };

  clickRemoveTodo = (ev) => {
    const check = window.confirm("삭제하시겠습니까?");
    if (!check) {
      return;
    }

    const elem = ev.currentTarget;
    const id = elem.getAttribute("data-id");

    let newTodoData = [...this.state.todoData.filter((v) => v.id !== id)];
    this.setState({ todoData: newTodoData });
  };

  changeValue = (ev) => {
    this.setState({ value: ev.target.value });
  };

  changeCompleteCheck = (id) => {
    if (!id) {
      return;
    }

    const newTodo = this.state.todoData.map((v) => {
      return id !== v.id
        ? v
        : {
            id: v.id,
            title: v.title,
            completed: !v.completed,
          };
    });

    this.setState({ todoData: newTodo });
  };

  submitForm = (ev) => {
    ev.preventDefault();
    if (this.state.value.length < 1) {
      alert("할 일을 입력하세요");
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      title: this.state.value,
      completed: false,
    };

    console.log(newTodo);
    // const newTodoData = this.state.todoData.push(newTodo);
    this.setState({
      todoData: [...this.state.todoData, newTodo],
      value: "",
    });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((v) => (
            <div style={this.getStyle(v.completed)} key={v.id}>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={v.completed}
                  onChange={() => this.changeCompleteCheck(v.id)}
                />
                {v.title}
              </label>
              <button
                type="button"
                style={this.btnStyle}
                data-id={v.id}
                onClick={this.clickRemoveTodo}
              >
                X
              </button>
            </div>
          ))}

          <form style={{ display: "flex" }} onSubmit={this.submitForm}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야 할 일을 입력하세요"
              value={this.state.value}
              onChange={this.changeValue}
            />
            <button type="submit" className="btn" style={{ flex: "1" }}>
              추가
            </button>
          </form>
        </div>
      </div>
    );
  }
}
