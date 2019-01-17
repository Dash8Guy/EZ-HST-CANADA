
let vLogArray = [];

let amtPersJanV1 = 0;
let amtPersFebV1 = 0;
let amtPersMarV1 = 0;
let amtPersAprV1 = 0;
let amtPersMayV1 = 0;
let amtPersJunV1 = 0;
let amtPersJulV1 = 0;
let amtPersAugV1 = 0;
let amtPersSepV1 = 0;
let amtPersOctV1 = 0;
let amtPersNovV1 = 0;
let amtPersDecV1 = 0;

let amtPersJanV2 = 0;
let amtPersFebV2 = 0;
let amtPersMarV2 = 0;
let amtPersAprV2 = 0;
let amtPersMayV2 = 0;
let amtPersJunV2 = 0;
let amtPersJulV2 = 0;
let amtPersAugV2 = 0;
let amtPersSepV2 = 0;
let amtPersOctV2 = 0;
let amtPersNovV2 = 0;
let amtPersDecV2 = 0;

let amtBusJanV1 = 0;
let amtBusFebV1 = 0;
let amtBusMarV1 = 0;
let amtBusAprV1 = 0;
let amtBusMayV1 = 0;
let amtBusJunV1 = 0;
let amtBusJulV1 = 0;
let amtBusAugV1 = 0;
let amtBusSepV1 = 0;
let amtBusOctV1 = 0;
let amtBusNovV1 = 0;
let amtBusDecV1 = 0;

let amtBusJanV2 = 0;
let amtBusFebV2 = 0;
let amtBusMarV2 = 0;
let amtBusAprV2 = 0;
let amtBusMayV2 = 0;
let amtBusJunV2 = 0;
let amtBusJulV2 = 0;
let amtBusAugV2 = 0;
let amtBusSepV2 = 0;
let amtBusOctV2 = 0;
let amtBusNovV2 = 0;
let amtBusDecV2 = 0;

let BusPercJanV1 = 0;
let BusPercFebV1 = 0;
let BusPercMarV1 = 0;
let BusPercAprV1 = 0;
let BusPercMayV1 = 0;
let BusPercJunV1 = 0;
let BusPercJulV1 = 0;
let BusPercAugV1 = 0;
let BusPercSepV1 = 0;
let BusPercOctV1 = 0;
let BusPercNovV1 = 0;
let BusPercDecV1 = 0;

let BusPercJanV2 = 0;
let BusPercFebV2 = 0;
let BusPercMarV2 = 0;
let BusPercAprV2 = 0;
let BusPercMayV2 = 0;
let BusPercJunV2 = 0;
let BusPercJulV2 = 0;
let BusPercAugV2 = 0;
let BusPercSepV2 = 0;
let BusPercOctV2 = 0;
let BusPercNovV2 = 0;
let BusPercDecV2 = 0;


let BusinessPercentYearV1 = 0;
let BusinessPercentQ1V1 = 0;
let BusinessPercentQ2V1 = 0;
let BusinessPercentQ3V1 = 0;
let BusinessPercentQ4V1 = 0;
let BusinessTotalV1 = 0;
let PersonalTotalV1 = 0;
let TotalV1 = 0;

let BusinessPercentYearV2 = 0;
let BusinessPercentQ1V2 = 0;
let BusinessPercentQ2V2 = 0;
let BusinessPercentQ3V2 = 0;
let BusinessPercentQ4V2 = 0;
let BusinessTotalV2 = 0;
let PersonalTotalV2 = 0;
let TotalV2 = 0;

async function displayVehicleLogModal() {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      return;
   }
   let tempZero = 0;
   $("#vehicleLogModal").modal("show");
   ToggleMenuBar();
   await getAllVehicleLogs();
   myDOMs.vehicleLog.DateLog.value = myDOMs.main_page.StartDate.value;
   myDOMs.vehicleLog.Selector.value = "Vehicle 1";
   if (vLogArray[0] === undefined) {
      myDOMs.vehicleLog.PerKMInput.value = tempZero.toFixed(1);
      myDOMs.vehicleLog.BusKMInput.value = tempZero.toFixed(1);
   } else {
      if (vLogArray[0].PersKMV1 === undefined) {
         myDOMs.vehicleLog.PerKMInput.value = tempZero.toFixed(1);
      } else {
         myDOMs.vehicleLog.PerKMInput.value = vLogArray[0].PersKMV1.toFixed(1);
      }
      if (vLogArray[0].BusKMV1 === undefined) {
         myDOMs.vehicleLog.BusKMInput.value = tempZero.toFixed(1);
      } else {
         myDOMs.vehicleLog.BusKMInput.value = vLogArray[0].BusKMV1.toFixed(1);
      }

   }

   let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)
   calculateBusinessPercentage(PercentsendDate);
};

function hideVehicleLogExpModal() {
   $("#vehicleLogModal").modal("hide");
   ToggleMenuBar();
}

myDOMs.vehicleLog.DateLog.addEventListener('change', function (e) {
   updateDisplayAfterDateChange();
});

function updateDisplayAfterDateChange() {
   let tempDate = new Date(myDOMs.vehicleLog.DateLog.value);

   updateLogData(tempDate);
   let tempDay = getDayofYear(tempDate);
   let tempMonth = tempDate.getUTCMonth() + 1;
   myDOMs.vehicleLog.DisplayDay.innerText = `Day - ${tempDay}`;
   myDOMs.vehicleLog.DisplayMonth.innerText = `Month - ${tempMonth}`;
   switch (tempMonth) {
      case 1:
      case 2:
      case 3:
         myDOMs.vehicleLog.DisplayQuarter.innerText = `Quarter - 1st`;
         break;
      case 4:
      case 5:
      case 6:
         myDOMs.vehicleLog.DisplayQuarter.innerText = `Quarter - 2nd`;
         break;
      case 7:
      case 8:
      case 9:
         myDOMs.vehicleLog.DisplayQuarter.innerText = `Quarter - 3rd`;
         break;
      case 10:
      case 11:
      case 12:
         myDOMs.vehicleLog.DisplayQuarter.innerText = `Quarter - 4th`;
         break;
   }

   myDOMs.vehicleLog.DisplayYear.innerText = `Year - ${tempDate.getUTCFullYear()}`;
}

myDOMs.vehicleLog.FirstBtn.addEventListener('click', function (e) {
   gotoFirstDay();
});

