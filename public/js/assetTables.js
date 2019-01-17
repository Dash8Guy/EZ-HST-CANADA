//This Variable is set to true when Payment Table is opened and false when close and is used to stop the UpdateTableTotals from running when adding payments or income.
let AssetTableOpen = false;
//This variable holds the Payment Type(HST - PST -Tax);

let AssetSortStringVariable = 'Sorted: As entered.';
let assetArray = [];

//This next string variable will hold the last sort order applied on the table. (ascDate-descDate-asc#-desc#)
let lastAssetTableSortOrder = 'none';
function SortAssetTable(el) {
  let displaySortText = document.getElementById('assetSortString');
  if (el.id === 'HeadAssetSort-Assetnumber') {
    if (lastAssetTableSortOrder !== 'asc#') {
      assetArray.sort(function (a, b) {
        var titleA = a._id.toLowerCase(), titleB = b._id.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastAssetTableSortOrder = 'asc#';
      AssetSortStringVariable = `Sorted: Ascending as Entered.`;
      //displaySortText.textContent = `Sorted: Ascending as Entered.`;
    } else if (lastAssetTableSortOrder === 'asc#') {
      assetArray.sort(function (b, a) {
        var titleA = a._id.toLowerCase(), titleB = b._id.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastAssetTableSortOrder = 'desc#';
      AssetSortStringVariable = `Sorted: Descending as Entered.`;
      //displaySortText.textContent = `Sorted: Descending as Entered.`;
    }

  } else if (el.id === 'HeadAssetSort-1') {
    if (lastAssetTableSortOrder !== 'ascDate') {
      assetArray.sort(function (a, b) {
        var dateA = new Date(a.purchaseDate), dateB = new Date(b.purchaseDate);
        return dateA - dateB;
      });
      lastAssetTableSortOrder = 'ascDate';
      AssetSortStringVariable = `Sorted: Ascending by Date Added.`;
    } else if (lastAssetTableSortOrder === 'ascDate') {
      assetArray.sort(function (b, a) {
        var dateA = new Date(a.purchaseDate), dateB = new Date(b.purchaseDate);
        return dateA - dateB;
      });
      lastAssetTableSortOrder = 'descDate';
      AssetSortStringVariable = `Sorted: Descending by Date Added.`;
    }

  } else if (el.id === 'HeadAssetSort-2') {
    if (lastAssetTableSortOrder !== 'ascDateClaim') {
      assetArray.sort(function (a, b) {
        var dateA = new Date(a.claimDate), dateB = new Date(b.claimDate);
        return dateA - dateB;
      });
      lastAssetTableSortOrder = 'ascDateClaim';
      AssetSortStringVariable = `Sorted: Ascending by Claim Date.`;
    } else if (lastAssetTableSortOrder === 'ascDateClaim') {
      assetArray.sort(function (b, a) {
        var dateA = new Date(a.claimDate), dateB = new Date(b.claimDate);
        return dateA - dateB;
      });
      lastAssetTableSortOrder = 'descDateClaim';
      AssetSortStringVariable = `Sorted: Descending by Claim Date.`;
    }

  } else if (el.id === 'HeadAssetSort-3') {
    if (lastAssetTableSortOrder !== 'ascDESCRIPTION') {
      assetArray.sort(function (a, b) {
        var titleA = a.description.toLowerCase(), titleB = b.description.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastAssetTableSortOrder = 'ascDESCRIPTION';
      AssetSortStringVariable = `Sorted: Ascending by Description.`;
      //displaySortText.textContent = `Sorted: Ascending by Description.`;
    } else if (lastAssetTableSortOrder === 'ascDESCRIPTION') {
      assetArray.sort(function (b, a) {
        var titleA = a.description.toLowerCase(), titleB = b.description.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastAssetTableSortOrder = 'descDESCRIPTION';
      AssetSortStringVariable = `Sorted: Descending by Description.`;
      //displaySortText.textContent = `Sorted: Descending by Description.`;
    }

  } else if (el.id === 'HeadAssetSort-4') {
    if (lastAssetTableSortOrder !== 'ascStartAmt') {
      assetArray.sort(function (a, b) {
        var amtA = a.startValue, amtB = b.startValue;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'ascStartAmt';
      AssetSortStringVariable = `Sorted: Ascending by Asset Value.`;
    } else if (lastAssetTableSortOrder === 'ascStartAmt') {
      assetArray.sort(function (b, a) {
        var amtA = a.startValue, amtB = b.startValue;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'descStartAmt';
      AssetSortStringVariable = `Sorted: Descending by Asset Value.`;
    }

  } else if (el.id === 'HeadAssetSort-5') {
    if (lastAssetTableSortOrder !== 'ascBusPercent') {
      assetArray.sort(function (a, b) {
        var amtA = a.busPercent, amtB = b.busPercent;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'ascBusPercent';
      AssetSortStringVariable = `Sorted: Ascending by Business %.`;
    } else if (lastAssetTableSortOrder === 'ascBusPercent') {
      assetArray.sort(function (b, a) {
        var amtA = a.busPercent, amtB = b.busPercent;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'descBusPercent';
      AssetSortStringVariable = `Sorted: Descending by Business %.`;
    }

  } else if (el.id === 'HeadAssetSort-6') {
    if (lastAssetTableSortOrder !== 'ascClaimAmt') {
      assetArray.sort(function (a, b) {
        var amtA = a.claimAmt, amtB = b.claimAmt;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'ascClaimAmt';
      AssetSortStringVariable = `Sorted: Ascending by Depreciation Claim.`;
    } else if (lastAssetTableSortOrder === 'ascClaimAmt') {
      assetArray.sort(function (b, a) {
        var amtA = a.claimAmt, amtB = b.claimAmt;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'descClaimAmt';
      AssetSortStringVariable = `Sorted: Descending by Depreciation Claim.`;
    }
  } else if (el.id === 'HeadAssetSort-7') {
    if (lastAssetTableSortOrder !== 'ascActualClaimAmt') {
      assetArray.sort(function (a, b) {
        var amtA = a.claimAmt * a.busPercent, amtB = b.claimAmt * b.busPercent;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'ascActualClaimAmt';
      AssetSortStringVariable = `Sorted: Ascending by Actual Depreciation Claim.`;
    } else if (lastAssetTableSortOrder === 'ascActualClaimAmt') {
      assetArray.sort(function (b, a) {
        var amtA = a.claimAmt * a.busPercent, amtB = b.claimAmt * b.busPercent;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'descActualClaimAmt';
      AssetSortStringVariable = `Sorted: Descending by Actual Depreciation Claim.`;
    }
  } else if (el.id === 'HeadAssetSort-8') {
    if (lastAssetTableSortOrder !== 'ascITCClaimAmt') {
      assetArray.sort(function (a, b) {
        var amtA = a.itcClaimAmt, amtB = b.itcClaimAmt;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'ascITCClaimAmt';
      AssetSortStringVariable = `Sorted: Ascending by ITC Claim.`;
    } else if (lastAssetTableSortOrder === 'ascITCClaimAmt') {
      assetArray.sort(function (b, a) {
        var amtA = a.itcClaimAmt, amtB = b.itcClaimAmt;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'descITCClaimAmt';
      AssetSortStringVariable = `Sorted: Descending by ITC Claim.`;
    }
  } else if (el.id === 'HeadAssetSort-9') {
    if (lastAssetTableSortOrder !== 'ascActualITCClaimAmt') {
      assetArray.sort(function (a, b) {
        var amtA = a.itcClaimAmt * a.busPercent, amtB = b.itcClaimAmt * b.busPercent;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'ascActualITCClaimAmt';
      AssetSortStringVariable = `Sorted: Ascending by Actual ITC Claim.`;
    } else if (lastAssetTableSortOrder === 'ascActualITCClaimAmt') {
      assetArray.sort(function (b, a) {
        var amtA = a.itcClaimAmt * a.busPercent, amtB = b.itcClaimAmt * b.busPercent;
        return amtA - amtB;
      });
      lastAssetTableSortOrder = 'descActualITCClaimAmt';
      AssetSortStringVariable = `Sorted: Descending by Actual ITC Claim.`;
    }
  }

  arrTablePage1 = assetArray;
  removeAssetTblNavAlertChildNodes();
  buildAssetReportTable(
    myDOMs.AssetTable.AlertContainer,
    "AssetTableAlert",
    "AssetReportModalCloseBtn",
    `You have ${
    assetArray.length
    } Fixed Assets displayed on 1 page.`,
    "TABLE CAR GREEN",
    0,
    0
  );
};

let liAsset;
let aAsset;
let myStrongTagAsset = document.createElement("p");
myStrongTagAsset.setAttribute('class', 'float-left')
let assetSortString = document.createElement("p");
// let navPay = document.createElement("nav");
// navPay.setAttribute("id", "navID");
let myTableAssetAlert = document.createElement("div");
let tblAsset = document.createElement("table");
let responsiveDivAsset = document.createElement("div");

function buildAssetReportTable(
  curAlertContainer,
  curAlertID,     //AssetTableAlert
  closeBtnID,
  boldText,
  alertType,
  dismissTime,
  fromPayType
) {
  // let myStrongTagAsset = document.createElement("p");
  myTableAssetAlert.setAttribute(
    "class",
    "alert alert-secondary alert-dismissible collapse"
  );
  myTableAssetAlert.setAttribute("id", curAlertID);
  //Create the Table Header Row
  let myAssetHeaders = [
    "#",
    "Date Added",
    "Claim Date",
    "Description",
    "Asset Value",
    "Business %",
    "Depreciation Claim",
    "Actual Depreciation Claim",
    "ITC Claim",
    "Actual ITC Claim"
  ];
  // creates a <table> element and a <tbody> element

  tblAsset.setAttribute("class", "table table-secondary table-lg table-hover table-striped");
  tblAsset.setAttribute("id", "assetReportTable");
  responsiveDivAsset.setAttribute("class", "table-responsive");
  let tblAssetHeader = document.createElement("tHead");
  tblAssetHeader.setAttribute('id', 'tableAssetHeader');
  tblAssetHeader.setAttribute('class', 'thead-dark');
  let tblAssetBody = document.createElement("tbody");

  //create row header
  let Assetrow = document.createElement("tr");
  //create header cells
  myAssetHeaders.forEach((el, index) => {
    let Assetcellh = document.createElement("th");
    let headerAssetLink = document.createElement("a");
    let cellTexth = document.createTextNode(el);
    headerAssetLink.appendChild(cellTexth);
    headerAssetLink.setAttribute("href", "#");
    headerAssetLink.setAttribute("data-toggle", "tooltip");
    headerAssetLink.setAttribute("title", `Click to Sort by ${el}`);
    headerAssetLink.setAttribute("onclick", "SortAssetTable(this);");
    if (el === '#') {
      headerAssetLink.setAttribute("id", `HeadAssetSort-Assetnumber`);
    } else {
      headerAssetLink.setAttribute("id", `HeadAssetSort-${index}`);
    }
    Assetcellh.appendChild(headerAssetLink);
    Assetrow.appendChild(Assetcellh);
    Assetcellh.setAttribute("class", "text-center bg-white border border-dark");
  });

  //Header now complete, append it to the Table Header
  tblAssetHeader.appendChild(Assetrow);

  // creating a row ////////////////////////
  arrTablePage1 = assetArray;
  for (i = 0; i < arrTablePage1.length; i++) {
    // creates a table row
    let myZeroAmt = 0;
    let Assetrow = document.createElement("tr");
    Assetrow.setAttribute("id", `row${i}`);

    let AssetCell = document.createElement("td");
    let assetaLink = document.createElement("a");
    let cellAssetTxt = document.createTextNode(i + 1);
    assetaLink.appendChild(cellAssetTxt);
    assetaLink.setAttribute("href", "#");
    assetaLink.setAttribute("data-toggle", "tooltip");
    assetaLink.setAttribute("title", "Click to View/Edit this Asset");
    assetaLink.setAttribute("onclick", 'getAssetToEdit(this);');
    assetaLink.setAttribute("id", `cellNumber-${i}`);
    AssetCell.appendChild(assetaLink);
    AssetCell.setAttribute("class", "text-center");
    Assetrow.appendChild(AssetCell);

    //Date Added
    AssetCell = document.createElement("td");
    myDate = new Date(arrTablePage1[i].purchaseDate);

    let myCellDay = myDate.getUTCDate();
    let myCellMonth = myDate.getUTCMonth() + 1;
    let myCellYear = myDate.getUTCFullYear();
    if (myCellDay < 10) {
      myCellDay = `0${myCellDay}`;
    }
    if (myCellMonth < 10) {
      myCellMonth = `0${myCellMonth}`;
    }
    let tempAssetStringDate = `${myCellMonth}-${myCellDay}-${myCellYear}`;

    cellAssetTxt = document.createTextNode(tempAssetStringDate);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellPurchaseDate${i}`);
    Assetrow.appendChild(AssetCell);

    //Claim Date
    AssetCell = document.createElement("td");
    myDate = new Date(arrTablePage1[i].claimDate);
    myCellDay = myDate.getUTCDate();
    myCellMonth = myDate.getUTCMonth() + 1;
    myCellYear = myDate.getUTCFullYear();

    if (myCellDay < 10) {
      myCellDay = `0${myCellDay}`;
    }
    if (myCellMonth < 10) {
      myCellMonth = `0${myCellMonth}`;
    }
    tempAssetStringDate = `${myCellMonth}-${myCellDay}-${myCellYear}`;

    cellAssetTxt = document.createTextNode(tempAssetStringDate);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellClaimDate${i}`);
    Assetrow.appendChild(AssetCell);

    //Description
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(arrTablePage1[i].description);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellDescription${i}`);
    Assetrow.appendChild(AssetCell);
    // Asset Value
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(arrTablePage1[i].startValue.toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellStartValue${i}`);
    Assetrow.appendChild(AssetCell);
    // Business Percent
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(arrTablePage1[i].busPercent.toFixed(2));
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellBusPercent${i}`);
    Assetrow.appendChild(AssetCell);

    //Claim Amount
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(arrTablePage1[i].claimAmt.toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellClaimAmt${i}`);
    Assetrow.appendChild(AssetCell);

    //Actual Claim Amount
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber((arrTablePage1[i].busPercent * arrTablePage1[i].claimAmt / 100).toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellActualClaimAmt${i}`);
    Assetrow.appendChild(AssetCell);

    //ITC Claim Amount
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(arrTablePage1[i].itcClaimAmt.toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellITCClaimAmt${i}`);
    Assetrow.appendChild(AssetCell);

    //Actual ITC Claim Amount
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber((arrTablePage1[i].busPercent * arrTablePage1[i].itcClaimAmt / 100).toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right");
    AssetCell.setAttribute("style", "color: rgb(0, 0, 0);");
    AssetCell.setAttribute("id", `cellActualITCClaimAmt${i}`);
    Assetrow.appendChild(AssetCell);

    // add the row to the end of the table body
    tblAssetBody.appendChild(Assetrow);
  };

  totalUpAllAsset();
  addAssetTotalsRow();
  function addAssetTotalsRow() {
    let Assetrow = document.createElement("tr");
    Assetrow.setAttribute("id", `row${rowCountPerPage + 1}`);

    //Blank for #
    let AssetCell = document.createElement("td");
    let cellAssetTxt = document.createTextNode('');

    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    Assetrow.appendChild(AssetCell);

    //Blank for Purchase Date
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode('');

    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    Assetrow.appendChild(AssetCell);

    //Blank for Claim Date
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode('');

    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    Assetrow.appendChild(AssetCell);

    //Blank in Description Column
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode('');

    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    Assetrow.appendChild(AssetCell);

    //Blank in Asset Value Column
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode('');

    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-center");
    Assetrow.appendChild(AssetCell);

    //Totals in Business Percent Column
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode('Totals:');
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right font-weight-bold");
    AssetCell.setAttribute("id", `cellTotals`);
    Assetrow.appendChild(AssetCell);

    //SUM of all Depreciation Claim
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(Number(myAssetReportTotal.claimAmt).toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right font-weight-bold");
    AssetCell.setAttribute("id", `cellAssetClaimAmtTotal`);
    Assetrow.appendChild(AssetCell);

    //SUM of all Actual Depreciation Claim
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(Number(myAssetReportTotal.ActualclaimAmt).toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right font-weight-bold");
    AssetCell.setAttribute("id", `cellAssetActualClaimAmtTotal`);
    Assetrow.appendChild(AssetCell);

    //SUM of all ITC Claim
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(Number(myAssetReportTotal.ITCClaimAmt).toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right font-weight-bold");
    AssetCell.setAttribute("id", `cellAssetITCClaimAmtTotal`);
    Assetrow.appendChild(AssetCell);

    //SUM of all Actual ITC Claim
    AssetCell = document.createElement("td");
    cellAssetTxt = document.createTextNode(`$${formatNumber(Number(myAssetReportTotal.ActualITCClaimAmt).toFixed(2))}`);
    AssetCell.appendChild(cellAssetTxt);
    AssetCell.setAttribute("class", "text-right font-weight-bold");
    AssetCell.setAttribute("id", `cellAssetActualITCClaimAmtTotal`);
    Assetrow.appendChild(AssetCell);

    tblAssetBody.appendChild(Assetrow);
  }


  // put the <tbody> in the <table>
  tblAsset.appendChild(tblAssetHeader);
  tblAsset.appendChild(tblAssetBody);
  if (responsiveDivAsset.hasChildNodes()) {
    while (responsiveDivAsset.firstChild) {
      responsiveDivAsset.removeChild(responsiveDivAsset.firstChild);
    }
  }
  responsiveDivAsset.appendChild(tblAsset);


  let myPDFBtn = document.createElement("button");
  myPDFBtn.setAttribute("class", "btn btn-sm btn-outline-secondary d-lg-inline float-right mr-4 mb-1");
  myPDFBtn.setAttribute("id", 'printPDFAssetBtn');
  myPDFBtn.setAttribute("data-toggle", "tooltip");
  myPDFBtn.setAttribute("title", "Save Table as a PDF!");
  myPDFBtn.setAttribute("onclick", `generateAssetTablePDF('${PaymentType}')`);

  let myPDFBtnText = document.createTextNode("Print PDF");
  myPDFBtn.appendChild(myPDFBtnText);

  let myBtn = document.createElement("button");
  myBtn.setAttribute("class", "close");
  myBtn.setAttribute("id", closeBtnID);
  myBtn.setAttribute("data-toogle", "tooltip");
  myBtn.setAttribute("title", "Close Table!");
  myBtn.setAttribute("onclick", "hideAssetTableModal()");

  let btnText = document.createTextNode("x");
  myBtn.appendChild(btnText);



  addAssetTitleText(myTableAssetAlert, boldText);
  assetSortString.setAttribute("id", "assetSortString");
  assetSortString.setAttribute("class", "font-weight-bold float-right d-lg-inline");
  assetSortString.textContent = AssetSortStringVariable;
  myTableAssetAlert.appendChild(assetSortString);

  myTableAssetAlert.appendChild(myPDFBtn);
  myTableAssetAlert.appendChild(myBtn);
  myTableAssetAlert.appendChild(responsiveDivAsset);

  myDOMs.AssetTable.AlertContainer.appendChild(myTableAssetAlert);
  //$(`#PaymentReportModal`).show("fade");
  $("#AssetReportModal").modal("show");
  $(`#${curAlertID}`).show("fade");


  AssetTableOpen = true;

  resetAssetText(boldText);

  if (enableTooltip === false || enableTooltip === "false") {
    disableTableTooltip('disable');
  }
}

function resetAssetText(myText) {
  document.getElementById("titleAssetNode").textContent = `${myText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
}

function addAssetTitleText(myTableAssetAlert, boldText) {
  // let myStrongTagAsset = document.createElement("p");

  myStrongTagAsset.setAttribute("id", "titleAssetNode");
  myStrongTagAsset.setAttribute("class", "font-weight-bold");
  myStrongTagAsset.textContent = `${boldText} (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
  myTableAssetAlert.appendChild(myStrongTagAsset);
}

function hideAssetTableModal() {
  $("#AssetReportModal").modal("hide");
  $("#AssetTableAlert").hide("fade");
  assetArray = [];
  removeAssetTblNavAlertChildNodes();
  AssetSortStringVariable = 'Sorted: As entered.'
  AssetTableOpen = false;
  if (reOpenIncomeStatement) {
    reOpenIncomeStatement = false;
    displayIncomeStatementModal();
  }
  ToggleMenuBar();
};

function removeAssetTblNavAlertChildNodes() {
  if (aAsset !== undefined) {
    if (aAsset.hasChildNodes()) {
      while (aAsset.firstChild) {
        aAsset.removeChild(aAsset.firstChild);
      }
    }
  }

  if (liAsset !== undefined) {
    if (liAsset.hasChildNodes()) {
      while (liAsset.firstChild) {
        liAsset.removeChild(liAsset.firstChild);
      }
    }
  }

  if (myStrongTagAsset !== undefined) {
    if (myStrongTagAsset.hasChildNodes()) {
      while (myStrongTagAsset.firstChild) {
        myStrongTagAsset.removeChild(myStrongTagAsset.firstChild);
      }
    }
  }

  if (tblAsset !== undefined) {
    if (tblAsset.hasChildNodes()) {
      while (tblAsset.firstChild) {
        tblAsset.removeChild(tblAsset.firstChild);
      }
    }
  }

  if (responsiveDivAsset !== undefined) {
    if (responsiveDivAsset.hasChildNodes()) {
      while (responsiveDivAsset.firstChild) {
        responsiveDivAsset.removeChild(responsiveDivAsset.firstChild);
      }
    }
  }

  if (myTableAssetAlert !== undefined) {
    if (myTableAssetAlert.hasChildNodes()) {
      while (myTableAssetAlert.firstChild) {
        myTableAssetAlert.removeChild(myTableAssetAlert.firstChild);
      }
    }
  }

  if (myDOMs.AssetTable.AlertContainer !== undefined) {
    if (myDOMs.AssetTable.AlertContainer.hasChildNodes()) {
      while (myDOMs.AssetTable.AlertContainer.firstChild) {
        myDOMs.AssetTable.AlertContainer.removeChild(myDOMs.AssetTable.AlertContainer.firstChild);
      }
    }
  }
}

function totalUpAllAsset() {
  let myRunningClaimAmt = 0;
  let myRunningITCClaimAmt = 0;
  let myRunningActualClaimAmt = 0;
  let myRunningActualITCClaimAmt = 0;

  assetArray.forEach((el, index) => {
    myRunningClaimAmt += el.claimAmt;
    myRunningITCClaimAmt += el.itcClaimAmt;
    myRunningActualClaimAmt += el.claimAmt * (el.busPercent / 100);
    myRunningActualITCClaimAmt += el.itcClaimAmt * (el.busPercent / 100);

  });
  myAssetReportTotal.claimAmt = myRunningClaimAmt;
  myAssetReportTotal.ITCClaimAmt = myRunningITCClaimAmt;
  myAssetReportTotal.ActualclaimAmt = myRunningActualClaimAmt;
  myAssetReportTotal.ActualITCClaimAmt = myRunningActualITCClaimAmt;
}

function arrOfAssetObjectToArrOfArrays() {
  let ClaimAmtSUM = 0;
  let ActualClaimAmtSUM = 0;
  let ITCClaimSUM = 0;
  let ActualITCClaimSUM = 0;
  let myTempData = [];
  let myTemp2Arr = [];
  assetArray.forEach((el, index) => {
    let myTempArr = [];
    myTempArr.push(index + 1);
    let myTempDate = formatMyDate(el.purchaseDate);
    myTempArr.push(myTempDate);
    myTempDate = formatMyDate(el.claimDate);
    myTempArr.push(myTempDate);
    myTempArr.push(el.description);
    myTempArr.push(formatNumber(el.startValue.toFixed(2)));
    myTempArr.push(el.busPercent.toFixed(2));
    myTempArr.push(formatNumber(el.claimAmt.toFixed(2)));
    myTempArr.push(formatNumber((el.claimAmt * el.busPercent / 100).toFixed(2)));
    myTempArr.push(formatNumber(el.itcClaimAmt.toFixed(2)));
    myTempArr.push(formatNumber((el.itcClaimAmt * el.busPercent / 100).toFixed(2)));

    ClaimAmtSUM += el.claimAmt;
    ActualClaimAmtSUM += el.claimAmt * el.busPercent / 100;
    ITCClaimSUM += el.itcClaimAmt;
    ActualITCClaimSUM += el.itcClaimAmt * el.busPercent / 100;

    myTempData.push(myTempArr);

  });
  myTemp2Arr.push('');
  myTemp2Arr.push('');
  myTemp2Arr.push('');
  myTemp2Arr.push('');
  myTemp2Arr.push('');
  myTemp2Arr.push('Totals:');
  myTemp2Arr.push(formatNumber(ClaimAmtSUM.toFixed(2)));
  myTemp2Arr.push(formatNumber(ActualClaimAmtSUM.toFixed(2)));
  myTemp2Arr.push(formatNumber(ITCClaimSUM.toFixed(2)));
  myTemp2Arr.push(formatNumber(ActualITCClaimSUM.toFixed(2)));

  myTempData.push(myTemp2Arr);

  return myTempData;
}


function generateAssetTablePDF(expGroup) {
  let headText;
  let fileSaveText;
  let myTempDate = getTodaysDate();
  let data = arrOfAssetObjectToArrOfArrays();
  let columns = ["  #  ", "Date Added", "Claim Date", "Description", "Asset Value", "Business %", "Depreciation Claim", "Actual Depreciation Claim", "ITC Claim", "Actual ITC Claim"];
  let doc = new jsPDF('l', 'px', 'letter', true);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);


  headText = `${assetArray.length} Fixed Assets. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
  fileSaveText = `Fixed Assets(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;



  doc.text(headText, 34, 22);
  // if (data.column.dataKey === 'NET' || data.column.dataKey === 'HST' || data.column.dataKey === 'PST' || data.column.dataKey === 'TOTAL') {
  //   cell.styles.halign = 'right';
  // }
  doc.autoTable(columns, data, {
    tableWidth: 'auto',
    columnWidth: 'auto',
    styles: { cellPadding: 1, fontSize: 6.7 },
    createdHeaderCell: function (cell, data) {
      alignAssetCol(cell, data, true);
    },
    createdCell: function (cell, data) {
      alignAssetCol(cell, data, false);
    }
  });

  doc.save(fileSaveText);

}

function alignAssetCol(cell, data, isHeader) {
  var col = data.column.index;
  var row = data.row.index;
  if (col < 4) {
    cell.styles.halign = 'center';
  } else {
    cell.styles.halign = 'right';
  }
  if (row === assetArray.length) {
    cell.styles.fontStyle = 'bold';
  }
  if (isHeader) {
    cell.styles.fillColor = [100, 100, 100];
    cell.styles.setTextColor = [255, 255, 255];
  }
}

function getAssetToEdit(lnk) {
  let myID = lnk.getAttribute("id");
  let selectRowArr = myID.split("-");
  let selectRow = selectRowArr[1];
  selectedRowNum = selectRow;
  let myPaymentAmt = 0;

  displayAssetModal();

  let myTempID = assetArray[selectRow]._id;
  let myClaimDate = new Date(assetArray[selectRow].claimDate);
  let myDay = myClaimDate.getUTCDate();
  let myMonth = myClaimDate.getUTCMonth() + 1;
  let myYear = myClaimDate.getUTCFullYear();
  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  if (new Date(dbMiscData.lockDate) >= myClaimDate) {
    savedTransactionLocked = true;
    alert('Because the Claim Date is on or before the Lock Date, you will not be allowed to save any changes to it!');
  };

  myDOMs.FixedAssets.Claim_Date.value = myYear + "-" + myMonth + "-" + myDay;

  myClaimDate = new Date(assetArray[selectRow].purchaseDate);
  myDay = myClaimDate.getUTCDate();
  myMonth = myClaimDate.getUTCMonth() + 1;
  myYear = myClaimDate.getUTCFullYear();
  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  myDOMs.FixedAssets.Purchase_Date.value = myYear + "-" + myMonth + "-" + myDay;
  myDOMs.FixedAssets.Description.value = assetArray[selectRow].description;
  myDOMs.FixedAssets.Start_Value.value = formatNumber(assetArray[selectRow].startValue.toFixed(2));
  myDOMs.FixedAssets.Business_Percent.value = assetArray[selectRow].busPercent.toFixed(2);
  myDOMs.FixedAssets.Depreciation_Claim.value = formatNumber(assetArray[selectRow].claimAmt.toFixed(2));
  myDOMs.FixedAssets.ITC_Claim.value = formatNumber(assetArray[selectRow].itcClaimAmt.toFixed(2));
  myDOMs.FixedAssets.Blind_ID.value = myTempID;
  myDOMs.FixedAssets.Status.value = 'SAVED';

  originalAsset.PurchaseDate = myYear + "-" + myMonth + "-" + myDay;
  originalAsset.ClaimDate = myDOMs.FixedAssets.Claim_Date.value;
  originalAsset.Description = assetArray[selectRow].description;
  originalAsset.StartValue = formatNumber(assetArray[selectRow].startValue.toFixed(2));
  originalAsset.BusPercent = assetArray[selectRow].busPercent.toFixed(2);
  originalAsset.ClaimAmt = formatNumber(assetArray[selectRow].claimAmt.toFixed(2));
  originalAsset.ITCClaimAmt = formatNumber(assetArray[selectRow].itcClaimAmt.toFixed(2));
  originalAsset.Status = 'SAVED';
  originalAsset.ID = myTempID;

};






