import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import api, { User, AuthResponse } from './services/api';
import { CalendarApp } from './components/CalendarApp';
import { EmployerManagement } from './components/EmployerManagement';
import { TaxCalculator } from './components/TaxCalculator';
import { ChildManagement } from './components/ChildManagement';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { AccountPage } from './components/AccountPage';

type EmployerData = unknown[];

interface AppShellProps {
  employerData: EmployerData;
  auth: User | null;
  onLoginSuccess: (response: AuthResponse) => void;
  onLogout: () => void;
}

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
    {children}
  </Container>
);

const AppShell: React.FC<AppShellProps> = ({ employerData, auth, onLoginSuccess, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  const navigationItems = useMemo(
    () => [
      { label: 'Calendrier', to: '/calendar', requiresAuth: true },
      { label: 'Employeurs', to: '/employers', requiresAuth: true },
      { label: 'Enfants', to: '/children', requiresAuth: true },
      { label: 'Calculs', to: '/tax-calculator', requiresAuth: true },
      ...(auth
        ? [{ label: 'Mon compte', to: '/account', requiresAuth: true as const }]
        : [])
    ],
    [auth]
  );

  const protectedPaths = useMemo(() => new Set(navigationItems.filter((item: { requiresAuth: boolean; }) => item.requiresAuth).map((item: { to: string; }) => item.to)), [navigationItems]);

  const handleNavigate = (path: string) => {
    const item = navigationItems.find((nav: { to: string; }) => nav.to === path);
    const needsAuth = item?.requiresAuth ?? protectedPaths.has(path);
    if (!auth && needsAuth) {
      navigate('/login', { state: { from: path } });
      return;
    }
    navigate(path);
  };

  const handleAuthSuccess = (response: AuthResponse) => {
    onLoginSuccess(response);
    const from = (location.state as { from?: string } | null)?.from;
    if (from && from !== '/login') {
      navigate(from, { replace: true });
      return;
    }
    navigate('/calendar', { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar
        position="sticky"
        color={isLanding ? 'transparent' : 'primary'}
        elevation={isLanding ? 0 : 4}
        sx={{
          backgroundColor: isLanding ? 'rgba(255,255,255,0.82)' : undefined,
          color: isLanding ? 'text.primary' : undefined,
          boxShadow: isLanding ? '0 1px 0 rgba(15, 23, 42, 0.08)' : undefined,
          backdropFilter: isLanding ? 'blur(16px)' : undefined,
          borderBottom: isLanding ? '1px solid rgba(15, 23, 42, 0.06)' : undefined
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2}>
            <IconButton
              color="inherit"
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              onClick={() => handleNavigate('/calendar')}
              aria-label="Ouvrir le menu principal"
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', fontWeight: 700, letterSpacing: '-0.01em', color: 'inherit' }}
            >
              C.ASSMAT AIO
            </Typography>
          </Stack>
          <Stack direction="row" spacing={{ xs: 1.5, md: 2.5 }}>
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 1.5 }}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {navigationItems.map((item: { to: string; requiresAuth: boolean; label: string; }) => (
                <Button
                  key={item.to}
                  color="inherit"
                  onClick={() => handleNavigate(item.to)}
                  disabled={!auth && item.requiresAuth}
                  sx={{ opacity: !auth && item.requiresAuth ? 0.6 : 1 }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
            {auth ? (
              <Stack direction="row" spacing={1.5}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Bonjour, {auth.name}
                </Typography>
                <Button variant={isLanding ? 'contained' : 'outlined'} color="secondary" onClick={onLogout}>
                  Se déconnecter
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={{ xs: 1, md: 1.5 }}>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => handleNavigate('/login')}
                >
                  Connexion
                </Button>
                <Button
                  variant={isLanding ? 'contained' : 'outlined'}
                  color={isLanding ? 'primary' : 'inherit'}
                  onClick={() => handleNavigate('/calendar')}
                >
                  Voir la démo
                </Button>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: isLanding ? 'transparent' : 'background.default' }}>
        <Routes>
          <Route path="/" element={<LandingPage onLoginSuccess={handleAuthSuccess} />} />
          <Route
            path="/login"
            element={
              <PageContainer>
                <LoginPage onSuccess={handleAuthSuccess} />
              </PageContainer>
            }
          />
          <Route
            path="/calendar"
            element={
              auth ? (
                <PageContainer>
                  <CalendarApp />
                </PageContainer>
              ) : (
                <Navigate to="/login" replace state={{ from: '/calendar' }} />
              )
            }
          />
          <Route
            path="/employers"
            element={
              auth ? (
                <PageContainer>
                  <EmployerManagement />
                </PageContainer>
              ) : (
                <Navigate to="/login" replace state={{ from: '/employers' }} />
              )
            }
          />
          <Route
            path="/children"
            element={
              auth ? (
                <PageContainer>
                  <ChildManagement />
                </PageContainer>
              ) : (
                <Navigate to="/login" replace state={{ from: '/children' }} />
              )
            }
          />
          <Route
            path="/tax-calculator"
            element={
              auth ? (
                <PageContainer>
                  <TaxCalculator employerData={employerData} />
                </PageContainer>
              ) : (
                <Navigate to="/login" replace state={{ from: '/tax-calculator' }} />
              )
            }
          />
          <Route
            path="/account"
            element={
              auth ? (
                <PageContainer>
                  <AccountPage />
                </PageContainer>
              ) : (
                <Navigate to="/login" replace state={{ from: '/account' }} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const [employerData] = useState<EmployerData>([]);
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier si l'utilisateur est déjà authentifié
        const user = await api.me();
        setAuth(user);
      } catch {
        console.log('Non authentifié');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLoginSuccess = (response: AuthResponse) => {
    setAuth(response.user);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } finally {
      setAuth(null);
    }
  };

  if (loading) {
    return null; // ou un loader
  }

  return (
    <Router>
      <AppShell
        employerData={employerData}
        auth={auth}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </Router>
  );
};

export default App;