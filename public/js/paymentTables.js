//this variable holds the page that was current when the expense was deleted
let currPayPageOnDelete = 0;
//This Variable is set to true when Payment Table is opened and false when close and is used to stop the UpdateTableTotals from running when adding payments or income.
let PaymentTableOpen = false;
//This variable holds the Payment Type(HST - PST -Tax);
let PaymentType = '';
//This Variable hold the Payment Sort String Value to Apply when re-building Table after Sort;
let PaymentSortStringVariable = 'Sorted: As entered.';
let paymentArray = [];
//this variable is to true when user selects last page of table and it only has 1 expense.
//This will allow code to set above variable to current Page minus 1 if users deletes it and page no longer exists
let OnePaymentOnLastPage = false;
//This next string variable will hold the last sort order applied on the table. (ascDate-descDate-asc#-desc#)
let lastPayTableSortOrder = 'none';
function SortPayTable(el) {
  let displaySortText = document.getElementById('paymentSortString');
  if (el.id === 'HeaderSort-Paynumber') {
    if (lastPayTableSortOrder !== 'asc#') {
      paymentArray.sort(function (a, b) {
        var titleA = a._id.toLowerCase(), titleB = b._id.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastPayTableSortOrder = 'asc#';
      PaymentSortStringVariable = `Sorted: Ascending as Entered.`;
      //displaySortText.textContent = `Sorted: Ascending as Entered.`;
    } else if (lastPayTableSortOrder === 'asc#') {
      paymentArray.sort(function (b, a) {
        var titleA = a._id.toLowerCase(), titleB = b._id.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastPayTableSortOrder = 'desc#';
      PaymentSortStringVariable = `Sorted: Descending as Entered.`;
      displaySortText.textContent = `Sorted: Descending as Entered.`;
    }

  } else if (el.id === 'HeaderSort-1') {
    if (lastPayTableSortOrder !== 'ascDate') {
      paymentArray.sort(function (a, b) {
        var dateA = new Date(a.paymentDate), dateB = new Date(b.paymentDate);
        return dateA - dateB;
      });
      lastPayTableSortOrder = 'ascDate';
      PaymentSortStringVariable = `Sorted: Ascending by Date.`;
      //displaySortText.textContent = `Sorted: Ascending by Date.`;
    } else if (lastPayTableSortOrder === 'ascDate') {
      paymentArray.sort(function (b, a) {
        var dateA = new Date(a.paymentDate), dateB = new Date(b.paymentDate);
        return dateA - dateB;
      });
      lastPayTableSortOrder = 'descDate';
      PaymentSortStringVariable = `Sorted: Descending by Date.`;
      //displaySortText.textContent = `Sorted: Descending by Date.`;
    }

  } else if (el.id === 'HeaderSort-2') {
    if (lastPayTableSortOrder !== 'ascHSTamt') {
      paymentArray.sort(function (a, b) {
        var amtA = a.hstAmt, amtB = b.hstAmt;
        return amtA - amtB;
      });
      lastPayTableSortOrder = 'ascHSTamt';
      PaymentSortStringVariable = `Sorted: Ascending by HST/GST Payment.`;
      //displaySortText.textContent = `Sorted: Ascending by HST/GST Payment.`;
    } else if (lastPayTableSortOrder === 'ascHSTamt') {
      paymentArray.sort(function (b, a) {
        var amtA = a.hstAmt, amtB = b.hstAmt;
        return amtA - amtB;
      });
      lastPayTableSortOrder = 'descHSTamt';
      PaymentSortStringVariable = `Sorted: Descending by HST/GST Payment.`;
      //displaySortText.textContent = `Sorted: Descending by HST/GST Payment.`;
    }

  } else if (el.id === 'HeaderSort-3') {
    if (lastPayTableSortOrder !== 'ascPSTamt') {
      paymentArray.sort(function (a, b) {
        var amtA = a.pstAmt, amtB = b.pstAmt;
        return amtA - amtB;
      });
      lastPayTableSortOrder = 'ascPSTamt';
      PaymentSortStringVariable = `Sorted: Ascending by PST Payment.`;
      //displaySortText.textContent = `Sorted: Ascending by PST Payment.`;
    } else if (lastPayTableSortOrder === 'ascPSTamt') {
      paymentArray.sort(function (b, a) {
        var amtA = a.pstAmt, amtB = b.pstAmt;
        return amtA - amtB;
      });
      lastPayTableSortOrder = 'descPSTamt';
      PaymentSortStringVariable = `Sorted: Descending by PST Payment.`;
      //displaySortText.textContent = `Sorted: Descending by PST Payment.`;
    }

  } else if (el.id === 'HeaderSort-4') {
    if (lastPayTableSortOrder !== 'ascTaxamt') {
      paymentArray.sort(function (a, b) {
        var amtA = a.taxAmt, amtB = b.taxAmt;
        return amtA - amtB;
      });
      lastPayTableSortOrder = 'ascTaxamt';
      PaymentSortStringVariable = `Sorted: Ascending by Tax Payment.`;
      //displaySortText.textContent = `Sorted: Ascending by Tax Payment.`;
    } else if (lastPayTableSortOrder === 'ascTaxamt') {
      paymentArray.sort(function (b, a) {
        var amtA = a.taxAmt, amtB = b.taxAmt;
        return amtA - amtB;
      });
      lastPayTableSortOrder = 'descTaxamt';
      PaymentSortStringVariable = `Sorted: Descending by Tax Payment.`;
      //displaySortText.textContent = `Sorted: Descending by Tax Payment.`;
    }

  } else if (el.id === 'HeaderSort-5') {
    if (lastPayTableSortOrder !== 'ascDESCRIPTION') {
      paymentArray.sort(function (a, b) {
        var titleA = a.description.toLowerCase(), titleB = b.description.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastPayTableSortOrder = 'ascDESCRIPTION';
      PaymentSortStringVariable = `Sorted: Ascending by Description.`;
      //displaySortText.textContent = `Sorted: Ascending by Description.`;
    } else if (lastPayTableSortOrder === 'ascDESCRIPTION') {
      paymentArray.sort(function (b, a) {
        var titleA = a.description.toLowerCase(), titleB = b.description.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastPayTableSortOrder = 'descDESCRIPTION';
      PaymentSortStringVariable = `Sorted: Descending by Description.`;
      //displaySortText.textContent = `Sorted: Descending by Description.`;
    }

  }
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
  } else if (PaymentType === 'PST') {
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
  } else if (PaymentType === 'TAX') {
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
  } else if (PaymentType === 'ALL') {
    buildPaymentReportTable(
      myDOMs.PaymentTable.AlertContainer,
      "PaymentTableAlert",
      "PaymentReportModalCloseBtn",
      `You have ${
      paymentArray.length
      } Payments displayed on 1 page.`,
      "TABLE CAR GREEN",
      0,
      0
    );
  }
};

let liPay;
let aPay;
let myStrongTagPay = document.createElement("p");
myStrongTagPay.setAttribute('class', 'float-left')
let paymentSortString = document.createElement("p");
// let navPay = document.createElement("nav");
// navPay.setAttribute("id", "navID");
let myTablePayAlert = document.createElement("div");
let tblPay = document.createElement("table");
let responsiveDivPay = document.createElement("div");

function buildPaymentReportTable(
  curAlertContainer,
  curAlertID,     //PaymentTableAlert
  closeBtnID,
  boldText,
  alertType,
  dismissTime,
  fromPayType
) {
  // let myStrongTagPay = document.createElement("p");
  myTablePayAlert.setAttribute(
    "class",
    "alert alert-secondary alert-dismissible collapse"
  );
  myTablePayAlert.setAttribute("id", curAlertID);
  //Create the Table Header Row
  let myPaymentHeaders = [
    "#",
    "DATE",
    "HST/GST PAYMENT",
    "PST PAYMENT",
    "TAX INSTALLMENT",
    "DESCRIPTION",
  ];
  // creates a <table> element and a <tbody> element

  tblPay.setAttribute("class", "table table-danger table-sm table-hover table-striped");
  tblPay.setAttribute("id", "paymentReportTable");
  responsiveDivPay.setAttribute("class", "table-responsive");
  let tblPayHeader = document.createElement("tHead");
  tblPayHeader.setAttribute('id', 'tablePaymentHeader');
  tblPayHeader.setAttribute('class', 'text-danger');
  let tblPayBody = document.createElement("tbody");

  //create row header
  let Payrow = document.createElement("tr");
  //create header cells
  myPaymentHeaders.forEach((el, index) => {
    let Paycellh = document.createElement("th");
    let headerPayLink = document.createElement("a");
    let cellTexth = document.createTextNode(el);
    headerPayLink.appendChild(cellTexth);
    headerPayLink.setAttribute("href", "#");
    headerPayLink.setAttribute("data-toggle", "tooltip");
    headerPayLink.setAttribute("title", `Click to Sort by ${el}`);
    headerPayLink.setAttribute("onclick", "SortPayTable(this);");
    if (el === '#') {
      headerPayLink.setAttribute("id", `HeaderSort-Paynumber`);
    } else {
      headerPayLink.setAttribute("id", `HeaderSort-${index}`);
    }
    Paycellh.appendChild(headerPayLink);
    Payrow.appendChild(Paycellh);
    Paycellh.setAttribute("class", "text-center bg-white border border-dark");
  });

  //Header now complete, append it to the Table Header
  tblPayHeader.appendChild(Payrow);

  // creating a row ////////////////////////
  arrTablePage1 = paymentArray;
  for (i = 0; i < arrTablePage1.length; i++) {
    // creates a table row
    let myZeroAmt = 0;
    let Payrow = document.createElement("tr");
    Payrow.setAttribute("id", `row${i}`);

    let paymentCell = document.createElement("td");
    let paymentaLink = document.createElement("a");
    let cellPaymentTxt = document.createTextNode(i + 1);
    paymentaLink.appendChild(cellPaymentTxt);
    paymentaLink.setAttribute("href", "#");
    paymentaLink.setAttribute("data-toggle", "tooltip");
    paymentaLink.setAttribute("title", "Click to View/Edit this payment");
    paymentaLink.setAttribute("onclick", 'getPaymentToEdit(this);');
    paymentaLink.setAttribute("id", `cellNumber-${i}`);
    paymentCell.appendChild(paymentaLink);
    paymentCell.setAttribute("class", "text-center");
    Payrow.appendChild(paymentCell);

    paymentCell = document.createElement("td");
    myDate = new Date(arrTablePage1[i].paymentDate);
    tempDate = myDate.toLocaleDateString();
    cellPaymentTxt = document.createTextNode(tempDate);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-center");
    paymentCell.setAttribute("style", "color: rgb(170, 3, 3);");
    paymentCell.setAttribute("id", `cellDate${i}`);
    Payrow.appendChild(paymentCell);
    //HST Payment
    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(`$${arrTablePage1[i].hstAmt.toFixed(2)}`);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right");
    paymentCell.setAttribute("style", "color: rgb(170, 3, 3);");
    paymentCell.setAttribute("id", `cellHSTPaymentAmt${i}`);
    Payrow.appendChild(paymentCell);
    // PST Payment
    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(`$${arrTablePage1[i].pstAmt.toFixed(2)}`);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right");
    paymentCell.setAttribute("style", "color: rgb(170, 3, 3);");
    paymentCell.setAttribute("id", `cellHSTPaymentAmt${i}`);
    Payrow.appendChild(paymentCell);
    // Tax Installement Payment
    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(`$${arrTablePage1[i].taxAmt.toFixed(2)}`);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right");
    paymentCell.setAttribute("style", "color: rgb(170, 3, 3);");
    paymentCell.setAttribute("id", `cellHSTPaymentAmt${i}`);
    Payrow.appendChild(paymentCell);

    //Description
    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(arrTablePage1[i].description);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-center");
    paymentCell.setAttribute("style", "color: rgb(170, 3, 3);");
    paymentCell.setAttribute("id", `cellDescription${i}`);
    Payrow.appendChild(paymentCell);

    // add the row to the end of the table body
    tblPayBody.appendChild(Payrow);
  };

  totalUpAllPayment();
  addTotalsRow();
  function addTotalsRow() {
    let Payrow = document.createElement("tr");
    Payrow.setAttribute("id", `row${rowCountPerPage + 1}`);

    let paymentCell = document.createElement("td");
    let cellPaymentTxt = document.createTextNode('');

    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-center");
    Payrow.appendChild(paymentCell);

    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode('Totals:');
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right font-weight-bold");
    paymentCell.setAttribute("id", `cellTotals`);
    Payrow.appendChild(paymentCell);

    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(`$${formatNumber(Number(myPaymentReportTotal.totalHST).toFixed(2))}`);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right font-weight-bold");
    paymentCell.setAttribute("id", `cellPaymentHSTTotal`);
    Payrow.appendChild(paymentCell);

    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(`$${formatNumber(Number(myPaymentReportTotal.totalPST).toFixed(2))}`);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right font-weight-bold");
    paymentCell.setAttribute("id", `cellPaymentPSTTotal`);
    Payrow.appendChild(paymentCell);

    paymentCell = document.createElement("td");
    cellPaymentTxt = document.createTextNode(`$${formatNumber(Number(myPaymentReportTotal.totalTax).toFixed(2))}`);
    paymentCell.appendChild(cellPaymentTxt);
    paymentCell.setAttribute("class", "text-right font-weight-bold");
    paymentCell.setAttribute("id", `cellPaymentTaxTotal`);
    Payrow.appendChild(paymentCell);


    tblPayBody.appendChild(Payrow);
  }


  // put the <tbody> in the <table>
  tblPay.appendChild(tblPayHeader);
  tblPay.appendChild(tblPayBody);
  if (responsiveDivPay.hasChildNodes()) {
    while (responsiveDivPay.firstChild) {
      responsiveDivPay.removeChild(responsiveDivPay.firstChild);
    }
  }
  responsiveDivPay.appendChild(tblPay);


  let myPDFBtn = document.createElement("button");
  myPDFBtn.setAttribute("class", "btn btn-sm btn-outline-danger d-lg-inline float-right mr-4 mb-1");
  myPDFBtn.setAttribute("id", 'printPDFPaymentBtn');
  myPDFBtn.setAttribute("data-toggle", "tooltip");
  myPDFBtn.setAttribute("title", "Save Table as a PDF!");
  myPDFBtn.setAttribute("onclick", `generatePaymentTablePDF('${PaymentType}')`);

  let myPDFBtnText = document.createTextNode("Print PDF");
  myPDFBtn.appendChild(myPDFBtnText);

  let myBtn = document.createElement("button");
  myBtn.setAttribute("class", "close");
  myBtn.setAttribute("id", closeBtnID);
  myBtn.setAttribute("data-toogle", "tooltip");
  myBtn.setAttribute("title", "Close Table!");
  myBtn.setAttribute("onclick", "hidePaymentTableModal()");

  let btnText = document.createTextNode("x");
  myBtn.appendChild(btnText);



  addPaymentTitleText(myTablePayAlert, boldText);
  paymentSortString.setAttribute("id", "paymentSortString");
  paymentSortString.setAttribute("class", "font-weight-bold float-right d-lg-inline");
  paymentSortString.textContent = PaymentSortStringVariable;
  myTablePayAlert.appendChild(paymentSortString);

  myTablePayAlert.appendChild(myPDFBtn);
  myTablePayAlert.appendChild(myBtn);
  myTablePayAlert.appendChild(responsiveDivPay);

  myDOMs.PaymentTable.AlertContainer.appendChild(myTablePayAlert);
  //$(`#PaymentReportModal`).show("fade");
  $("#PaymentReportModal").modal("show");
  $(`#${curAlertID}`).show("fade");


  PaymentTableOpen = true;

  resetPaymentText(boldText);

  if (enableTooltip === false || enableTooltip === "false") {
    disableTableTooltip('disable');
  }
}

function resetPaymentText(myText) {
  document.getElementById("titlePayNode").textContent = `${myText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
}

function addPaymentTitleText(myTablePayAlert, boldText) {
  // let myStrongTagPay = document.createElement("p");

  myStrongTagPay.setAttribute("id", "titlePayNode");
  myStrongTagPay.setAttribute("class", "font-weight-bold");
  myStrongTagPay.textContent = `${boldText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
  myTablePayAlert.appendChild(myStrongTagPay);
}

function hidePaymentTableModal() {
  // $("#PaymentTableAlert").hide("fade"); //Alert
  // $("#PaymentReportModal").hide("fade"); //Modal
  $("#PaymentReportModal").modal("hide");
  $("#PaymentTableAlert").hide("fade");
  paymentArray = [];
  removePaymentTblNavAlertChildNodes();
  PaymentSortStringVariable = 'Sorted: As entered.'
  // removeVlogTblNavAlertChildNodes();
  PaymentTableOpen = false;

  ToggleMenuBar();

};

function removePaymentTblNavAlertChildNodes() {
  if (aPay !== undefined) {
    if (aPay.hasChildNodes()) {
      while (aPay.firstChild) {
        aPay.removeChild(aPay.firstChild);
      }
    }
  }

  if (liPay !== undefined) {
    if (liPay.hasChildNodes()) {
      while (liPay.firstChild) {
        liPay.removeChild(liPay.firstChild);
      }
    }
  }

  if (myStrongTagPay !== undefined) {
    if (myStrongTagPay.hasChildNodes()) {
      while (myStrongTagPay.firstChild) {
        myStrongTagPay.removeChild(myStrongTagPay.firstChild);
      }
    }
  }

  if (tblPay !== undefined) {
    if (tblPay.hasChildNodes()) {
      while (tblPay.firstChild) {
        tblPay.removeChild(tblPay.firstChild);
      }
    }
  }

  if (responsiveDivPay !== undefined) {
    if (responsiveDivPay.hasChildNodes()) {
      while (responsiveDivPay.firstChild) {
        responsiveDivPay.removeChild(responsiveDivPay.firstChild);
      }
    }
  }

  if (myTablePayAlert !== undefined) {
    if (myTablePayAlert.hasChildNodes()) {
      while (myTablePayAlert.firstChild) {
        myTablePayAlert.removeChild(myTablePayAlert.firstChild);
      }
    }
  }

  if (myDOMs.PaymentTable.AlertContainer !== undefined) {
    if (myDOMs.PaymentTable.AlertContainer.hasChildNodes()) {
      while (myDOMs.PaymentTable.AlertContainer.firstChild) {
        myDOMs.PaymentTable.AlertContainer.removeChild(myDOMs.PaymentTable.AlertContainer.firstChild);
      }
    }
  }
}

function totalUpAllPayment() {
  let myRunningHSTAmt = 0;
  let myRunningPSTAmt = 0;
  let myRunningTaxAmt = 0;
  paymentArray.forEach((el, index) => {
    myRunningHSTAmt += el.hstAmt;
    myRunningPSTAmt += el.pstAmt;
    myRunningTaxAmt += el.taxAmt;
  });
  myPaymentReportTotal.totalHST = myRunningHSTAmt;
  myPaymentReportTotal.totalPST = myRunningPSTAmt;
  myPaymentReportTotal.totalTax = myRunningTaxAmt;
}

function arrOfPaymentObjectToArrOfArrays() {
  let varZero = 0;
  let hstAmtSum = 0;
  let pstAmtSum = 0;
  let taxAmtSum = 0;
  let myTempData = [];
  let myTemp2Arr = [];
  paymentArray.forEach((el, index) => {
    let myTempArr = [];
    myTempArr.push(index + 1);
    let myTempDate = formatMyDate(el.paymentDate);
    myTempArr.push(myTempDate);
    if (el.hstAmt === undefined) {
      myTempArr.push(formatNumber(varZero.toFixed(2)));
    } else {
      myTempArr.push(formatNumber(el.hstAmt.toFixed(2)));
      hstAmtSum = hstAmtSum + el.hstAmt;
    }

    if (el.pstAmt === undefined) {
      myTempArr.push(formatNumber(varZero.toFixed(2)));
    } else {
      myTempArr.push(formatNumber(el.pstAmt.toFixed(2)));
      pstAmtSum = pstAmtSum + el.pstAmt;
    }

    if (el.taxAmt === undefined) {
      myTempArr.push(formatNumber(varZero.toFixed(2)));
    } else {
      myTempArr.push(formatNumber(el.taxAmt.toFixed(2)));
      taxAmtSum = taxAmtSum + el.taxAmt;
    }

    myTempArr.push(el.description);

    myTempData.push(myTempArr);

  });
  myTemp2Arr.push('');
  myTemp2Arr.push('Totals:');
  myTemp2Arr.push(formatNumber(hstAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(pstAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(taxAmtSum.toFixed(2)));
  myTemp2Arr.push('');

  myTempData.push(myTemp2Arr);

  return myTempData;
}


function generatePaymentTablePDF(expGroup) {
  let headText;
  let fileSaveText;
  let myTempDate = getTodaysDate();
  let data = arrOfPaymentObjectToArrOfArrays();
  let columns = ["  #  ", "DATE", "HST/GST", "PST", "TAX", "DESCRIPTION"];
  let doc = new jsPDF('p', 'px', 'letter', true);
  doc.setTextColor(220, 53, 69);
  doc.setFontSize(9);

  switch (expGroup) {
    case 'HST':
      headText = `${paymentArray.length} HST Payments. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `HST Payments(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;
      break;
    case 'PST':
      headText = `${paymentArray.length} PST Payments. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `PST Payments(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;
      break;
    case 'TAX':
      headText = `${paymentArray.length} Tax Payments. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Tax Payments(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;
      break;
    case 'ALL':
      headText = `${paymentArray.length} Total Payments. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Total Payments(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;
      break;
  }


  doc.text(headText, 34, 22);
  // if (data.column.dataKey === 'NET' || data.column.dataKey === 'HST' || data.column.dataKey === 'PST' || data.column.dataKey === 'TOTAL') {
  //   cell.styles.halign = 'right';
  // }
  doc.autoTable(columns, data, {
    tableWidth: 'auto',
    columnWidth: 'auto',
    styles: { cellPadding: 1, fontSize: 6.7 },
    createdHeaderCell: function (cell, data) {
      alignPaymentCol(cell, data, true);
    },
    createdCell: function (cell, data) {
      alignPaymentCol(cell, data, false);
    }
  });

  doc.save(fileSaveText);

}

function alignPaymentCol(cell, data, isHeader) {
  var col = data.column.index;
  var row = data.row.index;
  if (col == 2 || col == 3 || col == 4) {
    cell.styles.halign = 'right';
  } else {
    cell.styles.halign = 'center';
  }
  if (row === paymentArray.length) {
    cell.styles.fontStyle = 'bold';
  }
  if (isHeader) {
    cell.styles.fillColor = [220, 53, 69];
  }
}

function getPaymentToEdit(lnk) {
  let myID = lnk.getAttribute("id");
  let selectRowArr = myID.split("-");
  let selectRow = selectRowArr[1];
  selectedRowNum = selectRow;
  let myPaymentAmt = 0;
  let currentPaymentModal;
  let selectedPayment;

  switch (PaymentType) {
    case 'HST':
      currentPaymentModal = myDOMs.HSTPayment;
      myPaymentAmt = paymentArray[selectRow].hstAmt.toFixed(2);
      displayHSTPaymentModal();
      break;
    case 'PST':
      currentPaymentModal = myDOMs.PSTPayment;
      myPaymentAmt = paymentArray[selectRow].pstAmt.toFixed(2);
      displayPSTPaymentModal();
      break;
    case 'TAX':
      currentPaymentModal = myDOMs.TAXPayment;
      myPaymentAmt = paymentArray[selectRow].taxAmt.toFixed(2);
      displayTAXPaymentModal();
      break;
    case 'ALL':
      if (paymentArray[selectRow].hstAmt === 0 && paymentArray[selectRow].pstAmt === 0) {
        selectedPayment = 'TAX';
        currentPaymentModal = myDOMs.TAXPayment;
        myPaymentAmt = paymentArray[selectRow].taxAmt.toFixed(2);
        displayTAXPaymentModal();
      } else if (paymentArray[selectRow].hstAmt === 0 && paymentArray[selectRow].taxAmt === 0) {
        selectedPayment = 'PST';
        currentPaymentModal = myDOMs.PSTPayment;
        myPaymentAmt = paymentArray[selectRow].pstAmt.toFixed(2);
        displayPSTPaymentModal();
      } else if (paymentArray[selectRow].pstAmt === 0 && paymentArray[selectRow].taxAmt === 0) {
        selectedPayment = 'HST';
        currentPaymentModal = myDOMs.HSTPayment;
        myPaymentAmt = paymentArray[selectRow].hstAmt.toFixed(2);
        displayHSTPaymentModal();
      }
  };


  let myTempID = paymentArray[selectRow]._id;
  let myDate = new Date(paymentArray[selectRow].paymentDate);
  let myDay = myDate.getDate();
  let myMonth = myDate.getMonth() + 1;
  let myYear = myDate.getFullYear();
  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  if (new Date(dbMiscData.lockDate) >= myDate) {
    savedTransactionLocked = true;
    alert('Because the Payment Date is on or before the Lock Date, you will not be allowed to save any changes to it!');
  };

  currentPaymentModal.DateInput.value = myYear + "-" + myMonth + "-" + myDay;
  currentPaymentModal.PaymentAmtInput.value = myPaymentAmt;
  currentPaymentModal.PaymentDescription.value = paymentArray[selectRow].description;
  currentPaymentModal.BlindID.value = myTempID;
  currentPaymentModal.PaymentStatus.value = 'SAVED';

  switch (PaymentType) {
    case 'HST':
      originalHSTPayment.Date = myYear + "-" + myMonth + "-" + myDay;
      originalHSTPayment.Payment = myPaymentAmt;
      originalHSTPayment.Description = paymentArray[selectRow].description;
      originalHSTPayment.ID = myTempID;
      originalHSTPayment.Status = 'SAVED';
      break;
    case 'PST':
      originalPSTPayment.Date = myYear + "-" + myMonth + "-" + myDay;
      originalPSTPayment.Payment = myPaymentAmt;
      originalPSTPayment.Description = paymentArray[selectRow].description;
      originalPSTPayment.ID = myTempID;
      originalPSTPayment.Status = 'SAVED';
      break;
    case 'TAX':
      originalTAXPayment.Date = myYear + "-" + myMonth + "-" + myDay;
      originalTAXPayment.Payment = myPaymentAmt;
      originalTAXPayment.Description = paymentArray[selectRow].description;
      originalTAXPayment.ID = myTempID;
      originalTAXPayment.Status = 'SAVED';
      break;
    case 'ALL':
      switch (selectedPayment) {
        case 'HST':
          originalHSTPayment.Date = myYear + "-" + myMonth + "-" + myDay;
          originalHSTPayment.Payment = myPaymentAmt;
          originalHSTPayment.Description = paymentArray[selectRow].description;
          originalHSTPayment.ID = myTempID;
          originalHSTPayment.Status = 'SAVED';
          break;
        case 'PST':
          originalPSTPayment.Date = myYear + "-" + myMonth + "-" + myDay;
          originalPSTPayment.Payment = myPaymentAmt;
          originalPSTPayment.Description = paymentArray[selectRow].description;
          originalPSTPayment.ID = myTempID;
          originalPSTPayment.Status = 'SAVED';
          break;
        case 'TAX':
          originalTAXPayment.Date = myYear + "-" + myMonth + "-" + myDay;
          originalTAXPayment.Payment = myPaymentAmt;
          originalTAXPayment.Description = paymentArray[selectRow].description;
          originalTAXPayment.ID = myTempID;
          originalTAXPayment.Status = 'SAVED';
      };
  };
};