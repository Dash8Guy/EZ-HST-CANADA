//User Email
let userEmail = '';

//URL Variable
let serverURL = window.location.pathname;
//alert(serverURL);
//Variable to keep track of populated category list
let categoryCar = false;
let vendorCar = false;
//Holds Logged in User first name;
let loggedIn;
//This varaible is set to true when Collapse Nav Bar is Open and false when closed
let NavBarCollapseOpen = false;

//Next varaible used to know if any Modals are open
let AssetModalOpen = false;
let TaxPaymentModalOpen = false;
let HSTPaymentModalOpenForNAV = false;
let PSTPaymentModalOpenForNAV = false;
let VehicleExpEntryModalOpen = false;
let BusExpEntryModalOpen = false;
let HomeExpEntryModalOpen = false;
let OtherExpEntryModalOpen = false;
let RentalExpEntryModalOpen = false;
let IncomeEntryModalOpen = false;
let VLogModalOpen = false;
let UserSetupModalOpen = false;
let UserLoginModalOpen = false;
let VLogReportModalOpen = false;
let PaymentReportModalOpen = false;
let AssetReportModalOpen = false;
let IncomeStatementModalOpen = false;
let HomePercentModalOpen = false;
let AccountSummaryModalOpen = false;
let HSTReturnModalOpen = false;


function closeFullViewImage() {
  $('#ImageViewModal').modal('hide');
  let img = document.getElementById('DivFullImage');
  img.setAttribute('style', 'transform:rotate(0deg)');
  imageAngle = 0;
};

myDOMs.nav.NavBarCollapse.addEventListener('click', function (event) {

  if (NavBarCollapseOpen === true) {
    NavBarCollapseOpen = false;
  } else {
    NavBarCollapseOpen = true;
  }

});


function ToggleMenuBar() {

  let myMainNav = document.getElementById("main-nav");
  let LeftMainDOM = document.getElementById("timePeriodDiv");
  let RightMainDOM = document.getElementById("MainViewTotals");
  let MainContainerAlertTemp = document.getElementById("alertContainerMain");
  let MainAlertTemp = document.getElementById("mainAlert");
  let MiddleMainDOM = document.getElementById("MainMiddleSection");

  let BusExpTableAlertDOM = document.getElementById("mainTableAlert");
  let myTopVal = myMainNav.offsetTop;

  if (AssetModalOpen === true || TaxPaymentModalOpen === true || HSTPaymentModalOpenForNAV === true || PSTPaymentModalOpenForNAV === true || VehicleExpEntryModalOpen === true || BusExpEntryModalOpen === true || HomeExpEntryModalOpen === true || OtherExpEntryModalOpen === true || RentalExpEntryModalOpen === true || IncomeEntryModalOpen === true || VLogModalOpen === true || UserSetupModalOpen === true || UserLoginModalOpen === true || VLogReportModalOpen === true || PaymentReportModalOpen === true || AssetReportModalOpen === true || IncomeStatementModalOpen === true || HomePercentModalOpen === true || AccountSummaryModalOpen === true || HSTReturnModalOpen === true) {
    // alert('1st');
    myMainNav.style.top = '-108px';
    LeftMainDOM.style.top = '-108px';
    RightMainDOM.style.top = '-108px';
    MiddleMainDOM.style.top = '-108px';
    MainContainerAlertTemp.style.top = '-108px';
    if (MainAlertTemp === undefined || MainAlertTemp === null) {
    } else {
      MainAlertTemp.style.top = '-108px';
    }
    if (BusExpTableAlertDOM === undefined || BusExpTableAlertDOM === null) {
    } else {
      BusExpTableAlertDOM.style.top = '-108px';
    }
    myDOMs.main_page.NavToggleBtn.innerText = 'Display Menu Bar';

    if (window.innerWidth < 992) {
      let MyCollapse = document.getElementById("navbarCollapse");
      let myCollapseVal = MyCollapse.offsetTop;
      if (myCollapseVal !== 0 || myCollapseVal === 0 && NavBarCollapseOpen === true) {
        myDOMs.nav.NavBarCollapse.click(false);
      }
    }

  } else if (AssetModalOpen === false && TaxPaymentModalOpen === false && HSTPaymentModalOpenForNAV === false && PSTPaymentModalOpenForNAV === false && VehicleExpEntryModalOpen === false && BusExpEntryModalOpen === false && HomeExpEntryModalOpen === false && OtherExpEntryModalOpen === false && RentalExpEntryModalOpen === false && IncomeEntryModalOpen === false && VLogModalOpen === false && UserSetupModalOpen === false && UserLoginModalOpen === false && VLogReportModalOpen === false && PaymentReportModalOpen === false && AssetReportModalOpen === false && IncomeStatementModalOpen === false && HomePercentModalOpen === false && AccountSummaryModalOpen === false && HSTReturnModalOpen === false) {

    if (myTopVal === -108) {
      // alert('2nd');
      if (reOpenIncomeStatement) { return };
      myMainNav.style.top = '0';
      LeftMainDOM.style.top = '0';
      RightMainDOM.style.top = '0';
      MiddleMainDOM.style.top = '0';
      MainContainerAlertTemp.style.top = '0';
      if (MainAlertTemp === undefined || MainAlertTemp === null) {
      } else {
        MainAlertTemp.style.top = '0';
      }
      if (BusExpTableAlertDOM === undefined || BusExpTableAlertDOM === null) {
      } else {
        BusExpTableAlertDOM.style.top = '0';
      }
      myDOMs.main_page.NavToggleBtn.innerText = 'Hide Menu Bar';

      if (window.innerWidth < 992) {
        let MyCollapse = document.getElementById("navbarCollapse");
        let myCollapseVal = MyCollapse.offsetTop;
        if (myCollapseVal !== 0 || myCollapseVal === 0 && NavBarCollapseOpen === true) {
          myDOMs.nav.NavBarCollapse.click(false);
        }
      }

    } else {
      // alert('3rd');
      myMainNav.style.top = '-108px';
      LeftMainDOM.style.top = '-108px';
      RightMainDOM.style.top = '-108px';
      MiddleMainDOM.style.top = '-108px';
      MainContainerAlertTemp.style.top = '-108px';
      if (MainAlertTemp === undefined || MainAlertTemp === null) {
      } else {
        MainAlertTemp.style.top = '-108px';
      }
      if (BusExpTableAlertDOM === undefined || BusExpTableAlertDOM === null) {
      } else {
        BusExpTableAlertDOM.style.top = '-108px';
      }
      myDOMs.main_page.NavToggleBtn.innerText = 'Display Menu Bar';

      if (window.innerWidth < 992) {
        let MyCollapse = document.getElementById("navbarCollapse");
        let myCollapseVal = MyCollapse.offsetTop;
        if (myCollapseVal !== 0 || myCollapseVal === 0 && NavBarCollapseOpen === true) {
          myDOMs.nav.NavBarCollapse.click(false);
        }
      }


    }

  }

};

