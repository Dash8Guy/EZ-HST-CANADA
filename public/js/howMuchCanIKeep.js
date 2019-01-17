let AccountArray = [];
let BusAcctArray = [];
let RentalAcctArray = [];
let PaymentAcctArray = [];



function addMathColumnsToArray() {
   let runningNetIncome = 0;
   let runningCPP = 0;
   let curProvAmt = 0;
   let curFedAmt = 0;

   AccountArray.forEach((el, index) => {
      if (el.carnetAmt > 0) {
         curProvAmt = getProvinceIncomeTaxAmt(runningNetIncome, el.carnetAmt);
         curFedAmt = getFederalIncomeTaxAmt(runningNetIncome, el.carnetAmt);
         el.ProvTaxes = curProvAmt;
         el.FedTaxes = curFedAmt;
         el.taxes = curProvAmt + curFedAmt;
         if (el.carnetAmt * 0.099 + runningCPP >= miscData.year2018.MaxCPPContributions) {
            el.CPP = (miscData.year2018.MaxCPPContributions - runningCPP);
            runningCPP += el.CPP;
         } else {
            el.CPP = el.carnetAmt * 0.099;
            runningCPP += el.CPP;
         }
         el.NetIncome = el.carnetAmt - el.taxes - el.CPP;
         el.AcctDeposit = el.carhstAmt + el.carpstAmt + el.taxes + el.CPP;
      } else {
         el.CPP = 0;
         el.taxes = 0;
         el.ProvTaxes = 0;
         el.FedTaxes = 0;
         el.NetIncome = 0;
         el.AcctDeposit = 0;
      }
      runningNetIncome += el.carnetAmt;
      el.AcctWithDrawl = el.taxAmt + el.hstAmt + el.pstAmt;
   });
};

// function testGetTaxes() {

//    let amtSoFar = prompt("Enter Amount so far.");
//    let myAmt = prompt("Enter Revenue Amount.");

//    alert(`Provincial Part: ${getProvinceIncomeTaxAmt(Number(amtSoFar), Number(myAmt))}`);
//    alert(`Federal Part: ${getFederalIncomeTaxAmt(Number(amtSoFar), Number(myAmt))}`);

// }

function getProvinceIncomeTaxAmt(myTotalBeforeAmt, myNewAmt) {

   let myLink;

   switch (myDOMs.settingsModal.ProvinceSelect.value) {
      case "1":
         myLink = miscData.year2018.ABLevels
         break;
      case "2":
         myLink = miscData.year2018.BCLevels
         break;
      case "3":
         myLink = miscData.year2018.MBLevels
         break;
      case "4":
         myLink = miscData.year2018.NBLevels
         break;
      case "5":
         myLink = miscData.year2018.NLLevels
         break;
      case "6":
         myLink = miscData.year2018.NTLevels
         break;
      case "7":
         myLink = miscData.year2018.NSLevels
         break;
      case "8":
         myLink = miscData.year2018.NULevels
         break;
      case "9":
         myLink = miscData.year2018.ONLevels
         break;
      case "10":
         myLink = miscData.year2018.PEILevels
         break;
      case "11":
         myLink = miscData.year2018.QCLevels
         break;
      case "12":
         myLink = miscData.year2018.SKLevels
         break;
      case "13":
         myLink = miscData.year2018.YTLevels
   };

   if (myLink === null || myLink === undefined) {
      return;
   }

   let ProvinceAmt = 0;
   if (Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel1) {
      ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel1;
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel2) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((Number(myNewAmt) - myLink.IncomeLevel1) * myLink.TaxLevel2);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt))) * myLink.TaxLevel2;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel2
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel3) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((Number(myNewAmt) - myLink.IncomeLevel2) * myLink.TaxLevel3);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel2 - myLink.IncomeLevel1)) * myLink.TaxLevel3;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt))) * myLink.TaxLevel3
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel3;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel4) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((Number(myNewAmt) - myLink.IncomeLevel3) * myLink.TaxLevel4);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel2 - myLink.IncomeLevel1) - (myLink.IncomeLevel3 - myLink.IncomeLevel2)) * myLink.TaxLevel3;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel3 - myLink.IncomeLevel2)) * myLink.TaxLevel4
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt))) * myLink.TaxLevel4;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel4;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel5) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((Number(myNewAmt) - myLink.IncomeLevel4) * myLink.TaxLevel5);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel4 - myLink.IncomeLevel1)) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel4 - myLink.IncomeLevel2)) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel4 - myLink.IncomeLevel3)) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt))) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel5;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel6) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((Number(myNewAmt) - myLink.IncomeLevel5) * myLink.TaxLevel6);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel1)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel2)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel3)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel4)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         ProvinceAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt))) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel6;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel7) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((Number(myNewAmt) - myLink.IncomeLevel6) * myLink.TaxLevel7);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel1)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel2)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel3)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel4)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         ProvinceAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel5)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         ProvinceAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt))) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel7;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel8) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7) + ((Number(myNewAmt) - myLink.IncomeLevel7) * myLink.TaxLevel8);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel1)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel2)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel3)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel4)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         ProvinceAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel5)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         ProvinceAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel6)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         ProvinceAmt = (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) * myLink.TaxLevel7;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel7 - Number(myTotalBeforeAmt))) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel8) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel8;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel8 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel9) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7) + ((myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8) + ((Number(myNewAmt) - myLink.IncomeLevel8) * myLink.TaxLevel9);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel1)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel2)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel3)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel4)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         ProvinceAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel5)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         ProvinceAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel6)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         ProvinceAmt = (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel7)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel8) {
         ProvinceAmt = (myLink.IncomeLevel8 - Number(myTotalBeforeAmt)) * myLink.TaxLevel8;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel8 - Number(myTotalBeforeAmt))) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel8 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel9) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel9;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel9 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel10) {
      if (Number(myTotalBeforeAmt) === 0) {
         ProvinceAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7) + ((myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8) + ((myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9) + ((Number(myNewAmt) - myLink.IncomeLevel9) * myLink.TaxLevel10);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         ProvinceAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         ProvinceAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel1)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         ProvinceAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         ProvinceAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel2)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         ProvinceAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         ProvinceAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel3)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         ProvinceAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         ProvinceAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel4)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         ProvinceAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         ProvinceAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel5)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         ProvinceAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         ProvinceAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel6)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         ProvinceAmt = (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) * myLink.TaxLevel7;
         ProvinceAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel7)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel8) {
         ProvinceAmt = (myLink.IncomeLevel8 - Number(myTotalBeforeAmt)) * myLink.TaxLevel8;
         ProvinceAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel8 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel8)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel8 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel9) {
         ProvinceAmt = (myLink.IncomeLevel9 - Number(myTotalBeforeAmt)) * myLink.TaxLevel9;
         ProvinceAmt += (Number(myNewAmt) - (myLink.IncomeLevel9 - Number(myTotalBeforeAmt))) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel9 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel10) {
         ProvinceAmt = Number(myNewAmt) * myLink.TaxLevel10;
      }
   }
   return ProvinceAmt;
};

