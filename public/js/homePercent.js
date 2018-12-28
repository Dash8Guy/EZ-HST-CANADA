
function displayHomePercentModal() {
   $("#homePercentModal").modal("show");
   myDOMs.homePercentModal.PeriodSelect.value = 'Year';
   updateTimePeriodChange();
};

function updateTimePeriodChange() {
   switch (myDOMs.homePercentModal.PeriodSelect.value) {
      case '':
         myDOMs.homePercentModal.BusinessHomePercent.value = '';
         setPercentGreen();
         break;
      case 'Year':
         if (dbMiscData.homePercJan === dbMiscData.homePercFeb && dbMiscData.homePercFeb === dbMiscData.homePercMar && dbMiscData.homePercMar === dbMiscData.homePercApr && dbMiscData.homePercApr === dbMiscData.homePercMay && dbMiscData.homePercMay === dbMiscData.homePercJun && dbMiscData.homePercJun === dbMiscData.homePercJul && dbMiscData.homePercJul === dbMiscData.homePercAug && dbMiscData.homePercAug === dbMiscData.homePercSep && dbMiscData.homePercSep === dbMiscData.homePercOct && dbMiscData.homePercOct === dbMiscData.homePercNov && dbMiscData.homePercNov === dbMiscData.homePercDec) {
            myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercJan)).toFixed(2);
            setPercentGreen();
         } else {
            myDOMs.homePercentModal.BusinessHomePercent.value = '';
         }
         break;
      case '1Q':
         if (dbMiscData.homePercJan === dbMiscData.homePercFeb && dbMiscData.homePercFeb === dbMiscData.homePercMar) {
            myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercJan)).toFixed(2);
            setPercentGreen();
         } else {
            myDOMs.homePercentModal.BusinessHomePercent.value = '';
         }
         break;
      case '2Q':
         if (dbMiscData.homePercApr === dbMiscData.homePercMay && dbMiscData.homePercMay === dbMiscData.homePercJun) {
            myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercApr)).toFixed(2);
            setPercentGreen();
         } else {
            myDOMs.homePercentModal.BusinessHomePercent.value = '';
         }
         break;
      case '3Q':
         if (dbMiscData.homePercJul === dbMiscData.homePercAug && dbMiscData.homePercAug === dbMiscData.homePercSep) {
            myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercJul)).toFixed(2);
            setPercentGreen();
         } else {
            myDOMs.homePercentModal.BusinessHomePercent.value = '';
         }
         break;
      case '4Q':
         if (dbMiscData.homePercOct === dbMiscData.homePercNov && dbMiscData.homePercNov === dbMiscData.homePercDec) {
            myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercOct)).toFixed(2);
            setPercentGreen();
         } else {
            myDOMs.homePercentModal.BusinessHomePercent.value = '';
         }
         break;
      case 'Jan':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercJan)).toFixed(2);
         setPercentGreen();
         break;
      case 'Feb':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercFeb)).toFixed(2);
         setPercentGreen();
         break;
      case 'Mar':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercMar)).toFixed(2);
         setPercentGreen();
         break;
      case 'Apr':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercApr)).toFixed(2);
         setPercentGreen();
         break;
      case 'May':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercMay)).toFixed(2);
         setPercentGreen();
         break;
      case 'Jun':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercJun)).toFixed(2);
         setPercentGreen();
         break;
      case 'Jul':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercJul)).toFixed(2);
         setPercentGreen();
         break;
      case 'Aug':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercAug)).toFixed(2);
         setPercentGreen();
         break;
      case 'Sep':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercSep)).toFixed(2);
         setPercentGreen();
         break;
      case 'Oct':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercOct)).toFixed(2);
         setPercentGreen();
         break;
      case 'Nov':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercNov)).toFixed(2);
         setPercentGreen();
         break;
      case 'Dec':
         myDOMs.homePercentModal.BusinessHomePercent.value = Number((dbMiscData.homePercDec)).toFixed(2);
         setPercentGreen();
   }
}

myDOMs.homePercentModal.PeriodSelect.addEventListener('change', function (event) {
   updateTimePeriodChange();
});

