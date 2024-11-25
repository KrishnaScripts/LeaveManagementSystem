import { Request,Response } from "express";
import { sendEmail } from "../utils/emailService";

const calculateWorkingDays = (startDate: Date, endDate: Date): number => {
    let count = 0;
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) { // Skip weekends
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };
export const applyLeave = async(req:Request, res:Response):Promise<void>=>{
    const { fromdate, todate,leavereason,leavetype,employeeName } = req.body;
    const start = new Date(fromdate);
    const end = new Date(todate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        res.status(400).json({ message: 'Invalid dates' });
    }
    if (start > end) {
        res.status(400).json({ message: 'From date cannot be after To date' });
    }
    const subject = 'LMS | A new Leave Request Has Arrived';
    const text = `
      A new Leave Request Has Arrived
      ---------------------------
      Employee: ${employeeName}
      From Date: ${fromdate}
      To Date: ${todate}
      Reason: ${leavereason}
    `;

    // Send email with leave details to admin
    await sendEmail(subject, text);

    const workingDays = calculateWorkingDays(start, end);
    res.status(200).json({message: 'Leave applied successfully, and email notification sent.', workingDays,leavereason,leavetype });
}