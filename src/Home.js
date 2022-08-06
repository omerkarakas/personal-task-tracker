import { Container } from '@mui/system';
import React, { useContext } from 'react';
import CreateTask from './components/CreateTask';
import Header from './components/Header';
import Modal from './components/Modal';
import TaskList from './components/TaskList';
import AppContext from './context/AppContext';
import ModalConfirm from './components/ModalConfirm';
const Home = () => {
  const { modalOpen, closeModal, showModalConfirm, closeConfirm, deleteTask } =
    useContext(AppContext);

  return (
    <Container>
      <Header />
      <TaskList />
      <Modal open={modalOpen} close={closeModal}>
        <CreateTask insertOrUpdate={'insert'} />
      </Modal>

      <ModalConfirm
        showCondition={showModalConfirm}
        closeAction={closeConfirm}
        confirmAction={deleteTask}
        message={'Do you really want to delete this task?'}
      />
    </Container>
  );
};

export default Home;
