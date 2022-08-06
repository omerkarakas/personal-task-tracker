import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { CustomizedBox } from './CustomizedBox';

const TaskList = () => {
  const {
    tasks,
    initialPriorities,
    priorities,
    deleteTask,
    editTask,
    openModalInsert,
    openConfirm,
  } = useContext(AppContext);

  const deleteTaskHandler = (taskId) => {
    console.log('task to be deleted :', taskId);
    openConfirm(taskId);
  };

  const renderPriorityButton = (params) => {
    let priorityId = Number(params.row.priority);
    let boxColor = '#FFF';
    let priorityText = '';
    if (priorities.length > 1) {
      let priority = priorities.find((pr) => pr.id === priorityId);
      boxColor = priority.color;
      priorityText = priority.title;
    }

    return (
      <>
        <Box
          sx={{
            width: 80,
            height: 30,
            backgroundColor: boxColor,
          }}
        >
          <Typography align="center" sx={{ userSelect: false }}>
            {priorityText}
          </Typography>
        </Box>
      </>
    );
  };

  const renderActionsButton = (params) => {
    // console.log(params);
    return (
      <>
        <IconButton
          color="primary"
          onClick={() => {
            editTask(params.row.id);
          }}
        >
          <EditOutlined />
        </IconButton>

        <IconButton
          color="secondary"
          onClick={() => {
            //alert('row to be deleted:' + params.row.id);
            deleteTaskHandler(params.row.id);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </>
    );
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 0,
      disableClickEventBubbling: true,
    },
    {
      field: 'name',
      headerName: 'Job Name',
      width: 280,
      disableClickEventBubbling: true,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      renderCell: renderPriorityButton,
      disableClickEventBubbling: true,
    },
    {
      field: '',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: renderActionsButton,
      disableClickEventBubbling: true,
    },
  ];

  if (!tasks) {
    return (
      <Typography variant="h6" color="textPrimary">
        Not yet ready
      </Typography>
    );
  }

  return (
    <Container>
      <CustomizedBox>
        <Button variant="outlined" onClick={openModalInsert}>
          Add Task
        </Button>

        <Typography variant="h6" color="textPrimary">
          Job List
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[2]}
            disableMultipleSelection={true}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
              sorting: {
                sortModel: [{ field: 'priority', sort: 'asc' }],
              },
            }}
          />
        </div>
      </CustomizedBox>
    </Container>
  );
};

export default TaskList;
