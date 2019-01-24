//Random Function
// populateVehicleCategories();
disableEnableFullSizeVehicleImgBtn();


function displayCarExpModal(carNum) {
  $("#addCarExpenseModal").modal("show");
  let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.carExp.HSTAmtLabel.innerText = 'HST Amount'
  } else {
    myDOMs.carExp.HSTAmtLabel.innerText = 'GST Amount'
  }
  if (carNum === "1") {
    myDOMs.carExp.Selector.value = "Vehicle 1";
    myDOMs.carExp.Title.textContent = "Vehicle 1 Expense Entry Form";
  } else if (carNum === "2") {
    myDOMs.carExp.Selector.value = "Vehicle 2";
    myDOMs.carExp.Title.textContent = "Vehicle 2 Expense Entry Form";
  }
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === 0 && TableOpen === false) {
    ToggleMenuBar();
  }
}
function hideCarExpModal() {
  myDOMs.carExp.EntryForm.reset();
  removeImage();
  resetOriginalData();
  savedTransactionLocked = false;
  $("#addCarExpenseModal").modal("hide");
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === -108 && TableOpen === false) {
    ToggleMenuBar();
  }
}
function updateButtonText() {
  var showHideReceipt = document.getElementById("carExpShowHideReceipt");
  //var myCollapse = document.getElementById("collapse1");
  var isExpanded = $("#collapse1").hasClass("show");
  if (isExpanded) {
    showHideReceipt.innerText = "Show Receipt Controls";
  } else {
    showHideReceipt.innerText = "Hide Receipt Controls";
  }
}
function emptyVendorSelect() {
  for (i = myDOMs.carExp.Vendor.length - 1; i > 0; i--) {
    myDOMs.carExp.Vendor.remove(i);
  }
}
function addVehicleVendor() {
  let tempVendor = prompt("Please enter the Vendor/Supplier Name.");

  if (tempVendor === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempVendor === null) {
    return;
  }
  postmyVendor(tempVendor);
  let tempVendorCar = document.createElement("OPTION");
  txtCar = document.createTextNode(tempVendor);
  tempVendorCar.appendChild(txtCar);
  myDOMs.carExp.Vendor.add(tempVendorCar);
}
// function emptyCategorySelect() {
//   for (i = myDOMs.carExp.Category.length - 1; i > 0; i--) {
//     myDOMs.carExp.Category.remove(i);
//   }
// }

function removePagination() {
  let myTempNav = document.getElementById('navID');
  if (myTempNav) {
    if (nav.hasChildNodes()) {
      while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
      }
    }
    if (ul.hasChildNodes()) {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    }

    if (li.hasChildNodes()) {
      while (li.firstChild) {
        li.removeChild(li.firstChild);
      }
    }

    if (a.hasChildNodes()) {
      while (a.firstChild) {
        a.removeChild(a.firstChild);
      }
    }
    let myNav = document.getElementById("navID");
    document.getElementById("mainTableAlert").removeChild(myNav);
  }
}
function moveToOriginalPage(arrTblNumber) {
  switch (arrTblNumber) {
    case 1:
      goToPage(1);
      break;
    case 2:
      goToPage(2);
      break;
    case 3:
      goToPage(3);
      break;
    case 4:
      goToPage(4);
      break;
    case 5:
      goToPage(5);
      break;
    case 6:
      goToPage(6);
      break;
    case 7:
      goToPage(7);
      break;
    case 8:
      goToPage(8);
      break;
    case 9:
      goToPage(9);
      break;
    case 10:
      goToPage(10);
      break;
    case 11:
      goToPage(11);
      break;
    case 12:
      goToPage(12);
      break;
    case 13:
      goToPage(13);
      break;
    case 14:
      goToPage(14);
      break;
    case 15:
      goToPage(15);
      break;
    case 16:
      goToPage(16);
      break;
    case 17:
      goToPage(17);
      break;
    case 18:
      goToPage(18);
      break;
    case 19:
      goToPage(19);
      break;
    case 20:
      goToPage(20);
      break;
    case 21:
      goToPage(21);
      break;
    case 22:
      goToPage(22);
      break;
    case 23:
      goToPage(23);
      break;
    case 24:
      goToPage(24);
  }
}
function base64ArrayBuffer(arrayBuffer) {
  var base64 = "";
  var encodings =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  var bytes = new Uint8Array(arrayBuffer);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;

  var a, b, c, d;
  var chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + "==";
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + "=";
  }

  return base64;
}

