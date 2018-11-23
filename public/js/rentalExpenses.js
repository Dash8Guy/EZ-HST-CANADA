//Random Function
populateRentalCategories();
disableEnableFullSizeRentalImgBtn();

function displayRentalExpModal() {
  $("#RentalExpenseModal").modal("show");
}
function hideRentalExpModal() {
  myDOMs.rentalExp.EntryForm.reset();
  removeRentalImage();
  resetOriginalData();
  $("#RentalExpenseModal").modal("hide");
}
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
function emptyRentalCategorySelect() {
  for (i = myDOMs.rentalExp.Category.length - 1; i > 0; i--) {
    myDOMs.rentalExp.Category.remove(i);
  }
}
// //AJAX REQUESTS

function postmyRentalVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: myToken
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
      let myObjMsg = [err.responseJSON.body, err.responseJSON.fix];

      displayAlert(
        myDOMs.rentalExp.AlertContainer,
        "rentalExpAlert",
        "rentalCloseBtnAlert",
        `${err.responseJSON.title} `,
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
        auth: myToken
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
      auth: myToken
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

function populateRentalCategories() {
  //This code retrieves the Business expense Categories from the Database and inserts them into the forms Category dropdown list.
  //This will allow me to add functions to allow end-user to make changes to the list or add/remove items.
  $.ajax({
    url: `${serverURL}rentalCategorie`,
    method: "GET"
  })
    .done(function (data) {
      for (i = 0; i < data.rentalCategories.length; i++) {
        let optionRental = document.createElement("OPTION");
        txtRental = document.createTextNode(data.rentalCategories[i].text);
        optionRental.appendChild(txtRental);
        myDOMs.rentalExp.Category.insertBefore(
          optionRental,
          myDOMs.rentalExp.Category.lastChild
        );
      }
    })
    .fail(function (e) {
      alert("Rental Expense Category List was NOT retrieved Successfully!");
    });
}

function addRentalCategory() {
  let tempCat = prompt("Please enter the Category Name.");

  if (tempCat === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempCat === null) {
    return;
  }
  let catIsTaxed = false;
  let tempTaxed = prompt("Please Add true or False if Taxed");
  if (tempTaxed === "Yes") {
    catIsTaxed = true;
  } else {
    catIsTaxed = false;
  }

  $.ajax({
    url: `${serverURL}rentalCategorie`,
    method: "POST",
    data: {
      text: tempCat,
      taxed: catIsTaxed
    }
  })
    .done(function (data) {
      alert(JSON.stringify(data, undefined, 2));
    })
    .fail(function (e) {
      alert("Rental Expense Category was NOT Saved Successfully!");
    });
}

function updateRentalExpense() {
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
  let myTempDate;
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
        file = files[0];
        formData.append("imgload", file, file.name);
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
        file = files[0];
        formData.append("imgload", file, file.name);
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
  myDate.setHours(40);

  myTempDate = new Date(
    myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate()
  );

  formData.append("carDate", myTempDate);
  formData.append("carnetAmt", myDOMs.rentalExp.NetAmt.value);
  formData.append("carhstAmt", myDOMs.rentalExp.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.rentalExp.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.rentalExp.TotalAmt.value);
  formData.append("carDescription", myDOMs.rentalExp.Description.value);
  formData.append("vendorSelect", myDOMs.rentalExp.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.rentalExp.Category.value);
  formData.append("auth", myToken);
  formData.append("carNumber", "Rental");


  $.ajax({
    method: "PATCH",
    url: `${serverURL}carExpense/${expID}`,
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false
  })
    .done(function (data) {
      let myObjMsg = [""];

      displayAlert(
        myDOMs.rentalExp.AlertContainer,
        "rentalExpAlert",
        "rentalCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        `Expense ID: ${data.NewExpense._id}`,
        "GREEN",
        6000
      );
      //Code to update report array
      let carDate = myTempDate;
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

      let myDay = myDate.getDate();
      let myMonth = myDate.getMonth() + 1;
      let myYear = myDate.getFullYear();
      if (myDay < 10) {
        myDay = `0${myDay}`;
      }
      if (myMonth < 10) {
        myMonth = `0${myMonth}`;
      }

      myOriginalData.BlindID = data.NewExpense._id;
      myOriginalData.Category = myDOMs.rentalExp.Category.value;
      myOriginalData.Date = myYear + "-" + myMonth + "-" + myDay;

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
}

function deleteRentalExpense() {

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
      auth: myToken,
      carNumber: 'Rental'
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(function (data) {
        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          "Expense Successfully Deleted! ",
          "",
          `Exp ID: ${data.carexpense._id}`,
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

        let myUpdatedText = `You have ${
          curTableArray.length
          } Rental Expenses displayed on ${tempPageCount} pages.`;
        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);
        resetOriginalData();
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

function getRentalExpenses() {
  let tempData;

  tempData = {
    carNumber: "Rental",
    auth: myToken,
    startYear: startDate.getFullYear(),
    startMonth: startDate.getMonth(),
    startDay: startDate.getDate(),
    endYear: endDate.getFullYear(),
    endMonth: endDate.getMonth(),
    endDay: endDate.getDate()
  };

  $.ajax({
    method: "GET",
    url: `${serverURL}carExpense`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (myExpenses) {
      let tempPageCount;
      if (myExpenses.carexpense.length > rowCountPerPageDefault * 24) {
        if ((rowCountPerPageDefault = 10)) {
          tempPageCount = Math.ceil(myExpenses.carexpense.length / 25);
        } else if ((rowCountPerPageDefault = 25)) {
          tempPageCount = Math.ceil(myExpenses.carexpense.length / 50);
        } else if ((rowCountPerPageDefault = 50)) {
          tempPageCount = Math.ceil(myExpenses.carexpense.length / 100);
        } else if ((rowCountPerPageDefault = 100)) {
          tempPageCount = Math.ceil(myExpenses.carexpense.length / 500);
        }
      } else {
        tempPageCount = Math.ceil(
          myExpenses.carexpense.length / rowCountPerPageDefault
        );
      }
      curTableArray = myExpenses.carexpense;

      buildVehicleExpenseTable(
        myDOMs.main.AlertContainer,
        "mainTableAlert",
        "closeBtnAlertMain",
        `You have ${
        myExpenses.carexpense.length
        } Rental Expenses displayed on ${tempPageCount} pages.`,
        "TABLE CAR GREEN",
        0,
        0
      );

    })
    .fail(function (e) {
      if (e.readyState === 0 || myToken === '') {
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
  myDate.setHours(40);
  let myStartMonth = myDate.getMonth();
  let myStartYear = myDate.getFullYear();
  let myStartDay = myDate.getDate();
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
      dateYear: myStartYear,
      dateMonth: myStartMonth,
      dateDay: myStartDay,
      auth: myToken,
      carNumber: "Rental"
    };


    $.ajax({
      method: "POST",
      url: `${serverURL}carExpenseRecur`,
      dataType: "json",
      data: mydata
    })
      .done(function (data) {
        let myDisplay = [`The following are all the new expense ID's`];
        for (i = 0; i < data.insertedCount; i++) {
          myDisplay.push(data.insertedIds[i]);
        }
        displayAlert(
          myDOMs.rentalExp.AlertContainer,
          "rentalExpAlert",
          "rentalCloseBtnAlert",
          "Expenses Successfully Saved! ",
          myDisplay,
          " ",
          "GREEN",
          0
        );
        // alert(JSON.stringify(myDisplay, undefined, 2));
        myDOMs.rentalExp.EntryForm.reset();
        myDOMs.rentalExp.ReoccurYES.checked = false;
        myDOMs.rentalExp.ReoccurNO.checked = true;
        myDOMs.rentalExp.EntryDate.focus();
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
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append("imgload", file, file.name);
      }
      let myTempDate = new Date(
        myDate.getFullYear(),
        myDate.getMonth(),
        myDate.getDate()
      );
      formData.append("carDate", myTempDate);
      formData.append("carnetAmt", myDOMs.rentalExp.NetAmt.value);
      formData.append("carhstAmt", myDOMs.rentalExp.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.rentalExp.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.rentalExp.TotalAmt.value);
      formData.append("carDescription", myDOMs.rentalExp.Description.value);
      formData.append("vendorSelect", myDOMs.rentalExp.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.rentalExp.Category.value);
      formData.append("expReceipt", true);
      formData.append("auth", myToken);
      formData.append("carNumber", "Rental");

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false
      })
        .done(function (data) {
          let myObjMsg = [""];

          displayAlert(
            myDOMs.rentalExp.AlertContainer,
            "rentalExpAlert",
            "rentalCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            `Expense ID: ${data.newID}`,
            "GREEN",
            6000
          );
          myDOMs.rentalExp.EntryForm.reset();
          myDOMs.rentalExp.ReoccurYES.checked = false;
          myDOMs.rentalExp.ReoccurNO.checked = true;
          removeRentalImage();
          myDOMs.rentalExp.EntryDate.focus();
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
      let myTempDate = new Date(
        myDate.getFullYear(),
        myDate.getMonth(),
        myDate.getDate()
      );

      mydata = {
        carDate: myTempDate,
        carnetAmt: myDOMs.rentalExp.NetAmt.value,
        carhstAmt: myDOMs.rentalExp.HSTAmt.value,
        carpstAmt: myDOMs.rentalExp.PSTAmt.value,
        carTotalAmt: myDOMs.rentalExp.TotalAmt.value,
        carDescription: myDOMs.rentalExp.Description.value,
        vendorSelect: myDOMs.rentalExp.Vendor.value,
        carExpCatSelect: myDOMs.rentalExp.Category.value,
        expReceipt: false,
        auth: myToken,
        carNumber: "Rental"
      };

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: mydata,
        enctype: "multipart/form-data"
      })
        .done(function (data) {
          displayAlert(
            myDOMs.rentalExp.AlertContainer,
            "rentalExpAlert",
            "rentalCloseBtnAlert",
            `${data.message} `,
            "",
            `Expense ID: ${data.newID}`,
            "GREEN",
            6000
          );
          myDOMs.rentalExp.EntryForm.reset();
          myDOMs.rentalExp.ReoccurYES.checked = false;
          myDOMs.rentalExp.ReoccurNO.checked = true;
          myDOMs.rentalExp.EntryDate.focus();
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
