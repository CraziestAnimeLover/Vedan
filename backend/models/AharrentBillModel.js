import mongoose from "mongoose";

const rentBillData = rentBills.map((bill) => ({
    billFrom: bill.billFrom,
    billTo: bill.billTo,
    rentAmount: bill.rentAmount,
    billingDate: bill.billingDate,
    remark: bill.remark,
    currency: bill.currency,
  }));
  
  
  
export default mongoose.model("RentBill", rentBillSchema , "aharrentbill") ;
