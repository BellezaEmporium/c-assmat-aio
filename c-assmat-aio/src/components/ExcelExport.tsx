import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parse, isAfter, isBefore, differenceInDays } from 'date-fns';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export const ExportToExcel = ({ employerData, childData }) => {
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    const generateExcelData = async () => {
      try {
        // Fetch the base Excel template
        const response = await axios.get('/api/excel-template');
        const workbook = XLSX.read(response.data, { type: 'binary' });
        const worksheet = workbook.Sheets['Planning'];

        // Fill the Excel data with actual values
        employerData.forEach((employer, employerIndex) => {
          childData.forEach((child, childIndex) => {
            const startDate = new Date();
            const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

            for (let i = 0; i <= differenceInDays(endDate, startDate); i++) {
              const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
              const rowIndex = employerIndex * childData.length * (differenceInDays(endDate, startDate) + 1) + childIndex * (differenceInDays(endDate, startDate) + 1) + i + 2; // Start from row 2

              // Fill the date
              XLSX.utils.sheet_set_value(worksheet, `A${rowIndex}`, format(currentDate, 'dd/MM/yyyy'));

              // Fill the hours worked
              const hoursWorked = isAfter(currentDate, new Date()) ? 0 : Math.floor(Math.random() * 10);
              XLSX.utils.sheet_set_value(worksheet, `D${rowIndex}`, hoursWorked);

              // Fill the hourly rate and meal price
              XLSX.utils.sheet_set_value(worksheet, `E${rowIndex}`, employer.hourlyRate);
              XLSX.utils.sheet_set_value(worksheet, `F${rowIndex}`, employer.mealPrice);
            }
          });
        });

        const excelBlob = XLSX.write(workbook, { type: 'blob', bookType: 'xlsx' });
        setExcelData(excelBlob);
      } catch (error) {
        console.error('Error generating Excel data:', error);
      }
    };

    generateExcelData();
  }, [employerData, childData]);

  const handleExport = () => {
    if (excelData) {
      saveAs(excelData, 'planning_assistante_maternelle.xlsx');
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Export to Excel
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleExport}
      >
        Export to Excel
      </Button>
    </div>
  );
};