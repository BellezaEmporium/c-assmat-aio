import React, { SubmitEvent, useCallback, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import api, { AuthResponse } from '../services/api';

export interface LoginPageProps {
  onSuccess?: (auth: AuthResponse) => void;
  variant?: 'page' | 'card';
  title?: string;
  subtitle?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSuccess,
  variant = 'page',
  title = 'Connexion à votre espace',
  subtitle = 'Accédez à votre tableau de bord personnel pour gérer vos plannings et vos familles.'
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email || !password) {
        setError('Merci de renseigner une adresse e-mail et un mot de passe.');
        setSuccess(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const authResponse = await api.login(email, password);

        setSuccess('Connexion réussie ! Redirection en cours...');
        onSuccess?.(authResponse);
      } catch (err) {
        setSuccess(null);
        setError(
          err instanceof Error
            ? err.message
            : 'Une erreur est survenue, veuillez réessayer.'
        );
      } finally {
        setLoading(false);
      }
    },
    [email, password, onSuccess]
  );

  const renderForm = () => (
    <Paper
      elevation={variant === 'card' ? 10 : 0}
      sx={{
        borderRadius: 4,
        p: { xs: 4, md: 5 },
        backgroundColor: '#fff',
        border: variant === 'card' ? undefined : '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: variant === 'card' ? '0 24px 70px rgba(15, 23, 42, 0.18)' : 'none'
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Adresse e-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  )
                }
              }}
            />
            <TextField
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" aria-label="Afficher le mot de passe">
                        {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.4, fontWeight: 600 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
            </Button>
          </Stack>
        </Box>

        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1}>
            <ShieldRoundedIcon color="primary" />
            <Typography variant="caption" color="text.secondary">
              Connexion sécurisée. Vos données sont chiffrées et stockées sur des serveurs localisés en France.
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Besoin d’un compte ? <Link href="#demo">Découvrez la démo</Link> ou contactez notre équipe pour une mise en place
            personnalisée.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );

  if (variant === 'card') {
    return renderForm();
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, rgba(33, 150, 243, 0.06), rgba(156, 39, 176, 0.06)), radial-gradient(circle at top, rgba(33, 150, 243, 0.35), rgba(255,255,255,0) 60%)'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 520, px: { xs: 3, sm: 4 }, py: { xs: 6, sm: 8 } }}>{renderForm()}</Box>
    </Box>
  );
};
