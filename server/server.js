const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const { ObjectID } = require("mongodb");
//const multer = require("multer");
// const uploadImg = multer({ dest: "./../expReceipts/" });
const _ = require("lodash");

const port = process.env.PORT || 3000;

const { mongoose } = require("./db/mongoose");
const { CarExpense, CarExpense2 } = require("./models/expense");
const { BusinessExpense } = require("./models/businessExpense");
const { HomeExpense } = require("./models/homeExpense");
const { OtherExpense } = require("./models/otherExpense");
const { RentalExpense } = require("./models/rentalExpense");
const { IncomeEntry } = require("./models/incomeEntry");
const { RentalIncomeEntry } = require("./models/rentalIncomeEntry");
const { VehicleLog } = require("./models/vehicleLog");
const { MiscData } = require("./models/miscData");
const { User } = require("./models/user");
const { VehicleCategorie } = require("./models/vehicleCategorie");
const { BusinessCategorie } = require("./models/businessCategorie");
const { HomeCategorie } = require("./models/homeCategorie");
const { OtherCategorie } = require("./models/otherCategorie");
const { RentalCategorie } = require("./models/rentalCategorie");
const { IncomeParty } = require("./models/incomeParty");
const { VehicleVendor } = require("./models/vehicleVendor");
const { BusinessVendor } = require("./models/businessVendor");
const { HomeVendor } = require("./models/homeVendor");
const { OtherVendor } = require("./models/otherVendor");
const { RentalVendor } = require("./models/rentalVendor");
const { IncomeClient } = require("./models/incomeClient");
const { authenticate } = require("./middleware/authenticate");
let { EZ_ENV } = require("./config");

var app = express();
app.use(fileUpload());

//Set the KEY SECRET
EZ_ENV.secret_key = new ObjectID().toHexString();

//Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.set("views", path.join(__dirname, "../views"));
//app.use(express.static(__dirname + "/public/css"));
//app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

// app.get("/", function(req, res) {
//   res.render("index");
// });

