import React, { useEffect, useState } from "react";
import "../order/Order.css";
import { useCustomer } from "../CustomerSupport/CustomerContext";
import { useNavigate, useParams } from "react-router-dom";
import { isAutheticated } from "src/auth";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const UserInvoiceTable = () => {
    const { name, id } = useParams();
    const token = isAutheticated();
    const [search, setSearch] = useState();
    const { appdetails } = useCustomer();

    const [totalpages, setTotalPages] = useState();
    const [itemPerPage, setItemPerPage] = useState();

    const [currentPage, setCurrentPage] = useState();
    const [errormsge, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState([]);

    const navigate = useNavigate();

    const tablerow = [
        "#",
        "USER",
        "AMOUNT",
        "START",
        "EXPIRY",
        "PLAN",
        "TYPE",
        "STATUS",
        "INVOICE",
    ];
    const getInvoices = async (
        searchName = search,
        page = 1,
        limit = itemPerPage
    ) => {
        try {
            setLoading(true);
            const params = { limit, page };
            if (searchName && searchName.trim() !== "") {
                params.name = searchName.trim();
            }

            const res = await axios.get(`/api/package/all/invoice/${id}`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });

            setOrder(res?.data);
            setTotalPages(res.data.totalPages);
            // setCurrentPage(res.data.currentPage);
            setItemPerPage(limit);
        } catch (error) {
            const msg = error.response?.data?.message || "Internal Server Error";
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInvoices(search, currentPage, itemPerPage);
    }, [search, currentPage, itemPerPage]); // ✅ add dependencies

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    const handleNext = () => {
        if (currentPage < totalpages) setCurrentPage((prev) => prev + 1);
    };
    console.log("order invoice table", order);

    return (
        <div className="orders-page">
            <div className="orders-header-bar">
                <input
                    className="orders-search"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="orders-table-card">
                <div className="orders-table-title">
                    <span className="orders-table-icon">📦</span>
                    <span>{name} Invoices</span>
                </div>

                <table className="orders-table">
                    <thead className="border-y border-white">
                        <tr className="divide-x divide-white">
                            {tablerow.map((val) => (
                                <th className="border-white px-3 py-2">{val}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="text-center py-10">
                                    <div className="flex justify-center items-center">
                                        <CircularProgress
                                            size={50}
                                            thickness={5}
                                            style={{ color: "#1976d2" }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ) : errormsge ? (
                            <tr><td colSpan={9} className="text-center py-3" style={{ fontWeight: "600", fontSize: "1rem" }}>{errormsge}</td></tr>
                        ) : (
                            order?.map((o, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{o.userId.name}</td>

                                    <td>{o.Amount === "0" ? 0 : `₹${o.Amount}`}</td>
                                    <td>{o.plan_start_date}</td>
                                    <td>{o.plan_expiry_date}</td>
                                    <td>{o.PlanId.Package}</td>
                                    <td>
                                        <span className={`orders-pill orders-pill-type`}>
                                            {o.duration}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`orders-pill  ${o.invoice_status === "status"
                                                ? "orders-pill-status-fail "
                                                : "orders-pill-status-success"
                                                }`}
                                        >
                                            {o.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="orders-view-btn"
                                            onClick={() =>
                                                navigate(`/${o.userId.name}/invoice/${o._id}`)
                                            }
                                        >
                                            <span className="orders-view-icon">📄</span> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="orders-pagination">
                    <button
                        className="orders-page-btn"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalpages }, (_, i) => {
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

            <footer className="orders-footer">
                {appdetails.map((val, index) => {
                    return (
                        <a
                            href="https://neonflake.com"
                            target="_blank"
                            rel="noreferrer"
                            key={index}
                        >
                            {val.copyrightMessage}
                        </a>
                    );
                })}
            </footer>
        </div>
    );
};

export default UserInvoiceTable;
