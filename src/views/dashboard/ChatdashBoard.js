import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    MenuItem,
    Select,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import WidgetsDropdown from "../widgets/WidgetsDropdown";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function ChatdashBoard(props) {
    const { loading, user, setMonth, setYear, month, year, getUsers } = props;



    const months = [
        "All",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const usersChart = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Registered Users",
                data: [25, 40, 60, 80, 100, 140, 200, 250, 300, 350, 400, 450],
                borderWidth: 2,
            },
            {
                label: "Inactive Users",
                data: [5, 10, 15, 20, 25, 30, 40, 55, 70, 90, 110, 130],
                borderWidth: 2,
            },
        ],
    };
    useEffect(() => {
        if (month && year) {
            getUsers(month, year);
        }
    }, [month, year])
    console.log("month", month)
    console.log("year", year)

    return (
        <Box p={3}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                User Analytics Dashboard
            </Typography>

            {/* Month Filter */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <input
                        placeholder="Enter Year"
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            padding: "18px 12px",
                            backgroundColor: "#fff",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                            width: "180px",
                            fontWeight: 600,
                            fontSize: "14px",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#d1d5db",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#6366f1",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4f46e5",
                                borderWidth: "2px",
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        size="small"
                        sx={{
                            borderRadius: "12px",
                            padding: "6px 12px",
                            backgroundColor: "#fff",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                            width: "180px",
                            fontWeight: 600,
                            fontSize: "14px",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#d1d5db",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#6366f1",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4f46e5",
                                borderWidth: "2px",
                            },
                        }}
                    >
                        {months.map((m, i) => (
                            <MenuItem
                                key={i}
                                value={m}
                                sx={{
                                    fontWeight: 500,
                                    "&:hover": {
                                        backgroundColor: "#eef2ff",
                                    },
                                }}
                            >
                                {m}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </div>

            <WidgetsDropdown loading={loading} user={user} getUsers={getUsers} />

            {/* Line Chart */}
            <Box>
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            Month-wise User Growth
                        </Typography>
                        {/* <Line data={user.chart} />  */}
                        {loading ? "Loading" : <Line data={user?.chart || { labels: [], datasets: [] }} />}

                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
