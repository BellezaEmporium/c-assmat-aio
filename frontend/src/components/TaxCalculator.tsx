import { Alert, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

interface TaxCalculatorProps {
  employerData?: unknown[];
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ employerData = [] }) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Calculateur de charges et revenus
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
        Préparez vos déclarations et anticipez vos revenus nets en renseignant vos heures, indemnités et frais professionnels.
        Cette section sera progressivement enrichie avec un simulateur précis basé sur les barèmes PAJEMPLOI et les dernières
        revalorisations légales.
      </Typography>

      <Alert severity="info" variant="outlined">
        Connectez-vous pour enregistrer vos paramètres (tarifs, repas, kilomètres) et générer des exports prêts à transmettre à vos
        parents employeurs.
      </Alert>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Vos employeurs enregistrés
            </Typography>
            {employerData.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Lorsque vous ajouterez des employeurs, leurs paramètres (taux horaire, indemnités) apparaîtront ici pour alimenter les
                calculs.
              </Typography>
            ) : (
              <Stack direction="row" spacing={1}>
                {employerData.map((employer, index) => {
                  const employerRecord = employer as { name?: string };
                  return (
                    <Chip
                      key={index}
                      label={employerRecord?.name ?? `Employeur ${index + 1}`}
                      color="primary"
                      variant="outlined"
                    />
                  );
                })}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ p: 3, borderRadius: 3, backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          À venir très bientôt
        </Typography>
        <Stack component="ul" spacing={1} sx={{ pl: 3, m: 0 }}>
          <Typography component="li" variant="body2" color="text.secondary">
            Simulation du revenu net après charges sociales.
          </Typography>
          <Typography component="li" variant="body2" color="text.secondary">
            Génération automatique du détail annuel à transmettre à vos parents employeurs.
          </Typography>
          <Typography component="li" variant="body2" color="text.secondary">
            Export PDF et Excel pour votre comptable ou votre CAF.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};