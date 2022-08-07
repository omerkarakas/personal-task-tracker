import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppProvider } from './context/AppContext';
import Home from './Home';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500]
    },
    secondary: {
      main: '#f44336'
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