function gotoFirstDay() {
   let myDateTemp = new Date(myDOMs.main_page.StartDate.value);
   let myYearTemp = myDateTemp.getUTCFullYear();

   myDOMs.vehicleLog.DateLog.value = `${myYearTemp}-01-01`;
   updateDisplayAfterDateChange();
};

myDOMs.vehicleLog.PreviousBtn.addEventListener('click', function (e) {
   let tempDate = new Date(myDOMs.vehicleLog.DateLog.value);
   if (tempDate.getUTCMonth() === 0 && tempDate.getUTCDate() === 1) {
      return;
   }

   tempDate.setUTCDate(tempDate.getUTCDate() - 1);
   let myDay = tempDate.getUTCDate();
   let myMonth = tempDate.getUTCMonth() + 1;
   let myYear = tempDate.getUTCFullYear();
   if (myDay < 10) {
      myDay = `0${myDay}`;
   }
   if (myMonth < 10) {
      myMonth = `0${myMonth}`;
   }
   myDOMs.vehicleLog.DateLog.value = myYear + "-" + myMonth + "-" + myDay;
   updateDisplayAfterDateChange();
});

myDOMs.vehicleLog.NextBtn.addEventListener('click', function (e) {
   let tempDate = new Date(myDOMs.vehicleLog.DateLog.value);
   if (tempDate.getUTCMonth() === 11 && tempDate.getUTCDate() === 31) {
      return
   }

   tempDate.setUTCDate(tempDate.getUTCDate() + 1);
   let myDay = tempDate.getUTCDate();
   let myMonth = tempDate.getUTCMonth() + 1;
   let myYear = tempDate.getUTCFullYear();
   if (myDay < 10) {
      myDay = `0${myDay}`;
   }
   if (myMonth < 10) {
      myMonth = `0${myMonth}`;
   }
   myDOMs.vehicleLog.DateLog.value = myYear + "-" + myMonth + "-" + myDay;
   updateDisplayAfterDateChange();
});

myDOMs.vehicleLog.LastBtn.addEventListener('click', function (e) {
   let myDateTemp = new Date(myDOMs.main_page.StartDate.value);
   let myYearTemp = myDateTemp.getUTCFullYear();
   myDOMs.vehicleLog.DateLog.value = `${myYearTemp}-12-31`;
   updateDisplayAfterDateChange();
});

function updateCarLogHeader() {
   if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
      myDOMs.vehicleLog.Title.textContent = "Vehicle 1 Log Entry Form";
   } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
      myDOMs.vehicleLog.Title.textContent = "Vehicle 2 Log Entry Form";
   }
   let tempDate = new Date(myDOMs.vehicleLog.DateLog.value);
   updateLogData(tempDate);
};

function postVehicleLog() {
   let myDate = new Date(myDOMs.vehicleLog.DateLog.value);
   let myDayLogTemp = myDate.getUTCDate();
   let myMonthLogTemp = myDate.getUTCMonth();
   let myYearLogTemp = myDate.getUTCFullYear();

   if (new Date(dbMiscData.lockDate) >= myDate) {
      alert('Because the Vehicle Log Date is before or the same as the Lock Date \n The Vehicle Log Entry Form will not allow you to Save or Add any changes to this Date! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.');
      return;
   }

   // let myStartMonth = myDate.getMonth();
   // let myStartYear = myDate.getFullYear();
   // let myStartDay = myDate.getDate();
   // let sendDate = new Date(myStartYear, myStartMonth, myStartDay);
   let mydata;
   let changedVehicle;
   let PersAmt = Number(myDOMs.vehicleLog.PerKMInput.value)
   let BusAmt = Number(myDOMs.vehicleLog.BusKMInput.value)
   PersAmt = PersAmt.toFixed(1);
   BusAmt = BusAmt.toFixed(1);

   if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
      changedVehicle = '1';
      mydata = {
         startYear: myYearLogTemp,
         startMonth: myMonthLogTemp,
         startDay: myDayLogTemp,
         PersKMV1: myDOMs.vehicleLog.PerKMInput.value,
         BusKMV1: myDOMs.vehicleLog.BusKMInput.value,
         carNum: 1,
         auth: window.sessionStorage.getItem('myRandomVar')
      };
   } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
      changedVehicle = '2';
      mydata = {
         startYear: myYearLogTemp,
         startMonth: myMonthLogTemp,
         startDay: myDayLogTemp,
         PersKMV2: myDOMs.vehicleLog.PerKMInput.value,
         BusKMV2: myDOMs.vehicleLog.BusKMInput.value,
         carNum: 2,
         auth: window.sessionStorage.getItem('myRandomVar')
      };
   }

   $.ajax({
      method: "POST",
      url: `${serverURL}vehicleLog`,
      data: mydata,
      enctype: "multipart/form-data",
   })
      .done(async function (data) {
         displayAlert(
            myDOMs.vehicleLog.AlertContainer,
            "alertContainerVehicleLog",
            "VehicleLogCloseBtnAlert",
            data,
            '',
            ` `,
            "GREEN",
            6000
         );
         updateLogArrayAfterPost(myDate, PersAmt, BusAmt, changedVehicle)
         await getVehiclePercentage();
         fillMainDataFromArrays();
         let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)
         PercentsendDate.setHours(PercentsendDate.getHours() + (PercentsendDate.getTimezoneOffset() / 60));
         calculateBusinessPercentage(PercentsendDate);
      })
      .fail(function (err) {
         displayAlert(
            myDOMs.carExp.AlertContainer,
            "carExpAlert",
            "closeBtnAlert",
            `${err} `,
            '',
            ` `,
            "RED",
            6000
         );
      });
}

