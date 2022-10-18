import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

  const handleEnd = (result) => {
    console.log(result);

    if(!result.destination) {
      return;
    }

    const newTodoData = [...todoData];

    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todoData.map((v, index) => (
                <Draggable
                  key={v.id}
                  draggableId={v.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <label 
                      ref={provided.innerRef} 
                      key={v.id} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
                    >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
