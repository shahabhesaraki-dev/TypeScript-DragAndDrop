import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface AllTypesTodos {
  id: number;
  todo: string;
  isDone: boolean;
}

interface Type {
  todo: AllTypesTodos;
  allTodos: AllTypesTodos[];
  setAllTodos: React.Dispatch<React.SetStateAction<AllTypesTodos[]>>;
  index: number;
}

const SingleTodo: React.FC<Type> = ({ todo, allTodos, setAllTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const isDoneHandler = (id: number) => {
    setAllTodos(
      allTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const deleteHandler = (id: number) => {
    setAllTodos(allTodos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setAllTodos(
      allTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`singleTodo ${snapshot.isDragging ? "draged" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="singleTodoInput"
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
            />
          ) : todo.isDone ? (
            <s className="singleTodo-text">{todo.todo}</s>
          ) : (
            <span className="singleTodo-text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon"
              onClick={() => {
                deleteHandler(todo.id);
              }}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={() => {
                isDoneHandler(todo.id);
              }}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
