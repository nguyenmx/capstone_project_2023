import React, { createContext, useContext, useState } from 'react';
import { useCurrency } from '../CurrencyContext';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);
export const withTasks = (WrappedComponent) => {
  return (props) => {
    const tasksContext = useTasks();
    return <WrappedComponent {...props} tasks={tasksContext} />;
  };
};

export const TasksProvider = ({ children }) => {
  const {earnCurrency} = useCurrency();

  const initialTasks = [
    { id: 0, text: "You need to feed the pet boi", completed: false },
    { id: 1, text: "Get the most favorite food plssss", completed: false },
    { id: 2, text: "Play with the pet, otherwise what's the point of having this app", completed: false },
    { id: 3, text: "Go lose another game in Combat Mode hehe (evil face)", completed: false },
    { id: 4, text: "Just chill bruh", completed: false },
    { id: 5, text: "We are computer scientists, of course, we made an app", completed: false }
  ];
  

  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const completeTask = (taskId) => {
    setTasks(prevTasks => {
      return prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      );
    });
    earnCurrency('coins');
    console.log("Task " + taskId + " has been completed!");
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, completeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

