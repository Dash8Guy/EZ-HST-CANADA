
//this 2 variable holds the array number and row number selected when user clicks on Table link to open expense to edit
//it is used to fetch the value of the image when user updates expense with receipt image and the image was already saved but
// it is not in the file input field.
let selectedArrayNum = 0;
let selectedRowNum = 0;
//This variable is used to stop user from making changes when opening expense/income that is date on or before the Lock Date
let savedTransactionLocked = false;

let curTableArray = [];
let arrTablePage1 = [];
let arrTablePage2 = [];
let arrTablePage3 = [];
let arrTablePage4 = [];
let arrTablePage5 = [];
let arrTablePage6 = [];
let arrTablePage7 = [];
let arrTablePage8 = [];
let arrTablePage9 = [];
let arrTablePage10 = [];
let arrTablePage11 = [];
let arrTablePage12 = [];
let arrTablePage13 = [];
let arrTablePage14 = [];
let arrTablePage15 = [];
let arrTablePage16 = [];
let arrTablePage17 = [];
let arrTablePage18 = [];
let arrTablePage19 = [];
let arrTablePage20 = [];
let arrTablePage21 = [];
let arrTablePage22 = [];
let arrTablePage23 = [];
let arrTablePage24 = [];
//This variable will hold the Total Net, HST and PST for the Report Table being opened and is filled when Opening from Income Statement.
let myReportTotal = {
  totalNet: 0,
  totalHST: 0,
  totalPST: 0,
  category: '',
  categoryFull: ''
}
//This variable will hold the Total Net, HST and PST for the Report Table being opened and is filled when Opening from Income Statement.
let myPaymentReportTotal = {
  totalTax: 0,
  totalHST: 0,
  totalPST: 0,
  category: '',
  categoryFull: ''
}

//This variable will hold the Total Claim, ITCClaim, ActualClaim and ActualITCClaim for the Report Table being opened and is filled when opening Asset Table.
let myAssetReportTotal = {
  claimAmt: 0,
  ITCClaimAmt: 0,
  ActualclaimAmt: 0,
  ActualITCClaimAmt: 0
}
//This Variable is set to true when Table is opened and false when close and is used to stop the UpdateTableTotals from running when adding expenses or income.
let TableOpen = false;

//This Boolean is set to true when opening report table from Income Statement so that after closing the Report Table, the Income Statement opens.
let reOpenIncomeStatement = false;


//this variable is used to store the amount of rows that where displayed in the last report page and is used to hide the remaining
let lastReportPageRowCount = 0;
//this variable keeps track of the current page when Report is viewed
let currentTablePage = 0;
//this variable keeps track of the total number of pages in a report
let currentTablePages = 0;

function goToPageNext() {
  if (currentTablePage < currentTablePages) {
    switch (currentTablePage + 1) {
      case 2:
        goToPage(2);
        break;
      case 3:
        goToPage(3);
        break;
      case 4:
        goToPage(4);
        break;
      case 5:
        goToPage(5);
        break;
      case 6:
        goToPage(6);
        break;
      case 7:
        goToPage(7);
        break;
      case 8:
        goToPage(8);
        break;
      case 9:
        goToPage(9);
        break;
      case 10:
        goToPage(10);
        break;
      case 11:
        goToPage(11);
        break;
      case 12:
        goToPage(12);
        break;
      case 13:
        goToPage(13);
        break;
      case 14:
        goToPage(14);
        break;
      case 15:
        goToPage(15);
        break;
      case 16:
        goToPage(16);
        break;
      case 17:
        goToPage(17);
        break;
      case 18:
        goToPage(18);
        break;
      case 19:
        goToPage(19);
        break;
      case 20:
        goToPage(20);
        break;
      case 21:
        goToPage(21);
        break;
      case 22:
        goToPage(22);
        break;
      case 23:
        goToPage(23);
        break;
      case 24:
        goToPage(24);
    }
  }
}

function goToPagePrevious() {
  if (currentTablePage > 1) {
    switch (currentTablePage - 1) {
      case 1:
        goToPage(1);
        break;
      case 2:
        goToPage(2);
        break;
      case 3:
        goToPage(3);
        break;
      case 4:
        goToPage(4);
        break;
      case 5:
        goToPage(5);
        break;
      case 6:
        goToPage(6);
        break;
      case 7:
        goToPage(7);
        break;
      case 8:
        goToPage(8);
        break;
      case 9:
        goToPage(9);
        break;
      case 10:
        goToPage(10);
        break;
      case 11:
        goToPage(11);
        break;
      case 12:
        goToPage(12);
        break;
      case 13:
        goToPage(13);
        break;
      case 14:
        goToPage(14);
        break;
      case 15:
        goToPage(15);
        break;
      case 16:
        goToPage(16);
        break;
      case 17:
        goToPage(17);
        break;
      case 18:
        goToPage(18);
        break;
      case 19:
        goToPage(19);
        break;
      case 20:
        goToPage(20);
        break;
      case 21:
        goToPage(21);
        break;
      case 22:
        goToPage(22);
        break;
      case 23:
        goToPage(23);
        break;
      case 24:
        goToPage(24);
    }
  }
}

