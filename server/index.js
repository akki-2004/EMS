const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const PoliceModel = require('./models/Police');
const AdvocateModel=require('./models/Lawyer');
const PolicecheckModel=require('./models/Policecheck');
const LawyercheckModel=require('./models/Lawyercheck');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PolicetickModel =require('./models/Firtick.js');
const PolicecrossModel =require('./models/Fircross.js');
// const TheftModel = require('./models/Theftdata');
// const kidnappingModel  = require('./models/kidnappingdata')
// const BriberyModel = require('./models/Briberydata')
// const childlabourModel = require('./models/childlabourdata')
// const cybercrimeModel = require('./models/cybercrimedata')
// const domesticvoilenceModel = require('./models/domesticviolencedata')
// const murderModel = require('./models/murderdata')
// const raggingModel = require('./models/raggingdata')
// const suicideModel = require('./models/suicidedata')


const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
mongoose.connect('mongodb+srv://Musharaf:Musharaf@ems.yzofrjh.mongodb.net/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.post('/google-signin', async (req, res) => {
  try {
    res.json({ success: true, message: 'Google Sign-In successful' });
  } catch (error) {
    console.error('Error handling Google Sign-In:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const sendResetPasswordEmail = async (email,userId, token,user) => {
  try {
    // Define email content
    const mailOptions = {
      from: 'altumohd007@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      text:" Click on the following link to reset your password: http://localhost:5173/reset-password/${userId}/${token}",
    };

    // Send the email using the Nodemailer transporter
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending reset password email:', error.message);
  }
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'altumohd007@gmail.com',
    pass:'hwpw wing mdpm kprd',
  },
});

const generateSecretKey = () => {
  return "JWT_SECRET"
};


app.post('/register', async (req, res) => {
  try {
    const {  Name, loginId, password ,email} = req.body;
    console.log(req.body.email)
    const user = await EmployeeModel.findOne({ loginId: loginId });

    if (user) {
      return res.status(400).json({ error: 'User already exists!' });
      
    }

    const hash = await bcrypt.hash(password, 10);
    const employee = await EmployeeModel.create({ loginId: loginId, password: hash, Name: Name,email:email });
    
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/register2', async (req, res) => {
  try {
    const { Name,email, designation, id, policeStation,loginId,password} = req.body
    const existingUser = await EmployeeModel.findOne({ id:id})
    if (!existingUser) {
      return res.status(400).json({ error: 'User with the provided ID number does not exist!' });
    }
    const user = await PoliceModel.findOne({ loginId: loginId });

    if (user){

      return res.status(400).json({ error: 'User already exists!' });
    }
    const hash = await bcrypt.hash(password, 10);
    const police = await PoliceModel.create({
      loginId: loginId,
      password:hash,
      name: Name,
      email: email,
      designation: designation,
      policeStation: policeStation,
    });

    res.json(police);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ... (previous code)

app.post('/register3', async (req, res) => {
  try {
    const { Name, email, typeofadvocate,bar, court, loginId,password } = req.body;
    // console.log(barcouncilregistration);

    // Check if the BarCouncilRegistrationNumber exists in the Lawyercheck collection
    const existingUser = await EmployeeModel.findOne({ bar:bar });
    
    if (!existingUser) {
      return res.status(400).json({ error: 'User with the provided Registration Number does not exist!' });
      
    }

    const user = await AdvocateModel.findOne({ loginId: loginId });

    if (user) {
      return res.status(400).json({ error: 'User already exists!' });
     
    }
    const hash = await bcrypt.hash(password, 10);
    const advocate = await AdvocateModel.create({
      loginId: loginId,
      password:hash,
      name: Name,
      email: email,
      typeofadvocate: typeofadvocate,
      court: court,
    });

    res.json(advocate);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tick', async (req, res) => {
  try {

      const {firid} = req.body;
      console.log('Received firid:', firid);
      const employee = await PolicetickModel.create({ firid:firid });
      res.json(employee);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
});
app.get('/lawyers', async (req, res) => {
  try {
    // Fetch all lawyers from MongoDB
    // console.log('Fetching lawyers...');
    const lawyers = await LawyercheckModel.find();
    // console.log('Fetched lawyers:', lawyers);
    res.json(lawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/cross',async(req,res)=>{
  try {
    const {firid} = req.body;
      console.log('Received firid:', firid);
    const employee = await PolicecrossModel.create({ firid:firid });
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
})


app.post('/firdetails', async (req, res) => {
  try {
    const { loginId, idNumber, policeStation, designation, password } = req.body;

    const user = await PoliceModel.findOne({ loginId, policeStation, designation }).exec();

    if (user) {
      if ('password' in user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const secretKey = generateSecretKey();
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });

          res.cookie('token', token);
          res.json('Success');
        } else {
          res.status(400).json({ error: 'Incorrect password' });
        }
      } else {
        res.status(400).json({ error: 'User password not found' });
      }
    } else {
      res.status(400).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ error: 'Internal Server Error' });
  }
});

app.post('/cnr', async (req, res) => {
  try {
    const { loginId,password } = req.body;
    const user = await PoliceModel.findOne({ loginId: loginId}).exec();

    if (user) {
      if ('password' in user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const secretKey = generateSecretKey();
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });

          res.cookie('token', token);
          res.json('Success');
        } else {
          res.json('Incorrect password');
        }
      } else {
        res.json('User password not found');
      }
    } else {
      res.json('No record exists');
    }
  } catch (error) {
    console.error(error.message);
    res.json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const employee = await EmployeeModel.findOne({ loginId }).exec();
    const police = !employee ? await PoliceModel.findOne({ loginId }).exec() : null;
    const advocate = !employee && !police ? await AdvocateModel.findOne({ loginId }).exec() : null;
    if (employee || police || advocate) {
      const user = employee || police || advocate;
      if ('password' in user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const secretKey = generateSecretKey();
          const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });

          res.cookie('token', token);
          res.json('Success');
        } else {
          // res.status(400).json('Incorrect password');
          res.status(400).json({ error: 'Incorrect password' });

        }
      } else {
        res.status(400).json({ error: 'User password not found'});
      }
    } else {
      res.status(400).json({ error: 'No record exists' });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ error: 'Internal Server Error' });
  }
});


