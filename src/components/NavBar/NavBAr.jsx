import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slice/authSlice';
import { Drawer, List, ListItem, useMediaQuery } from '@mui/material';
import logo from "../../assets/sb.png"
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerIcon from '@mui/icons-material/Timer';

const pages = [
    { title: 'Home', path: "/", icon: <HomeIcon sx={{mr: "2px", fontSize: 20}}/> },
    { title: 'Tasks', path: "/tasks", icon: <ListAltIcon sx={{mr: "2px", fontSize: 20}}/>},
    { title: 'Calendar', path: "/calendar", icon: <CalendarMonthIcon sx={{mr: "2px", fontSize: 20}}/> },
    { title: "Pomodoro", path: "/pomodoro", icon: <TimerIcon sx={{mr: "2px", fontSize: 20}}/>}
];
const settings = ['Profile', 'Account', 'Logout'];

export const NavBar = () => {
    const { user, isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: "#023e8a"
        }}>
            <Container maxWidth={"100%"}>
                <Toolbar disableGutters sx={{
                    py: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <IconButton component={Link} to="/" sx={{display: { xs: 'none', md: 'flex' },}}>
                    <img src={logo} alt="My Website Logo" style={{ height: '50px' }} />
                    </IconButton>

                    <Box sx={{display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <Box sx={{
                                width: 150,
                                height: "100vh",
                                backgroundColor: "#023e8a"
                            }}>
                            <List>
                            {pages.map((page) => (
                                <ListItem key={page.title} onClick={handleCloseNavMenu} component={Link} to={page.path} >
                                    <Button
                                    key={page.title}
                                    onClick={() => {
                                        handleCloseNavMenu
                                        navigate(page.path)
                                    }}
                                    sx={{
                                        my: 1,
                                        width: "100%",
                                        textAlign: "start",
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        fontWeight: 700,
                                        px: "3px",
                                        py: 1,
                                        transition: '0.3s',
                                        '&:hover': {
                                            backgroundColor: '#caf0f8', // Color on hover
                                            transform: 'scale(1.05)',    // Slight scaling effect
                                        },
                                        ...(location.pathname === page.path && {
                                            backgroundColor: '#ade8f4',
                                            fontWeight: 'bold',
                                            color: "black"
                                        })
                                    }}
                                >
                                 {page.icon}
                                {page.title}
                                </Button>
                                </ListItem>
                            ))}
                            </List>
                            </Box>
                        </Drawer>
                    </Box>
                    <IconButton component={Link} to="/" sx={{display: { xs: 'flex', md: 'none' }}}>
                    <img src={logo} alt="My Website Logo" style={{ height: '40px' }} />
                    </IconButton>
                        <Box sx={{
                            // flexGrow: 1, 
                            minWidth: {md: 500, lg:600},
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingX: "9px",
                            borderRadius: 1000,
                            backgroundColor: "white"
                        }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.title}
                                    onClick={() => {
                                        handleCloseNavMenu
                                        navigate(page.path)
                                    }}
                                    sx={{
                                        my: 1,
                                        color: 'black',
                                        display: 'block',
                                        fontWeight: 700,
                                        borderRadius: 1000,
                                        px: 4,
                                        py: 1,
                                        transition: '0.3s',
                                        '&:hover': {
                                            backgroundColor: '#caf0f8', // Color on hover
                                            transform: 'scale(1.05)',    // Slight scaling effect
                                        },
                                        ...(location.pathname === page.path && {
                                            backgroundColor: '#ade8f4',
                                            fontWeight: 'bold',
                                        })
                                    }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: {lg: "row", xl: "row"},
                    }}>
                        {!isLoggedIn && (
                            <Box>
                                {location.pathname !== "/register" && (
                                    <Button variant='contained' sx={{
                                        backgroundColor: "#ade8f4",
                                        color: "black",
                                        fontWeight: 700,
                                        mr: 1,
                                        transition: '0.3s',
                                        '&:hover': {
                                            backgroundColor: '#caf0f8', // Color on hover
                                            transform: 'scale(1.05)',    // Slight scaling effect
                                        },
                                    }}
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Button>
                                )}
                                {location.pathname !== "/login" && (
                                    <Button variant='contained' sx={{
                                        backgroundColor: "#ade8f4",
                                        color: "black",
                                        fontWeight: 700,
                                        mr: 1,
                                        transition: '0.3s',
                                        '&:hover': {
                                            backgroundColor: '#caf0f8', // Color on hover
                                            transform: 'scale(1.05)',    // Slight scaling effect
                                        },
                                    }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Box>
                        )}
                        <Box sx={{
                            // flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>
                            {isLoggedIn && (
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ color: "#023e8a" }}>
                                            {user?.userName?.charAt(0).toUpperCase() || 'U'}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => {
                                    return (
                                        <MenuItem key={setting} onClick={() => {
                                            if (isLoggedIn) {
                                                dispatch(logoutUser())
                                            }
                                            handleCloseUserMenu()
                                        }}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    )
                                }
                                )}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