updateHSTMenus();

function updateHSTMenus() {
  let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.main.HSTPaymentEntryMenu.innerText = ' HST Payment'
    myDOMs.main.HSTPaymentReportMenu.innerText = ' HST Payment Report'
  } else {
    myDOMs.main.HSTPaymentEntryMenu.innerText = ' GST Payment'
    myDOMs.main.HSTPaymentReportMenu.innerText = ' GST Payment Report'
  }
};

function renameIncomeStatementElements() {
  if (window.innerWidth < 992) {
    myDOMs.incomeStatement.BusBodyElement.Dues.innerText = 'Fees & Dues';
    myDOMs.incomeStatement.BusBodyElement.Freight.innerText = 'Delivery & Freight';
    myDOMs.incomeStatement.BusBodyElement.Fuel.innerText = 'Fuel costs(expt vehicle)';
    myDOMs.incomeStatement.BusBodyElement.Maintenance.innerText = 'Maintenance & Repair';
    myDOMs.incomeStatement.BusBodyElement.Admin.innerText = 'Management & admin';
    myDOMs.incomeStatement.BusBodyElement.Legal.innerText = 'Legal & Prof Fees';
    myDOMs.incomeStatement.BusBodyElement.Wages.innerText = 'Wages & benefits';
    myDOMs.incomeStatement.BusBodyElement.CCA.innerText = 'CCA/Fixed Asset Claim';
    myDOMs.incomeStatement.RentalBodyElement.Wages.innerText = `Salaries,wages, and benefits`;
  } else {
    myDOMs.incomeStatement.BusBodyElement.Dues.innerText = 'Fees, licences, dues, memberships';
    myDOMs.incomeStatement.BusBodyElement.Freight.innerText = 'Delivery, freight, and express';
    myDOMs.incomeStatement.BusBodyElement.Fuel.innerText = 'Fuel costs (except vehicles)';
    myDOMs.incomeStatement.BusBodyElement.Maintenance.innerText = 'Maintenance and Repairs';
    myDOMs.incomeStatement.BusBodyElement.Admin.innerText = 'Management and administration fees';
    myDOMs.incomeStatement.BusBodyElement.Legal.innerText = 'Legal, accounting, and other Prof. Fees';
    myDOMs.incomeStatement.BusBodyElement.Wages.innerText = 'Salaries, wages, and benefits';
    myDOMs.incomeStatement.BusBodyElement.CCA.innerText = 'Capital Cost Allowance (CCA)/Fixed Asset Depreciation Claim';
    myDOMs.incomeStatement.RentalBodyElement.Wages.innerText = `Salaries,wages, and benefits(incl employer's contribution)`;
  }
}

function AddorRemoveVLogNavBtnsText() {
  if (window.innerWidth < 510) {
    myDOMs.vehicleLog.PreviousBtn.innerHTML = '<i class="fas fa-step-backward"></i>';
    myDOMs.vehicleLog.NextBtn.innerHTML = '<i class="fas fa-step-forward"></i>';
    myDOMs.vehicleLog.FirstBtn.innerHTML = '<i class="fas fa-fast-backward"></i>';
    myDOMs.vehicleLog.LastBtn.innerHTML = '<i class="fas fa-fast-forward"></i>';
  } else {
    myDOMs.vehicleLog.PreviousBtn.innerHTML = '<i class="fas fa-step-backward"></i> Previous';
    myDOMs.vehicleLog.NextBtn.innerHTML = 'Next <i class="fas fa-step-forward"></i>';
    myDOMs.vehicleLog.FirstBtn.innerHTML = '<i class="fas fa-fast-backward"></i> First';
    myDOMs.vehicleLog.LastBtn.innerHTML = 'Last <i class="fas fa-fast-forward"></i>';
  }
};

function ChangeVlogLabelTextForResize() {
  if (window.innerWidth < 992) {
    myDOMs.vehicleLog.BusKMsInputLabel.innerText = 'Bus KM';
    myDOMs.vehicleLog.PersKMsInputLabel.innerText = 'Per KM';
    myDOMs.vehicleLog.OdometerInputLabel.innerText = 'Od Pr Yr';
    myDOMs.vehicleLog.SaveOdometerBtn.innerText = 'Save Od';

    myDOMs.vehicleLog.BusKMsTotalLabel.innerText = 'Ttl Bus KM';
    myDOMs.vehicleLog.PersKMsTotalsLabel.innerText = 'Ttl Per KM';
    myDOMs.vehicleLog.OdometerTotalLabel.innerText = 'Odometer';
    myDOMs.vehicleLog.ResetLogBtn.innerText = 'Reset Log';

    myDOMs.vehicleLog.BusPercentYearLabel.innerText = '% Yr';
    myDOMs.vehicleLog.BusPercentQuarterLabel.innerText = '% ¼';
    myDOMs.vehicleLog.BusPercentMonthLabel.innerText = '% Mth';
    myDOMs.vehicleLog.QuickPercentBtn.innerText = 'Quick Set %';
  } else {
    myDOMs.vehicleLog.BusKMsInputLabel.innerText = 'Business KM';
    myDOMs.vehicleLog.PersKMsInputLabel.innerText = 'Personal KM';
    myDOMs.vehicleLog.OdometerInputLabel.innerText = 'Odometer Previous Year';
    myDOMs.vehicleLog.SaveOdometerBtn.innerText = 'Save Odometer';

    myDOMs.vehicleLog.BusKMsTotalLabel.innerText = 'Total Business KM';
    myDOMs.vehicleLog.PersKMsTotalsLabel.innerText = 'Total Personal KM';
    myDOMs.vehicleLog.OdometerTotalLabel.innerText = 'Odometer';
    myDOMs.vehicleLog.ResetLogBtn.innerText = 'Reset Log';

    myDOMs.vehicleLog.BusPercentYearLabel.innerText = 'Business % Year';
    myDOMs.vehicleLog.BusPercentQuarterLabel.innerText = 'Business % ¼';
    myDOMs.vehicleLog.BusPercentMonthLabel.innerText = 'Business % Month';
    myDOMs.vehicleLog.QuickPercentBtn.innerText = 'Quick Method Set %';
  }
}

runResizeCode();

window.addEventListener('resize', function (e) {
  runResizeCode();
});

function runResizeCode() {
  renameIncomeStatementElements();
  AddorRemoveVLogNavBtnsText();
  ChangeVlogLabelTextForResize();
};

