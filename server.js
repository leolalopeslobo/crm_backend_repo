


// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const workoutRoutes = require('./routes/workouts')
// // const nodemailer = require('nodemailer');
// const fs = require('fs').promises;
// const path = require('path');
// const userRoutes = require('./routes/user')
// const sendEmails = require('./controllers/Email_Marketing') // Import the sendEmail function

// const cors = require('cors'); // Import the cors module





// // Use CORS middleware

// // express app  
// const app = express()


// const corsOptions = {
//   // origin: 'http://localhost:3000', // Allow only requests from this origin (Frontend Server URL)
//   origin: 'https://crm-frontend-repo.onrender.com/',
//   //methods: ['GET', 'POST'], // Allow only GET and POST requests
//   optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));




// // middleware
// app.use(express.json())

// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })

// // routes
// app.use('/api/workouts', workoutRoutes)
// app.use('/api/user', userRoutes)

// // connect to db
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT)
//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   })


// // app.post('/sendEmails', handleSendEmails);



// //send email v2: 21-3-24
// app.post('/sendEmails', async (req, res) => {
//   const { recipients } = req.body;

//   if (!recipients || !Array.isArray(recipients)) {
//     return res.status(400).send('Invalid recipients data');
//   }

//   try {
//     await sendEmails(recipients);
//     res.status(200).send('Emails sent successfully!');
//   } catch (error) {
//     res.status(500).send('Error sending emails');
//   }
// });




//   //sending email this can be deleted maybe because i have sperated it in controllers>EMail_Marketing 
// //   app.post('/sendEmails', async (req, res) => {
// //   const { recipients } = req.body;

// //   if (!recipients || !Array.isArray(recipients)) {
// //     return res.status(400).send('Invalid recipients data');
// //   }

// //   try {
// //     // Sending email using Nodemailer
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       host: 'smtp.gmail.com',
// //       port: 587,
// //       secure: false,
// //       auth: {
// //         user: '3stackcoder@gmail.com', // Update with your Gmail account
// //         pass: 'wzkmtlkivwncecio', // Update with your Gmail account password
// //       },
// //     });

// //     // Read the HTML file from the same directory
// //     const htmlFilePath = path.join(__dirname, 'controllers', 'Template2.html');
// //     const data = await fs.readFile(htmlFilePath, 'utf8');

// //     // Loop through the recipients array and send email to each recipient
// //     for (const recipient of recipients) {
// //       const mailOptions = {
// //         from: 'martinwarren2000@gmail.com', // Update with your Gmail account
// //         to: recipient,
// //         subject: 'With Love From PIXCL',
// //         html: data,
// //       };

// //       console.log(`Sending email to ${recipient}`);
// //       // Send email to current recipient
// //       await transporter.sendMail(mailOptions);
// //       console.log(`Email sent successfully to ${recipient}`);
// //     }

// //     res.status(200).send('Emails sent successfully!');
// //   } catch (error) {
// //     console.error('Error sending emails:', error);
// //     res.status(500).send('Error sending emails');
// //   }
// // });


// module.exports = app;


//NEW SERVER.JS CODE BELOW

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const sendEmails = require('./controllers/Email_Marketing')
const WebSocket = require('ws'); // Import WebSocket module
const cors = require('cors');
const http = require('http');

const app = express()

// Middleware
app.use(express.json())

// CORS configuration
const corsOptions = {
  origin: 'https://crm-frontend-repo.onrender.com', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Start listening for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  // Handle WebSocket connection
});

// Handle WebSocket upgrades
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Send emails route
app.post('/sendEmails', async (req, res) => {
  const { recipients } = req.body;

  if (!recipients || !Array.isArray(recipients)) {
    return res.status(400).send('Invalid recipients data');
  }

  try {
    await sendEmails(recipients);
    res.status(200).send('Emails sent successfully!');
  } catch (error) {
    res.status(500).send('Error sending emails');
  }
});

module.exports = app;