function goToPage(page) {
  lastReportPageRowCount = 0;
  unHideRows();
  emptyTableCells();
  let myTempArray = getRequestedArray(page);
  let startingCountPerPage10 = 10 * (page - 1) + 1;
  let startingCountPerPage25 = 25 * (page - 1) + 1;
  let startingCountPerPage50 = 50 * (page - 1) + 1;
  let startingCountPerPage100 = 100 * (page - 1) + 1;
  let startingCountPerPage500 = 500 * (page - 1) + 1;
  myTempArray.forEach(function (el, index) {
    lastReportPageRowCount = index;

    switch (rowCountPerPage) {
      case 10:
        document.getElementById(`cellNumber-${index}`).innerHTML =
          index + startingCountPerPage10;
        break;
      case 25:
        document.getElementById(`cellNumber-${index}`).innerHTML =
          index + startingCountPerPage25;
        break;
      case 50:
        document.getElementById(`cellNumber-${index}`).innerHTML =
          index + startingCountPerPage50;
        break;
      case 100:
        document.getElementById(`cellNumber-${index}`).innerHTML =
          index + startingCountPerPage100;
        break;
      case 500:
        document.getElementById(`cellNumber-${index}`).innerHTML =
          index + startingCountPerPage500;

    }

    myDate = new Date(el.carDate);
    let myDay = myDate.getUTCDate();
    let myMonth = myDate.getUTCMonth() + 1;
    let myYear = myDate.getUTCFullYear();
    if (myDay < 10) {
      myDay = `0${myDay}`;
    }
    if (myMonth < 10) {
      myMonth = `0${myMonth}`;
    }
    let tempStringDate = `${myMonth}-${myDay}-${myYear}`;

    document.getElementById(`cellDate${index}`).innerHTML = tempStringDate;
    document.getElementById(
      `cellNetAmt${index}`
    ).innerHTML = `$${formatNumber(el.carnetAmt.toFixed(2))}`;
    document.getElementById(
      `cellHstAmt${index}`
    ).innerHTML = `$${formatNumber(el.carhstAmt.toFixed(2))}`;
    document.getElementById(
      `cellPstAmt${index}`
    ).innerHTML = `$${formatNumber(el.carpstAmt.toFixed(2))}`;
    document.getElementById(
      `cellTotalAmt${index}`
    ).innerHTML = `$${formatNumber(el.carTotalAmt.toFixed(2))}`;
    document.getElementById(`cellDescription${index}`).innerHTML =
      el.carDescription;
    document.getElementById(`cellVendor${index}`).innerHTML = el.vendorSelect;
    document.getElementById(`cellCategory${index}`).innerHTML =
      el.carExpCatSelect;
    document.getElementById(`cellReceipt${index}`).innerHTML = el.receiptPath;
  });
  if ($(`#pageBtn${page}`).hasClass("active")) {
  } else {
    $(`#pageBtn${page}`).addClass("active");
  }
  if (page === 1) {
    if ($("#pageBtnPrevious").hasClass("disabled")) {
    } else {
      $("#pageBtnPrevious").addClass("disabled");
    }
  } else {
    if ($("#pageBtnPrevious").hasClass("disabled")) {
      $("#pageBtnPrevious").removeClass("disabled");
    }
  }

  if (currentTablePages === page) {
    if ($("#pageBtnNext").hasClass("disabled")) {
    } else {
      document.getElementById("pageBtnNext").classList.add("disabled");
    }
  } else if (currentTablePages > page) {
    if ($("#pageBtnNext").hasClass("disabled")) {
      document.getElementById("pageBtnNext").classList.remove("disabled");
    }
  }
  currentTablePage = page;
  removeActiveClass(page);
  if (myTempArray.length < rowCountPerPage) {
    hideRows(lastReportPageRowCount);
    if (myTempArray.length === 1) {
      OneExpenseOnLastPage = true;
    } else {
      OneExpenseOnLastPage = false;
    }
  }

  if (currentTablePage === currentTablePages || currentTablePages === 0) {
    displayTotalsRow();
  } else {
    hideTotalsRow();
  }
}

function hideTotalsRow() {
  if (document.getElementById(`row${rowCountPerPage + 1}`).classList.contains('d-none')) {
  } else {
    document.getElementById(`row${rowCountPerPage + 1}`).classList.add('d-none');
  }
}

function displayTotalsRow() {
  if (document.getElementById(`row${rowCountPerPage + 1}`).classList.contains('d-none')) {
    document.getElementById(`row${rowCountPerPage + 1}`).classList.remove('d-none');
  }
}