function getTodaysDate() {
  let today = new Date();
  let dd = today.getUTCDate();
  let mm = today.getUTCMonth() + 1; //January is 0!
  let yyyy = today.getUTCFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '-' + dd + '-' + yyyy;
  return today;
}

function formatMyDate(date) {
  let myDate = new Date(date);
  let myDay = myDate.getUTCDate();
  let myMonth = myDate.getUTCMonth() + 1;
  let myYear = myDate.getUTCFullYear();

  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  return myMonth + "-" + myDay + "-" + myYear;
}

function arrOfObjectToArrOfArrays() {
  let netAmtSum = 0;
  let hstAmtSum = 0;
  let pstAmtSum = 0;
  let totalAmtSum = 0;
  let myTempData = [];
  let myTemp2Arr = [];
  curTableArray.forEach((el, index) => {
    let myTempArr = [];
    myTempArr.push(index + 1);
    let myTempDate = formatMyDate(el.carDate);
    myTempArr.push(myTempDate);
    myTempArr.push(formatNumber(el.carnetAmt.toFixed(2)));
    myTempArr.push(formatNumber(el.carhstAmt.toFixed(2)));
    myTempArr.push(formatNumber(el.carpstAmt.toFixed(2)));
    myTempArr.push(formatNumber(el.carTotalAmt.toFixed(2)));
    myTempArr.push(el.carDescription);
    myTempArr.push(el.vendorSelect);
    myTempArr.push(el.carExpCatSelect);

    myTempData.push(myTempArr);

    netAmtSum = netAmtSum + el.carnetAmt;
    hstAmtSum = hstAmtSum + el.carhstAmt;
    pstAmtSum = pstAmtSum + el.carpstAmt;
    totalAmtSum = totalAmtSum + el.carTotalAmt;
  });
  myTemp2Arr.push('');
  myTemp2Arr.push('Totals:');
  myTemp2Arr.push(formatNumber(netAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(hstAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(pstAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(totalAmtSum.toFixed(2)));
  myTemp2Arr.push('');
  myTemp2Arr.push('');
  myTemp2Arr.push('');

  myTempData.push(myTemp2Arr);

  return myTempData;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function generateTablePDF(expGroup) {
  let headText;
  let fileSaveText;
  let data = arrOfObjectToArrOfArrays();
  let columns = ["  #  ", "DATE", "NET", "HST", "PST", "TOTAL", "DESCRIPTION", "SUPPLIER", "CATEGORY"];
  let doc = new jsPDF('l', 'px', 'letter', true);
  if (expGroup === 'Bus-Inc' || expGroup === 'Rental-Inc') {
    doc.setTextColor(40, 167, 69);
  } else {
    doc.setTextColor(18, 19, 194);
  }

  doc.setFontSize(9);
  switch (expGroup) {
    case 'Bus-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Business(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      } else {
        headText = `${curTableArray.length} Business Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      }
      break;
    case 'V1-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Vehicle-1(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-1 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      } else {
        headText = `${curTableArray.length} Vehicle-1 Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-1 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      }
      break;
    case 'V2-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Vehicle-2(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-2 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Vehicle-2 Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-2 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Home-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Home(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Home Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Home Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Home Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Other-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Other(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Other Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Other Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Other Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Rental-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Rental(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Rental Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Bus-Inc':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Business Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Business Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Rental-Inc':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Rental Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Rental Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'VLog':
      headText = `${curTableArray.length} Log Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
      fileSaveText = `Vehicle Log(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
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
      alignCol(cell, data, true, expGroup);
    },
    createdCell: function (cell, data) {
      alignCol(cell, data, false, expGroup);
    }
    //columnStyles: { DATE: { halign: 'right' }, NET: { halign: 'right' }, HST: { halign: 'right' }, PST: { halign: 'right' }, TOTAL: { halign: 'right' } }
  });

  doc.save(fileSaveText);

}

function alignCol(cell, data, isHeader, expGroup) {

  var col = data.column.index;
  var row = data.row.index;
  if (col == 1 || col == 2 || col == 3 || col == 4 || col == 5) {
    cell.styles.halign = 'right';
  } else {
    cell.styles.halign = 'center';
  }
  if (row === curTableArray.length) {

    cell.styles.fontStyle = 'bold';
  }
  if (isHeader) {
    if (expGroup === 'Bus-Inc' || expGroup === 'Rental-Inc') {
      cell.styles.fillColor = [40, 167, 69];
    } else {
      cell.styles.fillColor = [18, 19, 194];
    }

  }
}


function displayScreenSize() {
  alert(
    `Your Screen is ${window.innerWidth} wide and \n your Screen is ${
    window.innerHeight
    } high.`
  );
}

function browserLogout() {
  $.ajax({
    url: `${serverURL}users/me/token`,
    method: "DELETE",
    async: false,
    data: {
      auth: window.sessionStorage.getItem('myRandomVar')
    }
  })
    .done(function (data) {
      vendorCar = false;
      categoryCar = false;
    })
    .fail(function (e) { });
}

async function userLogout(autoGenerated) {
  await resumeUserLogout(autoGenerated);
  ToggleMenuBar();

}

function resumeUserLogout(autoGenerated) {
  if ($("#navLogout").hasClass("disabled")) {
    displayAlert(
      myDOMs.main.AlertContainer,
      "mainAlert",
      "closeBtnAlertMain",
      "You are NOT logged in! ",
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${serverURL}users/me/token`,
      method: "DELETE",
      data: {
        auth: window.sessionStorage.getItem('myRandomVar')
      }
    })
      .done(function (data) {
        resolve(data);
        afterLogout();
        if (autoGenerated) {
          displayAlert(
            myDOMs.main.AlertContainer,
            "mainAlert",
            "closeBtnAlertMain",
            "EZ-HST-Canada has detected no activity for over 15 min and has Logged Out Successfully! ",
            "",
            " ",
            "GREEN",
            0
          );

        } else {
          displayAlert(
            myDOMs.main.AlertContainer,
            "mainAlert",
            "closeBtnAlertMain",
            "Logged Out Successfully! ",
            "",
            " ",
            "GREEN",
            6000
          );
          ToggleNavAfterTimeDelay();
          userEmail = '';
        }
      })
      .fail(function (e) {
        reject(e);
      });
  });


};

function ToggleNavAfterTimeDelay() {
  setTimeout(function () {
    let myMainNav = document.getElementById("main-nav");
    let myTopVal = myMainNav.offsetTop;
    if (myTopVal === -108) {
      ToggleMenuBar();
    }
  }, 6000);
};



function afterLogout() {
  window.sessionStorage.removeItem('myRandomVar');
  vendorCar = false;
  categoryCar = false;
  emptyVendorSelect();
  emptyBusVendorSelect();
  emptyHomeVendorSelect();
  emptyOtherVendorSelect();
  emptyRentalVendorSelect();
  // emptyCategorySelect();
  // emptyBusCategorySelect();
  // emptyHomeCategorySelect();
  // emptyOtherCategorySelect();
  // emptyRentalCategorySelect();
  emptyIncomeVendorSelect();
  var isDisabledLogin = $("#navLogin").hasClass("disabled");
  if (isDisabledLogin) {
    //console.log("Login is getting enabled");
    myDOMs.nav.Login.classList.remove("disabled");
  }

  var isDisabledLogout = $("#navLogout").hasClass("disabled");
  if (!isDisabledLogout) {
    //console.log("Logout is getting disabled");
    myDOMs.nav.Logout.classList.add("disabled");
  }

  myDOMs.nav.UserLogName.innerText = "";
  loggedIn = "";
}

async function afterLogin(userName) {
  loggedIn = userName;
  var isDisabledLogin = $("#navLogin").hasClass("disabled");
  if (!isDisabledLogin) {
    //console.log("Login is getting disabled");
    myDOMs.nav.Login.classList.add("disabled");
  }
  var isDisabledLogout = $("#navLogout").hasClass("disabled");
  if (isDisabledLogout) {
    //console.log("Logout is getting enabled");
    myDOMs.nav.Logout.classList.remove("disabled");
  }

  var isDisabledRegister = $("#navRegister").hasClass("disabled");
  if (!isDisabledRegister) {
    //console.log("Logout is getting enabled");
    myDOMs.nav.Register.classList.add("disabled");
  }
  verifyAllLocalStorageForSettings();
  myDOMs.nav.UserLogName.innerText = `${userName} - Logged In`;
  // await populateBusinessCategories();
  // await populateHomeCategories();
  // await populateOtherCategories();
  // await populateRentalCategories();
  // await populateVehicleCategories();
  await populateVehicleVendors();
  await populateBusinessVendors();
  await populateHomeVendors();
  await populateOtherVendors();
  await populateRentalVendors();
  await populateIncomeVendors();
  await getMiscData();

  await getAllMainData();
  await getVehiclePercentage();
  fillMainDataFromArrays();
  fillAcctBalance();
}

function getUserMe() {
  $.ajax({
    method: "GET",
    url: `${serverURL}users/me`,
    data: {
      auth: window.sessionStorage.getItem('myRandomVar')
    }
  })
    .done(function (myUser) {
      let myFirst = myUser.firstName;
      let myLast = myUser.lastName;
      let myEmail = myUser.email;
      let myID = myUser._id;
      let myMsg = [
        `Welcome ${myFirst} ${myLast}`,
        `Your ID: ${myID}`,
        `Your Email: ${myEmail}`
      ];
      displayAlert(
        myDOMs.main.AlertContainer,
        "mainAlert",
        "closeBtnAlertMain",
        "Authorized! ",
        myMsg,
        " ",
        "GREEN",
        6000
      );
    })
    .fail(function (e) {
      let myFailMsg = [`The Server was Unable to Authorize Login Credentials!`];
      displayAlert(
        myDOMs.main.AlertContainer,
        "mainAlert",
        "closeBtnAlertMain",
        "Unauthorized! ",
        myFailMsg,
        " ",
        "RED",
        6000
      );
    });
}

function loginUser() {
  let tempdata = {
    firstName: myDOMs.userLoginModal.FirstName.value,
    lastName: myDOMs.userLoginModal.LastName.value,
    email: myDOMs.userLoginModal.Email.value,
    password: myDOMs.userLoginModal.Password.value
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}users/login`,
    dataType: "json",
    data: tempdata
  })
    .done(function (data) {
      let myMsg = [
        `Welcome ${data.firstName} ${data.lastName}`,
        `Your Email: ${data.email}`
      ];

      displayAlert(
        myDOMs.userLoginModal.AlertContainer,
        "AlertUserLogin",
        "closeBtnAlertUserLogin",
        "Successful Login! ",
        myMsg,
        " ",
        "GREEN",
        6000
      );
      window.sessionStorage.setItem('myRandomVar', data.token);
      userEmail = tempdata.email;
      afterLogin(tempdata.firstName);
      myDOMs.userLoginModal.Form.reset();
    })
    .fail(function (e) {
      let myMsg = [e.responseText];
      displayAlert(
        myDOMs.userLoginModal.AlertContainer,
        "AlertUserLogin",
        "closeBtnAlertUserLogin",
        "Login Error! ",
        myMsg,
        " ",
        "RED",
        6000
      );
    });
}
let myAlert;

function displayAlert(
  curAlertContainer,
  curAlertID,
  closeBtnID,
  boldText,
  moreText,
  tempID,
  alertType,
  dismissTime
) {
  // this code checks for children nodes and removes if true

  if (curAlertContainer.hasChildNodes()) {
    while (curAlertContainer.firstChild) {
      curAlertContainer.removeChild(curAlertContainer.firstChild);
    }
  }

  if (alertType === "RED") {
    myAlert = document.createElement("div");
    myAlert.setAttribute(
      "class",
      "alert alert-danger alert-dismissible collapse"
    );
  } else if (alertType === "GREEN") {
    myAlert = document.createElement("div");
    myAlert.setAttribute(
      "class",
      "alert alert-success alert-dismissible collapse"
    );
  }


  myAlert.setAttribute("id", curAlertID);

  let myBtn = document.createElement("button");
  myBtn.setAttribute("class", "close");
  myBtn.setAttribute("id", closeBtnID);
  myBtn.setAttribute("data-toogle", "tooltip");
  myBtn.setAttribute("title", "Close Message!");

  if (curAlertID === "mainAlert") {
    myBtn.setAttribute("onclick", "hideAlert('mainAlert')");
  } else if (curAlertID === "AlertUserLogin") {
    myBtn.setAttribute("onclick", "hideAlert('AlertUserLogin')");
  } else if (curAlertID === "carExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('carExpAlert')");
  } else if (curAlertID === "carExpAlertUser") {
    myBtn.setAttribute("onclick", "hideAlert('carExpAlertUser')");
  } else if (curAlertID === "busExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('busExpAlert')");
  } else if (curAlertID === "homeExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('homeExpAlert')");
  } else if (curAlertID === "otherExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('otherExpAlert')");
  } else if (curAlertID === "rentalExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('rentalExpAlert')");
  } else if (curAlertID === "incomeExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('incomeExpAlert')");
  } else if (curAlertID === "alertContainerVehicleLog") {
    myBtn.setAttribute("onclick", "hideAlert('alertContainerVehicleLog')");
  } else if (curAlertID === "HSTPaymentExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('HSTPaymentExpAlert')");
  } else if (curAlertID === "PSTPaymentExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('PSTPaymentExpAlert')");
  } else if (curAlertID === "TAXPaymentExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('TAXPaymentExpAlert')");
  } else if (curAlertID === "FixedAssetAlert") {
    myBtn.setAttribute("onclick", "hideAlert('FixedAssetAlert')");
  }



  let btnText = document.createTextNode("x");
  myBtn.appendChild(btnText);

  let myStrongTag = document.createElement("strong");

  let myStrongTextNode = document.createTextNode(boldText);
  myStrongTag.appendChild(myStrongTextNode);
  myAlert.appendChild(myStrongTag);

  for (i = 0; i < moreText.length; i++) {
    let myMoreText = document.createTextNode(moreText[i]);
    let myBreakTag = document.createElement("br");
    myAlert.appendChild(myBreakTag);
    myAlert.appendChild(myMoreText);
  }

  let myIDText;
  if (tempID !== " ") {
    myIDText = document.createTextNode(`${tempID}`);
    myAlert.appendChild(myIDText);
  }

  myAlert.appendChild(myBtn);

  curAlertContainer.appendChild(myAlert);

  $(`#${curAlertID}`).show("fade");

  if (dismissTime === 0) {
  } else {
    setTimeout(function () {
      $(`#${curAlertID}`).hide("fade");
    }, dismissTime);
  }
}
function hideAlert(AlertID) {
  $(`#${AlertID}`).hide("fade");
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;

  if (myTopVal === -108 && AlertID === 'mainAlert') {
    ToggleMenuBar();
  }
};

