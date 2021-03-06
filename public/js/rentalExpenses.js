//Random Function
// populateRentalCategories();
disableEnableFullSizeRentalImgBtn();

function displayRentalExpModal() {
  $("#RentalExpenseModal").modal("show");

  let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.rentalExp.HSTAmtLabel.innerText = 'HST Amount'
  } else {
    myDOMs.rentalExp.HSTAmtLabel.innerText = 'GST Amount'
  }
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === 0 && TableOpen === false) {
    ToggleMenuBar();
  }
};
function hideRentalExpModal() {
  myDOMs.rentalExp.EntryForm.reset();
  removeRentalImage();
  resetOriginalData();
  savedTransactionLocked = false;
  $("#RentalExpenseModal").modal("hide");
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === -108 && TableOpen === false) {
    ToggleMenuBar();
  }
};
function updateRentalButtonText() {
  var isExpanded = $("#collapseRental1").hasClass("show");
  if (isExpanded) {
    myDOMs.rentalExp.ShowHideReceipt.innerText = "Show Receipt Controls";
  } else {
    myDOMs.rentalExp.ShowHideReceipt.innerText = "Hide Receipt Controls";
  }
}
function emptyRentalVendorSelect() {
  for (i = myDOMs.rentalExp.Vendor.length - 1; i > 0; i--) {
    myDOMs.rentalExp.Vendor.remove(i);
  }
}
function addRentalVendor() {
  let tempVendor = prompt("Please enter the Vendor/Supplier Name.");

  if (tempVendor === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempVendor === null) {
    return;
  }
  postmyRentalVendor(tempVendor);
  let vendorRental = document.createElement("OPTION");
  let txtRental = document.createTextNode(tempVendor);
  vendorRental.appendChild(txtRental);
  myDOMs.rentalExp.Vendor.add(vendorRental);
}
// function emptyRentalCategorySelect() {
//   for (i = myDOMs.rentalExp.Category.length - 1; i > 0; i--) {
//     myDOMs.rentalExp.Category.remove(i);
//   }
// }
// //AJAX REQUESTS

function postmyRentalVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: window.sessionStorage.getItem('myRandomVar')
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}rentalVendors`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let myObjMsg = [`${data.text} was added!`];

      displayAlert(
        myDOMs.rentalExp.AlertContainer,
        "rentalExpAlert",
        "rentalCloseBtnAlert",
        `Vendor/Supplier Successfully Saved! `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
    })
    .fail(function (err) {
      displayAlert(
        myDOMs.rentalExp.AlertContainer,
        "rentalExpAlert",
        "rentalCloseBtnAlert",
        `${err} `,
        myObjMsg,
        ` `,
        "RED",
        6000
      );
    });
}
function deleteSelectedRentalVendor() {
  let mySelectedIndex = myDOMs.rentalExp.Vendor.selectedIndex;
  let selectedVendor = myDOMs.rentalExp.Vendor.value;

  if (selectedVendor === "") {
    displayAlert(
      myDOMs.rentalExp.AlertContainer,
      "rentalExpAlert",
      "rentalCloseBtnAlert",
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
      url: `${serverURL}rentalVendors`,
      data: {
        text: selectedVendor,
        auth: window.sessionStorage.getItem('myRandomVar')
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          `${data.vendor.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.rentalExp.Vendor.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function populateRentalVendors() {
  //This code retrieves the home expense Vendors from the Database and inserts them into the forms Vendor dropdown list.
  $.ajax({
    url: `${serverURL}rentalVendors`,
    method: "GET",
    data: {
      auth: window.sessionStorage.getItem('myRandomVar')
    }
  })
    .done(function (data) {
      for (i = 0; i < data.rentalVendors.length; i++) {
        let tempVendorRental = document.createElement("OPTION");
        txtRental = document.createTextNode(data.rentalVendors[i].text);
        tempVendorRental.appendChild(txtRental);
        myDOMs.rentalExp.Vendor.add(tempVendorRental);
      }
    })
    .fail(function (e) {
      alert("Rental Expense Vendors List was NOT retrieved Successfully!");
    });
}

// function populateRentalCategories() {
//   //This code retrieves the Business expense Categories from the Database and inserts them into the forms Category dropdown list.
//   //alert('inside populate rental categories');
//   $.ajax({
//     url: `${serverURL}rentalCategorie`,
//     method: "GET"
//   })
//     .done(function (data) {
//       for (i = 0; i < data.rentalCategories.length; i++) {
//         let optionRental = document.createElement("OPTION");
//         txtRental = document.createTextNode(data.rentalCategories[i].text);
//         optionRental.appendChild(txtRental);
//         myDOMs.rentalExp.Category.insertBefore(
//           optionRental,
//           myDOMs.rentalExp.Category.lastChild
//         );
//       }
//     })
//     .fail(function (e) {
//       alert("Rental Expense Category List was NOT retrieved Successfully!");
//     });
// }

// function addRentalCategory() {
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
//     url: `${serverURL}rentalCategorie`,
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
//       alert("Rental Expense Category was NOT Saved Successfully!");
//     });
// }

function updateRentalExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addRentalOriginalValues();
    return;
  }
  if (myDOMs.rentalExp.ExpID.value === 'SAVED') {
    displayAlert(
      myDOMs.rentalExp.AlertContainer,
      "rentalExpAlert",
      "rentalcloseBtnAlert",
      `Save Changes is only available when Expense Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.rentalExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.rentalExp.AlertContainer,
      "rentalExpAlert",
      "rentalCloseBtnAlert",
      `Save Changes is not available for New Expenses. To Save a New Expense, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.rentalExp.BlindExpID.value;
  let files = [];
  formData = new FormData();
  let file;
  let myDate;
  let myTempArr;
  let receiptPath = false;
  //Receipt to be saved in this if statement
  if (myDOMs.rentalExp.Checkbox.checked === true) {
    files = $("#imgloadRental").get(0).files;
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
        myDOMs.rentalExp.Img.src = myOriginalData.ImageData;
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

  myDate = new Date(myDOMs.rentalExp.EntryDate.value);

  formData.append("carDate", myDate);
  formData.append("carnetAmt", myDOMs.rentalExp.NetAmt.value);
  formData.append("carhstAmt", myDOMs.rentalExp.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.rentalExp.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.rentalExp.TotalAmt.value);
  formData.append("carDescription", myDOMs.rentalExp.Description.value);
  formData.append("vendorSelect", myDOMs.rentalExp.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.rentalExp.Category.value);
  formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
  formData.append("carNumber", "Rental");


  $.ajax({
    method: "PATCH",
    url: `${serverURL}carExpense/${expID}`,
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false
  })
    .done(async function (data) {
      let myObjMsg = [];

      displayAlert(
        myDOMs.rentalExp.AlertContainer,
        "rentalExpAlert",
        "rentalCloseBtnAlert",
        ``,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );


      //Code to update report array
      let carDate = myDate;
      let carNetAmt = parseFloat(myDOMs.rentalExp.NetAmt.value);
      let carHSTAmt = parseFloat(myDOMs.rentalExp.HSTAmt.value);
      let carPSTAmt = parseFloat(myDOMs.rentalExp.PSTAmt.value);
      let carTtlAmt = parseFloat(myDOMs.rentalExp.TotalAmt.value);
      let carDescription = myDOMs.rentalExp.Description.value;
      let carVendor = myDOMs.rentalExp.Vendor.value;
      let carCategory = myDOMs.rentalExp.Category.value;

      let RentalData = {
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
      updateRequestedArray(selectedArrayNum, selectedRowNum, RentalData);

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
      myOriginalData.Category = myDOMs.rentalExp.Category.value;
      myOriginalData.Date = `${myStartYear}-${myStartMonth}-${myStartDay}`;

      myOriginalData.Description = myDOMs.rentalExp.Description.value;
      myOriginalData.Hst = parseFloat(myDOMs.rentalExp.HSTAmt.value);
      myOriginalData.Net = parseFloat(myDOMs.rentalExp.NetAmt.value);
      myOriginalData.Pst = parseFloat(myDOMs.rentalExp.PSTAmt.value);
      myOriginalData.Receipt = receiptPath;
      myOriginalData.Status = 'SAVED';
      myOriginalData.Total = parseFloat(myDOMs.rentalExp.TotalAmt.value);
      myOriginalData.Vendor = myDOMs.rentalExp.Vendor.value;

      myOriginalData.Checkbox = receiptPath;
      myOriginalData.MonthlyYES = false;
      myOriginalData.MonthlyNO = true;
      myOriginalData.ImageData = myDOMs.rentalExp.Img.src;

      if (receiptPath === false) {
        removeRentalImage();
        myOriginalData.ImageData = null;
      }

      myOriginalData.Status = 'SAVED';
      myDOMs.rentalExp.ExpID.value = 'SAVED';
      setRentalStatusColor();

      await getAllMainData('Rental');
      fillMainDataFromArrays();

      updateRentalExpTableTotals();
    })
    .fail(function (err) {
      let myObjMsg = ["Rental Expense Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.rentalExp.AlertContainer,
        "rentalExpAlert",
        "rentalCloseBtnAlert",
        `Expense Entry Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
};

function updateRentalExpTableTotals() {
  if (!TableOpen) return;
  if (reOpenIncomeStatement) {
    switch (myReportTotal.category) {
      case 'Advertising':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Advertising).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.AdvertisingHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.AdvertisingPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Advertising + mainData.rentalExp.AdvertisingHST + mainData.rentalExp.AdvertisingPST).toFixed(2)))}`;
        break;
      case 'Insurance':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Insurance).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.InsuranceHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.InsurancePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Insurance + mainData.rentalExp.InsuranceHST + mainData.rentalExp.InsurancePST).toFixed(2)))}`;
        break;
      case 'Interest':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Interest).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.InterestHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.InterestPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Interest + mainData.rentalExp.InterestHST + mainData.rentalExp.InterestPST).toFixed(2)))}`;
        break;
      case 'Maintenance':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Maintenance).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.MaintenanceHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.MaintenancePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Maintenance + mainData.rentalExp.MaintenanceHST + mainData.rentalExp.MaintenancePST).toFixed(2)))}`;
        break;
      case 'Admin':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Admin).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.AdminHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.AdminPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Admin + mainData.rentalExp.AdminHST + mainData.rentalExp.AdminPST).toFixed(2)))}`;
        break;
      case 'MotorVehicle':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.MotorVehicle).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.MotorVehicleHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.MotorVehiclePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.MotorVehicle + mainData.rentalExp.MotorVehicleHST + mainData.rentalExp.MotorVehiclePST).toFixed(2)))}`;
        break;
      case 'Office':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Office).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.OfficeHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.OfficePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Office + mainData.rentalExp.OfficeHST + mainData.rentalExp.OfficePST).toFixed(2)))}`;
        break;
      case 'Legal':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Legal).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.LegalHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.LegalPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Legal + mainData.rentalExp.LegalHST + mainData.rentalExp.LegalPST).toFixed(2)))}`;
        break;
      case 'PropertyTax':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.PropertyTax).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.PropertyTaxHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.PropertyTaxPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.PropertyTax + mainData.rentalExp.PropertyTaxHST + mainData.rentalExp.PropertyTaxPST).toFixed(2)))}`;
        break;
      case 'Wages':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Wages).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.WagesHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.WagesPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Wages + mainData.rentalExp.WagesHST + mainData.rentalExp.WagesPST).toFixed(2)))}`;
        break;
      case 'Travel':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Travel).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.TravelHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.TravelPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Travel + mainData.rentalExp.TravelHST + mainData.rentalExp.TravelPST).toFixed(2)))}`;
        break;
      case 'Utilities':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Utilities).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.UtilitiesHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.UtilitiesPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Utilities + mainData.rentalExp.UtilitiesHST + mainData.rentalExp.UtilitiesPST).toFixed(2)))}`;
        break;
      case 'Other':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Other).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.OtherHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.OtherPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Other + mainData.rentalExp.OtherHST + mainData.rentalExp.OtherPST).toFixed(2)))}`;
        break;
      case 'Variable1':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable1).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable1HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable1PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable1 + mainData.rentalExp.Variable1HST + mainData.rentalExp.Variable1PST).toFixed(2)))}`;
        break;
      case 'Variable2':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable2).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable2HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable2PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.Variable2 + mainData.rentalExp.Variable2HST + mainData.rentalExp.Variable2PST).toFixed(2)))}`;
        break;
    }
  } else {
    document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.net).toFixed(2)))}`;
    document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.hst).toFixed(2)))}`;
    document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.rentalExp.pst).toFixed(2)))}`;
    document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.rentalExp.pst + mainData.rentalExp.net + mainData.rentalExp.hst).toFixed(2)))}`;
  }
}

function deleteRentalExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }
  if (myDOMs.rentalExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.rentalExp.AlertContainer,
      "rentalExpAlert",
      "rentalCloseBtnAlert",
      `Delete is not available when Expense Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let expID = myDOMs.rentalExp.BlindExpID.value;

  if (confirm("Are you sure you want to Delete this Expense?")) {
    let tempData;
    tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: 'Rental'
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          "Expense Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );
        //next 5 lines resets the expense entry form/modal
        myDOMs.rentalExp.EntryForm.reset();
        myDOMs.rentalExp.ReoccurYES.checked = false;
        myDOMs.rentalExp.ReoccurNO.checked = true;
        removeRentalImage();
        updateFormButtons('rental');
        myDOMs.rentalExp.EntryDate.focus();
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
          myUpdatedText = `You have ${
            curTableArray.length
            } Rental(${tempTitle}) Expenses displayed on ${tempPageCount} pages.`;
        } else {
          myUpdatedText = `You have ${
            curTableArray.length
            } Rental Expenses displayed on ${tempPageCount} pages.`;
        }

        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);
        resetOriginalData();

        await getAllMainData('Rental');
        fillMainDataFromArrays();
        updateRentalExpTableTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getRentalExpenses(myFilter) {
  // if (TableOpen) {
  //   if (reOpenIncomeStatement) {
  //     reOpenIncomeStatement = false;
  //   }
  //   hideTableAlert();
  // }
  if (!myFilter) {
    myReportTotal.totalNet = mainData.rentalExp.net;
    myReportTotal.totalHST = mainData.rentalExp.hst;
    myReportTotal.totalPST = mainData.rentalExp.pst;
  }

  let tempData;

  tempData = {
    carNumber: "Rental",
    auth: window.sessionStorage.getItem('myRandomVar'),
    startYear: startDate.getUTCFullYear(),
    startMonth: startDate.getUTCMonth(),
    startDay: startDate.getUTCDate(),
    endYear: endDate.getUTCFullYear(),
    endMonth: endDate.getUTCMonth(),
    endDay: endDate.getUTCDate()
  };

  $.ajax({
    method: "GET",
    url: `${serverURL}carExpense`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (myExpenses) {
      let tempTitle = 'Rental Expenses';
      curTableArray = myExpenses.carexpense;

      if (myFilter) {
        myReportTotal.categoryFull = myFilter;
        tempTitle = `Rental(${myFilter}) Expenses`;
        curTableArray = curTableArray.filter((el, index) => {
          return el.carExpCatSelect === myFilter;
        });
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


$("#rentalExpBtn").click(function () {
  if (!validateRentalEntryForm()) {
    return;
  }
  if (
    myDOMs.rentalExp.ExpID.value !== 'NEW' ||
    myDOMs.rentalExp.SubmitButton.classList.contains("disabled")
  ) {
    alert("To update existing expenses, Use the Save Changes button");
    return;
  }
  let myDate = new Date(myDOMs.rentalExp.EntryDate.value);

  //Send message when trying to add receipt image with multiple monthly payments
  if (
    myDOMs.rentalExp.ReoccurYES.checked === true &&
    myDOMs.rentalExp.Checkbox.checked === true
  ) {
    let myObjMsg = [
      "Receipt images cannot be saved when using reoccurring Monthly function.",
      "To add receipts to reoccurring Monthly expenses, add the receipt to each individual expense after saving with the reoccurring Monthly function!",
      "To continue with the reoccuring Monthly function, Uncheck the Include Receipt checkbox."
    ];

    displayAlert(
      myDOMs.rentalExp.AlertContainer,
      "rentalExpAlert",
      "rentalCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //verify if ID and if present warn user to use Save Changes
  if (myDOMs.rentalExp.ExpID.value !== "NEW") {
    let myObjMsg = [
      "The Submit button is only used to save a NEW expense.",
      "When Expense Status box displays SAVED or ALTERED, that expense is in the databse",
      "and to update any changes to it, use the Save Changes button.",
      "To Submit a new expense, first reset the form,",
      "fill the fields and then Submit!"
    ];

    displayAlert(
      myDOMs.rentalExp.AlertContainer,
      "rentalExpAlert",
      "rentalCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //This section deals with Multiple Monthly payments
  if (myDOMs.rentalExp.ReoccurYES.checked === true) {

    mydata = {
      carDate: myDate,
      carnetAmt: myDOMs.rentalExp.NetAmt.value,
      carhstAmt: myDOMs.rentalExp.HSTAmt.value,
      carpstAmt: myDOMs.rentalExp.PSTAmt.value,
      carTotalAmt: myDOMs.rentalExp.TotalAmt.value,
      carDescription: myDOMs.rentalExp.Description.value,
      vendorSelect: myDOMs.rentalExp.Vendor.value,
      carExpCatSelect: myDOMs.rentalExp.Category.value,
      carExpReoccuring: 1,
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Rental"
    };


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
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          "Expenses Successfully Saved! ",
          '',
          " ",
          "GREEN",
          0
        );
        // alert(JSON.stringify(myDisplay, undefined, 2));
        myDOMs.rentalExp.EntryForm.reset();
        myDOMs.rentalExp.ReoccurYES.checked = false;
        myDOMs.rentalExp.ReoccurNO.checked = true;
        myDOMs.rentalExp.EntryDate.focus();

        await getAllMainData('Rental');
        fillMainDataFromArrays();
        updateRentalExpTableTotals();
      })
      .fail(function (e) {
        let myObjMsg = [
          "Reoccurring Rental Expense Entry Failed to POST to the database."
        ];

        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          "Expense Entry Failed! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      });
  } else {
    if (myDOMs.rentalExp.Checkbox.checked === true) {
      //Add expense with image
      let files = [];
      if (myDOMs.rentalExp.Img.getAttribute("src") === "") {
        let myObjMsg = [
          "To Save Receipt images with your expense,",
          "select the image with the choose file selector",
          "or, if using phone, take picture after clicking choose file",
          "and then submit the expense."
        ];

        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          "Unable to Save Expense! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return;
      } else {
        files = $("#imgloadRental").get(0).files;
      }

      formData = new FormData();

      if (files.length === 0) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
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
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
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
      formData.append("carnetAmt", myDOMs.rentalExp.NetAmt.value);
      formData.append("carhstAmt", myDOMs.rentalExp.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.rentalExp.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.rentalExp.TotalAmt.value);
      formData.append("carDescription", myDOMs.rentalExp.Description.value);
      formData.append("vendorSelect", myDOMs.rentalExp.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.rentalExp.Category.value);
      formData.append("expReceipt", true);
      formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
      formData.append("carNumber", "Rental");

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
            myDOMs.rentalExp.AlertContainer,
            "rentalExpAlert",
            "rentalCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            ` `,
            "GREEN",
            6000
          );
          myDOMs.rentalExp.EntryForm.reset();
          myDOMs.rentalExp.ReoccurYES.checked = false;
          myDOMs.rentalExp.ReoccurNO.checked = true;
          removeRentalImage();
          myDOMs.rentalExp.EntryDate.focus();

          await getAllMainData('Rental');
          fillMainDataFromArrays();
          updateRentalExpTableTotals();
        })
        .fail(function (err) {
          let myObjMsg = [
            "Rental Expense Entry Failed to POST to the database"
          ];

          displayAlert(
            myDOMs.rentalExp.AlertContainer,
            "rentalExpAlert",
            "rentalCloseBtnAlert",
            `Expense Entry Failed! `,
            myObjMsg,
            " ",
            "RED",
            6000
          );
          return;
        });
    } else {
      //rental expense without receipt image

      let mydata;

      mydata = {
        carDate: myDate,
        carnetAmt: myDOMs.rentalExp.NetAmt.value,
        carhstAmt: myDOMs.rentalExp.HSTAmt.value,
        carpstAmt: myDOMs.rentalExp.PSTAmt.value,
        carTotalAmt: myDOMs.rentalExp.TotalAmt.value,
        carDescription: myDOMs.rentalExp.Description.value,
        vendorSelect: myDOMs.rentalExp.Vendor.value,
        carExpCatSelect: myDOMs.rentalExp.Category.value,
        expReceipt: false,
        auth: window.sessionStorage.getItem('myRandomVar'),
        carNumber: "Rental"
      };

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
            myDOMs.rentalExp.AlertContainer,
            "rentalExpAlert",
            "rentalCloseBtnAlert",
            `${data.message} `,
            "",
            ` `,
            "GREEN",
            6000
          );
          myDOMs.rentalExp.EntryForm.reset();
          myDOMs.rentalExp.ReoccurYES.checked = false;
          myDOMs.rentalExp.ReoccurNO.checked = true;
          myDOMs.rentalExp.EntryDate.focus();

          await getAllMainData('Rental');
          fillMainDataFromArrays();
          updateRentalExpTableTotals();
        })
        .fail(function (err) {
          displayAlert(
            myDOMs.rentalExp.AlertContainer,
            "rentalExpAlert",
            "rentalCloseBtnAlert",
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

// //Smaller Functions

myDOMs.rentalExp.EntryDate.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.rentalExp.EntryDate.value)) {
    alert(`Because your Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.rentalExp.EntryDate.value = null;
    myDOMs.rentalExp.EntryDate.focus;
  }
});

