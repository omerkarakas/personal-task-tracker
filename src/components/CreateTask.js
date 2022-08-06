import React, { useEffect, useState, useContext } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import AppContext from '../context/AppContext';
import { CustomizedBox } from './CustomizedBox';

const CreateTask = () => {
  const { initialPriorities, priorities, addTask, updateTask, closeModal, currentTask, action } =
    useContext(AppContext);

  const initialJob = {
    id: 0,
    name: '',
    priority: priorities[0].id || initialPriorities[0].id
  };

  const [jobId, setJobId] = useState(initialJob.id);
  const [jobName, setJobName] = useState(initialJob.name);
  const [jobPriority, setJobPriority] = useState(initialJob.priority);

  const [jobNameError, setJobNameError] = useState(false);
  const [jobPriorityError, setJobPriorityError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJobNameError(false);
    setJobPriorityError(false);

    if (!jobName) setJobNameError(true);
    if (!jobPriority) setJobPriorityError(true);

    if (jobName && jobPriority) {
      if (!jobId) {
        addTask(jobName, jobPriority);
      } else {
        updateTask(jobId, jobName, jobPriority);
      }

      setJobName(initialJob.name);
      setJobPriority(initialJob.priority);
      setJobId(initialJob.id);
      closeModal();
    }
  };

  useEffect(() => {
    //console.log('ue,currentTask', currentTask);

    if (currentTask) {
      setJobName(currentTask.name);
      setJobPriority(currentTask.priority);
      setJobId(currentTask.id);
    } else {
      setJobName(initialJob.name);
      setJobPriority(initialJob.priority);
      setJobId(initialJob.id);
    }
  }, [currentTask]);

  if (!priorities) {
    return 'Still Loading';
  }

  return (
    <Container>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Create New Job
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <CustomizedBox>
          <FormControl fullWidth>
            <TextField
              onChange={(e) => setJobName(e.target.value)}
              variant="outlined"
              label="Job Name"
              color="secondary"
              required
              value={jobName}
              disabled={action === 'update'}
              // multilinema
              // rows={3}
              // fullWidth
              error={jobNameError}
              sx={{
                marginBottom: 2
              }}
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: '50px'
            }}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority-select"
                defaultValue={''}
                value={jobPriority}
                label="Priority"
                error={jobPriorityError}
                required
                data-testid="select-option"
                onChange={(event, newValue) => {
                  console.log('ev:', event);
                  console.log('val:', newValue);
                  setJobPriority(newValue.props.value);
                }}>
                {priorities &&
                  priorities.map((priority, index) => {
                    return (
                      <MenuItem key={index} value={priority.id}>
                        {priority.title}
                      </MenuItem>
                    );
                  })}
                {!priorities &&
                  initialPriorities.map((priority, index) => {
                    return (
                      <MenuItem key={index} value={priority.id}>
                        {priority.title}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<AddCircleOutline />}
              sx={{ marginLeft: 2 }}>
              {action === 'update' && 'Update'}
              {action === 'insert' && 'Insert'}
            </Button>
          </Box>
        </CustomizedBox>
      </form>
    </Container>
  );
};

export default CreateTask;
