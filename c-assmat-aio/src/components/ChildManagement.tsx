import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem
} from '@mui/material';

interface Child {
  id: string;
  name: string;
  birthDate: string;
  employerId: string;
}

interface Employer {
  id: string;
  name: string;
}

export const ChildManagement = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [open, setOpen] = useState(false);
  const [currentChild, setCurrentChild] = useState<Partial<Child>>({});

  useEffect(() => {
    fetchChildren();
    fetchEmployers();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/children');
      setChildren(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des enfants :', error);
    }
  };

  const fetchEmployers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employers');
      setEmployers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des employeurs :', error);
    }
  };

  const handleOpen = (child?: Child) => {
    setCurrentChild(child ? { ...child } : {});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentChild({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChild({
      ...currentChild,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (currentChild.id) {
        await axios.put(`http://localhost:3000/api/children/${currentChild.id}`, currentChild);
      } else {
        await axios.post('http://localhost:3000/api/children', currentChild);
      }
      fetchChildren();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/children/${id}`);
      fetchChildren();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Ajouter un enfant
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Date de naissance</TableCell>
            <TableCell>Employeur</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children.map((child) => (
            <TableRow key={child.id}>
              <TableCell>{child.name}</TableCell>
              <TableCell>{child.birthDate}</TableCell>
              <TableCell>
                {employers.find((e) => e.id === child.employerId)?.name || ''}
              </TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleOpen(child)}>
                  Modifier
                </Button>
                <Button color="secondary" onClick={() => handleDelete(child.id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentChild.id ? 'Modifier' : 'Ajouter'} un enfant</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            value={currentChild.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="birthDate"
            label="Date de naissance"
            type="date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            value={currentChild.birthDate || ''}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="employerId"
            label="Employeur"
            fullWidth
            value={currentChild.employerId || ''}
            onChange={handleChange}
          >
            {employers.map((employer) => (
              <MenuItem key={employer.id} value={employer.id}>
                {employer.name}
              </MenuItem>
            ))}
          </TextField>
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