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
    Legend,
} from "chart.js";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FormControl, InputLabel } from "@material-ui/core";

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

    const totalUsers = user?.chart?.datasets?.[0]?.data || [];
    const inactiveUsers = user?.chart?.datasets?.[1]?.data || [];
    const newUsers = user?.chart?.datasets?.[3]?.data || [];

    const allValues = [...totalUsers, ...inactiveUsers, ...newUsers].map(Number);
    const maxValue = Math.max(...allValues, 1);
    const suggestedMax = maxValue < 10 ? maxValue + 2 : maxValue * 1.1;

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);
    return (
        <Box p={3}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                User Analytics Dashboard
            </Typography>

            {/* Month Filter */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <div style={{ width: "180px", marginBottom: "12px" }}>
                    <select
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "18px 12px",
                            borderRadius: "12px",
                            backgroundColor: "#fff",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                            border: "1px solid #d1d5db",
                            fontWeight: 600,
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        <option value="">Select Year</option>
                        {yearOptions.map((yr) => (
                            <option key={yr} value={yr}>
                                {yr}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ width: "180px", marginBottom: "12px" }}>
                    <select
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "18px 12px",
                            borderRadius: "12px",
                            backgroundColor: "#fff",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                            border: "1px solid #d1d5db",
                            fontWeight: 600,
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        <option value="">Select Month</option>
                        {months.map((yr) => (
                            <option key={yr} value={yr}>
                                {yr}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <WidgetsDropdown loading={loading} user={user} getUsers={getUsers} />

            {/* Line Chart */}
            <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>

                <Card >


                    <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                        Month-wise User Growth
                    </Typography>

                    <div>
                        {/* User Counts */}
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                marginBottom: "10px",
                                fontSize: "16px",
                                fontWeight: "600",
                            }}
                        >
                            <span style={{ color: "green" }}>
                                🟢 Active Users → {user?.monthActive || 0}
                            </span>
                            <span style={{ color: "red" }}>
                                🔴 Inactive Users → {user?.monthInactive || 0}
                            </span>
                            <span style={{ color: "#1E88E5", fontWeight: "600" }}>
                                🟦 New Users → {user?.newUsersCount || 0}
                            </span>
                        </div>

                        {/* Line Chart */}

                        <div
                            style={{ width: "100%", height: "350px", }}


                        >
                            <Line
                                data={{
                                    labels: user?.chart?.labels || [],
                                    datasets: [
                                        {
                                            label: "Total Users",
                                            data: totalUsers,
                                            borderWidth: 2,
                                            borderColor: "#4CAF50",
                                            backgroundColor: "rgba(76, 175, 80, 0.2)",
                                            tension: 0.4,
                                            pointRadius: 5,
                                        },
                                        {
                                            label: "Inactive Users",
                                            data: inactiveUsers,
                                            borderWidth: 2,
                                            borderColor: "#E53935",
                                            backgroundColor: "rgba(229, 57, 53, 0.2)",
                                            tension: 0.4,
                                            pointRadius: 5,
                                        },
                                        {
                                            label: "New Users",
                                            data: newUsers,
                                            borderWidth: 2,
                                            borderColor: "#1E88E5",
                                            backgroundColor: "rgba(30, 136, 229, 0.2)",
                                            tension: 0.4,
                                            pointRadius: 5,
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
                                            formatter: (v) => (v > 0 ? v : ""),
                                            font: { weight: "bold" },
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: maxValue < 10 ? 1 : undefined,
                                            },
                                            suggestedMax,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </Card>
                {/* Revenue Chat */}
                <Card >
                    <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: "5px" }}>
                        Month-wise User Revenue
                    </Typography>

                    <span style={{ color: "#2E7D32", fontWeight: 600 }}>
                        💰 User Revenue → ₹{Number(user?.totalRevenue).toLocaleString() || 0}
                    </span>

                    <div style={{ width: "100%", height: "350px" }}>
                        <Line
                            data={{
                                labels: chartData.labels,
                                datasets: [
                                    {
                                        label: `Revenue ₹${Number(
                                            user?.totalRevenue || 0
                                        ).toLocaleString("en-IN")}`,
                                        data: (user?.chart?.datasets[2]?.data || []).map(Number),
                                        borderWidth: 3,
                                        fontSize: "2rem",
                                        borderColor: "#4CAF50",
                                        backgroundColor: "rgba(76, 175, 80, 0.25)",
                                        tension: 0.4,
                                        pointBackgroundColor: "#1B5E20",
                                        pointRadius: 5,
                                        pointHoverRadius: 7,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (ctx) =>
                                                `₹${Number(ctx.raw).toLocaleString("en-IN")}`,
                                        },
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: { stepSize: 1 },

                                        suggestedMax: maxValue + 2,
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
                </Card>
                {/* <CardContent
                        sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
                    >
                    </CardContent> */}

            </Box>
        </Box >
    );
}