function updateLogArrayAfterPost(editedDate, PersAmt, BusAmt, changedVehicle) {
   let editedYear = editedDate.getUTCFullYear();
   let editedMonth = editedDate.getUTCMonth();
   let editedDay = editedDate.getUTCDate();
   let myTempIndex;

   let myDateArray = vLogArray
      .map(function (x) {
         return x.logDate;
      })

   for (i = 0; i < myDateArray.length; i++) {
      let myDateLogTemp = new Date(myDateArray[i]);

      let myMonth = myDateLogTemp.getUTCMonth();
      let myYear = myDateLogTemp.getUTCFullYear();
      let myDay = myDateLogTemp.getUTCDate();

      if (myMonth === editedMonth && myYear === editedYear && myDay === editedDay) {
         myTempIndex = i;
         break;
      }
   }

   if (myTempIndex === undefined || myTempIndex === null) {
      let myNewLog;
      if (changedVehicle === '1') {
         myNewLog = {
            logDate: editedDate,
            PersKMV1: Number(PersAmt),
            BusKMV1: Number(BusAmt),
            PersKMV2: 0,
            BusKMV2: 0,
         }
      } else if (changedVehicle === '2') {
         myNewLog = {
            logDate: editedDate,
            PersKMV1: 0,
            BusKMV1: 0,
            PersKMV2: Number(PersAmt),
            BusKMV2: Number(BusAmt),
         }
      }
      vLogArray.push(myNewLog);
      sortArrayByDate();
      return;
   }

   if (changedVehicle === '1') {
      vLogArray[myTempIndex].BusKMV1 = Number(BusAmt);
      vLogArray[myTempIndex].PersKMV1 = Number(PersAmt);
   } else if (changedVehicle === '2') {
      vLogArray[myTempIndex].BusKMV2 = Number(BusAmt);
      vLogArray[myTempIndex].PersKMV2 = Number(PersAmt);
   }
};

function getAllVehicleLogs() {
   return new Promise((resolve, reject) => {
      $.ajax({
         url: `${serverURL}vehicleLog`,
         method: "GET",
         data: {
            auth: window.sessionStorage.getItem('myRandomVar')
         }
      })
         .done(function (data) {
            resolve(data)
            vLogArray = data.vLogs;
            sortArrayByDate();
         })
         .fail(function (e) {
            reject("Income Client List was NOT retrieved Successfully!");
            alert("Income Client List was NOT retrieved Successfully!");
         });
   });

};

function sortArrayByDate() {
   vLogArray.sort(function (a, b) {
      var dateA = new Date(a.logDate), dateB = new Date(b.logDate);
      return dateA - dateB;
   });
}

function updateLogData(searchDate) {
   let tempZero = 0;
   let searchMonth = searchDate.getUTCMonth();
   let searchYear = searchDate.getUTCFullYear();
   let searchDay = searchDate.getUTCDate();

   let tempobj = vLogArray.filter(obj => {
      let myDate = new Date(obj.logDate);
      let myDateMonth = myDate.getUTCMonth();
      let myDateYear = myDate.getUTCFullYear();
      let myDateDay = myDate.getUTCDate();

      return (searchMonth === myDateMonth && searchYear === myDateYear && searchDay === myDateDay);
   });

   if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
      if (tempobj[0] === undefined) {
         myDOMs.vehicleLog.PerKMInput.value = tempZero.toFixed(1);
         myDOMs.vehicleLog.BusKMInput.value = tempZero.toFixed(1);
      } else {
         if (tempobj[0].PersKMV1 === undefined) {
            myDOMs.vehicleLog.PerKMInput.value = tempZero.toFixed(1);
         } else {
            myDOMs.vehicleLog.PerKMInput.value = tempobj[0].PersKMV1.toFixed(1);
         }
         if (tempobj[0].BusKMV1 === undefined) {
            myDOMs.vehicleLog.BusKMInput.value = tempZero.toFixed(1);
         } else {
            myDOMs.vehicleLog.BusKMInput.value = tempobj[0].BusKMV1.toFixed(1);
         }

      }
   }

   if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
      if (tempobj[0] === undefined) {
         myDOMs.vehicleLog.PerKMInput.value = tempZero.toFixed(1);
         myDOMs.vehicleLog.BusKMInput.value = tempZero.toFixed(1);
      } else {
         if (tempobj[0].PersKMV2 === undefined) {
            myDOMs.vehicleLog.PerKMInput.value = tempZero.toFixed(1);
         } else {
            myDOMs.vehicleLog.PerKMInput.value = tempobj[0].PersKMV2.toFixed(1);
         }
         if (tempobj[0].BusKMV2 === undefined) {
            myDOMs.vehicleLog.BusKMInput.value = tempZero.toFixed(1);
         } else {
            myDOMs.vehicleLog.BusKMInput.value = tempobj[0].BusKMV2.toFixed(1);
         }
      }
   }

   let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)
   calculateBusinessPercentage(PercentsendDate);
};

