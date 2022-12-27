import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProfilePage from './pages/ProfilePage';
import UserProfile from './pages/UserProfile';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme } from '@emotion/react';
import { checkOrCreateData } from './utils';
import { ToastContainer } from 'react-toastify';
import AppDrawer from './components/AppDrawer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



function App() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  checkOrCreateData();

  const [loggedInUser, setLoggedInUser] = React.useState(localStorage.getItem('loggedInUser'))
  const [userType, setUserType] = React.useState("")
    
    React.useEffect(()=>{
        if(loggedInUser === "{}"){
          setUserType("")
        }else{
          if(JSON.parse(localStorage.getItem('loggedInUser'))['role'] === 'admin'){
            setUserType("admin")
          }else{
            setUserType("user")
          }
        }
        setLoggedInUser(JSON.parse(loggedInUser));
    }, []);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              User Management System
            </Typography>
          </Toolbar>
        </AppBar>
        <AppDrawer drawerWidth={drawerWidth} open={open} DrawerHeader={DrawerHeader} handleDrawerClose={handleDrawerClose} theme={theme}  />
        <Main open={open}>
          <DrawerHeader />
            <Routes>
              <Route exact path="/" element={<LandingPage/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/register" element={<SignUp/>} />
              <Route exact path="/admin" element={<AdminDashboard/>} />
              <Route exact path="/user" element={<UserDashboard/>} />
              <Route exact path="/profile" element={<UserProfile/>} />
              <Route exact path="/profile/:username" element={<ProfilePage/>} />
            </Routes>
          <ToastContainer />
        </Main>
      </Box>
    </Router>
  );
}

export default App;
