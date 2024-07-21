import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MapIcon from '@mui/icons-material/Map';
import TaskIcon from '@mui/icons-material/Task';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
import EditIcon from '@mui/icons-material/Edit';
//Custom Imports
import { useParams } from 'react-router-dom'
import { useGetFormbyIdQuery } from '../slices/formsApiSlice';
import { Triangle } from 'react-loader-spinner'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    {
        field: "assignedUser", headerName: 'Creado Por', width: 100, renderCell: (params) => {
            return (
                <div>
                    {params.row.assignedUser.firstName + " " + params.row.assignedUser.lastName}
                </div>
            );
        }
    },
    {
        field: "name", headerName: 'Nombre', width: 100, renderCell: (params) => {
            return (
                <>

                    <div>
                        {params.row.data.name}
                        {console.log("desde params ", params.row.data.name)}
                    </div>
                </>
            );
        }
    },


    {
        field: 'isActive', headerName: 'Estado', type: "boolean", width: 90, renderCell: (cellValues) => {
            return (
                <>
                    {cellValues.row.isActive === true ? <Chip label="Activo" color="success" variant="filled" /> : <Chip label="Banned" color="error" variant="filled" />}
                </>


            );
        }
    },


    { field: 'createdAt', headerName: 'Fecha Registro', width: 70 },
    { field: 'updatedAt', headerName: 'Fecha Actualización', width: 70 },
    ,
    {
        field: 'opc', headerName: 'Editar', width: 60, renderCell: (cellValues) => {
            return (
                <IconButton aria-label="edit" color='success'>
                    <EditIcon />
                </IconButton>
            );
        }
    },
    {
        field: 'opc2', headerName: 'Ver', width: 60, renderCell: (cellValues) => {
            return (
                <IconButton aria-label="view" color='primary'>
                    <PageviewIcon />
                </IconButton>
            );
        }
    },
    {
        field: 'opc3', headerName: 'Eliminar', width: 70, renderCell: (cellValues) => {
            return (
                <IconButton aria-label="delete" color='error' >
                    <DeleteIcon />
                </IconButton>
            );
        }
    }

];

const TaskViewer = () => {

    //TABS STATE
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const { id } = useParams()

    const { data, isLoading } = useGetFormbyIdQuery(id);

    if (!isLoading) {
        console.log(data.formularioEncontrado.formTasks);
    }
    return (
        <Container
            id="testimonials"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            {isLoading ? (<Triangle />) :
                (<>
                    <Typography variant='h5'>{data.formularioEncontrado.name}</Typography>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="MAPA" icon={<MapIcon />} {...a11yProps(0)} />
                                <Tab label="TAREAS" icon={<TaskIcon />} {...a11yProps(1)} />
                                <Tab label="GRAFICOS" icon={<AutoGraphIcon />} {...a11yProps(2)} />
                                <Tab label="EXTRA TAB" icon={<MoreTimeIcon />} {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        {/**VENTANA PARA MOSTRAR EL MAPA */}
                        <CustomTabPanel value={value} index={0}>
                            Item One
                        </CustomTabPanel>
                        {/**VENTANA PARA MOSTRAR LA LISTA DE TAREAS */}
                        <CustomTabPanel value={value} index={1}>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={data.formularioEncontrado?.formTasks}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },

                                    },
                                }}
                                pageSizeOptions={[5, 10]}

                            />
                        </CustomTabPanel>
                        {/**VENTANA PARA MOSTRAR LOS GRAFICOS */}
                        <CustomTabPanel value={value} index={2}>
                            Item Three
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            LOREM IMPSUNNN
                        </CustomTabPanel>
                    </Box>
                </>)}

        </Container>
    )
}

export default TaskViewer