function calculateBusinessPercentage(selectDate, myReturn) {
   zeroCalcVariables();
   let tempDayOfYear = getDayofYear(selectDate);

   vLogArray.forEach((el, index) => {
      let loopMonth = new Date(el.logDate).getUTCMonth();
      if (getDayofYear(el.logDate) <= tempDayOfYear) {
         switch (loopMonth) {
            case 0:
               amtPersJanV1 += el.PersKMV1
               amtPersJanV2 += el.PersKMV2
               amtBusJanV1 += el.BusKMV1
               amtBusJanV2 += el.BusKMV2
               break;
            case 1:
               amtPersFebV1 += el.PersKMV1
               amtPersFebV2 += el.PersKMV2
               amtBusFebV1 += el.BusKMV1
               amtBusFebV2 += el.BusKMV2
               break;
            case 2:
               amtPersMarV1 += el.PersKMV1
               amtPersMarV2 += el.PersKMV2
               amtBusMarV1 += el.BusKMV1
               amtBusMarV2 += el.BusKMV2
               break;
            case 3:
               amtPersAprV1 += el.PersKMV1
               amtPersAprV2 += el.PersKMV2
               amtBusAprV1 += el.BusKMV1
               amtBusAprV2 += el.BusKMV2
               break;
            case 4:
               amtPersMayV1 += el.PersKMV1
               amtPersMayV2 += el.PersKMV2
               amtBusMayV1 += el.BusKMV1
               amtBusMayV2 += el.BusKMV2
               break;
            case 5:
               amtPersJunV1 += el.PersKMV1
               amtPersJunV2 += el.PersKMV2
               amtBusJunV1 += el.BusKMV1
               amtBusJunV2 += el.BusKMV2
               break;
            case 6:
               amtPersJulV1 += el.PersKMV1
               amtPersJulV2 += el.PersKMV2
               amtBusJulV1 += el.BusKMV1
               amtBusJulV2 += el.BusKMV2
               break;
            case 7:
               amtPersAugV1 += el.PersKMV1
               amtPersAugV2 += el.PersKMV2
               amtBusAugV1 += el.BusKMV1
               amtBusAugV2 += el.BusKMV2
               break;
            case 8:
               amtPersSepV1 += el.PersKMV1
               amtPersSepV2 += el.PersKMV2
               amtBusSepV1 += el.BusKMV1
               amtBusSepV2 += el.BusKMV2
               break;
            case 9:
               amtPersOctV1 += el.PersKMV1
               amtPersOctV2 += el.PersKMV2
               amtBusOctV1 += el.BusKMV1
               amtBusOctV2 += el.BusKMV2
               break;
            case 10:
               amtPersNovV1 += el.PersKMV1
               amtPersNovV2 += el.PersKMV2
               amtBusNovV1 += el.BusKMV1
               amtBusNovV2 += el.BusKMV2
               break;
            case 11:
               amtPersDecV1 += el.PersKMV1
               amtPersDecV2 += el.PersKMV2
               amtBusDecV1 += el.BusKMV1
               amtBusDecV2 += el.BusKMV2
         }
      }

   })

   let myZeroVal = 0;

   BusinessTotalV1 = amtBusJanV1 + amtBusFebV1 + amtBusMarV1 + amtBusAprV1 + amtBusMayV1 + amtBusJunV1 + amtBusJulV1 + amtBusAugV1 + amtBusSepV1 + amtBusOctV1 + amtBusNovV1 + amtBusDecV1;
   PersonalTotalV1 = amtPersJanV1 + amtPersFebV1 + amtPersMarV1 + amtPersAprV1 + amtPersMayV1 + amtPersJunV1 + amtPersJulV1 + amtPersAugV1 + amtPersSepV1 + amtPersOctV1 + amtPersNovV1 + amtPersDecV1;
   TotalV1 = BusinessTotalV1 + PersonalTotalV1;

   if (TotalV1 === 0) {
      BusinessPercentYearV1 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentYearV1 = Number((BusinessTotalV1 / TotalV1) * 100).toFixed(2);
   }

   if (amtBusJanV1 + amtBusFebV1 + amtBusMarV1 + amtPersJanV1 + amtPersFebV1 + amtPersMarV1 === 0) {
      BusinessPercentQ1V1 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ1V1 = Number((amtBusJanV1 + amtBusFebV1 + amtBusMarV1) / (amtBusJanV1 + amtBusFebV1 + amtBusMarV1 + amtPersJanV1 + amtPersFebV1 + amtPersMarV1) * 100).toFixed(2);
   }

   if (amtBusAprV1 + amtBusMayV1 + amtBusJunV1 + amtPersAprV1 + amtPersMayV1 + amtPersJunV1 === 0) {
      BusinessPercentQ2V1 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ2V1 = Number((amtBusAprV1 + amtBusMayV1 + amtBusJunV1) / (amtBusAprV1 + amtBusMayV1 + amtBusJunV1 + amtPersAprV1 + amtPersMayV1 + amtPersJunV1) * 100).toFixed(2);
   }

   if (amtBusJulV1 + amtBusAugV1 + amtBusSepV1 + amtPersJulV1 + amtPersAugV1 + amtPersSepV1 === 0) {
      BusinessPercentQ3V1 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ3V1 = Number((amtBusJulV1 + amtBusAugV1 + amtBusSepV1) / (amtBusJulV1 + amtBusAugV1 + amtBusSepV1 + amtPersJulV1 + amtPersAugV1 + amtPersSepV1) * 100).toFixed(2);
   }

   if (amtBusOctV1 + amtBusNovV1 + amtBusDecV1 + amtPersOctV1 + amtPersNovV1 + amtPersDecV1 === 0) {
      BusinessPercentQ4V1 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ4V1 = Number((amtBusOctV1 + amtBusNovV1 + amtBusDecV1) / (amtBusOctV1 + amtBusNovV1 + amtBusDecV1 + amtPersOctV1 + amtPersNovV1 + amtPersDecV1) * 100).toFixed(2);
   }

   if (amtBusJanV1 + amtPersJanV1 === 0) {
      BusPercJanV1 = myZeroVal.toFixed(2);
   } else {
      BusPercJanV1 = Number(amtBusJanV1 / (amtBusJanV1 + amtPersJanV1) * 100).toFixed(2);
   }

   if (amtBusFebV1 + amtPersFebV1 === 0) {
      BusPercFebV1 = myZeroVal.toFixed(2);
   } else {
      BusPercFebV1 = Number(amtBusFebV1 / (amtBusFebV1 + amtPersFebV1) * 100).toFixed(2);
   }

   if (amtBusMarV1 + amtPersMarV1 === 0) {
      BusPercMarV1 = myZeroVal.toFixed(2);
   } else {
      BusPercMarV1 = Number(amtBusMarV1 / (amtBusMarV1 + amtPersMarV1) * 100).toFixed(2);
   }

   if (amtBusAprV1 + amtPersAprV1 === 0) {
      BusPercAprV1 = myZeroVal.toFixed(2);
   } else {
      BusPercAprV1 = Number(amtBusAprV1 / (amtBusAprV1 + amtPersAprV1) * 100).toFixed(2);
   }

   if (amtBusMayV1 + amtPersMayV1 === 0) {
      BusPercMayV1 = myZeroVal.toFixed(2);
   } else {
      BusPercMayV1 = Number(amtBusMayV1 / (amtBusMayV1 + amtPersMayV1) * 100).toFixed(2);
   }

   if (amtBusJunV1 + amtPersJunV1 === 0) {
      BusPercJunV1 = myZeroVal.toFixed(2);
   } else {
      BusPercJunV1 = Number(amtBusJunV1 / (amtBusJunV1 + amtPersJunV1) * 100).toFixed(2);
   }

   if (amtBusJulV1 + amtPersJulV1 === 0) {
      BusPercJulV1 = myZeroVal.toFixed(2);
   } else {
      BusPercJulV1 = Number(amtBusJulV1 / (amtBusJulV1 + amtPersJulV1) * 100).toFixed(2);
   }

   if (amtBusAugV1 + amtPersAugV1 === 0) {
      BusPercAugV1 = myZeroVal.toFixed(2);
   } else {
      BusPercAugV1 = Number(amtBusAugV1 / (amtBusAugV1 + amtPersAugV1) * 100).toFixed(2);
   }

   if (amtBusSepV1 + amtPersSepV1 === 0) {
      BusPercSepV1 = myZeroVal.toFixed(2);
   } else {
      BusPercSepV1 = Number(amtBusSepV1 / (amtBusSepV1 + amtPersSepV1) * 100).toFixed(2);
   }

   if (amtBusOctV1 + amtPersOctV1 === 0) {
      BusPercOctV1 = myZeroVal.toFixed(2);
   } else {
      BusPercOctV1 = Number(amtBusOctV1 / (amtBusOctV1 + amtPersOctV1) * 100).toFixed(2);
   }

   if (amtBusNovV1 + amtPersNovV1 === 0) {
      BusPercNovV1 = myZeroVal.toFixed(2);
   } else {
      BusPercNovV1 = Number(amtBusNovV1 / (amtBusNovV1 + amtPersNovV1) * 100).toFixed(2);
   }

   if (amtBusDecV1 + amtPersDecV1 === 0) {
      BusPercDecV1 = myZeroVal.toFixed(2);
   } else {
      BusPercDecV1 = Number(amtBusDecV1 / (amtBusDecV1 + amtPersDecV1) * 100).toFixed(2);
   }


   BusinessTotalV2 = amtBusJanV2 + amtBusFebV2 + amtBusMarV2 + amtBusAprV2 + amtBusMayV2 + amtBusJunV2 + amtBusJulV2 + amtBusAugV2 + amtBusSepV2 + amtBusOctV2 + amtBusNovV2 + amtBusDecV2;
   PersonalTotalV2 = amtPersJanV2 + amtPersFebV2 + amtPersMarV2 + amtPersAprV2 + amtPersMayV2 + amtPersJunV2 + amtPersJulV2 + amtPersAugV2 + amtPersSepV2 + amtPersOctV2 + amtPersNovV2 + amtPersDecV2;
   TotalV2 = BusinessTotalV2 + PersonalTotalV2

   if (TotalV2 === 0) {
      BusinessPercentYearV2 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentYearV2 = Number((BusinessTotalV2 / TotalV2) * 100).toFixed(2);
   }

   if (amtBusJanV2 + amtBusFebV2 + amtBusMarV2 + amtPersJanV2 + amtPersFebV2 + amtPersMarV2 === 0) {
      BusinessPercentQ1V2 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ1V2 = Number((amtBusJanV2 + amtBusFebV2 + amtBusMarV2) / (amtBusJanV2 + amtBusFebV2 + amtBusMarV2 + amtPersJanV2 + amtPersFebV2 + amtPersMarV2) * 100).toFixed(2);
   }

   if (amtBusAprV2 + amtBusMayV2 + amtBusJunV2 + amtPersAprV2 + amtPersMayV2 + amtPersJunV2 === 0) {
      BusinessPercentQ2V2 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ2V2 = Number((amtBusAprV2 + amtBusMayV2 + amtBusJunV2) / (amtBusAprV2 + amtBusMayV2 + amtBusJunV2 + amtPersAprV2 + amtPersMayV2 + amtPersJunV2) * 100).toFixed(2);
   }

   if (amtBusJulV2 + amtBusAugV2 + amtBusSepV2 + amtPersJulV2 + amtPersAugV2 + amtPersSepV2 === 0) {
      BusinessPercentQ3V2 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ3V2 = Number((amtBusJulV2 + amtBusAugV2 + amtBusSepV2) / (amtBusJulV2 + amtBusAugV2 + amtBusSepV2 + amtPersJulV2 + amtPersAugV2 + amtPersSepV2) * 100).toFixed(2);
   }

   if (amtBusOctV2 + amtBusNovV2 + amtBusDecV2 + amtPersOctV2 + amtPersNovV2 + amtPersDecV2 === 0) {
      BusinessPercentQ4V2 = myZeroVal.toFixed(2);
   } else {
      BusinessPercentQ4V2 = Number((amtBusOctV2 + amtBusNovV2 + amtBusDecV2) / (amtBusOctV2 + amtBusNovV2 + amtBusDecV2 + amtPersOctV2 + amtPersNovV2 + amtPersDecV2) * 100).toFixed(2);
   }

   if (amtBusJanV2 + amtPersJanV2 === 0) {
      BusPercJanV2 = myZeroVal.toFixed(2);
   } else {
      BusPercJanV2 = Number(amtBusJanV2 / (amtBusJanV2 + amtPersJanV2) * 100).toFixed(2);
   }

   if (amtBusFebV2 + amtPersFebV2 === 0) {
      BusPercFebV2 = myZeroVal.toFixed(2);
   } else {
      BusPercFebV2 = Number(amtBusFebV2 / (amtBusFebV2 + amtPersFebV2) * 100).toFixed(2);
   }

   if (amtBusMarV2 + amtPersMarV2 === 0) {
      BusPercMarV2 = myZeroVal.toFixed(2);
   } else {
      BusPercMarV2 = Number(amtBusMarV2 / (amtBusMarV2 + amtPersMarV2) * 100).toFixed(2);
   }

   if (amtBusAprV2 + amtPersAprV2 === 0) {
      BusPercAprV2 = myZeroVal.toFixed(2);
   } else {
      BusPercAprV2 = Number(amtBusAprV2 / (amtBusAprV2 + amtPersAprV2) * 100).toFixed(2);
   }

   if (amtBusMayV2 + amtPersMayV2 === 0) {
      BusPercMayV2 = myZeroVal.toFixed(2);
   } else {
      BusPercMayV2 = Number(amtBusMayV2 / (amtBusMayV2 + amtPersMayV2) * 100).toFixed(2);
   }

   if (amtBusJunV2 + amtPersJunV2 === 0) {
      BusPercJunV2 = myZeroVal.toFixed(2);
   } else {
      BusPercJunV2 = Number(amtBusJunV2 / (amtBusJunV2 + amtPersJunV2) * 100).toFixed(2);
   }

   if (amtBusJulV2 + amtPersJulV2 === 0) {
      BusPercJulV2 = myZeroVal.toFixed(2);
   } else {
      BusPercJulV2 = Number(amtBusJulV2 / (amtBusJulV2 + amtPersJulV2) * 100).toFixed(2);
   }

   if (amtBusAugV2 + amtPersAugV2 === 0) {
      BusPercAugV2 = myZeroVal.toFixed(2);
   } else {
      BusPercAugV2 = Number(amtBusAugV2 / (amtBusAugV2 + amtPersAugV2) * 100).toFixed(2);
   }

   if (amtBusSepV2 + amtPersSepV2 === 0) {
      BusPercSepV2 = myZeroVal.toFixed(2);
   } else {
      BusPercSepV2 = Number(amtBusSepV2 / (amtBusSepV2 + amtPersSepV2) * 100).toFixed(2);
   }

   if (amtBusOctV2 + amtPersOctV2 === 0) {
      BusPercOctV2 = myZeroVal.toFixed(2);
   } else {
      BusPercOctV2 = Number(amtBusOctV2 / (amtBusOctV2 + amtPersOctV2) * 100).toFixed(2);
   }

   if (amtBusNovV2 + amtPersNovV2 === 0) {
      BusPercNovV2 = myZeroVal.toFixed(2);
   } else {
      BusPercNovV2 = Number(amtBusNovV2 / (amtBusNovV2 + amtPersNovV2) * 100).toFixed(2);
   }

   if (amtBusDecV2 + amtPersDecV2 === 0) {
      BusPercDecV2 = myZeroVal.toFixed(2);
   } else {
      BusPercDecV2 = Number(amtBusDecV2 / (amtBusDecV2 + amtPersDecV2) * 100).toFixed(2);
   }

   if (myReturn) {
      return;
   }

   applyPercentCalculationsToDOM(selectDate);
   zeroCalcVariables();

}

