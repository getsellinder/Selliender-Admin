import React, { useEffect, useMemo, useState } from "react";
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
// import {
//     Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend,
// } from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import ChartDataLabels from "chartjs-plugin-datalabels";



// ChartJS.register(
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend
// );

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels // ✅ register plugin
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


    useEffect(() => {
        getUsers(month, year);
    }, [month, year]);
    const chartData = useMemo(() => {
        if (!user?.chart) {
            return { labels: [], datasets: [] };
        }
        return {
            labels: [...user.chart.labels],
            datasets: user.chart.datasets.map((ds) => ({
                ...ds,
                data: [...ds.data],
            })),
        };
    }, [user]);

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
                    <CardContent sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                        <Typography variant="h6" fontWeight="bold">
                            Month-wise User Growth
                        </Typography>
                        {/* <Line data={user.chart} />  */}

                        <div>
                            {/* User Counts */}
                            <div style={{
                                display: "flex",
                                gap: "20px",
                                marginBottom: "10px",
                                fontSize: "16px",
                                fontWeight: "600"
                            }}>
                                <span style={{ color: "green" }}>🟢 Active Users → {user?.monthActive || 0}</span>
                                <span style={{ color: "red" }}>🔴 Inactive Users → {user?.monthInactive || 0}</span>
                            </div>

                            {/* Line Chart */}
                            <div style={{ width: "100%", height: "350px", marginBottom: "1rem" }}>
                                <Line
                                    data={{
                                        labels: chartData.labels,
                                        datasets: [
                                            {
                                                label: "Active Users",
                                                data: user?.chart?.datasets[0]?.data,
                                                borderWidth: 2,
                                                borderColor: "green",
                                                backgroundColor: "green",
                                            },
                                            {
                                                label: "Inactive Users",
                                                data: user?.chart?.datasets[1]?.data,
                                                borderWidth: 2,
                                                borderColor: "red",
                                                backgroundColor: "red",
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { position: "top" },
                                            datalabels: {
                                                display: true,
                                                align: "top",
                                                anchor: "end",
                                                font: { weight: "bold" },
                                                formatter: (value) => (value > 0 ? value : ""),
                                            },
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: { stepSize: 1 },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        {/* <div style={{ width: "100%", height: "350px" }}>
                            <Line
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: "top" } },
                                    scales: { y: { beginAtZero: true } },
                                }}
                            />
                        </div> */}
                        <div style={{ width: "100%", height: "350px" }}>
                            <Line
                                data={{
                                    labels: chartData.labels,
                                    datasets: [
                                        {
                                            label: "Revenue (₹)",
                                            data: user?.chart?.datasets[2]?.data || [],
                                            borderWidth: 3,
                                            borderColor: "#4CAF50", // Green premium color
                                            backgroundColor: "rgba(76, 175, 80, 0.25)", // light green fill
                                            tension: 0.4, // smooth curve
                                            pointBackgroundColor: "#1B5E20", // dark green dots
                                            pointRadius: 5,
                                            pointHoverRadius: 7,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: "#333",
                                                font: { size: 14, weight: "600" },
                                            },
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: (ctx) => `₹${ctx.raw.toLocaleString()}`,
                                            },
                                            backgroundColor: "#1e1e1e",
                                            titleColor: "#fff",
                                            bodyColor: "#fff",
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,

                                            ticks: {
                                                callback: (value) => `₹${value}`,
                                                color: "#555",
                                                font: { size: 12, weight: "500" },
                                            },
                                        },
                                        x: {
                                            ticks: {
                                                color: "#555",
                                                font: { size: 12 },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>

                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
