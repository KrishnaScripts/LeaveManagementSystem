import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email:string,password:string)=>{
    return axios.post(API_URL + "/login",{
        email,
        password,
    }).then((response)=>{
        return response;
    });
}
export const registration = async (employeeId:string,firstName:string,lastName:string,email:string,password:string,phoneNumber:string,role:string,confirmPassword:string)=>{
    return axios.post(API_URL + "/signup",{
        employeeId,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
        confirmPassword,
    }).then((response)=>{
        return response;
    });
}
export const updateUser  = async (firstName:string,lastName:string,email:string,phoneNumber:string,jobtitle:string, dob:string, gender:string, maritalStatus:string,personalEmail:string,address:string,department:string,doj:string,employeementType:string,confirmPassword:string)=>{
    return axios.put(API_URL + "/updateUser",{
        firstName,
        lastName,
        email,
        phoneNumber,
        jobtitle, 
        dob, 
        gender, 
        maritalStatus,
        personalEmail,
        address,
        department,
        doj,
        employeementType,
        confirmPassword
    }).then((response)=>{
        return response;
    });
}
