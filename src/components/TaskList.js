import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import AppContext from '../context/AppContext';
import { CustomizedBox } from './CustomizedBox';

let prios = [];

const renderPriorityButton = (params) => {
  let priorityId = Number(params.row.priority);
  let boxColor = '#FFF';
  let priorityText = '';
  if (prios.length > 1) {
    let priority = prios.find((pr) => pr.id === priorityId);
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
        color="info"
        onClick={() => {
          alert('row to be edited:' + params.row.id);
        }}
      >
        <EditOutlined />
      </IconButton>

      <IconButton
        color="warning"
        onClick={() => {
          alert('row to be deleted:' + params.row.id);
        }}
      >
        <DeleteOutlined />
      </IconButton>
    </>
  );
};

const columns = [
  { field: 'id', headerName: 'Id', width: 0, disableClickEventBubbling: true },
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

const TaskList = () => {
  const { tasks, priorities } = useContext(AppContext);

  prios = priorities;
  // const [rows, setRows] = useState(tasks);

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
        <Typography variant="h6" color="textPrimary">
          Job List
        </Typography>
        {/* {tasks.map((task, index) => {
          return <p key={index}>{task.name}</p>;
        })} */}
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
                  // Hide columns status and traderName, the other columns will remain visible
                  id: false,
                },
              },
            }}
          />
        </div>
      </CustomizedBox>
    </Container>
  );
};

export default TaskList;
