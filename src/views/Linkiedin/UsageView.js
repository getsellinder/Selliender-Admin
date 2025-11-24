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
    useEffect(() => {
        handleLinkedinProfileDetails(id);
    }, [id]);
    const profile = linkedinPlanData?.profiles;
    const disc = profile?.personality?.discBreakdown;
    const summary = profile?.quicksummary;
    const metrics = profile?.actionableMetrics;
    const steps = profile?.communicationStrategy?.recommendedSequence;
    const talkingPoints = profile?.talkingPoints;

    console.log("linkedinPlanData.....................", linkedinPlanData);
    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    {summary?.who}
                </h1>
                <p className="text-gray-600 mt-1">
                    personality?: <strong>{summary?.primaryDISC}</strong> • Preferred Tone:{" "}
                    <strong>{summary?.preferredTone}</strong>
                </p>
            </div>

            {/* DISC Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-3">DISC Breakdown</h2>
                    <div className="space-y-2">
                        {disc?.map((d) => (
                            <div
                                key={d?.abbreviation}
                                className="flex justify-between border-b pb-2"
                            >
                                <span className="font-semibold">{d.name} ({d?.abbreviation})</span>
                                <span>{d.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Traits */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-3">Key personality? Traits</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {profile?.personality?.keyTraits?.map((trait, idx) => (
                            <li key={idx}>{trait}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Primary & Secondary Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-700">Primary Style</h3>
                    <p className="mt-2 text-gray-700">
                        {profile?.personality?.primary.description}
                    </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-yellow-700">Secondary Style</h3>
                    <p className="mt-2 text-gray-700">
                        {profile?.personality?.secondary?.description}
                    </p>
                </div>
            </div>

            {/* Talking Points */}
            <div className="bg-white shadow-md p-6 rounded-xl mt-8">
                <h2 className="text-xl font-bold mb-4">Top Talking Points</h2>
                <div className="space-y-4">
                    {talkingPoints?.map((tp, index) => (
                        <div key={index} className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-bold text-gray-800">{tp.topic}</h3>
                            <p className="text-gray-700 mt-1"><strong>Why:</strong> {tp.why}</p>
                            <p className="text-gray-700 mt-1"><strong>What to Say:</strong> {tp.whatToSay}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white shadow-md p-6 rounded-xl mt-8">
                <h2 className="text-xl font-bold mb-4">Engagement Metrics</h2>
                <ul className="space-y-2">
                    {metrics?.followUpCadence?.map((step, index) => (
                        <li key={index} className="border p-3 rounded-lg bg-gray-50">
                            {step}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Communication Steps */}
            <div className="bg-white shadow-md p-6 rounded-xl mt-8 mb-10">
                <h2 className="text-xl font-bold mb-4">Recommended Communication Sequence</h2>
                <div className="space-y-3">
                    {steps?.map((s, idx) => (
                        <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                            <p><strong>Day {s?.day}</strong> — {s?.channel}</p>
                            <p className="text-gray-700 mt-1">{s?.objective}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    );
};

export default UsageView;
