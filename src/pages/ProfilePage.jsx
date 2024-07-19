import { React, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

//Custom Imports
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserProfileMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



export default function ProfilePage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loginName, setLoginName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [language, setLanguage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [updateProfile] = useUpdateUserProfileMutation();


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Las Contraseñas Deben Ser Iguales!");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    firstName,
                    lastName,
                    email,
                    password,
                    language,
                    profilePicture,
                    loginName

                }).unwrap();

                dispatch(setCredentials(res));
                toast.success("Perfil Actualizado");
            } catch (err) {
                toast.error(err?.data?.message || err.error,
                    {
                        position: "bottom-center",
                        autoClose: 2000,
                    })

            }
        }
    };

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    };



    //Funcion para convertir imagen a Base64
    //TODO desde bakckend deberia recibir base64 y guardarla en cloudinary o usar multer
    const img64 = (archivo) => {
        let reader = new FileReader();
        let file = archivo.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = function () {
            setProfilePicture(reader.result);
        };

    };



    useEffect(() => {
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setEmail(userInfo.email);
        setLanguage(userInfo.language);
        setProfilePicture(userInfo.profilePicture);
        setLoginName(userInfo.loginName);
    }, [userInfo.firsName, userInfo.lastName, userInfo.email, userInfo.language, userInfo.profilePicture, userInfo.loginName]);

    return (

        <Container component="main" maxWidth="xs" style={{ marginTop: "110px" }}>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >


                <Typography component="h1" variant="h5">
                    Actualizar Datos
                </Typography>
                <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                >
                    <Avatar alt="Remy Sharp" src={profilePicture} sx={{ width: 120, height: 120 }} />
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={img64} />

                </Button>

                <Box component="form" noValidate onSubmit={handleUpdateProfile} sx={{ mt: 3 }}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                        color="success"
                    >
                        Actualizar Perfil
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>

                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>

    );
}