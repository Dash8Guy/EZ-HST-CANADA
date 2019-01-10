

function displayPSTPaymentModal() {
  $("#pstPaymentModal").modal("show");
  PSTPaymentModalOpen = true;
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === 0 && PaymentTableOpen === false) {
    ToggleMenuBar();
  }
}

function hidePSTPaymentModal() {
  $("#pstPaymentModal").modal("hide");
  myDOMs.PSTPayment.Form.reset();
  savedTransactionLocked = false;
  PSTPaymentModalOpen = false;
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;
  if (myTopVal === -108 && PaymentTableOpen === false) {
    ToggleMenuBar();
  }
}

function addPSTPayment() {
  if (!validatePSTPaymentForm()) {
    return;
  }
  if (
    myDOMs.PSTPayment.PaymentStatus.value !== 'NEW' ||
    myDOMs.PSTPayment.SubmitBtn.classList.contains("disabled")
  ) {
    alert("To update existing Payments, Use the Save Changes button");
    return;
  }

  let myDate = new Date(myDOMs.PSTPayment.DateInput.value);
  myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  let mydata;

  mydata = {
    paymentDate: myDate,
    pstAmt: myDOMs.PSTPayment.PaymentAmtInput.value,
    hstAmt: 0,
    taxAmt: 0,
    description: myDOMs.PSTPayment.PaymentDescription.value,
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
        myDOMs.PSTPayment.AlertContainer,
        "PSTPaymentExpAlert",
        "PSTPaymentCloseBtnAlert",
        `${data} `,
        "",
        ` `,
        "GREEN",
        6000
      );
      myDOMs.PSTPayment.Form.reset();
      myDOMs.PSTPayment.DateInput.focus();

      await getAllMainData('Payments');
      fillMainDataFromArrays();
      totalUpAllPayment();
      updatePSTPaymentTotals();
    })
    .fail(function (err) {
      displayAlert(
        myDOMs.PSTPayment.AlertContainer,
        "PSTPaymentExpAlert",
        "PSTPaymentCloseBtnAlert",
        `${err} `,
        "",
        " ",
        "RED",
        6000
      );
    });

};

function updatePSTPayment() {
  if (savedTransactionLocked) {
    alert(`Because the Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    addPSTPaymentOriginalValues();
    return;
  }
  if (myDOMs.PSTPayment.PaymentStatus.value === 'SAVED') {
    displayAlert(
      myDOMs.PSTPayment.AlertContainer,
      "PSTPaymentExpAlert",
      "PSTPaymentCloseBtnAlert",
      `Save Changes is only available when Payment Status is ALTERED!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  } else if (myDOMs.PSTPayment.PaymentStatus.value === 'NEW') {
    displayAlert(
      myDOMs.PSTPayment.AlertContainer,
      "PSTPaymentExpAlert",
      "PSTPaymentCloseBtnAlert",
      `Save Changes is not available for New Payments. To Save a New Payment, use the Submit button.`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }

  let expID = myDOMs.PSTPayment.BlindID.value;

  formData = new FormData();

  let myDate;

  myDate = new Date(myDOMs.PSTPayment.DateInput.value);
  myDate.setHours(myDate.getHours() + (myDate.getTimezoneOffset() / 60));

  formData.append("paymentDate", myDate);
  formData.append("pstAmt", myDOMs.PSTPayment.PaymentAmtInput.value);
  formData.append("hstAmt", 0);
  formData.append("taxAmt", 0);
  formData.append("description", myDOMs.PSTPayment.PaymentDescription.value);
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
        myDOMs.PSTPayment.AlertContainer,
        "PSTPaymentExpAlert",
        "PSTPaymentCloseBtnAlert",
        `${data.message} `,
        myObjMsg,
        ` `,
        "GREEN",
        6000
      );
      //Code to update report array
      let paymentDate = myDate;
      let paymentAmt = parseFloat(myDOMs.PSTPayment.PaymentAmtInput.value);
      let paymentDescription = myDOMs.PSTPayment.PaymentDescription.value;

      let PaymentData = {
        paymentDate,
        paymentAmt,
        paymentDescription,
      };
      updatePSTPaymentArray(selectedRowNum, PaymentData);

      let myDay = myDate.getDate();
      let myMonth = myDate.getMonth() + 1;
      let myYear = myDate.getFullYear();
      if (myDay < 10) {
        myDay = `0${myDay}`;
      }
      if (myMonth < 10) {
        myMonth = `0${myMonth}`;
      }

      originalPSTPayment.ID = data.NewPayment._id;
      originalPSTPayment.Date = myYear + "-" + myMonth + "-" + myDay;
      originalPSTPayment.Description = myDOMs.PSTPayment.PaymentDescription.value;
      originalPSTPayment.Payment = parseFloat(myDOMs.PSTPayment.PaymentAmtInput.value);
      originalPSTPayment.Status = 'SAVED';
      myDOMs.PSTPayment.PaymentStatus.value = 'SAVED';
      setPSTPaymentStatusColor();

      await getAllMainData('Payments');
      fillMainDataFromArrays();
      totalUpAllPayment();
      updatePSTPaymentTotals();

    })
    .fail(function (err) {
      let myObjMsg = ["Payment Entry Failed to POST to the database"];

      displayAlert(
        myDOMs.PSTPayment.AlertContainer,
        "PSTPaymentExpAlert",
        "PSTPaymentCloseBtnAlert",
        `Payment Update Failed! `,
        myObjMsg,
        " ",
        "RED",
        6000
      );
    });
}

