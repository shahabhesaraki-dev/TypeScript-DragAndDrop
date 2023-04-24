import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import AllTodos from "./components/allTodos";
import InputField from "./components/InputField";

interface AllTypesTodos {
  id: number;
  todo: string;
  isDone: boolean;
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [allTodos, setAllTodos] = useState<AllTypesTodos[]>([]);

  const [completedTodos, setCompletedTodos] = useState<AllTypesTodos[]>([]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setAllTodos([...allTodos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const dragEndHnadler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = allTodos;
    let complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setAllTodos(active);
  };

  return (
    <DragDropContext onDragEnd={dragEndHnadler}>
      <div className="App">
        <span className="heading">To-Do Application</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          submitHandler={submitHandler}
        />
        <AllTodos
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          allTodos={allTodos}
          setAllTodos={setAllTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
