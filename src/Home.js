import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import CreateTask from './components/CreateTask';
import Header from './components/Header';
import TaskList from './components/TaskList';

const Home = () => {
  return (
    <Container>
      <Header />
      <CreateTask />
      <TaskList />
    </Container>
  );
};

export default Home;