//AJAX REQUESTS
function postmyVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: window.sessionStorage.getItem('myRandomVar')
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}vehicleVendors`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let myObjMsg = [`${data.text} was added!`];

      displayAlert(
        myDOMs.carExp.AlertContainer,
        "carExpAlert",
        "closeBtnAlert",
        `Vendor/Supplier Successfully Saved! `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
    })
    .fail(function (err) {
      displayAlert(
        myDOMs.carExp.AlertContainer,
        "carExpAlert",
        "closeBtnAlert",
        `${err} `,
        myObjMsg,
        ` `,
        "RED",
        6000
      );
    });
}
function deleteSelectedVehicleVendor() {
  let mySelectedIndex = myDOMs.carExp.Vendor.selectedIndex;
  let selectedVendor = myDOMs.carExp.Vendor.value;

  if (selectedVendor === "") {
    displayAlert(
      myDOMs.carExp.AlertContainer,
      "carExpAlert",
      "closeBtnAlert",
      `Please Select a Vendor/Supplier to Delete!`,
      "",
      ` `,
      "RED",
      6000
    );
    return;
  }
  if (confirm(`Are you sure you want to Delete ${selectedVendor}`)) {
    $.ajax({
      method: "DELETE",
      url: `${serverURL}vehicleVendors`,
      data: {
        text: selectedVendor,
        auth: window.sessionStorage.getItem('myRandomVar')
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          `${data.vendor.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.carExp.Vendor.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        // alert(JSON.stringify(err, undefined, 2));
        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function populateVehicleVendors() {
  //This code retrieves the vehicle expense Vendors from the Database and inserts them into the forms Vendor dropdown list.

  $.ajax({
    url: `${serverURL}vehicleVendors`,
    method: "GET",
    data: {
      auth: window.sessionStorage.getItem('myRandomVar')
    }
  })
    .done(function (data) {
      // if (data.vehicleVendors.length < 1) {
      //   vendorCar = false;
      // } else {
      //   vendorCar = true;
      // }
      for (i = 0; i < data.vehicleVendors.length; i++) {
        let tempVendorCar = document.createElement("OPTION");
        txtCar = document.createTextNode(data.vehicleVendors[i].text);
        tempVendorCar.appendChild(txtCar);
        myDOMs.carExp.Vendor.add(tempVendorCar);
      }
    })
    .fail(function (e) {
      alert("Vehicle Expense Vendors List was NOT retrieved Successfully!");
    });
}

// function populateVehicleCategories() {
//   //This code retrieves the vehicle expense Categories from the Database and inserts them into the forms Category dropdown list.
//   //This will allow me to add functions to allow end-user to make changes to the list or add/remove items.
//   $.ajax({
//     url: `${serverURL}vehicleCategorie`,
//     method: "GET"
//   })
//     .done(function (data) {
//       for (i = 0; i < data.vehicleCategories.length; i++) {
//         let optionCar = document.createElement("OPTION");
//         txtCar = document.createTextNode(data.vehicleCategories[i].text);
//         optionCar.appendChild(txtCar);
//         myDOMs.carExp.Category.insertBefore(
//           optionCar,
//           myDOMs.carExp.Category.lastChild
//         );
//       }
//     })
//     .fail(function (e) {
//       alert("Vehicle Expense Category List was NOT retrieved Successfully!");
//     });
// }
// function addVehicleCategory() {
//   let tempCat = prompt("Please enter the Category Name.");

//   if (tempCat === "") {
//     alert("Invalid Entry!");
//     return;
//   } else if (tempCat === null) {
//     return;
//   }
//   let catIsTaxed = false;
//   let tempTaxed = prompt("Please Add true or False if Taxed");
//   if (tempTaxed === "Yes") {
//     catIsTaxed = true;
//   } else {
//     catIsTaxed = false;
//   }

//   $.ajax({
//     url: `${serverURL}vehicleCategories`,
//     method: "POST",
//     data: {
//       text: tempCat,
//       taxed: catIsTaxed
//     }
//   })
//     .done(function (data) {
//       alert(JSON.stringify(data, undefined, 2));
//     })
//     .fail(function (e) {
//       alert("Vehicle Expense Category was NOT Saved Successfully!");
//     });
// }
// function getVehicleExpenseByID(expID) {
//   $.ajax({
//     url: `${serverURL}carExpense/${expID}`,
//     method: "GET",
//     data: {
//       auth: window.sessionStorage.getItem('myRandomVar')
//     }
//   })
//     .done(function (data) {
//       myDate = new Date(data.carexpense.carDate);
//       let myDay = myDate.getDate();
//       let myMonth = myDate.getMonth() + 1;
//       let myYear = myDate.getFullYear();
//       if (myDay < 10) {
//         myDay = `0${myDay}`;
//       }
//       if (myMonth < 10) {
//         myMonth = `0${myMonth}`;
//       }
//       myDOMs.carExp.EntryDate.value = myYear + "-" + myMonth + "-" + myDay;
//       myDOMs.carExp.NetAmt.value = data.carexpense.carnetAmt.toFixed(2);
//       myDOMs.carExp.HSTAmt.value = data.carexpense.carhstAmt.toFixed(2);
//       myDOMs.carExp.PSTAmt.value = data.carexpense.carpstAmt.toFixed(2);
//       myDOMs.carExp.TotalAmt.value = data.carexpense.carTotalAmt.toFixed(2);
//       myDOMs.carExp.Description.value = data.carexpense.carDescription;
//       myDOMs.carExp.Vendor.value = data.carexpense.vendorSelect;
//       myDOMs.carExp.Category.value = data.carexpense.carExpCatSelect;
//       myDOMs.carExp.BlindExpID.value = data.carexpense._id;
//       myDOMs.carExp.ExpID.value = "SAVED";

//       if (data.data.data) {
//         let myImgData = data.data.data;
//         let b64Response = base64ArrayBuffer(myImgData);
//         let img = new Image();
//         let container = document.getElementById("myImg");
//         img.src = "data:image/jpeg;base64," + b64Response;
//         container.setAttribute("src", img.src);
//       }

//       displayAlert(
//         myDOMs.carExp.AlertContainer,
//         "carExpAlert",
//         "closeBtnAlert",
//         "Expense Successfully found! ",
//         "",
//         `Exp ID: ${data.carexpense._id}`,
//         "GREEN",
//         6000
//       );
//     })
//     .fail(function (e) {
//       let myMsg = [e.responseText];
//       displayAlert(
//         myDOMs.carExp.AlertContainer,
//         "carExpAlert",
//         "closeBtnAlert",
//         `${e.statusText} `,
//         myMsg,
//         " ",
//         "RED",
//         6000
//       );
//     });
// }
function updateVehicleExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addVehicleOriginalValues();
    return;
  }
  if (myDOMs.carExp.ExpID.value === 'SAVED') {
    displayAlert(
      myDOMs.carExp.AlertContainer,
      "carExpAlert",
      "closeBtnAlert",
      `Save Changes is only available when Expense Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.carExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.carExp.AlertContainer,
      "carExpAlert",
      "closeBtnAlert",
      `Save Changes is not available for New Expenses. To Save a New Expense, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.carExp.BlindExpID.value;
  let files = [];
  formData = new FormData();
  let file;
  let myDate;
  let myTempArr;
  let receiptPath = false;
  //Receipt to be saved in this if statement
  if (myDOMs.carExp.Checkbox.checked === true) {
    files = $("#imgload").get(0).files;
    // myTempArr is set to the array of the page user is on
    myTempArr = getRequestedArray(selectedArrayNum);
    if (!myTempArr[selectedRowNum].receiptPath) {
      //no image in original saved expense so need to check if user added one
      if (files.length === 0) {
        alert("Select at least 1 receipt image file to upload!");
        return;
      } else {
        if (files.length > 1) {
          alert("You can only upload 1 file!");
          return false;
        }
        if (imageTooSmall) {
          file = files[0];
          formData.append("imgload", file, file.name);
        } else {
          let myImg64Arr = ImgReceiptToSend.split(",");
          let Part1 = myImg64Arr[0];
          let Part2 = myImg64Arr[1];
          let n = Part1.indexOf(";");
          let ContentType = Part1.slice(5, Number(n));
          let blob = b64toBlob(Part2, ContentType);
          formData.append("imgload", blob, 'NewReceiptImg');
        }
      }
    } else {
      // Image from old file is present but we do nothing and it will stay there if there is no files added from user.
      if (files.length === 0) {
        //checkbox to include image is true but image was removed so adding image from Original Data
        myDOMs.carExp.Img.src = myOriginalData.ImageData;
        //Do nothing and image will stay
      } else {
        if (files.length > 1) {
          alert("You can only upload 1 file!");
          return false;
        }
        if (imageTooSmall) {
          file = files[0];
          formData.append("imgload", file, file.name);
        } else {
          let myImg64Arr = ImgReceiptToSend.split(",");
          let Part1 = myImg64Arr[0];
          let Part2 = myImg64Arr[1];
          let n = Part1.indexOf(";");
          let ContentType = Part1.slice(5, Number(n));
          let blob = b64toBlob(Part2, ContentType);
          formData.append("imgload", blob, 'NewReceiptImg');
        }
      }
    }
    receiptPath = true;
    formData.append("expReceipt", "RECEIPT");
  } else {
    //if Include Receipt is not checked append expReceipt to false
    formData.append("expReceipt", "NO RECEIPT");
    receiptPath = false;
  }

  myDate = new Date(myDOMs.carExp.EntryDate.value);

  formData.append("carDate", myDate);
  formData.append("carnetAmt", myDOMs.carExp.NetAmt.value);
  formData.append("carhstAmt", myDOMs.carExp.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.carExp.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.carExp.TotalAmt.value);
  formData.append("carDescription", myDOMs.carExp.Description.value);
  formData.append("vendorSelect", myDOMs.carExp.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.carExp.Category.value);
  formData.append("auth", window.sessionStorage.getItem('myRandomVar'));

  if (myDOMs.carExp.Selector.value === "Vehicle 1") {
    formData.append("carNumber", "1");
  } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
    formData.append("carNumber", "2");
  }

  $.ajax({
    method: "PATCH",
    url: `${serverURL}carExpense/${expID}`,
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false
  })
    .done(async function (data) {
      let myObjMsg = [""];

      displayAlert(
        myDOMs.carExp.AlertContainer,
        "carExpAlert",
        "closeBtnAlert",
        `${data.message} `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
      //Code to update report array
      let carDate = myDate;
      let carNetAmt = parseFloat(myDOMs.carExp.NetAmt.value);
      let carHSTAmt = parseFloat(myDOMs.carExp.HSTAmt.value);
      let carPSTAmt = parseFloat(myDOMs.carExp.PSTAmt.value);
      let carTtlAmt = parseFloat(myDOMs.carExp.TotalAmt.value);
      let carDescription = myDOMs.carExp.Description.value;
      let carVendor = myDOMs.carExp.Vendor.value;
      let carCategory = myDOMs.carExp.Category.value;

      let CarData = {
        carDate,
        carNetAmt,
        carHSTAmt,
        carPSTAmt,
        carTtlAmt,
        carDescription,
        carVendor,
        carCategory,
        receiptPath
      };
      updateRequestedArray(selectedArrayNum, selectedRowNum, CarData);

      let myStartMonth = myDate.getUTCMonth();
      let myStartYear = myDate.getUTCFullYear();
      let myStartDay = myDate.getUTCDate();

      if (myStartDay < 10) {
        myStartDay = `0${myStartDay}`;
      }
      myStartMonth = myStartMonth + 1;
      if (myStartMonth < 10) {
        myStartMonth = `0${myStartMonth}`;
      }

      myOriginalData.BlindID = data.NewExpense._id;
      myOriginalData.Category = myDOMs.carExp.Category.value;
      myOriginalData.Date = `${myStartYear}-${myStartMonth}-${myStartDay}`;
      //myOriginalData.Date = myTempDate;
      myOriginalData.Description = myDOMs.carExp.Description.value;
      myOriginalData.Hst = parseFloat(myDOMs.carExp.HSTAmt.value);
      myOriginalData.Net = parseFloat(myDOMs.carExp.NetAmt.value);
      myOriginalData.Pst = parseFloat(myDOMs.carExp.PSTAmt.value);
      myOriginalData.Receipt = receiptPath;
      myOriginalData.Status = 'SAVED';
      myOriginalData.Total = parseFloat(myDOMs.carExp.TotalAmt.value);
      myOriginalData.Vendor = myDOMs.carExp.Vendor.value;

      myOriginalData.Checkbox = receiptPath;
      myOriginalData.MonthlyYES = false;
      myOriginalData.MonthlyNO = true;
      myOriginalData.ImageData = myDOMs.carExp.Img.src;

      if (receiptPath === false) {
        removeImage();
        myOriginalData.ImageData = null;
      }

      myOriginalData.Status = 'SAVED';
      myDOMs.carExp.ExpID.value = 'SAVED';
      setVehicleStatusColor();

      if (myDOMs.carExp.Selector.value === "Vehicle 1") {
        await getAllMainData('Vehicle-1');
      } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
        await getAllMainData('Vehicle-2');
      }

      fillMainDataFromArrays();
      if (myDOMs.carExp.Selector.value === "Vehicle 1") {
        updateTableTotals('1');
      } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
        updateTableTotals('2');
      }
    })
    .fail(function (err) {
      let myObjMsg = ["Vehicle Expense Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.carExp.AlertContainer,
        "carExpAlert",
        "closeBtnAlert",
        `Expense Entry Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
};

function updateTableTotals(carNum) {
  if (!TableOpen) return;
  if (reOpenIncomeStatement) {
    if (carNum === '1') {
      switch (myReportTotal.category) {
        case 'Fuel':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Fuel).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.FuelHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.FuelPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.FuelHST + mainData.vehicle1Exp.FuelPST).toFixed(2)))}`;
          break;
        case 'LoanInterest':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.LoanInterest).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.LoanInterestHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.LoanInterestPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.LoanInterestHST + mainData.vehicle1Exp.LoanInterestPST).toFixed(2)))}`;
          break;
        case 'Insurance':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Insurance).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.InsuranceHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.InsurancePST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.InsuranceHST + mainData.vehicle1Exp.InsurancePST).toFixed(2)))}`;
          break;
        case 'Registration':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Registration).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.RegistrationHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.RegistrationPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.RegistrationHST + mainData.vehicle1Exp.RegistrationPST).toFixed(2)))}`;
          break;
        case 'Maintenance':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Maintenance).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.MaintenanceHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.MaintenancePST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.MaintenanceHST + mainData.vehicle1Exp.MaintenancePST).toFixed(2)))}`;
          break;
        case 'Leasing':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Leasing).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.LeasingHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.LeasingPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LeasingHST + mainData.vehicle1Exp.LeasingPST).toFixed(2)))}`;
          break;
        case 'Other':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Other).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.OtherHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.OtherPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Other + mainData.vehicle1Exp.OtherHST + mainData.vehicle1Exp.OtherPST).toFixed(2)))}`;
          break;
        case 'Variable1':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable1).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable1HST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable1PST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable1HST + mainData.vehicle1Exp.Variable1PST).toFixed(2)))}`;
          break;
        case 'Variable2':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable2).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable2HST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable2PST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable2HST + mainData.vehicle1Exp.Variable2PST).toFixed(2)))}`;
          break;
        case 'Variable3':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable3).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable3HST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable3PST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Variable3 + mainData.vehicle1Exp.Variable3HST + mainData.vehicle1Exp.Variable3PST).toFixed(2)))}`;
          break;
        case 'Parking':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Parking).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.ParkingHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.ParkingPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.ParkingHST + mainData.vehicle1Exp.ParkingPST).toFixed(2)))}`;
          break;
        case 'SuppInsurance':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.SuppInsurance).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.SuppInsuranceHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.SuppInsurancePST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.SuppInsurance + mainData.vehicle1Exp.SuppInsuranceHST + mainData.vehicle1Exp.SuppInsurancePST).toFixed(2)))}`;
      }

    } else if (carNum === '2') {

      switch (myReportTotal.category) {
        case 'Fuel':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Fuel).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.FuelHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.FuelPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.FuelHST + mainData.vehicle2Exp.FuelPST).toFixed(2)))}`;
          break;
        case 'LoanInterest':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.LoanInterest).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.LoanInterestHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.LoanInterestPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.LoanInterestHST + mainData.vehicle2Exp.LoanInterestPST).toFixed(2)))}`;
          break;
        case 'Insurance':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Insurance).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.InsuranceHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.InsurancePST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.InsuranceHST + mainData.vehicle2Exp.InsurancePST).toFixed(2)))}`;
          break;
        case 'Registration':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Registration).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.RegistrationHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.RegistrationPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.RegistrationHST + mainData.vehicle2Exp.RegistrationPST).toFixed(2)))}`;
          break;
        case 'Maintenance':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Maintenance).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.MaintenanceHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.MaintenancePST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.MaintenanceHST + mainData.vehicle2Exp.MaintenancePST).toFixed(2)))}`;
          break;
        case 'Leasing':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Leasing).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.LeasingHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.LeasingPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LeasingHST + mainData.vehicle2Exp.LeasingPST).toFixed(2)))}`;
          break;
        case 'Other':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Other).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.OtherHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.OtherPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Other + mainData.vehicle2Exp.OtherHST + mainData.vehicle2Exp.OtherPST).toFixed(2)))}`;
          break;
        case 'Variable1':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable1).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable1HST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable1PST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable1HST + mainData.vehicle2Exp.Variable1PST).toFixed(2)))}`;
          break;
        case 'Variable2':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable2).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable2HST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable2PST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable2HST + mainData.vehicle2Exp.Variable2PST).toFixed(2)))}`;
          break;
        case 'Variable3':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable3).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable3HST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable3PST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Variable3 + mainData.vehicle2Exp.Variable3HST + mainData.vehicle2Exp.Variable3PST).toFixed(2)))}`;
          break;
        case 'Parking':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Parking).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.ParkingHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.ParkingPST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.ParkingHST + mainData.vehicle2Exp.ParkingPST).toFixed(2)))}`;
          break;
        case 'SuppInsurance':
          document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.SuppInsurance).toFixed(2)))}`;
          document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.SuppInsuranceHST).toFixed(2)))}`;
          document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.SuppInsurancePST).toFixed(2)))}`;
          document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.SuppInsurance + mainData.vehicle2Exp.SuppInsuranceHST + mainData.vehicle2Exp.SuppInsurancePST).toFixed(2)))}`;
      }
    }

  } else {
    if (carNum === '1') {
      document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.net).toFixed(2)))}`;
      document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.hst).toFixed(2)))}`;
      document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.pst).toFixed(2)))}`;
      document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle1Exp.pst + mainData.vehicle1Exp.net + mainData.vehicle1Exp.hst).toFixed(2)))}`;
    } else if (carNum === '2') {
      document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.net).toFixed(2)))}`;
      document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.hst).toFixed(2)))}`;
      document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.pst).toFixed(2)))}`;
      document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.vehicle2Exp.pst + mainData.vehicle2Exp.net + mainData.vehicle2Exp.hst).toFixed(2)))}`;
    }
  }
}

function deleteVehicleExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }
  let carNumValue;
  if (myDOMs.carExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.carExp.AlertContainer,
      "carExpAlert",
      "closeBtnAlert",
      `Delete is not available when Expense Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let expID = myDOMs.carExp.BlindExpID.value;

  if (confirm("Are you sure you want to Delete this Expense?")) {
    let tempData;
    if (myDOMs.carExp.Selector.value === "Vehicle 1") {
      carNumValue = "1";
    } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
      carNumValue = "2";
    }
    tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: carNumValue
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          "Expense Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );
        //next 5 lines resets the expense entry form/modal
        myDOMs.carExp.EntryForm.reset();
        removeImage();
        updateFormButtons('vehicle');
        myDOMs.carExp.EntryDate.focus();
        //This code resets the table.
        if (OneExpenseOnLastPage && currentTablePage !== 1) {
          currPageOnDelete = currentTablePage - 1;
        } else {
          currPageOnDelete = currentTablePage;
        }

        //need to remove that expense from array table.
        let myIndex = curTableArray
          .map(function (x) {
            return x._id;
          })
          .indexOf(expID);

        if (myIndex > -1) {
          curTableArray.splice(myIndex, 1);
        }

        //set appropriate page count
        if (curTableArray.length > rowCountPerPageDefault * 24) {
          if ((rowCountPerPageDefault = 10)) {
            tempPageCount = Math.ceil(curTableArray.length / 25);
          } else if ((rowCountPerPageDefault = 25)) {
            tempPageCount = Math.ceil(curTableArray.length / 50);
          } else if ((rowCountPerPageDefault = 50)) {
            tempPageCount = Math.ceil(curTableArray.length / 100);
          } else if ((rowCountPerPageDefault = 100)) {
            tempPageCount = Math.ceil(curTableArray.length / 500);
          }
        } else {
          tempPageCount = Math.ceil(
            curTableArray.length / rowCountPerPageDefault
          );
        }

        //editTableArrays();
        let tempCount = Math.floor(curTableArray.length / rowCountPerPage);

        let tempArray = curTableArray;
        arrTablePage1 = tempArray.slice(0, rowCountPerPage);

        editTableArrays(tempArray, tempCount);
        removePagination();
        if (curTableArray.length > rowCountPerPage) {
          addPagination();
          myTableAlert.insertBefore(nav, myTableAlert.childNodes[0]);
        }


        let tempTitle;
        let myUpdatedText;
        if (reOpenIncomeStatement) {
          tempTitle = myReportTotal.categoryFull;
          if (carNumValue === "1") {
            myUpdatedText = `You have ${
              curTableArray.length
              } Vehicle-1(${tempTitle}) Expenses displayed on ${tempPageCount} pages.`;
          } else if (carNumValue === "2") {
            myUpdatedText = `You have ${
              curTableArray.length
              } Vehicle-2(${tempTitle}) Expenses displayed on ${tempPageCount} pages.`;
          }
        } else {
          if (carNumValue === "1") {
            myUpdatedText = `You have ${
              curTableArray.length
              } Vehicle-1 Expenses displayed on ${tempPageCount} pages.`;
          } else if (carNumValue === "2") {
            myUpdatedText = `You have ${
              curTableArray.length
              } Vehicle-2 Expenses displayed on ${tempPageCount} pages.`;
          }
        }

        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);

        if (carNumValue === "1") {
          await getAllMainData('Vehicle-1');
        } else if (carNumValue === "2") {
          await getAllMainData('Vehicle-2');
        }
        fillMainDataFromArrays();
        if (carNumValue === "1") {
          updateTableTotals('1');
        } else if (carNumValue === "2") {
          updateTableTotals('2');
        }
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}
function getVehicleExpenses(vehicleNum, myFilter) {
  // if (TableOpen) {
  //   if (reOpenIncomeStatement) {
  //     reOpenIncomeStatement = false;
  //   }
  //   hideTableAlert();
  // }
  if (!myFilter) {
    if (vehicleNum === 1) {
      myReportTotal.totalNet = mainData.vehicle1Exp.net;
      myReportTotal.totalHST = mainData.vehicle1Exp.hst;
      myReportTotal.totalPST = mainData.vehicle1Exp.pst;
    } else if (vehicleNum === 2) {
      myReportTotal.totalNet = mainData.vehicle2Exp.net;
      myReportTotal.totalHST = mainData.vehicle2Exp.hst;
      myReportTotal.totalPST = mainData.vehicle2Exp.pst;
    }
  } let tempTitle;
  let tempData;

  if (vehicleNum === 1) {
    tempData = {
      carNumber: "1",
      startYear: startDate.getUTCFullYear(),
      startMonth: startDate.getUTCMonth(),
      startDay: startDate.getUTCDate(),
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate(),
      auth: window.sessionStorage.getItem('myRandomVar')
    };
  } else if (vehicleNum === 2) {
    tempData = {
      carNumber: "2",
      startYear: startDate.getUTCFullYear(),
      startMonth: startDate.getUTCMonth(),
      startDay: startDate.getUTCDate(),
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate(),
      auth: window.sessionStorage.getItem('myRandomVar')
    };
  }
  $.ajax({
    method: "GET",
    url: `${serverURL}carExpense`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (myExpenses) {
      let tempTitle;

      curTableArray = myExpenses.carexpense;

      if (myFilter) {
        myReportTotal.categoryFull = myFilter;
        if (vehicleNum === 1) {
          tempTitle = `Vehicle-1(${myFilter}) Expenses`;
        } else if (vehicleNum === 2) {
          tempTitle = `Vehicle-2(${myFilter}) Expenses`;
        }
        curTableArray = curTableArray.filter((el, index) => {
          return el.carExpCatSelect === myFilter;
        });
      } else {
        if (vehicleNum === 1) {
          tempTitle = `Vehicle-1 Expenses`;
        } else if (vehicleNum === 2) {
          tempTitle = `Vehicle-2 Expenses`;
        }
      }

      let tempPageCount;

      if (curTableArray.length > rowCountPerPageDefault * 24) {
        if ((rowCountPerPageDefault = 10)) {
          tempPageCount = Math.ceil(curTableArray.length / 25);
        } else if ((rowCountPerPageDefault = 25)) {
          tempPageCount = Math.ceil(curTableArray.length / 50);
        } else if ((rowCountPerPageDefault = 50)) {
          tempPageCount = Math.ceil(curTableArray.length / 100);
        } else if ((rowCountPerPageDefault = 100)) {
          tempPageCount = Math.ceil(curTableArray.length / 500);
        }
      } else {
        tempPageCount = Math.ceil(
          curTableArray.length / rowCountPerPageDefault
        );
      }

      buildVehicleExpenseTable(
        myDOMs.main.AlertContainer,
        "mainTableAlert",
        "closeBtnAlertMain",
        `You have ${
        curTableArray.length
        } ${tempTitle} displayed on ${tempPageCount} pages.`,
        "TABLE CAR GREEN",
        0,
        0
      );
      ToggleMenuBar();
    })
    .fail(function (e) {
      if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' || window.sessionStorage.getItem('myRandomVar') === null) {
        alert('You Must be logged in before using EZ-HST-CANADA>')
      } else {
        alert(JSON.stringify(e.statusText, undefined, 2));
      }

    });
}
$("#carExpBtn").click(function () {
  if (!validateVehicleEntryForm()) {
    return;
  }
  if (
    myDOMs.carExp.ExpID.value !== "NEW" ||
    myDOMs.carExp.SubmitButton.classList.contains("disabled")
  ) {
    alert("To update existing expenses, Use the Save Changes button");
    return;
  }
  let myDate = new Date(myDOMs.carExp.EntryDate.value);

  //Send message when trying to add receipt image with multiple monthly payments
  if (
    myDOMs.carExp.ReoccurYES.checked === true &&
    myDOMs.carExp.Checkbox.checked === true
  ) {
    let myObjMsg = [
      "Receipt images cannot be saved when using reoccurring function.",
      "To add receipts to reoccurring expenses, add the receipt to each individual expense after saving with the reoccurring function!",
      "To continue with the reoccuring function, Uncheck the Include Receipt checkbox."
    ];

    displayAlert(
      myDOMs.carExp.AlertContainer,
      "carExpAlert",
      "closeBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //verify if ID and if present warn user to use Save Changes
  if (myDOMs.carExp.ExpID.value !== "NEW") {
    let myObjMsg = [
      "The Submit button is only used to save a NEW expense.",
      "When Expense Status box displays SAVED or ALTERED, that expense is in the databse",
      "and to update any changes to it, use the Save Changes button.",
      "To Submit a new expense, first reset the form,",
      "fill the fields and then Submit!"
    ];

    displayAlert(
      myDOMs.carExp.AlertContainer,
      "carExpAlert",
      "closeBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //This section deals with Multiple Monthly payments
  if (myDOMs.carExp.ReoccurYES.checked === true) {
    if (myDOMs.carExp.Selector.value === "Vehicle 1") {
      mydata = {
        carDate: myDate,
        carnetAmt: myDOMs.carExp.NetAmt.value,
        carhstAmt: myDOMs.carExp.HSTAmt.value,
        carpstAmt: myDOMs.carExp.PSTAmt.value,
        carTotalAmt: myDOMs.carExp.TotalAmt.value,
        carDescription: myDOMs.carExp.Description.value,
        vendorSelect: myDOMs.carExp.Vendor.value,
        carExpCatSelect: myDOMs.carExp.Category.value,
        carExpReoccuring: 1,
        auth: window.sessionStorage.getItem('myRandomVar'),
        carNumber: "1"
      };
    } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
      mydata = {
        carnetAmt: myDOMs.carExp.NetAmt.value,
        carhstAmt: myDOMs.carExp.HSTAmt.value,
        carpstAmt: myDOMs.carExp.PSTAmt.value,
        carTotalAmt: myDOMs.carExp.TotalAmt.value,
        carDescription: myDOMs.carExp.Description.value,
        vendorSelect: myDOMs.carExp.Vendor.value,
        carExpCatSelect: myDOMs.carExp.Category.value,
        carExpReoccuring: 1,
        dateYear: myStartYear,
        dateMonth: myStartMonth,
        dateDay: myStartDay,
        auth: window.sessionStorage.getItem('myRandomVar'),
        carNumber: "2"
      };
    }

    $.ajax({
      method: "POST",
      url: `${serverURL}carExpenseRecur`,
      dataType: "json",
      data: mydata
    })
      .done(async function (data) {
        if (TableOpen) {
          alert('When Table Report is open, any New Expense added will not be updated in the Table Report! \n\n To view the Report with the new expense, close and Re-open the Report!');
        }
        // let myDisplay = [`The following are all the new expense ID's`];
        // for (i = 0; i < data.insertedCount; i++) {
        //   myDisplay.push(data.insertedIds[i]);
        // }
        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          "Expenses Successfully Saved! ",
          '',
          " ",
          "GREEN",
          0
        );
        // alert(JSON.stringify(myDisplay, undefined, 2));
        myDOMs.carExp.EntryForm.reset();
        myDOMs.carExp.EntryDate.focus();

        if (myDOMs.carExp.Selector.value === "Vehicle 1") {
          await getAllMainData('Vehicle-1');
        } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
          await getAllMainData('Vehicle-2');
        }
        fillMainDataFromArrays();
        if (myDOMs.carExp.Selector.value === "Vehicle 1") {
          updateTableTotals('1');
        } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
          updateTableTotals('2');
        }
      })
      .fail(function (e) {
        let myObjMsg = [
          "Reoccurring Vehicle Expense Entry Failed to POST to the database."
        ];

        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          "Expense Entry Failed! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      });
  } else {
    if (myDOMs.carExp.Checkbox.checked === true) {
      //Add expense with image
      let files = [];
      if (myDOMs.carExp.Img.getAttribute("src") === "") {
        let myObjMsg = [
          "To Save Receipt images with your expense,",
          "select the image with the choose file selector",
          "or, if using phone, take picture after clicking choose file",
          "and then submit the expense."
        ];

        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          "Unable to Save Expense! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return;
      } else {
        files = $("#imgload").get(0).files;
      }

      formData = new FormData();

      if (files.length === 0) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          "Select at least 1 receipt image file to upload! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return false;
      }

      if (files.length > 1) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.carExp.AlertContainer,
          "carExpAlert",
          "closeBtnAlert",
          "You can only upload 1 file! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return false;
      }

      // Append the files to the formData.

      if (imageTooSmall) {
        let file = files[0];
        formData.append("imgload", file, file.name);
      } else {
        let myImg64Arr = ImgReceiptToSend.split(",");
        let Part1 = myImg64Arr[0];
        let Part2 = myImg64Arr[1];
        let n = Part1.indexOf(";");
        let ContentType = Part1.slice(5, Number(n));
        let blob = b64toBlob(Part2, ContentType);
        formData.append("imgload", blob, 'NewReceiptImg');
      }

      formData.append("carDate", myDate);
      formData.append("carnetAmt", myDOMs.carExp.NetAmt.value);
      formData.append("carhstAmt", myDOMs.carExp.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.carExp.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.carExp.TotalAmt.value);
      formData.append("carDescription", myDOMs.carExp.Description.value);
      formData.append("vendorSelect", myDOMs.carExp.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.carExp.Category.value);
      formData.append("expReceipt", true);
      formData.append("auth", window.sessionStorage.getItem('myRandomVar'));

      if (myDOMs.carExp.Selector.value === "Vehicle 1") {
        formData.append("carNumber", "1");
      } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
        formData.append("carNumber", "2");
      }

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false
      })
        .done(async function (data) {
          if (TableOpen) {
            alert('When Table Report is open, any New Expense added will not be updated in the Table Report! \n\n To view the Report with the new expense, close and Re-open the Report!');
          }
          let myObjMsg = [""];

          displayAlert(
            myDOMs.carExp.AlertContainer,
            "carExpAlert",
            "closeBtnAlert",
            `${data.message} `,
            myObjMsg,
            ` `,
            "GREEN",
            6000
          );
          myDOMs.carExp.EntryForm.reset();
          removeImage();
          myDOMs.carExp.EntryDate.focus();

          if (myDOMs.carExp.Selector.value === "Vehicle 1") {
            await getAllMainData('Vehicle-1');
          } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
            await getAllMainData('Vehicle-2');
          }
          fillMainDataFromArrays();
          if (myDOMs.carExp.Selector.value === "Vehicle 1") {
            updateTableTotals('1');
          } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
            updateTableTotals('2');
          }
        })
        .fail(function (err) {
          let myObjMsg = [
            "Vehicle Expense Entry Failed to POST to the database"
          ];

          displayAlert(
            myDOMs.carExp.AlertContainer,
            "carExpAlert",
            "closeBtnAlert",
            `Expense Entry Failed! `,
            myObjMsg,
            " ",
            "RED",
            6000
          );
          return;
        });
    } else {
      //vehicle expense without receipt image

      let mydata;

      if (myDOMs.carExp.Selector.value === "Vehicle 1") {
        mydata = {
          carDate: myDate,
          carnetAmt: myDOMs.carExp.NetAmt.value,
          carhstAmt: myDOMs.carExp.HSTAmt.value,
          carpstAmt: myDOMs.carExp.PSTAmt.value,
          carTotalAmt: myDOMs.carExp.TotalAmt.value,
          carDescription: myDOMs.carExp.Description.value,
          vendorSelect: myDOMs.carExp.Vendor.value,
          carExpCatSelect: myDOMs.carExp.Category.value,
          expReceipt: false,
          auth: window.sessionStorage.getItem('myRandomVar'),
          carNumber: "1"
        };
      } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
        mydata = {
          carnetAmt: myDOMs.carExp.NetAmt.value,
          carhstAmt: myDOMs.carExp.HSTAmt.value,
          carpstAmt: myDOMs.carExp.PSTAmt.value,
          carTotalAmt: myDOMs.carExp.TotalAmt.value,
          carDescription: myDOMs.carExp.Description.value,
          vendorSelect: myDOMs.carExp.Vendor.value,
          carExpCatSelect: myDOMs.carExp.Category.value,
          expReceipt: false,
          dateYear: myStartYear,
          dateMonth: myStartMonth,
          dateDay: myStartDay,
          auth: window.sessionStorage.getItem('myRandomVar'),
          carNumber: "2"
        };
      }

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: mydata,
        enctype: "multipart/form-data"
      })
        .done(async function (data) {
          if (TableOpen) {
            alert('When Table Report is open, any New Expense added will not be updated in the Table Report! \n\n To view the Report with the new expense, close and Re-open the Report!');
          }
          displayAlert(
            myDOMs.carExp.AlertContainer,
            "carExpAlert",
            "closeBtnAlert",
            `${data.message} `,
            "",
            ` `,
            "GREEN",
            6000
          );
          myDOMs.carExp.EntryForm.reset();
          myDOMs.carExp.EntryDate.focus();

          if (myDOMs.carExp.Selector.value === "Vehicle 1") {
            await getAllMainData('Vehicle-1');
          } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
            await getAllMainData('Vehicle-2');
          }
          fillMainDataFromArrays();
          if (myDOMs.carExp.Selector.value === "Vehicle 1") {
            updateTableTotals('1');
          } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
            updateTableTotals('2');
          }
        })
        .fail(function (err) {
          displayAlert(
            myDOMs.carExp.AlertContainer,
            "carExpAlert",
            "closeBtnAlert",
            `${err} `,
            "",
            " ",
            "RED",
            6000
          );
        });
    }
  }
});

