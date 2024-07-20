import { React, useEffect } from 'react';
//MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Link from "@mui/material/Link";
import AddIcon from '@mui/icons-material/Add';
//Custom Imports

import { useDispatch, useSelector } from 'react-redux';
import { useLoadFormsMutation, useDeleteFormMutation } from '../slices/formsApiSlice';
import { setFormsList, deleteForm } from '../slices/formsSlice';
import { Link as RouterLink } from "react-router-dom";



const renderDetailsButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}

            >
                Editar
            </Button>
        </strong>
    )
}

const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 200 },
    { field: 'isActive', headerName: 'Estado', type: "boolean", width: 70 },
    { field: 'createdAt', headerName: 'Fecha De Creacion', width: 200 },
    { field: 'updatedAt', headerName: 'Fecha De Actualización', width: 200 },
    { field: 'opc', headerName: 'Opciones', width: 130, renderCell: renderDetailsButton, },

];


export default function UsersListPage() {

    //REDUX
    const dispatch = useDispatch();
    const { formsList } = useSelector((state) => state.forms);
    //API CALL
    const [getAllForms] = useLoadFormsMutation();
    const [deleteForm] = useDeleteFormMutation();

    const getForms = async () => {
        const res = await getAllForms().unwrap();
        dispatch(setFormsList(res.forms));
    }

    useEffect(() => {
        getForms();
    }, [])





    return (
        <Container
            id="formsList"
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
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Lista De Formularios
                </Typography>
                <Typography variant="body1" color="text.secondary">

                </Typography>

            </Box>
            <Link component={RouterLink} to="/forms/new">
                <Button color='success' variant='contained'>Nuevo Formulario</Button>
            </Link>
            <DataGrid
                getRowId={(row) => row._id}
                rows={formsList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },

                    },
                }}
                pageSizeOptions={[5, 10]}

            />

        </Container>
    );
}