function removeActiveClass(noRemovePage) {
  if ($("#pageBtn1").hasClass("active") && noRemovePage !== 1) {
    document.getElementById("pageBtn1").classList.remove("active");
  }
  if ($("#pageBtn2").hasClass("active") && noRemovePage !== 2) {
    document.getElementById("pageBtn2").classList.remove("active");
  }
  if ($("#pageBtn3").hasClass("active") && noRemovePage !== 3) {
    document.getElementById("pageBtn3").classList.remove("active");
  }
  if ($("#pageBtn4").hasClass("active") && noRemovePage !== 4) {
    document.getElementById("pageBtn4").classList.remove("active");
  }
  if ($("#pageBtn5").hasClass("active") && noRemovePage !== 5) {
    document.getElementById("pageBtn5").classList.remove("active");
  }
  if ($("#pageBtn6").hasClass("active") && noRemovePage !== 6) {
    document.getElementById("pageBtn6").classList.remove("active");
  }
  if ($("#pageBtn7").hasClass("active") && noRemovePage !== 7) {
    document.getElementById("pageBtn7").classList.remove("active");
  }
  if ($("#pageBtn8").hasClass("active") && noRemovePage !== 8) {
    document.getElementById("pageBtn8").classList.remove("active");
  }
  if ($("#pageBtn9").hasClass("active") && noRemovePage !== 9) {
    document.getElementById("pageBtn9").classList.remove("active");
  }
  if ($("#pageBtn10").hasClass("active") && noRemovePage !== 10) {
    document.getElementById("pageBtn10").classList.remove("active");
  }
  if ($("#pageBtn11").hasClass("active") && noRemovePage !== 11) {
    document.getElementById("pageBtn11").classList.remove("active");
  }
  if ($("#pageBtn12").hasClass("active") && noRemovePage !== 12) {
    document.getElementById("pageBtn12").classList.remove("active");
  }
  if ($("#pageBtn13").hasClass("active") && noRemovePage !== 13) {
    document.getElementById("pageBtn13").classList.remove("active");
  }
  if ($("#pageBtn14").hasClass("active") && noRemovePage !== 14) {
    document.getElementById("pageBtn14").classList.remove("active");
  }
  if ($("#pageBtn15").hasClass("active") && noRemovePage !== 15) {
    document.getElementById("pageBtn15").classList.remove("active");
  }
  if ($("#pageBtn16").hasClass("active") && noRemovePage !== 16) {
    document.getElementById("pageBtn16").classList.remove("active");
  }
  if ($("#pageBtn17").hasClass("active") && noRemovePage !== 17) {
    document.getElementById("pageBtn17").classList.remove("active");
  }
  if ($("#pageBtn18").hasClass("active") && noRemovePage !== 18) {
    document.getElementById("pageBtn18").classList.remove("active");
  }
  if ($("#pageBtn19").hasClass("active") && noRemovePage !== 19) {
    document.getElementById("pageBtn19").classList.remove("active");
  }
  if ($("#pageBtn20").hasClass("active") && noRemovePage !== 20) {
    document.getElementById("pageBtn20").classList.remove("active");
  }
  if ($("#pageBtn21").hasClass("active") && noRemovePage !== 21) {
    document.getElementById("pageBtn21").classList.remove("active");
  }
  if ($("#pageBtn22").hasClass("active") && noRemovePage !== 22) {
    document.getElementById("pageBtn22").classList.remove("active");
  }
  if ($("#pageBtn23").hasClass("active") && noRemovePage !== 23) {
    document.getElementById("pageBtn23").classList.remove("active");
  }
  if ($("#pageBtn24").hasClass("active") && noRemovePage !== 24) {
    document.getElementById("pageBtn24").classList.remove("active");
  }
  limitPageDisplayed();
}
function hideRows(rowCount) {
  switch (rowCountPerPage) {
    case 10:
      for (i = 9; i > rowCount; i--) {
        if (document.getElementById(`row${i}`) !== null) {
          document.getElementById(`row${i}`).style.display = "none";
        }
      }
      break;
    case 25:
      for (i = 24; i > rowCount; i--) {
        if (document.getElementById(`row${i}`) !== null) {
          document.getElementById(`row${i}`).style.display = "none";
        }
      }
      break;
    case 50:
      for (i = 49; i > rowCount; i--) {
        if (document.getElementById(`row${i}`) !== null) {
          document.getElementById(`row${i}`).style.display = "none";
        }
      }
      break;
    case 100:
      for (i = 99; i > rowCount; i--) {
        if (document.getElementById(`row${i}`) !== null) {
          document.getElementById(`row${i}`).style.display = "none";
        }
      }
      break;
    case 500:
      for (i = 499; i > rowCount; i--) {
        if (document.getElementById(`row${i}`) !== null) {
          document.getElementById(`row${i}`).style.display = "none";
        }
      }
  }
}

function unHideRows() {
  for (i = 0; i < arrTablePage1.length; i++) {
    if (document.getElementById(`row${i}`) !== undefined) {
      document.getElementById(`row${i}`).style.display = "table-row";
    }
  }
}

function emptyTableCells() {
  let myArray = [];
  for (i = 1; i <= rowCountPerPage; i++) {
    myArray.push(i);
  }

  myArray.forEach(function (el, index) {
    if (document.getElementById(`cellNumber-${index}`) !== null) {
      document.getElementById(`cellNumber-${index}`).innerHTML = null;
      document.getElementById(`cellDate${index}`).innerHTML = null;
      document.getElementById(`cellNetAmt${index}`).innerHTML = null;
      document.getElementById(`cellHstAmt${index}`).innerHTML = null;
      document.getElementById(`cellPstAmt${index}`).innerHTML = null;
      document.getElementById(`cellTotalAmt${index}`).innerHTML = null;
      document.getElementById(`cellDescription${index}`).innerHTML = null;
      document.getElementById(`cellVendor${index}`).innerHTML = null;
      document.getElementById(`cellCategory${index}`).innerHTML = null;
      document.getElementById(`cellReceipt${index}`).innerHTML = null;
    }
  });
}

function limitPageDisplayed() {
  if (currentTablePages > 9) {
    let visibleCount = 0;
    switch (currentTablePage) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        for (i = 1; i < currentTablePages + 1; i++) {
          if (i < 10) {
            showPageDisplayValue(`pageBtn${i}`);
          } else if (i > 9) {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 6:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 11) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 7:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 12) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 8:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 13) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 9:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 14) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 10:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 15) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 11:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 16) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 12:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 17) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 13:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 18) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 14:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 19) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 15:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 20) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 16:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 21) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 17:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 22) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 18:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 23) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 19:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 24) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 20:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 25) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 21:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 25) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 22:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 25) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 23:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 25) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
        break;
      case 24:
        for (i = currentTablePages; i > 0; i--) {
          if (i < 25) {
            if (visibleCount < 9) {
              visibleCount = visibleCount + 1;
              showPageDisplayValue(`pageBtn${i}`);
            } else {
              hidePageDisplayValue(`pageBtn${i}`);
            }
          } else {
            hidePageDisplayValue(`pageBtn${i}`);
          }
        }
    }
  }
}

