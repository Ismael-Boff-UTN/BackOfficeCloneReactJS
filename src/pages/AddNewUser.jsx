import { React, useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, Grid, InputLabel, MenuItem, TextField, Select, Chip, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//Custom Imports
import { useDispatch } from 'react-redux';
import { useCreateUserMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { updateUsersList } from '../slices/authSlice';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'ROLE_USER',
    'ROLE_ADMIN',
    'ROLE_MANAGER',

];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function AddNewUser() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loginName, setLoginName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [language, setLanguage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roles, setRoles] = useState([]);


    const [createNewUser] = useCreateUserMutation();


    const dispatch = useDispatch();

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    };




    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRoles(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCreateNewUser = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Las Contraseñas Deben Ser Iguales!");
        } else {
            try {
                const res = await createNewUser({
                    firstName,
                    lastName,
                    email,
                    password,
                    language,
                    profilePicture,
                    loginName,
                    roles

                }).unwrap();
                console.log(res.user);
                dispatch(updateUsersList(res.user));

                toast.success("Usuario Creado!");
                setOpen(false);
            } catch (err) {
                toast.error(err?.data?.message || err.error,
                    {
                        position: "bottom-center",
                        autoClose: 2000,
                    })

            }
        }
    };
    return (
        <>
            <Button onClick={handleClickOpen('paper')} color='success' variant='contained'>Nuevo Usuario</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="scroll-dialog-title">Nuevo Usuario</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Nombre/s"
                                        autoFocus
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Apellido/s"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="loginName"
                                        label="Usuario"
                                        name="loginName"
                                        autoComplete="loginName"
                                        value={loginName}
                                        onChange={(e) => setLoginName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="repeat-password"
                                        label="Repetir Contraseña"
                                        type="repeat-password"
                                        id="repeat-password"
                                        autoComplete="repeat-new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="language-select-label">Idioma</InputLabel>
                                            <Select
                                                labelId="language-select-label"
                                                id="language-select"
                                                value={language}
                                                label="Idioma"
                                                onChange={handleChangeLanguage}
                                            >
                                                <MenuItem value={"es"}>Español</MenuItem>
                                                <MenuItem value={"en"}>Inglés</MenuItem>
                                                <MenuItem value={"pt-br"}>Portugues</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={roles}
                                            onChange={handleChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, roles, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="flex-end">
                                <Grid item>

                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCreateNewUser}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
