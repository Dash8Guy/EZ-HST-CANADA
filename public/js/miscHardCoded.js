let MiscID = null;
let myTempHardCodeDate = new Date(myDOMs.main_page.LockDate.value);
myTempHardCodeDate.setHours(myTempHardCodeDate.getHours() + (myTempHardCodeDate.getTimezoneOffset() / 60));

// let myHardCodeDate = new Date(
//    myTempHardCodeDate.getFullYear(),
//    myTempHardCodeDate.getMonth(),
//    myTempHardCodeDate.getDate()
// );

let dbMiscData = {
   odometerV1: 0,
   odometerV2: 0,
   lockDate: myTempHardCodeDate,
   homePercJan: 0,
   homePercFeb: 0,
   homePercMar: 0,
   homePercApr: 0,
   homePercMay: 0,
   homePercJun: 0,
   homePercJul: 0,
   homePercAug: 0,
   homePercSep: 0,
   homePercOct: 0,
   homePercNov: 0,
   homePercDec: 0,
   NLPSTExempt: false,
   PEIPSTExempt: false,
   NSPSTExempt: false,
   NBPSTExempt: false,
   QCPSTExempt: false,
   ONPSTExempt: false,
   MBPSTExempt: false,
   SKPSTExempt: false,
   ABPSTExempt: false,
   BCPSTExempt: false,
   YTPSTExempt: false,
   NTPSTExempt: false,
   NUPSTExempt: false,
   IncludeRentalHSTForm: false,
}

function getMiscData() {
   tempData = {
      auth: myToken,
   };

   $.ajax({
      method: "GET",
      url: `${serverURL}miscData`,
      data: tempData,
      enctype: "multipart/form-data"
   })
      .done(function (data) {
         //alert(JSON.stringify(data.miscData, undefined, 2));
         MiscID = data.miscData[0]._id;
         dbMiscData.odometerV1 = data.miscData[0].odometerV1;
         dbMiscData.odometerV2 = data.miscData[0].odometerV2;
         dbMiscData.lockDate = data.miscData[0].lockDate;
         dbMiscData.homePercJan = data.miscData[0].homePercJan;
         dbMiscData.homePercFeb = data.miscData[0].homePercFeb;
         dbMiscData.homePercMar = data.miscData[0].homePercMar;
         dbMiscData.homePercApr = data.miscData[0].homePercApr;
         dbMiscData.homePercMay = data.miscData[0].homePercMay;
         dbMiscData.homePercJun = data.miscData[0].homePercJun;
         dbMiscData.homePercJul = data.miscData[0].homePercJul;
         dbMiscData.homePercAug = data.miscData[0].homePercAug;
         dbMiscData.homePercSep = data.miscData[0].homePercSep;
         dbMiscData.homePercOct = data.miscData[0].homePercOct;
         dbMiscData.homePercNov = data.miscData[0].homePercNov;
         dbMiscData.homePercDec = data.miscData[0].homePercDec;
         dbMiscData.NLPSTExempt = data.miscData[0].NLPSTExempt;
         dbMiscData.PEIPSTExempt = data.miscData[0].PEIPSTExempt;
         dbMiscData.NSPSTExempt = data.miscData[0].NSPSTExempt;
         dbMiscData.NBPSTExempt = data.miscData[0].NBPSTExempt;
         dbMiscData.QCPSTExempt = data.miscData[0].QCPSTExempt;
         dbMiscData.ONPSTExempt = data.miscData[0].ONPSTExempt;
         dbMiscData.MBPSTExempt = data.miscData[0].MBPSTExempt;
         dbMiscData.SKPSTExempt = data.miscData[0].SKPSTExempt;
         dbMiscData.ABPSTExempt = data.miscData[0].ABPSTExempt;
         dbMiscData.BCPSTExempt = data.miscData[0].BCPSTExempt;
         dbMiscData.YTPSTExempt = data.miscData[0].YTPSTExempt;
         dbMiscData.NTPSTExempt = data.miscData[0].NTPSTExempt;
         dbMiscData.NUPSTExempt = data.miscData[0].NUPSTExempt;
         dbMiscData.IncludeRentalHSTForm = data.miscData[0].IncludeRentalHSTForm;

         //Add Date to Page Lock Date
         let mylockTempDate = new Date(dbMiscData.lockDate);
         let mylockTempDateMonth = mylockTempDate.getMonth() + 1;
         let mylockTempDateYear = mylockTempDate.getFullYear();
         let mylockTempDateDay = mylockTempDate.getDate();

         if (mylockTempDateDay < 10) {
            mylockTempDateDay = `0${mylockTempDateDay}`;
         }
         if (mylockTempDateMonth < 10) {
            mylockTempDateMonth = `0${mylockTempDateMonth}`;
         }

         myDOMs.main_page.LockDate.value = mylockTempDateYear + "-" + mylockTempDateMonth + "-" + mylockTempDateDay;

      })
      .fail(function (e) {
         alert(JSON.stringify(e, undefined, 2));
      });

}

