import React, { useEffect, useState } from "react";
import "../billing/BilingView.css";
import { useNavigate, useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import { useLinkedin } from "./LinkedenContext";

const UsageView = () => {
    const {
        linkedinPlanData,
        handleLinkedinProfileDetails,
        linkedinviewLoading,
    } = useLinkedin();

    const [InvoiceError, setInvoiceError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && handleLinkedinProfileDetails) handleLinkedinProfileDetails(id);
    }, [id]);

    const display = linkedinPlanData?.analysis;

    const content =
        linkedinPlanData?.LinkedinContentId || display?.linkedinContentId || {};
    const handleDownloadPdf = async () => {
        try {
        } catch (err) {
            console.error("PDF generation failed", err);
            alert(
                "PDF generation requires the `jspdf` package. Run `npm install jspdf` in your project and reload."
            );
        }
    };

    console.log("linkedinPlanData", linkedinPlanData);
    return (
        <div className="userpage-container">
            <div className="userpage-actions">
                <button className="btn btn-outline" onClick={() => navigate("/Usage")}>
                    Go to All Usage
                </button>
                <button className="btn btn-primary" onClick={handleDownloadPdf}>
                    Download PDF
                </button>
            </div>

            <div className="userpage-grid">
                <div className="card profile-card">
                    <div className="card-header dark">
                        <h3>User Analysis</h3>
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
                                <div className="value">
                                    {content?.name || display?.linkedinContentId?.name || "N/A"}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Title:</div>
                                <div className="value">
                                    {content?.title || display?.linkedinContentId?.title || "N/A"}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Location:</div>
                                <div className="value">
                                    {content?.location ||
                                        display?.linkedinContentId?.location ||
                                        "N/A"}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Profile URL:</div>
                                <div className="value">
                                    {display?.linkedinContentId?.LinkedinURL || "N/A"}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">DISC (I/D/S/C):</div>
                                <div className="value">
                                    {(display?.personality?.discBreakdown || []).map((d) => (
                                        <div key={d.abbreviation}>
                                            {d.abbreviation} - {d.name}: {d.percentage}%
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Primary Style:</div>
                                <div className="value">
                                    {display?.personality?.primaryStyle}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Secondary Style:</div>
                                <div className="value">
                                    {display?.personality?.secondaryStyle}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Product Price:</div>
                                <div className="value">
                                    {display?.productPrice ? `₹${display.productPrice}` : "N/A"}
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Top Talking Points:</div>
                                <div className="value">
                                    <ul>
                                        {(display?.talkingPoints || []).map((t, idx) => (
                                            <li key={idx}>
                                                <strong>{t.topic}:</strong> {t.whatToSay || t.why}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="profile-row">
                                <div className="label">Next Actions:</div>
                                <div className="value">
                                    <ol>
                                        {(display?.nextActions || []).map((n, idx) => (
                                            <li
                                                key={idx}
                                            >{`Day ${n.day}: ${n.action} (${n.channel})`}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsageView;
