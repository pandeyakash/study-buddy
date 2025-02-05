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
import { useNavigate, useLocation } from 'react-router-dom';

const pages = [
    {title:'Home', path: "/"},
    {title: 'Tasks', path: "/tasks"},
    {title: 'Calendar', path: "/calender"},
    {title: "Pomodoro", path: "/pomodoro"}
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavBar = () => {
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
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Study Buddy
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Study Buddy
                    </Typography>
                    <Box sx={{
                        minWidth: {lg: 800, xl: 1000},
                        display: "flex",
                        justifyContent: "flex-start"
                    }}>
                    <Box sx={{
                        // flexGrow: 1, 
                        minWidth: 600,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingX: 2,
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
                                    // backgroundColor: "red",
                                    px: 4,
                                    py: 1,
                                    transition: '0.3s',
                                    '&:hover': {
                                        backgroundColor: '#ade8f4', // Color on hover
                                        transform: 'scale(1.05)',    // Slight scaling effect
                                    },
                                    ...(location.pathname === page.path && {
                                        backgroundColor: '#48cae4',
                                        fontWeight: 'bold',
                                    })
                                }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    </Box>
                    <Box sx={{
                        display: "flex"
                    }}>
                        <Button variant='contained' sx={{
                            backgroundColor: "#48cae4",
                            color: "black",
                            fontWeight: 700,
                            mr: 1,
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: '#ade8f4', // Color on hover
                                transform: 'scale(1.05)',    // Slight scaling effect
                            },
                        }}
                        onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>
                        <Button variant='contained' sx={{
                            backgroundColor: "#48cae4",
                            color: "black",
                            fontWeight: 700,
                            mr: 1,
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: '#ade8f4', // Color on hover
                                transform: 'scale(1.05)',    // Slight scaling effect
                            },
                        }}
                        onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    <Box sx={{
                        // flexGrow: 1,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{color: "#023e8a"}}/>
                            </IconButton>
                        </Tooltip>
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

