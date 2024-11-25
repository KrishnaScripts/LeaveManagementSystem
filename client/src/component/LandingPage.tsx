import './LandingPage.css';
import defaultAvatar from '../images/pngtree-man-avatar-image-for-profile-png-image_13001882.png';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { IUser } from '../types/user.type';
import { updateUser } from '../services/auth.service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LandingPage = () => {
  const userDatabackend = localStorage.getItem('userData');  
  const userDatamatch = userDatabackend ? JSON.parse(userDatabackend) : null;

  const userProfileData = localStorage.getItem('userProfileData');
  const userProfileDatanew = userProfileData ? JSON.parse(userProfileData) : null;
  

 

  const initialValues: IUser = {
    employeeId:userDatamatch?.employeeId || '',
    firstName: userDatamatch?.firstName || '',
    lastName: userDatamatch?.lastName || '',
    email: userDatamatch?.email || '',
    password: '', 
    phoneNumber: userDatamatch?.phoneNumber || '',
    role: userDatamatch?.role || '',
    confirmPassword: '' ,
    dob: userProfileDatanew?.dob || '',
    gender:userProfileDatanew?.gender || '',
    maritalStatus:userProfileDatanew?.maritalStatus || '',
    personalEmail:userProfileDatanew?.personalEmail || '',
    address:userProfileDatanew?.address || '',
    department:userProfileDatanew?.department || '',
    jobtitle:userProfileDatanew?.jobtitle || '',
    doj:userProfileDatanew?.doj || '',
    employeementType:userProfileDatanew?.employeementType || ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Work Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    password: Yup.string().min(6, 'Must be at least 6 characters'), // No required here if not changing
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match'),
    jobtitle: Yup.string().required('Job Title is required'),
    dob: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    personalEmail: Yup.string().email('Invalid email address').required('Personal Email is required'),
    address: Yup.string().required('Address is required'),
    department: Yup.string().required('Department is required'),
    doj: Yup.string().required('Date of Joining is required'),
    maritalStatus: Yup.string().required('Marital Status is required'),
    employeementType: Yup.string().required('Employeement Type is required'),
  });

  const handleFileUpload = () => {
    // Handle file upload logic here
  };

  const handleUpdate = async (formValue: IUser) => {
    const { firstName, lastName, email, phoneNumber, jobtitle, dob, gender, maritalStatus,personalEmail,address,department,doj,employeementType,confirmPassword } = formValue;

    try {
      await updateUser(firstName, lastName, email, phoneNumber,jobtitle, dob, gender, maritalStatus,personalEmail,address,department,doj,employeementType,confirmPassword).then(
        (response)=>{

          const data = response.data.user;
          const userData = localStorage.getItem('userData');
          if (userData) {
            const userObject = JSON.parse(userData);
            userObject.firstName = data.firstName;
            userObject.lastName = data.lastName;
            userObject.email = data.email;
            userObject.phoneNumber = data.phoneNumber;

            const myprofile = {
              jobtitle : data.jobtitle,
              dob : data.dob, 
              gender: data.gender, 
              maritalStatus: data.maritalStatus,
              personalEmail: data.personalEmail,
              address:data.address,
              department:data.department,
              doj:data.doj,
              employeementType:data.employeementType
            }
            localStorage.setItem('userData', JSON.stringify(userObject));
            localStorage.setItem('userProfileData', JSON.stringify(myprofile));

            
            alert("Data Update Sucessfully!");
          }else{
            console.error('No user data found in localStorage.');
          }
        }
      )
    } catch (err: any) {
      console.error("Error updating user:", err);
    }
  };
  

  return (
    <>
    <div className="profile-container">
      <div className="profile-content">
        <h2 className="profile-heading">My Profile</h2>
        <div className="card-container">
          <div className="profile-card">
            <img src={defaultAvatar} alt="Profile" className="avatar" />
            <span
              className="edit-photo-link"
              onClick={() => document.getElementById('fileInput')?.click()}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              Edit Photo
            </span>
            <input 
              type="file" 
              id="fileInput" 
              accept="image/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
            <div className="profile-details">
              <p>{userDatamatch.firstName || 'First Name'}</p>
              <p>{userDatamatch.lastName || 'Last Name'}</p>
              <p>{userDatamatch.department || 'IT'}</p>
            </div>
          </div>
          <div className="profile-card">
            <h3>My Details</h3>
            <Formik 
              initialValues={initialValues} 
              validationSchema={validationSchema} 
              onSubmit={handleUpdate} 
            >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="formProfile-container">
                  <div className="form-field">
                    <label htmlFor="employeeId">EmployeeMent ID</label>
                    <Field type="text" id="employeeId" name="employeeId" className="form-control" disabled />
                    <ErrorMessage name="employeeId" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="jobtitle">Job Title</label>
                    <Field type="text" id="jobtitle" name="jobtitle" className="form-control"/>
                    <ErrorMessage name="jobtitle" component="div" className="text-danger txt-error" />
                  </div>
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
                    <label htmlFor="dob">Date of Birth</label>
                    <DatePicker
                      className="form-control"
                      name="dob"
                      selected={values.dob ? new Date(values.dob) : null}
                      onChange={(date: Date | null) => setFieldValue("dob", date)}
                      maxDate={new Date()}             // Prevents selecting future dates
                      dateFormat="MMM dd, yyyy"         // Format without time
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"             // Makes year/month selection easier
                    />
                    <ErrorMessage name="dob" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field type="text" id="phoneNumber" name="phoneNumber" className="form-control" />
                    <ErrorMessage name="phoneNumber" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                      <label htmlFor="gender">Gender</label>
                      <Field as="select" id="gender" name="gender" className="form-control">
                        <option value="">Select Gender</option> {/* Default option */}
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </Field>
                      <ErrorMessage name="gender" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Work Email</label>
                    <Field type="email" id="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="personalEmail">Personal Email</label>
                    <Field type="email" id="personalEmail" name="personalEmail" className="form-control" />
                    <ErrorMessage name="personalEmail" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="address">Address</label>
                    <Field type="text" id="address" name="address" className="form-control" />
                    <ErrorMessage name="address" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                      <label htmlFor="department">Department</label>
                      <Field as="select" id="department" name="department" className="form-control">
                        <option value="">Select Department</option> {/* Default option */}
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                      </Field>
                      <ErrorMessage name="department" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="doj">Date of Joining</label>
                    {/* <Field type="text" id="doj" name="doj" className="form-control" /> */}
                    <DatePicker
                      name="doj"
                      className="form-control"
                      selected={values.doj ? new Date(values.doj) : null}
                      onChange={(date: Date | null) => setFieldValue("doj", date)}
                      maxDate={new Date()}             // Prevents selecting future dates
                      dateFormat="MMM dd, yyyy"         // Format without time
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"             // Makes year/month selection easier
                    />
                    <ErrorMessage name="doj" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                      <label htmlFor="maritalStatus">Marital Status</label>
                      <Field as="select" id="maritalStatus" name="maritalStatus" className="form-control">
                        <option value="">Select Marital Status</option> {/* Default option */}
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                      </Field>
                      <ErrorMessage name="maritalStatus" component="div" className="text-danger txt-error" />
                  </div>
                  <div className="form-field">
                      <label htmlFor="employeementType">Employeement Type</label>
                      <Field as="select" id="employeementType" name="employeementType" className="form-control">
                        <option value="">Select Employeement Type</option> {/* Default option */}
                        <option value="fulltime">Full-Time</option>
                        <option value="parttime">Part-Time</option>
                      </Field>
                      <ErrorMessage name="employeementType" component="div" className="text-danger txt-error" />
                  </div>

                </div>
                <button type="submit" className="button">Update</button>
              </Form>
            )}
            
            </Formik>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LandingPage;
