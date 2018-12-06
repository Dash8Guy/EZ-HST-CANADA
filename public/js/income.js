//Random Function
populateIncomeParty();
disableEnableFullSizeIncomeImgBtn();


function displayIncomeModal(source) {
  $("#IncomeModal").modal("show");
  if (source === 'Business') {
    myDOMs.income.Selector.value = 'Business';
  } else if (source === 'Rental') {
    myDOMs.income.Selector.value = 'Rental';
  }
  updateIncomeHeader();
  myDOMs.income.EntryDate.focus();
}
function hideIncomeModal() {
  myDOMs.income.EntryForm.reset();
  removeIncomeImage();
  resetOriginalData();
  $("#IncomeModal").modal("hide");
}

function updateIncomeHeader() {
  if (myDOMs.income.Selector.value === "Business") {
    myDOMs.income.Title.textContent = "Business Revenue Entry Form";
  } else if (myDOMs.income.Selector.value === "Rental") {
    myDOMs.income.Title.textContent = "Rental Revenue Entry Form";
  }
}

function updateIncomeButtonText() {
  var isExpanded = $("#collapseIncome1").hasClass("show");
  if (isExpanded) {
    myDOMs.income.ShowHideReceipt.innerText = "Show Invoice Controls";
  } else {
    myDOMs.income.ShowHideReceipt.innerText = "Hide Invoice Controls";
  }
}
function emptyIncomeVendorSelect() {
  for (i = myDOMs.income.Vendor.length - 1; i > 0; i--) {
    myDOMs.income.Vendor.remove(i);
  }
}
function addIncomeVendor() {
  let tempVendor = prompt("Please enter the Client/Customer Name.");

  if (tempVendor === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempVendor === null) {
    return;
  }
  postmyIncomeVendor(tempVendor);
  let vendorIncome = document.createElement("OPTION");
  let txtIncome = document.createTextNode(tempVendor);
  vendorIncome.appendChild(txtIncome);
  myDOMs.income.Vendor.add(vendorIncome);
}
function emptyIncomePartySelect() {
  for (i = myDOMs.income.Party.length - 1; i > 0; i--) {
    myDOMs.income.Party.remove(i);
  }
}

function addIncomeParty() {
  let tempParty = prompt("Please enter the Income Party Name.");

  if (tempParty === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempParty === null) {
    return;
  }

  postmyIncomeParty(tempParty);
  let partyIncome = document.createElement("OPTION");
  let txtIncome = document.createTextNode(tempParty);
  partyIncome.appendChild(txtIncome);
  myDOMs.income.Party.add(partyIncome);
}
// // //AJAX REQUESTS

function postmyIncomeVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: myToken
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}incomeClients`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let myObjMsg = [`${data.text} was added!`];

      displayAlert(
        myDOMs.income.AlertContainer,
        "incomeExpAlert",
        "incomeCloseBtnAlert",
        `Client/Customer Successfully Saved! `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
    })
    .fail(function (err) {
      let myObjMsg = [err.responseJSON.body, err.responseJSON.fix];

      displayAlert(
        myDOMs.income.AlertContainer,
        "incomeExpAlert",
        "incomeCloseBtnAlert",
        `${err.responseJSON.title} `,
        myObjMsg,
        ` `,
        "RED",
        6000
      );
    });
}
function deleteSelectedIncomeVendor() {
  let mySelectedIndex = myDOMs.income.Vendor.selectedIndex;
  let selectedVendor = myDOMs.income.Vendor.value;

  if (selectedVendor === "") {
    displayAlert(
      myDOMs.income.AlertContainer,
      "incomeExpAlert",
      "incomeCloseBtnAlert",
      `Please Select a Client/Customer to Delete!`,
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
      url: `${serverURL}incomeClients`,
      data: {
        text: selectedVendor,
        auth: myToken
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          `${data.vendor.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.income.Vendor.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function populateIncomeVendors() {
  //This code retrieves the Income Clients from the Database and inserts them into the forms Clients dropdown list.
  $.ajax({
    url: `${serverURL}incomeClients`,
    method: "GET",
    data: {
      auth: myToken
    }
  })
    .done(function (data) {
      for (i = 0; i < data.incomeClients.length; i++) {
        let tempClientIncome = document.createElement("OPTION");
        txtIncome = document.createTextNode(data.incomeClients[i].text);
        tempClientIncome.appendChild(txtIncome);
        myDOMs.income.Vendor.add(tempClientIncome);
      }
    })
    .fail(function (e) {
      alert("Income Client List was NOT retrieved Successfully!");
    });
}

function populateIncomeParty() {
  //This code retrieves the  Income Party Represented from the Database and inserts them into the forms Category dropdown list.
  //This will allow me to add functions to allow end-user to make changes to the list or add/remove items.
  $.ajax({
    url: `${serverURL}incomeParty`,
    method: "GET"
  })
    .done(function (data) {
      for (i = 0; i < data.incomeParties.length; i++) {
        let optionParty = document.createElement("OPTION");
        txtParty = document.createTextNode(data.incomeParties[i].text);
        optionParty.appendChild(txtParty);
        myDOMs.income.Party.insertBefore(
          optionParty,
          myDOMs.income.Party.lastChild
        );
      }
    })
    .fail(function (e) {
      alert("Income Party Represented List was NOT retrieved Successfully!");
    });
}

function postmyIncomeParty(tempParty) {

  $.ajax({
    url: `${serverURL}incomeParty`,
    method: "POST",
    data: {
      text: tempParty,
      auth: myToken,
    }
  })
    .done(function (data) {
      let myObjMsg = [`${tempParty} was added!`];

      displayAlert(
        myDOMs.income.AlertContainer,
        "incomeExpAlert",
        "incomeCloseBtnAlert",
        `Party Represented Successfully Saved! `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
    })
    .fail(function (e) {

      displayAlert(
        myDOMs.income.AlertContainer,
        "incomeExpAlert",
        "incomeCloseBtnAlert",
        `Income Party was NOT Saved Successfully!`,
        '',
        ` `,
        "GREEN",
        6000
      );
    });
}

function deleteSelectedIncomeParty() {
  let mySelectedIndex = myDOMs.income.Party.selectedIndex;
  let selectedParty = myDOMs.income.Party.value;

  if (selectedParty === "") {
    displayAlert(
      myDOMs.income.AlertContainer,
      "incomeExpAlert",
      "incomeCloseBtnAlert",
      `Please Select a Party Represented to Delete!`,
      "",
      ` `,
      "RED",
      6000
    );
    return;
  }
  if (confirm(`Are you sure you want to Delete ${selectedParty}`)) {
    $.ajax({
      method: "DELETE",
      url: `${serverURL}incomeParty`,
      data: {
        text: selectedParty,
        auth: myToken
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          `${data.party.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.income.Party.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function updateIncome(source) {
  if (myDOMs.income.ExpID.value === 'SAVED') {
    displayAlert(
      myDOMs.income.AlertContainer,
      "incomeExpAlert",
      "incomecloseBtnAlert",
      `Save Changes is only available when Income Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.income.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.income.AlertContainer,
      "incomeExpAlert",
      "incomeCloseBtnAlert",
      `Save Changes is not available for New entries. To Save a New Income entry, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.income.BlindExpID.value;
  let files = [];
  formData = new FormData();
  let file;
  let myDate;
  let myTempDate;
  let myTempArr;
  let receiptPath = false;
  //Receipt to be saved in this if statement
  if (myDOMs.income.Checkbox.checked === true) {
    files = $("#imgloadIncome").get(0).files;
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
        myDOMs.income.Img.src = myOriginalData.ImageData;
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

  myDate = new Date(myDOMs.income.EntryDate.value);
  myDate.setHours(40);

  myTempDate = new Date(
    myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate()
  );

  formData.append("carDate", myTempDate);
  formData.append("carnetAmt", myDOMs.income.NetAmt.value);
  formData.append("carhstAmt", myDOMs.income.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.income.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.income.TotalAmt.value);
  formData.append("carDescription", myDOMs.income.Description.value);
  formData.append("vendorSelect", myDOMs.income.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.income.Party.value);
  formData.append("auth", myToken);
  formData.append("carNumber", "Income");
  formData.append("source", source);


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
        myDOMs.income.AlertContainer,
        "incomeExpAlert",
        "incomeCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        `Expense ID: ${data.NewExpense._id}`,
        "GREEN",
        6000
      );
      //Code to update report array
      let carDate = myTempDate;
      let carNetAmt = parseFloat(myDOMs.income.NetAmt.value);
      let carHSTAmt = parseFloat(myDOMs.income.HSTAmt.value);
      let carPSTAmt = parseFloat(myDOMs.income.PSTAmt.value);
      let carTtlAmt = parseFloat(myDOMs.income.TotalAmt.value);
      let carDescription = myDOMs.income.Description.value;
      let carVendor = myDOMs.income.Vendor.value;
      let carCategory = myDOMs.income.Party.value;

      let IncomeData = {
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
      updateRequestedArray(selectedArrayNum, selectedRowNum, IncomeData);

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
      myOriginalData.Category = myDOMs.income.Party.value;
      myOriginalData.Date = myYear + "-" + myMonth + "-" + myDay;
      //myOriginalData.Date = myTempDate;
      myOriginalData.Description = myDOMs.income.Description.value;
      myOriginalData.Hst = parseFloat(myDOMs.income.HSTAmt.value);
      myOriginalData.Net = parseFloat(myDOMs.income.NetAmt.value);
      myOriginalData.Pst = parseFloat(myDOMs.income.PSTAmt.value);
      myOriginalData.Receipt = receiptPath;
      myOriginalData.Status = 'SAVED';
      myOriginalData.Total = parseFloat(myDOMs.income.TotalAmt.value);
      myOriginalData.Vendor = myDOMs.income.Vendor.value;

      myOriginalData.Checkbox = receiptPath;
      myOriginalData.MonthlyYES = false;
      myOriginalData.MonthlyNO = true;
      myOriginalData.ImageData = myDOMs.income.Img.src;

      if (receiptPath === false) {
        removeIncomeImage();
        myOriginalData.ImageData = null;
      }

      myOriginalData.Status = 'SAVED';
      myDOMs.income.ExpID.value = 'SAVED';
      setIncomeStatusColor();

      await getAllMainData(`${source} Income`);
      fillMainDataFromArrays();
      updateHomeExpTableTotals(source);
    })
    .fail(function (err) {
      let myObjMsg = ["Revenue Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.income.AlertContainer,
        "incomeExpAlert",
        "incomeCloseBtnAlert",
        `Revenue Entry Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function deleteIncomeExpense() {
  let source = '';
  if (myDOMs.income.Selector.value === "Business") {
    source = 'Business';
  } else if (myDOMs.income.Selector.value === "Rental") {
    source = 'Rental'
  }
  if (myDOMs.income.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.deleteIncomeExpense.AlertContainer,
      "incomeExpAlert",
      "incomeCloseBtnAlert",
      `Delete is not available when Revenue Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let expID = myDOMs.income.BlindExpID.value;

  if (confirm("Are you sure you want to Delete this Revenue Entry?")) {
    let tempData;
    tempData = {
      auth: myToken,
      carNumber: 'Income',
      source: source
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          "Revenue Entry Successfully Deleted! ",
          "",
          `Exp ID: ${data.carexpense._id}`,
          "GREEN",
          6000
        );
        //next 5 lines resets the expense entry form/modal
        myDOMs.income.EntryForm.reset();
        myDOMs.income.ReoccurYES.checked = false;
        myDOMs.income.ReoccurNO.checked = true;
        removeIncomeImage();
        updateFormButtons('income');
        myDOMs.income.EntryDate.focus();
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
        let tempPartMsg;
        if (source === 'Rental') {
          tempPartMsg = 'Rental Revenue Entries';
        } else {
          tempPartMsg = 'Business Revenue Entries';
        }
        let myUpdatedText = `You have ${
          curTableArray.length
          } ${tempPartMsg} displayed on ${tempPageCount} pages.`;
        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);
        resetOriginalData();

        await getAllMainData(`${source} Income`);
        fillMainDataFromArrays();
        updateHomeExpTableTotals(source);
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getIncomeExpenses(source) {
  if (TableOpen) {
    if (reOpenIncomeStatement) {
      reOpenIncomeStatement = false;
    }
    hideTableAlert();
  }
  if (source === 'Rental') {
    myReportTotal.totalNet = mainData.RevenueRental.net;
    myReportTotal.totalHST = mainData.RevenueRental.hst;
    myReportTotal.totalPST = mainData.RevenueRental.pst;
  } else if (source === 'Business') {
    myReportTotal.totalNet = mainData.RevenueBus.net;
    myReportTotal.totalHST = mainData.RevenueBus.hst;
    myReportTotal.totalPST = mainData.RevenueBus.pst;
  }
  let tempData;

  tempData = {
    carNumber: "Income",
    auth: myToken,
    startYear: startDate.getFullYear(),
    startMonth: startDate.getMonth(),
    startDay: startDate.getDate(),
    endYear: endDate.getFullYear(),
    endMonth: endDate.getMonth(),
    endDay: endDate.getDate(),
    source: source
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
      let tempPartMsg;
      if (source === 'Rental') {
        tempPartMsg = 'Rental Revenue Entries';
      } else {
        tempPartMsg = 'Business Revenue Entries';
      }
      buildVehicleExpenseTable(
        myDOMs.main.AlertContainer,
        "mainTableAlert",
        "closeBtnAlertMain",
        `You have ${
        myExpenses.carexpense.length
        } ${tempPartMsg} displayed on ${tempPageCount} pages.`,
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

function updateHomeExpTableTotals(source) {
  if (!TableOpen) return;
  if (source === 'Business') {
    document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.RevenueBus.net).toFixed(2)))}`;
    document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.RevenueBus.hst).toFixed(2)))}`;
    document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.RevenueBus.pst).toFixed(2)))}`;
    document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.RevenueBus.pst + mainData.RevenueBus.net + mainData.RevenueBus.hst).toFixed(2)))}`;
  } else {
    document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.RevenueRental.net).toFixed(2)))}`;
    document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.RevenueRental.hst).toFixed(2)))}`;
    document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.RevenueRental.pst).toFixed(2)))}`;
    document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.RevenueRental.pst + mainData.RevenueRental.net + mainData.RevenueRental.hst).toFixed(2)))}`;
  }
}


$("#incomeExpBtn").click(function () {
  let source;
  let myTempMsg;
  let boldErrMsg;
  let tempErrMsg;
  if (myDOMs.income.Selector.value === "Business") {
    source = 'Business';
    myTempMsg = 'Business Revenue Successfully Saved!';
    boldErrMsg = 'Reoccurring Business Revenue Entry Failed to POST to the database.';
    tempErrMsg = 'Business Revenue Entry Failed!';
  } else if (myDOMs.income.Selector.value === "Rental") {
    source = 'Rental';
    myTempMsg = 'Rental Revenue Successfully Saved!';
    boldErrMsg = 'Reoccurring Rental Revenue Entry Failed to POST to the database.';
    tempErrMsg = 'Rental Revenue Entry Failed!';
  }
  if (!validateIncomeEntryForm()) {
    return;
  }
  if (
    myDOMs.income.ExpID.value !== 'NEW' ||
    myDOMs.income.SubmitButton.classList.contains("disabled")
  ) {
    alert("To update existing revenue, Use the Save Changes button");
    return;
  }
  let myDate = new Date(myDOMs.income.EntryDate.value);
  myDate.setHours(40);
  let myStartMonth = myDate.getMonth();
  let myStartYear = myDate.getFullYear();
  let myStartDay = myDate.getDate();
  //Send message when trying to add receipt image with multiple monthly payments
  if (
    myDOMs.income.ReoccurYES.checked === true &&
    myDOMs.income.Checkbox.checked === true
  ) {
    let myObjMsg = [
      "Invoice images cannot be saved when using reoccurring Monthly function.",
      "To add invoice to reoccurring Monthly revenue, add the invoice to each individual revenue after saving with the reoccurring Monthly function!",
      "To continue with the reoccuring Monthly function, Uncheck the Include Invoice checkbox."
    ];

    displayAlert(
      myDOMs.income.AlertContainer,
      "incomeExpAlert",
      "incomeCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //verify if ID and if present warn user to use Save Changes
  if (myDOMs.income.ExpID.value !== "NEW") {
    let myObjMsg = [
      "The Submit button is only used to save a NEW Revnue Entry.",
      "When Revenue Status box displays SAVED or ALTERED, that revenue is in the databse",
      "and to update any changes to it, use the Save Changes button.",
      "To Submit a new revenue, first reset the form,",
      "fill the fields and then Submit!"
    ];

    displayAlert(
      myDOMs.income.AlertContainer,
      "incomeExpAlert",
      "incomeCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //This section deals with Multiple Monthly payments
  if (myDOMs.income.ReoccurYES.checked === true) {

    mydata = {
      carDate: myDate,
      carnetAmt: myDOMs.income.NetAmt.value,
      carhstAmt: myDOMs.income.HSTAmt.value,
      carpstAmt: myDOMs.income.PSTAmt.value,
      carTotalAmt: myDOMs.income.TotalAmt.value,
      carDescription: myDOMs.income.Description.value,
      vendorSelect: myDOMs.income.Vendor.value,
      carExpCatSelect: myDOMs.income.Party.value,
      carExpReoccuring: 1,
      dateYear: myStartYear,
      dateMonth: myStartMonth,
      dateDay: myStartDay,
      auth: myToken,
      carNumber: "Income",
      source: source
    };


    $.ajax({
      method: "POST",
      url: `${serverURL}carExpenseRecur`,
      dataType: "json",
      data: mydata
    })
      .done(async function (data) {
        let myDisplay = [`The following are all the new Revenue Entry ID's`];
        for (i = 0; i < data.insertedCount; i++) {
          myDisplay.push(data.insertedIds[i]);
        }
        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          myTempMsg,
          myDisplay,
          " ",
          "GREEN",
          0
        );
        myDOMs.income.EntryForm.reset();
        myDOMs.income.ReoccurYES.checked = false;
        myDOMs.income.ReoccurNO.checked = true;
        myDOMs.income.EntryDate.focus();

        await getAllMainData(`${source} Income`);
        fillMainDataFromArrays();
        updateHomeExpTableTotals(source);
      })
      .fail(function (e) {
        let myObjMsg = [
          boldErrMsg
        ];

        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          tempErrMsg,
          myObjMsg,
          " ",
          "RED",
          6000
        );
      });
  } else {
    if (myDOMs.income.Checkbox.checked === true) {
      //Add expense with image
      let files = [];
      if (myDOMs.income.Img.getAttribute("src") === "") {
        let myObjMsg = [
          "To Save Invoice images with your revenue entry,",
          "select the image with the choose file selector",
          "or, if using phone, take picture after clicking choose file",
          "and then submit the revenue."
        ];

        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          "Unable to Save Revenue Entry! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return;
      } else {
        files = $("#imgloadIncome").get(0).files;
      }

      formData = new FormData();

      if (files.length === 0) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
          "Select at least 1 invoice image file to upload! ",
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
          myDOMs.income.AlertContainer,
          "incomeExpAlert",
          "incomeCloseBtnAlert",
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
      formData.append("carnetAmt", myDOMs.income.NetAmt.value);
      formData.append("carhstAmt", myDOMs.income.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.income.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.income.TotalAmt.value);
      formData.append("carDescription", myDOMs.income.Description.value);
      formData.append("vendorSelect", myDOMs.income.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.income.Party.value);
      formData.append("expReceipt", true);
      formData.append("auth", myToken);
      formData.append("carNumber", "Income");
      formData.append("source", source);

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false
      })
        .done(async function (data) {
          let myObjMsg = [""];

          displayAlert(
            myDOMs.income.AlertContainer,
            "incomeExpAlert",
            "incomeCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            `Revenue ID: ${data.newID}`,
            "GREEN",
            6000
          );
          myDOMs.income.EntryForm.reset();
          myDOMs.income.ReoccurYES.checked = false;
          myDOMs.income.ReoccurNO.checked = true;
          removeIncomeImage();
          myDOMs.income.EntryDate.focus();

          await getAllMainData(`${source} Income`);
          fillMainDataFromArrays();
          updateHomeExpTableTotals(source);
        })
        .fail(function (err) {
          let myObjMsg = [
            "Revenue Entry Failed to POST to the database"
          ];

          displayAlert(
            myDOMs.income.AlertContainer,
            "incomeExpAlert",
            "incomeCloseBtnAlert",
            `Revenue Entry Failed! `,
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
      let myTempDate = new Date(
        myDate.getFullYear(),
        myDate.getMonth(),
        myDate.getDate()
      );

      mydata = {
        carDate: myTempDate,
        carnetAmt: myDOMs.income.NetAmt.value,
        carhstAmt: myDOMs.income.HSTAmt.value,
        carpstAmt: myDOMs.income.PSTAmt.value,
        carTotalAmt: myDOMs.income.TotalAmt.value,
        carDescription: myDOMs.income.Description.value,
        vendorSelect: myDOMs.income.Vendor.value,
        carExpCatSelect: myDOMs.income.Party.value,
        expReceipt: false,
        auth: myToken,
        carNumber: "Income",
        source: source
      };

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: mydata,
        enctype: "multipart/form-data"
      })
        .done(async function (data) {
          displayAlert(
            myDOMs.income.AlertContainer,
            "incomeExpAlert",
            "incomeCloseBtnAlert",
            `${data.message} `,
            "",
            `Revenue ID: ${data.newID}`,
            "GREEN",
            6000
          );
          myDOMs.income.EntryForm.reset();
          myDOMs.income.ReoccurYES.checked = false;
          myDOMs.income.ReoccurNO.checked = true;
          myDOMs.income.EntryDate.focus();

          await getAllMainData(`${source} Income`);
          fillMainDataFromArrays();
          updateHomeExpTableTotals(source);
        })
        .fail(function (err) {
          displayAlert(
            myDOMs.income.AlertContainer,
            "incomeExpAlert",
            "incomeCloseBtnAlert",
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

// // //Smaller Functions

myDOMs.income.Reset.addEventListener("click", function (e) {
  if (myDOMs.income.ExpID.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addIncomeOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.income.EntryForm.reset();
      removeIncomeImage();
      updateFormButtons('income');
    } else {
      e.preventDefault();
    }
  }

});

async function addIncomeOriginalValues() {
  let myTempID = myDOMs.income.BlindExpID.value;

  myDOMs.income.EntryDate.value = myOriginalData.Date;
  myDOMs.income.NetAmt.value = myOriginalData.Net.toFixed(2);
  myDOMs.income.HSTAmt.value = myOriginalData.Hst.toFixed(2);
  myDOMs.income.PSTAmt.value = myOriginalData.Pst.toFixed(2);
  myDOMs.income.TotalAmt.value = myOriginalData.Total.toFixed(2);
  myDOMs.income.Description.value = myOriginalData.Description;
  myDOMs.income.Vendor.value = myOriginalData.Vendor;
  myDOMs.income.Party.value = myOriginalData.Category;
  myDOMs.income.ExpID.value = 'SAVED';
  myOriginalData.Status = 'SAVED';
  myDOMs.income.ReoccurYES.checked = false;
  myDOMs.income.ReoccurNO.checked = true;

  if (myOriginalData.Receipt === true) {

    if (myOriginalData.ImageData !== null) {
      let img = new Image();
      let container = document.getElementById("myImgIncome");
      img.src = myOriginalData.ImageData;
      container.setAttribute("src", img.src);
      myDOMs.income.Checkbox.checked = true;

    } else {
      myDOMs.income.Checkbox.checked = false;
      removeIncomeImage();
    }
  } else {
    myDOMs.income.Checkbox.checked = false;
    removeIncomeImage();
  }

  setIncomeStatusColor();
}

function removeIncomeImage() {
  myDOMs.income.Img.setAttribute("src", "");
  $(".custom-file-label").html("");
  myDOMs.income.FileSelector.value = "";
  updateIncomeFormStatus();
}

function validateIncomeEntryForm() {
  const homeDate = document.forms["formIncomeEntry"]["incomeDate"];
  const netAmt = document.forms["formIncomeEntry"]["incomenetAmt"];
  const hstAmt = document.forms["formIncomeEntry"]["incomehstAmt"];
  const pstAmt = document.forms["formIncomeEntry"]["incomepstAmt"];
  const totalAmt = document.forms["formIncomeEntry"]["incomeTotalAmt"];
  const description = document.forms["formIncomeEntry"]["incomeDescription"];
  const vendor = document.forms["formIncomeEntry"]["vendorSelectIncome"];
  const category = document.forms["formIncomeEntry"]["incomePartySelect"];

  if (homeDate.value == "") {
    window.alert("Please Select a Date.");
    homeDate.focus();
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
    window.alert("Please Select a Client or Click Add to create a new one.");
    vendor.focus();
    return false;
  }

  if (category.value == "") {
    window.alert("Please Select a Party Represented.");
    category.focus();
    return false;
  }
  return true;
}


function updateIncomeFormStatus() {
  // let tempSRC = window.location.href.slice(0, window.location.href.length - 1)
  if (myDOMs.income.ExpID.value === 'NEW') { return; }
  let dataMatch = true;
  if (myOriginalData.Date === myDOMs.income.EntryDate.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Net.toFixed(2) === myDOMs.income.NetAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Hst.toFixed(2) === myDOMs.income.HSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Pst.toFixed(2) === myDOMs.income.PSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Total.toFixed(2) === myDOMs.income.TotalAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Status === myDOMs.income.ExpID.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Description === myDOMs.income.Description.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Vendor === myDOMs.income.Vendor.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Category === myDOMs.income.Party.value) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.income.Checkbox.checked === myOriginalData.Checkbox) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.income.Img.src.length < 150 && myOriginalData.ImageData === null || myDOMs.income.Img.src.length > 149 && myOriginalData.ImageData !== null) {
    if (myOriginalData.ImageData !== null) {
      let myIndex;
      myIndex = myDOMs.income.Img.src.lastIndexOf(';base64,');
      let DOMdata = myDOMs.income.Img.src.slice(myIndex);
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
    myDOMs.income.ExpID.value = 'ALTERED';
    myOriginalData.Status = 'ALTERED';
  } else {
    myDOMs.income.ExpID.value = 'SAVED';
    myOriginalData.Status = 'SAVED';
  }
  setIncomeStatusColor();
}

function setIncomeStatusColor() {
  if (myDOMs.income.ExpID.value === 'ALTERED') {
    if (myDOMs.income.ExpID.classList.contains('text-danger')) {
    } else {
      myDOMs.income.ExpID.classList.add('text-danger');
    }
  } else {
    if (myDOMs.income.ExpID.classList.contains('text-danger')) {
      myDOMs.income.ExpID.classList.remove('text-danger');
    }
  }

}

myDOMs.income.ReoccurYES.addEventListener('click', function (e) {
  if (myDOMs.income.ExpID.value !== 'NEW') {
    e.preventDefault();
    alert('Monthly function is only available for NEW revenue entries!');
  }
})

function disableEnableFullSizeIncomeImgBtn() {
  if (myDOMs.income.Img.src.length > 149) {
    if ($('#incomeExpShowFullSize').hasClass('disabled')) {
      $('#incomeExpShowFullSize').removeClass("disabled");
    }

  } else {

    if ($('#incomeExpShowFullSize').hasClass('disabled')) {
    } else {
      $('#incomeExpShowFullSize').addClass("disabled");
    }
  }

}


function displayFullSizeIncomeImage() {
  if (myDOMs.income.Img.src.length < 150) {
    if (myDOMs.income.ExpID.value === 'NEW') {
      alert("No Invoice Image Selected!");
      return;
    } else {
      alert("No Invoice Image Included with this Revenue!");
      return;
    }
  }
  $("#ImageViewModal").modal("show");
  let myTitle = document.getElementById('ImageViewTitle');
  myTitle.innerText = 'Invoice Image';
  let img = new Image();
  let container = document.getElementById("ModalImageTag");
  img.src = myDOMs.income.Img.src;
  container.setAttribute("src", img.src);

}
