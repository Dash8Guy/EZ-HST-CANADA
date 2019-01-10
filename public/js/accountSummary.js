
let ASStartDate;
let ASEndDate;

async function displayAccountSummaryModal() {
   $("#AccountSummaryModal").modal("show");
   await getDataRequired();
   myDOMs.AccountSummary.TimePeriodSeletor.value = 'Year';
   ASStartDate = new Date(myDOMs.randomData.appYear, 0, 1);
   ASEndDate = new Date(myDOMs.randomData.appYear, 11, 31);
   updatedViewDynamicData(ASStartDate, ASEndDate, false);

   let myMainNav = document.getElementById("main-nav");
   let myTopVal = myMainNav.offsetTop;
   if (myTopVal === 0) {
      ToggleMenuBar();
   }
};

function hideAccountSummaryModal() {
   $("#AccountSummaryModal").modal("hide");
   let myMainNav = document.getElementById("main-nav");
   let myTopVal = myMainNav.offsetTop;
   if (myTopVal === -108) {
      ToggleMenuBar();
   }
};


async function getDataRequired() {
   let TempArray = [];
   await getASBusIncomeData();
   await getASRentalIncomeData();
   await getASAllPaymentData();
   AddPaymentsToIncomeArrays();
   TempArray = BusAcctArray.concat(RentalAcctArray);
   AccountArray = TempArray.concat(PaymentAcctArray);
   await sortAccountArrayByDate();
   await addMathColumnsToArray();
};


function getASBusIncomeData() {
   let tempData;

   tempData = {
      auth: myToken,
      startYear: myDOMs.randomData.appYear,
      startMonth: 0,
      startDay: 1,
      endYear: myDOMs.randomData.appYear,
      endMonth: 11,
      endDay: 31
   };

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "GET",
         url: `${serverURL}busIncome`,
         data: tempData,
         enctype: "multipart/form-data"
      })
         .done(function (data) {
            resolve(data);
            // console.dir(JSON.stringify(data, undefined, 2));
            BusAcctArray = data.busIncome;
         })
         .fail(function (e) {
            if (e.readyState === 0 || myToken === '') {
               reject("You Must be logged in before using EZ-HST-CANADA!");
               alert('You Must be logged in before using EZ-HST-CANADA>')
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });


};

