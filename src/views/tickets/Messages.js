import React, { useEffect, useRef, useState } from "react";
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
    const messagesEndRef = useRef(null)

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
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

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
                    display: "flex",
                    flexDirection: "column",
                    // Pick a height that fits your layout. You can change this to '100%' if parent has fixed height.
                    height: 550,
                    p: 0,
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    width: "100%"
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #E5E7EB" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Messages
                    </Typography>
                </Box>

                {/* CHAT BOX (scrollable) */}
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            minHeight: 200,
                        }}
                    >
                        <CircularProgress size={25} />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            flex: 1, // key: take remaining vertical space
                            p: 3,
                            overflowY: "auto", // key: messages scroll here only
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {messages?.length === 0 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <Typography>Start Conversation</Typography>
                            </Box>
                        ) : (
                            messages?.map((msg, index) => {
                                const isSender = msg.senderId?._id === userId;
                                return (
                                    <Box
                                        key={msg._id || index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: isSender ? "flex-end" : "flex-start",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "60%",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: isSender ? "flex-end" : "flex-start",
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "12px", color: "#6B7280", mb: 0.5 }}>
                                                {isSender ? "You" : msg.senderName}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    background: isSender ? "#3B82F6" : "#F3F4F6",
                                                    color: isSender ? "white" : "black",
                                                    p: 2,
                                                    borderRadius: "12px",
                                                    wordBreak: "break-word",
                                                    width: "100%",
                                                }}
                                            >
                                                {msg.message}
                                            </Box>

                                            <Typography sx={{ fontSize: "10px", color: "#9CA3AF", mt: 0.5 }}>
                                                {msg.time || msg.createdAt}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}

                        {/* invisible anchor to scroll to */}
                        <div ref={messagesEndRef} />
                    </Box>
                )}

                {/* MESSAGE INPUT BAR (always visible; not scrollable) */}
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleMessages(allmessages._id);
                            }
                        }}
                        sx={{
                            background: "#FFFFFF",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                        }}
                        multiline
                        minRows={1}
                        maxRows={4}
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
