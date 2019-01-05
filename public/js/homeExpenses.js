//Random Function
populateHomeCategories();
disableEnableFullSizeHomeImgBtn();

function displayHomeExpModal() {
  $("#HomeExpenseModal").modal("show");

  let myProv = localStorage.getItem('Selected_Province');
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.homeExp.HSTAmtLabel.innerText = 'HST Amount'
  } else {
    myDOMs.homeExp.HSTAmtLabel.innerText = 'GST Amount'
  }
};

function hideHomeExpModal() {
  myDOMs.homeExp.EntryForm.reset();
  removeHomeImage();
  resetOriginalData();
  savedTransactionLocked = false;
  $("#HomeExpenseModal").modal("hide");
}
function updateHomeButtonText() {
  var isExpanded = $("#collapseHome1").hasClass("show");
  if (isExpanded) {
    myDOMs.homeExp.ShowHideReceipt.innerText = "Show Receipt Controls";
  } else {
    myDOMs.homeExp.ShowHideReceipt.innerText = "Hide Receipt Controls";
  }
}
function emptyHomeVendorSelect() {
  for (i = myDOMs.homeExp.Vendor.length - 1; i > 0; i--) {
    myDOMs.homeExp.Vendor.remove(i);
  }
}
function addHomeVendor() {
  let tempVendor = prompt("Please enter the Vendor/Supplier Name.");

  if (tempVendor === "") {
    alert("Invalid Entry!");
    return;
  } else if (tempVendor === null) {
    return;
  }
  postmyHomeVendor(tempVendor);
  let vendorHome = document.createElement("OPTION");
  let txtHome = document.createTextNode(tempVendor);
  vendorHome.appendChild(txtHome);
  myDOMs.homeExp.Vendor.add(vendorHome);
}
function emptyHomeCategorySelect() {
  for (i = myDOMs.homeExp.Category.length - 1; i > 0; i--) {
    myDOMs.homeExp.Category.remove(i);
  }
}
// //AJAX REQUESTS