function verifyIfDuplicatePercent(percentValue) {
   switch (myDOMs.homePercentModal.PeriodSelect.value) {

      case 'Year':
         if (Number(dbMiscData.homePercJan) === Number(percentValue) && Number(dbMiscData.homePercFeb) === Number(percentValue) && Number(dbMiscData.homePercMar) === Number(percentValue) && Number(dbMiscData.homePercApr) === Number(percentValue) && Number(dbMiscData.homePercMay) === Number(percentValue) && Number(dbMiscData.homePercJun) === Number(percentValue) && Number(dbMiscData.homePercJul) === Number(percentValue) && Number(dbMiscData.homePercAug) === Number(percentValue) && Number(dbMiscData.homePercSep) === Number(percentValue) && Number(dbMiscData.homePercOct) === Number(percentValue) && Number(dbMiscData.homePercNov) === Number(percentValue) && Number(dbMiscData.homePercDec) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case '1Q':
         if (Number(dbMiscData.homePercJan) === Number(percentValue) && Number(dbMiscData.homePercFeb) === Number(percentValue) && Number(dbMiscData.homePercMar) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case '2Q':
         if (Number(dbMiscData.homePercApr) === Number(percentValue) && Number(dbMiscData.homePercMay) === Number(percentValue) && Number(dbMiscData.homePercJun) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case '3Q':
         if (Number(dbMiscData.homePercJul) === Number(percentValue) && Number(dbMiscData.homePercAug) === Number(percentValue) && Number(dbMiscData.homePercSep) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case '4Q':
         if (Number(dbMiscData.homePercOct) === Number(percentValue) && Number(dbMiscData.homePercNov) === Number(percentValue) && Number(dbMiscData.homePercDec) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Jan':
         if (Number(dbMiscData.homePercJan) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Feb':
         if (Number(dbMiscData.homePercFeb) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Mar':
         if (Number(dbMiscData.homePercMar) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Apr':
         if (Number(dbMiscData.homePercApr) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'May':
         if (Number(dbMiscData.homePercMay) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Jun':
         if (Number(dbMiscData.homePercJun) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Jul':
         if (Number(dbMiscData.homePercJul) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Aug':
         if (Number(dbMiscData.homePercAug) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Sep':
         if (Number(dbMiscData.homePercSep) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Oct':
         if (Number(dbMiscData.homePercOct) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Nov':
         if (Number(dbMiscData.homePercNov) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
      case 'Dec':
         if (Number(dbMiscData.homePercDec) === Number(percentValue)) {
            return true;
         } else {
            return false;
         }
   }

}

myDOMs.homePercentModal.applyPercentBtn.addEventListener('click', function (event) {
   runHomePercentClickEvent();
});

function setPercentGreen() {
   if ($('#businessPercent').hasClass("text-danger")) {
      $('#businessPercent').removeClass("text-danger");
      $('#businessPercent').addClass("text-success");
   } else {
      $('#businessPercent').addClass("text-success");
   }
};

function setPercentRed() {
   if ($('#businessPercent').hasClass("text-success")) {
      $('#businessPercent').removeClass("text-success");
      $('#businessPercent').addClass("text-danger");
   } else {
      if ($('#businessPercent').hasClass("text-danger")) {
      } else {
         $('#businessPercent').addClass("text-danger");
      }
   }
};

async function runHomePercentClickEvent() {
   let newPercent = Number(myDOMs.homePercentModal.BusinessHomePercent.value);
   let newValueDuplicate = verifyIfDuplicatePercent(newPercent);
   let dateIsLocked = false;
   let msgTimePeriod = '';

   if (newValueDuplicate) {
      alert('You are trying to Apply a Percentage already Saved for this Time Period!');
      setPercentGreen();
      return;
   }

   dateIsLocked = verifyLockDate();

   if (dateIsLocked) {
      //Reset();
      updateTimePeriodChange();
      return;
   }

   switch (myDOMs.homePercentModal.PeriodSelect.value) {

      case 'Year':
         msgTimePeriod = 'Full Year';
         dbMiscData.homePercJan = newPercent;
         dbMiscData.homePercFeb = newPercent;
         dbMiscData.homePercMar = newPercent;
         dbMiscData.homePercApr = newPercent;
         dbMiscData.homePercMay = newPercent;
         dbMiscData.homePercJun = newPercent;
         dbMiscData.homePercJul = newPercent;
         dbMiscData.homePercAug = newPercent;
         dbMiscData.homePercSep = newPercent;
         dbMiscData.homePercOct = newPercent;
         dbMiscData.homePercNov = newPercent;
         dbMiscData.homePercDec = newPercent;
         break;
      case '1Q':
         msgTimePeriod = '1st ¼';
         dbMiscData.homePercJan = newPercent;
         dbMiscData.homePercFeb = newPercent;
         dbMiscData.homePercMar = newPercent;
         break;
      case '2Q':
         msgTimePeriod = '2nd ¼';
         dbMiscData.homePercApr = newPercent;
         dbMiscData.homePercMay = newPercent;
         dbMiscData.homePercJun = newPercent;
         break;
      case '3Q':
         msgTimePeriod = '3rd ¼';
         dbMiscData.homePercJul = newPercent;
         dbMiscData.homePercAug = newPercent;
         dbMiscData.homePercSep = newPercent;
         break;
      case '4Q':
         msgTimePeriod = '4th ¼';
         dbMiscData.homePercOct = newPercent;
         dbMiscData.homePercNov = newPercent;
         dbMiscData.homePercDec = newPercent;
         break;
      case 'Jan':
         msgTimePeriod = 'January';
         dbMiscData.homePercJan = newPercent;
         break;
      case 'Feb':
         msgTimePeriod = 'February';
         dbMiscData.homePercFeb = newPercent;
         break;
      case 'Mar':
         msgTimePeriod = 'March';
         dbMiscData.homePercMar = newPercent;
         break;
      case 'Apr':
         msgTimePeriod = 'April';
         dbMiscData.homePercApr = newPercent;
         break;
      case 'May':
         msgTimePeriod = 'May';
         dbMiscData.homePercMay = newPercent;
         break;
      case 'Jun':
         msgTimePeriod = 'June';
         dbMiscData.homePercJun = newPercent;
         break;
      case 'Jul':
         msgTimePeriod = 'July';
         dbMiscData.homePercJul = newPercent;
         break;
      case 'Aug':
         msgTimePeriod = 'August';
         dbMiscData.homePercAug = newPercent;
         break;
      case 'Sep':
         msgTimePeriod = 'September';
         dbMiscData.homePercSep = newPercent;
         break;
      case 'Oct':
         msgTimePeriod = 'October';
         dbMiscData.homePercOct = newPercent;
         break;
      case 'Nov':
         msgTimePeriod = 'November';
         dbMiscData.homePercNov = newPercent;
         break;
      case 'Dec':
         msgTimePeriod = 'December';
         dbMiscData.homePercDec = newPercent;
         break;
   }
   await updateMiscData();
   setPercentGreen();
   fillMainDataFromArrays();
   alert(`${newPercent}% was successfully applied to ${msgTimePeriod} Time Period.`)
};

function verifyLockDate() {

   switch (myDOMs.homePercentModal.PeriodSelect.value) {

      case 'Year':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 0, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case '1Q':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 0, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case '2Q':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 3, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case '3Q':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 6, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case '4Q':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 9, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }

      case 'Jan':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 0, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Feb':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 1, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Mar':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 2, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Apr':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 3, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'May':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 4, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Jun':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 5, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Jul':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 6, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Aug':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 7, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Sep':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 8, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Oct':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 9, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Nov':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 10, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
      case 'Dec':
         if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.randomData.appYear, 11, 1)) {
            alert(`Because your Time Period Falls within the Lock date. \n The Save Function has been disabled! \n This is Likely because the Lock Date was set to prevent any changes \n during the time period in which the HST/GST Return has been filed!`);
            return true;
         } else {
            return false;
         }
   }
}

myDOMs.homePercentModal.BusinessHomePercent.addEventListener('input', function (event) {
   let IsDuplicate = false;
   if (myDOMs.homePercentModal.BusinessHomePercent.value === '' || myDOMs.homePercentModal.BusinessHomePercent.value === '.') {
      return;
   }

   if (isNaN(myDOMs.homePercentModal.BusinessHomePercent.value) || myDOMs.homePercentModal.BusinessHomePercent.value < 0 || myDOMs.homePercentModal.BusinessHomePercent.value > 100) {
      alert('Number from 0 to 100 only!');
      let tempString = myDOMs.homePercentModal.BusinessHomePercent.value;
      myDOMs.homePercentModal.BusinessHomePercent.value = tempString.substring(0, 2);
      return;
   }
   IsDuplicate = verifyIfDuplicatePercent(myDOMs.homePercentModal.BusinessHomePercent.value);

   if (IsDuplicate) {
      setPercentGreen();
   } else {
      setPercentRed();
   }

});

myDOMs.homePercentModal.BusinessHomePercent.addEventListener('change', function (event) {

   if (myDOMs.homePercentModal.BusinessHomePercent.value === '' && myDOMs.homePercentModal.PeriodSelect.value !== '') {
      myDOMs.homePercentModal.BusinessHomePercent.value = 0;
   }

   myDOMs.homePercentModal.BusinessHomePercent.value = Number(myDOMs.homePercentModal.BusinessHomePercent.value).toFixed(2)

});

function doTheMath() {
   let IsDuplicate = false;
   let FirstPart = 0;
   let SecondPart = 0;
   let ThirdPart = 0;


   if (myDOMs.homePercentModal.homeArea.value !== '' || myDOMs.homePercentModal.homeArea.value !== null || myDOMs.homePercentModal.homeArea.value !== undefined) {
      if (myDOMs.homePercentModal.hrsPerDay.value === '' || myDOMs.homePercentModal.hrsPerDay.value === null || myDOMs.homePercentModal.hrsPerDay.value === undefined) {
         FirstPart = 0;
      } else {
         FirstPart = Number(myDOMs.homePercentModal.hrsPerDay.value / 24);
      }

      if (myDOMs.homePercentModal.daysPerWeek.value === '' || myDOMs.homePercentModal.daysPerWeek.value === null || myDOMs.homePercentModal.daysPerWeek.value === undefined) {
         SecondPart = 0;
      } else {
         SecondPart = Number(myDOMs.homePercentModal.daysPerWeek.value / 7);
      }

      if (myDOMs.homePercentModal.businessArea.value === '' || myDOMs.homePercentModal.businessArea.value === null || myDOMs.homePercentModal.businessArea.value === undefined) {
         ThirdPart = 0;
      } else if (myDOMs.homePercentModal.homeArea.value === '' || myDOMs.homePercentModal.homeArea.value === null || myDOMs.homePercentModal.homeArea.value === undefined) {
         ThirdPart = 0;
      } else {
         ThirdPart = Number(myDOMs.homePercentModal.businessArea.value / myDOMs.homePercentModal.homeArea.value);
      }

      myDOMs.homePercentModal.BusinessHomePercent.value = Number(FirstPart * SecondPart * ThirdPart * Number(100)).toFixed(2);

      IsDuplicate = verifyIfDuplicatePercent(myDOMs.homePercentModal.BusinessHomePercent.value);

      if (IsDuplicate) {
         setPercentGreen();
      } else {
         setPercentRed();
      }

   }



}

myDOMs.homePercentModal.homeArea.addEventListener('input', function (event) {
   if (myDOMs.homePercentModal.homeArea.value !== '' || myDOMs.homePercentModal.homeArea.value !== null || myDOMs.homePercentModal.homeArea.value !== undefined) {
      return;
   }
   if (isNaN(myDOMs.homePercentModal.homeArea.value)) {
      alert('Numbers Only!');
      let tempString = myDOMs.homePercentModal.homeArea.value;
      myDOMs.homePercentModal.homeArea.value = tempString.substring(0, 2);
      return;
   }
});

myDOMs.homePercentModal.homeArea.addEventListener('change', function (event) {
   if (myDOMs.homePercentModal.businessArea.value !== '' || myDOMs.homePercentModal.businessArea.value !== null || myDOMs.homePercentModal.businessArea.value !== undefined) {
      if (Number(myDOMs.homePercentModal.homeArea.value) < Number(myDOMs.homePercentModal.businessArea.value)) {
         alert('Do Not Enter a Value Smaller than your Area for Business Value!');
         myDOMs.homePercentModal.homeArea.value = '';
         myDOMs.homePercentModal.homeArea.focus();
         return;
      }
   }
   doTheMath();
});

myDOMs.homePercentModal.businessArea.addEventListener('input', function (event) {
   let tempString;
   if (myDOMs.homePercentModal.businessArea.value !== '' || myDOMs.homePercentModal.businessArea.value !== null || myDOMs.homePercentModal.businessArea.value !== undefined) {
      return;
   }
   if (isNaN(myDOMs.homePercentModal.businessArea.value)) {
      alert('Numbers Only!');
      tempString = myDOMs.homePercentModal.businessArea.value;
      myDOMs.homePercentModal.businessArea.value = tempString.substring(0, 2);
      return;
   }

   if (myDOMs.homePercentModal.homeArea.value !== '' || myDOMs.homePercentModal.homeArea.value !== null || myDOMs.homePercentModal.homeArea.value !== undefined) {
      if (Number(myDOMs.homePercentModal.homeArea.value) < Number(myDOMs.homePercentModal.businessArea.value)) {
         alert('Do Not Enter a Value Smaller than your Area for Business Value!');
         tempString = myDOMs.homePercentModal.businessArea.value;
         myDOMs.homePercentModal.businessArea.value = tempString.substring(0, 2);
         return;
      }
   }
});

myDOMs.homePercentModal.businessArea.addEventListener('change', function (event) {
   doTheMath();
});


myDOMs.homePercentModal.daysPerWeek.addEventListener('input', function (event) {
   let tempString;
   if (myDOMs.homePercentModal.daysPerWeek.value !== '' || myDOMs.homePercentModal.daysPerWeek.value !== null || myDOMs.homePercentModal.daysPerWeek.value !== undefined) {
      return;
   }
   if (isNaN(myDOMs.homePercentModal.daysPerWeek.value)) {
      alert('Numbers Only!');
      tempString = myDOMs.homePercentModal.daysPerWeek.value;
      myDOMs.homePercentModal.daysPerWeek.value = tempString.substring(0, 2);
      return;
   }

   if (Number(myDOMs.homePercentModal.daysPerWeek.value) > 7) {
      alert('Do Not Enter a Value above 7!');
      tempString = myDOMs.homePercentModal.daysPerWeek.value;
      myDOMs.homePercentModal.daysPerWeek.value = tempString.substring(0, 2);
      return;
   }

});

myDOMs.homePercentModal.daysPerWeek.addEventListener('change', function (event) {
   doTheMath();
});

myDOMs.homePercentModal.hrsPerDay.addEventListener('input', function (event) {
   let tempString;
   if (myDOMs.homePercentModal.hrsPerDay.value !== '' || myDOMs.homePercentModal.hrsPerDay.value !== null || myDOMs.homePercentModal.hrsPerDay.value !== undefined) {
      return;
   }
   if (isNaN(myDOMs.homePercentModal.hrsPerDay.value)) {
      alert('Numbers Only!');
      tempString = myDOMs.homePercentModal.hrsPerDay.value;
      myDOMs.homePercentModal.hrsPerDay.value = tempString.substring(0, 2);
      return;
   }

   if (Number(myDOMs.homePercentModal.hrsPerDay.value) > 24) {
      alert('Do Not Enter a Value above 24!');
      tempString = myDOMs.homePercentModal.hrsPerDay.value;
      myDOMs.homePercentModal.hrsPerDay.value = tempString.substring(0, 2);
      return;
   }

});

myDOMs.homePercentModal.hrsPerDay.addEventListener('change', function (event) {
   doTheMath();
});

myDOMs.homePercentModal.resetBtn.addEventListener('click', function (event) {
   doReset();
});

function doReset() {
   myDOMs.homePercentModal.businessArea.value = '';
   myDOMs.homePercentModal.homeArea.value = '';
   myDOMs.homePercentModal.hrsPerDay.value = '';
   myDOMs.homePercentModal.daysPerWeek.value = '';
   updateTimePeriodChange();
}