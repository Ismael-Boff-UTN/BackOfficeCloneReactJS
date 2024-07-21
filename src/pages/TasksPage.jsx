import { React, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { Chip } from '@mui/material';
import { CardActionArea } from '@mui/material';


//Custom Imports
import { useDispatch, useSelector } from 'react-redux';
import { useLoadFormsMutation, useDeleteFormMutation } from '../slices/formsApiSlice';
import { setFormsList } from '../slices/formsSlice';
import { useNavigate } from 'react-router-dom';



const logoStyle = {
    width: '140px',

};

export default function TasksPage() {
    const theme = useTheme();


    const navigate = useNavigate();

    //REDUX
    const dispatch = useDispatch();
    const { formsList } = useSelector((state) => state.forms);
    //API CALL
    const [getAllForms] = useLoadFormsMutation();



    const getForms = async () => {
        const res = await getAllForms().unwrap();
        dispatch(setFormsList(res.forms));
    }

    useEffect(() => {
        getForms();
    }, [])

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
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Lista De Tareas
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
                    cuando un impresor (N. del T. persona que se dedica a la imprenta)
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {formsList?.map((form, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                        <CardActionArea onClick={() => navigate(`/tasks/view/${form._id}`)}>
                            <Card
                                onClick={() => console.log("clickeate ", index)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    flexGrow: 1,
                                    p: 1,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" color="text.secondary">
                                        {form.name}
                                    </Typography>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        pr: 2,
                                    }}
                                >
                                    <CardHeader
                                        title={<Chip label={`Tareas : ${form.formTasks?.length}`} color='success' />}
                                        subheader={form.description}
                                    />
                                    <img
                                        src={form.brandLogo}
                                        alt={`Logo ${index + 1}`}
                                        style={logoStyle}
                                    />
                                </Box>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}