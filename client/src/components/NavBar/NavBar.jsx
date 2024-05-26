import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const login = () => {
        navigate('/login');
    };

    const addNewBook = () => {
        navigate('/addBook');
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {isAdmin ? 'BOOK STORE | ADMIN' : 'BOOK STORE'}
                        </Typography>
                        <Button color="inherit" onClick={goToHome}>
                            Home
                        </Button>
                        {isAdmin && (
                            <Button color="inherit" onClick={addNewBook}>
                                Add Book
                            </Button>
                        )}
                        {!token ? (
                            <Button color="inherit" onClick={login}>
                                Login
                            </Button>
                        ) : (
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
};

export default NavBar;
