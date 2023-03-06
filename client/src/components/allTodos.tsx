import React from "react";
import { Droppable } from "react-beautiful-dnd";
import SingleTodo from "./singleTodo";
import "./styles.css";

interface AllTypesTodos {
  id: number;
  todo: string;
  isDone: boolean;
}

interface TodosType {
  allTodos: AllTypesTodos[];
  setAllTodos: React.Dispatch<React.SetStateAction<AllTypesTodos[]>>;
  completedTodos: AllTypesTodos[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<AllTypesTodos[]>>;
}

const AllTodos: React.FC<TodosType> = ({
  allTodos,
  setAllTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragstarted" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosHeader">Active Task</span>
            {allTodos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                index={index}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragdone" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosHeader">Completed Task</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                index={index}
                allTodos={completedTodos}
                setAllTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default AllTodos;