function getFederalIncomeTaxAmt(myTotalBeforeAmt, myNewAmt) {
   let myLink = miscData.year2018.FederalLevels;
   let FederalAmt = 0;
   if (Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel1) {
      FederalAmt = Number(myNewAmt) * myLink.TaxLevel1;
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel2) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((Number(myNewAmt) - myLink.IncomeLevel1) * myLink.TaxLevel2);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt))) * myLink.TaxLevel2;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel2
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel3) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((Number(myNewAmt) - myLink.IncomeLevel2) * myLink.TaxLevel3);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel2 - myLink.IncomeLevel1)) * myLink.TaxLevel3;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt))) * myLink.TaxLevel3
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel3;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel4) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((Number(myNewAmt) - myLink.IncomeLevel3) * myLink.TaxLevel4);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel2 - myLink.IncomeLevel1) - (myLink.IncomeLevel3 - myLink.IncomeLevel2)) * myLink.TaxLevel3;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel3 - myLink.IncomeLevel2)) * myLink.TaxLevel4
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt))) * myLink.TaxLevel4;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel4;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel5) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((Number(myNewAmt) - myLink.IncomeLevel4) * myLink.TaxLevel5);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel4 - myLink.IncomeLevel1)) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel4 - myLink.IncomeLevel2)) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel4 - myLink.IncomeLevel3)) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt))) * myLink.TaxLevel5;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel5;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel6) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((Number(myNewAmt) - myLink.IncomeLevel5) * myLink.TaxLevel6);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel1)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel2)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel3)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel5 - myLink.IncomeLevel4)) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         FederalAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt))) * myLink.TaxLevel6;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel6;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel7) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((Number(myNewAmt) - myLink.IncomeLevel6) * myLink.TaxLevel7);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel1)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel2)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel3)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel4)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) < myLink.IncomeLevel5) {
         FederalAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel6 - myLink.IncomeLevel5)) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         FederalAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt))) * myLink.TaxLevel7;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel7;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel8) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7) + ((Number(myNewAmt) - myLink.IncomeLevel7) * myLink.TaxLevel8);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel1)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel2)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel3)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel4)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         FederalAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel5)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         FederalAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel7 - myLink.IncomeLevel6)) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) < myLink.IncomeLevel7) {
         FederalAmt = (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) * myLink.TaxLevel7;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel7 - Number(myTotalBeforeAmt))) * myLink.TaxLevel8;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel8) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel8;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel8 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel9) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7) + ((myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8) + ((Number(myNewAmt) - myLink.IncomeLevel8) * myLink.TaxLevel9);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel1)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel2)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel3)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel4)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         FederalAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel5)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         FederalAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel6)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         FederalAmt = (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel8 - myLink.IncomeLevel7)) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel8) {
         FederalAmt = (myLink.IncomeLevel8 - Number(myTotalBeforeAmt)) * myLink.TaxLevel8;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel8 - Number(myTotalBeforeAmt))) * myLink.TaxLevel9;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel8 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel9) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel9;
      }
   } else if (Number(myTotalBeforeAmt) + Number(myNewAmt) > myLink.IncomeLevel9 && Number(myTotalBeforeAmt) + Number(myNewAmt) <= myLink.IncomeLevel10) {
      if (Number(myTotalBeforeAmt) === 0) {
         FederalAmt = (myLink.IncomeLevel1 * myLink.TaxLevel1) + ((myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2) + ((myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3) + ((myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4) + ((myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5) + ((myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6) + ((myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7) + ((myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8) + ((myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9) + ((Number(myNewAmt) - myLink.IncomeLevel9) * myLink.TaxLevel10);
      } else if (Number(myTotalBeforeAmt) > 0 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel1) {
         FederalAmt = (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) * myLink.TaxLevel1;
         FederalAmt += (myLink.IncomeLevel2 - myLink.IncomeLevel1) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel1 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel1)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel1 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel2) {
         FederalAmt = (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) * myLink.TaxLevel2;
         FederalAmt += (myLink.IncomeLevel3 - myLink.IncomeLevel2) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel2 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel2)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel2 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel3) {
         FederalAmt = (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) * myLink.TaxLevel3;
         FederalAmt += (myLink.IncomeLevel4 - myLink.IncomeLevel3) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel3 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel3)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel3 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel4) {
         FederalAmt = (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) * myLink.TaxLevel4;
         FederalAmt += (myLink.IncomeLevel5 - myLink.IncomeLevel4) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel4 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel4)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel4 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel5) {
         FederalAmt = (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) * myLink.TaxLevel5;
         FederalAmt += (myLink.IncomeLevel6 - myLink.IncomeLevel5) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel5 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel5)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel5 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel6) {
         FederalAmt = (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) * myLink.TaxLevel6;
         FederalAmt += (myLink.IncomeLevel7 - myLink.IncomeLevel6) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel6 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel6)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel6 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel7) {
         FederalAmt = (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) * myLink.TaxLevel7;
         FederalAmt += (myLink.IncomeLevel8 - myLink.IncomeLevel7) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel7 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel7)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel7 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel8) {
         FederalAmt = (myLink.IncomeLevel8 - Number(myTotalBeforeAmt)) * myLink.TaxLevel8;
         FederalAmt += (myLink.IncomeLevel9 - myLink.IncomeLevel8) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel8 - Number(myTotalBeforeAmt)) - (myLink.IncomeLevel9 - myLink.IncomeLevel8)) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel8 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel9) {
         FederalAmt = (myLink.IncomeLevel9 - Number(myTotalBeforeAmt)) * myLink.TaxLevel9;
         FederalAmt += (Number(myNewAmt) - (myLink.IncomeLevel9 - Number(myTotalBeforeAmt))) * myLink.TaxLevel10;
      } else if (Number(myTotalBeforeAmt) > myLink.IncomeLevel9 && Number(myTotalBeforeAmt) <= myLink.IncomeLevel10) {
         FederalAmt = Number(myNewAmt) * myLink.TaxLevel10;
      }
   }
   return FederalAmt;
};

