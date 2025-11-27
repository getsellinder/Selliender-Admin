import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    CircularProgress,
} from "@mui/material";
import { useTicket } from "./TicketContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isAutheticated } from "src/auth";
import toast from "react-hot-toast";

const ChatUI = () => {
    const [message, setMessage] = useState("");
    const [msgloading, setMsgLoading] = useState(false);
    const [sentMessage, setSentMessage] = useState("");
    const token = isAutheticated();
    const { handleViewTicketMessages, allmessages, loading, userId } =
        useTicket();
    const { id } = useParams();

    let messages = allmessages?.messages;
    const receiverId = allmessages?.userId?._id;
    const handleMessages = async (id) => {
        const data = {
            receiverId: receiverId,
            message: sentMessage,
        };
        try {
            setMsgLoading(true);
            let resp = await axios.post(`/api/support/message/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = resp.data.message;
            toast.success(result || "message sent");
            handleViewTicketMessages(id);
            setSentMessage("");
        } catch (error) {
            let message = error.response.data.message;
            console.log("handleViewTicket.message", message);
            console.log("handleViewTicket.error", error);
        } finally {
            setMsgLoading(false);
        }
    };

    useEffect(() => {
        handleViewTicketMessages(id);
    }, [id]);

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
                <Typography>
                    <strong>Ticket Id:</strong>{" "}
                    {loading ? <CircularProgress size={15} /> : allmessages?.ticketId}
                </Typography>

                <Typography>
                    <strong>Subject:</strong>{" "}
                    {loading ? <CircularProgress size={15} /> : allmessages?.subject}
                </Typography>
                <Typography>
                    <strong>Description:</strong>{" "}
                    {loading ? <CircularProgress size={15} /> : allmessages?.description}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Created By:</strong>{" "}
                    {loading ? <CircularProgress size={15} /> : allmessages?.userId?.name}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Priority:</strong>{" "}
                    <span style={{ color: "red", fontWeight: 600 }}>
                        {loading ? <CircularProgress size={15} /> : allmessages?.priority}
                    </span>
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Category:</strong>
                    {loading ? <CircularProgress size={15} /> : allmessages?.category}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: "green", fontWeight: 600 }}>
                        {loading ? <CircularProgress size={15} /> : allmessages?.status}
                    </span>
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    <strong>Created At:</strong>
                    {loading ? <CircularProgress size={15} /> : allmessages?.createdAt}
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
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50%",
                        }}
                    >
                        <CircularProgress size={25} />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            flex: 1,
                            p: 3,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            height: "40%",
                        }}
                    >
                        {messages?.length === 0 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "50%",
                                }}
                            >
                                <Typography>Start Conversation</Typography>
                            </Box>
                        ) : (
                            messages?.map((msg, index) => {
                                const isSender = msg.receiverId._id === userId;

                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: isSender ? "flex-end" : "flex-start",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: "60%",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: isSender ? "flex-end" : "flex-start",
                                            }}
                                        >
                                            {/* NAME (ABOVE message bubble) */}
                                            <Typography
                                                sx={{ fontSize: "12px", color: "#6B7280", mb: 0.5 }}
                                            >
                                                {msg.senderName}
                                            </Typography>

                                            {/* MESSAGE BUBBLE */}
                                            <Box
                                                sx={{
                                                    background: isSender ? "#3B82F6" : "#F3F4F6",
                                                    color: isSender ? "white" : "black",
                                                    p: 2,
                                                    borderRadius: "12px",
                                                    wordBreak: "break-word",
                                                    maxWidth: "100%",
                                                }}
                                            >
                                                {msg.message}
                                            </Box>

                                            {/* TIME (BELOW message bubble) */}
                                            <Typography
                                                sx={{ fontSize: "10px", color: "#9CA3AF", mt: 0.5 }}
                                            >
                                                {msg.time || msg.createdAt}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                )}

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
                        value={sentMessage}
                        onChange={(e) => setSentMessage(e.target.value)}
                        sx={{
                            background: "#FFFFFF",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                        }}
                    />

                    <Button
                        onClick={() => handleMessages(allmessages._id)}
                        variant="contained"
                        sx={{
                            background: "#3B82F6",
                            textTransform: "none",
                            px: 4,
                            borderRadius: "8px",
                        }}
                    >
                        {msgloading ? <CircularProgress size={25} /> : "Send"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatUI;
