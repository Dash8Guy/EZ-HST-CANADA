//this variable holds the page that was current when the expense was deleted
let currPageOnDelete = 0;
//this variable is to true when user selects last page of table and it only has 1 expense.
//This will allow code to set above variable to current Page minus 1 if users deletes it and page no longer exists
let OneExpenseOnLastPage = false;
//This next string variable will hold the last sort order applied on the table. (ascDate-descDate-asc#-desc#)
let lastTableSortOrder = 'none';
function SortTable(el) {
  let displaySortText = document.getElementById('sortString');
  if (el.id === 'HeaderSort-#') {
    if (lastTableSortOrder !== 'asc#') {
      curTableArray.sort(function (a, b) {
        var titleA = a._id.toLowerCase(), titleB = b._id.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'asc#';
      displaySortText.textContent = `Sorted: Ascending as Entered.`;
    } else if (lastTableSortOrder === 'asc#') {
      curTableArray.sort(function (b, a) {
        var titleA = a._id.toLowerCase(), titleB = b._id.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'desc#';
      displaySortText.textContent = `Sorted: Descending as Entered.`;
    }

  } else if (el.id === 'HeaderSort-DATE') {
    if (lastTableSortOrder !== 'ascDate') {
      curTableArray.sort(function (a, b) {
        var dateA = new Date(a.carDate), dateB = new Date(b.carDate);
        return dateA - dateB;
      });
      lastTableSortOrder = 'ascDate';
      displaySortText.textContent = `Sorted: Ascending by Date.`;
    } else if (lastTableSortOrder === 'ascDate') {
      curTableArray.sort(function (b, a) {
        var dateA = new Date(a.carDate), dateB = new Date(b.carDate);
        return dateA - dateB;
      });
      lastTableSortOrder = 'descDate';
      displaySortText.textContent = `Sorted: Descending by Date.`;
    }

  } else if (el.id === 'HeaderSort-TOTAL') {
    if (lastTableSortOrder !== 'ascTotal') {
      curTableArray.sort(function (a, b) {
        var amtA = a.carTotalAmt, amtB = b.carTotalAmt;
        return amtA - amtB;
      });
      lastTableSortOrder = 'ascTotal';
      displaySortText.textContent = `Sorted: Ascending by Total.`;
    } else if (lastTableSortOrder === 'ascTotal') {
      curTableArray.sort(function (b, a) {
        var amtA = a.carTotalAmt, amtB = b.carTotalAmt;
        return amtA - amtB;
      });
      lastTableSortOrder = 'descTotal';
      displaySortText.textContent = `Sorted: Descending by Total.`;
    }

  } else if (el.id === 'HeaderSort-DESCRIPTION') {
    if (lastTableSortOrder !== 'ascDESCRIPTION') {
      curTableArray.sort(function (a, b) {
        var titleA = a.carDescription.toLowerCase(), titleB = b.carDescription.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'ascDESCRIPTION';
      displaySortText.textContent = `Sorted: Ascending by Description.`;
    } else if (lastTableSortOrder === 'ascDESCRIPTION') {
      curTableArray.sort(function (b, a) {
        var titleA = a.carDescription.toLowerCase(), titleB = b.carDescription.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'descDESCRIPTION';
      displaySortText.textContent = `Sorted: Descending by Description.`;
    }

  } else if (el.id === 'HeaderSort-SUPPLIER') {
    if (lastTableSortOrder !== 'ascSUPPLIER') {
      curTableArray.sort(function (a, b) {
        var titleA = a.vendorSelect.toLowerCase(), titleB = b.vendorSelect.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'ascSUPPLIER';
      displaySortText.textContent = `Sorted: Ascending by Supplier.`;
    } else if (lastTableSortOrder === 'ascSUPPLIER') {
      curTableArray.sort(function (b, a) {
        var titleA = a.vendorSelect.toLowerCase(), titleB = b.vendorSelect.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'descSUPPLIER';
      displaySortText.textContent = `Sorted: Descending by Supplier.`;
    }

  } else if (el.id === 'HeaderSort-CATEGORY') {
    if (lastTableSortOrder !== 'ascCATEGORY') {
      curTableArray.sort(function (a, b) {
        var titleA = a.carExpCatSelect.toLowerCase(), titleB = b.carExpCatSelect.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'ascCATEGORY';
      displaySortText.textContent = `Sorted: Ascending by Category.`;
    } else if (lastTableSortOrder === 'ascCATEGORY') {
      curTableArray.sort(function (b, a) {
        var titleA = a.carExpCatSelect.toLowerCase(), titleB = b.carExpCatSelect.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      lastTableSortOrder = 'descCATEGORY';
      displaySortText.textContent = `Sorted: Descending by Category.`;
    }

  } else if (el.id === 'HeaderSort-RECEIPT') {
    if (lastTableSortOrder !== 'ascRECEIPT') {
      curTableArray.sort(function (b, a) {
        var amtA = a.receiptPath, amtB = b.receiptPath;
        return amtA - amtB;
      });
      lastTableSortOrder = 'ascRECEIPT';
      displaySortText.textContent = `Sorted: Ascending by Receipt.`;
    } else if (lastTableSortOrder === 'ascRECEIPT') {
      curTableArray.sort(function (a, b) {
        var amtA = a.receiptPath, amtB = b.receiptPath;
        return amtA - amtB;
      });
      lastTableSortOrder = 'descRECEIPT';
      displaySortText.textContent = `Sorted: Descending by Receipt.`;
    }

  }

  // The remaining code applies the new order to all the array pages
  if (curTableArray.length > rowCountPerPageDefault) {
    let tempCount = Math.floor(curTableArray.length / rowCountPerPage);
    let tempArray = curTableArray;
    arrTablePage1 = tempArray.slice(0, rowCountPerPage);
    editTableArrays(tempArray, tempCount);
  } else {
    arrTablePage1 = curTableArray;
  }
  goToPage(currentTablePage);
}

let li;
let a;
let myStrongTag = document.createElement("p");
myStrongTag.setAttribute('class', 'float-left')
let sortString = document.createElement("p");
sortString.setAttribute('class', 'float-right')
let nav = document.createElement("nav");
let ul = document.createElement("ul");
ul.setAttribute(
  "class",
  "pagination pagination-warning pagination-sm justify-content-center"
);
nav.setAttribute("id", "navID");
let myTableAlert = document.createElement("div");
let tbl = document.createElement("table");
let responsiveDiv = document.createElement("div");

function buildVehicleExpenseTable(
  curAlertContainer,
  curAlertID,
  closeBtnID,
  boldText,
  alertType,
  dismissTime,
  myPage
) {
  // let myStrongTag = document.createElement("p");
  myTableAlert.setAttribute(
    "class",
    "alert alert-secondary alert-dismissible collapse"
  );
  myTableAlert.setAttribute("id", curAlertID);
  //Create the Table Header Row
  let myCarHeaders = [
    "#",
    "DATE",
    "NET",
    "HST",
    "PST",
    "TOTAL",
    "DESCRIPTION",
    "SUPPLIER",
    "CATEGORY",
    "RECEIPT"
  ];
  // creates a <table> element and a <tbody> element
  // let tbl = document.createElement("table");
  // let responsiveDiv = document.createElement("div");
  tbl.setAttribute("class", "table table-success table-sm table-hover table-striped");
  tbl.setAttribute("id", "expReportTable");
  responsiveDiv.setAttribute("class", "table-responsive");
  let tblHeader = document.createElement("tHead");
  tblHeader.setAttribute('id', 'tableHeader');
  let tblBody = document.createElement("tbody");

  //create row header
  let row = document.createElement("tr");
  //create header cells
  myCarHeaders.forEach((el, index) => {
    let cellh = document.createElement("th");
    let headerlink = document.createElement("a");
    let cellTexth = document.createTextNode(el);
    if (el !== 'NET' && el !== 'HST' && el !== 'PST') {
      headerlink.appendChild(cellTexth);
      headerlink.setAttribute("href", "#");
      headerlink.setAttribute("data-toggle", "tooltip");
      headerlink.setAttribute("title", `Click to Sort by ${el}`);
      headerlink.setAttribute("onclick", "SortTable(this);");
      headerlink.setAttribute("id", `HeaderSort-${el}`);
      cellh.appendChild(headerlink);
      row.appendChild(cellh);
      cellh.setAttribute("class", "text-center bg-white border border-dark");
      // if (el === '#') {
      //   cellh.setAttribute("id", `headerSortCellNum`);
      // } else {
      //   cellh.setAttribute("id", `headerSortCell${el}`);
      // }

    } else {
      cellh.appendChild(cellTexth);
      row.appendChild(cellh);
      cellh.setAttribute("class", "text-center thead-dark");
    }


  });

  //Header now complete, append it to the Table Header
  tblHeader.appendChild(row);

  // creating a row ////////////////////////

  if (curTableArray.length > rowCountPerPageDefault) {
    let tempCountforalert = Math.ceil(
      curTableArray.length / rowCountPerPageDefault
    );

    if (curTableArray.length > rowCountPerPageDefault * 24) {
      alert(
        `This Application can display up to 24 pages of expenses, but with only ${rowCountPerPageDefault} items per page, ${
        curTableArray.length
        } expenses will create ${tempCountforalert} pages! The system will now move up to the next highest level of expenses per page.`
      );
      if ((rowCountPerPage = 10)) {
        rowCountPerPage = 25;
      } else if ((rowCountPerPage = 25)) {
        rowCountPerPage = 50;
      } else if ((rowCountPerPage = 50)) {
        rowCountPerPage = 100;
      } else if ((rowCountPerPage = 100)) {
        rowCountPerPage = 500;
      }
    }

    let tempCount = Math.floor(curTableArray.length / rowCountPerPage);
    let tempArray = curTableArray;
    arrTablePage1 = tempArray.slice(0, rowCountPerPage);
    editTableArrays(tempArray, tempCount);
  } else {
    arrTablePage1 = curTableArray;
  }
  for (i = 0; i < arrTablePage1.length; i++) {
    // creates a table row
    let row = document.createElement("tr");
    row.setAttribute("id", `row${i}`);

    let cell = document.createElement("td");
    let alink = document.createElement("a");
    let cellTxt = document.createTextNode(i + 1);
    alink.appendChild(cellTxt);
    alink.setAttribute("href", "#");
    alink.setAttribute("data-toggle", "tooltip");
    alink.setAttribute("title", "Click to View/Edit this expense");
    alink.setAttribute("onclick", "getExpenseToEdit(this);");
    alink.setAttribute("id", `cellNumber-${i}`);
    cell.appendChild(alink);
    cell.setAttribute("class", "text-center");
    //cell.setAttribute("id", `cellNumber${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    myDate = new Date(arrTablePage1[i].carDate);
    tempDate = myDate.toLocaleDateString();
    cellTxt = document.createTextNode(tempDate);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-center");
    cell.setAttribute("id", `cellDate${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${arrTablePage1[i].carnetAmt.toFixed(2)}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right");
    cell.setAttribute("id", `cellNetAmt${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${arrTablePage1[i].carhstAmt.toFixed(2)}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right");
    cell.setAttribute("id", `cellHstAmt${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${arrTablePage1[i].carpstAmt.toFixed(2)}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right");
    cell.setAttribute("id", `cellPstAmt${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${arrTablePage1[i].carTotalAmt.toFixed(2)}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right");
    cell.setAttribute("id", `cellTotalAmt${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(arrTablePage1[i].carDescription);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-center");
    cell.setAttribute("id", `cellDescription${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(arrTablePage1[i].vendorSelect);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-center");
    cell.setAttribute("id", `cellVendor${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(arrTablePage1[i].carExpCatSelect);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-sm-center");
    cell.setAttribute("id", `cellCategory${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(arrTablePage1[i].receiptPath);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-sm-center");
    cell.setAttribute("id", `cellReceipt${i}`);
    row.appendChild(cell);

    // add the row to the end of the table body
    tblBody.appendChild(row);

  };

  addTotalsRow();
  function addTotalsRow() {
    let row = document.createElement("tr");
    row.setAttribute("id", `row${rowCountPerPage + 1}`);

    let cell = document.createElement("td");
    let cellTxt = document.createTextNode('');

    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-center");
    //cell.setAttribute("id", `cellNumber${i}`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode('Totals:');
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right font-weight-bold");
    cell.setAttribute("id", `cellTotals`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${formatNumber(Number(myReportTotal.totalNet).toFixed(2))}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right font-weight-bold");
    cell.setAttribute("id", `cellNetTotal`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${formatNumber(Number(myReportTotal.totalHST).toFixed(2))}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right font-weight-bold");
    cell.setAttribute("id", `cellHstTotal`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${formatNumber(Number(myReportTotal.totalPST).toFixed(2))}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right font-weight-bold");
    cell.setAttribute("id", `cellPstTotal`);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellTxt = document.createTextNode(`$${(formatNumber(Number(myReportTotal.totalNet + myReportTotal.totalHST + myReportTotal.totalPST).toFixed(2)))}`);
    cell.appendChild(cellTxt);
    cell.setAttribute("class", "text-right font-weight-bold");
    cell.setAttribute("id", `cellGrandTotalAmt`);
    row.appendChild(cell);

    tblBody.appendChild(row);
  }


  // put the <tbody> in the <table>
  tbl.appendChild(tblHeader);
  tbl.appendChild(tblBody);
  if (responsiveDiv.hasChildNodes()) {
    while (responsiveDiv.firstChild) {
      responsiveDiv.removeChild(responsiveDiv.firstChild);
    }
  }
  responsiveDiv.appendChild(tbl);

  currentTablePage = 1;

  //Verify if Table Array is more than Amount per Page and if so, add pagination
  if (curTableArray.length > rowCountPerPage) {
    addPagination();
  }

  let myPDFBtn = document.createElement("button");
  myPDFBtn.setAttribute("class", "btn btn-sm btn-outline-secondary float-right mr-4");
  myPDFBtn.setAttribute("id", 'printPDFBtn');
  myPDFBtn.setAttribute("data-toogle", "tooltip");
  myPDFBtn.setAttribute("title", "Save Table as a PDF!");
  if (boldText.includes('Business Expenses')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('Bus-Exp')");
  } else if (boldText.includes('Vehicle-1')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('V1-Exp')");
  } else if (boldText.includes('Vehicle-2')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('V2-Exp')");
  } else if (boldText.includes('Home')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('Home-Exp')");
  } else if (boldText.includes('Other')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('Other-Exp')");
  } else if (boldText.includes('Rental Expenses')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('Rental-Exp')");
  } else if (boldText.includes('Business Revenue')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('Bus-Inc')");
  } else if (boldText.includes('Rental Revenue')) {
    myPDFBtn.setAttribute("onclick", "generateTablePDF('Rental-Inc')");
  }

  let myPDFBtnText = document.createTextNode("Print PDF");
  myPDFBtn.appendChild(myPDFBtnText);

  let myBtn = document.createElement("button");
  myBtn.setAttribute("class", "close");
  myBtn.setAttribute("id", closeBtnID);
  myBtn.setAttribute("data-toogle", "tooltip");
  myBtn.setAttribute("title", "Close Table!");
  myBtn.setAttribute("onclick", "hideTableAlert()");

  let btnText = document.createTextNode("x");
  myBtn.appendChild(btnText);

  //If more than rowCountPerPage expenses append nav for the pagination
  appendNav(curTableArray.length);

  addTitleText(myTableAlert, boldText);
  sortString.setAttribute("id", "sortString");
  sortString.textContent = `Sorted: As entered.`;
  myTableAlert.appendChild(sortString);

  myTableAlert.appendChild(myPDFBtn);
  myTableAlert.appendChild(myBtn);
  myTableAlert.appendChild(responsiveDiv);
  myDOMs.main.AlertContainer.appendChild(myTableAlert);

  $(`#${curAlertID}`).show("fade");

  if (myPage > 0) {
    moveToOriginalPage(myPage);
  } else {
    goToPage(1);
  }

  if (dismissTime === 0) {
  } else {
    setTimeout(function () {
      $(`#${curAlertID}`).hide("fade");
    }, dismissTime);
  }

  resetText(boldText);
}

function resetText(myText) {
  document.getElementById("titleNode").textContent = `${myText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
}

function addTitleText(myTableAlert, boldText) {
  // let myStrongTag = document.createElement("p");

  myStrongTag.setAttribute("id", "titleNode");
  myStrongTag.textContent = `${boldText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
  myTableAlert.appendChild(myStrongTag);
}

function addPagination() {
  // let ul = document.createElement("ul");

  currentTablePages = Math.ceil(curTableArray.length / rowCountPerPage);

  for (i = 0; i <= currentTablePages + 1; i++) {
    li = document.createElement("li");
    a = document.createElement("a");

    if (i === 0) {
      mytxt = document.createTextNode("Previous");
      a.appendChild(mytxt);
      a.setAttribute("class", "page-link");
      a.setAttribute("id", "pagePrevious");
      a.setAttribute("href", "#");
      a.setAttribute("onclick", `goToPagePrevious()`);
      li.appendChild(a);
      li.setAttribute("class", "page-item disabled");
      li.setAttribute("id", "pageBtnPrevious");
      ul.appendChild(li);
    }

    if (i === currentTablePages + 1) {
      mytxt = document.createTextNode("Next");
      a.appendChild(mytxt);
      a.setAttribute("class", "page-link");
      a.setAttribute("id", "pageNext");
      a.setAttribute("href", "#");
      a.setAttribute("onclick", `goToPageNext()`);
      li.appendChild(a);
      li.setAttribute("class", "page-item");
      li.setAttribute("id", "pageBtnNext");
      ul.appendChild(li);
    }

    if (i === 0 || i === currentTablePages + 1) {
    } else {
      mytxt = document.createTextNode(i);
      a.appendChild(mytxt);
      a.setAttribute("class", "page-link");
      a.setAttribute("id", `page${i}`);
      a.setAttribute("href", "#");
      // if (i === 1) {
      //   a.setAttribute("onclick", `goToPage1()`);
      // } else {
      a.setAttribute("onclick", `goToPage(${i})`);
      // }

      li.appendChild(a);
      if (i === 1) {
        li.setAttribute("class", "page-item active");
      } else {
        li.setAttribute("class", "page-item");
      }
      li.setAttribute("id", `pageBtn${i}`);
      ul.appendChild(li);
    }
  }

  nav.appendChild(ul);
}

function appendNav(arrLength) {
  if (arrLength > rowCountPerPage) {
    myTableAlert.appendChild(nav);
  }
}

function editTableArrays(tempArray, tempCount) {
  switch (rowCountPerPage) {
    case 10:
      for (i = 1; i <= tempCount; i++) {
        arrTablePage2 = tempArray.slice(10, 20);
        arrTablePage3 = tempArray.slice(20, 30);
        arrTablePage4 = tempArray.slice(30, 40);
        arrTablePage5 = tempArray.slice(40, 50);
        arrTablePage6 = tempArray.slice(50, 60);
        arrTablePage7 = tempArray.slice(60, 70);
        arrTablePage8 = tempArray.slice(70, 80);
        arrTablePage9 = tempArray.slice(80, 90);
        arrTablePage10 = tempArray.slice(90, 100);
        arrTablePage11 = tempArray.slice(100, 110);
        arrTablePage12 = tempArray.slice(110, 120);
        arrTablePage13 = tempArray.slice(120, 130);
        arrTablePage14 = tempArray.slice(130, 140);
        arrTablePage15 = tempArray.slice(140, 150);
        arrTablePage16 = tempArray.slice(150, 160);
        arrTablePage17 = tempArray.slice(160, 170);
        arrTablePage18 = tempArray.slice(170, 180);
        arrTablePage19 = tempArray.slice(180, 190);
        arrTablePage20 = tempArray.slice(190, 200);
        arrTablePage21 = tempArray.slice(200, 210);
        arrTablePage22 = tempArray.slice(210, 220);
        arrTablePage23 = tempArray.slice(220, 230);
        arrTablePage24 = tempArray.slice(230, 240);
      }
      break;

    case 25:
      for (i = 1; i <= tempCount; i++) {
        arrTablePage2 = tempArray.slice(25, 50);
        arrTablePage3 = tempArray.slice(50, 75);
        arrTablePage4 = tempArray.slice(75, 100);
        arrTablePage5 = tempArray.slice(100, 125);
        arrTablePage6 = tempArray.slice(125, 150);
        arrTablePage7 = tempArray.slice(150, 175);
        arrTablePage8 = tempArray.slice(175, 200);
        arrTablePage9 = tempArray.slice(200, 225);
        arrTablePage10 = tempArray.slice(225, 250);
        arrTablePage11 = tempArray.slice(250, 275);
        arrTablePage12 = tempArray.slice(275, 300);
        arrTablePage13 = tempArray.slice(300, 325);
        arrTablePage14 = tempArray.slice(325, 350);
        arrTablePage15 = tempArray.slice(350, 375);
        arrTablePage16 = tempArray.slice(375, 400);
        arrTablePage17 = tempArray.slice(400, 425);
        arrTablePage18 = tempArray.slice(425, 450);
        arrTablePage19 = tempArray.slice(450, 475);
        arrTablePage20 = tempArray.slice(475, 500);
        arrTablePage21 = tempArray.slice(500, 525);
        arrTablePage22 = tempArray.slice(525, 550);
        arrTablePage23 = tempArray.slice(550, 575);
        arrTablePage24 = tempArray.slice(575, 600);
      }
      break;

    case 50:
      for (i = 1; i <= tempCount; i++) {
        arrTablePage2 = tempArray.slice(50, 100);
        arrTablePage3 = tempArray.slice(100, 150);
        arrTablePage4 = tempArray.slice(150, 200);
        arrTablePage5 = tempArray.slice(200, 250);
        arrTablePage6 = tempArray.slice(250, 300);
        arrTablePage7 = tempArray.slice(300, 350);
        arrTablePage8 = tempArray.slice(350, 400);
        arrTablePage9 = tempArray.slice(400, 450);
        arrTablePage10 = tempArray.slice(450, 500);
        arrTablePage11 = tempArray.slice(500, 550);
        arrTablePage12 = tempArray.slice(550, 600);
        arrTablePage13 = tempArray.slice(600, 650);
        arrTablePage14 = tempArray.slice(650, 700);
        arrTablePage15 = tempArray.slice(700, 750);
        arrTablePage16 = tempArray.slice(750, 800);
        arrTablePage17 = tempArray.slice(800, 850);
        arrTablePage18 = tempArray.slice(850, 900);
        arrTablePage19 = tempArray.slice(900, 950);
        arrTablePage20 = tempArray.slice(950, 1000);
        arrTablePage21 = tempArray.slice(1000, 1050);
        arrTablePage22 = tempArray.slice(1050, 1100);
        arrTablePage23 = tempArray.slice(1100, 1150);
        arrTablePage24 = tempArray.slice(1150, 1200);
      }
      break;
    case 100:
      for (i = 1; i <= tempCount; i++) {
        arrTablePage2 = tempArray.slice(100, 200);
        arrTablePage3 = tempArray.slice(200, 300);
        arrTablePage4 = tempArray.slice(300, 400);
        arrTablePage5 = tempArray.slice(400, 500);
        arrTablePage6 = tempArray.slice(500, 600);
        arrTablePage7 = tempArray.slice(600, 700);
        arrTablePage8 = tempArray.slice(700, 800);
        arrTablePage9 = tempArray.slice(800, 900);
        arrTablePage10 = tempArray.slice(900, 1000);
        arrTablePage11 = tempArray.slice(1000, 1100);
        arrTablePage12 = tempArray.slice(1100, 1200);
        arrTablePage13 = tempArray.slice(1200, 1300);
        arrTablePage14 = tempArray.slice(1300, 1400);
        arrTablePage15 = tempArray.slice(1400, 1500);
        arrTablePage16 = tempArray.slice(1500, 1600);
        arrTablePage17 = tempArray.slice(1600, 1700);
        arrTablePage18 = tempArray.slice(1700, 1800);
        arrTablePage19 = tempArray.slice(1800, 1900);
        arrTablePage20 = tempArray.slice(1900, 2000);
        arrTablePage21 = tempArray.slice(2000, 2100);
        arrTablePage22 = tempArray.slice(2100, 2200);
        arrTablePage23 = tempArray.slice(2200, 2300);
        arrTablePage24 = tempArray.slice(2300, 2400);
      }
      break;
    case 500:
      for (i = 1; i <= tempCount; i++) {
        arrTablePage2 = tempArray.slice(500, 1000);
        arrTablePage3 = tempArray.slice(1000, 1500);
        arrTablePage4 = tempArray.slice(1500, 2000);
        arrTablePage5 = tempArray.slice(2000, 2500);
        arrTablePage6 = tempArray.slice(2500, 3000);
        arrTablePage7 = tempArray.slice(3000, 3500);
        arrTablePage8 = tempArray.slice(3500, 4000);
        arrTablePage9 = tempArray.slice(4000, 4500);
        arrTablePage10 = tempArray.slice(4500, 5000);
        arrTablePage11 = tempArray.slice(5000, 5500);
        arrTablePage12 = tempArray.slice(5500, 6000);
        arrTablePage13 = tempArray.slice(6000, 6500);
        arrTablePage14 = tempArray.slice(6500, 7000);
        arrTablePage15 = tempArray.slice(7000, 7500);
        arrTablePage16 = tempArray.slice(7500, 8000);
        arrTablePage17 = tempArray.slice(8000, 8500);
        arrTablePage18 = tempArray.slice(8500, 9000);
        arrTablePage19 = tempArray.slice(9000, 9500);
        arrTablePage20 = tempArray.slice(9500, 10000);
        arrTablePage21 = tempArray.slice(10000, 10500);
        arrTablePage22 = tempArray.slice(10500, 11000);
        arrTablePage23 = tempArray.slice(11000, 11500);
        arrTablePage24 = tempArray.slice(11500, 12000);
      }
  }
}
