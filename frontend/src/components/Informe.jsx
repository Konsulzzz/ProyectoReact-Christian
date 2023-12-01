import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//importo la librería de informes
import MaterialTable from "@material-table/core";
import Topbar from './Topbar';
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
function Informe() {
    const { isAutenticated, userName, userRol, isInvitado } = useSelector((state) => state.login);
    const navigate = useNavigate();
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
    const col = [
        { title: "Nombre", field: "nombre", filtering: false },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio", field: "precio", type: "numeric", filtering: false }
    ];
    //Datos que se van a mostrar en la tabla para el informe: aquí hemos puesto tres filas de la tabla, pero podemos poner
    //tantas como queramos o necesitemos
    //En una aplicación real estos datos vendrían de una consulta a la base de datos
    const tableData = [
        { nombre: "Monogatari", marca: "Shaft", tipo: "Psicologico", precio: 100 },
        { nombre: "Umineko", marca: "07th", tipo: "Misterio", precio: 98 },
        { nombre: "Tsuki ga kirei", marca: "A1", tipo: "Romance", precio: 85 },
    ];
    /*Para mostrar los datos en la tabla que luego será el informe uso el componente <MaterialTable/> de la librería
    @material-table/core, pasándole como props: columns y data. A columns le doy el valor de la variable col que definí
    antes y a data le doy el valor de la variable tableData*/
    return (
        <div>
            <Topbar></Topbar>

            <MaterialTable
                columns={col}
                data={tableData}
                title="Tabla colección"
                options={{
                    draggable: false,
                    columnsButton: true,
                    filtering: true,
                    headerStyle: {

                        backgroundColor: 'black',
                        color: 'white',

                    },
                    exportMenu: [
                        {
                            label: "Exportar a PDF",
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, "Colección de datos"),
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, "Colección de datos"),
                        },
                    ],
                }}
                /*renderSummaryRow={({ data }) => {
                    const totalPrecio = data.reduce((total, row) => total + row.precio, 0);
                    return {
                      value: `Total Precio: ${totalPrecio}`,
                      style: { background: '#FFDFE5', fontWeight: 'bold' },
                    };
                  }}*/
                  renderSummaryRow={({ column, data }) =>
                  column.field === "precio"
                    ? {
                        value: data.reduce((agg, row) => agg + row.precio, 0),
                        style: { background: "#FFDFE5" },
                      }
                    : undefined
                }


                />
              </div>
    )
}
export default Informe