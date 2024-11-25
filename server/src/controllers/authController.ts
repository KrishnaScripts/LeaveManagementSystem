import { Request,Response } from "express";
import { v4 as uuidv4 } from 'uuid'; 

const users: Array<{ employeeId?:string,firstName: string, lastName: string, email: string, password: string, role: string, phoneNumber: string, confirmPassword:string }> = [];

export const signup = async(req:Request, res:Response):Promise<void>=>{
  try{
      const { firstName, lastName, email, password, role, phoneNumber,confirmPassword } = req.body;
      
      //basic Validation
      // if(!firstName || !lastName || !email || !password || !phoneNumber || !confirmPassword){
      //   res.status(400).json({ message: 'All fields are required' });
      //   return;
      // }
    
      if(password !== confirmPassword){
        res.status(400).json({ message: 'Passwords do not match' });
        return;
      }
      const employeeId = "E" + uuidv4().split('-')[0];

      //store data into localstorage
      users.push({ employeeId ,firstName, lastName, email, password, role, phoneNumber, confirmPassword});
      res.status(201).json({message:'Signup successful', user: { employeeId ,firstName, lastName, email, phoneNumber, role, confirmPassword }});
    }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const updateUser = async(req:Request, res:Response):Promise<void>=>{
  try{
    const {email} =req.body;
    
    const { firstName, lastName,phoneNumber,jobtitle, dob, gender, maritalStatus,personalEmail,address,department,doj,employeementType } = req.body;
    users.push({
      firstName, lastName, email, phoneNumber,
      password: "",
      role: "",
      confirmPassword: "",
    });
    res.status(200).json({message: "user Updated successfully!", user: { firstName, lastName, email, phoneNumber,jobtitle, dob, gender, maritalStatus,personalEmail,address,department,doj,employeementType }})
  }catch(error) {
    res.status(500).json({ message: "Internal server error" });
  }
}