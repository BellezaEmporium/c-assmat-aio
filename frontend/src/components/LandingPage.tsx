import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import ShieldMoonRoundedIcon from '@mui/icons-material/ShieldMoonRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import { AuthResponse } from '../services/api';
import { LoginPage } from './LoginPage';

interface LandingPageProps {
  onLoginSuccess?: (auth: AuthResponse) => void;
}

const features = [
  {
    title: 'Planning intelligent',
    description:
      'Visualisez vos disponibilités, vos contrats et vos présences en un coup d’œil grâce à un calendrier intuitif.',
    icon: CalendarMonthRoundedIcon
  },
  {
    title: 'Gestion simplifiée des familles',
    description:
      'Centralisez les informations des parents employeurs, des enfants accueillis et des contrats associés.',
    icon: Diversity3RoundedIcon
  },
  {
    title: 'Conformité automatique',
    description:
      'Recevez des rappels intelligents pour rester alignée avec les obligations légales et administratives.',
    icon: ShieldMoonRoundedIcon
  },
  {
    title: 'Suivi financier précis',
    description:
      'Anticipez vos revenus, exportez vos relevés et préparez vos déclarations en quelques clics.',
    icon: AutoGraphRoundedIcon
  }
];

const highlights = [
  { label: 'Assistantes maternelles accompagnées', value: '1 200+' },
  { label: 'Heures gérées chaque semaine', value: '85 000' },
  { label: 'Familles satisfaites', value: '98%' }
];

const testimonials = [
  {
    name: 'Sophie L.',
    role: 'Assistante maternelle depuis 8 ans',
    quote:
      'Depuis que j’utilise cette plateforme, je gagne plus de temps avec les enfants et moins sur l’administratif. Mes parents employeurs adorent la clarté du suivi.'
  },
  {
    name: 'Marc & Julie',
    role: 'Parents employeurs',
    quote:
      'Nous recevons automatiquement les heures, les factures et les documents. Tout est transparent et nous rassure énormément.'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, #d0e4ff 0%, rgba(208, 228, 255, 0) 55%), radial-gradient(circle at bottom right, #ffe3f3 0%, rgba(255, 227, 243, 0) 65%), #f8fbff'
      }}
    >
      <Box
        component="section"
        sx={{
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Chip
                  label="Assistant(e) maternelle augmentée"
                  sx={{
                    alignSelf: 'flex-start',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                />
                <Typography variant="h2" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
                  Votre copilote pour gérer l’accueil des enfants en toute sérénité
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 520 }}>
                  Suivi des présences, contrats, échanges avec les familles, déclarations… Simplifiez-vous le quotidien grâce à
                  une interface intuitive conçue pour les assistantes maternelles.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<PlayArrowRoundedIcon />}
                    sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
                    href="#demo"
                  >
                    Voir la démo guidée
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ px: 4, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
                    href="#features"
                  >
                    Découvrir les fonctionnalités
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <Avatar sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.15), color: theme.palette.primary.main }}>
                      <EmojiEventsRoundedIcon />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      Plateforme recommandée par les réseaux d’accompagnement petite enfance
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <LoginPage
                variant="card"
                onSuccess={onLoginSuccess}
                title="Connexion assistante maternelle"
                subtitle="Utilisez les identifiants démo pour découvrir l’espace pro."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="features" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Stack spacing={2} sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
              Ce que vous pouvez faire
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Tout un bureau d’assistante maternelle dans votre poche
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
              Unifiez le planning, les échanges avec les parents et la préparation administrative pour gagner du temps chaque
              semaine.
            </Typography>
          </Stack>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={feature.title}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                      backgroundColor: '#fff',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 16px 50px ${alpha(theme.palette.primary.main, 0.12)}`
                      }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Avatar
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          color: theme.palette.primary.main,
                          width: 56,
                          height: 56,
                          mb: 2
                        }}
                      >
                        <Icon fontSize="medium" />
                      </Avatar>
                      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
                Des résultats concrets
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Des assistantes maternelles plus sereines et mieux préparées
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                En centralisant vos contrats, vos calculs de paie et vos communications, vous réduisez les oublis et répondez
                rapidement aux demandes des parents.
              </Typography>
              <Stack direction="row" spacing={3}>
                {highlights.map((item) => (
                  <Stack key={item.label} spacing={0.5}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.12)}`,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, #fff)`
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  <Stack spacing={3}>
                    {testimonials.map((testimonial) => (
                      <Box key={testimonial.name}>
                        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                          “{testimonial.quote}”
                        </Typography>
                        <Stack direction="row" spacing={1.5}>
                          <Avatar sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.18), color: theme.palette.primary.main }}>
                            <EmojiPeopleRoundedIcon />
                          </Avatar>
                          <Stack>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {testimonial.role}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
