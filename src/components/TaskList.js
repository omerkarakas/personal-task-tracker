import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { CustomizedBox } from './CustomizedBox';

const TaskList = () => {
  const { tasks, priorities, editTask, openModalInsert, openConfirm } =
    useContext(AppContext);

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
          className="btn-icon-delete"
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
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Job Name',
      width: 150,
      disableClickEventBubbling: true,
      flex: 1,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 90,
      renderCell: renderPriorityButton,
      disableClickEventBubbling: true,
      flex: 1,
    },
    {
      field: '',
      headerName: 'Action',
      sortable: false,
      width: 80,
      renderCell: renderActionsButton,
      disableClickEventBubbling: true,
      flex: 1,
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
    <CustomizedBox style={{ height: '100%' }}>
      <Button id="addTaskBtn" variant="outlined" onClick={openModalInsert}>
        Add Task
      </Button>

      <CustomizedBox style={{ height: '100%' }}>
        <Typography variant="h6" color="textPrimary">
          Job List
        </Typography>
        <div style={{ height: 400, width: '100%', flex: 1 }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={10}
            getRowId={(row) => row.id}
            rowsPerPageOptions={[5, 10]}
            pagination
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
    </CustomizedBox>
  );
};

export default TaskList;
