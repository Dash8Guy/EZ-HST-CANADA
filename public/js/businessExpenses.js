//this variable is the resized image
let ImgReceiptToSend;
//this variable is set to true if original image is smaller than 360 kb;
let imageTooSmall = false;
// populateBusinessCategories();
disableEnableFullSizeBusinessImgBtn();


function TestDateFormat() {
  let myNewDateTemp = new Date();
  let myNewDate = new Date(myNewDateTemp.getUTCFullYear(), myNewDateTemp.getUTCMonth(), myNewDateTemp.getUTCDate());
  myNewDate.setUTCHours(0);
  alert(myNewDate.toDateString());
  // myNewDate.setUTCDate(myNewDate.getUTCDate() - 1);
  // alert(myNewDate);
  // startDate = new Date(myDOMs.main_page.StartDate.value);

  // var myDate = new Date(2019, 0, 16);
  // var myDateFormat = myDate.toDateString(); //Wed Jan 16 2019
  // alert(myDateFormat);
  // var myDateFormat = myDate.toLocaleDateString(); //1/16/2019
  // alert(myDateFormat);
  // var myDateFormat = myDate.toLocaleString(); //1/16/2019, 12:00:00 AM
  // alert(myDateFormat);
  // var myDateFormat = myDate.toUTCString(); //Wed, 16 Jan 2019 04:00:00 GMT
  // alert(myDateFormat);
  // var myDateFormat = myDate.toISOString(); //2019-01-16T04:00:00.000Z
  // let myDateOnly = myDateFormat.substring(0, 10);
  // alert(myDateOnly);
  // var myDateFormat = myDate.toString(); //Wed Jan 16 2019 00:00:00 GMT-0400 (Atlantic Standard Time)
  // alert(myDateFormat);




  // let myYear = startDate.getUTCFullYear();
  // let myMonth = startDate.getUTCMonth();
  // let myDay = startDate.getUTCDate();

  // let myNewDate = new Date(myYear, myMonth, myDay);
  // myNewDate.setUTCHours(0);
  // //They are both the same
  // alert(startDate.toISOString());
  // alert(myNewDate.toISOString());

  // if (myDay < 10) {
  //   myDay = `0${myDay}`;
  // }
  // if (myMonth < 10) {
  //   myMonth = `0${myMonth}`;
  // }

  // myDOMs.main_page.StartDate.value = myYear + "-" + myMonth + "-" + myDay;

  // let myDate = new Date(2018, 0, 1);

  // alert(myDate.getHours());
  // alert(myDate.getUTCHours());
  // alert(myDate.getTimezoneOffset());

  // let myDate2 = new Date(myDOMs.main_page.StartDate.value).toISOString();

  // alert(myDate);
  // alert(myDate2);
  // myDate.setHours(-(myDate.getTimezoneOffset() / 60));
  // myDate = myDate.toISOString();



  // var userEnteredDate = "12/20/1989";
  // var parts = userEnteredDate.split("/");

  // var userEnteredDateISO = parts[2] + "-" + parts[0] + "-" + parts[1];

  // var userEnteredDateObj = new Date(userEnteredDateISO);
  // var dateFromAPI = new Date("1989-12-20T00:00:00Z");

  // var result = userEnteredDateObj.getTime() == dateFromAPI.getTime();
  // alert(userEnteredDateObj.toISOString());
  // alert(dateFromAPI);


  // alert(result);


  // let myDate = new Date(myDOMs.main_page.EndDate.value).toISOString();
  // let NumDate = Date.parse(myDate);
  // let newDate = new Date(NumDate);
  // alert(myDate);
  // alert(NumDate);
  // alert(newDate);

  // var userEnteredDate = new Date("12/20/1989");
  // var userEnteredDateTimeStamp = Date.UTC(userEnteredDate.getFullYear(), userEnteredDate.getMonth(), userEnteredDate.getDate());
  // alert(userEnteredDateTimeStamp);
  // var myDate = new Date(userEnteredDate.getFullYear(), userEnteredDate.getMonth(), userEnteredDate.getDate());
  // alert(myDate);
  // var dateFromAPI = new Date("1989-12-20T00:00:00Z");
  // var result = userEnteredDateTimeStamp == dateFromAPI.getTime();

  // alert(result);








  // alert(`Month: ${myDate.getUTCMonth()}`);
  // alert(`Date: ${myDate.getUTCDate()}`);
  // alert(`Year: ${myDate.getUTCFullYear()}`);
  // alert(`Day: ${myDate.getUTCDay()}`);
  // alert(`Hours: ${myDate.getUTCHours()}`);


  // let myStartMonth = myDate.getMonth();
  // let myStartYear = myDate.getFullYear();
  // let myStartDay = myDate.getDate();

  // alert(`Month: ${myStartMonth}`);
  // alert(`Year: ${myStartYear}`);
  // alert(`Day: ${myStartDay}`);


  // myYear = 2018;
  // myMonth = 1;
  // myDay = 3

  // if (myDay < 10) {
  //   myDay = `0${myDay}`;
  // }
  // if (myMonth < 10) {
  //   myMonth = `0${myMonth}`;
  // }

  // myDOMs.main_page.StartDate.value = myYear + "-" + myMonth + "-" + myDay;

  // let myOtherDate = new Date(myDOMs.main_page.StartDate.value).toISOString();

  // if (myDate > myOtherDate) {
  //   alert('It works');
  // } else {
  //   alert('my Date is before my other date');
  // }

  //myDate.setHours(20);
  //alert(myDate.getHours());
  //myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));
  //myDate = myDate.toISOString();
  //alert(myDate);
  //alert(myDate.toISOString());

  // let myTempDate = new Date(2018, 0, 1);
  // myTempDate.setHours(-(myTempDate.getTimezoneOffset() / 60));
  // alert(myTempDate.getHours());
  // alert(myTempDate.getTimezoneOffset() / 60);
  // alert(myTempDate);
  // alert(myTempDate.toISOString());
  // alert(myDate.getTimezoneOffset())
  // alert(myDate.getHours());
  // //myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  // myDate.setHours(25);
  // alert(myDate.getTimezoneOffset())
  // alert(myDate.getHours());
  // let myYear = myDate.getFullYear();
  // let myMonth = myDate.getMonth();
  // let myDay = myDate.getDate();

  // tempStartDate = new Date(myYear, myMonth, myDay).toISOString();
  // alert(tempStartDate);


  // alert(myDate.getTimezoneOffset());
  //alert(myDate.getHours());
  // alert(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  // alert(myNewDate);
  // alert(myDate.getHours());
  // alert(myDate.getHours() + (myDate.getTimezoneOffset() / 60));
  //myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));


  //let myUpdatedDate = myNewDate.toDateString();

  // alert(myNewDate);
  //myDate = myDate.toDateString();
  //myDate = myDate.toLocaleString('en-US', { timeZone: 'America/Glace_Bay' });
  //myDate = myDate.toLocaleString('en-US', { timeZone: 'America/Cancun' });
  // alert(tempStartDate);
};

