require('./config/config');

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const hbs = require('hbs');
const paypal = require('paypal-rest-sdk');
const path = require("path");
const fileUpload = require("express-fileupload");
const busboyCnct = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const { ObjectID } = require("mongodb");
const _ = require("lodash");


const port = process.env.PORT || 3000;

const { mongoose } = require("./db/mongoose");
const { CarExpense, CarExpense2 } = require("./models/expense");
const { BusinessExpense } = require("./models/businessExpense");
const { HomeExpense } = require("./models/homeExpense");
const { OtherExpense } = require("./models/otherExpense");
const { RentalExpense } = require("./models/rentalExpense");
const { IncomeEntry } = require("./models/incomeEntry");
const { PaymentEntry } = require("./models/paymentEntry");
const { RentalIncomeEntry } = require("./models/rentalIncomeEntry");
const { VehicleLog } = require("./models/vehicleLog");
const { FixedAsset } = require("./models/fixedAsset");
const { MiscData } = require("./models/miscData");
const { User } = require("./models/user");
const { IncomeParty } = require("./models/incomeParty");
const { VehicleVendor } = require("./models/vehicleVendor");
const { BusinessVendor } = require("./models/businessVendor");
const { HomeVendor } = require("./models/homeVendor");
const { OtherVendor } = require("./models/otherVendor");
const { RentalVendor } = require("./models/rentalVendor");
const { IncomeClient } = require("./models/incomeClient");
const { Return_Data } = require("./models/return_data");
const { UserPayment } = require("./models/userPayment");
const { authenticate } = require("./middleware/authenticate");


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PayPal_Client_ID,
  'client_secret': process.env.PayPal_Client_Secret
});

var app = express();
app.use(fileUpload());
//app.use(busboy());

//Set the KEY SECRET
process.env.secret_key = new ObjectID().toHexString();

//Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(busboyBodyParser());

app.set("views", path.join("views"));
app.use(express.static(path.join('public')));
app.set("view engine", "hbs");


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin: *");
  //res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    console.log('Req methos is equal to options');
    // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, REDIRECT");
    res.header('Access-Control-Allow-Methods', '*');
    return res.status(200).json({});
  }
  next();
});

app.get("/", function (req, res) {
  res.render("index.hbs");
});

//PayPal
app.post("/payPal", authenticate, (req, res) => {

  if (!req.user._id) {
    return res.status(404).send("Unable to Find/Authenticate User!");
  } else {
    process.env.TempVarUser = req.user._id;
  }

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": process.env.Local_PayPal_Return_URL,
      "cancel_url": process.env.Local_PayPal_Cancel_URL
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "EZ-HST-CANADA Subscription",
          "sku": req.user._id,
          "price": "5.00",
          "currency": "CAD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "CAD",
        "total": "5.00"
      },
      "description": "EZ-HST-CANADA Subscrition for 1 Month."
    }]
  };

  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      console.log(`Trowing error: ${error}`);
      throw error;
    } else {
      //console.dir(payment);
      payerID = payment.id;

      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          // return res.redirect(payment.links[i].href);
          res.send(payment.links[i].href);
        }
      }
    }
  });

});

app.get("/success", function (req, res) {
  console.dir(`Query:${JSON.stringify(req.query)}`);
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "CAD",
        "total": "5.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {

      let userPay = {
        _user: process.env.TempVarUser,
        payID: payment.id,
        payCart: payment.cart,
        payDate: payment.create_time,
        payAmt: payment.transactions[0].amount.total,
        payTotalAmt: payment.transactions[0].amount.total,
        payerID: payment.payer.payer_info.payer_id,
        payerEmail: payment.payer.payer_info.email,
        payerAddress: payment.payer.payer_info.shipping_address.line1,
        payerCity: payment.payer.payer_info.shipping_address.city,
        payerProvince: payment.payer.payer_info.shipping_address.state,
        payerPostalCode: payment.payer.payer_info.shipping_address.postal_code,
        payerCountry: payment.payer.payer_info.country_code,
      };

      let myPaymentData = new UserPayment(userPay);


      myPaymentData.save().then(
        doc => {
          res.send(JSON.stringify(userPay, undefined, 2));
          //res.send(`Payment Successfully Completed!\r\nPayment ID: ${userPay.payID}\r\nCart: ${userPay.payCart}\r\nPayment Date: ${userPay.payDate}\r\nPayment Amt: ${userPay.payTotalAmt}\r\nPayer ID: ${userPay.payerID}\r\nPayer email: ${userPay.payerEmail}`);
        },
        e => {
          res.send(`Unable to Save Payment Information!: ${e}`);
        }
      );

      process.env.TempVarUser = '';
    }
  });

});

app.get('/cancel', function (req, res) {
  res.send("Cancelled!");
});