app.post('/reset-password', async (req, res) => {
  //const { id, token } = req.params;
  const { password, id, token } = req.body;
  //console.log("Required params:", req.params);
  console.log('Received Token:', req.body);

  try {
    const secretKey = generateSecretKey();
    //const decoded = jwt.verify(token, secretKey);
    //console.log('Decoded Payload:', decoded);

    if (id) {
      const hash = await bcrypt.hash(password, 10);
      console.log(hash)
      const updatedUser = await EmployeeModel.findByIdAndUpdate(id, { password: hash }).exec();

      if (updatedUser) {
        res.json({ Status: 'Success' });
      } else {
        res.json({ Status: 'Error updating user' });
      }
    } else {
      res.json({ Status: 'Error with token' });
    }
  } catch (error) {
    console.error("Catch",error.message);
    res.json({ Status: 'Error', error: 'Internal Server Error' });
  }
});


app.post('/firdetails', async (req, res) => {
  try {
    const { loginId, idNumber, policeStation, designation } = req.body;
    const user = await PoliceModel.findOne({
      loginId,
      idNumber,
      policeStation,
      designation,
    }).exec();

    if (user) {
      const secretKey = generateSecretKey();
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
      res.cookie('token', token);
      res.json('Success');
    } else {
      res.status(400).json('No record exists');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  

// app.get('/verify-data/:userId', async (req, res) => {
//   try {
//       const userId = req.params.userId;
      
//       // Fetch data from MongoDB based on the userId
//       const user = await EmployeeModel.findById(userId).exec();

//       if (!user) {
//           return res.json({ success: false, message: 'User not found' });
//       }

//       // Hash the fetched data
//       const hashedData = crypto.createHash('sha256').update(JSON.stringify(user)).digest('hex');

//       // Verify the hash against the blockchain
//       const isVerified = blockchain.verifyData(hashedData);

//       if (isVerified) {
//           return res.json({ success: true, message: 'Data integrity verified' });
//       } else {
//           return res.json({ success: false, message: 'Data integrity verification failed' });
//       }
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/Theft/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await TheftModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/Theft/getAll', async (req, res) => {
//   try {
//     const allCases = await TheftModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/Bribery/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await BriberyModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/Bribery/getAll', async (req, res) => {
//   try {
//     const allCases = await BriberyModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/ChildLabour/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await childlabourModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/ChildLabour/getAll', async (req, res) => {
//   try {
//     const allCases = await childlabourModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/CyberCrime/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await cybercrimeModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/Cybercrime/getAll', async (req, res) => {
//   try {
//     const allCases = await cybercrimeModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/Domesticviolence/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await domesticvoilenceModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/Domesticviolence/getAll', async (req, res) => {
//   try {
//     const allCases = await domesticvoilenceModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/Kidnapping/get/:caseNumber", async (req, res) => {
//   console.log("Request received for Kidnapping case details");
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await kidnappingModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// // Add this route to your server.js file
// app.get('/Kidnapping/getAll', async (req, res) => {
//   try {
//     const allCases = await kidnappingModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/Murder/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await murderModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // // Add this route to your server.js file
// app.get('/Murder/getAll', async (req, res) => {
//   try {
//     const allCases = await murderModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/Ragging/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await raggingModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/Ragging/getAll', async (req, res) => {
//   try {
//     const allCases = await raggingModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get("/Suicide/get/:caseNumber", async (req, res) => {
//   try {
//     const caseNumber = req.params.caseNumber;
//     const caseDetails = await suicideModel.findOne({ CaseNumber: caseNumber });

//     if (!caseDetails) {
//       return res.status(404).json({ message: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add this route to your server.js file
// app.get('/Suicide/getAll', async (req, res) => {
//   try {
//     const allCases = await suicideModel.find();
//     res.json(allCases);
//   } catch (error) {
//     console.error('Error fetching cases:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




// app.post('/NewCases', async (req, res) => {
//   try {
//     const {
//       CaseNumber,
//       CaseTitle,
//       Place,
//       CaseType,
//       CaseDetails,
//       Hearing1,
//       Hearing2,
//       Hearing3,
//       CaseStatus
//     } = req.body;

//     // Determine the model based on CaseType
//     let caseModel;
//     switch (CaseType) {
//       case "Theft":
//         caseModel = TheftModel;
//         break;
//       case "Bribery":
//         caseModel = BriberyModel;
//         break;
//       case "Suicide":
//         caseModel = suicideModel;
//         break;
//       case "Murder":
//         caseModel = murderModel;
//         break;
//       case "Ragging":
//         caseModel = raggingModel;
//         break;
//       case "CyberCrime":
//         caseModel = cybercrimeModel;
//         break;
//       case "Domesticviolence":
//         caseModel = domesticvoilenceModel;
//         break;
//       case "Kidnapping":
//         caseModel = kidnappingModel;
//         break;
//       case "ChildLabour":
//         caseModel = childlabourModel;
//         break;
//       default:
//         return res.json({ error: "Invalid CaseType" });
//     }

//     // Check if CaseNumber already exists in the selected model
//     const existingCase = await caseModel.findOne({ CaseNumber });

//     if (existingCase) {
//       return res.json({ error: 'Case Details already present' });
//     }

//     // Create a new document in the selected model
//     const newCase = await caseModel.create({
//       CaseNumber,
//       CaseTitle,
//       Place,
//       CaseType,
//       CaseDetails,
//       Hearing1,
//       Hearing2,
//       Hearing3,
//       CaseStatus
//     });

//     res.status(200).json({ message: 'Form submitted successfully', result: newCase });
//   } catch (error) {
//     console.error(error);

//     // Check if the error is due to a duplicate key (CaseNumber)
//     if (error.code === 11000 || error.name === 'MongoError' || error.name === 'BulkWriteError') {
//       return res.status(400).json({ error: 'CaseNumber already exists' });
//     }

//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



app.listen(3002, () => {
  console.log('Server is running on port 3002');
});