const miscData = {
   year2018: {
      MaxCPPContributions: 2593.8,
      MaxCPPEarnings: 55900,
      FederalLevels: {
         TaxLevel1: 0.15,
         TaxLevel2: 0.205,
         TaxLevel3: 0.26,
         TaxLevel4: 0.29,
         TaxLevel5: 0.33,
         TaxLevel6: 0.33,
         TaxLevel7: 0.33,
         TaxLevel8: 0.33,
         TaxLevel9: 0.33,
         TaxLevel10: 0.33,
         IncomeLevel1: 46605,
         IncomeLevel2: 93208,
         IncomeLevel3: 144489,
         IncomeLevel4: 205842,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      NLLevels: {
         TaxLevel1: 0.087,
         TaxLevel2: 0.145,
         TaxLevel3: 0.158,
         TaxLevel4: 0.173,
         TaxLevel5: 0.183,
         TaxLevel6: 0.183,
         TaxLevel7: 0.183,
         TaxLevel8: 0.183,
         TaxLevel9: 0.183,
         TaxLevel10: 0.183,
         IncomeLevel1: 36926,
         IncomeLevel2: 73852,
         IncomeLevel3: 131850,
         IncomeLevel4: 184590,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      PEILevels: {
         TaxLevel1: 0.098,
         TaxLevel2: 0.138,
         TaxLevel3: 0.167,
         TaxLevel4: 0.167,
         TaxLevel5: 0.167,
         TaxLevel6: 0.167,
         TaxLevel7: 0.167,
         TaxLevel8: 0.167,
         TaxLevel9: 0.167,
         TaxLevel10: 0.167,
         IncomeLevel1: 31984,
         IncomeLevel2: 63696,
         IncomeLevel3: 10000000,
         IncomeLevel4: 10000000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      NSLevels: {
         TaxLevel1: 0.0879,
         TaxLevel2: 0.1495,
         TaxLevel3: 0.1667,
         TaxLevel4: 0.175,
         TaxLevel5: 0.21,
         TaxLevel6: 0.21,
         TaxLevel7: 0.21,
         TaxLevel8: 0.21,
         TaxLevel9: 0.21,
         TaxLevel10: 0.21,
         IncomeLevel1: 29590,
         IncomeLevel2: 59180,
         IncomeLevel3: 93000,
         IncomeLevel4: 150000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      NBLevels: {
         TaxLevel1: 0.0968,
         TaxLevel2: 0.1482,
         TaxLevel3: 0.1652,
         TaxLevel4: 0.1784,
         TaxLevel5: 0.203,
         TaxLevel6: 0.203,
         TaxLevel7: 0.203,
         TaxLevel8: 0.203,
         TaxLevel9: 0.203,
         TaxLevel10: 0.203,
         IncomeLevel1: 41675,
         IncomeLevel2: 83351,
         IncomeLevel3: 93000,
         IncomeLevel4: 135510,
         IncomeLevel5: 154382,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      QCLevels: {
         TaxLevel1: 0.15,
         TaxLevel2: 0.20,
         TaxLevel3: 0.24,
         TaxLevel4: 0.2575,
         TaxLevel5: 0.2575,
         TaxLevel6: 0.2575,
         TaxLevel7: 0.2575,
         TaxLevel8: 0.2575,
         TaxLevel9: 0.2575,
         TaxLevel10: 0.2575,
         IncomeLevel1: 42705,
         IncomeLevel2: 85405,
         IncomeLevel3: 103915,
         IncomeLevel4: 10000000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      ONLevels: {
         TaxLevel1: 0.0505,
         TaxLevel2: 0.0915,
         TaxLevel3: 0.1116,
         TaxLevel4: 0.1216,
         TaxLevel5: 0.1316,
         TaxLevel6: 0.1316,
         TaxLevel7: 0.1316,
         TaxLevel8: 0.1316,
         TaxLevel9: 0.1316,
         TaxLevel10: 0.1316,
         IncomeLevel1: 42960,
         IncomeLevel2: 85923,
         IncomeLevel3: 15000,
         IncomeLevel4: 220000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      MBLevels: {
         TaxLevel1: 0.108,
         TaxLevel2: 0.1275,
         TaxLevel3: 0.174,
         TaxLevel4: 0.174,
         TaxLevel5: 0.174,
         TaxLevel6: 0.174,
         TaxLevel7: 0.174,
         TaxLevel8: 0.174,
         TaxLevel9: 0.174,
         TaxLevel10: 0.174,
         IncomeLevel1: 31843,
         IncomeLevel2: 68821,
         IncomeLevel3: 10000000,
         IncomeLevel4: 10000000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      SKLevels: {
         TaxLevel1: 0.105,
         TaxLevel2: 0.125,
         TaxLevel3: 0.145,
         TaxLevel4: 0.145,
         TaxLevel5: 0.145,
         TaxLevel6: 0.145,
         TaxLevel7: 0.145,
         TaxLevel8: 0.145,
         TaxLevel9: 0.145,
         TaxLevel10: 0.145,
         IncomeLevel1: 45225,
         IncomeLevel2: 129214,
         IncomeLevel3: 10000000,
         IncomeLevel4: 10000000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      ABLevels: {
         TaxLevel1: 0.10,
         TaxLevel2: 0.12,
         TaxLevel3: 0.13,
         TaxLevel4: 0.14,
         TaxLevel5: 0.15,
         TaxLevel6: 0.15,
         TaxLevel7: 0.15,
         TaxLevel8: 0.15,
         TaxLevel9: 0.15,
         TaxLevel10: 0.15,
         IncomeLevel1: 128145,
         IncomeLevel2: 153773,
         IncomeLevel3: 205031,
         IncomeLevel4: 307547,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      BCLevels: {
         TaxLevel1: 0.0506,
         TaxLevel2: 0.077,
         TaxLevel3: 0.105,
         TaxLevel4: 0.1229,
         TaxLevel5: 0.147,
         TaxLevel6: 0.168,
         TaxLevel7: 0.168,
         TaxLevel8: 0.168,
         TaxLevel9: 0.168,
         TaxLevel10: 0.168,
         IncomeLevel1: 39676,
         IncomeLevel2: 79353,
         IncomeLevel3: 91107,
         IncomeLevel4: 110630,
         IncomeLevel5: 150000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      YTLevels: {
         TaxLevel1: 0.064,
         TaxLevel2: 0.09,
         TaxLevel3: 0.109,
         TaxLevel4: 0.128,
         TaxLevel5: 0.15,
         TaxLevel6: 0.15,
         TaxLevel7: 0.15,
         TaxLevel8: 0.15,
         TaxLevel9: 0.15,
         TaxLevel10: 0.15,
         IncomeLevel1: 46605,
         IncomeLevel2: 93208,
         IncomeLevel3: 144489,
         IncomeLevel4: 500000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      NTLevels: {
         TaxLevel1: 0.059,
         TaxLevel2: 0.086,
         TaxLevel3: 0.122,
         TaxLevel4: 0.1405,
         TaxLevel5: 0.1405,
         TaxLevel6: 0.1405,
         TaxLevel7: 0.1405,
         TaxLevel8: 0.1405,
         TaxLevel9: 0.1405,
         TaxLevel10: 0.1405,
         IncomeLevel1: 42209,
         IncomeLevel2: 84420,
         IncomeLevel3: 137248,
         IncomeLevel4: 10000000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      },
      NULevels: {
         TaxLevel1: 0.04,
         TaxLevel2: 0.07,
         TaxLevel3: 0.09,
         TaxLevel4: 0.115,
         TaxLevel5: 0.115,
         TaxLevel6: 0.115,
         TaxLevel7: 0.115,
         TaxLevel8: 0.115,
         TaxLevel9: 0.115,
         TaxLevel10: 0.115,
         IncomeLevel1: 44437,
         IncomeLevel2: 88874,
         IncomeLevel3: 144488,
         IncomeLevel4: 10000000,
         IncomeLevel5: 10000000,
         IncomeLevel6: 10000000,
         IncomeLevel7: 10000000,
         IncomeLevel8: 10000000,
         IncomeLevel9: 10000000,
         IncomeLevel10: 10000000,
      }
   }
};

function postMiscData() {
   dbMiscData.auth = myToken;
   $.ajax({
      url: `${serverURL}miscData`,
      method: "POST",
      data: dbMiscData,
      enctype: "multipart/form-data",
   })
      .done(function (data) {
         alert('Data Successfully Saved');
      })
      .fail(function (e) {
         alert(`Misc Data Could Not Be saved - Error: ${JSON.stringify(e, undefined, 2)}`);
      });

}

function updateMiscData() {
   if (dbMiscData.lockDate === null) {
      let myTempHardCodeDate = new Date(myDOMs.main_page.LockDate.value);
      myTempHardCodeDate.setHours(myTempHardCodeDate.getHours() + (myTempHardCodeDate.getTimezoneOffset() / 60));

      // let myHardCodeDate = new Date(
      //    myTempHardCodeDate.getFullYear(),
      //    myTempHardCodeDate.getMonth(),
      //    myTempHardCodeDate.getDate()
      // );
      dbMiscData.lockDate = myHardCodeDate;
   }
   dbMiscData.auth = myToken;

   return new Promise((resolve, reject) => {
      $.ajax({
         url: `${serverURL}miscData/${MiscID}`,
         method: "PATCH",
         data: dbMiscData,
         enctype: "multipart/form-data",
      })
         .done(function (data) {
            resolve(data)
            return ('completed');
         })
         .fail(function (e) {
            reject(`Data Could Not Be saved - Error: ${JSON.stringify(e, undefined, 2)}`)
            alert(`Data Could Not Be saved - Error: ${JSON.stringify(e, undefined, 2)}`);
         });
   });
}