import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { isAutheticated } from "src/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const LinkedinContext = createContext();

export const LinkedinProvider = ({ children }) => {
  const token = isAutheticated();

  const [linkedinLoading, setLinkedinLoading] = useState(false);

  const [packagePrice, setPackagePrice] = useState("");

  const [anaysicResult, setAllanaysicResult] = useState([]);
  const [linkedindelLoading, setLinkedinDelLoading] = useState(null);
  const [linkedinviewLoading, setLinkedinViewLoading] = useState(null);
  const [linkedinPlanData, setSingleLinkedinData] = useState([]);

  const [userSearchingHistory, setUserSearchingHistory] = useState([]);
  const [linkedinId, setLinkedinId] = useState(() => {
    return localStorage.getItem("linkedinId") || ""
  })
  const [page, setPage] = useState(1);
  const [PageLimit, setPageLimit] = useState(10);
  const [name, setName] = useState("");


  // const getAllAnalysis = async (
  //   page = 1,
  //   limit = PageLimit,
  //   name = name,

  // ) => {
  //   try {
  //     setLinkedinLoading(true);
  //     const res = await axios.get("/api/linked/analysis", {
  //       params: {
  //         page,
  //         limit,
  //         name,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const result = res.data;
  //     setAllanaysicResult(result);
  //   } catch (error) {
  //     let message = error.response.data.message;
  //     toast.error(message);
  //   } finally {
  //     setLinkedinLoading(false);
  //   }
  // };


  const getAllAnalysis = async (
    pageNum = 1,
    limitNum = PageLimit,
    searchName = name
  ) => {
    try {
      setLinkedinLoading(true);

      const encodedName = encodeURIComponent(searchName || "");

      const res = await axios.get("/api/linked/analysis", {
        params: {
          page: pageNum,
          limit: limitNum,
          name: encodedName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllanaysicResult(res.data);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLinkedinLoading(false);
    }
  };



  const getAllAnalysisSearchHistoryTable = async (
    page = 1,
    limit = PageLimit,
    name,
    userId
  ) => {
    try {
      setLinkedinLoading(true);
      const res = await axios.get(`/api/linked/analysis/${userId}`, {
        params: {
          page,
          limit,
          name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = res.data;
      setUserSearchingHistory(result);
    } catch (error) {
      let message = error.response.data.message;
      toast.error(message);
    } finally {
      setLinkedinLoading(false);
    }
  };
  const handleLinkedinProfileDetails = async (id) => {
    try {

      setLinkedinViewLoading(id);
      const res = await axios.get(`/api/linked/analysis/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSingleLinkedinData(res.data);

      setLinkedinId(id)
      console.log("red.data", res.data)
    } catch (error) {
      const messsage = error?.response?.data?.message;
      toast.error(messsage || "Internal Server Error");
    } finally {
      setLinkedinViewLoading(null);
    }
  };

  // delete package

  const handleLinkedinDelete = async (id) => {
    try {
      setLinkedinDelLoading(id);
      const res = await axios.delete(`/api/linked/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllAnalysis(page, PageLimit, name);
      toast.success(res.data.message);
    } catch (error) {
      console.log("handleLinkedinDelete.error", error)
      let message = error?.response?.data?.message;
      toast.error(message || "Internarl Server Error");
    } finally {
      setLinkedinDelLoading(null);
    }
  };
  useEffect(() => {

    getAllAnalysis(page, PageLimit, name);

  }, []);
  return (
    <LinkedinContext.Provider
      value={{
        page,
        getAllAnalysis,
        setName,
        setPackagePrice,
        setPageLimit,
        setPage,
        anaysicResult,
        handleLinkedinDelete,
        linkedindelLoading,
        linkedinLoading,
        handleLinkedinProfileDetails,
        linkedinPlanData, linkedinviewLoading, getAllAnalysisSearchHistoryTable, userSearchingHistory, name, setName
      }}
    >
      {children}
    </LinkedinContext.Provider>
  );
};

export const useLinkedin = () => useContext(LinkedinContext);
