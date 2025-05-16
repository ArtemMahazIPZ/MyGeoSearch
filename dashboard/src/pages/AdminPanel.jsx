import  { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Users from "./Users";
import Types from "./Types";
import Categories from "./Categories";
import Locations from "./Locations";
import '../index.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="admin panel tabs"
                centered
            >
                <Tab label="Users" />
                <Tab label="Types" />
                <Tab label="Categories" />
                <Tab label="Locations" />
            </Tabs>
            <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                    <Typography component="div">
                        <Users />
                    </Typography>
                )}
                {activeTab === 1 && (
                    <Typography component="div">
                        <Types />
                    </Typography>
                )}
                {activeTab === 2 && (
                    <Typography component="div">
                        <Categories />
                    </Typography>
                )}
                {activeTab === 3 && (
                    <Typography component="div">
                        <Locations />
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default AdminPanel;