myDOMs.rentalExp.Reset.addEventListener("click", function (e) {
  if (myDOMs.rentalExp.ExpID.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addRentalOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.rentalExp.EntryForm.reset();
      removeRentalImage();
      updateFormButtons('rental');
    } else {
      e.preventDefault();
    }
  }

});

async function addRentalOriginalValues() {
  let myTempID = myDOMs.rentalExp.BlindExpID.value;

  myDOMs.rentalExp.EntryDate.value = myOriginalData.Date;
  myDOMs.rentalExp.NetAmt.value = myOriginalData.Net.toFixed(2);
  myDOMs.rentalExp.HSTAmt.value = myOriginalData.Hst.toFixed(2);
  myDOMs.rentalExp.PSTAmt.value = myOriginalData.Pst.toFixed(2);
  myDOMs.rentalExp.TotalAmt.value = myOriginalData.Total.toFixed(2);
  myDOMs.rentalExp.Description.value = myOriginalData.Description;
  myDOMs.rentalExp.Vendor.value = myOriginalData.Vendor;
  myDOMs.rentalExp.Category.value = myOriginalData.Category;
  myDOMs.rentalExp.ExpID.value = 'SAVED';
  myOriginalData.Status = 'SAVED';
  myDOMs.rentalExp.ReoccurYES.checked = false;
  myDOMs.rentalExp.ReoccurNO.checked = true;

  if (myOriginalData.Receipt === true) {

    if (myOriginalData.ImageData !== null) {
      let img = new Image();
      let container = document.getElementById("myImgRental");
      img.src = myOriginalData.ImageData;
      container.setAttribute("src", img.src);
      myDOMs.rentalExp.Checkbox.checked = true;

    } else {
      myDOMs.rentalExp.Checkbox.checked = false;
      removeRentalImage();
    }
  } else {
    myDOMs.rentalExp.Checkbox.checked = false;
    removeRentalImage();
  }

  setRentalStatusColor();
}