function hidePageDisplayValue(myPageBtn) {
  document.getElementById(myPageBtn).style.display = "none";
}

function showPageDisplayValue(myPageBtn) {
  document.getElementById(myPageBtn).style.display = "block";
}

function getExpenseToEdit(lnk) {
  let myID = lnk.getAttribute("id");
  let selectRowArr = myID.split("-");
  let selectRow = selectRowArr[1];
  selectedArrayNum = currentTablePage;
  switch (currentTablePage) {
    case 1:
      fillVehicleExpForm(arrTablePage1, selectRow);
      break;
    case 2:
      fillVehicleExpForm(arrTablePage2, selectRow);
      break;
    case 3:
      fillVehicleExpForm(arrTablePage3, selectRow);
      break;
    case 4:
      fillVehicleExpForm(arrTablePage4, selectRow);
      break;
    case 5:
      fillVehicleExpForm(arrTablePage5, selectRow);
      break;
    case 6:
      fillVehicleExpForm(arrTablePage6, selectRow);
      break;
    case 7:
      fillVehicleExpForm(arrTablePage7, selectRow);
      break;
    case 8:
      fillVehicleExpForm(arrTablePage8, selectRow);
      break;
    case 9:
      fillVehicleExpForm(arrTablePage9, selectRow);
      break;
    case 10:
      fillVehicleExpForm(arrTablePage10, selectRow);
      break;
    case 11:
      fillVehicleExpForm(arrTablePage11, selectRow);
      break;
    case 12:
      fillVehicleExpForm(arrTablePage12, selectRow);
      break;
    case 13:
      fillVehicleExpForm(arrTablePage13, selectRow);
      break;
    case 14:
      fillVehicleExpForm(arrTablePage14, selectRow);
      break;
    case 15:
      fillVehicleExpForm(arrTablePage15, selectRow);
      break;
    case 16:
      fillVehicleExpForm(arrTablePage16, selectRow);
      break;
    case 17:
      fillVehicleExpForm(arrTablePage17, selectRow);
      break;
    case 18:
      fillVehicleExpForm(arrTablePage18, selectRow);
      break;
    case 19:
      fillVehicleExpForm(arrTablePage19, selectRow);
      break;
    case 20:
      fillVehicleExpForm(arrTablePage20, selectRow);
      break;
    case 21:
      fillVehicleExpForm(arrTablePage21, selectRow);
      break;
    case 22:
      fillVehicleExpForm(arrTablePage22, selectRow);
      break;
    case 23:
      fillVehicleExpForm(arrTablePage23, selectRow);
      break;
    case 24:
      fillVehicleExpForm(arrTablePage24, selectRow);
  }
}

