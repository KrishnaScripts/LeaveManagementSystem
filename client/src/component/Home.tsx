import  { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './Home.css';
import { registration } from '../services/auth.service'; 
import { IUserLogin,IUser } from "../types/user.type";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [error,setError] =useState('');

  const loginToastify = () => toast.error("Login Fail!");
  const loginSuccess = () => toast.error("Login Successfully!");
 

  const Values = {
    employeeId:'',
    firstName: '',
    lastName:'',
    email:'',
    password:'',
    phoneNumber:'',
    role:'',
    confirmPassword:'',
    dob:'',
    gender:'',
    maritalStatus:'',
    personalEmail:'',
    address:'',
    department:'',
    jobtitle:'',
    doj:'',
    employeementType:''
  };


  const signInValidationForm = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is Required'),
  });
  const signUpValidationForm = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async(formValue:IUserLogin,{ resetForm }: any)=>{
    
   const {email, password} = formValue;
   const userDatabackend = localStorage.getItem('userData');  
   const userDatamatch = userDatabackend ?  JSON.parse(userDatabackend) : null;
    if(userDatamatch.email == email && userDatamatch.confirmPassword == password ){
      if(userDatamatch.role === 'Admin'){
        loginSuccess();
        navigate('/adminDashboard')
      }else{
        loginSuccess();
        navigate('/landingPage');
      }
    }else{
      loginToastify();
    }
    resetForm();
    
  }
  const handleSignupSubmit = async(formValue:IUser,{ resetForm }: any)=>{
    const{employeeId,firstName,lastName,email,password,phoneNumber,role,confirmPassword} = formValue;
    try{
      registration(employeeId,firstName,lastName,email,password,phoneNumber,role,confirmPassword).then(
        (response)=>{
          const user = response.data.user;
          console.log(response,"user")
          localStorage.setItem('userData',JSON.stringify(user));  
          resetForm();
          setIsSignUp((prev) => !prev); 
        }
      )

    }catch(err:any){
      setError(err.message);
    }
  }
     
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };


  return (
    <div className="wrapper">
    {/* Left side - Image Section */}
    <div className="image-section"></div>
    
    {/* Right side - Form Section */}
    <div className="form-section">
      <div className="container">
        <div className="welcome-text">Welcome To LeavePortal</div>
        
        <div className="form-container">
          <Formik 
            initialValues={Values}
            validationSchema={isSignUp ? signUpValidationForm : signInValidationForm}
            onSubmit={isSignUp ? handleSignupSubmit : handleSubmit}
          >
            {({ resetForm }) => (
              <Form>
                {isSignUp ? (
                  <>
                    <div className="form-field">
                      <label htmlFor="firstName">First Name</label>
                      <Field type="text" id="firstName" name="firstName" className="form-control" />
                      <ErrorMessage name="firstName" component="div" className="text-danger txt-error" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="lastName">Last Name</label>
                      <Field type="text" id="lastName" name="lastName" className="form-control" />
                      <ErrorMessage name="lastName" component="div" className="text-danger txt-error" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <Field type="text" id="phoneNumber" name="phoneNumber" className="form-control" />
                      <ErrorMessage name="phoneNumber" component="div" className="text-danger txt-error" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <Field type="email" id="email" name="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger txt-error" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="role">Role</label>
                      <Field as="select" id="role" name="role" className="form-control">
                        <option value="">Select Role</option> {/* Default option */}
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="text-danger txt-error" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="password">Password</label>
                      <Field type="password" id="password" name="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger txt-error" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger txt-error" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <Field type="email" id="email" name="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger txt-error" />
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="password">Password</label>
                      <Field type="password" id="password" name="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger txt-error" />
                    </div>
                  </>
                )}
                <button type="submit" className="button">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
              </Form>
            )}
          </Formik>
        </div>

        <button className="button toggle-button" onClick={toggleForm}>
          {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
        </button>
        <ToastContainer />
      </div>
    </div>
  </div>
  );
};

export default Home;
