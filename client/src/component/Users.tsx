import { ErrorMessage, Field, Form, Formik } from 'formik';
import './Users.css';
import { useState } from 'react';

const Users = () => {

const userDatabackend = localStorage.getItem('userData');  
const userDatamatch = userDatabackend ? JSON.parse(userDatabackend) : null;

const userProfileData = localStorage.getItem('userProfileData');
const userProfileDatanew = userProfileData ? JSON.parse(userProfileData) : null;

const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const users = [
    { id: 1, fullName: 'John Wick', department: 'Administration', email: 'wickboy@gmail.com', phone: '98010364656', leaveIssuer: 'Rohin Awale' },
    { id: 2, fullName: 'Rohin Awale', department: 'Administration', email: 'rohinawale331@gmail.com', phone: '98010304856', leaveIssuer: 'John Wick' },
    { id: 3, fullName: 'John Doe', department: 'Administration', email: 'johndoe@gmail.com', phone: '98010364656', leaveIssuer: 'Rohin Awale' },
    { id: 4, fullName: 'Jane Doe', department: 'Administration', email: 'janedoe@gmail.com', phone: '9803456123', leaveIssuer: 'Rohin Awale' },
    { id: 5, fullName: 'Ram Doe', department: 'Administration', email: 'ram@gmail.com', phone: '9803102030', leaveIssuer: 'Rohin Awale' },
    { id: 6, fullName: `${userDatamatch?.firstName} ${userDatamatch?.lastName}`, department: userProfileDatanew?.department, email: userDatamatch?.email, phone: userDatamatch?.phoneNumber, leaveIssuer: 'Admin' }
  ];

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Form Submitted:", values);
    resetForm();
    setShowPopup(false); // Close the popup after form submission
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-heading-container">
            <h2 className="profile-heading">Employee Details</h2>
            {/* Conditional rendering for the button if the user is an admin */}
            {userDatamatch.role === "Admin" && (
              <button className="admin-button" onClick={() => setShowPopup(true)}>Add Employee</button>
            )}
          </div>
          <div className="usercard-container">
            <div className="profile-card">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Leave Issuer</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.fullName}</td>
                      <td>{user.department}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.leaveIssuer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
         <div className="popup-overlay">
         <div className="popup">
           <h2>Add New User</h2>
           <Formik
               initialValues={{
                 fullName: "",
                 department: "",
                 email: "",
                 phone: "",
               }}
               // validationSchema={validationSchema}
               onSubmit={handleSubmit}
             >
               {() => (
                 <Form className="formik-form">
                   <div className="form-group">
                     <label htmlFor="fullName">Full Name</label>
                     <Field name="fullName" className="form-input" />
                     <ErrorMessage name="fullName" component="div" className="error-message" />
                   </div>
                   <div className="form-group">
                   <label htmlFor="department">Department</label>
                      <Field as="select" id="department" name="department" className="form-controldepartment">
                        <option value="">Select Department</option> {/* Default option */}
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                      </Field>
                     <ErrorMessage name="department" component="div" className="error-message" />
                   </div>
                   <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <Field name="email" type="email" className="form-input" />
                     <ErrorMessage name="email" component="div" className="error-message" />
                   </div>
                   <div className="form-group">
                     <label htmlFor="phone">Phone</label>
                     <Field name="phone" className="form-input" />
                     <ErrorMessage name="phone" component="div" className="error-message" />
                   </div>
                   <div className="form-actions">
                     <button type="submit" className="submit-button">
                       Submit
                     </button>
                     <button type="button" className="cancel-button" onClick={() => setShowPopup(false)}>
                       Cancel
                     </button>
                   </div>
                 </Form>
               )}
           </Formik>
         </div>
       </div>
      )}
    </>
  );
};

export default Users;
