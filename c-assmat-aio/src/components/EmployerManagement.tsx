import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';

interface Employer {
  id: string;
  name: string;
  hourlyRate: number;
  mealPrice: number;
}

export const EmployerManagement = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [open, setOpen] = useState(false);
  const [currentEmployer, setCurrentEmployer] = useState<Partial<Employer>>({});

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employers');
      setEmployers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des employeurs :', error);
    }
  };

  const handleOpen = (employer?: Employer) => {
    setCurrentEmployer(employer ? { ...employer } : {});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployer({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmployer({
      ...currentEmployer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (currentEmployer.id) {
        await axios.put(`http://localhost:3000/api/employers/${currentEmployer.id}`, currentEmployer);
      } else {
        await axios.post('http://localhost:3000/api/employers', currentEmployer);
      }
      fetchEmployers();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/employers/${id}`);
      fetchEmployers();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Ajouter un employeur
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Tarif horaire (€)</TableCell>
            <TableCell>Prix du repas (€)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employers.map((employer) => (
            <TableRow key={employer.id}>
              <TableCell>{employer.name}</TableCell>
              <TableCell>{employer.hourlyRate}</TableCell>
              <TableCell>{employer.mealPrice}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleOpen(employer)}>
                  Modifier
                </Button>
                <Button color="secondary" onClick={() => handleDelete(employer.id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentEmployer.id ? 'Modifier' : 'Ajouter'} un employeur</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            value={currentEmployer.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hourlyRate"
            label="Tarif horaire (€)"
            type="number"
            fullWidth
            value={currentEmployer.hourlyRate || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="mealPrice"
            label="Prix du repas (€)"
            type="number"
            fullWidth
            value={currentEmployer.mealPrice || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};