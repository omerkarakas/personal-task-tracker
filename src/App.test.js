import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  console.log('Testing started');
});

test('add task button present', () => {
  render(<App />);
  const addTaskButton = screen.getByRole('button', { name: /Add Task/i });
  expect(addTaskButton).toBeInTheDocument();
});

test('add task button opens an empty modal window', () => {
  render(<App />);
  const addTaskButton = screen.getByRole('button', { name: /Add Task/i });
  userEvent.click(addTaskButton);
  expect(screen.getByRole('textbox').value).toBe('');
});

test('test delete task', () => {
  const { container } = render(<App />);

  // the first task in the list, "work hard"
  expect(screen.queryByText(/Work hard/i)).toBeInTheDocument();

  // first delete button, find and click
  const delButtons = container.getElementsByClassName('btn-icon-delete');
  userEvent.click(delButtons[0]);

  //confirm button, find and click
  const yesButton = container.getElementsByClassName('btn-yes')[0];
  userEvent.click(yesButton);

  // the first task in the list should disappear
  expect(screen.queryByText(/Work hard/i)).not.toBeInTheDocument();
});
