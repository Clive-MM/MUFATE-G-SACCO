
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#64dd17', 
    },
    secondary: {
      main: '#76ff03', 
    },
    background: {
      default: '#f8f6f2', 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
