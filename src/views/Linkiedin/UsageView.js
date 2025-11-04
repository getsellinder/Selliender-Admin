import React, { useEffect, useState } from "react";
import "../billing/BilingView.css";
import { useNavigate, useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import { useLinkedin } from "./LinkedenContext";

const UsageView = () => {
    const { linkedinPlanData, handleLinkedinProfileDetails, linkedinviewLoading } = useLinkedin()

    const [InvoiceError, setInvoiceError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();



    const content = linkedinPlanData?.LinkedinContentId
    useEffect(() => {
        handleLinkedinProfileDetails(id)
    }, [id])

    return (
        <div className="userpage-container">
            <div className="userpage-actions">
                <button
                    className="btn btn-outline"
                    onClick={() => navigate("/Usage")}
                >
                    Go to All Usage
                </button>

            </div>

            <div className="userpage-grid">
                <div className="card profile-card">
                    <div className="card-header dark">
                        <h3>User Leads</h3>
                    </div>
                    {linkedinviewLoading ? (
                        <div className="text-center py-5">
                            <CircularProgress />
                        </div>
                    ) : InvoiceError ? (
                        <span>{InvoiceError}</span>
                    ) : (
                        <div className="card-body profile-body">
                            <div className="profile-row">
                                <div className="label">User Name:</div>
                                <div className="value">{linkedinPlanData?.LinkedinContentId?.name || "test"}</div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Email:</div>
                                <div className="value">{linkedinPlanData?.email || "test@gmail.com"}</div>
                            </div>
                            <div className="profile-row">
                                <div className="label">Location:</div>
                                <div className="value">  {content?.location}</div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Title:</div>
                                <div className="value"> {content?.title}</div>
                            </div>
                            <div className="profile-row">
                                <div className="label">Posts:</div>
                                <div className="value">{content?.posts.length}</div>
                            </div>

                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default UsageView;
