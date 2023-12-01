import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//importo la librería de informes
import MaterialTable from "@material-table/core";
import InformeColeccion from './InformeColeccion';
import Topbar from './Topbar';
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
function Informe() {
    const { isAutenticated, userName, userRol, isInvitado } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        if (!isAutenticated) {
            navigate('/');
        }
    }, [isAutenticated, navigate]);
    //Creación de los datos de prueba: definición de las columnas de la tabla y de los datos de la tabla
    //Para cada elemento que queremos mostrar tendremos el title y el field
    //El title contendrá el título de la columna de la tabla
    //El field contendrá el nombre que le damos a ese campo en la tabla
    //Por ejemplo: tendremos una columna con el title Nombre cuyo campo se llamará firstName
    //Podemos indicar también el type y decir que es numérico, como en el caso del año nacimient
    const fetchTableData = async () => {
        // Realizar el fetch al endpoint /getItems al montar el componente
        fetch('http://localhost:3030/getItems?')
            .then(response => response.json())
            .then(data => {
                // Almacenar los datos en el estado tableData
                setTableData(data);
            })
            .catch(error => {
                // Manejar errores en caso de que ocurran durante la solicitud
                console.error('Error durante el fetch:', error.message);
            });
    };
    useEffect(() => {
        // Realizar el fetch al endpoint /getItems al montar el componente
        fetchTableData(); // Llama a la función para cargar datos al entrar en la página
    }, []);
    return (
        <div>

            <Topbar></Topbar>
            <InformeColeccion datos={tableData} />




        </div>
    )
}
export default Informe