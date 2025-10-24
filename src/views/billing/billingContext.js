import axios from "axios";
import toast from "react-hot-toast";

import { isAutheticated } from "src/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const BillingContext = createContext()


export const BillingProvider = ({ children }) => {
    const [billingInvoice, setBillingInvoice] = useState([])
    const [loading, setLoading] = useState(null)


    const token = isAutheticated();

    const getBilingInvoice = async (id) => {
        try {
            setLoading(id);
            const res = await axios.get(`/api/billing/get/invoice/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("res", res)
            setBillingInvoice(res?.data);
        } catch (error) {
            const msg = error.response?.data?.message || "Internal Server Error";
            toast.error(msg)
            // setErrorMessage(msg);
        } finally {
            setLoading(null);
        }
    };

    console.log("billingInvoice00000000000000", billingInvoice)

    return (
        <BillingContext.Provider value={{ billingInvoice, getBilingInvoice }}>
            {children}
        </BillingContext.Provider>
    )
}

export const useBilling = () => useContext(BillingContext)