function postmyHomeVendor(myNewVendor) {
  const mydata = {
    text: myNewVendor,
    auth: myToken
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}homeVendors`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let myObjMsg = [`${data.text} was added!`];

      displayAlert(
        myDOMs.homeExp.AlertContainer,
        "homeExpAlert",
        "homeCloseBtnAlert",
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
        myDOMs.homeExp.AlertContainer,
        "homeExpAlert",
        "homeCloseBtnAlert",
        `${err.responseJSON.title} `,
        myObjMsg,
        ` `,
        "RED",
        6000
      );
    });
}
function deleteSelectedHomeVendor() {
  let mySelectedIndex = myDOMs.homeExp.Vendor.selectedIndex;
  let selectedVendor = myDOMs.homeExp.Vendor.value;

  if (selectedVendor === "") {
    displayAlert(
      myDOMs.homeExp.AlertContainer,
      "homeExpAlert",
      "homeCloseBtnAlert",
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
      url: `${serverURL}homeVendors`,
      data: {
        text: selectedVendor,
        auth: myToken
      },
      enctype: "multipart/form-data"
    })
      .done(function (data) {
        let myObjMsg = [`Was Successfully Deleted!`];

        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          `${data.vendor.text}`,
          myObjMsg,
          ` `,
          "GREEN",
          6000
        );
        myDOMs.homeExp.Vendor.remove(mySelectedIndex);
      })
      .fail(function (err) {
        let myObjMsg = [err.responseText];
        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          `${err.statusText} `,
          myObjMsg,
          ` `,
          "RED",
          6000
        );
      });
  }
}

function populateHomeVendors() {
  //This code retrieves the home expense Vendors from the Database and inserts them into the forms Vendor dropdown list.
  $.ajax({
    url: `${serverURL}homeVendors`,
    method: "GET",
    data: {
      auth: myToken
    }
  })
    .done(function (data) {
      for (i = 0; i < data.homeVendors.length; i++) {
        let tempVendorHome = document.createElement("OPTION");
        txtHome = document.createTextNode(data.homeVendors[i].text);
        tempVendorHome.appendChild(txtHome);
        myDOMs.homeExp.Vendor.add(tempVendorHome);
      }
    })
    .fail(function (e) {
      alert("Home Expense Vendors List was NOT retrieved Successfully!");
    });
}

function populateHomeCategories() {
  //This code retrieves the Business expense Categories from the Database and inserts them into the forms Category dropdown list.
  //This will allow me to add functions to allow end-user to make changes to the list or add/remove items.
  $.ajax({
    url: `${serverURL}homeCategorie`,
    method: "GET"
  })
    .done(function (data) {
      for (i = 0; i < data.homeCategories.length; i++) {
        let optionHome = document.createElement("OPTION");
        txtHome = document.createTextNode(data.homeCategories[i].text);
        optionHome.appendChild(txtHome);
        myDOMs.homeExp.Category.insertBefore(
          optionHome,
          myDOMs.homeExp.Category.lastChild
        );
      }
    })
    .fail(function (e) {
      alert("Home Expense Category List was NOT retrieved Successfully!");
    });
}

function addHomeCategory() {
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
    url: `${serverURL}homeCategorie`,
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
      alert("Home Expense Category was NOT Saved Successfully!");
    });
}

function updateHomeExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addHomeOriginalValues();
    return;
  }
  if (myDOMs.homeExp.ExpID.value === 'SAVED') {
    displayAlert(
      myDOMs.homeExp.AlertContainer,
      "homeExpAlert",
      "homecloseBtnAlert",
      `Save Changes is only available when Expense Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.homeExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.homeExp.AlertContainer,
      "homeExpAlert",
      "homeCloseBtnAlert",
      `Save Changes is not available for New Expenses. To Save a New Expense, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.homeExp.BlindExpID.value;
  let files = [];
  formData = new FormData();
  let file;
  let myDate;
  let myTempDate;
  let myTempArr;
  let receiptPath = false;
  //Receipt to be saved in this if statement
  if (myDOMs.homeExp.Checkbox.checked === true) {
    files = $("#imgloadHome").get(0).files;
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
        myDOMs.homeExp.Img.src = myOriginalData.ImageData;
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

  myDate = new Date(myDOMs.homeExp.EntryDate.value);
  myDate.setHours(40);

  myTempDate = new Date(
    myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate()
  );

  formData.append("carDate", myTempDate);
  formData.append("carnetAmt", myDOMs.homeExp.NetAmt.value);
  formData.append("carhstAmt", myDOMs.homeExp.HSTAmt.value);
  formData.append("carpstAmt", myDOMs.homeExp.PSTAmt.value);
  formData.append("carTotalAmt", myDOMs.homeExp.TotalAmt.value);
  formData.append("carDescription", myDOMs.homeExp.Description.value);
  formData.append("vendorSelect", myDOMs.homeExp.Vendor.value);
  formData.append("carExpCatSelect", myDOMs.homeExp.Category.value);
  formData.append("auth", myToken);
  formData.append("carNumber", "Home");


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
        myDOMs.homeExp.AlertContainer,
        "homeExpAlert",
        "homeCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
      //Code to update report array
      let carDate = myTempDate;
      let carNetAmt = parseFloat(myDOMs.homeExp.NetAmt.value);
      let carHSTAmt = parseFloat(myDOMs.homeExp.HSTAmt.value);
      let carPSTAmt = parseFloat(myDOMs.homeExp.PSTAmt.value);
      let carTtlAmt = parseFloat(myDOMs.homeExp.TotalAmt.value);
      let carDescription = myDOMs.homeExp.Description.value;
      let carVendor = myDOMs.homeExp.Vendor.value;
      let carCategory = myDOMs.homeExp.Category.value;

      let HomeData = {
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
      updateRequestedArray(selectedArrayNum, selectedRowNum, HomeData);

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
      myOriginalData.Category = myDOMs.homeExp.Category.value;
      myOriginalData.Date = myYear + "-" + myMonth + "-" + myDay;
      //myOriginalData.Date = myTempDate;
      myOriginalData.Description = myDOMs.homeExp.Description.value;
      myOriginalData.Hst = parseFloat(myDOMs.homeExp.HSTAmt.value);
      myOriginalData.Net = parseFloat(myDOMs.homeExp.NetAmt.value);
      myOriginalData.Pst = parseFloat(myDOMs.homeExp.PSTAmt.value);
      myOriginalData.Receipt = receiptPath;
      myOriginalData.Status = 'SAVED';
      myOriginalData.Total = parseFloat(myDOMs.homeExp.TotalAmt.value);
      myOriginalData.Vendor = myDOMs.homeExp.Vendor.value;

      myOriginalData.Checkbox = receiptPath;
      myOriginalData.MonthlyYES = false;
      myOriginalData.MonthlyNO = true;
      myOriginalData.ImageData = myDOMs.homeExp.Img.src;

      if (receiptPath === false) {
        removeHomeImage();
        myOriginalData.ImageData = null;
      }

      myOriginalData.Status = 'SAVED';
      myDOMs.homeExp.ExpID.value = 'SAVED';
      setHomeStatusColor();

      await getAllMainData('Home');
      fillMainDataFromArrays();
      updateHomeExpTableTotals();
    })
    .fail(function (err) {
      let myObjMsg = ["Home Expense Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.homeExp.AlertContainer,
        "homeExpAlert",
        "homeCloseBtnAlert",
        `Expense Entry Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function updateHomeExpTableTotals() {
  if (!TableOpen) return;
  if (reOpenIncomeStatement) {
    switch (myReportTotal.category) {
      case 'Heat':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Heat).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.HeatHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.HeatPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Heat + mainData.homeExp.HeatHST + mainData.homeExp.HeatPST).toFixed(2)))}`;
        break;
      case 'Electricity':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Electricity).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.ElectricityHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.ElectricityPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Electricity + mainData.homeExp.Electricity + mainData.homeExp.Electricity).toFixed(2)))}`;
        break;
      case 'Insurance':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Insurance).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.InsuranceHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.InsurancePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Insurance + mainData.homeExp.InsuranceHST + mainData.homeExp.InsurancePST).toFixed(2)))}`;
        break;
      case 'Maintenance':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Maintenance).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.MaintenanceHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.MaintenancePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Maintenance + mainData.homeExp.MaintenanceHST + mainData.homeExp.MaintenancePST).toFixed(2)))}`;
        break;
      case 'Mortgage':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Mortgage).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.MortgageHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.MortgagePST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Mortgage + mainData.homeExp.MortgageHST + mainData.homeExp.MortgagePST).toFixed(2)))}`;
        break;
      case 'PropertyTax':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.PropertyTax).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.PropertyTaxHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.PropertyTaxPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.PropertyTax + mainData.homeExp.PropertyTaxHST + mainData.homeExp.PropertyTaxPST).toFixed(2)))}`;
        break;
      case 'Other':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Other).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.OtherHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.OtherPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Other + mainData.homeExp.OtherHST + mainData.homeExp.OtherPST).toFixed(2)))}`;
        break;
      case 'Water':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Water).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.WaterHST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.WaterPST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Water + mainData.homeExp.WaterHST + mainData.homeExp.WaterPST).toFixed(2)))}`;
        break;
      case 'Variable1':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable1).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable1HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable1PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable1 + mainData.homeExp.Variable1HST + mainData.homeExp.Variable1PST).toFixed(2)))}`;
        break;
      case 'Variable2':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable2).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable2HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable2PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable2 + mainData.homeExp.Variable2HST + mainData.homeExp.Variable2PST).toFixed(2)))}`;
        break;
      case 'Variable3':
        document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable3).toFixed(2)))}`;
        document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable3HST).toFixed(2)))}`;
        document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable3PST).toFixed(2)))}`;
        document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.Variable3 + mainData.homeExp.Variable3HST + mainData.homeExp.Variable3PST).toFixed(2)))}`;
    }
  } else {
    document.getElementById('cellNetTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.net).toFixed(2)))}`;
    document.getElementById('cellHstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.hst).toFixed(2)))}`;
    document.getElementById('cellPstTotal').innerText = `$${(formatNumber(Number(mainData.homeExp.pst).toFixed(2)))}`;
    document.getElementById('cellGrandTotalAmt').innerText = `$${(formatNumber(Number(mainData.homeExp.pst + mainData.homeExp.net + mainData.homeExp.hst).toFixed(2)))}`;
  }
}


function deleteHomeExpense() {
  if (savedTransactionLocked) {
    alert(`Because the Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }

  if (myDOMs.homeExp.ExpID.value === 'NEW') {
    displayAlert(
      myDOMs.homeExp.AlertContainer,
      "homeExpAlert",
      "homeCloseBtnAlert",
      `Delete is not available when Expense Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let expID = myDOMs.homeExp.BlindExpID.value;

  if (confirm("Are you sure you want to Delete this Expense?")) {
    let tempData;
    tempData = {
      auth: myToken,
      carNumber: 'Home'
    };
    $.ajax({
      url: `${serverURL}carExpense/${expID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          "Expense Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );
        //next 5 lines resets the expense entry form/modal
        myDOMs.homeExp.EntryForm.reset();
        myDOMs.homeExp.ReoccurYES.checked = false;
        myDOMs.homeExp.ReoccurNO.checked = true;
        removeHomeImage();
        updateFormButtons('home');
        myDOMs.homeExp.EntryDate.focus();
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
            } Home(${tempTitle}) Expenses displayed on ${tempPageCount} pages.`;
        } else {
          myUpdatedText = `You have ${
            curTableArray.length
            } Home Expenses displayed on ${tempPageCount} pages.`;
        }

        resetText(myUpdatedText);
        moveToOriginalPage(currPageOnDelete);
        resetOriginalData();

        await getAllMainData('Home');
        fillMainDataFromArrays();
        updateHomeExpTableTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getHomeExpenses(myFilter) {
  if (TableOpen) {
    if (reOpenIncomeStatement) {
      reOpenIncomeStatement = false;
    }
    hideTableAlert();
  }
  if (!myFilter) {
    myReportTotal.totalNet = mainData.homeExp.net;
    myReportTotal.totalHST = mainData.homeExp.hst;
    myReportTotal.totalPST = mainData.homeExp.pst;
  }

  let tempData;

  tempData = {
    carNumber: "Home",
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
      let tempTitle = 'Home Expenses';
      curTableArray = myExpenses.carexpense;

      if (myFilter) {
        myReportTotal.categoryFull = myFilter;
        tempTitle = `Home(${myFilter}) Expenses`;
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


$("#homeExpBtn").click(function () {
  if (!validateHomeEntryForm()) {
    return;
  }
  if (
    myDOMs.homeExp.ExpID.value !== 'NEW' ||
    myDOMs.homeExp.SubmitButton.classList.contains("disabled")
  ) {
    alert("To update existing expenses, Use the Save Changes button");
    return;
  }
  let myDate = new Date(myDOMs.homeExp.EntryDate.value);
  myDate.setHours(40);
  let myStartMonth = myDate.getMonth();
  let myStartYear = myDate.getFullYear();
  let myStartDay = myDate.getDate();
  //Send message when trying to add receipt image with multiple monthly payments
  if (
    myDOMs.homeExp.ReoccurYES.checked === true &&
    myDOMs.homeExp.Checkbox.checked === true
  ) {
    let myObjMsg = [
      "Receipt images cannot be saved when using reoccurring Monthly function.",
      "To add receipts to reoccurring Monthly expenses, add the receipt to each individual expense after saving with the reoccurring Monthly function!",
      "To continue with the reoccuring Monthly function, Uncheck the Include Receipt checkbox."
    ];

    displayAlert(
      myDOMs.homeExp.AlertContainer,
      "homeExpAlert",
      "homeCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //verify if ID and if present warn user to use Save Changes
  if (myDOMs.homeExp.ExpID.value !== "NEW") {
    let myObjMsg = [
      "The Submit button is only used to save a NEW expense.",
      "When Expense Status box displays SAVED or ALTERED, that expense is in the databse",
      "and to update any changes to it, use the Save Changes button.",
      "To Submit a new expense, first reset the form,",
      "fill the fields and then Submit!"
    ];

    displayAlert(
      myDOMs.homeExp.AlertContainer,
      "homeExpAlert",
      "homeCloseBtnAlert",
      "Invalid Entry! ",
      myObjMsg,
      " ",
      "RED",
      6000
    );
    return;
  }

  //This section deals with Multiple Monthly payments
  if (myDOMs.homeExp.ReoccurYES.checked === true) {

    mydata = {
      carDate: myDate,
      carnetAmt: myDOMs.homeExp.NetAmt.value,
      carhstAmt: myDOMs.homeExp.HSTAmt.value,
      carpstAmt: myDOMs.homeExp.PSTAmt.value,
      carTotalAmt: myDOMs.homeExp.TotalAmt.value,
      carDescription: myDOMs.homeExp.Description.value,
      vendorSelect: myDOMs.homeExp.Vendor.value,
      carExpCatSelect: myDOMs.homeExp.Category.value,
      carExpReoccuring: 1,
      dateYear: myStartYear,
      dateMonth: myStartMonth,
      dateDay: myStartDay,
      auth: myToken,
      carNumber: "Home"
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
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          "Expenses Successfully Saved! ",
          '',
          " ",
          "GREEN",
          0
        );
        // alert(JSON.stringify(myDisplay, undefined, 2));
        myDOMs.homeExp.EntryForm.reset();
        myDOMs.homeExp.ReoccurYES.checked = false;
        myDOMs.homeExp.ReoccurNO.checked = true;
        myDOMs.homeExp.EntryDate.focus();

        await getAllMainData('Home');
        fillMainDataFromArrays();
        updateHomeExpTableTotals();
      })
      .fail(function (e) {
        let myObjMsg = [
          "Reoccurring Home Expense Entry Failed to POST to the database."
        ];

        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          "Expense Entry Failed! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      });
  } else {
    if (myDOMs.homeExp.Checkbox.checked === true) {
      //Add expense with image
      let files = [];
      if (myDOMs.homeExp.Img.getAttribute("src") === "") {
        let myObjMsg = [
          "To Save Receipt images with your expense,",
          "select the image with the choose file selector",
          "or, if using phone, take picture after clicking choose file",
          "and then submit the expense."
        ];

        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
          "Unable to Save Expense! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
        return;
      } else {
        files = $("#imgloadHome").get(0).files;
      }

      formData = new FormData();

      if (files.length === 0) {
        let myObjMsg = [""];

        displayAlert(
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
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
          myDOMs.homeExp.AlertContainer,
          "homeExpAlert",
          "homeCloseBtnAlert",
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
      formData.append("carnetAmt", myDOMs.homeExp.NetAmt.value);
      formData.append("carhstAmt", myDOMs.homeExp.HSTAmt.value);
      formData.append("carpstAmt", myDOMs.homeExp.PSTAmt.value);
      formData.append("carTotalAmt", myDOMs.homeExp.TotalAmt.value);
      formData.append("carDescription", myDOMs.homeExp.Description.value);
      formData.append("vendorSelect", myDOMs.homeExp.Vendor.value);
      formData.append("carExpCatSelect", myDOMs.homeExp.Category.value);
      formData.append("expReceipt", true);
      formData.append("auth", myToken);
      formData.append("carNumber", "Home");

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
            myDOMs.homeExp.AlertContainer,
            "homeExpAlert",
            "homeCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            ` `,
            "GREEN",
            6000
          );
          myDOMs.homeExp.EntryForm.reset();
          myDOMs.homeExp.ReoccurYES.checked = false;
          myDOMs.homeExp.ReoccurNO.checked = true;
          removeHomeImage();
          myDOMs.homeExp.EntryDate.focus();

          await getAllMainData('Home');
          fillMainDataFromArrays();
          updateHomeExpTableTotals();
        })
        .fail(function (err) {
          let myObjMsg = [
            "Home Expense Entry Failed to POST to the database"
          ];

          displayAlert(
            myDOMs.homeExp.AlertContainer,
            "homeExpAlert",
            "homeCloseBtnAlert",
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
        carnetAmt: myDOMs.homeExp.NetAmt.value,
        carhstAmt: myDOMs.homeExp.HSTAmt.value,
        carpstAmt: myDOMs.homeExp.PSTAmt.value,
        carTotalAmt: myDOMs.homeExp.TotalAmt.value,
        carDescription: myDOMs.homeExp.Description.value,
        vendorSelect: myDOMs.homeExp.Vendor.value,
        carExpCatSelect: myDOMs.homeExp.Category.value,
        expReceipt: false,
        auth: myToken,
        carNumber: "Home"
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
            myDOMs.homeExp.AlertContainer,
            "homeExpAlert",
            "homeCloseBtnAlert",
            `${data.message} `,
            "",
            ` `,
            "GREEN",
            6000
          );
          myDOMs.homeExp.EntryForm.reset();
          myDOMs.homeExp.ReoccurYES.checked = false;
          myDOMs.homeExp.ReoccurNO.checked = true;
          myDOMs.homeExp.EntryDate.focus();

          await getAllMainData('Home');
          fillMainDataFromArrays();
          updateHomeExpTableTotals();
        })
        .fail(function (err) {
          displayAlert(
            myDOMs.homeExp.AlertContainer,
            "homeExpAlert",
            "homeCloseBtnAlert",
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

myDOMs.homeExp.EntryDate.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.homeExp.EntryDate.value)) {
    alert(`Because your Purchase Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this expense! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.homeExp.EntryDate.value = null;
    myDOMs.homeExp.EntryDate.focus;
  }
});

// //Smaller Functions

myDOMs.homeExp.Reset.addEventListener("click", function (e) {
  if (myDOMs.homeExp.ExpID.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addHomeOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.homeExp.EntryForm.reset();
      removeHomeImage();
      updateFormButtons('home');
    } else {
      e.preventDefault();
    }
  }

});

async function addHomeOriginalValues() {
  let myTempID = myDOMs.homeExp.BlindExpID.value;

  myDOMs.homeExp.EntryDate.value = myOriginalData.Date;
  myDOMs.homeExp.NetAmt.value = myOriginalData.Net.toFixed(2);
  myDOMs.homeExp.HSTAmt.value = myOriginalData.Hst.toFixed(2);
  myDOMs.homeExp.PSTAmt.value = myOriginalData.Pst.toFixed(2);
  myDOMs.homeExp.TotalAmt.value = myOriginalData.Total.toFixed(2);
  myDOMs.homeExp.Description.value = myOriginalData.Description;
  myDOMs.homeExp.Vendor.value = myOriginalData.Vendor;
  myDOMs.homeExp.Category.value = myOriginalData.Category;
  myDOMs.homeExp.ExpID.value = 'SAVED';
  myOriginalData.Status = 'SAVED';
  myDOMs.homeExp.ReoccurYES.checked = false;
  myDOMs.homeExp.ReoccurNO.checked = true;

  if (myOriginalData.Receipt === true) {

    if (myOriginalData.ImageData !== null) {
      let img = new Image();
      let container = document.getElementById("myImgHome");
      img.src = myOriginalData.ImageData;
      container.setAttribute("src", img.src);
      myDOMs.homeExp.Checkbox.checked = true;

    } else {
      myDOMs.homeExp.Checkbox.checked = false;
      removeHomeImage();
    }
  } else {
    myDOMs.homeExp.Checkbox.checked = false;
    removeHomeImage();
  }

  setHomeStatusColor();
}

function removeHomeImage() {
  myDOMs.homeExp.Img.setAttribute("src", "");
  $(".custom-file-label").html("");
  myDOMs.homeExp.FileSelector.value = "";
  updateHomeFormStatus();
}

function removeHomeBlindImage() {
  myDOMs.homeExp.BlindImg.setAttribute("src", "");
};


function validateHomeEntryForm() {
  const homeDate = document.forms["formHomeExpEntry"]["homeDate"];
  const netAmt = document.forms["formHomeExpEntry"]["homenetAmt"];
  const hstAmt = document.forms["formHomeExpEntry"]["homehstAmt"];
  const pstAmt = document.forms["formHomeExpEntry"]["homepstAmt"];
  const totalAmt = document.forms["formHomeExpEntry"]["homeTotalAmt"];
  const description = document.forms["formHomeExpEntry"]["homeDescription"];
  const vendor = document.forms["formHomeExpEntry"]["vendorSelectHome"];
  const category = document.forms["formHomeExpEntry"]["homeExpCatSelect"];

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

function updateHomeFormStatus() {
  // let tempSRC = window.location.href.slice(0, window.location.href.length - 1)
  if (myDOMs.homeExp.ExpID.value === 'NEW') { return; }
  let dataMatch = true;
  if (myOriginalData.Date === myDOMs.homeExp.EntryDate.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Net.toFixed(2) === myDOMs.homeExp.NetAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Hst.toFixed(2) === myDOMs.homeExp.HSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Pst.toFixed(2) === myDOMs.homeExp.PSTAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Total.toFixed(2) === myDOMs.homeExp.TotalAmt.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Status === myDOMs.homeExp.ExpID.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Description === myDOMs.homeExp.Description.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Vendor === myDOMs.homeExp.Vendor.value) {
  } else {
    dataMatch = false;
  }

  if (myOriginalData.Category === myDOMs.homeExp.Category.value) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.homeExp.Checkbox.checked === myOriginalData.Checkbox) {
  } else {
    dataMatch = false;
  }

  if (myDOMs.homeExp.Img.src.length < 150 && myOriginalData.ImageData === null || myDOMs.homeExp.Img.src.length > 149 && myOriginalData.ImageData !== null) {
    if (myOriginalData.ImageData !== null) {
      let myIndex;
      myIndex = myDOMs.homeExp.Img.src.lastIndexOf(';base64,');
      let DOMdata = myDOMs.homeExp.Img.src.slice(myIndex);
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
    myDOMs.homeExp.ExpID.value = 'ALTERED';
    myOriginalData.Status = 'ALTERED';
  } else {
    myDOMs.homeExp.ExpID.value = 'SAVED';
    myOriginalData.Status = 'SAVED';
  }
  setHomeStatusColor();
  // disableEnableBtn();
}

function setHomeStatusColor() {
  if (myDOMs.homeExp.ExpID.value === 'ALTERED') {
    if (myDOMs.homeExp.ExpID.classList.contains('text-danger')) {
    } else {
      myDOMs.homeExp.ExpID.classList.add('text-danger');
    }
  } else {
    if (myDOMs.homeExp.ExpID.classList.contains('text-danger')) {
      myDOMs.homeExp.ExpID.classList.remove('text-danger');
    }
  }

}

myDOMs.homeExp.ReoccurYES.addEventListener('click', function (e) {
  if (myDOMs.homeExp.ExpID.value !== 'NEW') {
    e.preventDefault();
    alert('Monthly function is only available for NEW expenses!');
  }
})


function disableEnableFullSizeHomeImgBtn() {
  // alert('Buttons Called');
  if (myDOMs.homeExp.Img.src.length > 149) {
    if ($('#homeExpShowFullSize').hasClass('disabled')) {
      $('#homeExpShowFullSize').removeClass("disabled");
    }

  } else {

    if ($('#homeExpShowFullSize').hasClass('disabled')) {
    } else {
      $('#homeExpShowFullSize').addClass("disabled");
    }
  }

}

function displayFullSizeHomeImage() {
  if (myDOMs.homeExp.Img.src.length < 150) {
    if (myDOMs.homeExp.ExpID.value === 'NEW') {
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
  img.src = myDOMs.homeExp.Img.src;
  container.setAttribute("src", img.src);

}

let imageAngle = 0;

function rotatereceiptImage() {
  let img = document.getElementById('DivFullImage');
  switch (imageAngle) {
    case 0:
      img.setAttribute('style', 'transform:rotate(90deg)');
      imageAngle = 90;
      break;
    case 90:
      img.setAttribute('style', 'transform:rotate(180deg)');
      imageAngle = 180;
      break;
    case 180:
      img.setAttribute('style', 'transform:rotate(270deg)');
      imageAngle = 270;
      break;
    case 270:
      img.setAttribute('style', 'transform:rotate(0deg)');
      imageAngle = 0;
  }
};
