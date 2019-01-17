//enableTooltip
//rowCountPerPage
//rowCountPerPageDefault
//Province Selector
//Current HST
//Current PST

//This variable is set to False in order to disable the Tooltips
let enableTooltip;

//this variable will be set to 10, 25, 50 or 100 and is the amount of expenses per page
//It can be set in settings by users
let rowCountPerPage = 10;
//This variable is the Default to the one above and is used to keep track of the setting the user adjusted in settings
let rowCountPerPageDefault = 10;

let provinceTaxSettings = {
   AB: {
      HST: 0.05,
      PST: 0.00
   },
   BC: {
      HST: 0.05,
      PST: 0.07
   },
   MB: {
      HST: 0.05,
      PST: 0.08
   },
   NB: {
      HST: 0.15,
      PST: 0.00
   },
   NL: {
      HST: 0.15,
      PST: 0.00
   },
   NT: {
      HST: 0.05,
      PST: 0.00
   },
   NS: {
      HST: 0.15,
      PST: 0.00
   },
   NU: {
      HST: 0.05,
      PST: 0.00
   },
   ON: {
      HST: 0.13,
      PST: 0.00
   },
   PEI: {
      HST: 0.15,
      PST: 0.00
   },
   QC: {
      HST: 0.05,
      PST: 0.09975
   },
   SK: {
      HST: 0.05,
      PST: 0.06
   },
   YT: {
      HST: 0.05,
      PST: 0.00
   },
   Current: {
      HST: 0.00,
      PST: 0.00,
      Province: ''
   },

}


function verifyAllLocalStorageForSettings() {
   if (localStorage.getItem(`${userEmail}_Count_Per_Page`) === null) {
      localStorage.setItem(`${userEmail}_Count_Per_Page`, Number(10));
      //alert('Count per Page was Null');
   } else {
      // alert(`Setting Count Per Page from Local Storage: ${localStorage.getItem('Count_Per_Page')}`)
      rowCountPerPage = Number(localStorage.getItem(`${userEmail}_Count_Per_Page`));
      rowCountPerPageDefault = Number(localStorage.getItem(`${userEmail}_Count_Per_Page`));
      myDOMs.settingsModal.ExpensePerPageSelect.value = Number(rowCountPerPageDefault);
   }

   if (localStorage.getItem(`${userEmail}_Current_HST`) === null && localStorage.getItem(`${userEmail}_Current_PST`) === null) {
      localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
      localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
   } else {
      provinceTaxSettings.Current.HST = localStorage.getItem(`${userEmail}_Current_HST`);
      provinceTaxSettings.Current.PST = localStorage.getItem(`${userEmail}_Current_PST`);
   }

   if (localStorage.getItem(`${userEmail}_Selected_Province`) === null) {
      alert(`Because this may be the first time using this Application, \n The Working Location Province needs to be Selected. \n To do so, Select the Appropriate Province \n by clicking on the Settings button located \n on the main page below Time Period`);
   } else {
      myDOMs.settingsModal.ProvinceSelect.value = localStorage.getItem(`${userEmail}_Selected_Province`);
   }

   if (provinceTaxSettings.Current.HST === 0 && provinceTaxSettings.Current.PST === 0) {
      alert(`The current Provincial Tax Rates are at zero \n To set them to your Working Location Province, \n Simply Select the Appropriate Province \n by clicking on the Settings button located \n on the main page below Time Period`);
   } else {
      myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.Current.HST
      myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.Current.PST
   }
   //AB
   if (localStorage.getItem(`${userEmail}_AB_HST`) === null) {
      localStorage.setItem(`${userEmail}_AB_HST`, provinceTaxSettings.AB.HST);
   } else {
      provinceTaxSettings.AB.HST = localStorage.getItem(`${userEmail}_AB_HST`);
   }
   if (localStorage.getItem(`${userEmail}_AB_PST`) === null) {
      localStorage.setItem(`${userEmail}_AB_PST`, provinceTaxSettings.AB.PST);
   } else {
      provinceTaxSettings.AB.PST = localStorage.getItem(`${userEmail}_AB_PST`);
   }
   //BC
   if (localStorage.getItem(`${userEmail}_BC_HST`) === null) {
      localStorage.setItem(`${userEmail}_BC_HST`, provinceTaxSettings.BC.HST);
   } else {
      provinceTaxSettings.BC.HST = localStorage.getItem(`${userEmail}_BC_HST`);
   }
   if (localStorage.getItem(`${userEmail}_BC_PST`) === null) {
      localStorage.setItem(`${userEmail}_BC_PST`, provinceTaxSettings.BC.PST);
   } else {
      provinceTaxSettings.BC.PST = localStorage.getItem(`${userEmail}_BC_PST`);
   }
   //MB
   if (localStorage.getItem(`${userEmail}_MB_HST`) === null) {
      localStorage.setItem(`${userEmail}_MB_HST`, provinceTaxSettings.MB.HST);
   } else {
      provinceTaxSettings.MB.HST = localStorage.getItem(`${userEmail}_MB_HST`);
   }
   if (localStorage.getItem(`${userEmail}_MB_PST`) === null) {
      localStorage.setItem(`${userEmail}_MB_PST`, provinceTaxSettings.MB.PST);
   } else {
      provinceTaxSettings.MB.PST = localStorage.getItem(`${userEmail}_MB_PST`);
   }
   //NB
   if (localStorage.getItem(`${userEmail}_NB_HST`) === null) {
      localStorage.setItem(`${userEmail}_NB_HST`, provinceTaxSettings.NB.HST);
   } else {
      provinceTaxSettings.NB.HST = localStorage.getItem(`${userEmail}_NB_HST`);
   }
   if (localStorage.getItem(`${userEmail}_NB_PST`) === null) {
      localStorage.setItem(`${userEmail}_NB_PST`, provinceTaxSettings.NB.PST);
   } else {
      provinceTaxSettings.NB.PST = localStorage.getItem(`${userEmail}_NB_PST`);
   }
   //NL
   if (localStorage.getItem(`${userEmail}_NL_HST`) === null) {
      localStorage.setItem(`${userEmail}_NL_HST`, provinceTaxSettings.NL.HST);
   } else {
      provinceTaxSettings.NL.HST = localStorage.getItem(`${userEmail}_NL_HST`);
   }
   if (localStorage.getItem(`${userEmail}_NL_PST`) === null) {
      localStorage.setItem(`${userEmail}_NL_PST`, provinceTaxSettings.NL.PST);
   } else {
      provinceTaxSettings.NL.PST = localStorage.getItem(`${userEmail}_NL_PST`);
   }
   //NT
   if (localStorage.getItem(`${userEmail}_NT_HST`) === null) {
      localStorage.setItem(`${userEmail}_NT_HST`, provinceTaxSettings.NT.HST);
   } else {
      provinceTaxSettings.NT.HST = localStorage.getItem(`${userEmail}_NT_HST`);
   }
   if (localStorage.getItem(`${userEmail}_NT_PST`) === null) {
      localStorage.setItem(`${userEmail}_NT_PST`, provinceTaxSettings.NT.PST);
   } else {
      provinceTaxSettings.NT.PST = localStorage.getItem(`${userEmail}_NT_PST`);
   }
   //NS
   if (localStorage.getItem(`${userEmail}_NS_HST`) === null) {
      localStorage.setItem(`${userEmail}_NS_HST`, provinceTaxSettings.NS.HST);
   } else {
      provinceTaxSettings.NS.HST = localStorage.getItem(`${userEmail}_NS_HST`);
   }
   if (localStorage.getItem(`${userEmail}_NS_PST`) === null) {
      localStorage.setItem(`${userEmail}_NS_PST`, provinceTaxSettings.NS.PST);
   } else {
      provinceTaxSettings.NS.PST = localStorage.getItem(`${userEmail}_NS_PST`);
   }
   //NU
   if (localStorage.getItem(`${userEmail}_NU_HST`) === null) {
      localStorage.setItem(`${userEmail}_NU_HST`, provinceTaxSettings.NU.HST);
   } else {
      provinceTaxSettings.NU.HST = localStorage.getItem(`${userEmail}_NU_HST`);
   }
   if (localStorage.getItem(`${userEmail}_NU_PST`) === null) {
      localStorage.setItem(`${userEmail}_NU_PST`, provinceTaxSettings.NU.PST);
   } else {
      provinceTaxSettings.NU.PST = localStorage.getItem(`${userEmail}_NU_PST`);
   }
   //ON
   if (localStorage.getItem(`${userEmail}_ON_HST`) === null) {
      localStorage.setItem(`${userEmail}_ON_HST`, provinceTaxSettings.ON.HST);
   } else {
      provinceTaxSettings.ON.HST = localStorage.getItem(`${userEmail}_ON_HST`);
   }
   if (localStorage.getItem(`${userEmail}_ON_PST`) === null) {
      localStorage.setItem(`${userEmail}_ON_PST`, provinceTaxSettings.ON.PST);
   } else {
      provinceTaxSettings.ON.PST = localStorage.getItem(`${userEmail}_ON_PST`);
   }
   //PEI
   if (localStorage.getItem(`${userEmail}_PEI_HST`) === null) {
      localStorage.setItem(`${userEmail}_PEI_HST`, provinceTaxSettings.PEI.HST);
   } else {
      provinceTaxSettings.PEI.HST = localStorage.getItem(`${userEmail}_PEI_HST`);
   }
   if (localStorage.getItem(`${userEmail}_PEI_PST`) === null) {
      localStorage.setItem(`${userEmail}_PEI_PST`, provinceTaxSettings.PEI.PST);
   } else {
      provinceTaxSettings.PEI.PST = localStorage.getItem(`${userEmail}_PEI_PST`);
   }
   //QC
   if (localStorage.getItem(`${userEmail}_QC_HST`) === null) {
      localStorage.setItem(`${userEmail}_QC_HST`, provinceTaxSettings.QC.HST);
   } else {
      provinceTaxSettings.QC.HST = localStorage.getItem(`${userEmail}_QC_HST`);
   }
   if (localStorage.getItem(`${userEmail}_QC_PST`) === null) {
      localStorage.setItem(`${userEmail}_QC_PST`, provinceTaxSettings.QC.PST);
   } else {
      provinceTaxSettings.QC.PST = localStorage.getItem(`${userEmail}_QC_PST`);
   }
   //SK
   if (localStorage.getItem(`${userEmail}_SK_HST`) === null) {
      localStorage.setItem(`${userEmail}_SK_HST`, provinceTaxSettings.SK.HST);
   } else {
      provinceTaxSettings.SK.HST = localStorage.getItem(`${userEmail}_SK_HST`);
   }
   if (localStorage.getItem(`${userEmail}_SK_PST`) === null) {
      localStorage.setItem(`${userEmail}_SK_PST`, provinceTaxSettings.SK.PST);
   } else {
      provinceTaxSettings.SK.PST = localStorage.getItem(`${userEmail}_SK_PST`);
   }
   //YT
   if (localStorage.getItem(`${userEmail}_YT_HST`) === null) {
      localStorage.setItem(`${userEmail}_YT_HST`, provinceTaxSettings.YT.HST);
   } else {
      provinceTaxSettings.YT.HST = localStorage.getItem(`${userEmail}_YT_HST`);
   }
   if (localStorage.getItem(`${userEmail}_YT_PST`) === null) {
      localStorage.setItem(`${userEmail}_YT_PST`, provinceTaxSettings.YT.PST);
   } else {
      provinceTaxSettings.YT.PST = localStorage.getItem(`${userEmail}_YT_PST`);
   }


   if (localStorage.getItem(`${userEmail}_Count_Per_Page`) === null) {
      localStorage.setItem(`${userEmail}_Count_Per_Page`, Number(10));
   } else {
      rowCountPerPage = Number(localStorage.getItem(`${userEmail}_Count_Per_Page`));
      rowCountPerPageDefault = Number(localStorage.getItem(`${userEmail}_Count_Per_Page`));
      myDOMs.settingsModal.ExpensePerPageSelect.value = Number(rowCountPerPageDefault);
   }

   if (localStorage.getItem(`${userEmail}_Tooltips`) === null) {
      localStorage.setItem(`${userEmail}_Tooltips`, true);
      myDOMs.settingsModal.TooltipBtnDisabled.checked = false;
      myDOMs.settingsModal.TooltipBtnEnabled.checked = true;
      enableTooltip = true;
      setTooltips();
   } else {
      enableTooltip = localStorage.getItem(`${userEmail}_Tooltips`);
      if (enableTooltip === "true" || enableTooltip === true) {
         myDOMs.settingsModal.TooltipBtnDisabled.checked = false;
         myDOMs.settingsModal.TooltipBtnEnabled.checked = true;
         enableTooltip = true;
         setTooltips();
      } else {
         myDOMs.settingsModal.TooltipBtnDisabled.checked = true;
         myDOMs.settingsModal.TooltipBtnEnabled.checked = false;
         enableTooltip = false;
         setTooltips();
      }
   }
};



