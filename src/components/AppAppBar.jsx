import * as React from 'react';
import PropTypes from 'prop-types';
//MUI Imports
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import Link from "@mui/material/Link";


//Custom Imports
import { useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';
import { Link as RouterLink } from "react-router-dom";



const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Link component={RouterLink} to="/">
                <img
                  src={
                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                  }
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Link>
              {userInfo ?
                (<>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Link component={RouterLink} to="/tasks" style={{ textDecoration: 'none' }}>
                      <MenuItem
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Tareas
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link component={RouterLink} to="/actions" style={{ textDecoration: 'none' }}>
                      <MenuItem
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Acciones
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link component={RouterLink} to="/usersList" style={{ textDecoration: 'none' }}>
                      <MenuItem
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Usuarios
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link component={RouterLink} to="/forms" style={{ textDecoration: 'none' }}>
                      <MenuItem
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Formularios
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link component={RouterLink} to="/faq" style={{ textDecoration: 'none' }}>
                      <MenuItem
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography variant="body2" color="text.primary">
                          FAQ
                        </Typography>
                      </MenuItem>
                    </Link>
                  </Box>
                </>)


                :


                (<></>)}

            </Box>


            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Divider orientation="vertical" variant="middle" flexItem style={{ marginRight: "10px" }} />
              {userInfo ? (<>
                <Link component={RouterLink} to="/brand" style={{ textDecoration: 'none' }}>
                  <MenuItem
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Organizacion
                    </Typography>
                  </MenuItem>
                </Link>
                <Divider orientation="vertical" variant="middle" flexItem style={{ marginRight: "10px" }} />
                <AccountMenu user={userInfo} /></>) : (<></>)}



            </Box>


            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  <MenuItem>
                    {/**Buttons Here */}
                  </MenuItem>
                  <MenuItem>
                    {/**Buttons Here */}
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;