

function displayTAXPaymentModal() {
  $("#taxPaymentModal").modal("show");
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === 0 && PaymentTableOpen === false) {
    ToggleMenuBar();
  }
}

function hideTAXPaymentModal() {
  $("#taxPaymentModal").modal("hide");
  myDOMs.TAXPayment.Form.reset();
  savedTransactionLocked = false;
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === -108 && PaymentTableOpen === false) {
    ToggleMenuBar();
  }
}

function addTAXPayment() {
  if (!validateTAXPaymentForm()) {
    return;
  }
  if (
    myDOMs.TAXPayment.PaymentStatus.value !== 'NEW' ||
    myDOMs.TAXPayment.SubmitBtn.classList.contains("disabled")
  ) {
    alert("To update existing Payments, Use the Save Changes button");
    return;
  }

  let myDate = new Date(myDOMs.TAXPayment.DateInput.value);
  myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  let mydata;

  mydata = {
    paymentDate: myDate,
    pstAmt: 0,
    hstAmt: 0,
    taxAmt: myDOMs.TAXPayment.PaymentAmtInput.value,
    description: myDOMs.TAXPayment.PaymentDescription.value,
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
        myDOMs.TAXPayment.AlertContainer,
        "TAXPaymentExpAlert",
        "TAXPaymentCloseBtnAlert",
        `${data} `,
        "",
        ` `,
        "GREEN",
        6000
      );
      myDOMs.TAXPayment.Form.reset();
      myDOMs.TAXPayment.DateInput.focus();

      await getAllMainData('Payments');
      fillMainDataFromArrays();
      totalUpAllPayment();
      updateTAXPaymentTotals();
    })
    .fail(function (err) {
      displayAlert(
        myDOMs.TAXPayment.AlertContainer,
        "TAXPaymentExpAlert",
        "TAXPaymentCloseBtnAlert",
        `${err} `,
        "",
        " ",
        "RED",
        6000
      );
    });

};

