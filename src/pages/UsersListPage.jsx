import { React } from 'react';
//MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
//Custom Imports
import AddNewUser from './AddNewUser';
import { useGetUsersQuery, useDeleteUserMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import UserView from "./UserView";
import { Triangle } from 'react-loader-spinner'



export default function UsersListPage() {


    //API CALL
    const { data, isLoading } = useGetUsersQuery();//Obtener Todos Los Usuarios
    const [deleteUser] = useDeleteUserMutation();//Eliminar Usuario


    const handleEdit = (event, cellValues) => {
        console.log(cellValues.row);
    };

    const handleDelete = async (event, cellValues) => {
        const res = await deleteUser(cellValues.row._id).unwrap();
        toast.success(res.message);
    };


    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: "loginName", headerName: 'Usuario', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'fullName',
            headerName: 'Nombre Completo',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
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
        {
            field: 'language',
            headerName: 'Idioma',
            width: 90,
        },
        {
            field: 'roles', headerName: 'Roles', width: 130, renderCell: (cellValues) => {
                return (
                    <Chip label={cellValues.row.roles} color="primary" variant="filled" />
                );
            }
        },
        { field: 'createdAt', headerName: 'Fecha Registro', width: 70 },
        { field: 'updatedAt', headerName: 'Fecha Actualización', width: 70 },
        ,
        {
            field: 'opc', headerName: 'Editar', width: 60, renderCell: (cellValues) => {
                return (
                    <IconButton aria-label="edit" color='success' onClick={(event) => {
                        handleEdit(event, cellValues);
                    }}>
                        <EditIcon />
                    </IconButton>
                );
            }
        },
        {
            field: 'opc2', headerName: 'Ver', width: 60, renderCell: (cellValues) => {
                return (
                    <UserView state={cellValues.row} />
                );
            }
        },
        {
            field: 'opc3', headerName: 'Eliminar', width: 70, renderCell: (cellValues) => {
                return (
                    <IconButton aria-label="delete" color='error' onClick={(event) => {
                        handleDelete(event, cellValues);
                    }}>
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }

    ];


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

            {!isLoading ? <><DataGrid

                getRowId={(row) => row._id}
                rows={data?.users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },

                    },
                }}
                pageSizeOptions={[5, 10]}

            /></> : (<Triangle />)}


        </Container>
    );
}