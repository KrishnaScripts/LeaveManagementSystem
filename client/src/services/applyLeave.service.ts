import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const applyLeave = async (fromdate:string,todate:string,leavereason:string,leavetype:string,employeeName:string)=>{
    return axios.post(API_URL + "/applyLeave",{
        fromdate,
        todate,
        leavereason,
        leavetype,
        employeeName
    }).then((response)=>{
        return response;
    });
}