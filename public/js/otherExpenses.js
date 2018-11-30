//Random Function
populateOtherCategories();
disableEnableFullSizeOtherImgBtn();

function displayOtherExpModal() {
  $("#OtherExpenseModal").modal("show");
}
function hideOtherExpModal() {
  myDOMs.otherExp.EntryForm.reset();
  removeOtherImage();
  resetOriginalData();
  $("#OtherExpenseModal").modal("hide");
}
function updateOtherButtonText() {
  var isExpanded = $("#collapseOther1").hasClass("show");
  if (isExpanded) {
    myDOMs.otherExp.ShowHideReceipt.innerText = "Show Receipt Controls";
  } else {
    myDOMs.otherExp.ShowHideReceipt.innerText = "Hide Receipt Controls";
  }
}
function emptyOtherVendorSelect() {
  for (i = myDOMs.otherExp.Vendor.length - 1; i > 0; i--) {
    myDOMs.otherExp.Vendor.remove(i);
  }
}
function addOtherVendor() {
  let tempVendor = prompt("Please enter the Vendor/Supplier Name.");

  if (tempVendor === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempVendor === null) {
    return;
  }
  postmyOtherVendor(tempVendor);
  let vendorOther = document.createElement("OPTION");
  let txtOther = document.createTextNode(tempVendor);
  vendorOther.appendChild(txtOther);
  myDOMs.otherExp.Vendor.add(vendorOther);
}
function emptyOtherCategorySelect() {
  for (i = myDOMs.otherExp.Category.length - 1; i > 0; i--) {
    myDOMs.otherExp.Category.remove(i);
  }
}
// //AJAX REQUESTS

function postmyOtherVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: myToken
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}otherVendors`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let myObjMsg = [`${data.text} was added!`];

      displayAlert(
        myDOMs.otherExp.AlertContainer,
        "otherExpAlert",
        "otherCloseBtnAlert",
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
        myDOMs.otherExp.AlertContainer,
        "otherExpAlert",
        "otherCloseBtnAlert",
        `${err.responseJSON.title} `,
        myObjMsg,
        ` `,
        "RED",
        6000
      );
    });
}
function deleteSelectedOtherVendor() {
  let mySelectedIndex = myDOMs.otherExp.Vendor.selectedIndex;
  let selectedVendor = myDOMs.otherExp.Vendor.value;

  if (selectedVendor === "") {
    displayAlert(
      myDOMs.otherExp.AlertContainer,
      "otherExpAlert",
      "otherCloseBtnAlert",
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
      url: `${serverURL}otherVendors`,
      data: {
        text: selectedVendor,
        auth: myToken
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          `${data.vendor.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.otherExp.Vendor.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function populateOtherVendors() {
  //This code retrieves the home expense Vendors from the Database and inserts them into the forms Vendor dropdown list.
  $.ajax({
    url: `${serverURL}otherVendors`,
    method: "GET",
    data: {
      auth: myToken
    }
  })
    .done(function (data) {
      for (i = 0; i < data.otherVendors.length; i++) {
        let tempVendorOther = document.createElement("OPTION");
        txtOther = document.createTextNode(data.otherVendors[i].text);
        tempVendorOther.appendChild(txtOther);
        myDOMs.otherExp.Vendor.add(tempVendorOther);
      }
    })
    .fail(function (e) {
      alert("Other Expense Vendors List was NOT retrieved Successfully!");
    });
}

function populateOtherCategories() {
  //This code retrieves the Other expense Categories from the Database and inserts them into the forms Category dropdown list.
  //This will allow me to add functions to allow end-user to make changes to the list or add/remove items.
  $.ajax({
    url: `${serverURL}otherCategorie`,
    method: "GET"
  })
    .done(function (data) {
      //alert(JSON.stringify(data, undefined, 2));
      for (i = 0; i < data.otherCategories.length; i++) {
        let optionOther = document.createElement("OPTION");
        txtOther = document.createTextNode(data.otherCategories[i].text);
        optionOther.appendChild(txtOther);
        myDOMs.otherExp.Category.insertBefore(
          optionOther,
          myDOMs.otherExp.Category.lastChild
        );
      }
    })
    .fail(function (e) {
      alert("Other Expense Category List was NOT retrieved Successfully!");
    });
}

function addOtherCategory() {
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
    url: `${serverURL}otherCategorie`,
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
      alert("Other Expense Category was NOT Saved Successfully!");
    });
}