function deletePSTPayment() {
  if (savedTransactionLocked) {
    alert(`Because the Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    return;
  }
  if (myDOMs.PSTPayment.PaymentStatus.value === 'NEW') {
    displayAlert(
      myDOMs.PSTPayment.AlertContainer,
      "PSTPaymentExpAlert",
      "PSTPaymentCloseBtnAlert",
      `Delete is not available when Payment Status is NEW!`,
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  let paymentID = myDOMs.PSTPayment.BlindID.value;

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
          myDOMs.PSTPayment.AlertContainer,
          "PSTPaymentExpAlert",
          "PSTPaymentCloseBtnAlert",
          "Payment Successfully Deleted! ",
          "",
          ` `,
          "GREEN",
          6000
        );

        myDOMs.PSTPayment.Form.reset();
        myDOMs.PSTPayment.DateInput.focus();
        //need to remove that expense from array table.
        let myIndex = paymentArray
          .map(function (x) {
            return x._id;
          })
          .indexOf(paymentID);

        if (myIndex > -1) {
          paymentArray.splice(myIndex, 1);
        }

        resetOriginalPSTPaymentData();

        arrTablePage1 = paymentArray;
        removePaymentTblNavAlertChildNodes();
        if (PaymentType === 'PST') {
          buildPaymentReportTable(
            myDOMs.PaymentTable.AlertContainer,
            "PaymentTableAlert",
            "PaymentReportModalCloseBtn",
            `You have ${
            paymentArray.length
            } PST Payments displayed on 1 page.`,
            "TABLE CAR GREEN",
            0,
            0
          );
        }
        updateFormButtons('PSTPayment');
        await getAllMainData('Payments');
        fillMainDataFromArrays();
        totalUpAllPayment();
        updatePSTPaymentTotals();
      })
      .fail(function (e) {
        let myMsg = [e.responseText];
        displayAlert(
          myDOMs.PSTPayment.AlertContainer,
          "PSTPaymentExpAlert",
          "PSTPaymentCloseBtnAlert",
          `${e.statusText} `,
          myMsg,
          " ",
          "RED",
          6000
        );
      });
  }
}

function getPSTPayments() {
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
    url: `${serverURL}pstPayments`,
    data: tempData,
    enctype: "multipart/form-data"
  })
    .done(function (data) {
      let tempTitle = 'PST Payments';
      paymentArray = data.paymentEntries;
      PaymentType = 'PST';
      buildPaymentReportTable(
        myDOMs.PaymentTable.AlertContainer,
        "PaymentTableAlert",
        "PaymentReportModalCloseBtn",
        `You have ${
        paymentArray.length
        } ${tempTitle} displayed on 1 page.`,
        "TABLE CAR GREEN",
        0,
        "PST"
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

function updatePSTPaymentTotals() {
  if (!PaymentTableOpen) { return; }
  document.getElementById('cellPaymentHSTTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalHST).toFixed(2)))}`;
  document.getElementById('cellPaymentPSTTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalPST).toFixed(2)))}`;
  document.getElementById('cellPaymentTaxTotal').innerText = `$${(formatNumber(Number(myPaymentReportTotal.totalTax).toFixed(2)))}`;
};

function resetOriginalPSTPaymentData() {
  originalPSTPayment.Date = null;
  originalPSTPayment.Description = null;
  originalPSTPayment.ID = null;
  originalPSTPayment.Payment = null;
  originalPSTPayment.Status = 'NEW'
};

myDOMs.PSTPayment.DateInput.addEventListener('change', function (event) {
  if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.PSTPayment.DateInput.value)) {
    alert(`Because your Payment Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this Payment! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
    myDOMs.PSTPayment.DateInput.value = null;
    myDOMs.PSTPayment.DateInput.focus;
  }
});

myDOMs.PSTPayment.ResetBtn.addEventListener("click", function (e) {
  if (myDOMs.PSTPayment.PaymentStatus.value === 'ALTERED') {
    if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
      addPSTPaymentOriginalValues();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
      myDOMs.PSTPayment.Form.reset();
      updateFormButtons('PSTPayment');
    } else {
      e.preventDefault();
    }
  }

});

function validatePSTPaymentForm() {
  const PaymentDate = document.forms["formPSTPaymentEntry"]["pstPaymentDate"];
  const PaymentAmt = document.forms["formPSTPaymentEntry"]["pstPaymentAmt"];
  const description = document.forms["formPSTPaymentEntry"]["pstPaymentDescription"];

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

let originalPSTPayment = {
  Date: null,
  Payment: 0,
  Description: '',
  Status: 'NEW',
  ID: ''
}

function updatePSTPaymentStatus() {
  if (myDOMs.PSTPayment.PaymentStatus.value === 'NEW') { return; }
  let dataMatch = true;
  if (originalPSTPayment.Date === myDOMs.PSTPayment.DateInput.value) {
  } else {
    dataMatch = false;
  }
  if (originalPSTPayment.Payment === myDOMs.PSTPayment.PaymentAmtInput.value) {
  } else {
    dataMatch = false;
  }
  if (originalPSTPayment.Status === myDOMs.PSTPayment.PaymentStatus.value) {
  } else {
    dataMatch = false;
  }
  if (originalPSTPayment.Description === myDOMs.PSTPayment.PaymentDescription.value) {
  } else {
    dataMatch = false;
  }


  if (dataMatch === false) {
    myDOMs.PSTPayment.PaymentStatus.value = 'ALTERED';
    originalPSTPayment.Status = 'ALTERED';
  } else {
    myDOMs.PSTPayment.PaymentStatus.value = 'SAVED';
    originalPSTPayment.Status = 'SAVED';
  }

  setPSTPaymentStatusColor();
}

function setPSTPaymentStatusColor() {
  if (myDOMs.PSTPayment.PaymentStatus.value === 'ALTERED') {
    if (myDOMs.PSTPayment.PaymentStatus.classList.contains('text-danger')) {
    } else {
      myDOMs.PSTPayment.PaymentStatus.classList.add('text-danger');
    }
  } else {
    if (myDOMs.PSTPayment.PaymentStatus.classList.contains('text-danger')) {
      myDOMs.PSTPayment.PaymentStatus.classList.remove('text-danger');
    }
  }

}

function updatePSTPaymentArray(row, data) {
  let myDate = new Date(data.paymentDate);
  let myDay = myDate.getDate();
  let myMonth = myDate.getMonth() + 1;
  let myYear = myDate.getFullYear();

  let varNumOne = 1;
  let arrRow = row;
  row = +row + +varNumOne;

  var myTable = document.getElementById("paymentReportTable");
  myTable.rows[row].cells[1].innerHTML = myMonth + "/" + myDay + "/" + myYear;
  myTable.rows[row].cells[3].innerHTML = `$${data.paymentAmt.toFixed(2)}`;
  myTable.rows[row].cells[5].innerHTML = data.paymentDescription;

  paymentArray[arrRow].paymentDate = data.paymentDate;
  paymentArray[arrRow].pstAmt = data.paymentAmt;
  paymentArray[arrRow].description = data.paymentDescription;


};

function addPSTPaymentOriginalValues() {
  myDOMs.PSTPayment.DateInput.value = originalPSTPayment.Date;
  myDOMs.PSTPayment.PaymentAmtInput.value = originalPSTPayment.Payment;
  myDOMs.PSTPayment.PaymentDescription.value = originalPSTPayment.Description;
  myDOMs.PSTPayment.BlindID.value = originalPSTPayment.ID;
  myDOMs.PSTPayment.PaymentStatus.value = 'SAVED';
  originalPSTPayment.Status = 'SAVED';

  setPSTPaymentStatusColor();
};