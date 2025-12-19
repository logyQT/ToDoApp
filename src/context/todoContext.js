import React, { createContext, useState, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: "1", task: "Zrobić zakupy", completed: false, deadline: null },
    { id: "2", task: "Zapłacić rachunki", completed: true, deadline: null },
  ]);

  const addTodo = (task, deadline = null) => {
    setTodos((current) => [...current, { id: Date.now().toString(), task, completed: false, deadline }]);
  };

  const toggleTodo = (id) => {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