function applyPercentCalculationsToDOM(selectDate) {
   let currentMonth = selectDate.getUTCMonth();

   if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
      switch (currentMonth) {
         case 0:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercJanV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ1V1}%`;
            break;
         case 1:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercFebV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ1V1}%`;
            break;
         case 2:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercMarV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ1V1}%`;
            break;
         case 3:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercAprV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ2V1}%`;
            break;
         case 4:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercMayV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ2V1}%`;
            break;
         case 5:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercJunV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ2V1}%`;
            break;
         case 6:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercJulV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ3V1}%`;
            break;
         case 7:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercAugV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ3V1}%`;
            break;
         case 8:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercSepV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ3V1}%`;
            break;
         case 9:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercOctV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ4V1}%`;
            break;
         case 10:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercNovV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ4V1}%`;
            break;
         case 11:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercDecV1}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ4V1}%`;
      }
      myDOMs.vehicleLog.OdometerInput.value = dbMiscData.odometerV1;
      myDOMs.vehicleLog.BusPercentYear.value = `${BusinessPercentYearV1}%`;
      let tempZero = 0;
      if (isNaN(BusinessTotalV1)) {
         myDOMs.vehicleLog.TotalBus.value = tempZero.toFixed(1);
      } else {
         myDOMs.vehicleLog.TotalBus.value = Number(BusinessTotalV1).toFixed(1);
      }
      if (isNaN(PersonalTotalV1)) {
         myDOMs.vehicleLog.TotalPer.value = tempZero.toFixed(1);
      } else {
         myDOMs.vehicleLog.TotalPer.value = Number(PersonalTotalV1).toFixed(1);
      }


      let myTotalOdometerV1 = Number(Number(BusinessTotalV1) + Number(PersonalTotalV1) + +myDOMs.vehicleLog.OdometerInput.value);

      myDOMs.vehicleLog.TotalOdometer.value = formatNumber(myTotalOdometerV1.toFixed(1));
   } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
      switch (currentMonth) {
         case 0:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercJanV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ1V2}%`;
            break;
         case 1:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercFebV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ1V2}%`;
            break;
         case 2:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercMarV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ1V2}%`;
            break;
         case 3:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercAprV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ2V2}%`;
            break;
         case 4:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercMayV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ2V2}%`;
            break;
         case 5:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercJunV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ2V2}%`;
            break;
         case 6:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercJulV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ3V2}%`;
            break;
         case 7:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercAugV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ3V2}%`;
            break;
         case 8:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercSepV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ3V2}%`;
            break;
         case 9:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercOctV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ4V2}%`;
            break;
         case 10:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercNovV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ4V2}%`;
            break;
         case 11:
            myDOMs.vehicleLog.BusPercentMonth.value = `${BusPercDecV2}%`;
            myDOMs.vehicleLog.BusPercentQuarter.value = `${BusinessPercentQ4V2}%`;
      }
      let tempZero = 0;
      myDOMs.vehicleLog.OdometerInput.value = dbMiscData.odometerV2;
      myDOMs.vehicleLog.BusPercentYear.value = `${BusinessPercentYearV2}%`;
      if (isNaN(BusinessTotalV2)) {
         myDOMs.vehicleLog.TotalBus.value = tempZero.toFixed(1);
      } else {
         myDOMs.vehicleLog.TotalBus.value = BusinessTotalV2.toFixed(1);
      }
      if (isNaN(PersonalTotalV2)) {
         myDOMs.vehicleLog.TotalPer.value = tempZero.toFixed(1);
      } else {
         myDOMs.vehicleLog.TotalPer.value = PersonalTotalV2.toFixed(1);
      }
      let myTotalOdometerV2 = Number(+BusinessTotalV2 + +PersonalTotalV2 + +myDOMs.vehicleLog.OdometerInput.value);
      myDOMs.vehicleLog.TotalOdometer.value = formatNumber(myTotalOdometerV2.toFixed(1));
   }
}

function zeroCalcVariables() {
   amtPersJanV1 = 0
   amtPersFebV1 = 0
   amtPersMarV1 = 0
   amtPersAprV1 = 0
   amtPersMayV1 = 0
   amtPersJunV1 = 0
   amtPersJulV1 = 0
   amtPersAugV1 = 0
   amtPersSepV1 = 0
   amtPersOctV1 = 0
   amtPersNovV1 = 0
   amtPersDecV1 = 0

   amtPersJanV2 = 0
   amtPersFebV2 = 0
   amtPersMarV2 = 0
   amtPersAprV2 = 0
   amtPersMayV2 = 0
   amtPersJunV2 = 0
   amtPersJulV2 = 0
   amtPersAugV2 = 0
   amtPersSepV2 = 0
   amtPersOctV2 = 0
   amtPersNovV2 = 0
   amtPersDecV2 = 0

   amtBusJanV1 = 0
   amtBusFebV1 = 0
   amtBusMarV1 = 0
   amtBusAprV1 = 0
   amtBusMayV1 = 0
   amtBusJunV1 = 0
   amtBusJulV1 = 0
   amtBusAugV1 = 0
   amtBusSepV1 = 0
   amtBusOctV1 = 0
   amtBusNovV1 = 0
   amtBusDecV1 = 0

   amtBusJanV2 = 0
   amtBusFebV2 = 0
   amtBusMarV2 = 0
   amtBusAprV2 = 0
   amtBusMayV2 = 0
   amtBusJunV2 = 0
   amtBusJulV2 = 0
   amtBusAugV2 = 0
   amtBusSepV2 = 0
   amtBusOctV2 = 0
   amtBusNovV2 = 0
   amtBusDecV2 = 0

   BusPercJanV1 = 0
   BusPercFebV1 = 0
   BusPercMarV1 = 0
   BusPercAprV1 = 0
   BusPercMayV1 = 0
   BusPercJunV1 = 0
   BusPercJulV1 = 0
   BusPercAugV1 = 0
   BusPercSepV1 = 0
   BusPercOctV1 = 0
   BusPercNovV1 = 0
   BusPercDecV1 = 0

   BusPercJanV2 = 0
   BusPercFebV2 = 0
   BusPercMarV2 = 0
   BusPercAprV2 = 0
   BusPercMayV2 = 0
   BusPercJunV2 = 0
   BusPercJulV2 = 0
   BusPercAugV2 = 0
   BusPercSepV2 = 0
   BusPercOctV2 = 0
   BusPercNovV2 = 0
   BusPercDecV2 = 0


   BusinessPercentYearV1 = 0
   BusinessPercentQ1V1 = 0
   BusinessPercentQ2V1 = 0
   BusinessPercentQ3V1 = 0
   BusinessPercentQ4V1 = 0
   BusinessTotalV1 = 0
   PersonalTotalV1 = 0
   TotalV1 = 0

   BusinessPercentYearV2 = 0
   BusinessPercentQ1V2 = 0
   BusinessPercentQ2V2 = 0
   BusinessPercentQ3V2 = 0
   BusinessPercentQ4V2 = 0
   BusinessTotalV2 = 0
   PersonalTotalV2 = 0
   TotalV2 = 0
}

async function saveOdometerInput() {
   if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
      dbMiscData.odometerV1 = Number(myDOMs.vehicleLog.OdometerInput.value);
   } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
      dbMiscData.odometerV2 = Number(myDOMs.vehicleLog.OdometerInput.value);
   }
   await updateMiscData();
   let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)
   calculateBusinessPercentage(PercentsendDate);
};

function getDayofYear(myDate) {

   let myDateMonth = new Date(myDate).getUTCMonth();
   let myDateDay = new Date(myDate).getUTCDate();
   let myDateYear = new Date(myDate).getUTCFullYear();
   let leapYear = false;
   if (myDateYear === 2020 || myDateYear === 2024 || myDateYear === 2028 || myDateYear === 2032 || myDateYear === 2036 || myDateYear === 2040 || myDateYear === 2044) {
      leapYear = true;
   }

   switch (myDateMonth) {
      case 0:
         return myDateDay;
      case 1:
         return myDateDay + 31
      case 2:
         if (leapYear) {
            return myDateDay + 60
         } else {
            return myDateDay + 59
         }
      case 3:
         if (leapYear) {
            return myDateDay + 91
         } else {
            return myDateDay + 90
         }
      case 4:
         if (leapYear) {
            return myDateDay + 121
         } else {
            return myDateDay + 120
         }
      case 5:
         if (leapYear) {
            return myDateDay + 152
         } else {
            return myDateDay + 151
         }
      case 6:
         if (leapYear) {
            return myDateDay + 182
         } else {
            return myDateDay + 181
         }
      case 7:
         if (leapYear) {
            return myDateDay + 213
         } else {
            return myDateDay + 212
         }
      case 8:
         if (leapYear) {
            return myDateDay + 244
         } else {
            return myDateDay + 243
         }
      case 9:
         if (leapYear) {
            return myDateDay + 274
         } else {
            return myDateDay + 273
         }
      case 10:
         if (leapYear) {
            return myDateDay + 305
         } else {
            return myDateDay + 304
         }
      case 11:
         if (leapYear) {
            return myDateDay + 335
         } else {
            return myDateDay + 334
         }


   }
};

function zeroAllLogs(noMsg) {
   let mydata;
   let carNum = '1';
   if (noMsg) {
      if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
         carNum = '1';
         mydata = {
            auth: window.sessionStorage.getItem('myRandomVar'),
            carNum: '1'
         }
      } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
         carNum = '2';
         mydata = {
            auth: window.sessionStorage.getItem('myRandomVar'),
            carNum: '2'
         }
      }
   } else {
      if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
         if (confirm('Are you Sure you want to Zero all the Log entries for Vehicle 1?')) {
            carNum = '1';
            mydata = {
               auth: window.sessionStorage.getItem('myRandomVar'),
               carNum: '1'
            }
         } else {
            return;
         }
      } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
         if (confirm('Are you Sure you want to Zero all the Log entries for Vehicle 2?')) {
            carNum = '2';
            mydata = {
               auth: window.sessionStorage.getItem('myRandomVar'),
               carNum: '2'
            }
         } else {
            return;
         }
      }
   }

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "POST",
         url: `${serverURL}vehicleLogmulti`,
         data: mydata,
         enctype: "multipart/form-data",
      })
         .done(async function (data) {
            resolve(data)
            if (noMsg) {
            } else {
               displayAlert(
                  myDOMs.vehicleLog.AlertContainer,
                  "alertContainerVehicleLog",
                  "VehicleLogCloseBtnAlert",
                  data,
                  '',
                  ` `,
                  "GREEN",
                  6000
               );
            }
            zeroLogArray(carNum);
            await getVehiclePercentage();
            fillMainDataFromArrays();
            let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)
            calculateBusinessPercentage(PercentsendDate);

         })
         .fail(function (err) {
            reject(err)
            displayAlert(
               myDOMs.carExp.AlertContainer,
               "carExpAlert",
               "closeBtnAlert",
               `${err} `,
               '',
               ` `,
               "RED",
               6000
            );
         });
   });


};

function zeroLogArray(carNum) {
   let varZero = 0;
   if (carNum === '1') {
      vLogArray.forEach((vLog, index) => {
         vLog.BusKMV1 = Number(0);
         vLog.PersKMV1 = Number(0);
      });
   } else if (carNum === '2') {
      vLogArray.forEach((vLog, index) => {
         vLog.BusKMV2 = Number(0);
         vLog.PersKMV2 = Number(0);
      });
   } else if (carNum === '3') {
      vLogArray.forEach((vLog, index) => {
         vLog.BusKMV1 = Number(0);
         vLog.PersKMV1 = Number(0);
         vLog.BusKMV2 = Number(0);
         vLog.PersKMV2 = Number(0);
      });
   }
   myDOMs.vehicleLog.BusKMInput.value = varZero.toFixed(1);
   myDOMs.vehicleLog.PerKMInput.value = varZero.toFixed(1);
};

function deleteAllVehicleLog() {
   if (confirm('Are you Sure you want to Delete all the Log entries for Both Vehicles?')) {
   } else {
      return;
   }
   let mydata = {
      auth: window.sessionStorage.getItem('myRandomVar')
   }
   $.ajax({
      method: "DELETE",
      url: `${serverURL}vehicleLog`,
      data: mydata,
      enctype: "multipart/form-data",
   })
      .done(async function (data) {
         displayAlert(
            myDOMs.vehicleLog.AlertContainer,
            "alertContainerVehicleLog",
            "VehicleLogCloseBtnAlert",
            data,
            '',
            ` `,
            "GREEN",
            6000
         );

         vLogArray = [];
         await getVehiclePercentage();
         fillMainDataFromArrays();
         let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)
         updateLogData(PercentsendDate);
      })
      .fail(function (err) {
         displayAlert(
            myDOMs.carExp.AlertContainer,
            "carExpAlert",
            "closeBtnAlert",
            `${err} `,
            '',
            ` `,
            "RED",
            6000
         );
      });


};

async function quickLogInput() {
   let tempBusAmt = 0;
   let tempPersAmt = 0;
   let tempMonthlyAmt = 0;
   let requestedPercent = 0;
   let requestedAmt = 0;
   let carNum = '1';

   if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
      carNum = '1';
   } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
      carNum = '2';
   }

   if (confirm(`Are you Sure you want to Automatically Add an Amount on the first day of every Month that will equal to your requested Total amount and be divided to your requested Percentage? This will reset Vehicle ${carNum} current logs!`)) {
   } else {
      return;
   }

   requestedAmt = prompt('Please enter the Total KMs for the Year.');
   if (isNaN(requestedAmt)) {
      alert('Only Numbers Please!');
      return;
   }
   if (requestedAmt < 200) {
      alert('Minimum of 200 KMs required!');
      return;
   }

   requestedPercent = prompt('Please enter the Business Percent required from the Total KMs previously entered. Enter only numbers. Ex: 20 = 20%. Possible range is 1 to 100');

   if (isNaN(requestedPercent)) {
      alert('Only Numbers Please!');
      return;
   }
   if (requestedPercent < 1) {
      alert('Minimum is 1');
      return;
   }

   if (requestedPercent > 100) {
      alert('Maximum is 100');
      return;
   }

   tempMonthlyAmt = requestedAmt / 12;
   requestedPercent = requestedPercent / 100;
   tempBusAmt = tempMonthlyAmt * requestedPercent;
   tempPersAmt = tempMonthlyAmt - tempBusAmt;

   if (vLogArray.length > 0) {
      await zeroAllLogs(true);
   }


   await quickPostLogs(tempPersAmt, tempBusAmt);
   // Add quick Log to Array

   if (vLogArray.length > 0) {
      vLogArray.forEach((vLog, index) => {
         let VehicleLogDate = new Date(vLog.logDate);
         let LogMonth = VehicleLogDate.getUTCMonth();
         let LogDay = VehicleLogDate.getUTCDate();

         if (LogMonth === 0 && LogDay === 1
            || LogMonth === 1 && LogDay === 1
            || LogMonth === 2 && LogDay === 1
            || LogMonth === 3 && LogDay === 1
            || LogMonth === 4 && LogDay === 1
            || LogMonth === 5 && LogDay === 1
            || LogMonth === 6 && LogDay === 1
            || LogMonth === 7 && LogDay === 1
            || LogMonth === 8 && LogDay === 1
            || LogMonth === 9 && LogDay === 1
            || LogMonth === 10 && LogDay === 1
            || LogMonth === 11 && LogDay === 1) {
            if (carNum === '1') {
               vLog.BusKMV1 = Number(tempBusAmt.toFixed(1));
               vLog.PersKMV1 = Number(tempPersAmt.toFixed(1));
            } else if (carNum === '2') {
               vLog.BusKMV2 = Number(tempBusAmt.toFixed(1));
               vLog.PersKMV2 = Number(tempPersAmt.toFixed(1));
            }
         }
      });
   } else {
      await getAllVehicleLogs();
   }

   await getVehiclePercentage();
   fillMainDataFromArrays();
   let PercentsendDate = new Date(myDOMs.vehicleLog.DateLog.value)

   updateLogData(PercentsendDate);
};

async function quickPostLogs(PersAmt, BusAmt) {
   PersAmt = PersAmt.toFixed(1);
   BusAmt = BusAmt.toFixed(1);

   let myTempYear = startDate.getUTCFullYear();


   for (i = 0; i < 12; i++) {

      if (myDOMs.vehicleLog.Selector.value === "Vehicle 1") {
         changedVehicle = '1';
         let tempData = {
            startYear: myTempYear,
            startMonth: i,
            startDay: 1,
            PersKMV1: PersAmt,
            BusKMV1: BusAmt,
            carNum: 1,
            auth: window.sessionStorage.getItem('myRandomVar')
         };
         await PostmyQuickLogs(tempData);
      } else if (myDOMs.vehicleLog.Selector.value === "Vehicle 2") {
         changedVehicle = '2';
         let tempData = {
            startYear: myTempYear,
            startMonth: i,
            startDay: 1,
            PersKMV2: PersAmt,
            BusKMV2: BusAmt,
            carNum: 2,
            auth: window.sessionStorage.getItem('myRandomVar')
         };
         await PostmyQuickLogs(tempData);
      }
   }
}

function PostmyQuickLogs(tempData) {
   return new Promise((resolve, reject) => {
      $.ajax({
         method: "POST",
         url: `${serverURL}vehicleLog`,
         data: tempData,
         enctype: "multipart/form-data",
      }).done(function (data) {
         resolve(data)
         return true;
      }).fail(function (err) {
         reject(err);
         return false;
      });
   });

}