function getBusIncomeData() {
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
               alert('You Must be logged in before using EZ-HST-CANADA>')
            } else {
               reject(e.statusText, undefined, 2);
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });


};

function getRentalIncomeData() {
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

function getAllPaymentData() {
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

function AddCarDateToArray() {
   PaymentAcctArray.forEach((el, index) => {
      el.carDate = el.paymentDate;
      el.carnetAmt = 0;
      el.carhstAmt = 0;
      el.carpstAmt = 0;
      el.carTotalAmt = 0;
      el.carDescription = el.description;
   });
}

function AddPaymentsToIncomeArrays() {
   BusAcctArray.forEach((el, index) => {
      el.taxAmt = 0;
      el.hstAmt = 0;
      el.pstAmt = 0;
   });

   RentalAcctArray.forEach((el, index) => {
      el.taxAmt = 0;
      el.hstAmt = 0;
      el.pstAmt = 0;
   });
}

//buildAccountArray is triggered from the HowMuchCanIKeep Menu
async function buildAccountArray() {
   let TempArray = [];
   await getBusIncomeData();
   await getRentalIncomeData();
   await getAllPaymentData();
   AddPaymentsToIncomeArrays();
   TempArray = BusAcctArray.concat(RentalAcctArray);
   AccountArray = TempArray.concat(PaymentAcctArray);
   await sortAccountArrayByDate();
   await addMathColumnsToArray();
   //console.dir(JSON.stringify(AccountArray, undefined, 2));
   buildHowMuchCanIKeepTable(myDOMs.main.AlertContainer, 'mainTableAlert', 'closeBtnAlertMain', `How Much You Can Keep Report - ${AccountArray.length} Transactions`, "TABLE CAR GREEN", 0, 0);
   let myMainNav = document.getElementById("main-nav");
   let myTopVal = myMainNav.offsetTop;
   if (myTopVal === 0 && TableOpen === false) {
      ToggleMenuBar();
   }
};

function sortAccountArrayByDate() {
   AccountArray.sort(function (a, b) {
      var dateA = new Date(a.carDate), dateB = new Date(b.carDate);
      return dateA - dateB;
   });
}

// -------------------------------------
// TABLE BUILD STARTS HERE!   
// -------------------------------------

function hideAcctTableAlert() {
   $("#mainTableAlert").hide("fade");
   removeAcctTblNavAlertChildNodes();
   removeTblNavAlertChildNodes();
   removeVlogTblNavAlertChildNodes();
   ToggleMenuBar();
};

function removeAcctTblNavAlertChildNodes() {

   if (HMStrongTag !== undefined) {
      if (HMStrongTag.hasChildNodes()) {
         while (HMStrongTag.firstChild) {
            HMStrongTag.removeChild(HMStrongTag.firstChild);
         }
      }
   }

   if (HMtbl !== undefined) {
      if (HMtbl.hasChildNodes()) {
         while (HMtbl.firstChild) {
            HMtbl.removeChild(HMtbl.firstChild);
         }
      }
   }

   if (HMresponsiveDiv !== undefined) {
      if (HMresponsiveDiv.hasChildNodes()) {
         while (HMresponsiveDiv.firstChild) {
            HMresponsiveDiv.removeChild(HMresponsiveDiv.firstChild);
         }
      }
   }

   if (HMTableAlert !== undefined) {
      if (HMTableAlert.hasChildNodes()) {
         while (HMTableAlert.firstChild) {
            HMTableAlert.removeChild(HMTableAlert.firstChild);
         }
      }
   }

   if (HMCanvas !== undefined) {
      if (HMCanvas.hasChildNodes()) {
         while (HMCanvas.firstChild) {
            HMCanvas.removeChild(HMCanvas.firstChild);
         }
      }
   }

   if (myDOMs.main.AlertContainer.hasChildNodes()) {
      while (myDOMs.main.AlertContainer.firstChild) {
         myDOMs.main.AlertContainer.removeChild(myDOMs.main.AlertContainer.firstChild);
      }
   }
}


let HMCanvas = document.createElement("canvas");
HMCanvas.setAttribute('id', 'canvas');
HMCanvas.setAttribute('width', '1228');
HMCanvas.setAttribute('height', '45');
HMCanvas.setAttribute('class', 'd-none d-xl-block');
let HMStrongTag = document.createElement("p");
HMStrongTag.setAttribute('class', 'float-left')

let HMTableAlert = document.createElement("div");
let HMtbl = document.createElement("table");
let HMresponsiveDiv = document.createElement("div");

function buildHowMuchCanIKeepTable(
   curAlertContainer,
   curAlertID,
   closeBtnID,
   boldText,
   alertType,
   dismissTime,
   myPage
) {
   // let HMStrongTag = document.createElement("p");
   HMTableAlert.setAttribute(
      "class",
      "alert alert-secondary alert-dismissible collapse"
   );
   HMTableAlert.setAttribute("id", curAlertID);
   //Create the Table Header Row
   let myAcctHeaders = [];
   let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
   if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
      myAcctHeaders = [
         "#",
         "DATE",
         "GROSS REVENUE",
         "HST",
         "PST",
         "GROSS INCOME",
         "FED INC TAX",
         "PROV INC TAX",
         "CPP",
         "NET INCOME",
         "ACCT IN",
         "HST PAYMENT",
         "PST PAYMENT",
         "TAX PAYMENT",
         "ACCT OUT",
         "ACCT BALANCE"
      ];
   } else {
      myAcctHeaders = [
         "#",
         "DATE",
         "GROSS REVENUE",
         "GST",
         "PST",
         "GROSS INCOME",
         "FED INC TAX",
         "PROV INC TAX",
         "CPP",
         "NET INCOME",
         "ACCT IN",
         "GST PAYMENT",
         "PST PAYMENT",
         "TAX PAYMENT",
         "ACCT OUT",
         "ACCT BALANCE"
      ];
   }

   // creates a <table> element and a <tbody> element
   // let HMtbl = document.createElement("table");
   // let HMresponsiveDiv = document.createElement("div");
   HMtbl.setAttribute("class", "table table-success table-sm table-hover table-striped");
   HMtbl.setAttribute("id", "AcctReportTable");
   HMresponsiveDiv.setAttribute("class", "table-responsive");
   let tblHMHeader = document.createElement("tHead");
   tblHMHeader.setAttribute('id', 'AccttableHeader');
   let tblHMBody = document.createElement("tbody");

   //create row header
   let HMrow = document.createElement("tr");
   //create header cells
   myAcctHeaders.forEach((el, index) => {
      let HMcellh = document.createElement("th");
      let HMcellTexth = document.createTextNode(el);

      HMcellh.appendChild(HMcellTexth);
      HMrow.appendChild(HMcellh);
      if (el === 'DATE') {
         HMcellh.setAttribute("class", "text-center thead-dark");
      } else {
         if (el === 'HST' || el === 'GST' || el === 'PST' || el === 'FED INC TAX' || el === 'PROV INC TAX' || el === 'CPP') {
            HMcellh.setAttribute("class", "text-center thead-dark text-danger");
         } else if (el === 'GST PAYMENT' || el === 'HST PAYMENT' || el === 'PST PAYMENT' || el === 'TAX PAYMENT') {
            HMcellh.setAttribute("class", "text-center thead-dark text-success");
         } else if (el === 'ACCT IN') {
            HMcellh.setAttribute("class", "text-center thead-dark text-white bg-danger");
         } else if (el === 'ACCT OUT') {
            HMcellh.setAttribute("class", "text-center thead-dark text-white bg-success");
         } else if (el === 'NET INCOME') {
            HMcellh.setAttribute("class", "text-center thead-dark text-primary bg-white");
         } else {
            HMcellh.setAttribute("class", "text-center thead-dark");
         }
      }

      if (el === 'ACCT IN') {
         HMcellh.setAttribute("id", 'HMACCTIN');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the SUM of HST/GST, PST, Income Tax and CPP. It should be saved for later payments and is added to Account Balance.');
      } else if (el === 'NET INCOME') {
         HMcellh.setAttribute("id", 'HMNetIncome');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount you can keep. It is Gross Revenue minus ACCT IN.');
      } else if (el === 'GROSS REVENUE') {
         HMcellh.setAttribute("id", 'HMGrossRev');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Total Amount of Revenue made from each transaction including HST/GST and PST collected for CRA.');
      } else if (el === 'HST') {
         HMcellh.setAttribute("id", 'HMHST');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of HST collected for each transaction. It is part of the amount in ACCT IN Column.');
      } else if (el === 'GST') {
         HMcellh.setAttribute("id", 'HMGST');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of GST collected for each transaction. It is part of the amount in ACCT IN Column.');
      } else if (el === 'PST') {
         HMcellh.setAttribute("id", 'HMPST');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of PST collected for each transaction. It is part of the amount in ACCT IN Column.');
      } else if (el === 'GROSS INCOME') {
         HMcellh.setAttribute("id", 'HMGrossIncome');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Total Amount of Revenue made from each transaction NOT including HST/GST and PST collected for CRA.');
      } else if (el === 'FED INC TAX') {
         HMcellh.setAttribute("id", 'HMFedTaxes');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of Federal Income Taxes calculated by keeping track of your accumulated income. It takes into account your federal tax rates and accumulated income but does not reduce your income with your expenses. It is part of the amount in ACCT IN Column.');
      } else if (el === 'PROV INC TAX') {
         HMcellh.setAttribute("id", 'HMProvTaxes');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of Provincial Income Taxes calculated by keeping track of your accumulated income. It takes into account your provincial tax rates and accumulated income but does not reduce your income with your expenses. It is part of the amount in ACCT IN Column.');
      } else if (el === 'CPP') {
         HMcellh.setAttribute("id", 'HMCPP');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of CPP calculated. It is 9.9% of your Gross Income to a Maximum set by CRA each year. It is part of the amount in ACCT IN Column.');
      } else if (el === 'HST PAYMENT') {
         HMcellh.setAttribute("id", 'HMHSTPayment');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the HST Payment Amount you made. It is used to reduce the Account balance. It is part of the amount in ACCT OUT Column.');
      } else if (el === 'GST PAYMENT') {
         HMcellh.setAttribute("id", 'HMGSTPayment');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the GST Payment Amount you made. It is used to reduce the Account balance. It is part of the amount in ACCT OUT Column.');
      } else if (el === 'PST PAYMENT') {
         HMcellh.setAttribute("id", 'HMPSTPayment');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the PST Payment Amount you made. It is used to reduce the Account balance. It is part of the amount in ACCT OUT Column.');
      } else if (el === 'TAX PAYMENT') {
         HMcellh.setAttribute("id", 'HMTAXPayment');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Tax Payment/Installement Amount you made. It is used to reduce the Account balance. It is part of the amount in ACCT OUT Column.');
      } else if (el === 'ACCT OUT') {
         HMcellh.setAttribute("id", 'HMACCTOUT');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the Amount of Payments made per Transaction and is used to reduce the Account Balance.');
      } else if (el === 'ACCT BALANCE') {
         HMcellh.setAttribute("id", 'HMACCTBAL');
         HMcellh.setAttribute("data-toggle", 'tooltip');
         HMcellh.setAttribute("title", 'This column is the running Total of the Account Balance. It is the Amount you will need to pay any HST/GST, PST, Income Tax or CPP. This amount is accurate if you had no expenses.');
      }


   });

   //Header now complete, append it to the Table Header
   tblHMHeader.appendChild(HMrow);
   let summingBalance = 0;
   let TempSummingAmtIn = 0;
   let TempSummingAmtOut = 0;
   let TempSummingHST = 0;
   let TempSummingPST = 0;
   let TempSummingCPP = 0;
   let TempSummingFedIncomeTax = 0;
   let TempSummingProvIncomeTax = 0;
   let TempSummingGrossRev = 0;
   let TempSummingGrossInc = 0;
   let TempSummingNetInc = 0;
   let TempSummingAcctDep = 0;
   let TempSummingAcctWithdrawl = 0;
   let TempSummingHSTPay = 0;
   let TempSummingPSTPay = 0;
   let TempSummingTaxPay = 0;
   // creating a HMrow ////////////////////////
   AccountArray.forEach((el, index) => {
      TempSummingHST += el.carhstAmt;
      TempSummingPST += el.carpstAmt;
      TempSummingCPP += el.CPP;
      TempSummingFedIncomeTax += el.FedTaxes;
      TempSummingProvIncomeTax += el.ProvTaxes;
      TempSummingGrossRev += el.carTotalAmt;
      TempSummingGrossInc += el.carnetAmt;
      TempSummingNetInc += el.NetIncome;
      TempSummingAcctDep += (el.carhstAmt + el.carpstAmt + el.taxes + el.CPP);
      TempSummingAcctWithdrawl += (el.hstAmt + el.pstAmt + el.taxAmt);
      TempSummingHSTPay += el.hstAmt;
      TempSummingPSTPay += el.pstAmt;
      TempSummingTaxPay += el.taxAmt;

      // creates a table row
      let HMrow2 = document.createElement("tr");
      HMrow2.setAttribute("id", `row${index}`);

      let cellHM = document.createElement("td");
      //let alinkHM = document.createElement("a");
      let cellTxtHM = document.createTextNode(index + 1);
      // alinkHM.appendChild(cellTxtHM);
      // alinkHM.setAttribute("href", "#");
      // alinkHM.setAttribute("data-toggle", "tooltip");
      // alinkHM.setAttribute("title", "Click to View/Edit this expense");
      // alinkHM.setAttribute("onclick", "getAccountToEdit(this);");
      // alinkHM.setAttribute("id", `cellNumber-${index}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-center");
      //cellHM.setAttribute("id", `cellNumber${i}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      let myDate = new Date(el.carDate);
      let myDay = myDate.getUTCDate();
      let myMonth = myDate.getUTCMonth() + 1;
      let myYear = myDate.getUTCFullYear();
      if (myDay < 10) {
         myDay = `0${myDay}`;
      }
      if (myMonth < 10) {
         myMonth = `0${myMonth}`;
      }
      let tempStringDateHM = `${myMonth}-${myDay}-${myYear}`;

      cellTxtHM = document.createTextNode(tempStringDateHM);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-center");
      cellHM.setAttribute("id", `cellDate${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.carTotalAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellGrossRevenueAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.carhstAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellHSTAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.carpstAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellPSTAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.carnetAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellNetAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.FedTaxes.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellFedTaxesAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.ProvTaxes.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellProvTaxesAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.CPP.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellCPPAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.NetIncome.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right text-primary font-weight-bold");
      cellHM.setAttribute("id", `cellNetIncomeAmt${index}`);
      cellHM.setAttribute("data-toggle", 'tooltip');
      cellHM.setAttribute("title", 'This is How Much You Can Keep!');
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${(el.carhstAmt + el.carpstAmt + el.taxes + el.CPP).toFixed(2)}`);
      TempAmtIn = el.carhstAmt + el.carpstAmt + el.taxes + el.CPP;
      TempSummingAmtIn += el.carhstAmt + el.carpstAmt + el.taxes + el.CPP;
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellAcctDepositAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.hstAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellHSTPaymentAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.pstAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellPSTPaymentAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${el.taxAmt.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellTAXPaymentAmt${index}`);
      HMrow2.appendChild(cellHM);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${(el.hstAmt + el.pstAmt + el.taxAmt).toFixed(2)}`);
      TempAmtOut = el.hstAmt + el.pstAmt + el.taxAmt;
      TempSummingAmtOut += el.hstAmt + el.pstAmt + el.taxAmt;
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right");
      cellHM.setAttribute("id", `cellAcctWithdrawlAmt${index}`);
      HMrow2.appendChild(cellHM);

      summingBalance = (TempSummingAmtIn - TempSummingAmtOut);

      cellHM = document.createElement("td");
      cellTxtHM = document.createTextNode(`$${summingBalance.toFixed(2)}`);
      cellHM.appendChild(cellTxtHM);
      cellHM.setAttribute("class", "text-right font-weight-bold");
      cellHM.setAttribute("id", `cellAcctBalanceAmt${i}`);
      HMrow2.appendChild(cellHM);

      // add the row to the end of the table body
      tblHMBody.appendChild(HMrow2);

   });


   summingBalance = 0;
   addHMTotalsRow();
   function addHMTotalsRow() {
      let HMrow3 = document.createElement("tr");
      HMrow3.setAttribute("id", `row${rowCountPerPage + 1}`);

      let cell2HM = document.createElement("td");
      let cellTxt2HM = document.createTextNode('');

      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-center");
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode('Totals:');
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellTotals`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${formatNumber(Number(TempSummingGrossRev).toFixed(2))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellGrossRevTotal`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${formatNumber(Number(TempSummingHST).toFixed(2))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellHstTotal`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${formatNumber(Number(TempSummingPST).toFixed(2))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellPstTotal`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingGrossInc).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellGrossIncTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingFedIncomeTax).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellFedIncomeTaxTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingProvIncomeTax).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellProvIncomeTaxTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingCPP).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellCPPTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingNetInc).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right text-primary font-weight-bold");
      cell2HM.setAttribute("id", `cellNetIncTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingAcctDep).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellAcctDepTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingHSTPay).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellHSTPayTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingPSTPay).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellPSTPayTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingTaxPay).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellTaxPayTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingAcctWithdrawl).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellWithdrawlTotalAmt`);
      HMrow3.appendChild(cell2HM);

      cell2HM = document.createElement("td");
      cellTxt2HM = document.createTextNode(`$${(formatNumber(Number(TempSummingAcctDep - TempSummingAcctWithdrawl).toFixed(2)))}`);
      cell2HM.appendChild(cellTxt2HM);
      cell2HM.setAttribute("class", "text-right font-weight-bold");
      cell2HM.setAttribute("id", `cellTaxPayTotalAmt`);
      HMrow3.appendChild(cell2HM);


      tblHMBody.appendChild(HMrow3);
   }


   // put the <tbody> in the <table>
   //tblHMHeader.appendChild(HMCanvas);
   //HMtbl.appendChild(HMCanvas);
   HMtbl.appendChild(tblHMHeader);
   HMtbl.appendChild(tblHMBody);
   if (HMresponsiveDiv.hasChildNodes()) {
      while (HMresponsiveDiv.firstChild) {
         HMresponsiveDiv.removeChild(HMresponsiveDiv.firstChild);
      }
   }
   HMresponsiveDiv.appendChild(HMtbl);





   let myHMPDFBtn = document.createElement("button");
   myHMPDFBtn.setAttribute("class", "btn btn-sm btn-outline-secondary d-lg-inline float-right mr-4 mb-1");
   myHMPDFBtn.setAttribute("id", 'printHMPDFBtn');
   myHMPDFBtn.setAttribute("data-toggle", "tooltip");
   myHMPDFBtn.setAttribute("title", "Save Table as a PDF!");

   myHMPDFBtn.setAttribute("onclick", "generateAccountTablePDF()");

   let myPDFBtnText = document.createTextNode("Print PDF");
   myHMPDFBtn.appendChild(myPDFBtnText);
   let myHMBtn = document.createElement("button");
   myHMBtn.setAttribute("class", "close");
   myHMBtn.setAttribute("id", closeBtnID);
   myHMBtn.setAttribute("data-toogle", "tooltip");
   myHMBtn.setAttribute("title", "Close Table!");
   myHMBtn.setAttribute("onclick", "hideAcctTableAlert()");

   let btnTextHM = document.createTextNode("x");
   myHMBtn.appendChild(btnTextHM);


   addHMTitleText(HMTableAlert, boldText);
   // HMsortString.setAttribute("id", "HMsortString");
   // HMsortString.setAttribute("class", "font-weight-bold text-success float-right d-lg-inline");
   // HMsortString.textContent = `Sorted: As entered.`;
   // HMTableAlert.appendChild(HMsortString);

   HMTableAlert.appendChild(myHMPDFBtn);
   HMTableAlert.appendChild(myHMBtn);
   HMTableAlert.appendChild(HMCanvas);
   HMTableAlert.appendChild(HMresponsiveDiv);
   myDOMs.main.AlertContainer.appendChild(HMTableAlert);

   $(`#${curAlertID}`).show("fade");
   //TableOpen = true;
   //addArrow();


   resetHMText(boldText);
   if (enableTooltip === false || enableTooltip === "false") {
      disableTableTooltip('disable');
   }
};

