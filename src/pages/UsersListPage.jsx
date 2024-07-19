import { React, useEffect } from 'react';
//MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
//Custom Imports
import AddNewUser from './AddNewUser';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadAllUsersMutation } from '../slices/userApiSlice';
import { setUsersList } from '../slices/authSlice';



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
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'loginName', headerName: 'Usuario', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'fullName',
        headerName: 'Nombre Completo',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'isActive', headerName: 'Estado', type: "boolean", width: 70 },
    {
        field: 'language',
        headerName: 'Idioma',
        width: 90,
    },
    { field: 'roles', headerName: 'Roles', width: 130 },
    { field: 'createdAt', headerName: 'Fecha Registro', width: 70 },
    { field: 'updatedAt', headerName: 'Fecha Actualización', width: 70 },
    ,
    { field: 'opc', headerName: 'Opciones', width: 130, renderCell: renderDetailsButton, },

];


export default function UsersListPage() {

    //REDUX
    const dispatch = useDispatch();
    const { usersList } = useSelector((state) => state.auth);
    //API CALL
    const [getAllUsers] = useLoadAllUsersMutation();
    
    const getUsers = async () => {
        const res = await getAllUsers().unwrap();
        dispatch(setUsersList(res));
    }

    useEffect(() => {
        getUsers();
    }, [])





    return (
        <Container
            id="usersList"
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
                    Lista De Usuarios
                </Typography>
                <Typography variant="body1" color="text.secondary">

                </Typography>

            </Box>
            <AddNewUser />


            <DataGrid
                getRowId={(row) => row._id}
                rows={usersList?.users}
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