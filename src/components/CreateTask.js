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
  Typography,
} from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import AppContext from '../context/AppContext';
import { CustomizedBox } from './CustomizedBox';

const CreateTask = () => {
  const [jobName, setJobName] = useState('');
  const [jobNameError, setJobNameError] = useState(false);

  const { priorities, addTask } = useContext(AppContext);
  //  console.log('priorities:', priorities);

  const [jobPriority, setJobPriority] = useState(priorities[0].id);
  const [jobPriorityError, setJobPriorityError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJobNameError(false);
    setJobPriorityError(false);

    if (!jobName) setJobNameError(true);
    if (!jobPriority) setJobPriorityError(true);

    // if (jobName && jobPriority) {
    //   console.log('should success');
    // }
    console.log(jobName, jobPriority);

    if (jobName && jobPriority) {
      addTask(jobName, jobPriority);
    }
  };

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
              // multilinema
              // rows={3}
              // fullWidth
              error={jobNameError}
              sx={{
                marginBottom: 2,
              }}
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',

              height: '50px',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority-select"
                value={jobPriority}
                label="Priority"
                error={jobPriorityError}
                required
                onChange={(event, newValue) => {
                  console.log('ev:', event);
                  console.log('val:', newValue);
                  setJobPriority(newValue.props.value);
                }}
              >
                {priorities.map((priority, index) => {
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
              sx={{ marginLeft: 2 }}
            >
              Submit
            </Button>
          </Box>
        </CustomizedBox>
      </form>
    </Container>
  );
};

export default CreateTask;