function hideTableAlert() {
  $("#mainTableAlert").hide("fade");
  lastReportPageRowCount = 0;
  currentTablePage = 0;
  currentTablePages = 0;
  rowCountPerPage = rowCountPerPageDefault;
  emptyReportArrays();
  removeTblNavAlertChildNodes();
  removeVlogTblNavAlertChildNodes();
  TableOpen = false;
  if (reOpenIncomeStatement) {
    reOpenIncomeStatement = false;
    displayIncomeStatementModal();
    return;
  }

  ToggleMenuBar();

};

function removeVlogTblNavAlertChildNodes() {
  if (vLoga !== undefined) {
    if (vLoga.hasChildNodes()) {
      while (vLoga.firstChild) {
        vLoga.removeChild(vLoga.firstChild);
      }
    }
  }

  if (vLogli !== undefined) {
    if (vLogli.hasChildNodes()) {
      while (vLogli.firstChild) {
        vLogli.removeChild(vLogli.firstChild);
      }
    }
  }

  if (vLogul !== undefined) {
    if (vLogul.hasChildNodes()) {
      while (vLogul.firstChild) {
        vLogul.removeChild(vLogul.firstChild);
      }
    }
  }

  if (vLognav !== undefined) {
    if (vLognav.hasChildNodes()) {
      while (vLognav.firstChild) {
        vLognav.removeChild(vLognav.firstChild);
      }
    }
  }

  if (vLogStrongTag !== undefined) {
    if (vLogStrongTag.hasChildNodes()) {
      while (vLogStrongTag.firstChild) {
        vLogStrongTag.removeChild(vLogStrongTag.firstChild);
      }
    }
  }

  if (vLogtbl !== undefined) {
    if (vLogtbl.hasChildNodes()) {
      while (vLogtbl.firstChild) {
        vLogtbl.removeChild(vLogtbl.firstChild);
      }
    }
  }

  if (vLogresponsiveDiv !== undefined) {
    if (vLogresponsiveDiv.hasChildNodes()) {
      while (vLogresponsiveDiv.firstChild) {
        vLogresponsiveDiv.removeChild(vLogresponsiveDiv.firstChild);
      }
    }
  }

  if (myvLogAlert !== undefined) {
    if (myvLogAlert.hasChildNodes()) {
      while (myvLogAlert.firstChild) {
        myvLogAlert.removeChild(myvLogAlert.firstChild);
      }
    }
  }

  if (myDOMs.main.AlertContainer.hasChildNodes()) {
    while (myDOMs.main.AlertContainer.firstChild) {
      myDOMs.main.AlertContainer.removeChild(myDOMs.main.AlertContainer.firstChild);
    }
  }

};

