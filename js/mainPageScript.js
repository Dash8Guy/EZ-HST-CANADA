

startDate = new Date(myDOMs.main_page.StartDate.value);
endDate = new Date(myDOMs.main_page.EndDate.value);
startDate.setHours(36);
endDate.setHours(36);

myDOMs.main_page.SelectPeriod.addEventListener('change', function (e) {

   switch (myDOMs.main_page.SelectPeriod.value) {
      case 'Year':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
         break;
      case '1stQ':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-03-31';
         break;
      case '2ndQ':
         myDOMs.main_page.StartDate.value = '2018-04-01';
         myDOMs.main_page.EndDate.value = '2018-06-30';
         break;
      case '3rdQ':
         myDOMs.main_page.StartDate.value = '2018-07-01';
         myDOMs.main_page.EndDate.value = '2018-09-30';
         break;
      case '4thQ':
         myDOMs.main_page.StartDate.value = '2018-10-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
         break;
      case '1stH':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-06-30';
         break;
      case '2ndH':
         myDOMs.main_page.StartDate.value = '2018-07-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
         break;
      case 'Jan':
         myDOMs.main_page.StartDate.value = '2018-01-01';
         myDOMs.main_page.EndDate.value = '2018-01-31';
         break;
      case 'Feb':
         myDOMs.main_page.StartDate.value = '2018-02-01';
         myDOMs.main_page.EndDate.value = '2018-02-28';
         break;
      case 'Mar':
         myDOMs.main_page.StartDate.value = '2018-03-01';
         myDOMs.main_page.EndDate.value = '2018-03-31';
         break;
      case 'Apr':
         myDOMs.main_page.StartDate.value = '2018-04-01';
         myDOMs.main_page.EndDate.value = '2018-04-30';
         break;
      case 'May':
         myDOMs.main_page.StartDate.value = '2018-05-01';
         myDOMs.main_page.EndDate.value = '2018-05-31';
         break;
      case 'Jun':
         myDOMs.main_page.StartDate.value = '2018-06-01';
         myDOMs.main_page.EndDate.value = '2018-06-30';
         break;
      case 'Jul':
         myDOMs.main_page.StartDate.value = '2018-07-01';
         myDOMs.main_page.EndDate.value = '2018-07-31';
         break;
      case 'Aug':
         myDOMs.main_page.StartDate.value = '2018-08-01';
         myDOMs.main_page.EndDate.value = '2018-08-31';
         break;
      case 'Sep':
         myDOMs.main_page.StartDate.value = '2018-09-01';
         myDOMs.main_page.EndDate.value = '2018-09-30';
         break;
      case 'Oct':
         myDOMs.main_page.StartDate.value = '2018-10-01';
         myDOMs.main_page.EndDate.value = '2018-10-31';
         break;
      case 'Nov':
         myDOMs.main_page.StartDate.value = '2018-11-01';
         myDOMs.main_page.EndDate.value = '2018-11-30';
         break;
      case 'Dec':
         myDOMs.main_page.StartDate.value = '2018-12-01';
         myDOMs.main_page.EndDate.value = '2018-12-31';
   }
   startDate = new Date(myDOMs.main_page.StartDate.value);
   endDate = new Date(myDOMs.main_page.EndDate.value);
   startDate.setHours(36);
   endDate.setHours(36);

});

myDOMs.main_page.StartDate.addEventListener('change', function (e) {
   startDate = new Date(myDOMs.main_page.StartDate.value);
   startDate.setHours(36);
});

myDOMs.main_page.EndDate.addEventListener('change', function (e) {
   endDate = new Date(myDOMs.main_page.EndDate.value);
   endDate.setHours(36);
});

myDOMs.main_page.LockDate.addEventListener('change', function (e) {
   let myTempHardCodeDate = new Date(myDOMs.main_page.LockDate.value);
   myTempHardCodeDate.setHours(36);

   let myHardCodeDate = new Date(
      myTempHardCodeDate.getFullYear(),
      myTempHardCodeDate.getMonth(),
      myTempHardCodeDate.getDate()
   );
   dbMiscData.lockDate = myHardCodeDate;
   updateMiscData();
});