import React, { useEffect, useState } from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { isAutheticated } from "src/auth";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";


const WidgetsDropdown = () => {
  const token = isAutheticated();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/api/customer/dashboard/status", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("resp?.data", resp?.data)
      setUser(resp?.data);
    } catch (error) {
      let msg = error?.response?.data?.message;
      console.log("error.getUsers", error);
      console.log("error.getUsers.message", msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log("user", user)

  return (
    <>
      <h4>Users</h4>
      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={<>{loading ? <CircularProgress size={25} /> : user?.totalUsers}</>}
            title="Total Users"
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={<>{loading ? <CircularProgress size={25} /> : user?.activeUser}</>}
            title="Total Active Users"
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={<>{loading ? <CircularProgress size={25} /> : user?.inactiveUser}</>}
            title="Total InActive Users"
          />
        </CCol>
      </CRow>
    </>
  );
};

export default WidgetsDropdown;
