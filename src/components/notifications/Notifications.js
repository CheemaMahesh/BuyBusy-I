import React from 'react';
import { toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const successMsg = "Successful";
const errorMsg = "Failed";

//function to send success toast message
export const SuccessToast = (para) => {
  return (
    <>
      {toast.success(`${para} ${successMsg}`, { position: "top-right" })}
    </>
  )
}

//function to send error/failed toast message
export const ErrorToast = (para) => {
  return (
    <>
      {toast.error(`${para} ${errorMsg}`, { position: "top-right" })}
    </>
  )
}