function updateTAXPayment() {
  if (savedTransactionLocked) {
    alert(`Because the Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addTAXPaymentOriginalValues();
    return;
  }
  if (myDOMs.TAXPayment.PaymentStatus.value === 'SAVED') {
    displayAlert(
      myDOMs.TAXPayment.AlertContainer,
      "TAXPaymentExpAlert",
      "TAXPaymentCloseBtnAlert",
      `Save Changes is only available when Payment Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.TAXPayment.PaymentStatus.value === 'NEW') {
    displayAlert(
      myDOMs.TAXPayment.AlertContainer,
      "TAXPaymentExpAlert",
      "TAXPaymentCloseBtnAlert",
      `Save Changes is not available for New Payments. To Save a New Payment, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.TAXPayment.BlindID.value;

  formData = new FormData();

  let myDate;

  myDate = new Date(myDOMs.TAXPayment.DateInput.value);
  myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  formData.append("paymentDate", myDate);
  formData.append("taxAmt", myDOMs.TAXPayment.PaymentAmtInput.value);
  formData.append("hstAmt", 0);
  formData.append("pstAmt", 0);
  formData.append("description", myDOMs.TAXPayment.PaymentDescription.value);
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
        myDOMs.TAXPayment.AlertContainer,
        "TAXPaymentExpAlert",
        "TAXPaymentCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
      //Code to update report array
      let paymentDate = myDate;
      let paymentAmt = parseFloat(myDOMs.TAXPayment.PaymentAmtInput.value);
      let paymentDescription = myDOMs.TAXPayment.PaymentDescription.value;

      let TaxData = {
        paymentDate,
        paymentAmt,
        paymentDescription,
      };
      updateTAXPaymentArray(selectedRowNum, TaxData);

      let myDay = myDate.getDate();
      let myMonth = myDate.getMonth() + 1;
      let myYear = myDate.getFullYear();
      if (myDay < 10) {
        myDay = `0${myDay}`;
      }
      if (myMonth < 10) {
        myMonth = `0${myMonth}`;
      }

      originalTAXPayment.ID = data.NewPayment._id;
      originalTAXPayment.Date = myYear + "-" + myMonth + "-" + myDay;
      originalTAXPayment.Description = myDOMs.TAXPayment.PaymentDescription.value;
      originalTAXPayment.Payment = parseFloat(myDOMs.TAXPayment.PaymentAmtInput.value);
      originalTAXPayment.Status = 'SAVED';
      myDOMs.TAXPayment.PaymentStatus.value = 'SAVED';
      setTAXPaymentStatusColor();

      await getAllMainData('Payments');
      fillMainDataFromArrays();
      totalUpAllPayment();
      updateTAXPaymentTotals();

    })
    .fail(function (err) {
      let myObjMsg = ["Payment Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.TAXPayment.AlertContainer,
        "TAXPaymentExpAlert",
        "TAXPaymentCloseBtnAlert",
        `Payment Update Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function deleteTAXPayment() {
  if (savedTransactionLocked) {
    alert(`Because the Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }
  if (myDOMs.TAXPayment.PaymentStatus.value === 'NEW') {
    displayAlert(
      myDOMs.TAXPayment.AlertContainer,
      "TAXPaymentExpAlert",
      "TAXPaymentCloseBtnAlert",
      `Delete is not available when Payment Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let paymentID = myDOMs.TAXPayment.BlindID.value;

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
          myDOMs.TAXPayment.AlertContainer,
          "TAXPaymentExpAlert",
          "TAXPaymentCloseBtnAlert",
          "Payment Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );

        myDOMs.TAXPayment.Form.reset();
        myDOMs.TAXPayment.DateInput.focus();
        //need to remove that expense from array table.
        let myIndex = paymentArray
          .map(function (x) {
            return x._id;
          })
          .indexOf(paymentID);

        if (myIndex > -1) {
          paymentArray.splice(myIndex, 1);
        }

        resetOriginalTAXPaymentData();

        arrTablePage1 = paymentArray;
        removePaymentTblNavAlertChildNodes();
        if (PaymentType === 'TAX') {
          buildPaymentReportTable(
            myDOMs.PaymentTable.AlertContainer,
            "PaymentTableAlert",
            "PaymentReportModalCloseBtn",
            `You have ${
            paymentArray.length
            } Tax Payments displayed on 1 page.`,
            "TABLE CAR GREEN",
            0,
            0
          );
        }
        updateFormButtons('TAXPayment');
        await getAllMainData('Payments');
        fillMainDataFromArrays();
        totalUpAllPayment();
        updateTAXPaymentTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.TAXPayment.AlertContainer,
          "TAXPaymentExpAlert",
          "TAXPaymentCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getTAXPayments() {
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
    url: `${serverURL}taxPayments`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let tempTitle = 'Tax Payments';
      paymentArray = data.paymentEntries;
      PaymentType = 'TAX';
      buildPaymentReportTable(
        myDOMs.PaymentTable.AlertContainer,
        "PaymentTableAlert",
        "PaymentReportModalCloseBtn",
        `You have ${
        paymentArray.length
        } ${tempTitle} displayed on 1 page.`,
        "TABLE CAR GREEN",
        0,
        "TAX"
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

function updateTAXPaymentTotals() {
  if (!PaymentTableOpen) { return; }
  document.getElementById('cellPaymentHSTTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalHST).toFixed(2)))}`;
  document.getElementById('cellPaymentPSTTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalPST).toFixed(2)))}`;
  document.getElementById('cellPaymentTaxTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalTax).toFixed(2)))}`;
};

function resetOriginalTAXPaymentData() {
  originalTAXPayment.Date = null;
  originalTAXPayment.Description = null;
  originalTAXPayment.ID = null;
  originalTAXPayment.Payment = null;
  originalTAXPayment.Status = 'NEW'
};

myDOMs.TAXPayment.DateInput.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.TAXPayment.DateInput.value)) {
    alert(`Because your Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.TAXPayment.DateInput.value = null;
    myDOMs.TAXPayment.DateInput.focus;
  }
});

myDOMs.TAXPayment.ResetBtn.addEventListener("click", function (e) {
  if (myDOMs.TAXPayment.PaymentStatus.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addTAXPaymentOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.TAXPayment.Form.reset();
      updateFormButtons('TAXPayment');
    } else {
      e.preventDefault();
    }
  }

});

function validateTAXPaymentForm() {
  const PaymentDate = document.forms["formTAXPaymentEntry"]["taxPaymentDate"];
  const PaymentAmt = document.forms["formTAXPaymentEntry"]["taxPaymentAmt"];
  const description = document.forms["formTAXPaymentEntry"]["taxPaymentDescription"];

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

let originalTAXPayment = {
  Date: null,
  Payment: 0,
  Description: '',
  Status: 'NEW',
  ID: ''
}

function updateTAXPaymentStatus() {
  if (myDOMs.TAXPayment.PaymentStatus.value === 'NEW') { return; }
  let dataMatch = true;
  if (originalTAXPayment.Date === myDOMs.TAXPayment.DateInput.value) {
  } else {
    dataMatch = false;
  }
  if (originalTAXPayment.Payment === myDOMs.TAXPayment.PaymentAmtInput.value) {
  } else {
    dataMatch = false;
  }
  if (originalTAXPayment.Status === myDOMs.TAXPayment.PaymentStatus.value) {
  } else {
    dataMatch = false;
  }
  if (originalTAXPayment.Description === myDOMs.TAXPayment.PaymentDescription.value) {
  } else {
    dataMatch = false;
  }


  if (dataMatch === false) {
    myDOMs.TAXPayment.PaymentStatus.value = 'ALTERED';
    originalTAXPayment.Status = 'ALTERED';
  } else {
    myDOMs.TAXPayment.PaymentStatus.value = 'SAVED';
    originalTAXPayment.Status = 'SAVED';
  }

  setTAXPaymentStatusColor();
}

function setTAXPaymentStatusColor() {
  if (myDOMs.TAXPayment.PaymentStatus.value === 'ALTERED') {
    if (myDOMs.TAXPayment.PaymentStatus.classList.contains('text-danger')) {
    } else {
      myDOMs.TAXPayment.PaymentStatus.classList.add('text-danger');
    }
  } else {
    if (myDOMs.TAXPayment.PaymentStatus.classList.contains('text-danger')) {
      myDOMs.TAXPayment.PaymentStatus.classList.remove('text-danger');
    }
  }

}

function updateTAXPaymentArray(row, data) {
  let myDate = new Date(data.paymentDate);
  let myDay = myDate.getDate();
  let myMonth = myDate.getMonth() + 1;
  let myYear = myDate.getFullYear();

  let varNumOne = 1;
  let arrRow = row;
  row = +row + +varNumOne;

  var myTable = document.getElementById("paymentReportTable");
  myTable.rows[row].cells[1].innerHTML = myMonth + "/" + myDay + "/" + myYear;
  myTable.rows[row].cells[4].innerHTML = `$${data.paymentAmt.toFixed(2)}`;
  myTable.rows[row].cells[5].innerHTML = data.paymentDescription;

  paymentArray[arrRow].paymentDate = data.paymentDate;
  paymentArray[arrRow].taxAmt = data.paymentAmt;
  paymentArray[arrRow].description = data.paymentDescription;


};

function addTAXPaymentOriginalValues() {
  myDOMs.TAXPayment.DateInput.value = originalTAXPayment.Date;
  myDOMs.TAXPayment.PaymentAmtInput.value = originalTAXPayment.Payment;
  myDOMs.TAXPayment.PaymentDescription.value = originalTAXPayment.Description;
  myDOMs.TAXPayment.BlindID.value = originalTAXPayment.ID;
  myDOMs.TAXPayment.PaymentStatus.value = 'SAVED';
  originalTAXPayment.Status = 'SAVED';

  setTAXPaymentStatusColor();
};