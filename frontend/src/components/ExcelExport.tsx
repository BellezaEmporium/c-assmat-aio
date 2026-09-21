import { Button, Stack, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface ExportToExcelProps {
  employerData?: unknown[];
  childData?: unknown[];
}

export const ExportToExcel: React.FC<ExportToExcelProps> = ({ employerData = [], childData = [] }) => {
  const handleExport = () => {
    console.info('Export Excel à implémenter', {
      employerDataLength: employerData.length,
      childDataLength: childData.length
    });
  };

  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" component="h3">
        Export Excel
      </Typography>
      <Typography variant="body2" color="text.secondary">
        La génération automatique du planning en format Excel arrive prochainement. Vous pourrez bientôt télécharger un fichier prêt à
        partager avec les familles et votre comptabilité.
      </Typography>
      <Button variant="outlined" startIcon={<SaveIcon />} disabled onClick={handleExport}>
        Exporter (bientôt disponible)
      </Button>
    </Stack>
  );
};