

function displayHSTPaymentModal() {
  $("#hstPaymentModal").modal("show");
  let myProv = localStorage.getItem('Selected_Province');
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.HSTPayment.Title.innerText = 'HST Payment Entry Form'
  } else {
    myDOMs.HSTPayment.Title.innerText = 'GST Payment Entry Form'
  }
  HSTPaymentModalOpen = true;
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === 0 && PaymentTableOpen === false) {
    ToggleMenuBar();
  }
}

function hideHSTPaymentModal() {
  $("#hstPaymentModal").modal("hide");
  myDOMs.HSTPayment.Form.reset();
  savedTransactionLocked = false;
  HSTPaymentModalOpen = false;
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === -108 && PaymentTableOpen === false) {
    ToggleMenuBar();
  }
}

function addHSTPayment() {
  if (!validateHSTPaymentForm()) {
    return;
  }
  if (
    myDOMs.HSTPayment.PaymentStatus.value !== 'NEW' ||
    myDOMs.HSTPayment.SubmitBtn.classList.contains("disabled")
  ) {
    alert("To update existing Payments, Use the Save Changes button");
    return;
  }

  let myDate = new Date(myDOMs.HSTPayment.DateInput.value);
  myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  let mydata;

  mydata = {
    paymentDate: myDate,
    hstAmt: myDOMs.HSTPayment.PaymentAmtInput.value,
    pstAmt: 0,
    taxAmt: 0,
    description: myDOMs.HSTPayment.PaymentDescription.value,
    auth: myToken,
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}payments`,
    data: mydata,
    enctype: "multipart/form-data"
  })
    .done(async function (data) {
      if (TableOpen) {
        alert('When Table Report is open, any New Payment added will not be updated in the Table Report! \n\n To view the Report with the new Payment, close and Re-open the Report!');
      }
      displayAlert(
        myDOMs.HSTPayment.AlertContainer,
        "HSTPaymentExpAlert",
        "HSTPaymentCloseBtnAlert",
        `${data} `,
        "",
        ` `,
        "GREEN",
        6000
      );
      myDOMs.HSTPayment.Form.reset();
      myDOMs.HSTPayment.DateInput.focus();

      await getAllMainData('Payments');
      fillMainDataFromArrays();
      totalUpAllPayment();
      updateHSTPaymentTotals();
    })
    .fail(function (err) {
      displayAlert(
        myDOMs.HSTPayment.AlertContainer,
        "HSTPaymentExpAlert",
        "HSTPaymentCloseBtnAlert",
        `${err} `,
        "",
        " ",
        "RED",
        6000
      );
    });

};

function updateHSTPayment() {
  if (savedTransactionLocked) {
    alert(`Because the Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addPaymentOriginalValues();
    return;
  }
  if (myDOMs.HSTPayment.PaymentStatus.value === 'SAVED') {
    displayAlert(
      myDOMs.HSTPayment.AlertContainer,
      "HSTPaymentExpAlert",
      "HSTPaymentCloseBtnAlert",
      `Save Changes is only available when Payment Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.HSTPayment.PaymentStatus.value === 'NEW') {
    displayAlert(
      myDOMs.HSTPayment.AlertContainer,
      "HSTPaymentExpAlert",
      "HSTPaymentCloseBtnAlert",
      `Save Changes is not available for New Payments. To Save a New Payment, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.HSTPayment.BlindID.value;

  formData = new FormData();

  let myDate;

  myDate = new Date(myDOMs.HSTPayment.DateInput.value);
  myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  formData.append("paymentDate", myDate);
  formData.append("hstAmt", myDOMs.HSTPayment.PaymentAmtInput.value);
  formData.append("pstAmt", 0);
  formData.append("taxAmt", 0);
  formData.append("description", myDOMs.HSTPayment.PaymentDescription.value);
  formData.append("auth", myToken);

  $.ajax({
    method: "PATCH",
    url: `${serverURL}payments/${expID}`,
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false
  })
    .done(async function (data) {
      let myObjMsg = [""];

      displayAlert(
        myDOMs.HSTPayment.AlertContainer,
        "HSTPaymentExpAlert",
        "HSTPaymentCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
      //Code to update report array
      let paymentDate = myDate;
      let paymentAmt = parseFloat(myDOMs.HSTPayment.PaymentAmtInput.value);
      let paymentDescription = myDOMs.HSTPayment.PaymentDescription.value;

      let PaymentData = {
        paymentDate,
        paymentAmt,
        paymentDescription,
      };
      updatePaymentArray(selectedRowNum, PaymentData);

      let myDay = myDate.getDate();
      let myMonth = myDate.getMonth() + 1;
      let myYear = myDate.getFullYear();
      if (myDay < 10) {
        myDay = `0${myDay}`;
      }
      if (myMonth < 10) {
        myMonth = `0${myMonth}`;
      }

      originalHSTPayment.ID = data.NewPayment._id;
      originalHSTPayment.Date = myYear + "-" + myMonth + "-" + myDay;
      originalHSTPayment.Description = myDOMs.HSTPayment.PaymentDescription.value;
      originalHSTPayment.Payment = parseFloat(myDOMs.HSTPayment.PaymentAmtInput.value);
      originalHSTPayment.Status = 'SAVED';
      myDOMs.HSTPayment.PaymentStatus.value = 'SAVED';
      setHSTPaymentStatusColor();

      await getAllMainData('Payments');
      fillMainDataFromArrays();
      totalUpAllPayment();
      updateHSTPaymentTotals();

    })
    .fail(function (err) {
      let myObjMsg = ["Payment Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.HSTPayment.AlertContainer,
        "HSTPaymentExpAlert",
        "HSTPaymentCloseBtnAlert",
        `Payment Update Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function deleteHSTPayment() {
  if (savedTransactionLocked) {
    alert(`Because the Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }
  if (myDOMs.HSTPayment.PaymentStatus.value === 'NEW') {
    displayAlert(
      myDOMs.HSTPayment.AlertContainer,
      "HSTPaymentExpAlert",
      "HSTPaymentCloseBtnAlert",
      `Delete is not available when Payment Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let paymentID = myDOMs.HSTPayment.BlindID.value;

  if (confirm("Are you sure you want to Delete this Payment?")) {
    let tempData;
    tempData = {
      auth: myToken,
    };
    $.ajax({
      url: `${serverURL}payments/${paymentID}`,
      method: "DELETE",
      enctype: "multipart/form-data",
      data: tempData
    })
      .done(async function (data) {
        displayAlert(
          myDOMs.HSTPayment.AlertContainer,
          "HSTPaymentExpAlert",
          "HSTPaymentCloseBtnAlert",
          "Payment Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );

        myDOMs.HSTPayment.Form.reset();
        myDOMs.HSTPayment.DateInput.focus();
        //need to remove that expense from array table.
        let myIndex = paymentArray
          .map(function (x) {
            return x._id;
          })
          .indexOf(paymentID);

        if (myIndex > -1) {
          paymentArray.splice(myIndex, 1);
        }

        resetOriginalPaymentData();

        arrTablePage1 = paymentArray;
        removePaymentTblNavAlertChildNodes();
        if (PaymentType === 'HST') {
          buildPaymentReportTable(
            myDOMs.PaymentTable.AlertContainer,
            "PaymentTableAlert",
            "PaymentReportModalCloseBtn",
            `You have ${
            paymentArray.length
            } HST Payments displayed on 1 page.`,
            "TABLE CAR GREEN",
            0,
            0
          );
        }
        updateFormButtons('HSTPayment');
        await getAllMainData('Payments');
        fillMainDataFromArrays();
        totalUpAllPayment();
        updateHSTPaymentTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.HSTPayment.AlertContainer,
          "HSTPaymentExpAlert",
          "HSTPaymentCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}


function getAllPayments() {
  if (PaymentTableOpen) {
    hidePaymentTableModal();
  }

  let tempData;

  tempData = {
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
    url: `${serverURL}payments`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let tempTitle = 'Payments';
      paymentArray = data.paymentEntries;
      PaymentType = 'ALL';
      buildPaymentReportTable(
        myDOMs.PaymentTable.AlertContainer,
        "PaymentTableAlert",
        "PaymentReportModalCloseBtn",
        `You have ${
        paymentArray.length
        } ${tempTitle} displayed on 1 page.`,
        "TABLE CAR GREEN",
        0,
        "ALL"
      );
      ToggleMenuBar();
    })
    .fail(function (e) {
      if (e.readyState === 0 || myToken === '') {
        alert('You Must be logged in before using EZ-HST-CANADA>')
      } else {
        alert(JSON.stringify(e.statusText, undefined, 2));
      }
    });
};


function getHSTPayments() {
  if (PaymentTableOpen) {
    hidePaymentTableModal();
  }

  let tempData;

  tempData = {
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
    url: `${serverURL}hstPayments`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let tempTitle = 'HST Payments';
      paymentArray = data.paymentEntries;
      PaymentType = 'HST';
      buildPaymentReportTable(
        myDOMs.PaymentTable.AlertContainer,
        "PaymentTableAlert",
        "PaymentReportModalCloseBtn",
        `You have ${
        paymentArray.length
        } ${tempTitle} displayed on 1 page.`,
        "TABLE CAR GREEN",
        0,
        "HST"
      );
      ToggleMenuBar();
    })
    .fail(function (e) {
      if (e.readyState === 0 || myToken === '') {
        alert('You Must be logged in before using EZ-HST-CANADA>')
      } else {
        alert(JSON.stringify(e.statusText, undefined, 2));
      }
    });
};

function updatePaymentTotals() {
  if (!PaymentTableOpen) { return; }
  document.getElementById('cellPaymentHSTTotal').innerText = `$${(formatNumber(Number(mainData.Payments.hst).toFixed(2)))}`;
  document.getElementById('cellPaymentPSTTotal').innerText = `$${(formatNumber(Number(mainData.Payments.pst).toFixed(2)))}`;
  document.getElementById('cellPaymentTaxTotal').innerText = `$${(formatNumber(Number(mainData.Payments.tax).toFixed(2)))}`;
};

function updateHSTPaymentTotals() {
  if (!PaymentTableOpen) { return; }
  document.getElementById('cellPaymentHSTTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalHST).toFixed(2)))}`;
  document.getElementById('cellPaymentPSTTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalPST).toFixed(2)))}`;
  document.getElementById('cellPaymentTaxTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalTax).toFixed(2)))}`;
};

function resetOriginalPaymentData() {
  originalHSTPayment.Date = null;
  originalHSTPayment.Description = null;
  originalHSTPayment.ID = null;
  originalHSTPayment.Payment = null;
  originalHSTPayment.Status = 'NEW'
};

myDOMs.HSTPayment.DateInput.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.HSTPayment.DateInput.value)) {
    alert(`Because your Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.HSTPayment.DateInput.value = null;
    myDOMs.HSTPayment.DateInput.focus;
  }
});

myDOMs.HSTPayment.ResetBtn.addEventListener("click", function (e) {
  if (myDOMs.HSTPayment.PaymentStatus.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addPaymentOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.HSTPayment.Form.reset();
      updateFormButtons('HSTPayment');
    } else {
      e.preventDefault();
    }
  }

});

function validateHSTPaymentForm() {
  const PaymentDate = document.forms["formHSTPaymentEntry"]["hstPaymentDate"];
  const PaymentAmt = document.forms["formHSTPaymentEntry"]["hstPaymentAmt"];
  const description = document.forms["formHSTPaymentEntry"]["hstPaymentDescription"];

  if (PaymentDate.value == "") {
    window.alert("Please Select a Date.");
    PaymentDate.focus();
    return false;
  }

  if (isNaN(PaymentAmt.value)) {
    window.alert("Please enter a Number in Payment Amount.");
    PaymentAmt.focus();
    return false;
  }

  if (PaymentAmt.value == "") {
    window.alert("Please enter a Payment Amount.");
    PaymentAmt.focus();
    return false;
  }

  if (PaymentAmt.value == 0) {
    window.alert("Please enter a Payment Amount other than zero.");
    PaymentAmt.focus();
    return false;
  }

  if (description.value == "") {
    window.alert("Please enter a Description.");
    description.focus();
    return false;
  }
  return true;
}

let originalHSTPayment = {
  Date: null,
  Payment: 0,
  Description: '',
  Status: 'NEW',
  ID: ''
}

function updateHSTPaymentStatus() {
  if (myDOMs.HSTPayment.PaymentStatus.value === 'NEW') { return; }
  let dataMatch = true;
  if (originalHSTPayment.Date === myDOMs.HSTPayment.DateInput.value) {
  } else {
    dataMatch = false;
  }
  if (originalHSTPayment.Payment === myDOMs.HSTPayment.PaymentAmtInput.value) {
  } else {
    dataMatch = false;
  }
  if (originalHSTPayment.Status === myDOMs.HSTPayment.PaymentStatus.value) {
  } else {
    dataMatch = false;
  }
  if (originalHSTPayment.Description === myDOMs.HSTPayment.PaymentDescription.value) {
  } else {
    dataMatch = false;
  }


  if (dataMatch === false) {
    myDOMs.HSTPayment.PaymentStatus.value = 'ALTERED';
    originalHSTPayment.Status = 'ALTERED';
  } else {
    myDOMs.HSTPayment.PaymentStatus.value = 'SAVED';
    originalHSTPayment.Status = 'SAVED';
  }

  setHSTPaymentStatusColor();
}

function setHSTPaymentStatusColor() {
  if (myDOMs.HSTPayment.PaymentStatus.value === 'ALTERED') {
    if (myDOMs.HSTPayment.PaymentStatus.classList.contains('text-danger')) {
    } else {
      myDOMs.HSTPayment.PaymentStatus.classList.add('text-danger');
    }
  } else {
    if (myDOMs.HSTPayment.PaymentStatus.classList.contains('text-danger')) {
      myDOMs.HSTPayment.PaymentStatus.classList.remove('text-danger');
    }
  }

}

function updatePaymentArray(row, data) {
  let myDate = new Date(data.paymentDate);
  let myDay = myDate.getDate();
  let myMonth = myDate.getMonth() + 1;
  let myYear = myDate.getFullYear();

  let varNumOne = 1;
  let arrRow = row;
  row = +row + +varNumOne;

  var myTable = document.getElementById("paymentReportTable");
  myTable.rows[row].cells[1].innerHTML = myMonth + "/" + myDay + "/" + myYear;
  myTable.rows[row].cells[2].innerHTML = `$${data.paymentAmt.toFixed(2)}`;
  myTable.rows[row].cells[5].innerHTML = data.paymentDescription;

  paymentArray[arrRow].paymentDate = data.paymentDate;
  paymentArray[arrRow].hstAmt = data.paymentAmt;
  paymentArray[arrRow].description = data.paymentDescription;


};

function addPaymentOriginalValues() {
  myDOMs.HSTPayment.DateInput.value = originalHSTPayment.Date;
  myDOMs.HSTPayment.PaymentAmtInput.value = originalHSTPayment.Payment;
  myDOMs.HSTPayment.PaymentDescription.value = originalHSTPayment.Description;
  myDOMs.HSTPayment.BlindID.value = originalHSTPayment.ID;
  myDOMs.HSTPayment.PaymentStatus.value = 'SAVED';
  originalHSTPayment.Status = 'SAVED';

  setHSTPaymentStatusColor();
};

// function removeTableRow(row) {
//   var myTable = document.getElementById("paymentReportTable");
//   myTable.deleteRow(+row + +1)
//   resetTableLinkNumbers();

// };

// function resetTableLinkNumbers() {
//   var myTable = document.getElementById("paymentReportTable");
//   for (i = 1; i < myTable.rows.length; i++) {
//     myTable.rows[i].cells[0].innerHTML = i;
//   }
// }