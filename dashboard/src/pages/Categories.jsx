import React, { useState, useEffect } from "react";
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

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: "",
        type_id: "",
    });
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/categories");
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCreateCategory = async () => {
        try {
            await axios.post("http://localhost:5000/api/categories", newCategory);
            setOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleEditCategory = async () => {
        try {
            await axios.put(`http://localhost:5000/api/categories/${editCategory.id}`, editCategory);
            setEditOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error editing category:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)} style={{ marginBottom: "10px" }}>
                Add Category
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.type_name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setEditCategory(category);
                                            setEditOpen(true);
                                        }}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for Adding a New Category */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Type ID"
                        fullWidth
                        value={newCategory.type_id}
                        onChange={(e) => setNewCategory({ ...newCategory, type_id: e.target.value })}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateCategory} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing an Existing Category */}
            {editCategory && (
                <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            fullWidth
                            value={editCategory.name}
                            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Type ID"
                            fullWidth
                            value={editCategory.type_id}
                            onChange={(e) => setEditCategory({ ...editCategory, type_id: e.target.value })}
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditCategory} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default Categories;