function getASRentalIncomeData() {
   let tempData;

   tempData = {
      auth: myToken,
      startYear: myDOMs.randomData.appYear,
      startMonth: 0,
      startDay: 1,
      endYear: myDOMs.randomData.appYear,
      endMonth: 11,
      endDay: 31
   };


   return new Promise((resolve, reject) => {
      $.ajax({
         method: "GET",
         url: `${serverURL}rentalIncome`,
         data: tempData,
         enctype: "multipart/form-data"
      })
         .done(function (data) {
            resolve(data);
            // console.dir(JSON.stringify(data, undefined, 2));
            RentalAcctArray = data.rentalIncome;
         })
         .fail(function (e) {
            if (e.readyState === 0 || myToken === '') {
               reject("You Must be logged in before using EZ-HST-CANADA!");
               alert('You Must be logged in before using EZ-HST-CANADA')
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });



}

function getASAllPaymentData() {
   let tempData;

   tempData = {
      auth: myToken,
      startYear: myDOMs.randomData.appYear,
      startMonth: 0,
      startDay: 1,
      endYear: myDOMs.randomData.appYear,
      endMonth: 11,
      endDay: 31
   };
   return new Promise((resolve, reject) => {
      $.ajax({
         method: "GET",
         url: `${serverURL}payments`,
         data: tempData,
         enctype: "multipart/form-data"
      })
         .done(function (data) {
            resolve(data);
            PaymentAcctArray = data.paymentEntries;
            AddCarDateToArray();
         })
         .fail(function (e) {
            if (e.readyState === 0 || myToken === '') {
               reject("You Must be logged in before using EZ-HST-CANADA!");
               alert('You Must be logged in before using EZ-HST-CANADA')
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });
};


myDOMs.AccountSummary.TimePeriodSeletor.addEventListener('change', function (event) {
   runTimePeriodChangeMethod();
});

myDOMs.AccountSummary.IncludeCheckBox.addEventListener('click', function (event) {
   runTimePeriodChangeMethod();
});

function runTimePeriodChangeMethod() {
   switch (myDOMs.AccountSummary.TimePeriodSeletor.value) {
      case 'Year':
         ASStartDate = new Date(myDOMs.randomData.appYear, 0, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 11, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Year Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Q1':
         ASStartDate = new Date(myDOMs.randomData.appYear, 0, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 2, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = '1st-¼ Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Q2':
         ASStartDate = new Date(myDOMs.randomData.appYear, 3, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 5, 30);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = '2nd-¼ Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Q3':
         ASStartDate = new Date(myDOMs.randomData.appYear, 6, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 8, 30);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = '3rd-¼ Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Q4':
         ASStartDate = new Date(myDOMs.randomData.appYear, 9, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 11, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = '4th-¼ Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Jan':
         ASStartDate = new Date(myDOMs.randomData.appYear, 0, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 0, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Jan Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Feb':
         ASStartDate = new Date(myDOMs.randomData.appYear, 1, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 1, 28);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Feb Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Mar':
         ASStartDate = new Date(myDOMs.randomData.appYear, 2, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 2, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Mar Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Apr':
         ASStartDate = new Date(myDOMs.randomData.appYear, 3, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 3, 30);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Apr Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'May':
         ASStartDate = new Date(myDOMs.randomData.appYear, 4, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 4, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'May Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Jun':
         ASStartDate = new Date(myDOMs.randomData.appYear, 5, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 5, 30);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Jun Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Jul':
         ASStartDate = new Date(myDOMs.randomData.appYear, 6, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 6, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Jul Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Aug':
         ASStartDate = new Date(myDOMs.randomData.appYear, 7, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 7, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Aug Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Sep':
         ASStartDate = new Date(myDOMs.randomData.appYear, 8, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 8, 30);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Sep Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Oct':
         ASStartDate = new Date(myDOMs.randomData.appYear, 9, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 9, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Oct Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Nov':
         ASStartDate = new Date(myDOMs.randomData.appYear, 10, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 10, 30);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Nov Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
         break;
      case 'Dec':
         ASStartDate = new Date(myDOMs.randomData.appYear, 11, 1);
         ASEndDate = new Date(myDOMs.randomData.appYear, 11, 31);
         myDOMs.AccountSummary.AmountandTimeTitle.innerText = 'Dec Amt';
         updatedViewDynamicData(ASStartDate, ASEndDate, false);
   }
};

function updatedViewDynamicData(StartDate, EndDate, ForMainPage) {
   let DateOne = new Date(myDOMs.randomData.appYear, 0, 1);
   let IncludeStart = myDOMs.AccountSummary.IncludeCheckBox.checked;
   let runningGrossRevBus = 0;
   let runningGrossIncBus = 0;
   let runningGroosIncRevRental = 0;
   let runningNetIncBusRental = 0;

   let runningHSTGrossRev = 0;
   let runningPSTGrossRev = 0;
   let runningTaxGrossInc = 0;
   let runningCPP = 0;

   let runningHSTPayment = 0;
   let runningPSTPayment = 0;
   let runningTaxPayment = 0;

   let curProvAmt = 0;
   let curFedAmt = 0;
   let YearRunningCPP = 0;
   let CurrentELCPP = 0;
   let CurrentELNetIncome = 0;
   let YearrunningNetIncBusRental = 0;

   BusAcctArray.forEach((el, index) => {
      if (IncludeStart) {
         if (Date.parse(el.carDate) >= Date.parse(DateOne) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
            runningGrossIncBus += el.carnetAmt;
            runningGrossRevBus += el.carTotalAmt;
         }
      } else {
         if (Date.parse(el.carDate) >= Date.parse(StartDate) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
            runningGrossIncBus += el.carnetAmt;
            runningGrossRevBus += el.carTotalAmt;
         }
      }
   });

   RentalAcctArray.forEach((el, index) => {
      if (IncludeStart) {
         if (Date.parse(el.carDate) >= Date.parse(DateOne) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
            runningGroosIncRevRental += el.carTotalAmt;
         }
      } else {
         if (Date.parse(el.carDate) >= Date.parse(StartDate) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
            runningGroosIncRevRental += el.carTotalAmt;
         }
      }
   });

   AccountArray.forEach((el, index) => {
      if (Date.parse(el.carDate) <= Date.parse(EndDate)) {

         if (IncludeStart) {
            if (Date.parse(el.carDate) >= Date.parse(DateOne) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
               runningNetIncBusRental += (el.carnetAmt - el.taxes - el.CPP);
               runningHSTGrossRev += el.carhstAmt;
               runningPSTGrossRev += el.carpstAmt;
               runningTaxGrossInc += el.taxes;
               runningCPP += el.CPP;
            }
         } else {
            if (Date.parse(el.carDate) >= Date.parse(StartDate) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
               runningNetIncBusRental += (el.carnetAmt - el.taxes - el.CPP);
               runningHSTGrossRev += el.carhstAmt;
               runningPSTGrossRev += el.carpstAmt;
               runningTaxGrossInc += el.taxes;
               runningCPP += el.CPP;
            }
         }
      }
   });

   PaymentAcctArray.forEach((el, index) => {
      if (IncludeStart) {
         if (Date.parse(el.carDate) >= Date.parse(DateOne) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
            runningHSTPayment += Number(el.hstAmt);
            runningPSTPayment += Number(el.pstAmt);
            runningTaxPayment += Number(el.taxAmt);
         }
      } else {
         if (Date.parse(el.carDate) >= Date.parse(StartDate) & Date.parse(el.carDate) <= Date.parse(EndDate)) {
            runningHSTPayment += Number(el.hstAmt);
            runningPSTPayment += Number(el.pstAmt);
            runningTaxPayment += Number(el.taxAmt);
         }
      }
   });

   if (ForMainPage) {
      myDOMs.main_page.AccountBalance.value = `$${formatNumber(((runningHSTGrossRev + runningPSTGrossRev + runningTaxGrossInc + runningCPP) - (runningHSTPayment + runningPSTPayment + runningTaxPayment)).toFixed(2))}`;
   } else {
      FillAcctSummaryTotalsPart1(runningGrossRevBus, runningGrossIncBus, runningGroosIncRevRental, runningNetIncBusRental);
      FillAcctSummaryPart2(runningHSTGrossRev, runningPSTGrossRev, runningTaxGrossInc, runningCPP, runningHSTPayment, runningPSTPayment, runningTaxPayment);
   }



};

function FillAcctSummaryTotalsPart1(runningGrossRevBus, runningGrossIncBus, runningGroosIncRevRental, runningNetIncBusRental) {
   myDOMs.AccountSummary.GrossRevBus.innerText = `$${formatNumber(runningGrossRevBus.toFixed(2))}`;
   myDOMs.AccountSummary.GrossIncBus.innerText = `$${formatNumber(runningGrossIncBus.toFixed(2))}`;
   myDOMs.AccountSummary.GrossIncRental.innerText = `$${formatNumber(runningGroosIncRevRental.toFixed(2))}`;
   myDOMs.AccountSummary.NetIncome.innerText = `$${formatNumber(runningNetIncBusRental.toFixed(2))}`;
};

function FillAcctSummaryPart2(runningHSTGrossRev, runningPSTGrossRev, runningTaxGrossInc, runningCPP, runningHSTPayment, runningPSTPayment, runningTaxPayment) {
   myDOMs.AccountSummary.HSTGrossRev.innerText = `$${formatNumber(runningHSTGrossRev.toFixed(2))}`;
   myDOMs.AccountSummary.PSTGrossRev.innerText = `$${formatNumber(runningPSTGrossRev.toFixed(2))}`;
   myDOMs.AccountSummary.TAXGrossInc.innerText = `$${formatNumber(runningTaxGrossInc.toFixed(2))}`;
   myDOMs.AccountSummary.CPP.innerText = `$${formatNumber(runningCPP.toFixed(2))}`;
   myDOMs.AccountSummary.HSTPayment.innerText = `$${formatNumber(runningHSTPayment.toFixed(2))}`;
   myDOMs.AccountSummary.PSTPayments.innerText = `$${formatNumber(runningPSTPayment.toFixed(2))}`;
   myDOMs.AccountSummary.TAXPayments.innerText = `$${formatNumber(runningTaxPayment.toFixed(2))}`;
   myDOMs.AccountSummary.TotalDeductionGrossInc.innerText = `$${formatNumber((runningTaxGrossInc + runningCPP).toFixed(2))}`;
   myDOMs.AccountSummary.TotalIN.innerText = `$${formatNumber((runningHSTGrossRev + runningPSTGrossRev + runningTaxGrossInc + runningCPP).toFixed(2))}`;
   myDOMs.AccountSummary.TotalOUT.innerText = `$${formatNumber((runningHSTPayment + runningPSTPayment + runningTaxPayment).toFixed(2))}`;
   myDOMs.AccountSummary.BusAcctBal.innerText = `$${formatNumber(((runningHSTGrossRev + runningPSTGrossRev + runningTaxGrossInc + runningCPP) - (runningHSTPayment + runningPSTPayment + runningTaxPayment)).toFixed(2))}`;
};