function displayBusExpModal() {
  $("#BusExpenseModal").modal("show");

  let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.busExp.HSTAmtLabel.innerText = 'HST Amount'
  } else {
    myDOMs.busExp.HSTAmtLabel.innerText = 'GST Amount'
  }
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === 0 && TableOpen === false) {
    ToggleMenuBar();
  }

}
function hideBusExpModal() {

  myDOMs.busExp.EntryForm.reset();
  removeBusImage();
  resetOriginalData();
  savedTransactionLocked = false;
  $("#BusExpenseModal").modal("hide");
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === -108 && TableOpen === false) {

    ToggleMenuBar();
  }
}
function updateBusinessButtonText() {
  var isExpanded = $("#collapseBus1").hasClass("show");
  if (isExpanded) {
    myDOMs.busExp.ShowHideReceipt.innerText = "Show Receipt Controls";
  } else {
    myDOMs.busExp.ShowHideReceipt.innerText = "Hide Receipt Controls";
  }
}
function emptyBusVendorSelect() {
  for (i = myDOMs.busExp.Vendor.length - 1; i > 0; i--) {
    myDOMs.busExp.Vendor.remove(i);
  }
}
function addBusVehicleVendor() {
  let tempVendor = prompt("Please enter the Vendor/Supplier Name.");

  if (tempVendor === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempVendor === null) {
    return;
  }
  postmyBusVendor(tempVendor);
  let vendorBus = document.createElement("OPTION");
  let txtBus = document.createTextNode(tempVendor);
  vendorBus.appendChild(txtBus);
  myDOMs.busExp.Vendor.add(vendorBus);
}
// function emptyBusCategorySelect() {
//   for (i = myDOMs.busExp.Category.length - 1; i > 0; i--) {
//     myDOMs.busExp.Category.remove(i);
//   }
// }
// //AJAX REQUESTS

function postmyBusVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: window.sessionStorage.getItem('myRandomVar')
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}businessVendors`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let myObjMsg = [`${data.text} was added!`];

      displayAlert(
        myDOMs.busExp.AlertContainer,
        "busExpAlert",
        "busCloseBtnAlert",
        `Vendor/Supplier Successfully Saved! `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
    })
    .fail(function (err) {
      displayAlert(
        myDOMs.busExp.AlertContainer,
        "busExpAlert",
        "busCloseBtnAlert",
        `${err} `,
        myObjMsg,
        ` `,
        "RED",
        6000
      );
    });
}
function deleteSelectedBusinessVendor() {
  let mySelectedIndex = myDOMs.busExp.Vendor.selectedIndex;
  let selectedVendor = myDOMs.busExp.Vendor.value;

  if (selectedVendor === "") {
    displayAlert(
      myDOMs.busExp.AlertContainer,
      "busExpAlert",
      "busCloseBtnAlert",
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
      url: `${serverURL}businessVendors`,
      data: {
        text: selectedVendor,
        auth: window.sessionStorage.getItem('myRandomVar')
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          `${data.vendor.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.busExp.Vendor.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function populateBusinessVendors() {
  //This code retrieves the business expense Vendors from the Database and inserts them into the forms Vendor dropdown list.
  $.ajax({
    url: `${serverURL}businessVendors`,
    method: "GET",
    data: {
      auth: window.sessionStorage.getItem('myRandomVar')
    }
  })
    .done(function (data) {
      // if (data.businessVendors.length < 1) {
      //   vendorCar = false;
      // } else {
      //   vendorCar = true;
      // }
      for (i = 0; i < data.businessVendors.length; i++) {
        let tempVendorBus = document.createElement("OPTION");
        txtBus = document.createTextNode(data.businessVendors[i].text);
        tempVendorBus.appendChild(txtBus);
        myDOMs.busExp.Vendor.add(tempVendorBus);
      }
    })
    .fail(function (e) {
      alert("Business Expense Vendors List was NOT retrieved Successfully!");
    });
}

// function populateBusinessCategories() {
//   //This code retrieves the Business expense Categories from the Database and inserts them into the forms Category dropdown list.
//   //This will allow me to add functions to allow end-user to make changes to the list or add/remove items.
//   $.ajax({
//     url: `${serverURL}businessCategorie`,
//     method: "GET"
//   })
//     .done(function (data) {
//       for (i = 0; i < data.businessCategories.length; i++) {
//         let optionBus = document.createElement("OPTION");
//         txtBus = document.createTextNode(data.businessCategories[i].text);
//         optionBus.appendChild(txtBus);
//         myDOMs.busExp.Category.insertBefore(
//           optionBus,
//           myDOMs.busExp.Category.lastChild
//         );
//       }
//     })
//     .fail(function (e) {
//       alert("Business Expense Category List was NOT retrieved Successfully!");
//     });
// }

// function addBusinessCategory() {
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
//     url: `${serverURL}businessCategorie`,
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
//       alert("Business Expense Category was NOT Saved Successfully!");
//     });
// }

function updateBusinessExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addOriginalValues();
    return;
  }
  if (myDOMs.busExp.ExpID.value === 'SAVED') {
    displayAlert(
      myDOMs.busExp.AlertContainer,
      "busExpAlert",
      "buscloseBtnAlert",
      `Save Changes is only available when Expense Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.busExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.busExp.AlertContainer,
      "busExpAlert",
      "busCloseBtnAlert",
      `Save Changes is not available for New Expenses. To Save a New Expense, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.busExp.BlindExpID.value;
  let files = [];
  formData = new FormData();
  let file;
  let myDate;
  let myTempArr;
  let receiptPath = false;
  //Receipt to be saved in this if statement
  if (myDOMs.busExp.Checkbox.checked === true) {
    files = $("#imgloadBus").get(0).files;
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
        myDOMs.busExp.Img.src = myOriginalData.ImageData;
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

  myDate = new Date(myDOMs.busExp.EntryDate.value);


  formData.append("carDate", myDate);
  formData.append("carnetAmt", myDOMs.busExp.NetAmt.value);
  formData.append("carhstAmt", myDOMs.busExp.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.busExp.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.busExp.TotalAmt.value);
  formData.append("carDescription", myDOMs.busExp.Description.value);
  formData.append("vendorSelect", myDOMs.busExp.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.busExp.Category.value);
  formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
  formData.append("carNumber", "Bus");


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
        myDOMs.busExp.AlertContainer,
        "busExpAlert",
        "busCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
      //Code to update report array
      let carDate = myDate;
      let carNetAmt = parseFloat(myDOMs.busExp.NetAmt.value);
      let carHSTAmt = parseFloat(myDOMs.busExp.HSTAmt.value);
      let carPSTAmt = parseFloat(myDOMs.busExp.PSTAmt.value);
      let carTtlAmt = parseFloat(myDOMs.busExp.TotalAmt.value);
      let carDescription = myDOMs.busExp.Description.value;
      let carVendor = myDOMs.busExp.Vendor.value;
      let carCategory = myDOMs.busExp.Category.value;

      let BusData = {
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
      updateRequestedArray(selectedArrayNum, selectedRowNum, BusData);

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
      myOriginalData.Category = myDOMs.busExp.Category.value;
      myOriginalData.Date = `${myStartYear}-${myStartMonth}-${myStartDay}`;
      //myOriginalData.Date = myTempDate;
      myOriginalData.Description = myDOMs.busExp.Description.value;
      myOriginalData.Hst = parseFloat(myDOMs.busExp.HSTAmt.value);
      myOriginalData.Net = parseFloat(myDOMs.busExp.NetAmt.value);
      myOriginalData.Pst = parseFloat(myDOMs.busExp.PSTAmt.value);
      myOriginalData.Receipt = receiptPath;
      myOriginalData.Status = 'SAVED';
      myOriginalData.Total = parseFloat(myDOMs.busExp.TotalAmt.value);
      myOriginalData.Vendor = myDOMs.busExp.Vendor.value;

      myOriginalData.Checkbox = receiptPath;
      myOriginalData.MonthlyYES = false;
      myOriginalData.MonthlyNO = true;
      myOriginalData.ImageData = myDOMs.busExp.Img.src;

      if (receiptPath === false) {
        removeBusImage();
        myOriginalData.ImageData = null;
      }

      myOriginalData.Status = 'SAVED';
      myDOMs.busExp.ExpID.value = 'SAVED';
      setStatusColor();

      await getAllMainData('Business');
      fillMainDataFromArrays();
      updateBusinessExpTableTotals();
    })
    .fail(function (err) {
      let myObjMsg = ["Business Expense Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.busExp.AlertContainer,
        "busExpAlert",
        "busCloseBtnAlert",
        `Expense Entry Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function updateBusinessExpTableTotals() {
  if (!TableOpen) return;
  if (reOpenIncomeStatement) {
    switch (myReportTotal.category) {
      case 'Advertising':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Advertising).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.AdvertisingHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.AdvertisingPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Advertising + mainData.busExp.AdvertisingHST + mainData.busExp.AdvertisingPST).toFixed(2)))}`;
        break;
      case 'Dues':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Dues).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.DuesHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.DuesPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Dues + mainData.busExp.DuesHST + mainData.busExp.DuesPST).toFixed(2)))}`;
        break;
      case 'Meals':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Meals).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.MealsHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.MealsPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Meals + mainData.busExp.MealsHST + mainData.busExp.MealsPST).toFixed(2)))}`;
        break;
      case 'Office':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Office).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.OfficeHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.OfficePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Office + mainData.busExp.OfficeHST + mainData.busExp.OfficePST).toFixed(2)))}`;
        break;
      case 'Supplies':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Supplies).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.SuppliesHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.SuppliesPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Supplies + mainData.busExp.SuppliesHST + mainData.busExp.SuppliesPST).toFixed(2)))}`;
        break;
      case 'Cell':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Cell).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.CellHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.CellPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Cell + mainData.busExp.CellHST + mainData.busExp.CellPST).toFixed(2)))}`;
        break;
      case 'Other':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Other).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.OtherHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.OtherPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Other + mainData.busExp.OtherHST + mainData.busExp.OtherPST).toFixed(2)))}`;
        break;
      case 'Freight':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Freight).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.FreightHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.FreightPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Freight + mainData.busExp.FreightHST + mainData.busExp.FreightPST).toFixed(2)))}`;
        break;
      case 'Fuel':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Fuel).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.FuelHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.FuelPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Fuel + mainData.busExp.FuelHST + mainData.busExp.FuelPST).toFixed(2)))}`;
        break;
      case 'Insurance':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Insurance).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.InsuranceHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.InsurancePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Insurance + mainData.busExp.InsuranceHST + mainData.busExp.InsurancePST).toFixed(2)))}`;
        break;
      case 'Interest':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Interest).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.InterestHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.InterestPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Interest + mainData.busExp.InterestHST + mainData.busExp.InterestPST).toFixed(2)))}`;
        break;
      case 'Maintenance':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Maintenance).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.MaintenanceHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.MaintenancePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Maintenance + mainData.busExp.MaintenanceHST + mainData.busExp.MaintenancePST).toFixed(2)))}`;
        break;
      case 'Admin':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Admin).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.AdminHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.AdminPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Admin + mainData.busExp.AdminHST + mainData.busExp.AdminPST).toFixed(2)))}`;
        break;
      case 'Legal':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Legal).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.LegalHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.LegalPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Legal + mainData.busExp.LegalHST + mainData.busExp.LegalPST).toFixed(2)))}`;
        break;
      case 'Property_Tax':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Property_Tax).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Property_TaxHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Property_TaxPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Property_Tax + mainData.busExp.Property_TaxHST + mainData.busExp.Property_TaxPST).toFixed(2)))}`;
        break;
      case 'Rent':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Rent).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.RentHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.RentPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Rent + mainData.busExp.RentHST + mainData.busExp.RentPST).toFixed(2)))}`;
        break;
      case 'Wages':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Wages).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.WagesHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.WagesPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Wages + mainData.busExp.WagesHST + mainData.busExp.WagesPST).toFixed(2)))}`;
        break;
      case 'Travel':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Travel).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.TravelHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.TravelPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Travel + mainData.busExp.TravelHST + mainData.busExp.TravelPST).toFixed(2)))}`;
        break;
      case 'Variable1':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable1).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable1HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable1PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Variable1 + mainData.busExp.Variable1HST + mainData.busExp.Variable1PST).toFixed(2)))}`;
        break;
      case 'Variable2':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable2).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable2HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable2PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Variable2 + mainData.busExp.Variable2HST + mainData.busExp.Variable2PST).toFixed(2)))}`;
        break;
      case 'Variable3':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable3).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable3HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable3PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Variable3 + mainData.busExp.Variable3HST + mainData.busExp.Variable3PST).toFixed(2)))}`;
        break;
      case 'Variable4':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable4).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable4HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable4PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Variable4 + mainData.busExp.Variable4HST + mainData.busExp.Variable4PST).toFixed(2)))}`;
        break;
      case 'Variable5':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable5).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable5HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.Variable5PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.Variable5 + mainData.busExp.Variable5HST + mainData.busExp.Variable5PST).toFixed(2)))}`;
        break;
    }
  } else {
    document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.busExp.net).toFixed(2)))}`;
    document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.hst).toFixed(2)))}`;
    document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.busExp.pst).toFixed(2)))}`;
    document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.busExp.pst + mainData.busExp.net + mainData.busExp.hst).toFixed(2)))}`;
  }
}

function deleteBusinessExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }
  if (myDOMs.busExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.busExp.AlertContainer,
      "busExpAlert",
      "busCloseBtnAlert",
      `Delete is not available when Expense Status is NEW!!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let expID = myDOMs.busExp.BlindExpID.value;

  if (confirm("Are you sure you want to Delete this Expense?")) {
    let tempData;
    tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: 'Bus'
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          "Expense Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );
        //next 5 lines resets the expense entry form/modal
        myDOMs.busExp.EntryForm.reset();
        myDOMs.busExp.ReoccurYES.checked = false;
        myDOMs.busExp.ReoccurNO.checked = true;
        removeBusImage();
        updateFormButtons('business');
        myDOMs.busExp.EntryDate.focus();
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
            } Business(${tempTitle}) Expenses displayed on ${tempPageCount} pages.`;
        } else {
          myUpdatedText = `You have ${
            curTableArray.length
            } Business Expenses displayed on ${tempPageCount} pages.`;
        }

        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);
        resetOriginalData();

        await getAllMainData('Business');
        fillMainDataFromArrays();
        updateBusinessExpTableTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getBusinessExpenses(myFilter) {

  if (!myFilter) {
    myReportTotal.totalNet = (mainData.busExp.net + (mainData.busExp.Meals));
    myReportTotal.totalHST = (mainData.busExp.hst + (mainData.busExp.MealsHST));
    myReportTotal.totalPST = (mainData.busExp.pst + (mainData.busExp.MealsPST));
  }

  let tempData;

  tempData = {
    carNumber: "Bus",
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
      let tempTitle = 'Business Expenses';
      curTableArray = myExpenses.carexpense;

      if (myFilter) {
        myReportTotal.categoryFull = myFilter;
        tempTitle = `Business(${myFilter}) Expenses`;
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
      if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' | window.sessionStorage.getItem('myRandomVar') === null) {
        alert('You Must be logged in before using EZ-HST-CANADA>')
      } else {
        alert(JSON.stringify(e.statusText, undefined, 2));
      }
    });
}