function removeTblNavAlertChildNodes() {
  if (a !== undefined) {
    if (a.hasChildNodes()) {
      while (a.firstChild) {
        a.removeChild(a.firstChild);
      }
    }
  }

  if (li !== undefined) {
    if (li.hasChildNodes()) {
      while (li.firstChild) {
        li.removeChild(li.firstChild);
      }
    }
  }

  if (ul !== undefined) {
    if (ul.hasChildNodes()) {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    }
  }

  if (nav !== undefined) {
    if (nav.hasChildNodes()) {
      while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
      }
    }
  }

  if (myStrongTag !== undefined) {
    if (myStrongTag.hasChildNodes()) {
      while (myStrongTag.firstChild) {
        myStrongTag.removeChild(myStrongTag.firstChild);
      }
    }
  }

  if (tbl !== undefined) {
    if (tbl.hasChildNodes()) {
      while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild);
      }
    }
  }

  if (responsiveDiv !== undefined) {
    if (responsiveDiv.hasChildNodes()) {
      while (responsiveDiv.firstChild) {
        responsiveDiv.removeChild(responsiveDiv.firstChild);
      }
    }
  }

  if (myTableAlert !== undefined) {
    if (myTableAlert.hasChildNodes()) {
      while (myTableAlert.firstChild) {
        myTableAlert.removeChild(myTableAlert.firstChild);
      }
    }
  }

  if (myDOMs.main.AlertContainer.hasChildNodes()) {
    while (myDOMs.main.AlertContainer.firstChild) {
      myDOMs.main.AlertContainer.removeChild(myDOMs.main.AlertContainer.firstChild);
    }
  }

};