function resetHMText(myText) {
   document.getElementById("titleAccountNode").textContent = `${myText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
}

function addHMTitleText(HMTableAlert, boldText) {
   // let HMStrongTag = document.createElement("p");

   HMStrongTag.setAttribute("id", "titleAccountNode");
   HMStrongTag.setAttribute("class", "font-weight-bold d-lg-inline");
   HMStrongTag.textContent = `${boldText} (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
   HMTableAlert.appendChild(HMStrongTag);
}


function addArrow() {
   var canvas = document.querySelector('canvas');
   var ctx = canvas.getContext('2d');

   canvas.style.top = 7 + "px";
   canvas.style.left = 7 + "px";

   var fromx = 258;
   var fromy = 12;
   var tox = 741;
   var toy = 12;

   var headlen = 10;   // length of head in pixels
   var angle = Math.atan2(toy - fromy, tox - fromx);
   var arrowSize = 2;
   var headlen = 10;

   var angle = Math.atan2(toy - fromy, tox - fromx);
   //starting path of the arrow from the start square to the end square and drawing the stroke
   ctx.beginPath();
   ctx.moveTo(249, 12);
   ctx.lineTo(810, 12);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting a vertical line from horizontal down to HST Header
   ctx.beginPath();
   ctx.moveTo(249, 12);
   ctx.lineTo(249, 42);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting a vertical line from horizontal down to PST Header
   ctx.beginPath();
   ctx.moveTo(307, 12);
   ctx.lineTo(307, 42);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting a vertical line from horizontal down to Fed Taxes Header
   ctx.beginPath();
   ctx.moveTo(474, 12);
   ctx.lineTo(474, 42);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting a vertical line from horizontal down to Prov Taxes Header
   ctx.beginPath();
   ctx.moveTo(562, 12);
   ctx.lineTo(562, 42);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting a vertical line from horizontal down to CPP Header
   ctx.beginPath();
   ctx.moveTo(644, 12);
   ctx.lineTo(644, 42);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting a vertical line from horizontal down to Account Deposit Header
   ctx.beginPath();
   ctx.moveTo(810, 12);
   ctx.lineTo(810, 42);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();


   //Left Part of the Arrow
   ctx.beginPath();
   ctx.moveTo(810, 42);
   ctx.lineTo(802, 32);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Right Part of the Arrow
   ctx.beginPath();
   ctx.moveTo(810, 42);
   ctx.lineTo(818, 32);
   ctx.strokeStyle = "#cc0000";
   ctx.lineWidth = arrowSize;
   ctx.stroke();



   //Starting the Green Horizontal Lines for Payment and Withdrawl
   ctx.beginPath();
   ctx.moveTo(910, 12);
   ctx.lineTo(1217, 12);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting Vertical the Green Lines for Horizontal to HST Payment
   ctx.beginPath();
   ctx.moveTo(910, 12);
   ctx.lineTo(910, 42);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting Vertical the Green Lines for Horizontal to PST Payment
   ctx.beginPath();
   ctx.moveTo(1019, 12);
   ctx.lineTo(1019, 42);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting Vertical the Green Lines for Horizontal to Tax Payment
   ctx.beginPath();
   ctx.moveTo(1111, 12);
   ctx.lineTo(1111, 42);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Starting Vertical the Green Lines for Horizontal to Account Withdrawl
   ctx.beginPath();
   ctx.moveTo(1217, 12);
   ctx.lineTo(1217, 42);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Left Part of the Arrow
   ctx.beginPath();
   ctx.moveTo(1217, 42);
   ctx.lineTo(1209, 32);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();

   //Right Part of the Arrow
   ctx.beginPath();
   ctx.moveTo(1217, 42);
   ctx.lineTo(1225, 32);
   ctx.strokeStyle = "#009c00";
   ctx.lineWidth = arrowSize;
   ctx.stroke();




   //starting a new path from the head of the arrow to one of the sides of the point
   // var angle = Math.atan2(740 - 740, 42 - 12);
   // ctx.beginPath();
   // ctx.moveTo(740, 42);
   // ctx.lineTo(740 - 7 * Math.cos(angle - Math.PI / 7), 8 - 7 * Math.sin(angle - Math.PI / 7));

   //path from the side point of the arrow, to the other side point
   // ctx.lineTo(tox - 10 * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));

   // //path from the side point back to the tip of the arrow, and then again to the opposite side point
   // ctx.lineTo(tox, toy);
   // ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

   //draws the paths created above
   // ctx.strokeStyle = "#cc0000";
   // ctx.lineWidth = arrowSize;
   // ctx.stroke();
   // ctx.fillStyle = "#cc0000";
   // ctx.fill();
}

function arrOfAccountObjectToArrOfArrays() {

   let RunningBalance = 0;

   let TempSummingHST = 0;
   let TempSummingPST = 0;
   let TempSummingCPP = 0;
   let TempSummingFedIncomeTax = 0;
   let TempSummingProvIncomeTax = 0;
   let TempSummingGrossRev = 0;
   let TempSummingGrossInc = 0;
   let TempSummingNetInc = 0;
   let TempSummingAcctDep = 0;
   let TempSummingAcctWithdrawl = 0;
   let TempSummingHSTPay = 0;
   let TempSummingPSTPay = 0;
   let TempSummingTaxPay = 0;
   let myTempData = [];
   let myTemp2Arr = [];
   AccountArray.forEach((el, index) => {
      let myTempArr = [];
      myTempArr.push(index + 1);
      let myTempDate = formatMyDate(el.carDate);
      myTempArr.push(myTempDate);
      myTempArr.push(formatNumber(el.carTotalAmt.toFixed(2)));
      myTempArr.push(formatNumber(el.carhstAmt.toFixed(2)));
      myTempArr.push(formatNumber(el.carpstAmt.toFixed(2)));
      myTempArr.push(formatNumber(el.carnetAmt.toFixed(2)));
      myTempArr.push(formatNumber(el.FedTaxes.toFixed(2)));
      myTempArr.push(formatNumber(el.ProvTaxes.toFixed(2)));
      myTempArr.push(formatNumber(el.CPP.toFixed(2)));
      myTempArr.push(formatNumber(el.NetIncome.toFixed(2)));
      myTempArr.push(formatNumber((el.carhstAmt + el.carpstAmt + el.taxes + el.CPP).toFixed(2)));
      myTempArr.push(formatNumber(el.hstAmt.toFixed(2)));
      myTempArr.push(formatNumber(el.pstAmt.toFixed(2)));
      myTempArr.push(formatNumber(el.taxAmt.toFixed(2)));
      myTempArr.push(formatNumber((el.hstAmt + el.pstAmt + el.taxAmt).toFixed(2)));
      RunningBalance += ((el.carhstAmt + el.carpstAmt + el.taxes + el.CPP) - (el.hstAmt + el.pstAmt + el.taxAmt));
      myTempArr.push(formatNumber(RunningBalance.toFixed(2)));

      TempSummingHST += el.carhstAmt;
      TempSummingPST += el.carpstAmt;
      TempSummingFedIncomeTax += el.FedTaxes;
      TempSummingProvIncomeTax += el.ProvTaxes;
      TempSummingCPP += el.CPP;
      TempSummingGrossRev += el.carTotalAmt;
      TempSummingGrossInc += el.carnetAmt;
      TempSummingNetInc += el.NetIncome;
      TempSummingAcctDep += (el.carhstAmt + el.carpstAmt + el.taxes + el.CPP);
      TempSummingAcctWithdrawl += (el.hstAmt + el.pstAmt + el.taxAmt);
      TempSummingHSTPay += el.hstAmt;
      TempSummingPSTPay += el.pstAmt;
      TempSummingTaxPay += el.taxAmt;


      myTempData.push(myTempArr);

   });
   myTemp2Arr.push('');
   myTemp2Arr.push('Totals:');
   myTemp2Arr.push(formatNumber(TempSummingGrossRev.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingHST.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingPST.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingGrossInc.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingFedIncomeTax.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingProvIncomeTax.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingCPP.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingNetInc.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingAcctDep.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingHSTPay.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingPSTPay.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingTaxPay.toFixed(2)));
   myTemp2Arr.push(formatNumber(TempSummingAcctWithdrawl.toFixed(2)));
   myTemp2Arr.push(formatNumber(RunningBalance.toFixed(2)));

   myTempData.push(myTemp2Arr);

   return myTempData;
}


function generateAccountTablePDF() {
   let headText;
   let fileSaveText;
   let data = arrOfAccountObjectToArrOfArrays();
   let columns = [];
   let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
   if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
      columns = ["#", "DATE", "GROSS REV", "HST", "PST", "GROSS INC", "FED TAX", "PROV TAX", "CPP", "NET INC", "ACCT IN", "HST PMT", "PST PMT", "TAX PMT", "ACCT OUT", "ACCT BAL"];
   } else {
      columns = ["#", "DATE", "GROSS REV", "GST", "PST", "GROSS INC", "FED TAX", "PROV TAX", "CPP", "NET INC", "ACCT IN", "GST PMT", "PST PMT", "TAX PMT", "ACCT OUT", "ACCT BAL"];
   }
   let doc = new jsPDF('l', 'px', 'letter', true);
   doc.setTextColor(0, 0, 0);
   doc.setFontSize(9);


   headText = `How Much Can I Keep Report ${AccountArray.length} transactions (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
   fileSaveText = `How Much Can I Keep(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;



   doc.text(headText, 34, 22);
   // if (data.column.dataKey === 'NET' || data.column.dataKey === 'HST' || data.column.dataKey === 'PST' || data.column.dataKey === 'TOTAL') {
   //   cell.styles.halign = 'right';
   // }
   doc.autoTable(columns, data, {
      tableWidth: 'auto',
      columnWidth: 'auto',
      styles: { cellPadding: 1, fontSize: 6.7 },
      createdHeaderCell: function (cell, data) {
         alignAccountCol(cell, data, true);
      },
      createdCell: function (cell, data) {
         alignAccountCol(cell, data, false);
      }
   });

   doc.save(fileSaveText);

}

function alignAccountCol(cell, data, isHeader) {
   var col = data.column.index;
   var row = data.row.index;

   if (row === AccountArray.length) {
      cell.styles.fontStyle = 'bold';
   }
   if (isHeader) {
      cell.styles.halign = 'center';
      if (col === 3 || col === 4 || col === 6 || col === 7 || col === 8) {
         cell.styles.textColor = [255, 0, 0];
         cell.styles.fillColor = [0, 0, 0];
      } else if (col === 11 || col === 12 || col === 13) {
         cell.styles.textColor = [40, 167, 69];
         cell.styles.fillColor = [0, 0, 0];
      } else if (col === 14) {
         cell.styles.fillColor = [40, 167, 69];
         cell.styles.textColor = [255, 255, 255];
      } else if (col === 10) {
         cell.styles.fillColor = [220, 53, 69];
         cell.styles.textColor = [255, 255, 255];
      } else if (col === 9) {
         cell.styles.fillColor = [255, 255, 255];
         cell.styles.textColor = [20, 40, 240];
      } else {
         cell.styles.fillColor = [0, 0, 0];
         cell.styles.textColor = [255, 255, 255];
      }
   } else {
      if (col < 2) {
         cell.styles.halign = 'center';
      } else if (col === 9) {
         cell.styles.textColor = [20, 40, 240];
         cell.styles.halign = 'right';
      } else {
         cell.styles.halign = 'right';
      }
   }
};