$("#busExpBtn").click(function () {
  if (!validateBusinessEntryForm()) {
    return;
  }
  if (
    myDOMs.busExp.ExpID.value !== 'NEW' ||
    myDOMs.busExp.SubmitButton.classList.contains("disabled")
  ) {
    alert("To update existing expenses, Use the Save Changes button");
    return;
  }
  let myDate = new Date(myDOMs.busExp.EntryDate.value);

  //Send message when trying to add receipt image with multiple monthly payments
  if (
    myDOMs.busExp.ReoccurYES.checked === true &&
    myDOMs.busExp.Checkbox.checked === true
  ) {
    let myObjMsg = [
      "Receipt images cannot be saved when using reoccurring Monthly function.",
      "To add receipts to reoccurring Monthly expenses, add the receipt to each individual expense after saving with the reoccurring Monthly function!",
      "To continue with the reoccuring Monthly function, Uncheck the Include Receipt checkbox."
    ];

    displayAlert(
      myDOMs.busExp.AlertContainer,
      "busExpAlert",
      "busCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //verify if ID and if present warn user to use Save Changes
  if (myDOMs.busExp.ExpID.value !== "NEW") {
    let myObjMsg = [
      "The Submit button is only used to save a NEW expense.",
      "When Expense Status box displays SAVED or ALTERED, that expense is in the databse",
      "and to update any changes to it, use the Save Changes button.",
      "To Submit a new expense, first reset the form,",
      "fill the fields and then Submit!"
    ];

    displayAlert(
      myDOMs.busExp.AlertContainer,
      "busExpAlert",
      "busCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //This section deals with Multiple Monthly payments
  if (myDOMs.busExp.ReoccurYES.checked === true) {

    mydata = {
      carDate: myDate,
      carnetAmt: myDOMs.busExp.NetAmt.value,
      carhstAmt: myDOMs.busExp.HSTAmt.value,
      carpstAmt: myDOMs.busExp.PSTAmt.value,
      carTotalAmt: myDOMs.busExp.TotalAmt.value,
      carDescription: myDOMs.busExp.Description.value,
      vendorSelect: myDOMs.busExp.Vendor.value,
      carExpCatSelect: myDOMs.busExp.Category.value,
      carExpReoccuring: 1,
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Bus",
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
        //let myDisplay = [`The following are all the new expense ID's`];
        // for (i = 0; i < data.insertedCount; i++) {
        //   myDisplay.push(data.insertedIds[i]);
        // }
        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          "Expenses Successfully Saved! ",
          '',
          " ",
          "GREEN",
          0
        );
        // alert(JSON.stringify(myDisplay, undefined, 2));
        myDOMs.busExp.EntryForm.reset();
        myDOMs.busExp.ReoccurYES.checked = false;
        myDOMs.busExp.ReoccurNO.checked = true;
        myDOMs.busExp.EntryDate.focus();

        await getAllMainData('Business');
        fillMainDataFromArrays();
        updateBusinessExpTableTotals();
      })
      .fail(function (e) {
        let myObjMsg = [
          "Reoccurring Business Expense Entry Failed to POST to the database."
        ];

        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          "Expense Entry Failed! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      });
  } else {
    if (myDOMs.busExp.Checkbox.checked === true) {
      //Add expense with image
      let files = [];
      if (myDOMs.busExp.Img.getAttribute("src") === "") {
        let myObjMsg = [
          "To Save Receipt images with your expense,",
          "select the image with the choose file selector",
          "or, if using phone, take picture after clicking choose file",
          "and then submit the expense."
        ];

        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
          "Unable to Save Expense! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return;
      } else {
        files = $("#imgloadBus").get(0).files;
      }

      formData = new FormData();

      if (files.length === 0) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
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
          myDOMs.busExp.AlertContainer,
          "busExpAlert",
          "busCloseBtnAlert",
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

      // formData.append("carDate", myDate);
      formData.append("carDate", myDate);
      formData.append("carnetAmt", myDOMs.busExp.NetAmt.value);
      formData.append("carhstAmt", myDOMs.busExp.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.busExp.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.busExp.TotalAmt.value);
      formData.append("carDescription", myDOMs.busExp.Description.value);
      formData.append("vendorSelect", myDOMs.busExp.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.busExp.Category.value);
      formData.append("expReceipt", true);
      formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
      formData.append("carNumber", "Bus");


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
            myDOMs.busExp.AlertContainer,
            "busExpAlert",
            "busCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            ` `,
            "GREEN",
            6000
          );
          myDOMs.busExp.EntryForm.reset();
          myDOMs.busExp.ReoccurYES.checked = false;
          myDOMs.busExp.ReoccurNO.checked = true;
          removeBusImage();
          myDOMs.busExp.EntryDate.focus();

          await getAllMainData('Business');
          fillMainDataFromArrays();
          updateBusinessExpTableTotals();
        })
        .fail(function (err) {
          let myObjMsg = [
            "Business Expense Entry Failed to POST to the database"
          ];

          displayAlert(
            myDOMs.busExp.AlertContainer,
            "busExpAlert",
            "busCloseBtnAlert",
            `Expense Entry Failed! `,
            myObjMsg,
            " ",
            "RED",
            6000
          );
          return;
        });
    } else {
      //business expense without receipt image

      let mydata;
      // let myTempDate = new Date(
      //   myDate.getFullYear(),
      //   myDate.getMonth(),
      //   myDate.getDate()
      // );

      mydata = {
        carDate: myDate,
        carnetAmt: myDOMs.busExp.NetAmt.value,
        carhstAmt: myDOMs.busExp.HSTAmt.value,
        carpstAmt: myDOMs.busExp.PSTAmt.value,
        carTotalAmt: myDOMs.busExp.TotalAmt.value,
        carDescription: myDOMs.busExp.Description.value,
        vendorSelect: myDOMs.busExp.Vendor.value,
        carExpCatSelect: myDOMs.busExp.Category.value,
        expReceipt: false,
        auth: window.sessionStorage.getItem('myRandomVar'),
        carNumber: "Bus"
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
            myDOMs.busExp.AlertContainer,
            "busExpAlert",
            "busCloseBtnAlert",
            `${data.message} `,
            "",
            ` `,
            "GREEN",
            6000
          );
          myDOMs.busExp.EntryForm.reset();
          myDOMs.busExp.ReoccurYES.checked = false;
          myDOMs.busExp.ReoccurNO.checked = true;
          myDOMs.busExp.EntryDate.focus();

          await getAllMainData('Business');
          fillMainDataFromArrays();
          updateBusinessExpTableTotals();
        })
        .fail(function (err) {
          displayAlert(
            myDOMs.busExp.AlertContainer,
            "busExpAlert",
            "busCloseBtnAlert",
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

myDOMs.busExp.EntryDate.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.busExp.EntryDate.value)) {
    alert(`Because your Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.busExp.EntryDate.value = null;
    myDOMs.busExp.EntryDate.focus;
  }
});

myDOMs.busExp.Reset.addEventListener("click", function (e) {
  if (myDOMs.busExp.ExpID.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.busExp.EntryForm.reset();
      removeBusImage();
      updateFormButtons('business');
    } else {
      e.preventDefault();
    }
  }

});

function addOriginalValues() {
  let myTempID = myDOMs.busExp.BlindExpID.value;

  myDOMs.busExp.EntryDate.value = myOriginalData.Date;
  myDOMs.busExp.NetAmt.value = myOriginalData.Net.toFixed(2);
  myDOMs.busExp.HSTAmt.value = myOriginalData.Hst.toFixed(2);
  myDOMs.busExp.PSTAmt.value = myOriginalData.Pst.toFixed(2);
  myDOMs.busExp.TotalAmt.value = myOriginalData.Total.toFixed(2);
  myDOMs.busExp.Description.value = myOriginalData.Description;
  myDOMs.busExp.Vendor.value = myOriginalData.Vendor;
  myDOMs.busExp.Category.value = myOriginalData.Category;
  myDOMs.busExp.ExpID.value = 'SAVED';
  myOriginalData.Status = 'SAVED';
  myDOMs.busExp.ReoccurYES.checked = false;
  myDOMs.busExp.ReoccurNO.checked = true;

  if (myOriginalData.Receipt === true) {

    if (myOriginalData.ImageData !== null) {
      let img = new Image();
      let container = document.getElementById("myImgBus");
      img.src = myOriginalData.ImageData;
      container.setAttribute("src", img.src);
      myDOMs.busExp.Checkbox.checked = true;

    } else {
      myDOMs.busExp.Checkbox.checked = false;
      removeBusImage();
    }
  } else {
    myDOMs.busExp.Checkbox.checked = false;
    removeBusImage();
  }

  setStatusColor();
}

function removeBusImage() {
  myDOMs.busExp.Img.setAttribute("src", "");
  myDOMs.busExp.BlindImg.setAttribute("src", "");
  // $(".custom-file-label").html("");
  myDOMs.busExp.FileSelector.value = "";
  updateBusinessFormStatus();
};

function removeBusBlindImage() {
  myDOMs.busExp.BlindImg.setAttribute("src", "");
};

function validateBusinessEntryForm() {
  const busDate = document.forms["formBusExpEntry"]["busDate"];
  const netAmt = document.forms["formBusExpEntry"]["busnetAmt"];
  const hstAmt = document.forms["formBusExpEntry"]["bushstAmt"];
  const pstAmt = document.forms["formBusExpEntry"]["buspstAmt"];
  const totalAmt = document.forms["formBusExpEntry"]["busTotalAmt"];
  const description = document.forms["formBusExpEntry"]["busDescription"];
  const vendor = document.forms["formBusExpEntry"]["vendorSelectBus"];
  const category = document.forms["formBusExpEntry"]["busExpCatSelect"];

  if (busDate.value == "") {
    window.alert("Please Select a Date.");
    busDate.focus();
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

function resetOriginalData() {
  myOriginalData.Date = null;
  myOriginalData.Net = null;
  myOriginalData.Hst = null;
  myOriginalData.Pst = null;
  myOriginalData.Total = null;
  myOriginalData.Status = "NEW";
  myOriginalData.BlindID = null;
  myOriginalData.Description = null;
  myOriginalData.Vendor = null;
  myOriginalData.Category = null;
  myOriginalData.Receipt = false;
  myOriginalData.MonthlyYES = false;
  myOriginalData.MonthlyNO = true;
  myOriginalData.ImageData = null;
  myOriginalData.Checkbox = false;

}

let myOriginalData = {
  Date: null,
  Net: null,
  Hst: null,
  Pst: null,
  Total: null,
  Status: 'NEW',
  BlindID: null,
  Description: null,
  Vendor: null,
  Category: null,
  Receipt: false,
  MonthlyYES: false,
  MonthlyNO: true,
  ImageData: null,
  Checkbox: false
}

function updateBusinessFormStatus() {
  // let tempSRC = window.location.href.slice(0, window.location.href.length - 1)
  if (myDOMs.busExp.ExpID.value === 'NEW') { return; }
  let dataMatch = true;
  if (myOriginalData.Date === myDOMs.busExp.EntryDate.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Net.toFixed(2) === myDOMs.busExp.NetAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Hst.toFixed(2) === myDOMs.busExp.HSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Pst.toFixed(2) === myDOMs.busExp.PSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Total.toFixed(2) === myDOMs.busExp.TotalAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Status === myDOMs.busExp.ExpID.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Description === myDOMs.busExp.Description.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Vendor === myDOMs.busExp.Vendor.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Category === myDOMs.busExp.Category.value) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.busExp.Checkbox.checked === myOriginalData.Checkbox) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.busExp.Img.src.length < 150 && myOriginalData.ImageData === null || myDOMs.busExp.Img.src.length > 149 && myOriginalData.ImageData !== null) {
    if (myOriginalData.ImageData !== null) {
      let myIndex;
      myIndex = myDOMs.busExp.Img.src.lastIndexOf(';base64,');
      let DOMdata = myDOMs.busExp.Img.src.slice(myIndex);
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
    myDOMs.busExp.ExpID.value = 'ALTERED';
    myOriginalData.Status = 'ALTERED';
  } else {
    myDOMs.busExp.ExpID.value = 'SAVED';
    myOriginalData.Status = 'SAVED';
  }
  setStatusColor();

}

function setStatusColor() {
  if (myDOMs.busExp.ExpID.value === 'ALTERED') {
    if (myDOMs.busExp.ExpID.classList.contains('text-danger')) {
    } else {
      myDOMs.busExp.ExpID.classList.add('text-danger');
    }
  } else {
    if (myDOMs.busExp.ExpID.classList.contains('text-danger')) {
      myDOMs.busExp.ExpID.classList.remove('text-danger');
    }
  }

}

myDOMs.busExp.ReoccurYES.addEventListener('click', function (e) {
  if (myDOMs.busExp.ExpID.value !== 'NEW') {
    e.preventDefault();
    alert('Monthly function is only available for NEW expenses!');
  }
})

myDOMs.busExp.FileSelector.addEventListener('change', function (e) {
  updateBusinessFormStatus();
})

function disableEnableFullSizeBusinessImgBtn() {
  // alert('Buttons Called');
  if (myDOMs.busExp.Img.src.length > 149) {
    if ($('#busExpShowFullSize').hasClass('disabled')) {
      $('#busExpShowFullSize').removeClass("disabled");
    }

  } else {

    if ($('#busExpShowFullSize').hasClass('disabled')) {
    } else {
      $('#busExpShowFullSize').addClass("disabled");
    }
  }

}

function displayFullSizeBusinessImage() {
  if (myDOMs.busExp.Img.src.length < 150) {
    if (myDOMs.busExp.ExpID.value === 'NEW') {
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
  img.src = myDOMs.busExp.Img.src;
  container.setAttribute("src", img.src);

}


