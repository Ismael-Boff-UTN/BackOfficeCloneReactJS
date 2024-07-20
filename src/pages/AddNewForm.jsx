import { Container } from '@mui/material'
import { useState, React } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Custom Imports
//import { useDispatch } from 'react-redux';
import { useCreateFormsMutation } from '../slices/formsApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AddNewForm = () => {


  const navigate = useNavigate()
  //API Call
  const [saveForm] = useCreateFormsMutation();



  //FORM STATE
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inputs, setInputs] = useState([{ description: "", label: "", type: "", value: "" }]);



  //FUNCIONES PARA MANJEAR CAMPOS DINAMICAMENTE
  const handleAddInput = () => {
    setInputs([...inputs, { description: "", label: "", type: "", value: "" }]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };



  //FUNCION PARA GUARDAR EL FORMULARIO
  const handleSaveForm = async (e) => {
    e.preventDefault();

    try {
      //console.log({name,description,formFields : inputs});
      const res = await saveForm({
        name,
        description,
        formFields: inputs,
      }).unwrap();
      toast.success("Formulario Creado!");
      navigate("/forms");
    } catch (err) {
      toast.error(err?.data?.message || err.error,
        {
          position: "bottom-center",
          autoClose: 2000,
        })

    }
  }






  return (
    <Container
      id="formsList"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography variant="h3" component="h2" textAlign={"center"} style={{ "marginTop": "30px" }}>
        Nuevo Formulario
      </Typography>

      <Typography variant="h5" component="h2">
        - Datos Basicos -
      </Typography>
      {/*CAMPO NOMBRE Y DESCRIPCION DEL FORMULARIO*/}
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Nombre"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="Descripcion"
              name="description"
              autoComplete="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider style={{ "marginTop": "20px", "marginBottom": "20px" }} />
      {/*SELECTOR DE PROPIEDADES*/}
      <Typography variant="h5" component="h2">
        - Propiedades -
      </Typography>
      <Stack direction="row" spacing={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label=" 1. Enviar notificaciones a la App" />
          <FormControlLabel control={<Checkbox />} label="2. Permite que las respuestas sean editables (afecta solo App)" />
          <FormControlLabel control={<Checkbox />} label="3. Permite que las respuestas sean actualizables" />
          <FormControlLabel control={<Checkbox />} label=" 4. Se muestra el mapa en el formulario (afecta solo App)" />

        </FormGroup>
        <FormGroup>

          <FormControlLabel control={<Checkbox />} label=" 5. Carga automaticamente los valores de la última respuesta" />
          <FormControlLabel control={<Checkbox />} label="6. Posición del mapa por defecto" />
          <FormControlLabel control={<Checkbox />} label=" 7. Limite de zona de búsqueda de direcciones" />
        </FormGroup>
      </Stack>

      <Divider style={{ "marginTop": "20px", "marginBottom": "20px" }} />
      {/*MAPEO DE CAMPOS DINAMICOS PARA EL FORMULARIO*/}
      <Typography variant="h5" component="h2">
        - Campos del Formulario -
      </Typography>

      {inputs.map((item, index) => (

        <Card style={{ marginTop: "10px" }} key={index}>

          <CardContent>


            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="label"
                    label="Etiqueta"
                    onChange={(event) => handleChange(event, index)}
                    value={item.label}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="simple-type-select">Tipo</InputLabel>
                    <Select
                      labelId="simple-type-select"
                      id="simple-type-select"
                      value={item.type}
                      name="type"
                      label="Tipo"
                      onChange={(event) => handleChange(event, index)}
                    >
                      <MenuItem value="text" >Texto</MenuItem>
                      <MenuItem value="map" >Mapa</MenuItem>
                      <MenuItem value="image" >Imagen</MenuItem>
                      <MenuItem value="address" >Direccion</MenuItem>
                      <MenuItem value="scanner" >Scanner</MenuItem>
                      <MenuItem value="date" >Fecha</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Descripción"
                    onChange={(event) => handleChange(event, index)}
                    value={item.description}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button size="small" variant='contained' color='success'>Agregar Propiedad</Button>
              <Tooltip title="Clonar Campo">
                <IconButton color="info">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar Campo">
                <IconButton color="error" onClick={() => handleDeleteInput(index)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <FormControlLabel control={<Checkbox />} label="Obligatorio" />
            </Stack>
          </CardActions>
        </Card>
      ))}

      <Divider style={{ "marginTop": "20px", "marginBottom": "20px" }} />

      <Button size="small" variant='contained' onClick={handleAddInput}>Agregar Campo</Button>



      <Divider style={{ "marginTop": "20px", "marginBottom": "20px" }} />






      <Button size="small" variant='contained' onClick={handleSaveForm}>Guardar Formulario</Button>
      <Button size="small" variant='contained' style={{ marginLeft: "20px" }} onClick={()=> navigate("/forms")}>Cancelar</Button>

    </Container>
  )
}

export default AddNewForm