//Smaller Functions

myDOMs.carExp.EntryDate.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.carExp.EntryDate.value)) {
    alert(`Because your Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.carExp.EntryDate.value = null;
    myDOMs.carExp.EntryDate.focus;
  }
});

function updateCarHeader() {
  if (myDOMs.carExp.Selector.value === "Vehicle 1") {
    myDOMs.carExp.Title.textContent = "Vehicle 1 Expense Entry Form";
  } else if (myDOMs.carExp.Selector.value === "Vehicle 2") {
    myDOMs.carExp.Title.textContent = "Vehicle 2 Expense Entry Form";
  }
}

function AutoFillTaxes(myForm) {
  let myZeroValue = 0;
  if (myForm === "car") {
    netCont = myDOMs.carExp.NetAmt;
    hstCont = myDOMs.carExp.HSTAmt;
    pstCont = myDOMs.carExp.PSTAmt;
    totalCont = myDOMs.carExp.TotalAmt;
  } else if (myForm === "bus") {
    netCont = myDOMs.busExp.NetAmt;
    hstCont = myDOMs.busExp.HSTAmt;
    pstCont = myDOMs.busExp.PSTAmt;
    totalCont = myDOMs.busExp.TotalAmt;
  } else if (myForm === "home") {
    netCont = myDOMs.homeExp.NetAmt;
    hstCont = myDOMs.homeExp.HSTAmt;
    pstCont = myDOMs.homeExp.PSTAmt;
    totalCont = myDOMs.homeExp.TotalAmt;
  } else if (myForm === "other") {
    netCont = myDOMs.otherExp.NetAmt;
    hstCont = myDOMs.otherExp.HSTAmt;
    pstCont = myDOMs.otherExp.PSTAmt;
    totalCont = myDOMs.otherExp.TotalAmt;
  } else if (myForm === "rental") {
    netCont = myDOMs.rentalExp.NetAmt;
    hstCont = myDOMs.rentalExp.HSTAmt;
    pstCont = myDOMs.rentalExp.PSTAmt;
    totalCont = myDOMs.rentalExp.TotalAmt;
  } else if (myForm === "income") {
    if (myDOMs.income.Selector.value === "Business") {
      netCont = myDOMs.income.NetAmt;
      hstCont = myDOMs.income.HSTAmt;
      pstCont = myDOMs.income.PSTAmt;
      totalCont = myDOMs.income.TotalAmt;
    } else if (myDOMs.income.Selector.value === "Rental") {
      let myTempAmt = Number(myDOMs.income.NetAmt.value);

      myDOMs.income.NetAmt.value = myTempAmt.toFixed(2);
      myDOMs.income.HSTAmt.value = myZeroValue.toFixed(2);
      pstCont.value = myZeroValue.toFixed(2);
      totalCont.value = myTempAmt.toFixed(2);
      return;
    }

  }

  let myNet = 0;
  let myHST = 0;
  let myPST = 0;
  let myCalcHST = Number(provinceTaxSettings.Current.HST);
  let myCalcPST = Number(provinceTaxSettings.Current.PST);
  let myTotal = 0;

  // alert(myCalcHST);
  // alert(myCalcPST);

  if (netCont.value > 0) {
    myNet = netCont.value / (myCalcHST + myCalcPST + 1);
    myHST = myNet * myCalcHST;
    myPST = myNet * myCalcPST;
    myTotal = myNet + myHST + myPST;

    netCont.value = myNet.toFixed(2);
    hstCont.value = myHST.toFixed(2);
    pstCont.value = myPST.toFixed(2);
    totalCont.value = myTotal.toFixed(2);
  }
}

function totalUp(myForm) {
  if (myForm === "car") {
    netCont = myDOMs.carExp.NetAmt;
    hstCont = myDOMs.carExp.HSTAmt;
    pstCont = myDOMs.carExp.PSTAmt;
    totalCont = myDOMs.carExp.TotalAmt;
  } else if (myForm === "bus") {
    netCont = myDOMs.busExp.NetAmt;
    hstCont = myDOMs.busExp.HSTAmt;
    pstCont = myDOMs.busExp.PSTAmt;
    totalCont = myDOMs.busExp.TotalAmt;
  } else if (myForm === "home") {
    netCont = myDOMs.homeExp.NetAmt;
    hstCont = myDOMs.homeExp.HSTAmt;
    pstCont = myDOMs.homeExp.PSTAmt;
    totalCont = myDOMs.homeExp.TotalAmt;
  } else if (myForm === "other") {
    netCont = myDOMs.otherExp.NetAmt;
    hstCont = myDOMs.otherExp.HSTAmt;
    pstCont = myDOMs.otherExp.PSTAmt;
    totalCont = myDOMs.otherExp.TotalAmt;
  } else if (myForm === "rental") {
    netCont = myDOMs.rentalExp.NetAmt;
    hstCont = myDOMs.rentalExp.HSTAmt;
    pstCont = myDOMs.rentalExp.PSTAmt;
    totalCont = myDOMs.rentalExp.TotalAmt;
  } else if (myForm === "income") {
    netCont = myDOMs.income.NetAmt;
    hstCont = myDOMs.income.HSTAmt;
    pstCont = myDOMs.income.PSTAmt;
    totalCont = myDOMs.income.TotalAmt;
  }


  let myNet = 0;
  let myHST = 0;
  let myPST = 0;
  let myTotal = 0;

  if (netCont.value === "") {
    myNet = 0;
  } else {
    myNet = parseFloat(netCont.value);
  }

  if (hstCont.value === "") {
    myHST = 0;
  } else {
    myHST = parseFloat(hstCont.value);
  }

  if (pstCont.value === "") {
    myPST = 0;
  } else {
    myPST = parseFloat(pstCont.value);
  }
  myTotal = myNet + myHST + myPST;

  netCont.value = myNet.toFixed(2);
  hstCont.value = myHST.toFixed(2);
  pstCont.value = myPST.toFixed(2);
  totalCont.value = myTotal.toFixed(2);
}

myDOMs.carExp.Reset.addEventListener("click", function (e) {
  if (myDOMs.carExp.ExpID.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addVehicleOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.carExp.EntryForm.reset();
      removeImage();
      updateFormButtons('vehicle');
    } else {
      e.preventDefault();
    }
  }

});

async function addVehicleOriginalValues() {
  let myTempID = myDOMs.carExp.BlindExpID.value;

  myDOMs.carExp.EntryDate.value = myOriginalData.Date;
  myDOMs.carExp.NetAmt.value = myOriginalData.Net.toFixed(2);
  myDOMs.carExp.HSTAmt.value = myOriginalData.Hst.toFixed(2);
  myDOMs.carExp.PSTAmt.value = myOriginalData.Pst.toFixed(2);
  myDOMs.carExp.TotalAmt.value = myOriginalData.Total.toFixed(2);
  myDOMs.carExp.Description.value = myOriginalData.Description;
  myDOMs.carExp.Vendor.value = myOriginalData.Vendor;
  myDOMs.carExp.Category.value = myOriginalData.Category;
  myDOMs.carExp.ExpID.value = 'SAVED';
  myOriginalData.Status = 'SAVED';
  myDOMs.carExp.ReoccurYES.checked = false;
  myDOMs.carExp.ReoccurNO.checked = true;

  if (myOriginalData.Receipt === true) {

    if (myOriginalData.ImageData !== null) {
      let img = new Image();
      let container = document.getElementById("myImg");
      img.src = myOriginalData.ImageData;
      container.setAttribute("src", img.src);
      myDOMs.carExp.Checkbox.checked = true;

    } else {
      myDOMs.carExp.Checkbox.checked = false;
      removeImage();
    }
  } else {
    myDOMs.carExp.Checkbox.checked = false;
    removeImage();
  }
  setVehicleStatusColor();
}

function removeImage() {
  myDOMs.carExp.Img.setAttribute("src", "");
  $(".custom-file-label").html("");
  myDOMs.carExp.FileSelector.value = "";
  updateVehicleFormStatus();
}

function removeVehicleBlindImage() {
  myDOMs.carExp.BlindImg.setAttribute("src", "");
};



function validateVehicleEntryForm() {
  const carDate = document.forms["formCarExpEntry"]["carDate"];
  const netAmt = document.forms["formCarExpEntry"]["carnetAmt"];
  const hstAmt = document.forms["formCarExpEntry"]["carhstAmt"];
  const pstAmt = document.forms["formCarExpEntry"]["carpstAmt"];
  const totalAmt = document.forms["formCarExpEntry"]["carTotalAmt"];
  const description = document.forms["formCarExpEntry"]["carDescription"];
  const vendor = document.forms["formCarExpEntry"]["vendorSelect"];
  const category = document.forms["formCarExpEntry"]["carExpCatSelect"];

  if (carDate.value == "") {
    window.alert("Please Select a Date.");
    carDate.focus();
    return false;
  }

  if (isNaN(netAmt.value)) {
    window.alert("Please enter a Number in Net Amount.");
    netAmt.focus();
    return false;
  }

  if (netAmt.value == "") {
    window.alert("Please enter a Net Amount.");
    netAmt.focus();
    return false;
  }

  if (netAmt.value == 0) {
    window.alert("Please enter a Net Amount other than zero.");
    netAmt.focus();
    return false;
  }

  if (hstAmt.value == "") {
    window.alert("Please enter an hst Amount.");
    hstAmt.focus();
    return false;
  }

  if (pstAmt.value == "") {
    window.alert("Please enter a pst Amount.");
    pstAmt.focus();
    return false;
  }

  if (description.value == "") {
    window.alert("Please enter a Description.");
    description.focus();
    return false;
  }

  if (vendor.value == "") {
    window.alert("Please Select a Vendor or Click Add to create a new one");
    vendor.focus();
    return false;
  }

  if (category.value == "") {
    window.alert("Please Select a Caregory.");
    category.focus();
    return false;
  }
  return true;
}

function updateVehicleFormStatus() {
  //let tempSRC = window.location.href.slice(0, window.location.href.length - 1)
  if (myDOMs.carExp.ExpID.value === 'NEW') { return; }
  let dataMatch = true;
  if (myOriginalData.Date === myDOMs.carExp.EntryDate.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Net.toFixed(2) === myDOMs.carExp.NetAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Hst.toFixed(2) === myDOMs.carExp.HSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Pst.toFixed(2) === myDOMs.carExp.PSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Total.toFixed(2) === myDOMs.carExp.TotalAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Status === myDOMs.carExp.ExpID.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Description === myDOMs.carExp.Description.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Vendor === myDOMs.carExp.Vendor.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Category === myDOMs.carExp.Category.value) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.carExp.Checkbox.checked === myOriginalData.Checkbox) {
  } else {
    dataMatch = false;
  }


  if (myDOMs.carExp.Img.src.length < 150 && myOriginalData.ImageData === null || myDOMs.carExp.Img.src.length > 149 && myOriginalData.ImageData !== null) {
    if (myOriginalData.ImageData !== null) {
      let myIndex;
      myIndex = myDOMs.carExp.Img.src.lastIndexOf(';base64,');
      let DOMdata = myDOMs.carExp.Img.src.slice(myIndex);
      myIndex = myOriginalData.ImageData.lastIndexOf(';base64,');
      let OriginalData = myOriginalData.ImageData.slice(myIndex)
      if (DOMdata !== OriginalData) {
        dataMatch = false;
      }
    }
  } else {
    dataMatch = false;
  }


  if (dataMatch === false) {
    myDOMs.carExp.ExpID.value = 'ALTERED';
    myOriginalData.Status = 'ALTERED';
  } else {
    myDOMs.carExp.ExpID.value = 'SAVED';
    myOriginalData.Status = 'SAVED';
  }
  setVehicleStatusColor();

}

function setVehicleStatusColor() {
  if (myDOMs.carExp.ExpID.value === 'ALTERED') {
    if (myDOMs.carExp.ExpID.classList.contains('text-danger')) {
    } else {
      myDOMs.carExp.ExpID.classList.add('text-danger');
    }
  } else {
    if (myDOMs.carExp.ExpID.classList.contains('text-danger')) {
      myDOMs.carExp.ExpID.classList.remove('text-danger');
    }
  }

}

myDOMs.carExp.ReoccurYES.addEventListener('click', function (e) {
  if (myDOMs.carExp.ExpID.value !== 'NEW') {
    e.preventDefault();
    alert('Monthly function is only available for NEW expenses!');
  }
})

function disableEnableFullSizeVehicleImgBtn() {
  // alert('Buttons Called');
  if (myDOMs.carExp.Img.src.length > 149) {
    if ($('#carExpShowFullSize').hasClass('disabled')) {
      $('#carExpShowFullSize').removeClass("disabled");
    }

  } else {

    if ($('#carExpShowFullSize').hasClass('disabled')) {
    } else {
      $('#carExpShowFullSize').addClass("disabled");
    }
  }

}

function displayFullSizeVehicleImage() {
  if (myDOMs.carExp.Img.src.length < 150) {
    if (myDOMs.carExp.ExpID.value === 'NEW') {
      alert("No Receipt Image Selected!");
      return;
    } else {
      alert("No Receipt Image Included with this Expense!");
      return;
    }
  }
  $("#ImageViewModal").modal("show");
  let myTitle = document.getElementById('ImageViewTitle');
  myTitle.innerText = 'Receipt Image';
  let img = new Image();
  let container = document.getElementById("ModalImageTag");
  img.src = myDOMs.carExp.Img.src;
  container.setAttribute("src", img.src);

}
