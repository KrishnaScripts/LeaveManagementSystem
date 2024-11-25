export interface IUserLogin {
    email: string;
    password: string
}

export interface IUser {
    employeeId:string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber:string,
    role:string,
    confirmPassword:string,
    dob:string,
    gender:string
    maritalStatus:string,
    personalEmail:string,
    address:string,
    department:string,
    jobtitle:string,
    doj:string,
    employeementType:string
    
}

export interface IuserLeave {
    employeeName:string
    fromdate: string, 
    todate: string,
    leavereason:string,
    leavetype:string
}

  