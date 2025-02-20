import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import {  IuserLeave } from "../types/user.type";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { applyLeave } from "../services/applyLeave.service";
import './LandingPage.css';

const ApplyLeave = () => {
    
    const [workingDays, setWorkingDays] = useState<number | null>(null);
    const [error,setError] =useState('');

    const userDatabackend = localStorage.getItem('userData');  
    const userDatamatch = userDatabackend ? JSON.parse(userDatabackend) : null;

    const initialValues: IuserLeave = {
        fromdate: "",
        todate: "",
        leavereason: '',
        leavetype:'',
        employeeName:userDatamatch.firstName + ' ' + userDatamatch.lastName
    }
    const validationSchema = Yup.object().shape({
        fromdate: Yup.date().required('From date is required'),
        todate: Yup.date().min(Yup.ref('fromdate'), 'To date cannot be before From date').required('To date is required'),
    });

    const calculateWorkingDays = async (formValue: IuserLeave, { resetForm }: any) => {
        const { fromdate, todate, leavereason, leavetype, employeeName } = formValue;
    
        try {
            await applyLeave(fromdate, todate, leavereason, leavetype, employeeName).then((response) => {
                setWorkingDays(response.data.workingDays);
                resetForm(); // Reset form fields after successful submission
            });
        } catch (err: any) {
            setError(err.message);
        }
    };
    

    return(
        <>
        <div className="profile-container">
            <div className="profile-content">
                <h2 className="profile-heading">Apply Leaves</h2>
                <div className="card-container">
                    <div className="profile-card">
                    <Formik 
                        initialValues={initialValues} 
                        validationSchema={validationSchema} 
                        onSubmit={calculateWorkingDays}
                    >
                    {({ setFieldValue, values }) => (
                    <Form>
                        <div className="formProfile-leave-container">
                            <div className="form-field">
                                <label htmlFor="fromdate">From Date</label>
                                <DatePicker
                                name="fromdate"
                                selected={values.fromdate ? new Date(values.fromdate) : null}
                                onChange={(date) => setFieldValue('fromdate', date)}
                                dateFormat="MMM dd, yyyy"         // Format without time
                                showMonthDropdown
                                showYearDropdown
                                className="form-control"

                                />
                                <ErrorMessage name="fromdate" component="div" className="text-danger txt-error" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="todate">To Date</label>
                                <DatePicker
                                name="todate"
                                selected={values.todate ? new Date(values.todate) : null}
                                onChange={(date) => setFieldValue('todate', date)}
                                dateFormat="MMM dd, yyyy"         // Format without time
                                showMonthDropdown
                                showYearDropdown
                                className="form-control"
                                />
                                <ErrorMessage name="todate" component="div" className="text-danger txt-error" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="leavetype">Leave Type</label>
                                <Field as="select" id="leavetype" name="leavetype" className="form-control">
                                    <option value="">Select Leave Type</option> {/* Default option */}
                                    <option value="Female">Annual Leave / Paid Time Off (PTO)</option>
                                    <option value="Male">Sick Leave</option>
                                    <option value="Male">Family and Medical Leave</option>
                                    <option value="Male">Parental Leave</option>
                                </Field>
                                <ErrorMessage name="leavetype" component="div" className="text-danger txt-error" />
                            </div>
                            <div className="form-field"/>                        
                            <div className="form-field">
                                <label htmlFor="leavereason">Leave reason</label>
                                <Field as="textarea" id="leavereason" name="leavereason" className="form-control" />
                                <ErrorMessage name="leavereason" component="div" className="text-danger txt-error" />
                            </div>
                        </div>
                        <button type="submit" className="button">Apply Leave</button>
                         
                         {workingDays !== null && (
                             <p>Number of Working Days: {workingDays}</p>
                         )}
                    </Form>
                    )}
                       
                    </Formik>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ApplyLeave;