function DisplaySettingsModal() {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
   } else if (userEmail !== null && userEmail !== '') {
      $("#settingsModal").modal("show");
   }

};


myDOMs.settingsModal.TooltipBtnEnabled.addEventListener('click', function (e) {

   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      if (myDOMs.settingsModal.TooltipBtnDisabled.checked === true) {
         myDOMs.settingsModal.TooltipBtnEnabled.checked = false;
      } else {
         myDOMs.settingsModal.TooltipBtnEnabled.checked = true;
      }
      return;
   }
   if (myDOMs.settingsModal.TooltipBtnEnabled.checked !== false) {
      myDOMs.settingsModal.TooltipBtnDisabled.checked = false;
      enableTooltip = true;
      localStorage.setItem(`${userEmail}_Tooltips`, true);
      setTooltips();
   } else {
      myDOMs.settingsModal.TooltipBtnDisabled.checked = true;
      enableTooltip = false;
      localStorage.setItem(`${userEmail}_Tooltips`, false);
      setTooltips();
   }
});

myDOMs.settingsModal.TooltipBtnDisabled.addEventListener('click', function (e) {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      if (myDOMs.settingsModal.TooltipBtnEnabled.checked === true) {
         myDOMs.settingsModal.TooltipBtnDisabled.checked = false;
      } else {
         myDOMs.settingsModal.TooltipBtnDisabled.checked = true;
      }
      return;
   }

   if (myDOMs.settingsModal.TooltipBtnDisabled.checked !== false) {
      myDOMs.settingsModal.TooltipBtnEnabled.checked = false;
      enableTooltip = false;
      localStorage.setItem(`${userEmail}_Tooltips`, false);
      setTooltips();
   } else {
      myDOMs.settingsModal.TooltipBtnEnabled.checked = true;
      enableTooltip = true;
      localStorage.setItem(`${userEmail}_Tooltips`, true);
      setTooltips();
   }
});

myDOMs.settingsModal.ExpensePerPageSelect.addEventListener('change', function (event) {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      myDOMs.settingsModal.ExpensePerPageSelect.value = rowCountPerPage;
      return;
   }
   rowCountPerPage = Number(myDOMs.settingsModal.ExpensePerPageSelect.value);
   rowCountPerPageDefault = Number(myDOMs.settingsModal.ExpensePerPageSelect.value);
   localStorage.setItem(`${userEmail}_Count_Per_Page`, Number(myDOMs.settingsModal.ExpensePerPageSelect.value));
});

function updateHSTforSelectedProvince() {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      myDOMs.settingsModal.HSTsetting.value = 0;
      return;
   }

   if (myDOMs.settingsModal.HSTsetting.value > 100) {
      alert('Value above 100 is not permitted!');
      myDOMs.settingsModal.HSTsetting.value = 0;
      return;
   }

   if (myDOMs.settingsModal.HSTsetting.value > 1) {
      myDOMs.settingsModal.HSTsetting.value = (myDOMs.settingsModal.HSTsetting.value / 100);
   }

   if (myDOMs.settingsModal.HSTsetting.value === "") {
      myDOMs.settingsModal.HSTsetting.value = 0;
   }

   switch (myDOMs.settingsModal.ProvinceSelect.value) {
      case "1":
         provinceTaxSettings.AB.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.AB.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_AB_HST`, provinceTaxSettings.Current.HST);
         break;
      case "2":
         provinceTaxSettings.BC.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.BC.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_BC_HST`, provinceTaxSettings.Current.HST);
         break;
      case "3":
         provinceTaxSettings.MB.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.MB.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_MB_HST`, provinceTaxSettings.Current.HST);
         break;
      case "4":
         provinceTaxSettings.NB.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.NB.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_NB_HST`, provinceTaxSettings.Current.HST);
         break;
      case "5":
         provinceTaxSettings.NL.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.NL.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_NL_HST`, provinceTaxSettings.Current.HST);
         break;
      case "6":
         provinceTaxSettings.NT.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.NT.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_NT_HST`, provinceTaxSettings.Current.HST);
         break;
      case "7":
         provinceTaxSettings.NS.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.NS.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_NS_HST`, provinceTaxSettings.Current.HST);
         break;
      case "8":
         provinceTaxSettings.NU.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.NU.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_NU_HST`, provinceTaxSettings.Current.HST);
         break;
      case "9":
         provinceTaxSettings.ON.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.ON.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_ON_HST`, provinceTaxSettings.Current.HST);
         break;
      case "10":
         provinceTaxSettings.PEI.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.PEI.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_PEI_HST`, provinceTaxSettings.Current.HST);
         break;
      case "11":
         provinceTaxSettings.QC.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.QC.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_QC_HST`, provinceTaxSettings.Current.HST);
         break;
      case "12":
         provinceTaxSettings.SK.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.SK.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_SK_HST`, provinceTaxSettings.Current.HST);
         break;
      case "13":
         provinceTaxSettings.YT.HST = myDOMs.settingsModal.HSTsetting.value;
         provinceTaxSettings.Current.HST = provinceTaxSettings.YT.HST
         localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
         localStorage.setItem(`${userEmail}_YT_HST`, provinceTaxSettings.Current.HST);
   };
}



