import React, { lazy } from "react";
import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { isAutheticated } from "../../auth.js";
import ChatdashBoard from "./ChatdashBoard.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const Dashboard = () => {

  const token = isAutheticated();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")


  const getUsers = async (month, year) => {
    try {
      setLoading(true);
      const resp = await axios.get("/api/customer/dashboard/status", {
        params: { year, month },
        headers: { authorization: `Bearer ${token}`, }

      });
      console.log("resp?.data", resp?.data)
      // setUser(resp?.data);
      setUser(JSON.parse(JSON.stringify(resp?.data)))
    } catch (error) {
      let msg = error?.response?.data?.message;
      console.log("error.getUsers", error);
      console.log("error.getUsers.message", msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <ChatdashBoard loading={loading} user={user} setMonth={setMonth} setYear={setYear} month={month} year={year}
        getUsers={getUsers} />
    </>
  );
};

export default Dashboard;
