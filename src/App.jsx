

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from './components/AppBar';
import axios from "axios";
import sitetwo from './pages/sitetwo';
import siteone from './pages/siteone';
import sitethree from './pages/sitethree';
import NotFoundPage from './pages/NotFoundPage';
import { useTheme } from '@mui/material/styles';

function App() {
  const savedData = localStorage.getItem('token');
  const [isAuthenticated, setAuthenticated] = React.useState(savedData ? true : false);
  const theme = useTheme();
  
  useEffect(() => {

    async function authCheck() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/jbVnRBYQsM`, {
          headers: { 'Authorization': `${savedData ? savedData : ""}` }
        });

        if (response.data) {
          setAuthenticated(response.data.status ? true : false);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    }

    
    if (savedData) {
      authCheck();
    }
  }, [savedData]);
  









  return (
    
    <Router>
     
      <AppBar isAuthenticated={isAuthenticated}>
      
     </AppBar>
     <div style={{ paddingTop: theme.mixins.toolbar.minHeight+50 + 'px' }}>
      <div className="page-container">
      <Routes>
        
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/sitetwo"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <sitetwo />
            </PrivateRoute>
          }
        />
         <Route
          path="/siteone"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <siteone />
            </PrivateRoute>
          }
        />
         <Route
          path="/sitethree"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <sitethree />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
      </div>
    </Router>
    
  );
}

export default App;
