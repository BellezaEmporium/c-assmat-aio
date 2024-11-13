import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { CalendarApp } from './components/CalendarApp';
import { EmployerManagement } from './components/EmployerManagement';
import { TaxCalculator } from './components/TaxCalculator';
import { ChildManagement } from './components/ChildManagement';
import axios from 'axios';

const App = () => {
  const [employerData, setEmployerData] = useState([]);
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employerResponse = await axios.get('http://localhost:3000/api/employers');
        setEmployerData(employerResponse.data);

        const childResponse = await axios.get('http://localhost:3000/api/children');
        setChildData(childResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
          >
            Planning Assistante Maternelle
          </Typography>
          <Button color="inherit" component={Link} to="/calendar">
            Calendrier
          </Button>
          <Button color="inherit" component={Link} to="/employers">
            Gestion Employeurs
          </Button>
          <Button color="inherit" component={Link} to="/children">
            Gestion Enfants
          </Button>
          <Button color="inherit" component={Link} to="/tax-calculator">
            Calcul des Taxes
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/calendar" element={<CalendarApp employerData={employerData} childData={childData} isCareworkerConnected={false} />} />
          <Route path="/employers" element={<EmployerManagement employerData={employerData} />} />
          <Route path="/tax-calculator" element={<TaxCalculator employerData={employerData} />} />
          <Route path="/children" element={<ChildManagement />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;