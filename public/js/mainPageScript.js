

startDate = new Date(myDOMs.main_page.StartDate.value);
endDate = new Date(myDOMs.main_page.EndDate.value);
startDate.setHours(startDate.getHours() + (startDate.getTimezoneOffset() / 60));
endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60));

myDOMs.main_page.SelectPeriod.addEventListener('change', function (e) {

   switch (myDOMs.main_page.SelectPeriod.value) {
      case 'Full Year':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
         break;
      case '1st ¼':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-03-31';
         break;
      case '2nd ¼':
         myDOMs.main_page.StartDate.value = '2018-04-01';
         myDOMs.main_page.EndDate.value = '2018-06-30';
         break;
      case '3rd ¼':
         myDOMs.main_page.StartDate.value = '2018-07-01';
         myDOMs.main_page.EndDate.value = '2018-09-30';
         break;
      case '4th ¼':
         myDOMs.main_page.StartDate.value = '2018-10-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
         break;
      case '1st ½':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-06-30';
         break;
      case '2nd ½':
         myDOMs.main_page.StartDate.value = '2018-07-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
         break;
      case 'January':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-01-31';
         break;
      case 'February':
         myDOMs.main_page.StartDate.value = '2018-02-01';
         myDOMs.main_page.EndDate.value = '2018-02-28';
         break;
      case 'March':
         myDOMs.main_page.StartDate.value = '2018-03-01';
         myDOMs.main_page.EndDate.value = '2018-03-31';
         break;
      case 'April':
         myDOMs.main_page.StartDate.value = '2018-04-01';
         myDOMs.main_page.EndDate.value = '2018-04-30';
         break;
      case 'May':
         myDOMs.main_page.StartDate.value = '2018-05-01';
         myDOMs.main_page.EndDate.value = '2018-05-31';
         break;
      case 'June':
         myDOMs.main_page.StartDate.value = '2018-06-01';
         myDOMs.main_page.EndDate.value = '2018-06-30';
         break;
      case 'July':
         myDOMs.main_page.StartDate.value = '2018-07-01';
         myDOMs.main_page.EndDate.value = '2018-07-31';
         break;
      case 'August':
         myDOMs.main_page.StartDate.value = '2018-08-01';
         myDOMs.main_page.EndDate.value = '2018-08-31';
         break;
      case 'September':
         myDOMs.main_page.StartDate.value = '2018-09-01';
         myDOMs.main_page.EndDate.value = '2018-09-30';
         break;
      case 'October':
         myDOMs.main_page.StartDate.value = '2018-10-01';
         myDOMs.main_page.EndDate.value = '2018-10-31';
         break;
      case 'November':
         myDOMs.main_page.StartDate.value = '2018-11-01';
         myDOMs.main_page.EndDate.value = '2018-11-30';
         break;
      case 'December':
         myDOMs.main_page.StartDate.value = '2018-12-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
   }
   startDate = new Date(myDOMs.main_page.StartDate.value);
   endDate = new Date(myDOMs.main_page.EndDate.value);
   startDate.setHours(startDate.getHours() + (startDate.getTimezoneOffset() / 60));
   endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60));
   updateMainDataAfterTimePeriodChange();
});

async function updateMainDataAfterTimePeriodChange() {
   await getAllMainData();
   await getVehiclePercentage();
   fillMainDataFromArrays();
   updateMainPageDisplayAmounts();
};

myDOMs.main_page.StartDate.addEventListener('change', function (e) {
   startDate = new Date(myDOMs.main_page.StartDate.value);
   startDate.setHours(startDate.getHours() + (startDate.getTimezoneOffset() / 60));
});

myDOMs.main_page.EndDate.addEventListener('change', function (e) {
   endDate = new Date(myDOMs.main_page.EndDate.value);
   endDate.setHours(endDate.getHours() + (endDate.getTimezoneOffset() / 60));
});

myDOMs.main_page.LockDate.addEventListener('change', function (e) {
   let myTempHardCodeDate = new Date(myDOMs.main_page.LockDate.value);
   myTempHardCodeDate.setHours(myTempHardCodeDate.getHours() + (myTempHardCodeDate.getTimezoneOffset() / 60));
   // let myHardCodeDate = new Date(
   //    myTempHardCodeDate.getFullYear(),
   //    myTempHardCodeDate.getMonth(),
   //    myTempHardCodeDate.getDate()
   // );
   dbMiscData.lockDate = myTempHardCodeDate;
   updateMiscData();
});