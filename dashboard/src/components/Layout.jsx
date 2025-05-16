import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import '../index.css';

const Layout = ({ children }) => {
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        MyGeoSearch Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4, backgroundColor: "white", borderRadius: 2, boxShadow: 3, padding: 3 }}>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
