import React, { useEffect, useState } from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { isAutheticated } from "src/auth";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";


const WidgetsDropdown = (props) => {

  const { loading, user, getUsers } = props
  console.log("WidgetsDropdown", user)

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <>

      <CRow>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA style={{ fontWeight: "600" }}
            className=""
            color="primary"
            value={<>{loading ? <CircularProgress size={25} /> : user?.totalUsers}</>}
            title="Total Users"
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA style={{ fontWeight: "600" }}
            className=" "
            color="success"
            value={<>{loading ? <CircularProgress size={25} /> : user?.activeUser}</>}
            title="Total Active Users"
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA style={{ fontWeight: "600" }}
            className=""
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
