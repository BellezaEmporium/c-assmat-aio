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
  pajemploiNumber?: string;
}

export const EmployerManagement = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [open, setOpen] = useState(false);
  const [currentEmployer, setCurrentEmployer] = useState<Partial<Employer>>({});
  const API_URL = 'http://127.0.0.1:8000/api';

  const AXIOS_CONFIG = {
    withCredentials: true,
    withXSRFToken: true,
  };

  const fetchEmployers = async (): Promise<Employer[]> => {
    const response = await axios.get<Employer[]>(`${API_URL}/me/employers`, AXIOS_CONFIG);
    return response.data;
  };
  
  useEffect(() => {
    fetchEmployers()
      .then(setEmployers)
      .catch((error) => {
        console.error('Erreur lors de la récupération des employeurs :', error);
      });
  }, []);

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
        await axios.put(`${API_URL}/me/employers/${currentEmployer.id}`, currentEmployer, AXIOS_CONFIG);
      } else {
        await axios.post(`${API_URL}/me/employers`, currentEmployer, AXIOS_CONFIG);
      }
      const updatedEmployers = await fetchEmployers();
      setEmployers(updatedEmployers);
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/me/employers/${id}`, AXIOS_CONFIG);
      const updatedEmployers = await fetchEmployers();
      setEmployers(updatedEmployers);
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
            <TableCell>N° Pajemploi</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employers.map((employer) => (
            <TableRow key={employer.id}>
              <TableCell>{employer.name}</TableCell>
              <TableCell>{employer.hourlyRate}</TableCell>
              <TableCell>{employer.mealPrice}</TableCell>
              <TableCell>{employer.pajemploiNumber || '—'}</TableCell>
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
          <TextField
            margin="dense"
            name="pajemploiNumber"
            label="Numéro Pajemploi"
            type="text"
            fullWidth
            value={currentEmployer.pajemploiNumber || ''}
            onChange={handleChange}
            placeholder="Ex : 1234567A"
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