function updatePSTforSelectedProvince() {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      myDOMs.settingsModal.PSTsetting.value = 0;
      return;
   }

   if (myDOMs.settingsModal.PSTsetting.value > 100) {
      alert('Value above 100 is not permitted!');
      myDOMs.settingsModal.PSTsetting.value = 0;
      return;
   }

   if (myDOMs.settingsModal.PSTsetting.value > 1) {
      myDOMs.settingsModal.PSTsetting.value = (myDOMs.settingsModal.PSTsetting.value / 100);
   }

   if (myDOMs.settingsModal.PSTsetting.value === "") {
      myDOMs.settingsModal.PSTsetting.value = 0;
   }

   switch (myDOMs.settingsModal.ProvinceSelect.value) {
      case "1":
         provinceTaxSettings.AB.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.AB.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_AB_PST`, provinceTaxSettings.Current.PST);
         break;
      case "2":
         provinceTaxSettings.BC.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.BC.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_BC_PST`, provinceTaxSettings.Current.PST);
         break;
      case "3":
         provinceTaxSettings.MB.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.MB.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_MB_PST`, provinceTaxSettings.Current.PST);
         break;
      case "4":
         provinceTaxSettings.NB.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.NB.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_NB_PST`, provinceTaxSettings.Current.PST);
         break;
      case "5":
         provinceTaxSettings.NL.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.NL.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_NL_PST`, provinceTaxSettings.Current.PST);
         break;
      case "6":
         provinceTaxSettings.NT.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.NT.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_NT_PST`, provinceTaxSettings.Current.PST);
         break;
      case "7":
         provinceTaxSettings.NS.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.NS.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_NS_PST`, provinceTaxSettings.Current.PST);
         break;
      case "8":
         provinceTaxSettings.NU.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.NU.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_NU_PST`, provinceTaxSettings.Current.PST);
         break;
      case "9":
         provinceTaxSettings.ON.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.ON.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_ON_PST`, provinceTaxSettings.Current.PST);
         break;
      case "10":
         provinceTaxSettings.PEI.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.PEI.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_PEI_PST`, provinceTaxSettings.Current.PST);
         break;
      case "11":
         provinceTaxSettings.QC.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.QC.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_QC_PST`, provinceTaxSettings.Current.PST);
         break;
      case "12":
         provinceTaxSettings.SK.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.SK.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_SK_PST`, provinceTaxSettings.Current.PST);
         break;
      case "13":
         provinceTaxSettings.YT.PST = myDOMs.settingsModal.PSTsetting.value;
         provinceTaxSettings.Current.PST = provinceTaxSettings.YT.PST
         localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
         localStorage.setItem(`${userEmail}_YT_PST`, provinceTaxSettings.Current.PST);
   };
}

myDOMs.settingsModal.ProvinceSelect.addEventListener('change', function (event) {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      myDOMs.settingsModal.ProvinceSelect.value = "";
      return;
   }
   let selectedProvince = '';
   switch (myDOMs.settingsModal.ProvinceSelect.value) {
      case "1":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.AB.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.AB.PST
         selectedProvince = "1";
         break;
      case "2":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.BC.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.BC.PST
         selectedProvince = "2";
         break;
      case "3":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.MB.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.MB.PST
         selectedProvince = "3";
         break;
      case "4":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.NB.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.NB.PST
         selectedProvince = "4";
         break;
      case "5":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.NL.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.NL.PST
         selectedProvince = "5";
         break;
      case "6":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.NT.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.NT.PST
         selectedProvince = "6";
         break;
      case "7":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.NS.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.NS.PST
         selectedProvince = "7";
         break;
      case "8":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.NU.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.NU.PST
         selectedProvince = "8";
         break;
      case "9":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.ON.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.ON.PST
         selectedProvince = "9";
         break;
      case "10":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.PEI.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.PEI.PST
         selectedProvince = "10";
         break;
      case "11":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.QC.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.QC.PST
         selectedProvince = "11";
         break;
      case "12":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.SK.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.SK.PST
         selectedProvince = "12";
         break;
      case "13":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.YT.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.YT.PST
         selectedProvince = "13";
   };

   provinceTaxSettings.Current.HST = myDOMs.settingsModal.HSTsetting.value;
   provinceTaxSettings.Current.PST = myDOMs.settingsModal.PSTsetting.value;
   localStorage.setItem(`${userEmail}_Current_HST`, provinceTaxSettings.Current.HST);
   localStorage.setItem(`${userEmail}_Current_PST`, provinceTaxSettings.Current.PST);
   localStorage.setItem(`${userEmail}_Selected_Province`, selectedProvince);
   updateHSTMenus();
});


async function fillAcctBalance() {
   let TempArray = [];
   await FillBusIncomeData();
   await FillRentalIncomeData();
   await FillAllPaymentData();
   AddPaymentsToIncomeArrays();
   TempArray = BusAcctArray.concat(RentalAcctArray);
   AccountArray = TempArray.concat(PaymentAcctArray);
   await sortAccountArrayByDate();
   await addMathColumnsToArray();
   let myDateTemp = new Date(myDOMs.main_page.StartDate.value);
   let myTempStartDate = new Date(myDateTemp.getUTCFullYear(), 0, 1);
   myTempStartDate.setUTCHours(0);

   let myTempEndDate = new Date(myDOMs.main_page.EndDate.value);

   updatedViewDynamicData(myTempStartDate, myTempEndDate, true);
};


function FillBusIncomeData() {
   let tempData;

   tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: 0,
      startDay: 1,
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate(),
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
            if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' || window.sessionStorage.getItem('myRandomVar') === null) {
               reject("You Must be logged in before using EZ-HST-CANADA!");
               alert('You Must be logged in before using EZ-HST-CANADA');
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });


};

function FillRentalIncomeData() {
   let tempData;

   tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: 0,
      startDay: 1,
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate(),
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
            if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' || window.sessionStorage.getItem('myRandomVar') === null) {
               reject("You Must be logged in before using EZ-HST-CANADA!");
               alert('You Must be logged in before using EZ-HST-CANADA')
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });



}

function FillAllPaymentData() {
   let tempData;

   tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: 0,
      startDay: 1,
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate()
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
            if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' || window.sessionStorage.getItem('myRandomVar') === null) {
               reject("You Must be logged in before using EZ-HST-CANADA!");
               alert('You Must be logged in before using EZ-HST-CANADA')
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });
};


