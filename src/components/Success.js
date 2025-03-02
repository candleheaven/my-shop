import Alert from '@mui/material/Alert';
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';

export default function Tracking() {
    return (
        <div>
            <Alert severity="success" sx={{ position: 'fixed', bottom: 16, right: 16 }}>Order placed successfully. You'll receive confirmation message shortly.</Alert>
            <h1>Success</h1>
        </div>
    )
}


// const EmailForm = (order, name, address, phone1) => {
//     const form = useRef();
  
//     const sendEmail = (e) => {
//       e.preventDefault();
  
//       emailjs.sendForm(
//         'service_candle_heaven',  // Replace with your EmailJS Service ID
//         'web_order_template', // Replace with your EmailJS Template ID
//         form.current,
//         'u-vEeu4mGBgXOwIjR'   // Replace with your EmailJS Public Key
//       ).then(
//         (result) => {
//           alert('Email sent successfully!');
//           console.log(result.text);
//         },
//         (error) => {
//           alert('Failed to send email.');
//           console.error(error.text);
//         }
//       );
//     };
  
//     return (
//       <form ref={form} onSubmit={sendEmail}>
//         <label>Name:</label>
//         <input type="text" name="name" required />
  
//         <label>Email:</label>
//         <input type="email" name="email" required />
  
//         <label>Message:</label>
//         <textarea name="message" required />
  
//         <button type="submit">Send Email</button>
//       </form>
//     );
//   };

  