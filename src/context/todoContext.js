import React, { createContext, useState, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: "1", task: "Zrobić pranie", completed: true, deadline: new Date("2026-01-02T15:23:53") },
    { id: "2", task: "Zrobić zakupy", completed: false, deadline: new Date("2025-12-12T13:23:53") }, // Przeszłość (Red)
    { id: "3", task: "Zrobić pranie", completed: true, deadline: new Date("2025-12-14T06:23:53") },
    { id: "4", task: "Nauczyć się React Native", completed: false, deadline: new Date("2025-12-25T04:23:53") },
    { id: "5", task: "Naprawić kran", completed: true, deadline: new Date("2025-12-27T23:23:53") },
    { id: "6", task: "Przeczytać książkę", completed: false, deadline: new Date("2025-12-30T01:23:53") },
    { id: "7", task: "Podlać kwiaty", completed: false, deadline: new Date("2025-12-19T16:12:53") }, // Bardzo blisko (Yellow)
    { id: "8", task: "Zapłacić rachunki", completed: false, deadline: new Date("2025-12-19T15:57:53") }, // Przeszłość (Red)
    { id: "9", task: "Zrobić zakupy", completed: true, deadline: new Date("2025-12-19T16:17:53") },
    { id: "10", task: "Spacer z psem", completed: false, deadline: new Date("2025-12-19T15:45:53") }, // Przeszłość (Red)
    { id: "11", task: "Napisać maila do szefa", completed: false, deadline: new Date("2025-12-19T16:53:53") }, // Blisko (Yellow)
    { id: "12", task: "Nauczyć się React Native", completed: true, deadline: new Date("2025-12-26T02:23:53") },
    { id: "13", task: "Zrobić zakupy", completed: false, deadline: new Date("2025-12-21T15:23:53") },
    { id: "14", task: "Podlać kwiaty", completed: true, deadline: new Date("2025-12-19T15:44:53") },
    { id: "15", task: "Odkurzyć mieszkanie", completed: false, deadline: new Date("2025-12-12T06:23:53") }, // Przeszłość (Red)
    { id: "16", task: "Spacer z psem", completed: false, deadline: new Date("2025-12-19T17:29:53") }, // Przyszłość (Blue)
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

  const updateTodo = (id, updatedTask, updatedDeadline) => {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, task: updatedTask, deadline: updatedDeadline } : todo)));
  };

  return <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo }}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