function setTooltips() {
   let myDisable = '';
   if (enableTooltip !== false) {
      myDisable = 'enable';
   } else {
      myDisable = 'disable';
   }
   //HST/GST Return
   $('#PeriodStartDate').tooltip(myDisable);
   $('#PeriodEndDate').tooltip(myDisable);
   $('#Line101').tooltip(myDisable);
   $('#Line103').tooltip(myDisable);
   $('#Line104').tooltip(myDisable);
   $('#Line105').tooltip(myDisable);
   $('#Line106').tooltip(myDisable);
   $('#Line107').tooltip(myDisable);
   $('#Line108').tooltip(myDisable);
   $('#Line109').tooltip(myDisable);
   $('#Line110').tooltip(myDisable);
   $('#Line111').tooltip(myDisable);
   $('#Line112').tooltip(myDisable);
   $('#Line113A').tooltip(myDisable);
   $('#Line113B').tooltip(myDisable);
   $('#Line113C').tooltip(myDisable);
   $('#Line114').tooltip(myDisable);
   $('#Line115').tooltip(myDisable);
   $('#Line205').tooltip(myDisable);
   $('#Line405').tooltip(myDisable);
   //Home Business Percentage
   $('#hoursPerDay').tooltip(myDisable);
   $('#daysPerWeek').tooltip(myDisable);
   $('#businessArea').tooltip(myDisable);
   $('#houseArea').tooltip(myDisable);
   $('#businessPercent').tooltip(myDisable);
   $('#timePeriodHomePercentSelect').tooltip(myDisable);
   $('#btnApplyPercent').tooltip(myDisable);
   $('#btnPercentCalcReset').tooltip(myDisable);
   //Bus Expenses
   $('#busDate').tooltip(myDisable);
   $('#busAutoAmount').tooltip(myDisable);
   $('#busnetAmt').tooltip(myDisable);
   $('#bushstAmt').tooltip(myDisable);
   $('#buspstAmt').tooltip(myDisable);
   $('#busTotalAmt').tooltip(myDisable);
   $('#busDescription').tooltip(myDisable);
   $('#vendorSelectBus').tooltip(myDisable);
   $('#busExpCatSelect').tooltip(myDisable);
   $('#busTitle').tooltip(myDisable);
   $('#busEntryformReset').tooltip(myDisable);
   $('#myImgBus').tooltip(myDisable);
   $('#busExpShowFullSize').tooltip(myDisable);
   $('#imgloadBus').tooltip(myDisable);
   $('#checkboxReceiptBus').tooltip(myDisable);
   $('#busExpReoccurringYES').tooltip(myDisable);
   $('#busExpReoccurringNO').tooltip(myDisable);
   $('#busExpAlert').tooltip(myDisable);
   $('#alertContainerBusiness').tooltip(myDisable);
   $('#busCloseBtnAlert').tooltip(myDisable);
   $('#busExpID').tooltip(myDisable);
   $('#busBlindExpID').tooltip(myDisable);
   $('#busExpBtn').tooltip(myDisable);
   $('#BusExpenseModal').tooltip(myDisable);
   $('#busExpSaveChangesBtn').tooltip(myDisable);
   $('#busExpShowHideReceipt').tooltip(myDisable);
   $('#busExpShowHideReceiptDiv').tooltip(myDisable);
   $('#busAddVendor').tooltip(myDisable);
   $('#busDeleteVendor').tooltip(myDisable);
   $('#busFileInputLbl').tooltip(myDisable);
   $('#btnRemoveImgBus').tooltip(myDisable);
   $('#busExpDeleteBtn').tooltip(myDisable);
   $('#closeBusExpModal').tooltip(myDisable);
   //vehicle 1 Expenses
   $('#carDate').tooltip(myDisable);
   $('#carAutoAmount').tooltip(myDisable);
   $('#carnetAmt').tooltip(myDisable);
   $('#carhstAmt').tooltip(myDisable);
   $('#carpstAmt').tooltip(myDisable);
   $('#carTotalAmt').tooltip(myDisable);
   $('#carDescription').tooltip(myDisable);
   $('#vendorSelect').tooltip(myDisable);
   $('#carExpCatSelect').tooltip(myDisable);
   $('#carSelector').tooltip(myDisable);
   $('#carTitle').tooltip(myDisable);
   $('#carEntryformReset').tooltip(myDisable);
   $('#myImg').tooltip(myDisable);
   $('#carExpShowFullSize').tooltip(myDisable);
   $('#imgload').tooltip(myDisable);
   $('#checkboxReceipt').tooltip(myDisable);
   $('#carExpReoccurringYES').tooltip(myDisable);
   $('#carExpReoccurringNO').tooltip(myDisable);
   $('#carExpAlert').tooltip(myDisable);
   $('#alertContainer').tooltip(myDisable);
   $('#closeBtnAlert').tooltip(myDisable);
   $('#carExpID').tooltip(myDisable);
   $('#carBlindExpID').tooltip(myDisable);
   $('#carExpBtn').tooltip(myDisable);
   $('#addCarExpenseModal').tooltip(myDisable);
   $('#carExpSaveChangesBtn').tooltip(myDisable);
   $('#carExpShowHideReceipt').tooltip(myDisable);
   $('#carExpShowHideReceiptDiv').tooltip(myDisable);
   $('#carAddVendor').tooltip(myDisable);
   $('#carDeleteVendor').tooltip(myDisable);
   $('#carFileInputLbl').tooltip(myDisable);
   $('#btnRemoveImg').tooltip(myDisable);
   $('#carExpDeleteBtn').tooltip(myDisable);
   $('#closeCarExpModal').tooltip(myDisable);
   //Home Expenses
   $('#homeDate').tooltip(myDisable);
   $('#homeAutoAmount').tooltip(myDisable);
   $('#homenetAmt').tooltip(myDisable);
   $('#homehstAmt').tooltip(myDisable);
   $('#homepstAmt').tooltip(myDisable);
   $('#homeTotalAmt').tooltip(myDisable);
   $('#homeDescription').tooltip(myDisable);
   $('#vendorSelectHome').tooltip(myDisable);
   $('#homeExpCatSelect').tooltip(myDisable);
   $('#homeTitle').tooltip(myDisable);
   $('#homeEntryformReset').tooltip(myDisable);
   $('#myImgHome').tooltip(myDisable);
   $('#homeExpShowFullSize').tooltip(myDisable);
   $('#imgloadHome').tooltip(myDisable);
   $('#checkboxReceiptHome').tooltip(myDisable);
   $('#homeExpReoccurringYES').tooltip(myDisable);
   $('#homeExpReoccurringNO').tooltip(myDisable);
   $('#homeExpAlert').tooltip(myDisable);
   $('#alertContainerHome').tooltip(myDisable);
   $('#homeCloseBtnAlert').tooltip(myDisable);
   $('#homeExpID').tooltip(myDisable);
   $('#homeBlindExpID').tooltip(myDisable);
   $('#homeExpBtn').tooltip(myDisable);
   $('#HomeExpenseModal').tooltip(myDisable);
   $('#homeExpSaveChangesBtn').tooltip(myDisable);
   $('#homeExpShowHideReceipt').tooltip(myDisable);
   $('#homeExpShowHideReceiptDiv').tooltip(myDisable);
   $('#homeAddVendor').tooltip(myDisable);
   $('#homeDeleteVendor').tooltip(myDisable);
   $('#homeFileInputLbl').tooltip(myDisable);
   $('#btnRemoveImgHome').tooltip(myDisable);
   $('#homeExpDeleteBtn').tooltip(myDisable);
   $('#closeHomeExpModal').tooltip(myDisable);
   //Other Costs Expenses
   $('#otherDate').tooltip(myDisable);
   $('#otherAutoAmount').tooltip(myDisable);
   $('#othernetAmt').tooltip(myDisable);
   $('#otherhstAmt').tooltip(myDisable);
   $('#otherpstAmt').tooltip(myDisable);
   $('#otherTotalAmt').tooltip(myDisable);
   $('#otherDescription').tooltip(myDisable);
   $('#vendorSelectOther').tooltip(myDisable);
   $('#otherExpCatSelect').tooltip(myDisable);
   $('#otherTitle').tooltip(myDisable);
   $('#otherEntryformReset').tooltip(myDisable);
   $('#myImgOther').tooltip(myDisable);
   $('#otherExpShowFullSize').tooltip(myDisable);
   $('#imgloadOther').tooltip(myDisable);
   $('#checkboxReceiptOther').tooltip(myDisable);
   $('#otherExpReoccurringYES').tooltip(myDisable);
   $('#otherExpReoccurringNO').tooltip(myDisable);
   $('#otherExpAlert').tooltip(myDisable);
   $('#alertContainerOther').tooltip(myDisable);
   $('#otherCloseBtnAlert').tooltip(myDisable);
   $('#otherExpID').tooltip(myDisable);
   $('#otherBlindExpID').tooltip(myDisable);
   $('#otherExpBtn').tooltip(myDisable);
   $('#OtherExpenseModal').tooltip(myDisable);
   $('#otherExpSaveChangesBtn').tooltip(myDisable);
   $('#otherExpShowHideReceipt').tooltip(myDisable);
   $('#otherExpShowHideReceiptDiv').tooltip(myDisable);
   $('#otherAddVendor').tooltip(myDisable);
   $('#otherDeleteVendor').tooltip(myDisable);
   $('#otherFileInputLbl').tooltip(myDisable);
   $('#btnRemoveImgOther').tooltip(myDisable);
   $('#otherExpDeleteBtn').tooltip(myDisable);
   $('#closeOtherExpModal').tooltip(myDisable);
   //Rental Expenses
   $('#rentalDate').tooltip(myDisable);
   $('#rentalAutoAmount').tooltip(myDisable);
   $('#rentalnetAmt').tooltip(myDisable);
   $('#rentalhstAmt').tooltip(myDisable);
   $('#rentalpstAmt').tooltip(myDisable);
   $('#rentalTotalAmt').tooltip(myDisable);
   $('#rentalDescription').tooltip(myDisable);
   $('#vendorSelectRental').tooltip(myDisable);
   $('#rentalExpCatSelect').tooltip(myDisable);
   $('#rentalTitle').tooltip(myDisable);
   $('#rentalEntryformReset').tooltip(myDisable);
   $('#myImgRental').tooltip(myDisable);
   $('#rentalExpShowFullSize').tooltip(myDisable);
   $('#imgloadRental').tooltip(myDisable);
   $('#checkboxReceiptRental').tooltip(myDisable);
   $('#rentalExpReoccurringYES').tooltip(myDisable);
   $('#rentalExpReoccurringNO').tooltip(myDisable);
   $('#rentalExpAlert').tooltip(myDisable);
   $('#alertContainerRental').tooltip(myDisable);
   $('#rentalCloseBtnAlert').tooltip(myDisable);
   $('#rentalExpID').tooltip(myDisable);
   $('#rentalBlindExpID').tooltip(myDisable);
   $('#rentalExpBtn').tooltip(myDisable);
   $('#RentalExpenseModal').tooltip(myDisable);
   $('#rentalExpSaveChangesBtn').tooltip(myDisable);
   $('#rentalExpShowHideReceipt').tooltip(myDisable);
   $('#rentalExpShowHideReceiptDiv').tooltip(myDisable);
   $('#rentalAddVendor').tooltip(myDisable);
   $('#rentalDeleteVendor').tooltip(myDisable);
   $('#rentalFileInputLbl').tooltip(myDisable);
   $('#btnRemoveImgRental').tooltip(myDisable);
   $('#rentalExpDeleteBtn').tooltip(myDisable);
   $('#closeRentalExpModal').tooltip(myDisable);
   //Income
   $('#incomeDate').tooltip(myDisable);
   $('#incomeAutoAmount').tooltip(myDisable);
   $('#incomenetAmt').tooltip(myDisable);
   $('#incomehstAmt').tooltip(myDisable);
   $('#incomepstAmt').tooltip(myDisable);
   $('#incomeTotalAmt').tooltip(myDisable);
   $('#incomeDescription').tooltip(myDisable);
   $('#vendorSelectIncome').tooltip(myDisable);
   $('#incomePartySelect').tooltip(myDisable);
   $('#incomeTitle').tooltip(myDisable);
   $('#incomeEntryformReset').tooltip(myDisable);
   $('#myImgIncome').tooltip(myDisable);
   $('#incomeExpShowFullSize').tooltip(myDisable);
   $('#imgloadIncome').tooltip(myDisable);
   $('#checkboxReceiptIncome').tooltip(myDisable);
   $('#incomeExpReoccurringYES').tooltip(myDisable);
   $('#incomeExpReoccurringNO').tooltip(myDisable);
   $('#incomeExpAlert').tooltip(myDisable);
   $('#alertContainerIncome').tooltip(myDisable);
   $('#incomeCloseBtnAlert').tooltip(myDisable);
   $('#incomeExpID').tooltip(myDisable);
   $('#incomeBlindExpID').tooltip(myDisable);
   $('#incomeExpBtn').tooltip(myDisable);
   $('#IncomeModal').tooltip(myDisable);
   $('#incomeExpSaveChangesBtn').tooltip(myDisable);
   $('#incomeExpShowHideReceipt').tooltip(myDisable);
   $('#incomeExpShowHideReceiptDiv').tooltip(myDisable);
   $('#incomeAddVendor').tooltip(myDisable);
   $('#incomeDeleteVendor').tooltip(myDisable);
   $('#incomeAddParty').tooltip(myDisable);
   $('#incomeDeleteParty').tooltip(myDisable);
   $('#incomeFileInputLbl').tooltip(myDisable);
   $('#btnRemoveImgIncome').tooltip(myDisable);
   $('#incomeExpDeleteBtn').tooltip(myDisable);
   $('#closeIncomeExpModal').tooltip(myDisable);
   $('#incomeSelector').tooltip(myDisable);
   //Vehicle Log
   $('#vehicleLogModal').tooltip(myDisable);
   $('#vehicleLogTitle').tooltip(myDisable);
   $('#vehicleLogSelectCarForm').tooltip(myDisable);
   $('#vehicleLogSelector').tooltip(myDisable);
   $('#vLogDayDisplay').tooltip(myDisable);
   $('#vLogMonthDisplay').tooltip(myDisable);
   $('#vLogQuarterDisplay').tooltip(myDisable);
   $('#vLogYearDisplay').tooltip(myDisable);
   $('#vLogBtnFirst').tooltip(myDisable);
   $('#vLogBtnPrevious').tooltip(myDisable);
   $('#vLogBtnNext').tooltip(myDisable);
   $('#vLogBtnLast').tooltip(myDisable);
   $('#vLogBtnSave').tooltip(myDisable);
   $('#vLogBtnDelete').tooltip(myDisable);
   $('#vLogBtnSaveOdometer').tooltip(myDisable);
   $('#vLogBtnResetLog').tooltip(myDisable);
   $('#vLogQuickPercent').tooltip(myDisable);
   $('#vehicleLogDate').tooltip(myDisable);
   $('#vLogBusKMInput').tooltip(myDisable);
   $('#vLogPerKMInput').tooltip(myDisable);
   $('#vLogOdometer').tooltip(myDisable);
   $('#vLogBusKMTotal').tooltip(myDisable);
   $('#vLogPerKMTotal').tooltip(myDisable);
   $('#vLogOdometerTotal').tooltip(myDisable);
   $('#vLogBusPercentYear').tooltip(myDisable);
   $('#vLogBusPercentQuarter').tooltip(myDisable);
   $('#vLogBusPercentMonth').tooltip(myDisable);
   $('#alertVehicleLog').tooltip(myDisable);
   $('#alertVehicleLogContainer').tooltip(myDisable);
   $('#VehicleLogCloseBtnAlert').tooltip(myDisable);
   $('#dayDisplayVLog').tooltip(myDisable);
   //Income Statement
   $('#IncStatRevenue').tooltip(myDisable);
   $('#IncStatBusExpenses').tooltip(myDisable);
   //Business Expense Section
   $('#busAdvertisingLink').tooltip(myDisable);
   $('#busDuesLink').tooltip(myDisable);
   $('#busMealsLink').tooltip(myDisable);
   $('#busOfficeLink').tooltip(myDisable);
   $('#busSuppliesLink').tooltip(myDisable);
   $('#busCellLink').tooltip(myDisable);
   $('#busOtherLink').tooltip(myDisable);
   $('#busFreightLink').tooltip(myDisable);
   $('#busFuelLink').tooltip(myDisable);
   $('#busInsuranceLink').tooltip(myDisable);
   $('#busInterestLink').tooltip(myDisable);
   $('#busMaintenanceLink').tooltip(myDisable);
   $('#busAdminLink').tooltip(myDisable);
   $('#busLegalLink').tooltip(myDisable);
   $('#busPropertyTaxLink').tooltip(myDisable);
   $('#busRentLink').tooltip(myDisable);
   $('#busWagesLink').tooltip(myDisable);
   $('#busTravelLink').tooltip(myDisable);
   $('#busVariable1Link').tooltip(myDisable);
   $('#busVariable2Link').tooltip(myDisable);
   $('#busVariable3Link').tooltip(myDisable);
   $('#busVariable4Link').tooltip(myDisable);
   $('#busVariable5Link').tooltip(myDisable);
   $('#busCCALink').tooltip(myDisable);
   $('#incStBusinessExpTotal').tooltip(myDisable);
   $('#busAdvertisingSpan').tooltip(myDisable);
   $('#busDuesSpan').tooltip(myDisable);
   $('#busMealsSpan').tooltip(myDisable);
   $('#busOfficeSpan').tooltip(myDisable);
   $('#busSuppliesSpan').tooltip(myDisable);
   $('#busCellSpan').tooltip(myDisable);
   $('#busOtherSpan').tooltip(myDisable);
   $('#busFreightSpan').tooltip(myDisable);
   $('#busFuelSpan').tooltip(myDisable);
   $('#busInsuranceSpan').tooltip(myDisable);
   $('#busInterestSpan').tooltip(myDisable);
   $('#busMaintenanceSpan').tooltip(myDisable);
   $('#busAdminSpan').tooltip(myDisable);
   $('#busLegalSpan').tooltip(myDisable);
   $('#busPropertyTaxSpan').tooltip(myDisable);
   $('#busRentSpan').tooltip(myDisable);
   $('#busWagesSpan').tooltip(myDisable);
   $('#busTravelSpan').tooltip(myDisable);
   $('#busVariable1Span').tooltip(myDisable);
   $('#busVariable2Span').tooltip(myDisable);
   $('#busVariable3Span').tooltip(myDisable);
   $('#busVariable4Span').tooltip(myDisable);
   $('#busVariable5Span').tooltip(myDisable);
   $('#busCCASpan').tooltip(myDisable);
   $('#busTotalExpensesSpan').tooltip(myDisable);
   $('#busAdvertisingSpanT2125').tooltip(myDisable);
   $('#busDuesSpanT2125').tooltip(myDisable);
   $('#busMealsSpanT2125').tooltip(myDisable);
   $('#busOfficeSpanT2125').tooltip(myDisable);
   $('#busSuppliesSpanT2125').tooltip(myDisable);
   $('#busCellSpanT2125').tooltip(myDisable);
   $('#busOtherSpanT2125').tooltip(myDisable);
   $('#busFreightSpanT2125').tooltip(myDisable);
   $('#busFuelSpanT2125').tooltip(myDisable);
   $('#busInsuranceSpanT2125').tooltip(myDisable);
   $('#busInterestSpanT2125').tooltip(myDisable);
   $('#busMaintenanceSpanT2125').tooltip(myDisable);
   $('#busAdminSpanT2125').tooltip(myDisable);
   $('#busLegalSpanT2125').tooltip(myDisable);
   $('#busPropertyTaxSpanT2125').tooltip(myDisable);
   $('#busRentSpanT2125').tooltip(myDisable);
   $('#busWagesSpanT2125').tooltip(myDisable);
   $('#busTravelSpanT2125').tooltip(myDisable);
   $('#busVariable1SpanT2125').tooltip(myDisable);
   $('#busVariable2SpanT2125').tooltip(myDisable);
   $('#busVariable3SpanT2125').tooltip(myDisable);
   $('#busVariable4SpanT2125').tooltip(myDisable);
   $('#busVariable5SpanT2125').tooltip(myDisable);
   $('#busCCASpanT2125').tooltip(myDisable);
   //Home Section
   $('#homeHeatLink').tooltip(myDisable);
   $('#homeElectricityLink').tooltip(myDisable);
   $('#homeInsuranceLink').tooltip(myDisable);
   $('#homeMaintenanceLink').tooltip(myDisable);
   $('#homeMortgageLink').tooltip(myDisable);
   $('#homePropertyTaxLink').tooltip(myDisable);
   $('#homeOtherLink').tooltip(myDisable);
   $('#homeWaterLink').tooltip(myDisable);
   $('#homeVariable1Link').tooltip(myDisable);
   $('#homeVariable2Link').tooltip(myDisable);
   $('#homeVariable3Link').tooltip(myDisable);
   $('#incStHomePercentDisplay').tooltip(myDisable);
   $('#incStHomePercentBtn').tooltip(myDisable);
   $('#incStHomeExpTotal').tooltip(myDisable);
   $('#homeHeatSpan').tooltip(myDisable);
   $('#homeElectricitySpan').tooltip(myDisable);
   $('#homeInsuranceSpan').tooltip(myDisable);
   $('#homeMaintenanceSpan').tooltip(myDisable);
   $('#homeMortgageSpan').tooltip(myDisable);
   $('#homePropertyTaxSpan').tooltip(myDisable);
   $('#homeOtherSpan').tooltip(myDisable);
   $('#homeWaterSpan').tooltip(myDisable);
   $('#homeVariable1Span').tooltip(myDisable);
   $('#homeVariable2Span').tooltip(myDisable);
   $('#homeVariable3Span').tooltip(myDisable);
   $('#incStHomePercentDisplay').tooltip(myDisable);
   $('#incStHomePercentBtn').tooltip(myDisable);
   $('#homeTotalExpensesSpan').tooltip(myDisable);
   $('#homeHeatSpanT2125').tooltip(myDisable);
   $('#homeElectricitySpanT2125').tooltip(myDisable);
   $('#homeInsuranceSpanT2125').tooltip(myDisable);
   $('#homeMaintenanceSpanT2125').tooltip(myDisable);
   $('#homeMortgageSpanT2125').tooltip(myDisable);
   $('#homePropertyTaxSpanT2125').tooltip(myDisable);
   $('#homeOtherSpanT2125').tooltip(myDisable);
   $('#homeWaterSpanT2125').tooltip(myDisable);
   $('#homeVariable1SpanT2125').tooltip(myDisable);
   $('#homeVariable2SpanT2125').tooltip(myDisable);
   $('#homeVariable3SpanT2125').tooltip(myDisable);
   //Vehicle 1 Area
   $('#vehicle1FuelLink').tooltip(myDisable);
   $('#vehicle1InterestLoanLink').tooltip(myDisable);
   $('#vehicle1InsuranceLink').tooltip(myDisable);
   $('#vehicle1MaintenanceLink').tooltip(myDisable);
   $('#vehicle1RegistrationLink').tooltip(myDisable);
   $('#vehicle1LeasingLink').tooltip(myDisable);
   $('#vehicle1OtherLink').tooltip(myDisable);
   $('#vehicle1BusParkLink').tooltip(myDisable);
   $('#vehicle1SuppInsuranceLink').tooltip(myDisable);
   $('#vehicle1Variable1Link').tooltip(myDisable);
   $('#vehicle1Variable2Link').tooltip(myDisable);
   $('#vehicle1Variable3Link').tooltip(myDisable);
   $('#incStVehicle1ExpTotal').tooltip(myDisable);
   $('#vehicle1FuelSpan').tooltip(myDisable);
   $('#vehicle1InterestLoanSpan').tooltip(myDisable);
   $('#vehicle1InsuranceSpan').tooltip(myDisable);
   $('#vehicle1MaintenanceSpan').tooltip(myDisable);
   $('#vehicle1RegistrationSpan').tooltip(myDisable);
   $('#vehicle1LeasingSpan').tooltip(myDisable);
   $('#vehicle1OtherSpan').tooltip(myDisable);
   $('#vehicle1BusParkSpan').tooltip(myDisable);
   $('#vehicle1SuppInsuranceSpan').tooltip(myDisable);
   $('#vehicle1Variable1Span').tooltip(myDisable);
   $('#vehicle1Variable2Span').tooltip(myDisable);
   $('#vehicle1Variable3Span').tooltip(myDisable);
   $('#vehicle1TotalExpensesSpan').tooltip(myDisable);
   $('#incStVehicle1PercentDisplay').tooltip(myDisable);
   $('#incStVehicle1PercentText').tooltip(myDisable);
   $('#incStVehicle1PercentBtn').tooltip(myDisable);
   $('#vehicle1FuelSpanT2125').tooltip(myDisable);
   $('#vehicle1InterestLoanSpanT2125').tooltip(myDisable);
   $('#vehicle1InsuranceSpanT2125').tooltip(myDisable);
   $('#vehicle1MaintenanceSpanT2125').tooltip(myDisable);
   $('#vehicle1RegistrationSpanT2125').tooltip(myDisable);
   $('#vehicle1LeasingSpanT2125').tooltip(myDisable);
   $('#vehicle1OtherSpanT2125').tooltip(myDisable);
   $('#vehicle1BusParkSpanT2125').tooltip(myDisable);
   $('#vehicle1SuppInsuranceSpanT2125').tooltip(myDisable);
   $('#vehicle1Variable1SpanT2125').tooltip(myDisable);
   $('#vehicle1Variable2SpanT2125').tooltip(myDisable);
   $('#vehicle1Variable3SpanT2125').tooltip(myDisable);
   //Vehicle 2 Area
   $('#vehicle2FuelLink').tooltip(myDisable);
   $('#vehicle2InterestLoanLink').tooltip(myDisable);
   $('#vehicle2InsuranceLink').tooltip(myDisable);
   $('#vehicle2MaintenanceLink').tooltip(myDisable);
   $('#vehicle2RegistrationLink').tooltip(myDisable);
   $('#vehicle2LeasingLink').tooltip(myDisable);
   $('#vehicle2OtherLink').tooltip(myDisable);
   $('#vehicle2BusParkLink').tooltip(myDisable);
   $('#vehicle2SuppInsuranceLink').tooltip(myDisable);
   $('#vehicle2Variable1Link').tooltip(myDisable);
   $('#vehicle2Variable2Link').tooltip(myDisable);
   $('#vehicle2Variable3Link').tooltip(myDisable);
   $('#incStVehicle2ExpTotal').tooltip(myDisable);
   $('#vehicle2FuelSpan').tooltip(myDisable);
   $('#vehicle2InterestLoanSpan').tooltip(myDisable);
   $('#vehicle2InsuranceSpan').tooltip(myDisable);
   $('#vehicle2MaintenanceSpan').tooltip(myDisable);
   $('#vehicle2RegistrationSpan').tooltip(myDisable);
   $('#vehicle2LeasingSpan').tooltip(myDisable);
   $('#vehicle2OtherSpan').tooltip(myDisable);
   $('#vehicle2BusParkSpan').tooltip(myDisable);
   $('#vehicle2SuppInsuranceSpan').tooltip(myDisable);
   $('#vehicle2Variable1Span').tooltip(myDisable);
   $('#vehicle2Variable2Span').tooltip(myDisable);
   $('#vehicle2Variable3Span').tooltip(myDisable);
   $('#vehicle2TotalExpensesSpan').tooltip(myDisable);
   $('#incStVehicle2PercentDisplay').tooltip(myDisable);
   $('#incStVehicle2PercentText').tooltip(myDisable);
   $('#incStVehicle2PercentBtn').tooltip(myDisable);
   $('#vehicle2FuelSpanT2125').tooltip(myDisable);
   $('#vehicle2InterestLoanSpanT2125').tooltip(myDisable);
   $('#vehicle2InsuranceSpanT2125').tooltip(myDisable);
   $('#vehicle2MaintenanceSpanT2125').tooltip(myDisable);
   $('#vehicle2RegistrationSpanT2125').tooltip(myDisable);
   $('#vehicle2LeasingSpanT2125').tooltip(myDisable);
   $('#vehicle2OtherSpanT2125').tooltip(myDisable);
   $('#vehicle2BusParkSpanT2125').tooltip(myDisable);
   $('#vehicle2SuppInsuranceSpanT2125').tooltip(myDisable);
   $('#vehicle2Variable1SpanT2125').tooltip(myDisable);
   $('#vehicle2Variable2SpanT2125').tooltip(myDisable);
   $('#vehicle2Variable3SpanT2125').tooltip(myDisable);
   //Rental Expenses Area
   $('#rentalAdvertisingLink').tooltip(myDisable);
   $('#rentalInsuranceLink').tooltip(myDisable);
   $('#rentalInterestLink').tooltip(myDisable);
   $('#rentalMaintenanceLink').tooltip(myDisable);
   $('#rentalAdminLink').tooltip(myDisable);
   $('#rentalMotorLink').tooltip(myDisable);
   $('#rentalOfficeLink').tooltip(myDisable);
   $('#rentalLegalLink').tooltip(myDisable);
   $('#rentalPropertyTaxLink').tooltip(myDisable);
   $('#rentalWagesLink').tooltip(myDisable);
   $('#rentalTravelLink').tooltip(myDisable);
   $('#rentalUtilitiesLink').tooltip(myDisable);
   $('#rentalOtherLink').tooltip(myDisable);
   $('#rentalVariable1Link').tooltip(myDisable);
   $('#rentalVariable2Link').tooltip(myDisable);
   $('#incStRentalExpTotal').tooltip(myDisable);
   $('#rentalAdvertisingSpan').tooltip(myDisable);
   $('#rentalInsuranceSpan').tooltip(myDisable);
   $('#rentalInterestSpan').tooltip(myDisable);
   $('#rentalMaintenanceSpan').tooltip(myDisable);
   $('#rentalAdminSpan').tooltip(myDisable);
   $('#rentalMotorSpan').tooltip(myDisable);
   $('#rentalOfficeSpan').tooltip(myDisable);
   $('#rentalLegalSpan').tooltip(myDisable);
   $('#rentalPropertyTaxSpan').tooltip(myDisable);
   $('#rentalWagesSpan').tooltip(myDisable);
   $('#rentalTravelSpan').tooltip(myDisable);
   $('#rentalUtilitiesSpan').tooltip(myDisable);
   $('#rentalOtherSpan').tooltip(myDisable);
   $('#rentalVariable1Span').tooltip(myDisable);
   $('#rentalVariable2Span').tooltip(myDisable);
   $('#rentalTotalExpensesSpan').tooltip(myDisable);
   $('#rentalAdvertisingSpanT2125').tooltip(myDisable);
   $('#rentalInsuranceSpanT2125').tooltip(myDisable);
   $('#rentalInterestSpanT2125').tooltip(myDisable);
   $('#rentalMaintenanceSpanT2125').tooltip(myDisable);
   $('#rentalAdminSpanT2125').tooltip(myDisable);
   $('#rentalMotorSpanT2125').tooltip(myDisable);
   $('#rentalOfficeSpanT2125').tooltip(myDisable);
   $('#rentalLegalSpanT2125').tooltip(myDisable);
   $('#rentalPropertyTaxSpanT2125').tooltip(myDisable);
   $('#rentalWagesSpanT2125').tooltip(myDisable);
   $('#rentalTravelSpanT2125').tooltip(myDisable);
   $('#rentalUtilitiesSpanT2125').tooltip(myDisable);
   $('#rentalOtherSpanT2125').tooltip(myDisable);
   $('#rentalVariable1SpanT2125').tooltip(myDisable);
   $('#rentalVariable2SpanT2125').tooltip(myDisable);
   //Other Costs Expenses Area
   $('#otherGoodsLink').tooltip(myDisable);
   $('#otherSubcontractsLink').tooltip(myDisable);
   $('#otherDirectWageCostLink').tooltip(myDisable);
   $('#otherOtherCostsLink').tooltip(myDisable);
   $('#otherVariable1Link').tooltip(myDisable);
   $('#otherVariable2Link').tooltip(myDisable);
   $('#incStOtherCostsExpTotal').tooltip(myDisable);
   $('#otherGoodsSpan').tooltip(myDisable);
   $('#otherSubcontractsSpan').tooltip(myDisable);
   $('#otherDirectWageCostSpan').tooltip(myDisable);
   $('#otherOtherCostsSpan').tooltip(myDisable);
   $('#otherVariable1Span').tooltip(myDisable);
   $('#otherVariable2Span').tooltip(myDisable);
   $('#otherCostsTotalExpensesSpan').tooltip(myDisable);
   $('#otherGoodsSpanT2125').tooltip(myDisable);
   $('#otherSubcontractsSpanT2125').tooltip(myDisable);
   $('#otherDirectWageCostSpanT2125').tooltip(myDisable);
   $('#otherOtherCostsSpanT2125').tooltip(myDisable);
   $('#otherVariable1SpanT2125').tooltip(myDisable);
   $('#otherVariable2SpanT2125').tooltip(myDisable);
   //Revenue Area
   $('#incomeBusinessSpan').tooltip(myDisable);
   $('#incomeRentalSpan').tooltip(myDisable);
   $('#incomeBusinessLink').tooltip(myDisable);
   $('#incomeRentalLink').tooltip(myDisable);
   $('#incStGdTtlRevenueSpan').tooltip(myDisable);

   $('#incStGrTtlRevenueSpan').tooltip(myDisable);
   $('#incStGrTtlExpensesSpan').tooltip(myDisable);
   $('#incStGrTtlNetIncomeSpan').tooltip(myDisable);

   $('#IncStatHomeExpenses').tooltip(myDisable);
   $('#IncStatVehicle1Expenses').tooltip(myDisable);
   $('#IncStatVehicle2Expenses').tooltip(myDisable);
   $('#IncStatOtherCostsExpenses').tooltip(myDisable);
   $('#IncStatRentalExpenses').tooltip(myDisable);

   $('#timePeriodSelect').tooltip(myDisable);
   $('#netRevDisplay').tooltip(myDisable);
   $('#netExpDisplay').tooltip(myDisable);
   $('#netIncomeDisplay').tooltip(myDisable);
   $('#acctBalance').tooltip(myDisable);
   $('#lockDate').tooltip(myDisable);
   $('#startDatePage').tooltip(myDisable);
   $('#endDatePage').tooltip(myDisable);
   $('#ModalImageTag').tooltip(myDisable);

   $('#userSetupForm').tooltip(myDisable);
   $('#userfirstName').tooltip(myDisable);
   $('#userlastName').tooltip(myDisable);
   $('#useremail').tooltip(myDisable);
   $('#emailMessage').tooltip(myDisable);
   $('#userConfirmEmail').tooltip(myDisable);
   $('#emailConfirmMessage').tooltip(myDisable);
   $('#userpassword').tooltip(myDisable);
   $('#passwordValidMessage').tooltip(myDisable);
   $('#userpasswordconfirm').tooltip(myDisable);
   $('#confirmPasswordValidMessage').tooltip(myDisable);

   $('#userSaveBtn').tooltip(myDisable);
   $('#carExpAlertUser').tooltip(myDisable);
   $('#alertContainerUser').tooltip(myDisable);
   $('#closeBtnAlertUser').tooltip(myDisable);

   $('#userLoginForm').tooltip(myDisable);
   $('#userLoginfirstName').tooltip(myDisable);
   $('#userLoginlastName').tooltip(myDisable);
   $('#userLoginemail').tooltip(myDisable);
   $('#userLoginPassword').tooltip(myDisable);
   $('#userLoginSaveBtn').tooltip(myDisable);
   $('#AlertUserLogin').tooltip(myDisable);
   $('#alertContainerUserLogin').tooltip(myDisable);
   $('#closeBtnAlertUserLogin').tooltip(myDisable);

   $('#mainSettings').tooltip(myDisable);
   $('#countPerPageSelect').tooltip(myDisable);
   $('#tooltipOFF').tooltip(myDisable);
   $('#tooltipOn').tooltip(myDisable);
   $('#settingsProvinceSelect').tooltip(myDisable);
   $('#hstSetting').tooltip(myDisable);
   $('#pstSetting').tooltip(myDisable);
   $('#toggleNav').tooltip(myDisable);

   //Payment entry forms
   $('#taxPaymentDate').tooltip(myDisable);
   $('#taxPaymentAmt').tooltip(myDisable);
   $('#taxPaymentStatus').tooltip(myDisable);
   $('#taxPaymentDescription').tooltip(myDisable);
   $('#taxPaymentAutoAmtBtn').tooltip(myDisable);
   $('#taxPaymentDeleteBtn').tooltip(myDisable);
   $('#closeTAXPaymentModal').tooltip(myDisable);
   $('#taxPaymentSaveChangesBtn').tooltip(myDisable);
   $('#taxPaymentSubmitBtn').tooltip(myDisable);
   $('#taxPaymentformReset').tooltip(myDisable);
   $('#formTAXPaymentEntry').tooltip(myDisable);
   $('#alertContainerTAXPayment').tooltip(myDisable);
   $('#pstPaymentDate').tooltip(myDisable);
   $('#pstPaymentAmt').tooltip(myDisable);
   $('#pstPaymentStatus').tooltip(myDisable);
   $('#pstBlindPaymentID').tooltip(myDisable);
   $('#pstPaymentDescription').tooltip(myDisable);
   $('#pstPaymentAutoAmtBtn').tooltip(myDisable);
   $('#pstPaymentDeleteBtn').tooltip(myDisable);
   $('#closePSTPaymentModal').tooltip(myDisable);
   $('#pstPaymentSaveChangesBtn').tooltip(myDisable);
   $('#pstPaymentSubmitBtn').tooltip(myDisable);
   $('#pstPaymentformReset').tooltip(myDisable);
   $('#formPSTPaymentEntry').tooltip(myDisable);
   $('#alertContainerPSTPayment').tooltip(myDisable);
   $('#hstPaymentDate').tooltip(myDisable);
   $('#hstPaymentAmt').tooltip(myDisable);
   $('#hstPaymentStatus').tooltip(myDisable);
   $('#hstPaymentDescription').tooltip(myDisable);
   $('#hstPaymentAutoAmtBtn').tooltip(myDisable);
   $('#hstPaymentDeleteBtn').tooltip(myDisable);
   $('#closeHSTPaymentModal').tooltip(myDisable);
   $('#hstPaymentSaveChangesBtn').tooltip(myDisable);
   $('#hstPaymentSubmitBtn').tooltip(myDisable);
   $('#hstPaymentformReset').tooltip(myDisable);
   $('#formHSTPaymentEntry').tooltip(myDisable);
   $('#alertContainerHSTPayment').tooltip(myDisable);
   // Fixed Assets
   $('#AssetPurchaseDate').tooltip(myDisable);
   $('#AssetDescription').tooltip(myDisable);
   $('#AssetClaimDate').tooltip(myDisable);
   $('#AssetStartValue').tooltip(myDisable);
   $('#AssetClaimAmt').tooltip(myDisable);
   $('#ITCClaimAmt').tooltip(myDisable);
   $('#AssetBusinessPercent').tooltip(myDisable);
   $('#AssetVehicle1').tooltip(myDisable);
   $('#AssetVehicle2').tooltip(myDisable);
   $('#AssetVehiclePercentApplyBtn').tooltip(myDisable);
   $('#AssetReset').tooltip(myDisable);
   $('#AssetDeleteBtn').tooltip(myDisable);
   $('#AssetBottomCloseModal').tooltip(myDisable);
   $('#AssetSaveChangesBtn').tooltip(myDisable);
   $('#AssetSubmitBtn').tooltip(myDisable);
   $('#AssetAutoClaimRate').tooltip(myDisable);
   $('#AssetIncludeITC').tooltip(myDisable);
   $('#AssetGenerateClaimBtn').tooltip(myDisable);
   $('#AssetStatus').tooltip(myDisable);
   // Account Summary
   $('#ASgrossRevBus').tooltip(myDisable);
   $('#ASgrossIncBus').tooltip(myDisable);
   $('#ASgrossIncRental').tooltip(myDisable);
   $('#ASnetInc').tooltip(myDisable);
   $('#ASBigNumberTop').tooltip(myDisable);
   $('#ASHSTgrossRev').tooltip(myDisable);
   $('#ASPSTgrossRev').tooltip(myDisable);
   $('#ASTAXgrossInc').tooltip(myDisable);
   $('#ASCPP').tooltip(myDisable);
   $('#ASBigNumberMid').tooltip(myDisable);
   $('#ASHSTPayment').tooltip(myDisable);
   $('#ASPSTPayment').tooltip(myDisable);
   $('#ASTAXPayment').tooltip(myDisable);
   $('#ASBigNumberBtm').tooltip(myDisable);
   $('#ASLastBigNumberBtm').tooltip(myDisable);
   $('#ASTimePeriodSelect').tooltip(myDisable);
   $('#ASIncludeToPeriod').tooltip(myDisable);
   $('#ASTopLbl3').tooltip(myDisable);
};

