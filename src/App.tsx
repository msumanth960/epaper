import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import EPapersLibrary from './pages/EPapersLibrary';
import UploadEPaper from './pages/UploadEPaper';
import EPaperReader from './pages/EPaperReader';
import NewsFeed from './pages/NewsFeed';
import ReportIncident from './pages/ReportIncident';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="epapers" element={<EPapersLibrary />} />
            <Route path="upload" element={<UploadEPaper />} />
            <Route path="reader/:id" element={<EPaperReader />} />
            <Route path="feed" element={<NewsFeed />} />
            <Route path="report-incident" element={<ReportIncident />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
