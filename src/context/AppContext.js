import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//const url = '/priority';
const url = 'http://localhost:5000/priority';

const AppContext = createContext(null);

const initialTasks = [
  { id: 1, name: 'Go shopping', priority: 2 },
  { id: 2, name: 'Work hard', priority: 1 },
  { id: 3, name: 'Be yourself, no matter what they say', priority: 1 }
];

const initialPriorities = [{ id: 1, title: 'Anything', color: 'purple' }];

const getStorageTasks = () => {
  let tasks = initialTasks;
  console.log(tasks);
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
  }
  return tasks;
};

export const AppProvider = ({ children }) => {
  const [priorities, setPriorities] = useState([initialPriorities]);
  const [tasks, setTasks] = useState(getStorageTasks());
  const [nextTaskId, setNextTaskId] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  const [action, setAction] = useState('insert');
  const [currentTask, setCurrentTask] = useState({});
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const [taskIdForDelete, setTaskIdForDelete] = useState(0);

  const editTask = (taskId) => {
    setCurrentTask(tasks.find((item) => item.id === taskId));
    setAction('update');
    openModalUpdate();
  };

  const openConfirm = (taskId) => {
    setShowModalConfirm(true);
    setTaskIdForDelete(taskId);
  };
  const closeConfirm = () => {
    setShowModalConfirm(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const openModalInsert = () => {
    setModalOpen(true);
    setAction('insert');
    setCurrentTask(null);
  };
  const openModalUpdate = () => {
    setModalOpen(true);
    setAction('update');
  };

  const closeModal = () => {
    setModalOpen(false);
    setAction('insert');
  };

  const deleteTask = () => {
    const newList = tasks.filter((item) => item.id !== taskIdForDelete);
    setTasks(newList);
    closeConfirm();
  };

  const updateTask = (taskId, taskName, taskPriority) => {
    let task = tasks.find((item) => item.id === taskId);
    let others = tasks.filter((item) => item.id !== taskId);

    setTasks([{ id: task.id, name: taskName, priority: taskPriority }, ...others]);
    setAction('insert');
  };

  const addTask = (jobName, jobPriority) => {
    setNextTaskId((id) => id + 1);
    setTasks((list) => [...list, { id: nextTaskId + 1, name: jobName, priority: jobPriority }]);
    setAction('insert');
  };

  useEffect(() => {
    const fetchPriorities = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setPriorities(data);
    };
    fetchPriorities();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setNextTaskId(
        tasks.reduce((max, task) => {
          if (task.id > max) return task.id;
          else return max;
        }, 0)
      );
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        initialPriorities,
        priorities,
        tasks,
        addTask,
        deleteTask,
        modalOpen,
        openModal,
        openModalInsert,
        closeModal,
        editTask,
        updateTask,
        currentTask,
        action,
        openConfirm,
        closeConfirm,
        showModalConfirm
      }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default AppContext;
