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
    CircularProgress,
    Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTicket } from "./TicketContext";
import axios from "axios";
import toast from "react-hot-toast";
import { isAutheticated } from "src/auth";
import { Box } from "@material-ui/core";

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#FFFFFF", // WHITE BG
        minHeight: "100vh",
        color: "black",
    },
    input: {
        backgroundColor: "#FFFFFF", // WHITE INPUTS
        borderRadius: 8,
    },
    paper: {
        backgroundColor: "#FFFFFF", // WHITE TABLE
        borderRadius: 12,
        border: "1px solid #E0E0E0",
    },
    tableHeader: {
        backgroundColor: "#F5F5F5", // LIGHT GREY HEADER
    },
    messageButton: {
        color: "#2196F3",
        borderColor: "#2196F3",
        textTransform: "none",
        borderRadius: 8,
    },
};

const TicketingSystem = () => {
    const [statuschange, setStatusChange] = useState("")
    const [statusLoading, setStatusLoading] = useState(null)
    const navigate = useNavigate();
    const token = isAutheticated()

    const { allticketes, loading, setSearchInput, searchInput, status, setStatus, handleAllTickets, page,
        setCurrentPage, PageLimit } = useTicket();
    let ticketsdata = allticketes.data
    console.log("allticketes", ticketsdata)

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




    const filtered = tickets.filter((t) => {
        return (
            t.subject.toLowerCase().includes(search.toLowerCase()) &&
            (priority ? t.priority === priority : true) &&
            (category ? t.category === category : true) &&
            (status ? t.status === status : true)
        );
    });
    const handlestatus = async (id, newStatus) => {
        // ticket id i am passing heare
        let data = {
            status: newStatus
        }
        try {
            setStatusLoading(id)
            const resp = await axios.put(
                `/api/support/update/status/${id}`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const message = resp?.data?.response
            handleAllTickets(1, PageLimit, searchInput, status);
            toast.success(message || "Updated Successfully")

        } catch (error) {
            let msg = error?.response?.data?.error
            console.log("msg", msg)
            console.log("handlestatus", handlestatus)
        } finally {
            setStatusLoading(null)
        }
    }

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                Ticketing System
            </Typography>
            <Typography sx={{ mb: 3, color: "#555" }}>
                Log, track, and resolve issues reported by tenant admins.
            </Typography>

            {/* FILTERS */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        placeholder="Search tickets..."
                        value={searchInput}
                        onChange={(e) => {
                            const value = e.target.value
                            setSearchInput(value)
                            handleAllTickets(1, PageLimit, value, status);
                        }}
                        InputProps={{ style: styles.input }}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <TextField
                        select
                        fullWidth
                        value={status}
                        label="All Statuses"
                        onChange={(e) => {
                            let val = e.target.value
                            setStatus(val)
                            handleAllTickets(1, PageLimit, searchInput, val);
                        }}
                        InputProps={{ style: styles.input }}
                    >
                        <MenuItem value="">All</MenuItem>



                        <MenuItem value="OPEN">Open</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="CLOSED">Closed</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            <Typography sx={{ mb: 1, color: "#555" }}>
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
                                <TableCell key={head} sx={{ fontWeight: 600 }}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={10}   // number of columns in your table
                                    align="center"
                                    sx={{
                                        height: "150px",
                                        textAlign: "center",
                                        borderBottom: "none",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                        }}
                                    >
                                        <CircularProgress size={35} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            ticketsdata?.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row?.createdAt}</TableCell>
                                    <TableCell>{row?.ticketId}</TableCell>
                                    <TableCell>{row?.subject}</TableCell>
                                    <TableCell>{row?.category}</TableCell>
                                    <TableCell>{row?.priority}</TableCell>

                                    <TableCell>{row?.resolvedAt || "-"}</TableCell>

                                    <TableCell>
                                        <Select
                                            value={row.status}
                                            onChange={(e) => handlestatus(row._id, e.target.value)}
                                            size="small"
                                            sx={{
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: 1,
                                                width: "120px",
                                                border: "1px solid #DDD",
                                            }}


                                        >
                                            <MenuItem value="OPEN">Open</MenuItem>
                                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                            <MenuItem value="CLOSED">Closed</MenuItem>
                                        </Select>
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            style={styles.messageButton}
                                            onClick={() => navigate(`/tickets/view/message/${row._id}`)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination sx={{ textAlign: "end", marginTop: "1rem" }}
                count={allticketes.totalPages}
                page={page}
                onChange={(e, value) => {
                    setCurrentPage(value);
                    handleAllTickets(page, PageLimit || 10, value, status);
                }}
                color="primary"
                shape="rounded"
            />
        </div>
    );
};

export default TicketingSystem;
