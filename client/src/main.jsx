import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App.jsx'
import './css/index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', 
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>
  </StrictMode>
)