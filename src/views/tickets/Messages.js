import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
} from "@mui/material";

const ChatUI = () => {
    const [message, setMessage] = useState("");

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                p: 3,
                background: "#F7F9FC",
                minHeight: "100vh",
            }}
        >
            {/* LEFT SIDE - TICKET DETAILS */}
            <Paper
                elevation={0}
                sx={{
                    width: "300px",
                    p: 3,
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Ticket Details
                </Typography>

                <Typography><strong>Title:</strong> Payment Credit Rewards Issue</Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Created By:</strong> John
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Priority:</strong>{" "}
                    <span style={{ color: "red", fontWeight: 600 }}>Critical</span>
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Category:</strong> Billing
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: "green", fontWeight: 600 }}>Open</span>
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Created At:</strong> Dec 4, 2025
                </Typography>
            </Paper>

            {/* RIGHT SIDE - MESSAGES */}
            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    p: 0,
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #E5E7EB" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Messages
                    </Typography>
                </Box>

                {/* CHAT BOX */}
                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {/* LEFT MESSAGE */}
                    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <Avatar sx={{ bgcolor: "#D1D5DB" }} />

                        <Box>
                            <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
                                John • just now
                            </Typography>
                            <Box
                                sx={{
                                    background: "#F3F4F6",
                                    p: 2,
                                    mt: 1,
                                    borderRadius: "12px",
                                    maxWidth: "350px",
                                }}
                            >
                                Dear Jack,
                                <br />
                                We do accept credit cards for mortgage payment.
                            </Box>
                        </Box>
                    </Box>

                    {/* RIGHT MESSAGE */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box sx={{ textAlign: "right" }}>
                            <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
                                Jack Smith • 2 mins ago
                            </Typography>

                            <Box
                                sx={{
                                    background: "#3B82F6",
                                    color: "white",
                                    p: 2,
                                    mt: 1,
                                    borderRadius: "12px",
                                    maxWidth: "350px",
                                    ml: "auto",
                                }}
                            >
                                Will I earn credit rewards if I pay the instalment using my
                                credit card?
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* MESSAGE INPUT BAR */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: "1px solid #E5E7EB",
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{
                            background: "#FFFFFF",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        sx={{
                            background: "#3B82F6",
                            textTransform: "none",
                            px: 4,
                            borderRadius: "8px",
                        }}
                    >
                        Send
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatUI;