app.post("/carExpense", authenticate, (req, res) => {
  let myCarExpense;
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
    let sampleFile = req.files.imgload;
    sampleFile.mv("./server/imageUpload/myNewImg.jpg", function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    // to get the data from a file path use fs.readFileSync(path)
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
        renameTheImage(doc._user, doc._id);
      }
      res.status(200).send(mypackage);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

function renameTheImage(userID, expenseID) {
  fs.exists("./server/imageUpload/myNewImg.jpg", exists => {
    if (exists) {
      fs.rename(
        "./server/imageUpload/myNewImg.jpg",
        `./server/imageUpload/${userID}_${expenseID}.jpg`,
        function (err) {
          if (err) throw err;
          // console.log("File Renamed.");
        }
      );
    } else {
      return "Receipt was not found";
    }
  });
}

function deleteTheDefaultImage(userID, tempID) {
  fs.exists(`./server/imageUpload/myNewImg.jpg`, exists => {
    if (exists) {
      fs.unlink(`./server/imageUpload/myNewImg.jpg`, function (err) {
        if (err) throw err;
        // console.log("File Renamed.");
      });
    } else {
      return "Receipt was not found";
    }
  });
}

function deleteTheImage(userID, tempID) {
  fs.exists(`./server/imageUpload/${userID}_${tempID}.jpg`, exists => {
    if (exists) {
      fs.unlink(`./server/imageUpload/${userID}_${tempID}.jpg`, function (err) {
        if (err) throw err;
        // console.log("File Deleted.");
      });
    } else {
      return "Receipt was not found";
    }
  });
}

app.post("/carExpenseRecur", authenticate, (req, res) => {
  let myStartMonth = req.body.dateMonth;
  let myStartYear = req.body.dateYear;
  let myStartDay = req.body.dateDay;
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
        myStartYear === 2024
      ) {
        myTempDate = new Date(myStartYear, i, 29);
      } else {
        myTempDate = new Date(myStartYear, i, 28);
      }
    }

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
    tempStartDate = new Date(req.query.startYear, req.query.startMonth, req.query.startDay).toISOString();
  } else {
    tempStartDate = new Date(2018, 0, 1).toISOString();

  }

  if (req.query.endYear) {
    tempEndDate = new Date(req.query.endYear, req.query.endMonth, req.query.endDay).toISOString();
  } else {
    tempEndDate = new Date(2018, 11, 31).toISOString();
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

//This get method is used to fetch the image only when user loads an expense from the expense report
app.get("/carExpenseImg/:_id", authenticate, (req, res) => {
  const tempID = req.params._id;
  let vehicleNum = req.query.carNumber;
  if (!ObjectID.isValid(tempID)) {
    return res
      .status(404)
      .send("ID is not valid! Unable to complete the Find request!");
  }
  let myTempModel;
  let errMsg = 'No expense was found with the selected ID!';
  if (vehicleNum === "1") {
    myTempModel = CarExpense;
  } else if (vehicleNum === "2") {
    myTempModel = CarExpense2;
  } else if (vehicleNum === "Bus") {
    myTempModel = BusinessExpense;
  } else if (vehicleNum === "Home") {
    myTempModel = HomeExpense;
  } else if (vehicleNum === "Other") {
    myTempModel = OtherExpense;
  } else if (vehicleNum === "Rental") {
    myTempModel = RentalExpense;
  } else if (vehicleNum === "Income") {
    if (req.query.source === "Rental") {
      myTempModel = RentalIncomeEntry;
    } else {
      myTempModel = IncomeEntry;
    }
    errMsg = 'No Revenue Entry was found with selected ID!'
  }

  myTempModel
    .findOne({
      _id: tempID,
      _user: req.user._id
    })
    .then(carexpense => {
      if (!carexpense) {
        return res
          .status(404)
          .send(errMsg);
      }

      if (carexpense.receiptPath) {
        fs.readFile(
          `./server/imageUpload/${req.user._id}_${tempID}.jpg`,
          (err, data) => {
            if (err) {
              res.status(400).send(`Unable to retrieve the Image!  ${err}`);
            } else {
              // console.dir(data);
              res.send({ data });
            }
          }
        );
      } else {
        res.send("Image could not be found");
      }
    })
    .catch(e => {
      res.status(400).send(e);
    });
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
              // console.dir(data);
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

app.patch("/carExpense/:_id", authenticate, (req, res) => {
  let tempID = req.params._id;
  let userID = req.user._id;
  let tempVehicleModel;
  let msgSuccess = "Expense Updated Successfully";
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
    sampleFile.mv("./server/imageUpload/myNewImg.jpg", function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

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
          deleteTheImage(userID, tempID); //Checks if it had image and if so deletes it
          renameTheImage(userID, tempID); //Renames the defaultmyNewImage that was created
          let mypackage = {
            message: msgSuccess,
            NewExpense: doc
          };
          res.status(200).send(mypackage);
        },
        e => {
          deleteTheDefaultImage(userID, tempID);
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

app.get("/vehicleCategorie", (req, res) => {
  VehicleCategorie.find({}).then(
    vehicleCategories => {
      res.send({ vehicleCategories });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/vehicleCategories", (req, res) => {
  const vehicleCategorie = new VehicleCategorie({
    text: req.body.text,
    taxed: req.body.taxed
  });
  vehicleCategorie.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
});

app.get("/businessCategorie", (req, res) => {
  BusinessCategorie.find({}).then(
    businessCategories => {
      res.send({ businessCategories });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/businessCategorie", (req, res) => {
  const businessCategorie = new BusinessCategorie({
    text: req.body.text,
    taxed: req.body.taxed
  });
  businessCategorie.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
});

app.get("/homeCategorie", (req, res) => {
  HomeCategorie.find({}).then(
    homeCategories => {
      res.send({ homeCategories });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/homeCategorie", (req, res) => {
  const homeCategories = new HomeCategorie({
    text: req.body.text,
    taxed: req.body.taxed
  });
  homeCategories.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
});

app.get("/otherCategorie", (req, res) => {
  OtherCategorie.find({}).then(
    otherCategories => {
      res.send({ otherCategories });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/otherCategorie", (req, res) => {
  const otherCategories = new OtherCategorie({
    text: req.body.text,
    taxed: req.body.taxed
  });
  otherCategories.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
});

app.get("/rentalCategorie", (req, res) => {
  RentalCategorie.find({}).then(
    rentalCategories => {
      res.send({ rentalCategories });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/rentalCategorie", (req, res) => {
  const rentalCategories = new RentalCategorie({
    text: req.body.text,
    taxed: req.body.taxed
  });
  rentalCategories.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.send(e);
    }
  );
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
  const vendor = new VehicleVendor({
    _user: req.user._id,
    text: req.body.text
  });
  vendor.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Vendor you provided is already in use.",
          fix: "Enter a different Vendor to continue"
        };
        return res.status(400).send(tempObj);
      } else {
        res.send(e);
      }
    }
  );
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

app.patch("/vehicleVendors/:_id", authenticate, (req, res) => {
  let tempID = req.params._id;
  let userID = req.user._id;

  VehicleVendor.findOneAndUpdate(
    {
      _id: tempID,
      _user: userID
    },
    {
      $set: {
        _user: req.user._id,
        text: req.body.text
      }
    }
  ).then(
    doc => {
      res.status(200).send('Vendor Updated Successfully"');
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/businessVendors", authenticate, (req, res) => {
  const vendor = new BusinessVendor({
    _user: req.user._id,
    text: req.body.text
  });
  vendor.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Vendor you provided is already in use.",
          fix: "Enter a different Vendor to continue"
        };
        return res.status(400).send(tempObj);
      } else {
        res.send(e);
      }
    }
  );
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
  const vendor = new HomeVendor({
    _user: req.user._id,
    text: req.body.text
  });
  vendor.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Vendor you provided is already in use.",
          fix: "Enter a different Vendor to continue"
        };
        return res.status(400).send(tempObj);
      } else {
        res.send(e);
      }
    }
  );
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
  const vendor = new OtherVendor({
    _user: req.user._id,
    text: req.body.text
  });
  vendor.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Vendor you provided is already in use.",
          fix: "Enter a different Vendor to continue"
        };
        return res.status(400).send(tempObj);
      } else {
        res.send(e);
      }
    }
  );
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
  const vendor = new RentalVendor({
    _user: req.user._id,
    text: req.body.text
  });
  vendor.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      if (e.code === 11000) {
        let tempObj = {
          title: "Duplicate Error",
          body: "The Vendor you provided is already in use.",
          fix: "Enter a different Vendor to continue"
        };
        return res.status(400).send(tempObj);
      } else {
        res.send(e);
      }
    }
  );
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
  VehicleLog.find({
    _user: req.user._id,
    logDate: req.body.logDate
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
          logDate: req.body.logDate,
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
          logDate: req.body.logDate,
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

app.delete("/vehicleLog", authenticate, (req, res) => {
  console.log(req.body);
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
    _user: req.user._id
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
          token: token
        };
        res.send(tempObj);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/users", (req, res) => {
  //console.log(JSON.stringify(req.body, undefined, 2));
  var body = _.pick(req.body, ["firstName", "lastName", "email", "password"]);
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

app.listen(port, () => {
  console.log(`Started on Port ${port}`);
});
