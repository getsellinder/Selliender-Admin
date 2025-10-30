import React, { useEffect, useState } from "react";
import "./UsersList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAutheticated } from "src/auth";
import { CircularProgress } from "@material-ui/core";
import toast from "react-hot-toast";
import { useBilling } from "../billing/billingContext";

const sampleUsers = [
    {
        id: 1,
        name: "mani",
        joined: "Sep 4, 2025, 05:37:43 PM",
        package: "N/A",
        keywords: 0,
        status: "Active",
    },
    {
        id: 2,
        name: "Manoj Reddy",
        joined: "Sep 4, 2025, 03:51:21 PM",
        package: "N/A",
        keywords: 0,
        status: "Active",
    },
    {
        id: 3,
        name: "Debasish",
        joined: "Sep 4, 2025, 01:30:32 PM",
        package: "Starter",
        keywords: 0,
        status: "Active",
    },
    {
        id: 4,
        name: "manoj",
        joined: "Sep 4, 2025, 01:01:23 PM",
        package: "N/A",
        keywords: 0,
        status: "Active",
    },
    {
        id: 5,
        name: "SURJEET",
        joined: "Sep 4, 2025, 11:52:02 AM",
        package: "N/A",
        keywords: 0,
        status: "Active",
    },
    {
        id: 6,
        name: "manoj reddy",
        joined: "Sep 4, 2025, 11:50:34 AM",
        package: "N/A",
        keywords: 0,
        status: "Active",
    },
];

const UsersList = () => {


    const tableheading = [
        "ID",
        "NAME",
        "JOINED",
        "PACKAGE",
        // "EMAIL",
        "LIMIT",
        "STATUS",

        "ACTION",

    ];



    const token = isAutheticated();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toggleLoading, setToggleLoading] = useState(null);


    const [success, setSuccess] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState();
    const [totalpages, setTotalPages] = useState();
    const [showData, setShowData] = useState([]);

    const [name, setName] = useState("");
    const limit = 10;


    // const getUsers = async (
    //     searchName = name,
    //     page = currentPage,

    // ) => {
    //     axios
    //         .get(`/api/customer/customers`, {
    //             params: {
    //                 limit,
    //                 page,
    //                 name: searchName,
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             setShowData(res?.data);
    //             setTotalPages(res?.data?.totalPages);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             swal({
    //                 title: error,
    //                 text: "please login to access the resource or refresh the page  ",
    //                 icon: "error",
    //                 button: "Retry",
    //                 dangerMode: true,
    //             });
    //             setLoading(false);
    //         });
    // };
    console.log("totalpages", totalpages)

    const getUsers = async (searchName = name, page = currentPage) => {
        try {
            setLoading(true)
            let resp = await axios.get(`/api/customer/customers`, {
                params: {
                    limit,
                    page,
                    name: searchName,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setShowData(resp?.data);
            setTotalPages(resp?.data?.totalPages);

        } catch (error) {
            let res = error.response.data.message
            console.log("error", error)

        } finally {
            setLoading(false)
        }
    }
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalpages) setCurrentPage(prev => prev + 1);
    };

    useEffect(() => {
        getUsers();
    }, [currentPage]);

    const handleToggle = async (id) => {
        try {
            setToggleLoading(true);
            const response = await axios.put(`/api/customer/status/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let msg = response.data.message;
            await getUsers()
            toast.success(msg);
        } catch (error) {
            console.log("error in handleToggle", error)
            let msg = error.data.response.message;
            toast.error(msg || "Internal Server Error");
        } finally {
            setToggleLoading(false);
        }
    };


    return (
        <div className="users-page">
            <div className="cards-row">
                <div className="stat-card blue">
                    <div className="stat-icon">📈</div>
                    <div className="stat-body">
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value">{loading ? <CircularProgress /> : showData?.totalUsers}</div>
                    </div>
                </div>
                <div className="stat-card green">
                    <div className="stat-icon">👤</div>
                    <div className="stat-body">
                        <div className="stat-title">Active Users</div>
                        <div className="stat-value">{loading ? <CircularProgress /> : showData?.activeUsers}</div>
                    </div>
                </div>
                <div className="stat-card pink">
                    <div className="stat-icon">👁️</div>
                    <div className="stat-body">
                        <div className="stat-title">Suspended Users</div>
                        <div className="stat-value">{loading ? <CircularProgress /> : showData?.InactiveUsers}</div>
                    </div>
                </div>


            </div>

            <div className="table-toolbar">
                <input
                    className="search-input"
                    placeholder="Search users"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        getUsers(name, 1, itemPerPage);
                    }}
                />
            </div>

            <div className="users-table-wrap">
                <table className="users-table">
                    <thead>
                        <tr>
                            {tableheading.map((item) => (
                                <th className="text-center">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr>
                            <td colSpan="9" className="text-center py-10">
                                <div className="flex justify-center items-center">
                                    <CircularProgress
                                        size={50}
                                        thickness={5}
                                        style={{ color: "#1976d2" }}
                                    />
                                </div>
                            </td>
                        </tr> : showData?.result?.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user?.name}</td>
                                <td>{user?.createdAt}</td>
                                <td>
                                    {user?.PlanId === null
                                        ? "not_taken"
                                        : user?.PlanId?.Package}
                                </td>
                                {/* <td className="text-center">{user?.email}</td> */}
                                <td className="text-center">{user?.SearchLimit}</td>
                                <td>{user?.status}</td>
                                <td className="actions">
                                    <button className="btn-action"
                                        onClick={() => navigate(`/Billing/view/${user?._id}`)}>View</button>

                                    <button className="btn-action outline"
                                        onClick={() => navigate(`/Billing/invoice/${user?._id}`)}>Invoices</button>
                                    <button
                                        onClick={() => handleToggle(user?._id)}
                                        className={`btn-action-toggle outline cursor-pointer ${user?.status === "Active" ? "bg-red" : "bg-green"
                                            } `}
                                    >
                                        {toggleLoading === user.id ? (
                                            <CircularProgress size={25} />
                                        ) : user?.status === "Active" ? (
                                            "Suspend"
                                        ) : (
                                            "Activate"
                                        )}
                                    </button>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className="orders-pagination">
                <button
                    className="orders-page-btn"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>

                {Array.from({ length: showData.totalPages }, (_, i) => {
                    const isActive = currentPage === i + 1;
                    return (
                        <button
                            key={i + 1}
                            className={
                                isActive
                                    ? "orders-page-num-active"
                                    : "orders-page-num-inactive"
                            }
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    );
                })}

                <button
                    className="orders-page-btn"
                    onClick={handleNext}
                    disabled={currentPage === totalpages}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default UsersList;
