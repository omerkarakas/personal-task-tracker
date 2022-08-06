import { createContext, useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const url = 'http://localhost:5000/priority';
const AppContext = createContext(null);

const initialTasks = [
  { id: 1, name: 'Go shopping', priority: 2 },
  { id: 2, name: 'Work hard', priority: 1 },
  { id: 3, name: 'Be yourself, no matter what they say', priority: 1 },
];

export const AppProvider = ({ children }) => {
  const [priorities, setPriorities] = useState([
    { id: 1, title: 'Anything', color: 'purple' },
  ]);
  const [tasks, setTasks] = useState(initialTasks);
  const [nextTaskId, setNextTaskId] = useState(0);

  const addTask = (jobName, jobPriority) => {
    setNextTaskId((id) => id + 1);
    setTasks((list) => [
      ...list,
      { id: nextTaskId + 1, name: jobName, priority: jobPriority },
    ]);
  };

  useEffect(() => {
    const fetchPriorities = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log('fetch::::', data);
      setPriorities(data);
    };
    fetchPriorities();
  }, []);

  useEffect(() => {
    console.log(nextTaskId);
    console.log(tasks);
    if (tasks.length > 0) {
      setNextTaskId(
        tasks.reduce((max, task) => {
          if (task.id > max) return task.id;
        }, 0)
      );
    }
    console.log('next id:', nextTaskId);
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        priorities,
        tasks,
        addTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
