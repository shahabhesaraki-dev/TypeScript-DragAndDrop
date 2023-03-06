import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, submitHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        submitHandler(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={todo || ""}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        type="text"
        placeholder="Enter a task"
        className="input_field"
      />
      <button type="submit" className="input_button">
        Go
      </button>
    </form>
  );
};

export default InputField;
