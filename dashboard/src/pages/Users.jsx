import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import axios from "axios";
import '../index.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editUser, setEditUser] = useState(null);
    const [open, setOpen] = useState(false);

    // Fetch users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setOpen(true);
    };

    const handleSave = async () => {
        try {
            await axios.patch(
                `http://localhost:5000/api/users/${editUser.id}`,
                {
                    name: editUser.name,
                    surname: editUser.surname,
                    phone_number: editUser.phone_number,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setOpen(false);
            setEditUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading)
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
            </div>
        );

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Surname</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone Number</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:nth-of-type(odd)": { backgroundColor: "#f4f6f8" },
                                    "&:hover": { backgroundColor: "#e3f2fd" },
                                }}
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.phone_number}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(user)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        value={editUser?.name || ""}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Surname"
                        fullWidth
                        value={editUser?.surname || ""}
                        onChange={(e) => setEditUser({ ...editUser, surname: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={editUser?.phone_number || ""}
                        onChange={(e) => setEditUser({ ...editUser, phone_number: e.target.value })}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Users;
