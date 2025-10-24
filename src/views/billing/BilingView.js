import React, { useEffect, useState } from 'react';
import './BilingView.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isAutheticated } from 'src/auth';

const ViewBiling = () => {
    const [billingInvoiceView, setBillingInvoiceView] = useState([]);
    const [loading, setLoading] = useState(null);
    const { id } = useParams();

    const token = isAutheticated();

    const getBilingInvoiceView = async () => {
        try {
            setLoading(id);
            const res = await axios.get(`/api/billing/get/view/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("res", res);
            setBillingInvoiceView(res?.data);
        } catch (error) {
            const msg = error.response?.data?.message || "Internal Server Error";
            toast.error(msg);
            // setErrorMessage(msg);
        } finally {
            setLoading(null);
        }
    };
    useEffect(() => {
        getBilingInvoiceView(id);
    }, [id]);

    const invoicesWithGST = billingInvoiceView?.invoicesWithGST
    const referralEmails = billingInvoiceView?.viewReferral?.referralemail || [];
    console.log("billingInvoiceView", billingInvoiceView)

    const user = {
        username: 'mani',
        referralCode: 'X5PHAN',
        planName: 'N/A',
        planType: 'N/A',
        trialStart: 'Sep 4, 2025, 05:37:43 PM',
        trialEnd: 'Sep 14, 2025, 05:37:43 PM',
        subscriptionStart: 'N/A',
        subscriptionEnd: 'N/A',
        joiningDate: 'Sep 4, 2025, 05:37:43 PM',
        status: 'Active',
        keywords: 'No Keywords',
        mobile: 'N/A',
        ip: '152.59.201.35'
    };

    console.log("billingInvoiceView", billingInvoiceView)
    const referrals = [
        { name: 'Alice Brown', date: '2024-02-01' },
        { name: 'Bob Wilson', date: '2024-02-15' },
        { name: 'Carol Davis', date: '2024-03-01' },
        { name: 'David Miller', date: '2024-03-10' }
    ];

    return (
        <div className="userpage-container">
            <div className="userpage-actions">
                <button className="btn btn-outline">Go to All Users</button>
                <button className="btn btn-primary">User Invoices</button>
            </div>

            <div className="userpage-grid">
                <div className="card profile-card">
                    <div className="card-header dark">
                        <h3>User Profile</h3>
                    </div>
                    <div className="card-body profile-body">
                        <div className="profile-row"><div className="label">User Name:</div><div className="value">{invoicesWithGST?.userId?.name}</div></div>
                        {/* <div className="profile-row"><div className="label">Referral Code:</div><div className="value">{invoicesWithGST?.referralCode}</div></div> */}
                        <div className="profile-row"><div className="label">Plan Name:</div><div className="value">{invoicesWithGST?.PlanId?.name}</div></div>
                        <div className="profile-row"><div className="label">Plan Type:</div><div className="value">{invoicesWithGST?.PlanId?.Package}</div></div>

                        <div className="profile-row"><div className="label">Current Subscription Start Date:</div><div className="value">{invoicesWithGST?.plan_start_date}</div></div>
                        <div className="profile-row"><div className="label">Current Subscription End Date:</div><div className="value">{invoicesWithGST?.plan_expiry_date}</div></div>
                        <div className="profile-row"><div className="label">Joining Date:</div><div className="value">{invoicesWithGST?.createdAt}</div></div>
                        <div className="profile-row"><div className="label">Status:</div><div className="value">{invoicesWithGST?.status}</div></div>
                        {/* <div className="profile-row"><div className="label">Keywords:</div><div className="value">{invoicesWithGST.keywords}</div></div> */}
                        <div className="profile-row"><div className="label">Mobile Number:</div><div className="value">{invoicesWithGST?.userId?.phone}</div></div>
                        {/* <div className="profile-row"><div className="label">IP Address:</div><div className="value">{invoicesWithGST.ip}</div></div> */}
                    </div>
                </div>

                <div className="card referrals-card">
                    <div className="card-header green">
                        <h3>Referrals {referralEmails?.length}</h3>
                    </div>
                    <div className="card-body referrals-body">


                        <ul>
                            {referralEmails?.length > 0 ? (
                                referralEmails?.map((r, idx) => (
                                    <li key={r._id || idx} className="referral-row">
                                        <span className="ref-name">{r?.name}</span>
                                        <span className="ref-email">{r?.email}</span>
                                        <span className="ref-date">
                                            {new Date(r?.date).toLocaleDateString()}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li>No referral emails found</li>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBiling;
