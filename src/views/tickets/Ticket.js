import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Select,
    Paper,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// DARK THEME EXACTLY LIKE YOUR SCREENSHOT
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#0E1525",
            paper: "#111927",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#A0AEC0",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
    },
});

// Custom styles matching screenshot
const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#0E1525",
        // backgroundColor: "#c6cbd7ff",
        minHeight: "100vh",
        color: "white",
    },
    input: {
        backgroundColor: "#1A2332",
        borderRadius: 8,
    },
    paper: {
        backgroundColor: "#111927",
        borderRadius: 12,
        border: "1px solid #2D3A4B",
    },
    tableHeader: {
        backgroundColor: "#1A2332",
    },
    messageButton: {
        color: "#4A90E2",
        borderColor: "#4A90E2",
        textTransform: "none",
        borderRadius: 8,
    },
};


const TicketingSystem = () => {
    const navigate = useNavigate()
    const initialTickets = [
        {
            id: 1,
            subject: "Dashboard related issue33",
            priority: "High",
            category: "Technical",
            business: "Impactvibes",
            createdAt: "Oct 29, 2025, 4:33 PM",
            ticketId: "1234567890",
            resolvedAt: "-",
            status: "Open",
        },
        {
            id: 2,
            subject: "hghgghgfhgf",
            priority: "Medium",
            category: "Technical",
            business: "Impactvibes",
            createdAt: "Oct 28, 2025, 6:11 PM",
            ticketId: "1234567890",
            resolvedAt: "-",
            status: "Open",
        },
        {
            id: 3,
            subject: "Dashboard related issue",
            priority: "High",
            category: "Technical",
            business: "N/A",
            createdAt: "Aug 21, 2025, 11:11 PM",
            ticketId: "1234567890",
            resolvedAt: "-",
            status: "In Progress",
        },
    ];

    const [tickets, setTickets] = useState(initialTickets);

    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const updateStatus = (id, newStatus) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
    };

    const filtered = tickets.filter((t) => {
        return (
            t.subject.toLowerCase().includes(search.toLowerCase()) &&
            (priority ? t.priority === priority : true) &&
            (category ? t.category === category : true) &&
            (status ? t.status === status : true)
        );
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div style={styles.container}>
                {/* HEADER */}
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                    Ticketing System
                </Typography>
                <Typography sx={{ mb: 3, color: "#A0AEC0" }}>
                    Log, track, and resolve issues reported by tenant admins.
                </Typography>

                {/* FILTERS */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search tickets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{ style: styles.input }}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            select
                            fullWidth
                            value={priority}
                            label="All Priorities"
                            onChange={(e) => setPriority(e.target.value)}
                            InputProps={{ style: styles.input }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="N/A">N/A</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            select
                            fullWidth
                            value={category}
                            label="All Categories"
                            onChange={(e) => setCategory(e.target.value)}
                            InputProps={{ style: styles.input }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Technical">Technical</MenuItem>
                            <MenuItem value="N/A">N/A</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            select
                            fullWidth
                            value={status}
                            label="All Statuses"
                            onChange={(e) => setStatus(e.target.value)}
                            InputProps={{ style: styles.input }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                <Typography sx={{ mb: 1, color: "#A0AEC0" }}>
                    Showing {filtered.length} tickets
                </Typography>

                {/* TABLE */}
                <TableContainer component={Paper} style={styles.paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={styles.tableHeader}>
                                {[
                                    "",
                                    "Created At",
                                    "Ticket ID",
                                    "Subject",
                                    "Priority",
                                    "Category",


                                    "Resolved By",
                                    "Status",
                                    "Messages",
                                ].map((head) => (
                                    <TableCell key={head} sx={{ color: "white", fontWeight: 600 }}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filtered.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.createdAt}</TableCell>
                                    <TableCell>{row.ticketId}</TableCell>
                                    <TableCell>{row.subject}</TableCell>
                                    <TableCell>{row.priority}</TableCell>
                                    <TableCell>{row.category}</TableCell>


                                    <TableCell>{row.resolvedAt}</TableCell>

                                    <TableCell>
                                        <Select
                                            value={row.status}
                                            onChange={(e) => updateStatus(row.id, e.target.value)}
                                            size="small"
                                            sx={{
                                                backgroundColor: "#1A2332",
                                                borderRadius: 1,
                                                width: "120px",
                                            }}
                                        >
                                            <MenuItem value="Open">Open</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Closed">Closed</MenuItem>
                                        </Select>
                                    </TableCell>

                                    <TableCell>
                                        <Button variant="outlined" style={styles.messageButton} onClick={() => navigate(`/tickets/view/message/:id`)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        </ThemeProvider>
    );
};

export default TicketingSystem;
