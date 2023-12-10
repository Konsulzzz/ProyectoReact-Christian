import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from "@material-table/core";
import InformeColeccion from './InformeColeccion';
import Topbar from './Topbar';

import {
    AppBar, Container, Toolbar, Grid, Typography, Button, Paper, Box, TextField, Table, TableContainer, TableHead, TableBody, TableCell, TableRow
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { ExportCsv, ExportPdf } from "@material-table/exporters";

function Informe() {
    const { isAutenticated, userName, userRol, isInvitado } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [generateReport, setGenerateReport] = useState(false);

    useEffect(() => {
        if (!isAutenticated) {
            navigate('/');
        }
    }, [isAutenticated, navigate]);

    const fetchTableData = async () => {
        fetch('http://localhost:3030/getItems?')
            .then(response => response.json())
            .then(data => {
                setTableData(data);
            })
            .catch(error => {
                console.error('Error during fetch:', error.message);
            });
    };

    const handleGenerateReport = () => {
        // Actualizar la variable de control y realizar el fetch
        setGenerateReport(true);
        fetchTableData();
    };

    return (
        <div>
            <Topbar />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Tooltip title="Haz clic para generar un informe de la tabla de libros" arrow>
                    <Button variant="contained" color="secondary" onClick={handleGenerateReport}>
                        Generar Informe
                    </Button>
                </Tooltip>
            </div>
            {generateReport && <InformeColeccion datos={tableData} />}
        </div>
    );
}

export default Informe;
