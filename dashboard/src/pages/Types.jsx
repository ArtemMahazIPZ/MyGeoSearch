import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    CircularProgress,
    Box,
    Typography,
} from "@mui/material";
import axios from "axios";
import '../index.css';
const Types = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newType, setNewType] = useState("");

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/types");
            setTypes(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching types:", error);
            setLoading(false);
        }
    };

    const addType = async () => {
        try {
            await axios.post("http://localhost:5000/api/types", { name: newType });
            setNewType("");
            fetchTypes();
        } catch (error) {
            console.error("Error adding type:", error);
        }
    };

    const deleteType = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/types/${id}`);
            fetchTypes();
        } catch (error) {
            console.error("Error deleting type:", error);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Manage Types
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2, // Adds spacing between items
                    marginBottom: 3, // Adds space below the input and button group
                }}
            >
                <TextField
                    label="New Type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <Button
                    onClick={addType}
                    variant="contained"
                    color="primary"
                    sx={{ padding: "10px 20px" }}
                >
                    Add Type
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {types.map((type) => (
                            <TableRow key={type.id}>
                                <TableCell>{type.id}</TableCell>
                                <TableCell>{type.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => deleteType(type.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Types;
