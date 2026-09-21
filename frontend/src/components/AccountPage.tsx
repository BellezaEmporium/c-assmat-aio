import { ChangeEvent, SubmitEvent, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';

interface AccountProfile {
  fullName: string;
  phone: string;
  agrementNumber: string;
  pajemploiId: string;
  address: string;
  city: string;
  zipCode: string;
  notes: string;
}

const STORAGE_KEY = 'cassmat-account-profile';

const defaultProfile: AccountProfile = {
  fullName: '',
  phone: '',
  agrementNumber: '',
  pajemploiId: '',
  address: '',
  city: '',
  zipCode: '',
  notes: ''
};

export const AccountPage = () => {
  const [profile, setProfile] = useState<AccountProfile>(() => {
    if (typeof window === 'undefined') {
      return defaultProfile;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AccountProfile;
        return { ...defaultProfile, ...parsed };
      }
    } catch (error) {
      console.warn('Impossible de charger les informations du profil', error);
    }

    return defaultProfile;
  });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const profilePreview = useMemo(
    () => [
      profile.fullName && `Nom complet : ${profile.fullName}`,
      profile.phone && `Téléphone : ${profile.phone}`,
      profile.agrementNumber && `N° d'agrément : ${profile.agrementNumber}`,
      profile.pajemploiId && `Identifiant Pajemploi : ${profile.pajemploiId}`,
      profile.address && `Adresse : ${profile.address}`,
      profile.city && profile.zipCode && `${profile.zipCode} ${profile.city}`
    ].filter(Boolean) as string[],
    [profile]
  );

  const handleChange = (field: keyof AccountProfile) => (event: ChangeEvent<HTMLInputElement>) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }));
    setStatus('idle');
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setStatus('success');
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Mon compte
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
          Centralisez vos informations administratives pour les retrouver rapidement lors de vos déclarations, renouvellements ou
          échanges avec les parents employeurs.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 4 }}>
        <CardHeader
          title="Coordonnées professionnelles"
          subheader="Ces informations restent stockées localement dans votre navigateur et ne sont pas transmises au serveur."
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Nom complet"
                  placeholder="Ex : Emma Dupont"
                  value={profile.fullName}
                  onChange={handleChange('fullName')}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Téléphone"
                  placeholder="06 12 34 56 78"
                  value={profile.phone}
                  onChange={handleChange('phone')}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="N° d'agrément"
                  placeholder="XX-987654321"
                  value={profile.agrementNumber}
                  onChange={handleChange('agrementNumber')}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Identifiant Pajemploi"
                  placeholder="1234567A"
                  value={profile.pajemploiId}
                  onChange={handleChange('pajemploiId')}
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Adresse"
                  placeholder="12 rue des Lilas"
                  value={profile.address}
                  onChange={handleChange('address')}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Code postal"
                  placeholder="75000"
                  value={profile.zipCode}
                  onChange={handleChange('zipCode')}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  label="Ville"
                  placeholder="Paris"
                  value={profile.city}
                  onChange={handleChange('city')}
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Notes internes"
                  placeholder="Rappels, disponibilités, contacts d'urgence..."
                  value={profile.notes}
                  onChange={handleChange('notes')}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Grid>
              <Grid size={12}>
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained" size="large">
                    Enregistrer mes informations
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          {status === 'success' && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Profil mis à jour ! Vos informations sont sauvegardées sur cet appareil.
            </Alert>
          )}
        </CardContent>
      </Card>

      {profilePreview.length > 0 && (
        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <CardHeader title="Aperçu rapide" subheader="Copiez/collez ces informations lors de vos démarches administratives." />
          <CardContent>
            <Stack spacing={1.5}>
              {profilePreview.map((line) => (
                <Typography key={line} variant="body2">
                  {line}
                </Typography>
              ))}
              {profile.notes && (
                <Alert severity="info" variant="outlined">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Notes internes
                  </Typography>
                  <Typography variant="body2">{profile.notes}</Typography>
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};
