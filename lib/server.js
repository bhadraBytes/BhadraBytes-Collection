// made a server to send the client details from the CustomerSupport.jsx but we will also need a backend server to save the details so now i have commented this


// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3001; // Use the desired port

// // Middleware to parse JSON and urlencoded data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Nodemailer configuration (replace with your email service details)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'yashbhadra74@gmail.com',
//     pass: '9082351496yb',
//   },
// });

// // Endpoint to handle form submissions
// app.post('/submit-form', (req, res) => {
//   const { name, email, message } = req.body;

//   // Email content
//   const mailOptions = {
//     from: 'yashbhadra74@gmail.com',
//     to: 'recipient-email@example.com',
//     subject: 'New Form Submission',
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send('Email sent: ' + info.response);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
