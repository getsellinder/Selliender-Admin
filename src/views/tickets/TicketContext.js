import axios from "axios";
import { isAutheticated } from "src/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const TicketContext = createContext();
export const TicketProvider = ({ children }) => {
    const userdata = JSON.parse(localStorage.getItem("userdetails"))
    let userId = userdata?.user?._id || null
    const [loading, setLoading] = useState(false)
    const [allticketes, setAllTicketes] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [status, setStatus] = useState("")
    const [PageLimit, setPageLimit] = useState(4);
    const [page, setCurrentPage] = useState(1)
    const [allmessages, setAllmessage] = useState([])

    const token = isAutheticated()

    // get all the tickets for admin

    const handleAllTickets = async (page = 1, limit = PageLimit, sInput = searchInput, ticketStatus = status) => {
        try {
            setLoading(true)
            let resp = await axios.get("/api/support/getAll/", {
                params: {
                    page,
                    limit,
                    searchInput: sInput,
                    status: ticketStatus,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = resp.data;
            setAllTicketes(result)
        } catch (error) {
            let message = error.response.data.message
            console.log("handleAllTickets.message", message)
            console.log("handleAllTickets.error", error)


        } finally {
            setLoading(false)
        }
    }
    const handleViewTicketMessages = async (id) => {
        try {
            setLoading(true)
            let resp = await axios.get(`/api/support/getOne/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = resp.data;
            setAllmessage(result)
        } catch (error) {
            let message = error.response.data.message
            console.log("handleViewTicket.message", message)
            console.log("handleViewTicket.error", error)


        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        handleAllTickets(1, PageLimit, searchInput, status);
    }, [])
    return (
        <TicketContext.Provider value={{
            allticketes, loading, setSearchInput, searchInput, status,
            setStatus, handleAllTickets, page, setCurrentPage, handleViewTicketMessages, allmessages, userId
        }}>{children}</TicketContext.Provider>
    )
}
export const useTicket = () => useContext(TicketContext)