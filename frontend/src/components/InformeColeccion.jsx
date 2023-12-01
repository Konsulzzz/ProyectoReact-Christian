import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//importo la librería de informes
import MaterialTable from "@material-table/core";
import Topbar from './Topbar';
//Importo la librería que nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";
function InformeColeccion(props) {

    console.log(props.datos)
    
    const col = [
        { title: "Nombre", field: "nombre", filtering: false },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio", field: "precio", type: "numeric", filtering: false }
    ];
    //Datos que se van a mostrar en la tabla para el informe: aquí hemos puesto tres filas de la tabla, pero podemos poner
    //tantas como queramos o necesitemos
    //En una aplicación real estos datos vendrían de una consulta a la base de datos
   const tableData = props.datos.map(dato => ({
        nombre: dato.nombre,
        marca: dato.marca,
        tipo: dato.tipo,
        precio: dato.precio
    }));
    
        
     
    /*Para mostrar los datos en la tabla que luego será el informe uso el componente <MaterialTable/> de la librería
    @material-table/core, pasándole como props: columns y data. A columns le doy el valor de la variable col que definí
    antes y a data le doy el valor de la variable tableData*/
    return (
        <div>
        

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
export default InformeColeccion