function registerUser() {
  let myNewDateTemp = new Date();
  let myNewDate = new Date(myNewDateTemp.getUTCFullYear(), myNewDateTemp.getUTCMonth(), myNewDateTemp.getUTCDate());
  myNewDate.setUTCHours(0);
  myNewDate.setUTCDate(myNewDate.getUTCDate() - 1);
  mydata = {
    firstName: myDOMs.userSetupModal.FirstName.value,
    lastName: myDOMs.userSetupModal.LastName.value,
    email: myDOMs.userSetupModal.Email.value,
    password: myDOMs.userSetupModal.Password.value,
    ExpireDate: myNewDate
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}users`,
    dataType: "json",
    data: mydata,
    success: function (data, textStatus, request) {
      let myObjMsg = [`${data.firstName} ${data.lastName}`, `${data.email}`];

      displayAlert(
        myDOMs.userSetupModal.AlertContainer,
        "carExpAlertUser",
        "closeBtnAlertUser",
        "New User added Successfully! ",
        myObjMsg,
        `User ID: ${data._id}`,
        "GREEN",
        6000
      );
      window.sessionStorage.setItem('myRandomVar', data.token);
      afterLogin(mydata.firstName);
      myDOMs.userSetupModal.Form.reset();
    },
    error: function (error) {
      if (error.responseJSON === undefined) {
        let myObjMsg;
        if (error.readyState === 0) {
          myObjMsg = ["Connection Refused"];
        } else {
          myObjMsg = ["Unknown Problem"];
        }
        displayAlert(
          myDOMs.userSetupModal.AlertContainer,
          "carExpAlertUser",
          "closeBtnAlertUser",
          "User Setup Error! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      } else {
        let myObjMsg = [error.responseJSON.body, error.responseJSON.fix];
        displayAlert(
          myDOMs.userSetupModal.AlertContainer,
          "carExpAlertUser",
          "closeBtnAlertUser",
          `${error.responseJSON.title}! `,
          myObjMsg,
          " ",
          "RED",
          6000
        );
      }
    }
  });
};

function displayUserSetupModal() {
  if ($("#navRegister").hasClass("disabled")) {
    let myMsg = [
      "Which means you have already registered!",
      "If you are certain you have not registered",
      "Refresh the page to enable the menu."
    ];
    displayAlert(
      myDOMs.main.AlertContainer,
      "mainAlert",
      "closeBtnAlertMain",
      "You ARE logged in! ",
      myMsg,
      " ",
      "RED",
      10000
    );
    return;
  }
  $("#userSetupModal").modal();
  ToggleMenuBar();
};

function hideUserSetupModal() {

  $("#userSetupModal").modal('hide');
  ToggleMenuBar();

};

function displayLoginUser() {

  if ($("#navLogin").hasClass("disabled")) {
    displayAlert(
      myDOMs.main.AlertContainer,
      "mainAlert",
      "closeBtnAlertMain",
      "You ARE already logged in! ",
      "",
      " ",
      "RED",
      6000,
      ""
    );
    return;
  }
  $("#userLoginModal").modal('show');
  ToggleMenuBar();
};

function hideLoginUser() {

  $("#userLoginModal").modal('hide');
  ToggleMenuBar();

};

function setPasswordValidClass(myPassInput) {
  if (myPassInput === "first") {
    if (myDOMs.userSetupModal.Password.value.length >= 8) {
      if (myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.remove("is-invalid");
      }
      if (
        myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordValidMessage.innerText =
          "Your Password is not strong enough! (Min 8 character)";
      }
    }

    if (
      myDOMs.userSetupModal.Password.value ===
      myDOMs.userSetupModal.PasswordConfirm.value
    ) {
      if (myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.remove("is-invalid");
      }
      if (
        myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordValidMessage.innerText =
          "Your Passwords do not match!";
      }
    }
  } else if (myPassInput === "confirm") {
    if (
      myDOMs.userSetupModal.Password.value ===
      myDOMs.userSetupModal.PasswordConfirm.value &&
      myDOMs.userSetupModal.PasswordConfirm.value.length >= 8
    ) {
      if (
        myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.remove("is-invalid");
      }

      if (myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.remove("is-invalid");
      }
    } else {
      if (
        !myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordConfirmValidMessage.innerText =
          "Your Passwords do not match!";
      }
      if (!myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordValidMessage.innerText =
          "Your Passwords do not match!";
      }
    }
  }
};

function setChangePasswordValidClass(myPassInput) {
  if (myPassInput === "first") {
    if (myDOMs.Change_Password.Password_Input.value.length >= 8) {
      if (myDOMs.Change_Password.Password_Input.classList.contains("is-invalid")) {
        myDOMs.Change_Password.Password_Input.classList.remove("is-invalid");
      }
      if (
        myDOMs.Change_Password.Confirm_Password_Input.classList.contains("is-invalid")
      ) {
        myDOMs.Change_Password.Confirm_Password_Input.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.Change_Password.Password_Input.classList.contains("is-invalid")) {
        myDOMs.Change_Password.Password_Input.classList.add("is-invalid");
        myDOMs.Change_Password.Invalid_Msg.innerText =
          "Your Password is not strong enough! (Min 8 character)";
      }
    }

    if (
      myDOMs.Change_Password.Password_Input.value ===
      myDOMs.Change_Password.Confirm_Password_Input.value
    ) {
      if (myDOMs.Change_Password.Password_Input.classList.contains("is-invalid")) {
        myDOMs.Change_Password.Password_Input.classList.remove("is-invalid");
      }
      if (
        myDOMs.Change_Password.Confirm_Password_Input.classList.contains("is-invalid")
      ) {
        myDOMs.Change_Password.Confirm_Password_Input.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.Change_Password.Password_Input.classList.contains("is-invalid")) {
        myDOMs.Change_Password.Password_Input.classList.add("is-invalid");
        myDOMs.Change_Password.Invalid_Msg.innerText =
          "Your Passwords do not match!";
      }
    }
  } else if (myPassInput === "confirm") {
    if (
      myDOMs.Change_Password.Password_Input.value ===
      myDOMs.Change_Password.Confirm_Password_Input.value &&
      myDOMs.Change_Password.Confirm_Password_Input.value.length >= 8
    ) {
      if (
        myDOMs.Change_Password.Confirm_Password_Input.classList.contains("is-invalid")
      ) {
        myDOMs.Change_Password.Confirm_Password_Input.classList.remove("is-invalid");
      }

      if (myDOMs.Change_Password.Password_Input.classList.contains("is-invalid")) {
        myDOMs.Change_Password.Password_Input.classList.remove("is-invalid");
      }
    } else {
      if (
        !myDOMs.Change_Password.Confirm_Password_Input.classList.contains("is-invalid")
      ) {
        myDOMs.Change_Password.Confirm_Password_Input.classList.add("is-invalid");
        myDOMs.Change_Password.Invalid_Confirm_Msg.innerText =
          "Your Passwords do not match!";
      }
      if (!myDOMs.Change_Password.Password_Input.classList.contains("is-invalid")) {
        myDOMs.Change_Password.Password_Input.classList.add("is-invalid");
        myDOMs.Change_Password.Invalid_Msg.innerText =
          "Your Passwords do not match!";
      }
    }
  }
};

function setEmailValidClass(myPassInput) {
  if (myPassInput === "first") {
    if (
      myDOMs.userSetupModal.Email.value ===
      myDOMs.userSetupModal.EmailConfirm.value
    ) {
      if (myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.remove("is-invalid");
      }
      if (myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.EmailConfirm.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidMessage.innerText =
          "Your emails do not match!";
      }

      if (
        !myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.EmailConfirm.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidConfirmMessage.innerText =
          "Your Emails do not match!";
      }
    }
  } else if (myPassInput === "confirm") {
    if (
      myDOMs.userSetupModal.Email.value ===
      myDOMs.userSetupModal.EmailConfirm.value
    ) {
      if (myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.EmailConfirm.classList.remove("is-invalid");
      }

      if (myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.remove("is-invalid");
      }
    } else {
      if (
        !myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.EmailConfirm.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidConfirmMessage.innerText =
          "Your Emails do not match!";
      }
      if (!myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidMessage.innerText =
          "Your Emails do not match!";
      }
    }
  }
};

$("#userSetupModal").on("hidden.bs.modal", function () {
  myDOMs.userSetupModal.Form.reset();
});

$("#userLoginModal").on("hidden.bs.modal", function () {
  myDOMs.userLoginModal.Form.reset();
});

// code to Logout when browser is closed
window.addEventListener("beforeunload", function (event) {
  if (window.sessionStorage.getItem('myRandomVar') !== "" || window.sessionStorage.getItem('myRandomVar') !== null) {
    browserLogout();
  }
});

function updateFormButtons(myForm) {
  switch (myForm) {
    case 'Asset':
      if ($('#Asset_id').val() !== "") {
        if ($('#AssetSubmitBtn').hasClass("disabled")) {
        } else {
          $('#AssetSubmitBtn').addClass("disabled");
        }
        if ($('#AssetDeleteBtn').hasClass("disabled")) {
          $('#AssetDeleteBtn').removeClass("disabled");
        }
        if ($('#AssetSaveChangesBtn').hasClass("disabled")) {
          $('#AssetSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#AssetSubmitBtn').hasClass("disabled")) {
          $('#AssetSubmitBtn').removeClass("disabled");
        }
        if ($('#AssetDeleteBtn').hasClass("disabled")) {
        } else {
          $('#AssetDeleteBtn').addClass("disabled");
        }
        if ($('#AssetSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#AssetSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'TAXPayment':
      if ($('#taxBlindPaymentID').val() !== "") {
        if ($('#taxPaymentSubmitBtn').hasClass("disabled")) {
        } else {
          $('#taxPaymentSubmitBtn').addClass("disabled");
        }
        if ($('#taxPaymentDeleteBtn').hasClass("disabled")) {
          $('#taxPaymentDeleteBtn').removeClass("disabled");
        }
        if ($('#taxPaymentSaveChangesBtn').hasClass("disabled")) {
          $('#taxPaymentSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#taxPaymentSubmitBtn').hasClass("disabled")) {
          $('#taxPaymentSubmitBtn').removeClass("disabled");
        }
        if ($('#taxPaymentDeleteBtn').hasClass("disabled")) {
        } else {
          $('#taxPaymentDeleteBtn').addClass("disabled");
        }
        if ($('#taxPaymentSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#taxPaymentSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'PSTPayment':
      if ($('#pstBlindPaymentID').val() !== "") {
        if ($('#pstPaymentSubmitBtn').hasClass("disabled")) {
        } else {
          $('#pstPaymentSubmitBtn').addClass("disabled");
        }
        if ($('#pstPaymentDeleteBtn').hasClass("disabled")) {
          $('#pstPaymentDeleteBtn').removeClass("disabled");
        }
        if ($('#pstPaymentSaveChangesBtn').hasClass("disabled")) {
          $('#pstPaymentSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#pstPaymentSubmitBtn').hasClass("disabled")) {
          $('#pstPaymentSubmitBtn').removeClass("disabled");
        }
        if ($('#pstPaymentDeleteBtn').hasClass("disabled")) {
        } else {
          $('#pstPaymentDeleteBtn').addClass("disabled");
        }
        if ($('#pstPaymentSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#pstPaymentSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'HSTPayment':
      if ($('#hstBlindPaymentID').val() !== "") {
        if ($('#hstPaymentSubmitBtn').hasClass("disabled")) {
        } else {
          $('#hstPaymentSubmitBtn').addClass("disabled");
        }
        if ($('#hstPaymentDeleteBtn').hasClass("disabled")) {
          $('#hstPaymentDeleteBtn').removeClass("disabled");
        }
        if ($('#hstPaymentSaveChangesBtn').hasClass("disabled")) {
          $('#hstPaymentSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#hstPaymentSubmitBtn').hasClass("disabled")) {
          $('#hstPaymentSubmitBtn').removeClass("disabled");
        }
        if ($('#hstPaymentDeleteBtn').hasClass("disabled")) {
        } else {
          $('#hstPaymentDeleteBtn').addClass("disabled");
        }
        if ($('#hstPaymentSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#hstPaymentSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'income':
      if ($('#incomeBlindExpID').val() !== "") {
        if ($('#incomeExpBtn').hasClass("disabled")) {
        } else {
          $('#incomeExpBtn').addClass("disabled");
        }
        if ($('#incomeExpDeleteBtn').hasClass("disabled")) {
          $('#incomeExpDeleteBtn').removeClass("disabled");
        }
        if ($('#incomeExpSaveChangesBtn').hasClass("disabled")) {
          $('#incomeExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#incomeExpBtn').hasClass("disabled")) {
          $('#incomeExpBtn').removeClass("disabled");
        }
        if ($('#incomeExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#incomeExpDeleteBtn').addClass("disabled");
        }
        if ($('#incomeExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#incomeExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;

    case 'vehicle':
      if ($('#carBlindExpID').val() !== "") {
        if ($('#carExpBtn').hasClass("disabled")) {
        } else {
          $('#carExpBtn').addClass("disabled");
        }
        if ($('#carExpDeleteBtn').hasClass("disabled")) {
          $('#carExpDeleteBtn').removeClass("disabled");
        }
        if ($('#carExpSaveChangesBtn').hasClass("disabled")) {
          $('#carExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#carExpBtn').hasClass("disabled")) {
          $('#carExpBtn').removeClass("disabled");
        }
        if ($('#carExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#carExpDeleteBtn').addClass("disabled");
        }
        if ($('#carExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#carExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'business':
      if ($('#busBlindExpID').val() !== "") {
        if ($('#busExpBtn').hasClass("disabled")) {
        } else {
          $('#busExpBtn').addClass("disabled");
        }
        if ($('#busExpDeleteBtn').hasClass("disabled")) {
          $('#busExpDeleteBtn').removeClass("disabled");
        }
        if ($('#busExpSaveChangesBtn').hasClass("disabled")) {
          $('#busExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#busExpBtn').hasClass("disabled")) {
          $('#busExpBtn').removeClass("disabled");
        }
        if ($('#busExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#busExpDeleteBtn').addClass("disabled");
        }
        if ($('#busExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#busExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'home':
      if ($('#homeBlindExpID').val() !== "") {
        if ($('#homeExpBtn').hasClass("disabled")) {
        } else {
          $('#homeExpBtn').addClass("disabled");
        }
        if ($('#homeExpDeleteBtn').hasClass("disabled")) {
          $('#homeExpDeleteBtn').removeClass("disabled");
        }
        if ($('#homeExpSaveChangesBtn').hasClass("disabled")) {
          $('#homeExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#homeExpBtn').hasClass("disabled")) {
          $('#homeExpBtn').removeClass("disabled");
        }
        if ($('#homeExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#homeExpDeleteBtn').addClass("disabled");
        }
        if ($('#homeExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#homeExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'other':
      if ($('#otherBlindExpID').val() !== "") {
        if ($('#otherExpBtn').hasClass("disabled")) {
        } else {
          $('#otherExpBtn').addClass("disabled");
        }
        if ($('#otherExpDeleteBtn').hasClass("disabled")) {
          $('#otherExpDeleteBtn').removeClass("disabled");
        }
        if ($('#otherExpSaveChangesBtn').hasClass("disabled")) {
          $('#otherExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#otherExpBtn').hasClass("disabled")) {
          $('#otherExpBtn').removeClass("disabled");
        }
        if ($('#otherExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#otherExpDeleteBtn').addClass("disabled");
        }
        if ($('#otherExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#otherExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'rental':
      if ($('#rentalBlindExpID').val() !== "") {
        if ($('#rentalExpBtn').hasClass("disabled")) {
        } else {
          $('#rentalExpBtn').addClass("disabled");
        }
        if ($('#rentalExpDeleteBtn').hasClass("disabled")) {
          $('#rentalExpDeleteBtn').removeClass("disabled");
        }
        if ($('#rentalExpSaveChangesBtn').hasClass("disabled")) {
          $('#rentalExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#rentalExpBtn').hasClass("disabled")) {
          $('#rentalExpBtn').removeClass("disabled");
        }
        if ($('#rentalExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#rentalExpDeleteBtn').addClass("disabled");
        }
        if ($('#rentalExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#rentalExpSaveChangesBtn').addClass("disabled");
        }
      }
  }
}


function ResizeImage(mySource) {
  let filesToUploads;
  // if (window.File && window.FileReader && window.FileList && window.Blob) {
  switch (mySource) {
    case 'BusExp':
      filesToUploads = document.getElementById('imgloadBus').files;
      break;
    case 'CarExp':
      filesToUploads = document.getElementById('imgload').files;
      break;
    case 'HomeExp':
      filesToUploads = document.getElementById('imgloadHome').files;
      break;
    case 'OtherExp':
      filesToUploads = document.getElementById('imgloadOther').files;
      break;
    case 'RentalExp':
      filesToUploads = document.getElementById('imgloadRental').files;
      break;
    case 'Income':
      filesToUploads = document.getElementById('imgloadIncome').files;
  }

  let file = filesToUploads[0];
  if (file) {
    readFile(file, mySource);
  }
};

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};


function processFile(dataURL, fileType, mySource) {
  var maxWidth = 900;
  var maxHeight = 900;

  var image = new Image();
  image.src = dataURL;

  image.onload = function () {
    var width = image.width;
    var height = image.height;
    var shouldResize = (width > maxWidth) || (height > maxHeight);

    if (!shouldResize) {
      sendFile(dataURL);
      return;
    }

    var newWidth;
    var newHeight;

    if (width > height) {
      newHeight = height * (maxWidth / width);
      newWidth = maxWidth;
    } else {
      newWidth = width * (maxHeight / height);
      newHeight = maxHeight;
    }

    var canvas = document.createElement('canvas');

    canvas.width = newWidth;
    canvas.height = newHeight;

    var context = canvas.getContext('2d');

    context.drawImage(this, 0, 0, newWidth, newHeight);

    dataURL = canvas.toDataURL(fileType);

    ImgReceiptToSend = dataURL;

    switch (mySource) {
      case 'BusExp':
        document.getElementById('myImgBus').src = dataURL;
        document.getElementById('myImgBusBlind').src = dataURL;
        break;
      case 'CarExp':
        document.getElementById('myImg').src = dataURL;
        document.getElementById('myImgBlind').src = dataURL;
        break;
      case 'HomeExp':
        document.getElementById('myImgHome').src = dataURL;
        document.getElementById('myImgHomeBlind').src = dataURL;
        break;
      case 'OtherExp':
        document.getElementById('myImgOther').src = dataURL;
        document.getElementById('myImgOtherBlind').src = dataURL;
        break;
      case 'RentalExp':
        document.getElementById('myImgRental').src = dataURL;
        document.getElementById('myImgRentalBlind').src = dataURL;
        break;
      case 'Income':
        document.getElementById('myImgIncome').src = dataURL;
        document.getElementById('myImgIncomeBlind').src = dataURL;
    }
  };

  image.onerror = function () {
    alert('There was an error processing your file!');
  };
}


function readFile(file, mySource) {
  var reader = new FileReader();

  reader.onloadend = function () {
    processFile(reader.result, file.typ, mySource);
  }

  reader.onerror = function () {
    alert('There was an error reading the file!');
  }

  reader.readAsDataURL(file);
}

function startPaymentMethod() {

  let formData = new FormData();
  formData.append("auth", window.sessionStorage.getItem('myRandomVar'));

  $.ajax({
    method: "POST",
    url: `${serverURL}payPal`,
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false
  })
    .done(async function (data) {
      window.open(data);

    })
    .fail(function (err) {
      alert(JSON.stringify(err, undefined, 2));
      alert("Payment was NOT completed Successfully!");
    });


};


function displayUserProfile() {
  $("#userProfileModal").modal("show");
};

function hideUserProfile() {
  $("#userProfileModal").modal("hide");
};


function hideyUserChangePasswordModal() {
  $('#userChangePasswordModal').modal("hide");
};

function runChangePasswordBtn() {
  $('#userChangePasswordModal').modal("show");
  hideUserProfile();

};