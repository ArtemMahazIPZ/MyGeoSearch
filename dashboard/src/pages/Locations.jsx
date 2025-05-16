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
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import axios from "axios";
import '../index.css';
const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [newLocation, setNewLocation] = useState({
        type_id: "",
        category_id: "",
        coordinates: { lat: "", lng: "" },
        photo_url: "",
        description: "",
        work_hours: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/locations");
            setLocations(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const handleCreateLocation = async () => {
        try {
            await axios.post("http://localhost:5000/api/locations", newLocation);
            setOpen(false);
            fetchLocations();
        } catch (error) {
            console.error("Error creating location:", error);
        }
    };

    const handleEditLocation = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/locations/${selectedLocation.id}`, selectedLocation);
            setEditOpen(false);
            fetchLocations();
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    const handleDeleteLocation = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/locations/${id}`);
            fetchLocations();
        } catch (error) {
            console.error("Error deleting location:", error);
        }
    };


    const filteredLocations = locations.filter((location) => {
        const matchesSearch = location.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType ? location.type_name === selectedType : true;
        const matchesCategory = selectedCategory ? location.category_name === selectedCategory : true;
        return matchesSearch && matchesType && matchesCategory;
    });


    const uniqueTypes = [...new Set(locations.map((location) => location.type_name))];
    const uniqueCategories = [...new Set(locations.map((location) => location.category_name))];

    if (loading) return <CircularProgress />;

    return (
        <>
            <TextField
                label="Search by Description"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <FormControl fullWidth margin="normal" style={{ marginBottom: '16px' }}>
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">All Types</MenuItem>
                    {uniqueTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" style={{ marginBottom: '16px' }}>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {uniqueCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="contained" onClick={() => setOpen(true)} style={{ marginBottom: "10px" }}>
                Add Location
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Coordinates</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Work Hours</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLocations.map((location) => (
                            <TableRow key={location.id}>
                                <TableCell>{location.id}</TableCell>
                                <TableCell>{location.type_name}</TableCell>
                                <TableCell>{location.category_name}</TableCell>
                                <TableCell>{`${location.coordinates.lat}, ${location.coordinates.lng}`}</TableCell>
                                <TableCell>{location.description}</TableCell>
                                <TableCell>
                                    {location.photo_url && (
                                        <a href={location.photo_url} target="_blank" rel="noopener noreferrer">
                                            View Photo
                                        </a>
                                    )}
                                </TableCell>
                                <TableCell>{location.work_hours}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            setEditOpen(true);
                                        }}
                                        style={{ marginRight: "5px" }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteLocation(location.id)}
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
                <DialogTitle>Add Location</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Type ID"
                        fullWidth
                        value={newLocation.type_id}
                        onChange={(e) => setNewLocation({ ...newLocation, type_id: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Category ID"
                        fullWidth
                        value={newLocation.category_id}
                        onChange={(e) => setNewLocation({ ...newLocation, category_id: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Latitude"
                        fullWidth
                        value={newLocation.coordinates.lat}
                        onChange={(e) =>
                            setNewLocation({
                                ...newLocation,
                                coordinates: { ...newLocation.coordinates, lat: e.target.value },
                            })
                        }
                        margin="normal"
                    />
                    <TextField
                        label="Longitude"
                        fullWidth
                        value={newLocation.coordinates.lng}
                        onChange={(e) =>
                            setNewLocation({
                                ...newLocation,
                                coordinates: { ...newLocation.coordinates, lng: e.target.value },
                            })
                        }
                        margin="normal"
                    />
                    <TextField
                        label="Photo URL"
                        fullWidth
                        value={newLocation.photo_url}
                        onChange={(e) => setNewLocation({ ...newLocation, photo_url: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        value={newLocation.description}
                        onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Work Hours"
                        fullWidth
                        value={newLocation.work_hours}
                        onChange={(e) => setNewLocation({ ...newLocation, work_hours: e.target.value })}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateLocation} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Location</DialogTitle>
                <DialogContent>
                    {selectedLocation && (
                        <>
                            <TextField
                                label="Type ID"
                                fullWidth
                                value={selectedLocation.type_id}
                                onChange={(e) =>
                                    setSelectedLocation({ ...selectedLocation, type_id: e.target.value })
                                }
                                margin="normal"
                            />
                            <TextField
                                label="Category ID"
                                fullWidth
                                value={selectedLocation.category_id}
                                onChange={(e) =>
                                    setSelectedLocation({ ...selectedLocation, category_id: e.target.value })
                                }
                                margin="normal"
                            />
                            <TextField
                                label="Latitude"
                                fullWidth
                                value={selectedLocation.coordinates.lat}
                                onChange={(e) =>
                                    setSelectedLocation({
                                        ...selectedLocation,
                                        coordinates: { ...selectedLocation.coordinates, lat: e.target.value },
                                    })
                                }
                                margin="normal"
                            />
                            <TextField
                                label="Longitude"
                                fullWidth
                                value={selectedLocation.coordinates.lng}
                                onChange={(e) =>
                                    setSelectedLocation({
                                        ...selectedLocation,
                                        coordinates: { ...selectedLocation.coordinates, lng: e.target.value },
                                    })
                                }
                                margin="normal"
                            />
                            <TextField
                                label="Photo URL"
                                fullWidth
                                value={selectedLocation.photo_url}
                                onChange={(e) =>
                                    setSelectedLocation({ ...selectedLocation, photo_url: e.target.value })
                                }
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                value={selectedLocation.description}
                                onChange={(e) =>
                                    setSelectedLocation({ ...selectedLocation, description: e.target.value })
                                }
                                margin="normal"
                            />
                            <TextField
                                label="Work Hours"
                                fullWidth
                                value={selectedLocation.work_hours}
                                onChange={(e) =>
                                    setSelectedLocation({ ...selectedLocation, work_hours: e.target.value })
                                }
                                margin="normal"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditLocation} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Locations;