function removeRentalImage() {
  myDOMs.rentalExp.Img.setAttribute("src", "");
  $(".custom-file-label").html("");
  myDOMs.rentalExp.FileSelector.value = "";
  updateRentalFormStatus();
}

function removeRentalBlindImage() {
  myDOMs.rentalExp.BlindImg.setAttribute("src", "");
};


function validateRentalEntryForm() {
  const rentalDate = document.forms["formRentalExpEntry"]["rentalDate"];
  const netAmt = document.forms["formRentalExpEntry"]["rentalnetAmt"];
  const hstAmt = document.forms["formRentalExpEntry"]["rentalhstAmt"];
  const pstAmt = document.forms["formRentalExpEntry"]["rentalpstAmt"];
  const totalAmt = document.forms["formRentalExpEntry"]["rentalTotalAmt"];
  const description = document.forms["formRentalExpEntry"]["rentalDescription"];
  const vendor = document.forms["formRentalExpEntry"]["vendorSelectRental"];
  const category = document.forms["formRentalExpEntry"]["rentalExpCatSelect"];

  if (rentalDate.value == "") {
    window.alert("Please Select a Date.");
    rentalDate.focus();
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
    window.alert("Please Select a Vendor or Click Add to create a new one.");
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

function updateRentalFormStatus() {
  // let tempSRC = window.location.href.slice(0, window.location.href.length - 1)
  if (myDOMs.rentalExp.ExpID.value === 'NEW') { return; }
  let dataMatch = true;
  if (myOriginalData.Date === myDOMs.rentalExp.EntryDate.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Net.toFixed(2) === myDOMs.rentalExp.NetAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Hst.toFixed(2) === myDOMs.rentalExp.HSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Pst.toFixed(2) === myDOMs.rentalExp.PSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Total.toFixed(2) === myDOMs.rentalExp.TotalAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Status === myDOMs.rentalExp.ExpID.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Description === myDOMs.rentalExp.Description.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Vendor === myDOMs.rentalExp.Vendor.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Category === myDOMs.rentalExp.Category.value) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.rentalExp.Checkbox.checked === myOriginalData.Checkbox) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.rentalExp.Img.src.length < 150 && myOriginalData.ImageData === null || myDOMs.rentalExp.Img.src.length > 149 && myOriginalData.ImageData !== null) {
    if (myOriginalData.ImageData !== null) {
      let myIndex;
      myIndex = myDOMs.rentalExp.Img.src.lastIndexOf(';base64,');
      let DOMdata = myDOMs.rentalExp.Img.src.slice(myIndex);
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
    myDOMs.rentalExp.ExpID.value = 'ALTERED';
    myOriginalData.Status = 'ALTERED';
  } else {
    myDOMs.rentalExp.ExpID.value = 'SAVED';
    myOriginalData.Status = 'SAVED';
  }
  setRentalStatusColor();
  // disableEnableBtn();
}

function setRentalStatusColor() {
  if (myDOMs.rentalExp.ExpID.value === 'ALTERED') {
    if (myDOMs.rentalExp.ExpID.classList.contains('text-danger')) {
    } else {
      myDOMs.rentalExp.ExpID.classList.add('text-danger');
    }
  } else {
    if (myDOMs.rentalExp.ExpID.classList.contains('text-danger')) {
      myDOMs.rentalExp.ExpID.classList.remove('text-danger');
    }
  }

}

myDOMs.rentalExp.ReoccurYES.addEventListener('click', function (e) {
  if (myDOMs.rentalExp.ExpID.value !== 'NEW') {
    e.preventDefault();
    alert('Monthly function is only available for NEW expenses!');
  }
})

function disableEnableFullSizeRentalImgBtn() {
  // alert('Buttons Called');
  if (myDOMs.rentalExp.Img.src.length > 149) {
    if ($('#rentalExpShowFullSize').hasClass('disabled')) {
      $('#rentalExpShowFullSize').removeClass("disabled");
    }

  } else {

    if ($('#rentalExpShowFullSize').hasClass('disabled')) {
    } else {
      $('#rentalExpShowFullSize').addClass("disabled");
    }
  }

}

function displayFullSizeRentalImage() {
  if (myDOMs.rentalExp.Img.src.length < 150) {
    if (myDOMs.rentalExp.ExpID.value === 'NEW') {
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
  img.src = myDOMs.rentalExp.Img.src;
  container.setAttribute("src", img.src);

}