app.post("/carExpense", authenticate, async (req, res) => {
  let sampleFile;
  let myCarExpense;

  // let myNewDate = new Date(req.body.dateYear, req.body.dateMonth, req.body.dateDay);
  // myNewDate.setUTCHours(0);

  let myCarExpObject = {
    _user: req.user._id,
    carDate: req.body.carDate,
    carnetAmt: req.body.carnetAmt,
    carhstAmt: req.body.carhstAmt,
    carpstAmt: req.body.carpstAmt,
    carTotalAmt: req.body.carTotalAmt,
    carDescription: req.body.carDescription,
    vendorSelect: req.body.vendorSelect,
    carExpCatSelect: req.body.carExpCatSelect,
    receiptPath: false
  }
  if (req.files === undefined) {
    //Add the requested data and user id gathered from authenticate
    if (req.body.carNumber === "1") {
      myCarExpense = new CarExpense(myCarExpObject);
    } else if (req.body.carNumber === "2") {
      myCarExpense = new CarExpense2(myCarExpObject);
    } else if (req.body.carNumber === "Bus") {
      myCarExpense = new BusinessExpense(myCarExpObject);
    } else if (req.body.carNumber === "Home") {
      myCarExpense = new HomeExpense(myCarExpObject);
    } else if (req.body.carNumber === "Other") {
      myCarExpense = new OtherExpense(myCarExpObject);
    } else if (req.body.carNumber === "Rental") {
      myCarExpense = new RentalExpense(myCarExpObject);
    } else if (req.body.carNumber === "Income") {
      if (req.body.source === "Rental") {
        myCarExpense = new RentalIncomeEntry(myCarExpObject);
      } else {
        myCarExpense = new IncomeEntry(myCarExpObject);
      }
    }
  } else {
    sampleFile = req.files.imgload;
    // console.dir(sampleFile);
    // return;

    let myCarExpObjectImg = {
      _user: req.user._id,
      carDate: req.body.carDate,
      carnetAmt: req.body.carnetAmt,
      carhstAmt: req.body.carhstAmt,
      carpstAmt: req.body.carpstAmt,
      carTotalAmt: req.body.carTotalAmt,
      carDescription: req.body.carDescription,
      vendorSelect: req.body.vendorSelect,
      carExpCatSelect: req.body.carExpCatSelect,
      receiptPath: true
    }
    if (req.body.carNumber === "1") {
      myCarExpense = new CarExpense(myCarExpObjectImg);
    } else if (req.body.carNumber === "2") {
      myCarExpense = new CarExpense2(myCarExpObjectImg);
    } else if (req.body.carNumber === "Bus") {
      myCarExpense = new BusinessExpense(myCarExpObjectImg);
    } else if (req.body.carNumber === "Home") {
      myCarExpense = new HomeExpense(myCarExpObjectImg);
    } else if (req.body.carNumber === "Other") {
      myCarExpense = new OtherExpense(myCarExpObjectImg);
    } else if (req.body.carNumber === "Rental") {
      myCarExpense = new RentalExpense(myCarExpObjectImg);
    } else if (req.body.carNumber === "Income") {
      if (req.body.source === "Rental") {
        myCarExpense = new RentalIncomeEntry(myCarExpObjectImg);
      } else {
        myCarExpense = new IncomeEntry(myCarExpObjectImg);
      }
    }
  }

  myCarExpense.save().then(
    doc => {
      let mypackage;
      if (req.body.carNumber === "Income") {
        mypackage = {
          message: "Revenue Added Successfully",
          newID: doc._id
        };
      } else {
        mypackage = {
          message: "Expense Added Successfully",
          newID: doc._id
        };
      }

      if (doc.receiptPath) {

        // sampleFile.mv("./server/ImgUpload/myNewImg.jpg", function (err) {
        //   if (err) {
        //     return res.status(500).send(err);
        //   }
        // });


        uploadReceiptImage2S3(doc._user, doc._id, sampleFile);


      }
      res.status(200).send(mypackage);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

async function uploadReceiptImage2S3(userID, expenseID, myFile) {
  myImg = await uploadToS3(myFile, `${userID}_${expenseID}.jpg`);
};

async function deleteTheImage(userID, tempID) {

  try {
    let myImg;
    myImg = await deleteImageFromS3(`${userID}_${tempID}.jpg`);
    if (myImg) {
      //console.log('Image Deleted!')
    } else {
      throw (error);
    }
  } catch (error) {
    console.log(error);
  }
};

app.post("/carExpenseRecur", authenticate, (req, res) => {

  let myStartMonth = new Date(req.body.carDate).getUTCMonth();
  let myStartYear = new Date(req.body.carDate).getUTCFullYear();
  let myStartDay = new Date(req.body.carDate).getUTCDate();
  let myCarExpObject;
  let myCarColletion = [];
  let i = 0;

  for (i = myStartMonth; i <= 11; i++) {
    myTempMonth = i;
    let myTempDate = new Date(myStartYear, i, myStartDay);
    // console.log(`Day is ${myTempDay} and Month is ${myTempMonth}`);
    if (myStartDay > 30 && myTempMonth !== 1) {
      if (
        myTempMonth === 3 ||
        myTempMonth === 5 ||
        myTempMonth === 8 ||
        myTempMonth === 10
      ) {
        myTempDate = new Date(myStartYear, i, 30);
      }
    }

    if (myStartDay > 28 && i === 1) {
      if (
        myStartYear === 2020 ||
        myStartYear === 2024 ||
        myStartYear === 2028 ||
        myStartYear === 2032
      ) {
        myTempDate = new Date(myStartYear, i, 29);
      } else {
        myTempDate = new Date(myStartYear, i, 28);
      }
    }

    myTempDate.setUTCHours(0);

    myCarExpObject = {
      _user: req.user._id,
      carDate: myTempDate,
      carnetAmt: req.body.carnetAmt,
      carhstAmt: req.body.carhstAmt,
      carpstAmt: req.body.carpstAmt,
      carTotalAmt: req.body.carTotalAmt,
      carDescription: req.body.carDescription,
      vendorSelect: req.body.vendorSelect,
      carExpCatSelect: req.body.carExpCatSelect,
      receiptPath: false
    };

    if (req.body.carNumber === "1") {
      let carExpense = new CarExpense(myCarExpObject);
      myCarColletion.push(carExpense);
    } else if (req.body.carNumber === "2") {
      let carExpense2 = new CarExpense2(myCarExpObject);
      myCarColletion.push(carExpense2);
    } else if (req.body.carNumber === "Bus") {
      let busExpense = new BusinessExpense(myCarExpObject);
      myCarColletion.push(busExpense);
    } else if (req.body.carNumber === "Home") {
      let homeExpense = new HomeExpense(myCarExpObject);
      myCarColletion.push(homeExpense);
    } else if (req.body.carNumber === "Other") {
      let otherExpense = new OtherExpense(myCarExpObject);
      myCarColletion.push(otherExpense);
    } else if (req.body.carNumber === "Rental") {
      let rentalExpense = new RentalExpense(myCarExpObject);
      myCarColletion.push(rentalExpense);
    } else if (req.body.carNumber === "Income") {
      let incomeEntry;
      if (req.body.source === "Rental") {
        incomeEntry = new RentalIncomeEntry(myCarExpObject);
      } else {
        incomeEntry = new IncomeEntry(myCarExpObject);
      }
      myCarColletion.push(incomeEntry);
    }
  }

  let tempExpenseCollection;
  if (req.body.carNumber === "1") {
    tempExpenseCollection = CarExpense
  } else if (req.body.carNumber === "2") {
    tempExpenseCollection = CarExpense2
  } else if (req.body.carNumber === "Bus") {
    tempExpenseCollection = BusinessExpense
  } else if (req.body.carNumber === "Home") {
    tempExpenseCollection = HomeExpense
  } else if (req.body.carNumber === "Other") {
    tempExpenseCollection = OtherExpense
  } else if (req.body.carNumber === "Rental") {
    tempExpenseCollection = RentalExpense
  } else if (req.body.carNumber === "Income") {
    if (req.body.source === "Rental") {
      tempExpenseCollection = RentalIncomeEntry
    } else {
      tempExpenseCollection = IncomeEntry
    }
  }

  tempExpenseCollection.collection.insertMany(myCarColletion, function (err, docs) {
    if (err) {
      if (req.body.carNumber === "Income") {
        return res.send("Unable to POST reoccurring Revenue entries!");
      } else {
        return res.send("Unable to POST reoccurring Vehicle expenses!");
      }
    } else {
      return res.send(docs);
    }
  });

});

app.get("/carExpense", authenticate, (req, res) => {

  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }

  let tempExpenseModel;
  if (req.query.carNumber === "1") {
    tempExpenseModel = CarExpense
  } else if (req.query.carNumber === "2") {
    tempExpenseModel = CarExpense2
  } else if (req.query.carNumber === "Bus") {
    tempExpenseModel = BusinessExpense
  } else if (req.query.carNumber === "Home") {
    tempExpenseModel = HomeExpense
  } else if (req.query.carNumber === "Other") {
    tempExpenseModel = OtherExpense
  } else if (req.query.carNumber === "Rental") {
    tempExpenseModel = RentalExpense
  } else if (req.query.carNumber === "Income") {
    if (req.query.source === "Rental") {
      tempExpenseModel = RentalIncomeEntry
    } else {
      tempExpenseModel = IncomeEntry
    }
  }

  tempExpenseModel.find({
    _user: req.user._id,
    carDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    }
  })
    .then(carexpense => {
      if (!carexpense) {
        if (req.query.carNumber === "Income") {
          return res.status(404).send("No revenue entry found!");
        } else {
          return res.status(404).send("No expense(s) found!");
        }
      }
      res.send({ carexpense });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/busIncome", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }

  IncomeEntry.find({
    _user: req.user._id,
    carDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    }
  })
    .then(busIncome => {
      if (!busIncome) {

        return res.status(404).send("No Business Revenue entry found!");

      }
      res.send({ busIncome });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/rentalIncome", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }

  RentalIncomeEntry.find({
    _user: req.user._id,
    carDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    }
  })
    .then(rentalIncome => {
      if (!rentalIncome) {

        return res.status(404).send("No Rental Revenue entry found!");

      }
      res.send({ rentalIncome });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});


app.get("/carExpenseImg/:_id", authenticate, async (req, res) => {


  try {
    let myImg;
    const tempID = req.params._id;
    myImg = await getImageFromS3(`${req.user._id}_${tempID}.jpg`);
    if (myImg) {
      res.send({ myImg });
    } else {
      throw (error);
    }
  } catch (error) {
    return res.status(404).send(error);
  }

});

app.get("/carExpense/:_id", authenticate, (req, res) => {

  const tempID = req.params._id;
  if (!ObjectID.isValid(tempID)) {
    return res
      .status(404)
      .send("ID is not valid! Unable to complete the Find request!");
  }
  CarExpense.findOne({
    _id: tempID,
    _user: req.user._id
  })
    .then(carexpense => {
      if (!carexpense) {
        return res
          .status(404)
          .send("No expense was found with the selected ID!");
      }

      if (carexpense.receiptPath) {
        fs.readFile(
          `./server/imageUpload/${req.user._id}_${tempID}.jpg`,
          (err, data) => {
            if (err) {
              res.status(400).send(`Unable to retrieve the Image!  ${err}`);
            } else {
              res.send({ carexpense, data });
            }
          }
        );
      } else {
        res.send({ carexpense });
      }
    })
    .catch(e => {
      res.status(400).send(`Error !`);
    });
});

app.patch("/carExpense/:_id", authenticate, async (req, res) => {
  let tempID = req.params._id;
  let userID = req.user._id;
  let tempVehicleModel;
  let msgSuccess = "Expense Updated Successfully";
  // let myNewDate = new Date(req.body.dateYear, req.body.dateMonth, req.body.dateDay);
  // myNewDate.setUTCHours(0);
  if (req.body.carNumber === "1") {
    tempVehicleModel = CarExpense;
  } else if (req.body.carNumber === "2") {
    tempVehicleModel = CarExpense2;
  } else if (req.body.carNumber === "Bus") {
    tempVehicleModel = BusinessExpense;
  } else if (req.body.carNumber === "Home") {
    tempVehicleModel = HomeExpense;
  } else if (req.body.carNumber === "Other") {
    tempVehicleModel = OtherExpense;
  } else if (req.body.carNumber === "Rental") {
    tempVehicleModel = RentalExpense;
  } else if (req.body.carNumber === "Income") {
    if (req.body.source === "Rental") {
      tempVehicleModel = RentalIncomeEntry;
    } else {
      tempVehicleModel = IncomeEntry;
    }
    msgSuccess = "Revenue Updated Successfully";
  }

  if (req.files === undefined || req.files === null) {
    if (req.body.expReceipt === "NO RECEIPT") {
      tempVehicleModel
        .findOneAndUpdate(
          {
            _id: tempID,
            _user: userID
          },
          {
            $set: {
              _user: req.user._id,
              carDate: req.body.carDate,
              carnetAmt: req.body.carnetAmt,
              carhstAmt: req.body.carhstAmt,
              carpstAmt: req.body.carpstAmt,
              carTotalAmt: req.body.carTotalAmt,
              carDescription: req.body.carDescription,
              vendorSelect: req.body.vendorSelect,
              carExpCatSelect: req.body.carExpCatSelect,
              receiptPath: false
            }
          }
        )
        .then(
          doc => {
            //check if there was a receipt and delete it
            deleteTheImage(userID, tempID);
            let mypackage = {
              message: msgSuccess,
              NewExpense: doc
            };
            res.status(200).send(mypackage);
          },
          e => {
            res.status(400).send(e);
          }
        );
    } else {
      //This is ran when expense has an image and user made no changes to the image receipt and is therefore untouched
      tempVehicleModel
        .findOneAndUpdate(
          {
            _id: tempID,
            _user: userID
          },
          {
            $set: {
              _user: userID,
              carDate: req.body.carDate,
              carnetAmt: req.body.carnetAmt,
              carhstAmt: req.body.carhstAmt,
              carpstAmt: req.body.carpstAmt,
              carTotalAmt: req.body.carTotalAmt,
              carDescription: req.body.carDescription,
              vendorSelect: req.body.vendorSelect,
              carExpCatSelect: req.body.carExpCatSelect,
              receiptPath: true
            }
          },
          { returnOriginal: false }
        )
        .then(
          doc => {
            let mypackage = {
              message: msgSuccess,
              NewExpense: doc
            };
            res.status(200).send(mypackage);
          },
          e => {
            res.status(400).send(e);
          }
        );
    }
  } else {
    // This section adds image receipt and possibly another was there before and must be removed/replaced
    let sampleFile = req.files.imgload;
    await deleteTheImage(userID, tempID);
    // sampleFile.mv("./server/imageUpload/myNewImg.jpg", function (err) {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    // });

    tempVehicleModel
      .findOneAndUpdate(
        {
          _id: tempID,
          _user: userID
        },
        {
          $set: {
            _user: userID,
            carDate: req.body.carDate,
            carnetAmt: req.body.carnetAmt,
            carhstAmt: req.body.carhstAmt,
            carpstAmt: req.body.carpstAmt,
            carTotalAmt: req.body.carTotalAmt,
            carDescription: req.body.carDescription,
            vendorSelect: req.body.vendorSelect,
            carExpCatSelect: req.body.carExpCatSelect,
            receiptPath: true
          }
        },
        { returnOriginal: false }
      )
      .then(
        async doc => {
          await uploadReceiptImage2S3(userID, tempID, sampleFile); //Adds the new or just deleted image
          let mypackage = {
            message: msgSuccess,
            NewExpense: doc
          };
          res.status(200).send(mypackage);
        },
        e => {
          // deleteTheDefaultImage(userID, tempID);
          res.status(400).send(e);
        }
      );
  }
});

app.delete("/carExpense/:_id", authenticate, (req, res) => {
  const tempID = req.params._id;
  const userID = req.user._id;
  let tempVehicleModel;
  if (!ObjectID.isValid(tempID)) {
    return res
      .status(404)
      .send("ID is not valid! Unable to complete the Delete request!");
  }
  let errMsg = 'No expense was found with the selected ID!';
  if (req.body.carNumber === "1") {
    tempVehicleModel = CarExpense;
  } else if (req.body.carNumber === "2") {
    tempVehicleModel = CarExpense2;
  } else if (req.body.carNumber === "Bus") {
    tempVehicleModel = BusinessExpense;
  } else if (req.body.carNumber === "Home") {
    tempVehicleModel = HomeExpense;
  } else if (req.body.carNumber === "Other") {
    tempVehicleModel = OtherExpense;
  } else if (req.body.carNumber === "Rental") {
    tempVehicleModel = RentalExpense;
  } else if (req.body.carNumber === "Income") {
    if (req.body.source === "Rental") {
      tempVehicleModel = RentalIncomeEntry;
    } else {
      tempVehicleModel = IncomeEntry;
    }
    errMsg = 'No Revenue was found with the selected ID!';
  }

  tempVehicleModel
    .findOneAndDelete({
      _id: tempID,
      _user: userID
    })
    .then(carexpense => {
      if (!carexpense) {
        return res
          .status(404)
          .send(errMsg);
      }
      deleteTheImage(userID, tempID);
      res.send({ carexpense });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/incomeParty", (req, res) => {
  IncomeParty.find({}).then(
    incomeParties => {
      res.send({ incomeParties });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/incomeParty", authenticate, (req, res) => {
  const incomePartie = new IncomeParty({
    _user: req.user._id,
    text: req.body.text
  });
  incomePartie.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
});

app.delete("/incomeParty", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Party to Delete was not Found!");
  }
  const partyTxt = req.body.text;
  IncomeEntry.find({
    _user: userID,
    carExpCatSelect: partyTxt
  })
    .then(incomeEntrie => {
      if (incomeEntrie.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Party Represented that is already being used!"
          );
      } else {
        IncomeParty.findOneAndDelete({
          _user: userID,
          text: partyTxt
        })
          .then(party => {
            if (!party) {
              return res.status(404).send(`${partyTxt} was not found!`);
            }
            res.send({ party });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/vehicleVendors", authenticate, (req, res) => {
  const userID = req.user._id;
  const vendorTxt = req.body.text;

  VehicleVendor.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(carVendor => {
      if (carVendor.length > 0) {
        res
          .status(409)
          .send(
            `Can't Add Vendor/Supplier ${vendorTxt} because it is already being used!`
          );
      } else {

        const vendor = new VehicleVendor({
          _user: userID,
          text: vendorTxt
        });
        vendor.save().then(
          doc => {
            res.send(doc);
          },
          e => {
            throw (error);
          }
        );

      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get("/vehicleVendors", authenticate, (req, res) => {
  VehicleVendor.find({
    _user: req.user._id
  }).then(
    vehicleVendors => {
      res.send({ vehicleVendors });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/vehicleVendors", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Vendor to Delete was not Found!");
  }
  const vendorTxt = req.body.text;
  CarExpense.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(carexpense => {
      if (carexpense.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Vendor/Supplier that is already being used!"
          );
      } else {
        VehicleVendor.findOneAndDelete({
          _user: userID,
          text: vendorTxt
        })
          .then(vendor => {
            if (!vendor) {
              return res.status(404).send(`${vendorTxt} was not found!`);
            }
            res.send({ vendor });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/businessVendors", authenticate, (req, res) => {
  const userID = req.user._id;
  const vendorTxt = req.body.text;

  BusinessVendor.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(busVendor => {
      if (busVendor.length > 0) {
        res
          .status(409)
          .send(
            `Can't Add Vendor/Supplier ${vendorTxt} because it is already being used!`
          );
      } else {

        const vendor = new BusinessVendor({
          _user: userID,
          text: vendorTxt
        });
        vendor.save().then(
          doc => {
            res.send(doc);
          },
          e => {
            throw (error);
          }
        );

      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get("/businessVendors", authenticate, (req, res) => {
  BusinessVendor.find({
    _user: req.user._id
  }).then(
    businessVendors => {
      res.send({ businessVendors });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/businessVendors", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Vendor to Delete was not Found!");
  }
  const vendorTxt = req.body.text;
  BusinessExpense.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(busexpense => {
      if (busexpense.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Vendor/Supplier that is already being used!"
          );
      } else {
        BusinessVendor.findOneAndDelete({
          _user: userID,
          text: vendorTxt
        })
          .then(vendor => {
            if (!vendor) {
              return res.status(404).send(`${vendorTxt} was not found!`);
            }
            res.send({ vendor });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/homeVendors", authenticate, (req, res) => {
  const userID = req.user._id;
  const vendorTxt = req.body.text;

  HomeVendor.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(homeVendor => {
      if (homeVendor.length > 0) {
        res
          .status(409)
          .send(
            `Can't Add Vendor/Supplier ${vendorTxt} because it is already being used!`
          );
      } else {

        const vendor = new HomeVendor({
          _user: userID,
          text: vendorTxt
        });
        vendor.save().then(
          doc => {
            res.send(doc);
          },
          e => {
            throw (error);
          }
        );

      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get("/homeVendors", authenticate, (req, res) => {
  HomeVendor.find({
    _user: req.user._id
  }).then(
    homeVendors => {
      res.send({ homeVendors });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/homeVendors", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Vendor to Delete was not Found!");
  }
  const vendorTxt = req.body.text;
  HomeExpense.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(homeexpense => {
      if (homeexpense.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Vendor/Supplier that is already being used!"
          );
      } else {
        HomeVendor.findOneAndDelete({
          _user: userID,
          text: vendorTxt
        })
          .then(vendor => {
            if (!vendor) {
              return res.status(404).send(`${vendorTxt} was not found!`);
            }
            res.send({ vendor });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/otherVendors", authenticate, (req, res) => {
  const userID = req.user._id;
  const vendorTxt = req.body.text;

  OtherVendor.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(otherVendor => {
      if (otherVendor.length > 0) {
        res
          .status(409)
          .send(
            `Can't Add Vendor/Supplier ${vendorTxt} because it is already being used!`
          );
      } else {

        const vendor = new OtherVendor({
          _user: userID,
          text: vendorTxt
        });
        vendor.save().then(
          doc => {
            res.send(doc);
          },
          e => {
            throw (error);
          }
        );

      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get("/otherVendors", authenticate, (req, res) => {
  OtherVendor.find({
    _user: req.user._id
  }).then(
    otherVendors => {
      res.send({ otherVendors });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/otherVendors", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Vendor to Delete was not Found!");
  }
  const vendorTxt = req.body.text;
  OtherExpense.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(otherexpense => {
      if (otherexpense.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Vendor/Supplier that is already being used!"
          );
      } else {
        OtherVendor.findOneAndDelete({
          _user: userID,
          text: vendorTxt
        })
          .then(vendor => {
            if (!vendor) {
              return res.status(404).send(`${vendorTxt} was not found!`);
            }
            res.send({ vendor });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/rentalVendors", authenticate, (req, res) => {
  const userID = req.user._id;
  const vendorTxt = req.body.text;

  RentalVendor.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(rentalVendor => {
      if (rentalVendor.length > 0) {
        res
          .status(409)
          .send(
            `Can't Add Vendor/Supplier ${vendorTxt} because it is already being used!`
          );
      } else {

        const vendor = new RentalVendor({
          _user: userID,
          text: vendorTxt
        });
        vendor.save().then(
          doc => {
            res.send(doc);
          },
          e => {
            throw (error);
          }
        );

      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get("/rentalVendors", authenticate, (req, res) => {
  RentalVendor.find({
    _user: req.user._id
  }).then(
    rentalVendors => {
      res.send({ rentalVendors });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/rentalVendors", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Vendor to Delete was not Found!");
  }
  const vendorTxt = req.body.text;
  RentalExpense.find({
    _user: userID,
    vendorSelect: vendorTxt
  })
    .then(rentalexpense => {
      if (rentalexpense.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Vendor/Supplier that is already being used!"
          );
      } else {
        RentalVendor.findOneAndDelete({
          _user: userID,
          text: vendorTxt
        })
          .then(vendor => {
            if (!vendor) {
              return res.status(404).send(`${vendorTxt} was not found!`);
            }
            res.send({ vendor });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/incomeClients", authenticate, (req, res) => {
  const client = new IncomeClient({
    _user: req.user._id,
    text: req.body.text
  });
  client.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Client you provided is already in use.",
          fix: "Enter a different Client to continue"
        };
        return res.status(400).send(tempObj);
      } else {
        res.send(e);
      }
    }
  );
});

app.get("/incomeClients", authenticate, (req, res) => {
  IncomeClient.find({
    _user: req.user._id
  }).then(
    incomeClients => {
      res.send({ incomeClients });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/incomeClients", authenticate, (req, res) => {
  const userID = req.user._id;

  if (!req.body.text) {
    return res.status(404).send("Client to Delete was not Found!");
  }
  const clientTxt = req.body.text;
  IncomeEntry.find({
    _user: userID,
    vendorSelect: clientTxt
  })
    .then(incomeEntrie => {
      if (incomeEntrie.length > 0) {
        res
          .status(409)
          .send(
            "Can't delete a Client/Customer that is already being used!"
          );
      } else {
        IncomeClient.findOneAndDelete({
          _user: userID,
          text: clientTxt
        })
          .then(client => {
            if (!client) {
              return res.status(404).send(`${clientTxt} was not found!`);
            }
            res.send({ client });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

//Vehicle Log
//new Date(req.body.dateYear, req.body.dateMonth, req.body.dateDay),
app.post("/vehicleLog", authenticate, (req, res) => {

  tempVLogDate = new Date(req.body.startYear, req.body.startMonth, req.body.startDay);
  tempVLogDate.setUTCHours(0);

  VehicleLog.find({
    _user: req.user._id,
    logDate: tempVLogDate
  }).then((doc) => {
    if (doc.length > 0) {
      let foundID = doc[0]._id;
      let otherVehicleBus = 0;
      let otherVehiclePers = 0;

      if (req.body.carNum === '1') {
        if (doc[0].PersKMV2) {
          otherVehiclePers = doc[0].PersKMV2;
        }
        if (doc[0].BusKMV2) {
          otherVehicleBus = doc[0].BusKMV2;
        }
        VehicleLog.findOneAndUpdate(
          {
            _id: foundID,
            _user: req.user._id
          },
          {
            $set: {
              _user: req.user._id,
              PersKMV1: req.body.PersKMV1,
              BusKMV1: req.body.BusKMV1,
              PersKMV2: otherVehiclePers,
              BusKMV2: otherVehicleBus
            }
          }
        ).then(
          doc => {
            res.status(200).send('Vehicle 1 Log Updated Successfully!');
          },
          e => {
            res.status(400).send(e);
          }
        );
      } else if (req.body.carNum === '2') {
        if (doc[0].PersKMV1) {
          otherVehiclePers = doc[0].PersKMV1;
        }
        if (doc[0].BusKMV1) {
          otherVehicleBus = doc[0].BusKMV1;
        }
        VehicleLog.findOneAndUpdate(
          {
            _id: foundID,
            _user: req.user._id
          },
          {
            $set: {
              _user: req.user._id,
              PersKMV1: otherVehiclePers,
              BusKMV1: otherVehicleBus,
              PersKMV2: req.body.PersKMV2,
              BusKMV2: req.body.BusKMV2
            }
          }
        ).then(
          doc => {
            res.status(200).send('Vehicle 2 Log Updated Successfully!');
            return;

          },
          e => {
            res.status(400).send(e);
            return;
          }
        );
      }
    } else {
      if (req.body.carNum === '1') {
        vehicleLog = new VehicleLog({
          _user: req.user._id,
          logDate: tempVLogDate,
          PersKMV1: req.body.PersKMV1,
          BusKMV1: req.body.BusKMV1,
          PersKMV2: 0,
          BusKMV2: 0
        });
        vehicleLog.save().then(
          doc => {
            res.send('Vehicle 1 Log Added Successfully!');
          },
          e => {
            res.send(e);
          }
        );
      } else if (req.body.carNum === '2') {
        vehicleLog = new VehicleLog({
          _user: req.user._id,
          logDate: tempVLogDate,
          PersKMV1: 0,
          BusKMV1: 0,
          PersKMV2: req.body.PersKMV2,
          BusKMV2: req.body.BusKMV2
        });
        vehicleLog.save().then(
          doc => {
            res.send('Vehicle 2 Log Added Successfully!');
          },
          e => {
            res.send(e);
          }
        );
      }
    }
  });
});

app.get("/vehicleLog", authenticate, (req, res) => {
  VehicleLog.find({
    _user: req.user._id
  }).then(
    vLogs => {
      res.send({ vLogs });
    },
    e => {
      res.status(400).send(e);
    }
  );
});
//This code will find all Users Vehicle log and set to 0 both Pers and Bus logs for specified Vehicle.
app.post("/vehicleLogmulti", authenticate, (req, res) => {
  if (req.body.carNum === '1') {
    VehicleLog.updateMany({
      _user: req.user._id,
    }, {
        $set: {
          _user: req.user._id,
          PersKMV1: 0,
          BusKMV1: 0
        }
      }).then((vLogs) => {
        res.send('Successfully Zeroed all Vehicle 1 Logs.');
      }).catch((e) => {
        res.status(400).send(e);
      });
  } else if (req.body.carNum === '2') {
    VehicleLog.updateMany({
      _user: req.user._id,
    }, {
        $set: {
          _user: req.user._id,
          PersKMV2: 0,
          BusKMV2: 0
        }
      }).then((vLogs) => {
        res.send('Successfully Zeroed all Vehicle 2 Logs.');
      }).catch((e) => {
        res.status(400).send(e);
      });
  }


});
//This code deletes all vehicle logs for user
app.delete("/vehicleLog", authenticate, (req, res) => {
  VehicleLog.remove({
    _user: req.user._id
  }).then(
    vLogs => {
      res.send('All Vehicle Log for Both Vehicle 1 and Vehicle 2 have been Successfully Deleted!');
    },
    e => {
      res.status(400).send(e);
    }
  );
});
//Misc Data

app.post("/miscData", authenticate, (req, res) => {
  const miscData = new MiscData({
    _user: req.user._id,
    odometerV1: req.body.odometerV1,
    odometerV2: req.body.odometerV2,
    lockDate: req.body.lockDate,
    homePercJan: req.body.homePercJan,
    homePercFeb: req.body.homePercFeb,
    homePercMar: req.body.homePercMar,
    homePercApr: req.body.homePercApr,
    homePercMay: req.body.homePercMay,
    homePercJun: req.body.homePercJun,
    homePercJul: req.body.homePercJul,
    homePercAug: req.body.homePercAug,
    homePercSep: req.body.homePercSep,
    homePercOct: req.body.homePercOct,
    homePercNov: req.body.homePercNov,
    homePercDec: req.body.homePercDec,
    NLPSTExempt: req.body.NLPSTExempt,
    PEIPSTExempt: req.body.PEIPSTExempt,
    NSPSTExempt: req.body.NSPSTExempt,
    NBPSTExempt: req.body.NBPSTExempt,
    QCPSTExempt: req.body.QCPSTExempt,
    ONPSTExempt: req.body.ONPSTExempt,
    MBPSTExempt: req.body.MBPSTExempt,
    SKPSTExempt: req.body.SKPSTExempt,
    ABPSTExempt: req.body.ABPSTExempt,
    BCPSTExempt: req.body.BCPSTExempt,
    YTPSTExempt: req.body.YTPSTExempt,
    NTPSTExempt: req.body.NTPSTExempt,
    NUPSTExempt: req.body.NUPSTExempt,
    IncludeRentalHSTForm: req.body.IncludeRentalHSTForm

  });
  miscData.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
});

app.patch("/miscData/:_id", authenticate, (req, res) => {

  let tempID = req.params._id;
  let userID = req.user._id;
  MiscData.findOneAndUpdate(
    {
      _id: tempID,
      _user: userID
    },
    {
      $set: {
        _user: req.user._id,
        odometerV1: req.body.odometerV1,
        odometerV2: req.body.odometerV2,
        lockDate: req.body.lockDate,
        homePercJan: req.body.homePercJan,
        homePercFeb: req.body.homePercFeb,
        homePercMar: req.body.homePercMar,
        homePercApr: req.body.homePercApr,
        homePercMay: req.body.homePercMay,
        homePercJun: req.body.homePercJun,
        homePercJul: req.body.homePercJul,
        homePercAug: req.body.homePercAug,
        homePercSep: req.body.homePercSep,
        homePercOct: req.body.homePercOct,
        homePercNov: req.body.homePercNov,
        homePercDec: req.body.homePercDec,
        NLPSTExempt: req.body.NLPSTExempt,
        PEIPSTExempt: req.body.PEIPSTExempt,
        NSPSTExempt: req.body.NSPSTExempt,
        NBPSTExempt: req.body.NBPSTExempt,
        QCPSTExempt: req.body.QCPSTExempt,
        ONPSTExempt: req.body.ONPSTExempt,
        MBPSTExempt: req.body.MBPSTExempt,
        SKPSTExempt: req.body.SKPSTExempt,
        ABPSTExempt: req.body.ABPSTExempt,
        BCPSTExempt: req.body.BCPSTExempt,
        YTPSTExempt: req.body.YTPSTExempt,
        NTPSTExempt: req.body.NTPSTExempt,
        NLPSTExempt: req.body.NLPSTExempt,
        IncludeRentalHSTForm: req.body.IncludeRentalHSTForm
      }
    }
  ).then(
    doc => {
      res.status(200).send('Changes Updated Successfully"');
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/miscData", authenticate, (req, res) => {

  MiscData.find({
    _user: req.user._id,
  }).then(
    miscData => {
      res.send({ miscData });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

//This login post is used to get the Token so the User will be able to Save/Delete/Update his data as he would after the initial User Setup
app.post("/users/login", (req, res) => {
  let body = _.pick(req.body, ["firstName", "lastName", "email", "password"]);
  User.findByCredentials(
    body.firstName,
    body.lastName,
    body.email,
    body.password
  )
    .then(user => {
      return user.generateAuthToken().then(token => {
        let tempObj = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          ExpireDate: user.ExpireDate,
          token: token
        };
        res.send(tempObj);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.patch("/users/login", authenticate, (req, res) => {
  let userID = req.user._id;

  User.findOneAndUpdate(
    {
      _id: userID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    {
      $set: {
        _id: userID,
        firstName: req.body.new_FirstName,
        lastName: req.body.new_LastName,
        email: req.body.new_Email
      }
    },
    { returnOriginal: false }
  )
    .then(
      doc => {
        let mypackage = {
          message: 'User Changes Updated Successfully!',
          data: doc
        };
        res.status(200).send(mypackage);
      },
      e => {
        res.status(400).send(e);
      }
    );
});


app.post("/users", (req, res) => {
  //console.log(JSON.stringify(req.body, undefined, 2));
  var body = _.pick(req.body, ["firstName", "lastName", "email", "password", "ExpireDate"]);
  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      let tempObj = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token
      };
      res.send(tempObj);
    })
    .catch(e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Email you provided is already in use.",
          fix: "Enter a different email to continue"
        };
        return res.status(400).send(tempObj);
      }
      res.status(400).send(e.code);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.delete("/users/me/token", authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

//Payments
app.post("/payments", authenticate, async (req, res) => {

  const payment = new PaymentEntry({
    _user: req.user._id,
    paymentDate: req.body.paymentDate,
    taxAmt: req.body.taxAmt,
    hstAmt: req.body.hstAmt,
    pstAmt: req.body.pstAmt,
    description: req.body.description
  });
  payment.save().then(
    doc => {
      res.send('Payment was Successfully Saved');
    },
    e => {
      res.send(e);
    }
  );

});

//HST Payment Only
app.get("/hstPayments", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }
  PaymentEntry.find({
    _user: req.user._id,
    paymentDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    },
    pstAmt: 0,
    taxAmt: 0
  }).then(
    paymentEntries => {
      res.send({ paymentEntries });
    },
    e => {
      res.status(400).send(e);
    }
  );

});

app.delete("/payments/:_id", authenticate, (req, res) => {
  const tempID = req.params._id;
  const userID = req.user._id;
  if (!ObjectID.isValid(tempID)) {
    return res
      .status(404)
      .send("ID is not valid! Unable to complete the Delete request!");
  }
  PaymentEntry
    .findOneAndDelete({
      _id: tempID,
      _user: userID
    })
    .then(paymentEntry => {
      if (!paymentEntry) {
        return res
          .status(404)
          .send(errMsg);
      }
      res.send({ paymentEntry });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.patch("/payments/:_id", authenticate, (req, res) => {
  let tempID = req.params._id;
  let userID = req.user._id;


  PaymentEntry.findOneAndUpdate(
    {
      _id: tempID,
      _user: userID
    },
    {
      $set: {
        _user: userID,
        paymentDate: req.body.paymentDate,
        taxAmt: req.body.taxAmt,
        hstAmt: req.body.hstAmt,
        pstAmt: req.body.pstAmt,
        description: req.body.description
      }
    },
    { returnOriginal: false }
  )
    .then(
      doc => {
        let mypackage = {
          message: 'Payment Updated Successfully!',
          NewPayment: doc
        };
        res.status(200).send(mypackage);
      },
      e => {
        res.status(400).send(e);
      }
    );
});

//All Payments
app.get("/payments", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }

  PaymentEntry.find({
    _user: req.user._id,
    paymentDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    }
  }).then(
    paymentEntries => {
      res.send({ paymentEntries });
    },
    e => {
      res.status(400).send(e);
    }
  );

});

//PST Payments Only
app.get("/pstPayments", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);

  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }
  PaymentEntry.find({
    _user: req.user._id,
    paymentDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    },
    hstAmt: 0,
    taxAmt: 0
  }).then(
    paymentEntries => {
      res.send({ paymentEntries });
    },
    e => {
      res.status(400).send(e);
    }
  );

});

//Tax Payments Only
app.get("/taxPayments", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }
  PaymentEntry.find({
    _user: req.user._id,
    paymentDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    },
    hstAmt: 0,
    pstAmt: 0
  }).then(
    paymentEntries => {
      res.send({ paymentEntries });
    },
    e => {
      res.status(400).send(e);
    }
  );

});

//Fixed Asstes
app.post("/fixedAssets", authenticate, async (req, res) => {

  const asset = new FixedAsset({
    _user: req.user._id,
    purchaseDate: req.body.purchaseDate,
    claimDate: req.body.claimDate,
    description: req.body.description,
    startValue: req.body.startValue,
    busPercent: req.body.busPercent,
    claimAmt: req.body.claimAmt,
    itcClaimAmt: req.body.itcClaimAmt,
    itc_pstClaimAmt: req.body.itc_pstClaimAmt
  });
  asset.save().then(
    doc => {
      res.send('Fixed Asset was Successfully Saved');
    },
    e => {
      res.send(e);
    }
  );

});

app.delete("/fixedAssets/:_id", authenticate, (req, res) => {
  const tempID = req.params._id;
  const userID = req.user._id;
  if (!ObjectID.isValid(tempID)) {
    return res
      .status(404)
      .send("ID is not valid! Unable to complete the Delete request!");
  }
  FixedAsset
    .findOneAndDelete({
      _id: tempID,
      _user: userID
    })
    .then(asset => {
      if (!asset) {
        return res
          .status(404)
          .send(errMsg);
      }
      res.send({ asset });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.patch("/fixedAssets/:_id", authenticate, (req, res) => {
  let tempID = req.params._id;
  let userID = req.user._id;

  FixedAsset.findOneAndUpdate(
    {
      _id: tempID,
      _user: userID
    },
    {
      $set: {
        _user: userID,
        purchaseDate: req.body.purchaseDate,
        claimDate: req.body.claimDate,
        description: req.body.description,
        startValue: req.body.startValue,
        busPercent: req.body.busPercent,
        claimAmt: req.body.claimAmt,
        itcClaimAmt: req.body.itcClaimAmt,
        itc_pstClaimAmt: req.body.itc_pstClaimAmt
      }
    },
    { returnOriginal: false }
  )
    .then(
      doc => {
        let mypackage = {
          message: 'Fixed Asset Updated Successfully!',
          NewAsset: doc
        };
        res.status(200).send(mypackage);
      },
      e => {
        res.status(400).send(e);
      }
    );
});

app.get("/fixedAssets", authenticate, (req, res) => {
  let tempStartDate;
  let tempEndDate;

  if (req.query.startYear) {
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay);
    tempStartDate.setUTCHours(0);
  } else {
    tempStartDate = new Date(2018, 0, 1);
    tempStartDate.setUTCHours(0);
  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay);
    tempEndDate.setUTCHours(0);
  } else {
    tempEndDate = new Date(2018, 11, 31);
    tempEndDate.setUTCHours(0);
  }
  FixedAsset.find({
    _user: req.user._id,
    claimDate: {
      '$gte': tempStartDate,
      '$lte': tempEndDate
    }
  }).then(
    assets => {
      res.send({ assets });
    },
    e => {
      res.status(400).send(e);
    }
  );

});

// GST/HST Return

app.post("/return_data", authenticate, async (req, res) => {
  const return_data = new Return_Data({
    _user: req.user._id,
    LineNumber: req.body.LineNumber,
    JanAmt: req.body.JanAmt,
    FebAmt: req.body.FebAmt,
    MarAmt: req.body.MarAmt,
    AprAmt: req.body.AprAmt,
    MayAmt: req.body.MayAmt,
    JunAmt: req.body.JunAmt,
    JulAmt: req.body.JulAmt,
    AugAmt: req.body.AugAmt,
    SepAmt: req.body.SepAmt,
    OctAmt: req.body.OctAmt,
    NovAmt: req.body.NovAmt,
    DecAmt: req.body.DecAmt,
    Q1Amt: req.body.Q1Amt,
    Q2Amt: req.body.Q2Amt,
    Q3Amt: req.body.Q3Amt,
    Q4Amt: req.body.Q4Amt,
    YearAmt: req.body.YearAmt,
    JanPSTAmt: req.body.JanPSTAmt,
    FebPSTAmt: req.body.FebPSTAmt,
    MarPSTAmt: req.body.MarPSTAmt,
    AprPSTAmt: req.body.AprPSTAmt,
    MayPSTAmt: req.body.MayPSTAmt,
    JunPSTAmt: req.body.JunPSTAmt,
    JulPSTAmt: req.body.JulPSTAmt,
    AugPSTAmt: req.body.AugPSTAmt,
    SepPSTAmt: req.body.SepPSTAmt,
    OctPSTAmt: req.body.OctPSTAmt,
    NovPSTAmt: req.body.NovPSTAmt,
    DecPSTAmt: req.body.DecPSTAmt,
    Q1PSTAmt: req.body.Q1PSTAmt,
    Q2PSTAmt: req.body.Q2PSTAmt,
    Q3PSTAmt: req.body.Q3PSTAmt,
    Q4PSTAmt: req.body.Q4PSTAmt,
    YearPSTAmt: req.body.YearPSTAmt
  });
  return_data.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );

});


app.patch("/return_data/:_id", authenticate, (req, res) => {
  let tempID = req.params._id;
  let userID = req.user._id;
  let mySetObj = {};

  if (req.body.YearAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      YearAmt: req.body.YearAmt
    }
  }

  if (req.body.Q1Amt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q1Amt: req.body.Q1Amt
    }
  }

  if (req.body.Q2Amt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q2Amt: req.body.Q2Amt
    }
  }

  if (req.body.Q3Amt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q3Amt: req.body.Q3Amt
    }
  }

  if (req.body.Q4Amt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q4Amt: req.body.Q4Amt
    }
  }

  if (req.body.JanAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      JanAmt: req.body.JanAmt
    }
  }

  if (req.body.FebAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      FebAmt: req.body.FebAmt
    }
  }

  if (req.body.MarAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      MarAmt: req.body.MarAmt
    }
  }

  if (req.body.AprAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      AprAmt: req.body.AprAmt
    }
  }

  if (req.body.MayAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      MayAmt: req.body.MayAmt
    }
  }

  if (req.body.JunAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      JunAmt: req.body.JunAmt
    }
  }

  if (req.body.JulAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      JulAmt: req.body.JulAmt
    }
  }

  if (req.body.AugAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      AugAmt: req.body.AugAmt
    }
  }

  if (req.body.SepAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      SepAmt: req.body.SepAmt
    }
  }

  if (req.body.OctAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      OctAmt: req.body.OctAmt
    }
  }

  if (req.body.NovAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      NovAmt: req.body.NovAmt
    }
  }

  if (req.body.DecAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      DecAmt: req.body.DecAmt
    }
  }

  if (req.body.YearPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      YearPSTAmt: req.body.YearPSTAmt
    }
  }

  if (req.body.Q1PSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q1PSTAmt: req.body.Q1PSTAmt
    }
  }

  if (req.body.Q2PSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q2PSTAmt: req.body.Q2PSTAmt
    }
  }

  if (req.body.Q3PSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q3PSTAmt: req.body.Q3PSTAmt
    }
  }

  if (req.body.Q4PSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      Q4PSTAmt: req.body.Q4PSTAmt
    }
  }

  if (req.body.JanPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      JanPSTAmt: req.body.JanPSTAmt
    }
  }

  if (req.body.FebPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      FebPSTAmt: req.body.FebPSTAmt
    }
  }

  if (req.body.MarPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      MarPSTAmt: req.body.MarPSTAmt
    }
  }

  if (req.body.AprPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      AprPSTAmt: req.body.AprPSTAmt
    }
  }

  if (req.body.MayPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      MayPSTAmt: req.body.MayPSTAmt
    }
  }

  if (req.body.JunPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      JunPSTAmt: req.body.JunPSTAmt
    }
  }

  if (req.body.JulPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      JulPSTAmt: req.body.JulPSTAmt
    }
  }

  if (req.body.AugPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      AugPSTAmt: req.body.AugPSTAmt
    }
  }

  if (req.body.SepPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      SepPSTAmt: req.body.SepPSTAmt
    }
  }

  if (req.body.OctPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      OctPSTAmt: req.body.OctPSTAmt
    }
  }

  if (req.body.NovPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      NovPSTAmt: req.body.NovPSTAmt
    }
  }

  if (req.body.DecPSTAmt !== undefined) {
    mySetObj = {
      _user: userID,
      LineNumber: req.body.LineNumber,
      DecPSTAmt: req.body.DecPSTAmt
    }
  }

  Return_Data.findOneAndUpdate(
    {
      _id: tempID,
      _user: userID
    },
    {
      $set: mySetObj,
    },
    { returnOriginal: false }
  )
    .then(
      doc => {
        let mypackage = {
          message: 'Return Data Updated Successfully!',
          NewAsset: doc
        };
        res.status(200).send(mypackage);
      },
      e => {
        res.status(400).send(e);
      }
    );
});

app.get("/return_data", authenticate, (req, res) => {

  Return_Data.find({
    _user: req.user._id
  }).then(
    return_data => {
      res.send({ return_data });
    },
    e => {
      res.status(400).send(e);
    }
  );

});


//Images - Receipts
function uploadToS3(file, newName) {

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: newName,
      Body: file.data,
    };
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, function (err, data) {
        if (err) {
          // console.log('error in callback');
          reject('Unable to Save Image!')
        }
        //console.log('success');
        //console.log(data);
        resolve(data);
      });
    });

  });
}

function getImageFromS3(fileName) {
  let s3 = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.BUCKET_NAME,
  });
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName
  };
  return new Promise((resolve, reject) => {
    s3.getObject(params, function (err, data) {
      if (err) reject(err, err.stack); // an error occurred
      else resolve(data);           // successful response
      /*
      data = {
       AcceptRanges: "bytes", 
       ContentLength: 3191, 
       ContentType: "image/jpeg", 
       ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
       LastModified: <Date Representation>, 
       Metadata: {
       }, 
       TagCount: 2, 
       VersionId: "null"
      }
      */
    });
  });

};

function deleteImageFromS3(fileName) {
  let s3 = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.BUCKET_NAME,
  });
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName
  };
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, function (err, data) {
      if (err) reject(err, err.stack); // an error occurred
      else resolve(data);           // successful response
      /*
      data = {
       AcceptRanges: "bytes", 
       ContentLength: 3191, 
       ContentType: "image/jpeg", 
       ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
       LastModified: <Date Representation>, 
       Metadata: {
       }, 
       TagCount: 2, 
       VersionId: "null"
      }
      */
    });
  })

}


app.listen(port, () => {
  console.log(`Started on Port ${port}`);
});



// fs.exists(`./server/imageUpload/${userID}_${tempID}.jpg`, exists => {
  //   if (exists) {
  //     fs.unlink(`./server/imageUpload/${userID}_${tempID}.jpg`, function (err) {
  //       if (err) throw err;
  //       // console.log("File Deleted.");
  //     });
  //   } else {
  //     return "Receipt was not found";
  //   }
  // });


  // function renameTheImage(userID, expenseID, myImg) {
//   fs.exists("./server/imageUpload/myNewImg.jpg", exists => {
//     if (exists) {
//       fs.rename(
//         "./server/imageUpload/myNewImg.jpg",
//         `./server/imageUpload/${userID}_${expenseID}.jpg`,
//         function (err) {
//           if (err) throw err;
//           // console.log("File Renamed.");
//         }
//       );

//     } else {
//       return "Receipt was not found";
//     }
//   });
// }

// function deleteTheDefaultImage(userID, tempID) {
//   fs.exists(`./server/imageUpload/myNewImg.jpg`, exists => {
//     if (exists) {
//       fs.unlink(`./server/imageUpload/myNewImg.jpg`, function (err) {
//         if (err) throw err;
//         // console.log("File Renamed.");
//       });
//     } else {
//       return "Receipt was not found";
//     }
//   });
// }


// app.get("/vehicleCategorie", (req, res) => {
//   VehicleCategorie.find({}).then(
//     vehicleCategories => {
//       res.send({ vehicleCategories });
//     },
//     e => {
//       res.status(400).send(e);
//     }
//   );
// });

// app.post("/vehicleCategories", (req, res) => {
//   const vehicleCategorie = new VehicleCategorie({
//     text: req.body.text,
//     taxed: req.body.taxed
//   });
//   vehicleCategorie.save().then(
//     doc => {
//       res.send(doc);
//     },
//     e => {
//       res.send(e);
//     }
//   );
// });

// app.get("/businessCategorie", (req, res) => {
//   BusinessCategorie.find({}).then(
//     businessCategories => {
//       res.send({ businessCategories });
//     },
//     e => {
//       res.status(400).send(e);
//     }
//   );
// });

// app.post("/businessCategorie", (req, res) => {
//   const businessCategorie = new BusinessCategorie({
//     text: req.body.text,
//     taxed: req.body.taxed
//   });
//   businessCategorie.save().then(
//     doc => {
//       res.send(doc);
//     },
//     e => {
//       res.send(e);
//     }
//   );
// });

// app.get("/homeCategorie", (req, res) => {
//   HomeCategorie.find({}).then(
//     homeCategories => {
//       res.send({ homeCategories });
//     },
//     e => {
//       res.status(400).send(e);
//     }
//   );
// });

// app.post("/homeCategorie", (req, res) => {
//   const homeCategories = new HomeCategorie({
//     text: req.body.text,
//     taxed: req.body.taxed
//   });
//   homeCategories.save().then(
//     doc => {
//       res.send(doc);
//     },
//     e => {
//       res.send(e);
//     }
//   );
// });

// app.get("/otherCategorie", (req, res) => {
//   OtherCategorie.find({}).then(
//     otherCategories => {
//       res.send({ otherCategories });
//     },
//     e => {
//       res.status(400).send(e);
//     }
//   );
// });

// app.post("/otherCategorie", (req, res) => {
//   const otherCategories = new OtherCategorie({
//     text: req.body.text,
//     taxed: req.body.taxed
//   });
//   otherCategories.save().then(
//     doc => {
//       res.send(doc);
//     },
//     e => {
//       res.send(e);
//     }
//   );
// });

// app.get("/rentalCategorie", (req, res) => {
//   RentalCategorie.find({}).then(
//     rentalCategories => {
//       res.send({ rentalCategories });
//     },
//     e => {
//       res.status(400).send(e);
//     }
//   );
// });

// app.post("/rentalCategorie", (req, res) => {
//   const rentalCategories = new RentalCategorie({
//     text: req.body.text,
//     taxed: req.body.taxed
//   });
//   rentalCategories.save().then(
//     doc => {
//       res.send(doc);
//     },
//     e => {
//       res.send(e);
//     }
//   );
// });



    //to get the data from a file path use fs.readFileSync(path)