function disableTableTooltip(myDisable) {
   $('#HeaderSort-number').tooltip(myDisable);
   $('#HeaderSort-DATE').tooltip(myDisable);
   $('#HeaderSort-TOTAL').tooltip(myDisable);
   $('#HeaderSort-DESCRIPTION').tooltip(myDisable);
   $('#HeaderSort-SUPPLIER').tooltip(myDisable);
   $('#HeaderSort-CATEGORY').tooltip(myDisable);
   $('#HeaderSort-RECEIPT').tooltip(myDisable);
   $('#closeBtnAlertMain').tooltip(myDisable);

   for (i = 0; i < rowCountPerPage; i++) {
      $(`#cellNumber-${i}`).tooltip(myDisable);
   }

   for (i = 1; i < 6; i++) {
      $(`#HeaderSort-${i}`).tooltip(myDisable);
   }

   for (i = 0; i < paymentArray.length; i++) {
      $(`#cellNumber-${i}`).tooltip(myDisable);
   }

   $('#printPDFBtn').tooltip(myDisable);
   $('#printPDFPaymentBtn').tooltip(myDisable);
   $('#PSTPaymentCloseBtnAlert').tooltip(myDisable);
   $('#HSTPaymentCloseBtnAlert').tooltip(myDisable);
   $('#TAXPaymentCloseBtnAlert').tooltip(myDisable);
   $('#PaymentReportModalCloseBtn').tooltip(myDisable);
   $('#printHMPDFBtn').tooltip(myDisable);
   // How Much Can I Keep Table
   $('#HMACCTIN').tooltip(myDisable);
   $('#HMNetIncome').tooltip(myDisable);
   $('#HMGrossRev').tooltip(myDisable);
   $('#HMHST').tooltip(myDisable);
   $('#HMGST').tooltip(myDisable);
   $('#HMPST').tooltip(myDisable);
   $('#HMGrossIncome').tooltip(myDisable);
   $('#HMFedTaxes').tooltip(myDisable);
   $('#HMProvTaxes').tooltip(myDisable);
   $('#HMCPP').tooltip(myDisable);
   $('#HMHSTPayment').tooltip(myDisable);
   $('#HMGSTPayment').tooltip(myDisable);
   $('#HMPSTPayment').tooltip(myDisable);
   $('#HMTAXPayment').tooltip(myDisable);
   $('#HMACCTOUT').tooltip(myDisable);
   $('#HMACCTBAL').tooltip(myDisable);

   for (i = 0; i < AccountArray.length; i++) {
      $(`#cellNetIncomeAmt${i}`).tooltip(myDisable);
   }

   // Asset Table
   $('#HeadAssetSort-Assetnumber').tooltip(myDisable);
   $('#printPDFAssetBtn').tooltip(myDisable);
   $('#AssetReportModalCloseBtn').tooltip(myDisable);
   for (i = 1; i < 9; i++) {
      $(`#HeadAssetSort-${i}`).tooltip(myDisable);
   }



}