fillVehicleExpForm = async (expArr, row) => {
  let currentExpModal;
  let currentTextModal;
  if (document.getElementById('myTitleNode').textContent.includes("Business") && document.getElementById('myTitleNode').textContent.includes("Expenses")) {
    currentExpModal = myDOMs.busExp;
    currentTextModal = 'Business'
  } else if (document.getElementById("myTitleNode").textContent.includes("Vehicle-1")) {
    currentExpModal = myDOMs.carExp
    currentTextModal = 'Vehicle-1'
  } else if (document.getElementById("myTitleNode").textContent.includes("Vehicle-2")) {
    currentExpModal = myDOMs.carExp
    currentTextModal = 'Vehicle-2'
  } else if (document.getElementById("myTitleNode").textContent.includes("Home")) {
    currentExpModal = myDOMs.homeExp
    currentTextModal = 'Home'
  } else if (document.getElementById("myTitleNode").textContent.includes("Other")) {
    currentExpModal = myDOMs.otherExp
    currentTextModal = 'Other'
  } else if (document.getElementById("myTitleNode").textContent.includes("Rental") && document.getElementById("myTitleNode").textContent.includes("Expenses")) {
    currentExpModal = myDOMs.rentalExp
    currentTextModal = 'Rental'
  } else if (document.getElementById("myTitleNode").textContent.includes("Business") && document.getElementById("myTitleNode").textContent.includes("Revenue")) {
    currentExpModal = myDOMs.income
    currentTextModal = 'B-Income'
  } else if (document.getElementById("myTitleNode").textContent.includes("Rental") && document.getElementById("myTitleNode").textContent.includes("Revenue")) {
    currentExpModal = myDOMs.income
    currentTextModal = 'R-Income'
  }

  if (Date.parse(dbMiscData.lockDate) >= Date.parse(expArr[row].carDate)) {
    savedTransactionLocked = true;
    alert('Because the Transaction Date is on or before the Lock Date, you will not be allowed to save any changes to it!');
  };

  selectedRowNum = row;
  if (currentTextModal === 'Business') {
    displayBusExpModal();
  } else if (currentTextModal === 'Vehicle-1') {
    displayCarExpModal();
    myDOMs.carExp.Selector.value = "Vehicle 1";
    myDOMs.carExp.Title.textContent = "Vehicle 1 Expense Entry Form";
  } else if (currentTextModal === 'Vehicle-2') {
    displayCarExpModal();
    myDOMs.carExp.Selector.value = "Vehicle 2";
    myDOMs.carExp.Title.textContent = "Vehicle 2 Expense Entry Form";
  } else if (currentTextModal === 'Home') {
    displayHomeExpModal();
  } else if (currentTextModal === 'Other') {
    displayOtherExpModal();
  } else if (currentTextModal === 'Rental') {
    displayRentalExpModal();
  } else if (currentTextModal === 'B-Income') {
    displayIncomeModal();
    myDOMs.income.Selector.value = "Business";
    myDOMs.income.Title.textContent = "Business Revenue Entry Form";
  } else if (currentTextModal === 'R-Income') {
    displayIncomeModal();
    myDOMs.income.Selector.value = "Rental";
    myDOMs.income.Title.textContent = "Rental Revenue Entry Form";
  }


  let myTempID = expArr[row]._id;
  let myDate = new Date(expArr[row].carDate);

  let myDay = myDate.getUTCDate();
  let myMonth = myDate.getUTCMonth() + 1;
  let myYear = myDate.getUTCFullYear();
  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  currentExpModal.EntryDate.value = myYear + "-" + myMonth + "-" + myDay;
  currentExpModal.NetAmt.value = expArr[row].carnetAmt.toFixed(2);
  currentExpModal.HSTAmt.value = expArr[row].carhstAmt.toFixed(2);
  currentExpModal.PSTAmt.value = expArr[row].carpstAmt.toFixed(2);
  currentExpModal.TotalAmt.value = expArr[row].carTotalAmt.toFixed(2);
  currentExpModal.Description.value = expArr[row].carDescription;
  currentExpModal.Vendor.value = expArr[row].vendorSelect;
  if (currentTextModal === 'B-Income' || currentTextModal === 'R-Income') {
    currentExpModal.Party.value = expArr[row].carExpCatSelect;
  } else {
    currentExpModal.Category.value = expArr[row].carExpCatSelect;
  }
  currentExpModal.ExpID.value = 'SAVED';
  currentExpModal.BlindExpID.value = myTempID;
  currentExpModal.ReoccurYES.checked = false;
  currentExpModal.ReoccurNO.checked = true;

  myOriginalData.Date = myYear + "-" + myMonth + "-" + myDay;
  myOriginalData.Net = expArr[row].carnetAmt;
  myOriginalData.Hst = expArr[row].carhstAmt;
  myOriginalData.Pst = expArr[row].carpstAmt;
  myOriginalData.Total = expArr[row].carTotalAmt;
  myOriginalData.Description = expArr[row].carDescription;
  myOriginalData.Vendor = expArr[row].vendorSelect;
  myOriginalData.Category = expArr[row].carExpCatSelect;
  myOriginalData.BlindID = myTempID;
  myOriginalData.Status = "SAVED";
  myOriginalData.Receipt = expArr[row].receiptPath;
  myOriginalData.MonthlyYES = false;
  myOriginalData.MonthlyNO = true;


  if (expArr[row].receiptPath) {
    let imgData;
    if (currentTextModal === 'Vehicle-1') {
      imgData = await getImageData(myTempID, 1);
    } else if (currentTextModal === 'Vehicle-2') {
      imgData = await getImageData(myTempID, 2);
    } else if (currentTextModal === 'Business') {
      imgData = await getImageData(myTempID, "Bus");
    } else if (currentTextModal === 'Home') {
      imgData = await getImageData(myTempID, "Home");
    } else if (currentTextModal === 'Other') {
      imgData = await getImageData(myTempID, "Other");
    } else if (currentTextModal === 'Rental') {
      imgData = await getImageData(myTempID, "Rental");
    } else if (currentTextModal === 'B-Income') {
      imgData = await getImageData(myTempID, "B-Income");
    } else if (currentTextModal === 'R-Income') {
      imgData = await getImageData(myTempID, "R-Income");
    }

    if (imgData !== null) {
      let b64Response = base64ArrayBuffer(imgData);
      let img = new Image();
      let container;
      if (currentTextModal === 'Business') {
        container = document.getElementById("myImgBus");
      } else if (currentTextModal === 'Vehicle-1' || currentTextModal === 'Vehicle-2') {
        container = document.getElementById("myImg");
      } else if (currentTextModal === 'Home') {
        container = document.getElementById("myImgHome");
      } else if (currentTextModal === 'Other') {
        container = document.getElementById("myImgOther");
      } else if (currentTextModal === 'Rental') {
        container = document.getElementById("myImgRental");
      } else if (currentTextModal === 'B-Income' || currentTextModal === 'R-Income') {
        container = document.getElementById("myImgIncome");
      }
      img.src = "data:image/jpeg;base64," + b64Response;
      myOriginalData.ImageData = img.src;
      myOriginalData.Checkbox = true;
      container.setAttribute("src", img.src);
      if (currentTextModal === 'Business') {
        myDOMs.busExp.Checkbox.checked = true;
      } else if (currentTextModal === 'Vehicle-1' || currentTextModal === 'Vehicle-2') {
        myDOMs.carExp.Checkbox.checked = true;
      } else if (currentTextModal === 'Home') {
        myDOMs.homeExp.Checkbox.checked = true;
      } else if (currentTextModal === 'Other') {
        myDOMs.otherExp.Checkbox.checked = true;
      } else if (currentTextModal === 'Rental') {
        myDOMs.rentalExp.Checkbox.checked = true;
      } else if (currentTextModal === 'B-Income' || currentTextModal === 'R-Income') {
        myDOMs.income.Checkbox.checked = true;
      }

    } else {
      alert("Unable to get Receipt Image!;");
      myOriginalData.ImageData = null;
      if (currentTextModal === 'Business') {
        myDOMs.busExp.Checkbox.checked = false;
        removeBusImage();
      } else if (currentTextModal === 'Vehicle-1' || currentTextModal === 'Vehicle-2') {
        myDOMs.carExp.Checkbox.checked = false;
        removeImage();
      } else if (currentTextModal === 'Home') {
        myDOMs.homeExp.Checkbox.checked = false;
        removeHomeImage();
      } else if (currentTextModal === 'Other') {
        myDOMs.otherExp.Checkbox.checked = false;
        removeOtherImage();
      } else if (currentTextModal === 'Rental') {
        myDOMs.rentalExp.Checkbox.checked = false;
        removeRentalImage();
      } else if (currentTextModal === 'B-Income' || currentTextModal === 'R-Income') {
        myDOMs.income.Checkbox.checked = false;
        removeIncomeImage();
      }
    }
  } else {
    if (currentTextModal === 'Vehicle-1') {
      myDOMs.carExp.Selector.value = "Vehicle 1";
      myDOMs.carExp.Title.textContent = "Vehicle 1 Expense Entry Form";
      myDOMs.carExp.Checkbox.checked = false;
      removeImage();
    } else if (currentTextModal === 'Vehicle-2') {
      myDOMs.carExp.Selector.value = "Vehicle 2";
      myDOMs.carExp.Title.textContent = "Vehicle 2 Expense Entry Form";
      myDOMs.carExp.Checkbox.checked = false;
      removeImage();
    } else if (currentTextModal === 'Business') {
      myDOMs.busExp.Checkbox.checked = false;
      removeBusImage();
    } else if (currentTextModal === 'Home') {
      myDOMs.homeExp.Checkbox.checked = false;
      removeHomeImage();
    } else if (currentTextModal === 'Other') {
      myDOMs.otherExp.Checkbox.checked = false;
      removeOtherImage();
    } else if (currentTextModal === 'Rental') {
      myDOMs.rentalExp.Checkbox.checked = false;
      removeRentalImage();
    } else if (currentTextModal === 'B-Income' || currentTextModal === 'R-Income') {
      myDOMs.income.Checkbox.checked = false;
      removeIncomeImage();
    }
  }
};