function updateOtherExpense() {
  if (myDOMs.otherExp.ExpID.value === 'SAVED') {
    displayAlert(
      myDOMs.otherExp.AlertContainer,
      "otherExpAlert",
      "othercloseBtnAlert",
      `Save Changes is only available when Expense Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.otherExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.otherExp.AlertContainer,
      "otherExpAlert",
      "otherCloseBtnAlert",
      `Save Changes is not available for New Expenses. To Save a New Expense, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.otherExp.BlindExpID.value;
  let files = [];
  formData = new FormData();
  let file;
  let myDate;
  let myTempDate;
  let myTempArr;
  let receiptPath = false;
  //Receipt to be saved in this if statement
  if (myDOMs.otherExp.Checkbox.checked === true) {
    files = $("#imgloadOther").get(0).files;
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
        myDOMs.otherExp.Img.src = myOriginalData.ImageData;
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

  myDate = new Date(myDOMs.otherExp.EntryDate.value);
  myDate.setHours(40);

  myTempDate = new Date(
    myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate()
  );

  formData.append("carDate", myTempDate);
  formData.append("carnetAmt", myDOMs.otherExp.NetAmt.value);
  formData.append("carhstAmt", myDOMs.otherExp.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.otherExp.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.otherExp.TotalAmt.value);
  formData.append("carDescription", myDOMs.otherExp.Description.value);
  formData.append("vendorSelect", myDOMs.otherExp.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.otherExp.Category.value);
  formData.append("auth", myToken);
  formData.append("carNumber", "Other");


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
        myDOMs.otherExp.AlertContainer,
        "otherExpAlert",
        "otherCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        `Expense ID: ${data.NewExpense._id}`,
        "GREEN",
        6000
      );
      //Code to update report array
      let carDate = myTempDate;
      let carNetAmt = parseFloat(myDOMs.otherExp.NetAmt.value);
      let carHSTAmt = parseFloat(myDOMs.otherExp.HSTAmt.value);
      let carPSTAmt = parseFloat(myDOMs.otherExp.PSTAmt.value);
      let carTtlAmt = parseFloat(myDOMs.otherExp.TotalAmt.value);
      let carDescription = myDOMs.otherExp.Description.value;
      let carVendor = myDOMs.otherExp.Vendor.value;
      let carCategory = myDOMs.otherExp.Category.value;

      let OtherData = {
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
      updateRequestedArray(selectedArrayNum, selectedRowNum, OtherData);

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
      myOriginalData.Category = myDOMs.otherExp.Category.value;
      myOriginalData.Date = myYear + "-" + myMonth + "-" + myDay;
      //myOriginalData.Date = myTempDate;
      myOriginalData.Description = myDOMs.otherExp.Description.value;
      myOriginalData.Hst = parseFloat(myDOMs.otherExp.HSTAmt.value);
      myOriginalData.Net = parseFloat(myDOMs.otherExp.NetAmt.value);
      myOriginalData.Pst = parseFloat(myDOMs.otherExp.PSTAmt.value);
      myOriginalData.Receipt = receiptPath;
      myOriginalData.Status = 'SAVED';
      myOriginalData.Total = parseFloat(myDOMs.otherExp.TotalAmt.value);
      myOriginalData.Vendor = myDOMs.otherExp.Vendor.value;

      myOriginalData.Checkbox = receiptPath;
      myOriginalData.MonthlyYES = false;
      myOriginalData.MonthlyNO = true;
      myOriginalData.ImageData = myDOMs.otherExp.Img.src;

      if (receiptPath === false) {
        removeOtherImage();
        myOriginalData.ImageData = null;
      }

      myOriginalData.Status = 'SAVED';
      myDOMs.otherExp.ExpID.value = 'SAVED';
      setHomeStatusColor();

      await getAllMainData();
      fillMainDataFromArrays();
      updateOtherCostsTableTotals();

    })
    .fail(function (err) {
      let myObjMsg = ["Other Expense Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.otherExp.AlertContainer,
        "otherExpAlert",
        "otherCloseBtnAlert",
        `Expense Entry Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function updateOtherCostsTableTotals() {
  if (!TableOpen) return;
  if (reOpenIncomeStatement) {
    switch (myReportTotal.category) {
      case 'Goods':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Goods).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.GoodsHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.GoodsPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Goods + mainData.otherCostsExp.GoodsHST + mainData.otherCostsExp.GoodsPST).toFixed(2)))}`;
        break;
      case 'Subcontracts':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Subcontracts).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.SubcontractsHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.SubcontractsPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Subcontracts + mainData.otherCostsExp.SubcontractsHST + mainData.otherCostsExp.SubcontractsPST).toFixed(2)))}`;
        break;
      case 'Direct_Wage':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Direct_Wage).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Direct_WageHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Direct_WagePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Direct_Wage + mainData.otherCostsExp.Direct_WageHST + mainData.otherCostsExp.Direct_WagePST).toFixed(2)))}`;
        break;
      case 'Other_Costs':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Other_Costs).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Other_CostsHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Other_CostsPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Other_Costs + mainData.otherCostsExp.Other_CostsHST + mainData.otherCostsExp.Other_CostsPST).toFixed(2)))}`;
        break;
      case 'Variable1':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable1).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable1HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable1PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable1 + mainData.otherCostsExp.Variable1HST + mainData.otherCostsExp.Variable1PST).toFixed(2)))}`;
        break;
      case 'Variable2':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable2).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable2HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable2PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.Variable2 + mainData.otherCostsExp.Variable2HST + mainData.otherCostsExp.Variable2PST).toFixed(2)))}`;
    }
  } else {
    document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.net).toFixed(2)))}`;
    document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.hst).toFixed(2)))}`;
    document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.pst).toFixed(2)))}`;
    document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.otherCostsExp.pst + mainData.otherCostsExp.net + mainData.otherCostsExp.hst).toFixed(2)))}`;
  }
}

function deleteOtherExpense() {
  if (myDOMs.otherExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.otherExp.AlertContainer,
      "otherExpAlert",
      "otherCloseBtnAlert",
      `Delete is not available when Expense Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let expID = myDOMs.otherExp.BlindExpID.value;

  if (confirm("Are you sure you want to Delete this Expense?")) {
    let tempData;
    tempData = {
      auth: myToken,
      carNumber: 'Other'
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          "Expense Successfully Deleted! ",
          "",
          `Exp ID: ${data.carexpense._id}`,
          "GREEN",
          6000
        );
        //next 5 lines resets the expense entry form/modal
        myDOMs.otherExp.EntryForm.reset();
        myDOMs.otherExp.ReoccurYES.checked = false;
        myDOMs.otherExp.ReoccurNO.checked = true;
        removeOtherImage();
        updateFormButtons('other');
        myDOMs.otherExp.EntryDate.focus();
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
            } Other Costs(${tempTitle}) expenses displayed on ${tempPageCount} pages.`;
        } else {
          myUpdatedText = `You have ${
            curTableArray.length
            } Other Costs Expenses displayed on ${tempPageCount} pages.`;
        }
        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);
        resetOriginalData();

        await getAllMainData();
        fillMainDataFromArrays();
        updateOtherCostsTableTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getOtherExpenses(myFilter) {
  if (!myFilter) {
    myReportTotal.totalNet = mainData.otherCostsExp.net;
    myReportTotal.totalHST = mainData.otherCostsExp.hst;
    myReportTotal.totalPST = mainData.otherCostsExp.pst;
  }

  let tempData;

  tempData = {
    carNumber: "Other",
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
      let tempTitle = 'Other Costs Expenses';
      curTableArray = myExpenses.carexpense;

      if (myFilter) {
        myReportTotal.categoryFull = myFilter;
        tempTitle = `Other Costs(${myFilter}) Expenses`;
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

    })
    .fail(function (e) {
      if (e.readyState === 0 || myToken === '') {
        alert('You Must be logged in before using EZ-HST-CANADA>')
      } else {
        alert(JSON.stringify(e.statusText, undefined, 2));
      }
    });
}


$("#otherExpBtn").click(function () {
  if (!validateOtherEntryForm()) {
    return;
  }
  if (
    myDOMs.otherExp.ExpID.value !== 'NEW' ||
    myDOMs.otherExp.SubmitButton.classList.contains("disabled")
  ) {
    alert("To update existing expenses, Use the Save Changes button");
    return;
  }
  let myDate = new Date(myDOMs.otherExp.EntryDate.value);
  myDate.setHours(40);
  let myStartMonth = myDate.getMonth();
  let myStartYear = myDate.getFullYear();
  let myStartDay = myDate.getDate();
  //Send message when trying to add receipt image with multiple monthly payments
  if (
    myDOMs.otherExp.ReoccurYES.checked === true &&
    myDOMs.otherExp.Checkbox.checked === true
  ) {
    let myObjMsg = [
      "Receipt images cannot be saved when using reoccurring Monthly function.",
      "To add receipts to reoccurring Monthly expenses, add the receipt to each individual expense after saving with the reoccurring Monthly function!",
      "To continue with the reoccuring Monthly function, Uncheck the Include Receipt checkbox."
    ];

    displayAlert(
      myDOMs.otherExp.AlertContainer,
      "otherExpAlert",
      "otherCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //verify if ID and if present warn user to use Save Changes
  if (myDOMs.otherExp.ExpID.value !== "NEW") {
    let myObjMsg = [
      "The Submit button is only used to save a NEW expense.",
      "When Expense Status box displays SAVED or ALTERED, that expense is in the databse",
      "and to update any changes to it, use the Save Changes button.",
      "To Submit a new expense, first reset the form,",
      "fill the fields and then Submit!"
    ];

    displayAlert(
      myDOMs.otherExp.AlertContainer,
      "otherExpAlert",
      "otherCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //This section deals with Multiple Monthly payments
  if (myDOMs.otherExp.ReoccurYES.checked === true) {

    mydata = {
      carDate: myDate,
      carnetAmt: myDOMs.otherExp.NetAmt.value,
      carhstAmt: myDOMs.otherExp.HSTAmt.value,
      carpstAmt: myDOMs.otherExp.PSTAmt.value,
      carTotalAmt: myDOMs.otherExp.TotalAmt.value,
      carDescription: myDOMs.otherExp.Description.value,
      vendorSelect: myDOMs.otherExp.Vendor.value,
      carExpCatSelect: myDOMs.otherExp.Category.value,
      carExpReoccuring: 1,
      dateYear: myStartYear,
      dateMonth: myStartMonth,
      dateDay: myStartDay,
      auth: myToken,
      carNumber: "Other"
    };


    $.ajax({
      method: "POST",
      url: `${serverURL}carExpenseRecur`,
      dataType: "json",
      data: mydata
    })
      .done(async function (data) {
        let myDisplay = [`The following are all the new expense ID's`];
        for (i = 0; i < data.insertedCount; i++) {
          myDisplay.push(data.insertedIds[i]);
        }
        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          "Expenses Successfully Saved! ",
          myDisplay,
          " ",
          "GREEN",
          0
        );

        myDOMs.otherExp.EntryForm.reset();
        myDOMs.otherExp.ReoccurYES.checked = false;
        myDOMs.otherExp.ReoccurNO.checked = true;
        myDOMs.otherExp.EntryDate.focus();

        await getAllMainData();
        fillMainDataFromArrays();
        updateOtherCostsTableTotals();
      })
      .fail(function (e) {
        let myObjMsg = [
          "Reoccurring Other Expense Entry Failed to POST to the database."
        ];

        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          "Expense Entry Failed! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      });
  } else {
    if (myDOMs.otherExp.Checkbox.checked === true) {
      //Add expense with image
      let files = [];
      if (myDOMs.otherExp.Img.getAttribute("src") === "") {
        let myObjMsg = [
          "To Save Receipt images with your expense,",
          "select the image with the choose file selector",
          "or, if using phone, take picture after clicking choose file",
          "and then submit the expense."
        ];

        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
          "Unable to Save Expense! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return;
      } else {
        files = $("#imgloadOther").get(0).files;
      }

      formData = new FormData();

      if (files.length === 0) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
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
          myDOMs.otherExp.AlertContainer,
          "otherExpAlert",
          "otherCloseBtnAlert",
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
      formData.append("carnetAmt", myDOMs.otherExp.NetAmt.value);
      formData.append("carhstAmt", myDOMs.otherExp.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.otherExp.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.otherExp.TotalAmt.value);
      formData.append("carDescription", myDOMs.otherExp.Description.value);
      formData.append("vendorSelect", myDOMs.otherExp.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.otherExp.Category.value);
      formData.append("expReceipt", true);
      formData.append("auth", myToken);
      formData.append("carNumber", "Other");

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
            myDOMs.otherExp.AlertContainer,
            "otherExpAlert",
            "otherCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            `Expense ID: ${data.newID}`,
            "GREEN",
            6000
          );
          myDOMs.otherExp.EntryForm.reset();
          myDOMs.otherExp.ReoccurYES.checked = false;
          myDOMs.otherExp.ReoccurNO.checked = true;
          removeOtherImage();
          myDOMs.otherExp.EntryDate.focus();

          await getAllMainData();
          fillMainDataFromArrays();
          updateOtherCostsTableTotals();
        })
        .fail(function (err) {
          let myObjMsg = [
            "Other Expense Entry Failed to POST to the database"
          ];

          displayAlert(
            myDOMs.otherExp.AlertContainer,
            "otherExpAlert",
            "otherCloseBtnAlert",
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
      let myTempDate = new Date(
        myDate.getFullYear(),
        myDate.getMonth(),
        myDate.getDate()
      );

      mydata = {
        carDate: myTempDate,
        carnetAmt: myDOMs.otherExp.NetAmt.value,
        carhstAmt: myDOMs.otherExp.HSTAmt.value,
        carpstAmt: myDOMs.otherExp.PSTAmt.value,
        carTotalAmt: myDOMs.otherExp.TotalAmt.value,
        carDescription: myDOMs.otherExp.Description.value,
        vendorSelect: myDOMs.otherExp.Vendor.value,
        carExpCatSelect: myDOMs.otherExp.Category.value,
        expReceipt: false,
        auth: myToken,
        carNumber: "Other"
      };

      $.ajax({
        method: "POST",
        url: `${serverURL}carExpense`,
        data: mydata,
        enctype: "multipart/form-data"
      })
        .done(async function (data) {
          displayAlert(
            myDOMs.otherExp.AlertContainer,
            "otherExpAlert",
            "otherCloseBtnAlert",
            `${data.message} `,
            "",
            `Expense ID: ${data.newID}`,
            "GREEN",
            6000
          );
          myDOMs.otherExp.EntryForm.reset();
          myDOMs.otherExp.ReoccurYES.checked = false;
          myDOMs.otherExp.ReoccurNO.checked = true;
          myDOMs.otherExp.EntryDate.focus();

          await getAllMainData();
          fillMainDataFromArrays();
          updateOtherCostsTableTotals();
        })
        .fail(function (err) {
          displayAlert(
            myDOMs.otherExp.AlertContainer,
            "otherExpAlert",
            "otherCloseBtnAlert",
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

myDOMs.otherExp.Reset.addEventListener("click", function (e) {
  if (myDOMs.otherExp.ExpID.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addOtherOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.otherExp.EntryForm.reset();
      removeOtherImage();
      updateFormButtons('other');
    } else {
      e.preventDefault();
    }
  }

});

async function addOtherOriginalValues() {
  let myTempID = myDOMs.otherExp.BlindExpID.value;

  myDOMs.otherExp.EntryDate.value = myOriginalData.Date;
  myDOMs.otherExp.NetAmt.value = myOriginalData.Net.toFixed(2);
  myDOMs.otherExp.HSTAmt.value = myOriginalData.Hst.toFixed(2);
  myDOMs.otherExp.PSTAmt.value = myOriginalData.Pst.toFixed(2);
  myDOMs.otherExp.TotalAmt.value = myOriginalData.Total.toFixed(2);
  myDOMs.otherExp.Description.value = myOriginalData.Description;
  myDOMs.otherExp.Vendor.value = myOriginalData.Vendor;
  myDOMs.otherExp.Category.value = myOriginalData.Category;
  myDOMs.otherExp.ExpID.value = 'SAVED';
  myOriginalData.Status = 'SAVED';
  myDOMs.otherExp.ReoccurYES.checked = false;
  myDOMs.otherExp.ReoccurNO.checked = true;

  if (myOriginalData.Receipt === true) {

    if (myOriginalData.ImageData !== null) {
      let img = new Image();
      let container = document.getElementById("myImgOther");
      img.src = myOriginalData.ImageData;
      container.setAttribute("src", img.src);
      myDOMs.otherExp.Checkbox.checked = true;

    } else {
      myDOMs.otherExp.Checkbox.checked = false;
      removeOtherImage();
    }
  } else {
    myDOMs.otherExp.Checkbox.checked = false;
    removeOtherImage();
  }

  setOtherStatusColor();
}

function removeOtherImage() {
  myDOMs.otherExp.Img.setAttribute("src", "");
  $(".custom-file-label").html("");
  myDOMs.otherExp.FileSelector.value = "";
  updateOtherFormStatus();
}

function validateOtherEntryForm() {
  const otherDate = document.forms["formOtherExpEntry"]["otherDate"];
  const netAmt = document.forms["formOtherExpEntry"]["othernetAmt"];
  const hstAmt = document.forms["formOtherExpEntry"]["otherhstAmt"];
  const pstAmt = document.forms["formOtherExpEntry"]["otherpstAmt"];
  const totalAmt = document.forms["formOtherExpEntry"]["otherTotalAmt"];
  const description = document.forms["formOtherExpEntry"]["otherDescription"];
  const vendor = document.forms["formOtherExpEntry"]["vendorSelectOther"];
  const category = document.forms["formOtherExpEntry"]["otherExpCatSelect"];

  if (otherDate.value == "") {
    window.alert("Please Select a Date.");
    otherDate.focus();
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

function updateOtherFormStatus() {
  // let tempSRC = window.location.href.slice(0, window.location.href.length - 1)
  if (myDOMs.otherExp.ExpID.value === 'NEW') { return; }
  let dataMatch = true;
  if (myOriginalData.Date === myDOMs.otherExp.EntryDate.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Net.toFixed(2) === myDOMs.otherExp.NetAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Hst.toFixed(2) === myDOMs.otherExp.HSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Pst.toFixed(2) === myDOMs.otherExp.PSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Total.toFixed(2) === myDOMs.otherExp.TotalAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Status === myDOMs.otherExp.ExpID.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Description === myDOMs.otherExp.Description.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Vendor === myDOMs.otherExp.Vendor.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Category === myDOMs.otherExp.Category.value) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.otherExp.Checkbox.checked === myOriginalData.Checkbox) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.otherExp.Img.src.length < 150 && myOriginalData.ImageData === null || myDOMs.otherExp.Img.src.length > 149 && myOriginalData.ImageData !== null) {
    if (myOriginalData.ImageData !== null) {
      let myIndex;
      myIndex = myDOMs.otherExp.Img.src.lastIndexOf(';base64,');
      let DOMdata = myDOMs.otherExp.Img.src.slice(myIndex);
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
    myDOMs.otherExp.ExpID.value = 'ALTERED';
    myOriginalData.Status = 'ALTERED';
  } else {
    myDOMs.otherExp.ExpID.value = 'SAVED';
    myOriginalData.Status = 'SAVED';
  }
  setOtherStatusColor();
}

function setOtherStatusColor() {
  if (myDOMs.otherExp.ExpID.value === 'ALTERED') {
    if (myDOMs.otherExp.ExpID.classList.contains('text-danger')) {
    } else {
      myDOMs.otherExp.ExpID.classList.add('text-danger');
    }
  } else {
    if (myDOMs.otherExp.ExpID.classList.contains('text-danger')) {
      myDOMs.otherExp.ExpID.classList.remove('text-danger');
    }
  }

}

myDOMs.otherExp.ReoccurYES.addEventListener('click', function (e) {
  if (myDOMs.otherExp.ExpID.value !== 'NEW') {
    e.preventDefault();
    alert('Monthly function is only available for NEW expenses!');
  }
})

function disableEnableFullSizeOtherImgBtn() {
  // alert('Buttons Called');
  if (myDOMs.otherExp.Img.src.length > 149) {
    if ($('#otherExpShowFullSize').hasClass('disabled')) {
      $('#otherExpShowFullSize').removeClass("disabled");
    }

  } else {

    if ($('#otherExpShowFullSize').hasClass('disabled')) {
    } else {
      $('#otherExpShowFullSize').addClass("disabled");
    }
  }

}

function displayFullSizeOtherImage() {
  if (myDOMs.otherExp.Img.src.length < 150) {
    if (myDOMs.otherExp.ExpID.value === 'NEW') {
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
  img.src = myDOMs.otherExp.Img.src;
  container.setAttribute("src", img.src);

}