const getImageData = (myTempID, vehicleNum) => {
  let myTempData;
  if (vehicleNum === 1) {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "1"
    };
  } else if (vehicleNum === 2) {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "2"
    };
  } else if (vehicleNum === 'Bus') {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Bus"
    };
  } else if (vehicleNum === 'Home') {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Home"
    };
  } else if (vehicleNum === 'Other') {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Other"
    };
  } else if (vehicleNum === 'Rental') {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Rental"
    };
  } else if (vehicleNum === 'B-Income') {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Income",
      source: 'Business'
    };
  } else if (vehicleNum === 'R-Income') {
    myTempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      carNumber: "Income",
      source: 'Rental'
    };
  }
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${serverURL}carExpenseImg/${myTempID}`,
      method: "GET",
      data: myTempData
    })
      .done(function (data) {
        // console.dir(JSON.stringify(data, undefined, 2));
        resolve(data.myImg.Body.data);
      })
      .fail(function (e) {
        reject("Unable to get Receipt Image!");
      });
  });
};

function emptyReportArrays() {
  curTableArray = [];
  arrTablePage1 = [];
  arrTablePage2 = [];
  arrTablePage3 = [];
  arrTablePage4 = [];
  arrTablePage5 = [];
  arrTablePage6 = [];
  arrTablePage7 = [];
  arrTablePage8 = [];
  arrTablePage9 = [];
  arrTablePage10 = [];
  arrTablePage11 = [];
  arrTablePage12 = [];
  arrTablePage13 = [];
  arrTablePage14 = [];
  arrTablePage15 = [];
  arrTablePage16 = [];
  arrTablePage17 = [];
  arrTablePage18 = [];
  arrTablePage19 = [];
  arrTablePage20 = [];
  arrTablePage21 = [];
  arrTablePage22 = [];
  arrTablePage23 = [];
  arrTablePage24 = [];
}

function getRequestedArray(arrNum) {
  switch (arrNum) {
    case 1:
      return arrTablePage1;
    case 2:
      return arrTablePage2;
    case 3:
      return arrTablePage3;
    case 4:
      return arrTablePage4;
    case 5:
      return arrTablePage5;
    case 6:
      return arrTablePage6;
    case 7:
      return arrTablePage7;
    case 8:
      return arrTablePage8;
    case 9:
      return arrTablePage9;
    case 10:
      return arrTablePage10;
    case 11:
      return arrTablePage11;
    case 12:
      return arrTablePage12;
    case 13:
      return arrTablePage13;
    case 14:
      return arrTablePage14;
    case 15:
      return arrTablePage15;
    case 16:
      return arrTablePage16;
    case 17:
      return arrTablePage17;
    case 18:
      return arrTablePage18;
    case 19:
      return arrTablePage19;
    case 20:
      return arrTablePage20;
    case 21:
      return arrTablePage21;
    case 22:
      return arrTablePage22;
    case 23:
      return arrTablePage23;
    case 24:
      return arrTablePage24;
  }
}

function updateRequestedArray(arrNum, row, data) {
  let varNumOne = 1;
  let arrRow = row;
  row = +row + +varNumOne;
  let myDate = new Date(data.carDate);
  let myDay = myDate.getUTCDate();
  let myMonth = myDate.getUTCMonth() + 1;
  let myYear = myDate.getUTCFullYear();
  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  var myTable = document.getElementById("expReportTable");
  myTable.rows[row].cells[1].innerHTML = `${myMonth}-${myDay}-${myYear}`;
  myTable.rows[row].cells[2].innerHTML = `$${data.carNetAmt.toFixed(2)}`;
  myTable.rows[row].cells[3].innerHTML = `$${data.carHSTAmt.toFixed(2)}`;
  myTable.rows[row].cells[4].innerHTML = `$${data.carPSTAmt.toFixed(2)}`;
  myTable.rows[row].cells[5].innerHTML = `$${data.carTtlAmt.toFixed(2)}`;
  myTable.rows[row].cells[6].innerHTML = data.carDescription;
  myTable.rows[row].cells[7].innerHTML = data.carVendor;
  myTable.rows[row].cells[8].innerHTML = data.carCategory;
  myTable.rows[row].cells[9].innerHTML = data.receiptPath;

  switch (arrNum) {
    case 1:
      arrTablePage1[arrRow].carDate = data.carDate;
      arrTablePage1[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage1[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage1[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage1[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage1[arrRow].carDescription = data.carDescription;
      arrTablePage1[arrRow].vendorSelect = data.carVendor;
      arrTablePage1[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage1[arrRow].expReceipt = data.carReceipt;
      arrTablePage1[arrRow].receiptPath = data.receiptPath;
      break;
    case 2:
      arrTablePage2[arrRow].carDate = data.carDate;
      arrTablePage2[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage2[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage2[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage2[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage2[arrRow].carDescription = data.carDescription;
      arrTablePage2[arrRow].vendorSelect = data.carVendor;
      arrTablePage2[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage2[arrRow].expReceipt = data.carReceipt;
      arrTablePage2[arrRow].receiptPath = data.receiptPath;
      break;
    case 3:
      arrTablePage3[arrRow].carDate = data.carDate;
      arrTablePage3[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage3[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage3[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage3[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage3[arrRow].carDescription = data.carDescription;
      arrTablePage3[arrRow].vendorSelect = data.carVendor;
      arrTablePage3[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage3[arrRow].expReceipt = data.carReceipt;
      arrTablePage3[arrRow].receiptPath = data.receiptPath;
      break;
    case 4:
      arrTablePage4[arrRow].carDate = data.carDate;
      arrTablePage4[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage4[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage4[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage4[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage4[arrRow].carDescription = data.carDescription;
      arrTablePage4[arrRow].vendorSelect = data.carVendor;
      arrTablePage4[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage4[arrRow].expReceipt = data.carReceipt;
      arrTablePage4[arrRow].receiptPath = data.receiptPath;
      break;
    case 5:
      arrTablePage5[arrRow].carDate = data.carDate;
      arrTablePage5[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage5[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage5[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage5[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage5[arrRow].carDescription = data.carDescription;
      arrTablePage5[arrRow].vendorSelect = data.carVendor;
      arrTablePage5[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage5[arrRow].expReceipt = data.carReceipt;
      arrTablePage5[arrRow].receiptPath = data.receiptPath;
      break;
    case 6:
      arrTablePage6[arrRow].carDate = data.carDate;
      arrTablePage6[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage6[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage6[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage6[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage6[arrRow].carDescription = data.carDescription;
      arrTablePage6[arrRow].vendorSelect = data.carVendor;
      arrTablePage6[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage6[arrRow].expReceipt = data.carReceipt;
      arrTablePage6[arrRow].receiptPath = data.receiptPath;
      break;
    case 7:
      arrTablePage7[arrRow].carDate = data.carDate;
      arrTablePage7[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage7[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage7[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage7[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage7[arrRow].carDescription = data.carDescription;
      arrTablePage7[arrRow].vendorSelect = data.carVendor;
      arrTablePage7[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage7[arrRow].expReceipt = data.carReceipt;
      arrTablePage7[arrRow].receiptPath = data.receiptPath;
      break;
    case 8:
      arrTablePage8[arrRow].carDate = data.carDate;
      arrTablePage8[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage8[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage8[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage8[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage8[arrRow].carDescription = data.carDescription;
      arrTablePage8[arrRow].vendorSelect = data.carVendor;
      arrTablePage8[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage8[arrRow].expReceipt = data.carReceipt;
      arrTablePage8[arrRow].receiptPath = data.receiptPath;
      break;
    case 9:
      arrTablePage9[arrRow].carDate = data.carDate;
      arrTablePage9[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage9[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage9[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage9[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage9[arrRow].carDescription = data.carDescription;
      arrTablePage9[arrRow].vendorSelect = data.carVendor;
      arrTablePage9[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage9[arrRow].expReceipt = data.carReceipt;
      arrTablePage9[arrRow].receiptPath = data.receiptPath;
      break;
    case 10:
      arrTablePage10[arrRow].carDate = data.carDate;
      arrTablePage10[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage10[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage10[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage10[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage10[arrRow].carDescription = data.carDescription;
      arrTablePage10[arrRow].vendorSelect = data.carVendor;
      arrTablePage10[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage10[arrRow].expReceipt = data.carReceipt;
      arrTablePage10[arrRow].receiptPath = data.receiptPath;
      break;
    case 11:
      arrTablePage11[arrRow].carDate = data.carDate;
      arrTablePage11[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage11[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage11[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage11[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage11[arrRow].carDescription = data.carDescription;
      arrTablePage11[arrRow].vendorSelect = data.carVendor;
      arrTablePage11[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage11[arrRow].expReceipt = data.carReceipt;
      arrTablePage11[arrRow].receiptPath = data.receiptPath;
      break;
    case 12:
      arrTablePage12[arrRow].carDate = data.carDate;
      arrTablePage12[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage12[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage12[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage12[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage12[arrRow].carDescription = data.carDescription;
      arrTablePage12[arrRow].vendorSelect = data.carVendor;
      arrTablePage12[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage12[arrRow].expReceipt = data.carReceipt;
      arrTablePage12[arrRow].receiptPath = data.receiptPath;
      break;
    case 13:
      arrTablePage13[arrRow].carDate = data.carDate;
      arrTablePage13[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage13[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage13[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage13[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage13[arrRow].carDescription = data.carDescription;
      arrTablePage13[arrRow].vendorSelect = data.carVendor;
      arrTablePage13[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage13[arrRow].expReceipt = data.carReceipt;
      arrTablePage13[arrRow].receiptPath = data.receiptPath;
      break;
    case 14:
      arrTablePage14[arrRow].carDate = data.carDate;
      arrTablePage14[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage14[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage14[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage14[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage14[arrRow].carDescription = data.carDescription;
      arrTablePage14[arrRow].vendorSelect = data.carVendor;
      arrTablePage14[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage14[arrRow].expReceipt = data.carReceipt;
      arrTablePage14[arrRow].receiptPath = data.receiptPath;
      break;
    case 15:
      arrTablePage15[arrRow].carDate = data.carDate;
      arrTablePage15[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage15[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage15[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage15[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage15[arrRow].carDescription = data.carDescription;
      arrTablePage15[arrRow].vendorSelect = data.carVendor;
      arrTablePage15[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage15[arrRow].expReceipt = data.carReceipt;
      arrTablePage15[arrRow].receiptPath = data.receiptPath;
      break;
    case 16:
      arrTablePage16[arrRow].carDate = data.carDate;
      arrTablePage16[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage16[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage16[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage16[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage16[arrRow].carDescription = data.carDescription;
      arrTablePage16[arrRow].vendorSelect = data.carVendor;
      arrTablePage16[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage16[arrRow].expReceipt = data.carReceipt;
      arrTablePage16[arrRow].receiptPath = data.receiptPath;
      break;
    case 17:
      arrTablePage17[arrRow].carDate = data.carDate;
      arrTablePage17[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage17[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage17[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage17[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage17[arrRow].carDescription = data.carDescription;
      arrTablePage17[arrRow].vendorSelect = data.carVendor;
      arrTablePage17[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage17[arrRow].expReceipt = data.carReceipt;
      arrTablePage17[arrRow].receiptPath = data.receiptPath;
      break;
    case 18:
      arrTablePage18[arrRow].carDate = data.carDate;
      arrTablePage18[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage18[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage18[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage18[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage18[arrRow].carDescription = data.carDescription;
      arrTablePage18[arrRow].vendorSelect = data.carVendor;
      arrTablePage18[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage18[arrRow].expReceipt = data.carReceipt;
      arrTablePage18[arrRow].receiptPath = data.receiptPath;
      break;
    case 19:
      arrTablePage19[arrRow].carDate = data.carDate;
      arrTablePage19[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage19[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage19[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage19[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage19[arrRow].carDescription = data.carDescription;
      arrTablePage19[arrRow].vendorSelect = data.carVendor;
      arrTablePage19[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage19[arrRow].expReceipt = data.carReceipt;
      arrTablePage19[arrRow].receiptPath = data.receiptPath;
      break;
    case 20:
      arrTablePage20[arrRow].carDate = data.carDate;
      arrTablePage20[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage20[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage20[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage20[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage20[arrRow].carDescription = data.carDescription;
      arrTablePage20[arrRow].vendorSelect = data.carVendor;
      arrTablePage20[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage20[arrRow].expReceipt = data.carReceipt;
      arrTablePage20[arrRow].receiptPath = data.receiptPath;
      break;
    case 21:
      arrTablePage21[arrRow].carDate = data.carDate;
      arrTablePage21[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage21[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage21[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage21[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage21[arrRow].carDescription = data.carDescription;
      arrTablePage21[arrRow].vendorSelect = data.carVendor;
      arrTablePage21[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage21[arrRow].expReceipt = data.carReceipt;
      arrTablePage21[arrRow].receiptPath = data.receiptPath;
      break;
    case 22:
      arrTablePage22[arrRow].carDate = data.carDate;
      arrTablePage22[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage22[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage22[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage22[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage22[arrRow].carDescription = data.carDescription;
      arrTablePage22[arrRow].vendorSelect = data.carVendor;
      arrTablePage22[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage22[arrRow].expReceipt = data.carReceipt;
      arrTablePage22[arrRow].receiptPath = data.receiptPath;
      break;
    case 23:
      arrTablePage23[arrRow].carDate = data.carDate;
      arrTablePage23[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage23[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage23[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage23[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage23[arrRow].carDescription = data.carDescription;
      arrTablePage23[arrRow].vendorSelect = data.carVendor;
      arrTablePage23[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage23[arrRow].expReceipt = data.carReceipt;
      arrTablePage23[arrRow].receiptPath = data.receiptPath;
      break;
    case 24:
      arrTablePage24[arrRow].carDate = data.carDate;
      arrTablePage24[arrRow].carnetAmt = data.carNetAmt;
      arrTablePage24[arrRow].carhstAmt = data.carHSTAmt;
      arrTablePage24[arrRow].carpstAmt = data.carPSTAmt;
      arrTablePage24[arrRow].carTotalAmt = data.carTtlAmt;
      arrTablePage24[arrRow].carDescription = data.carDescription;
      arrTablePage24[arrRow].vendorSelect = data.carVendor;
      arrTablePage24[arrRow].carExpCatSelect = data.carCategory;
      arrTablePage24[arrRow].expReceipt = data.carReceipt;
      arrTablePage24[arrRow].receiptPath = data.receiptPath;
  }
}
