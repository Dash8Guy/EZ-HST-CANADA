let RentalIncDataArray = [];
let BusinessIncDataArray = [];
let BusinessExpDataArray = [];
let Vehicle1ExpDataArray = [];
let Vehicle2ExpDataArray = [];
let HomeExpDataArray = [];
let OtherCostExpDataArray = [];
let RentalExpDataArray = [];
let FixedAssetArray = [];

let Return_Time_Period = '';

let NetBusinessRevenue = 0;
let NetRentalRevenue = 0;
let CollectedHST = 0;
let CollectedPST = 0;
let BushstITCs = 0;
let BuspstITCs = 0;
let Vehicle1hstITCs = 0;
let Vehicle1pstITCs = 0;
let Vehicle2hstITCs = 0;
let Vehicle2pstITCs = 0;
let HomehstITCs = 0;
let HomepstITCs = 0;
let OtherhstITCs = 0;
let OtherpstITCs = 0;
let RentalhstITCs = 0;
let RentalpstITCs = 0;
let FixedAssethstITCs = 0;
let FixedAssetpstITCs = 0;

let Return_Line103 = 0;
let Return_Line104 = 0;
let Return_Line106 = 0;
let Return_Line107 = 0;
let Return_Line110 = 0;
let Return_Line111 = 0;
let Return_Line205 = 0;
let Return_Line405 = 0;

let ID_Line103 = '';
let ID_Line104 = '';
let ID_Line106 = '';
let ID_Line107 = '';
let ID_Line110 = '';
let ID_Line111 = '';
let ID_Line205 = '';
let ID_Line405 = '';


let Return_PST_Line103 = 0;
let Return_PST_Line104 = 0;
let Return_PST_Line106 = 0;
let Return_PST_Line107 = 0;
let Return_PST_Line110 = 0;
let Return_PST_Line111 = 0;
let Return_PST_Line205 = 0;
let Return_PST_Line405 = 0;



let myReturnType = 'HST';

//The next 2 variable are booleans to check if Payment Modal is open
let HSTPaymentModalOpen = false;
let PSTPaymentModalOpen = false;

function displayHSTReturnModal() {
   myReturnType = 'HST';
   myDOMs.HST_Return.StartDate.value = myDOMs.main_page.StartDate.value;
   myDOMs.HST_Return.EndDate.value = myDOMs.main_page.EndDate.value;
   $("#HSTReturnModal").modal("show");
   myDOMs.HST_Return.Type_Selector.value = 'HST';
   Return_Time_Period = getTimePeriod();
   getReturnData();
   StartReturnFunctions();
   if (PST_Claim_Value === 'EXP') {
      if (myDOMs.HST_Return.Type_Selector.classList.contains('d-none')) {
      } else {
         myDOMs.HST_Return.Type_Selector.classList.add('d-none');
      }
   } else {
      if (myDOMs.HST_Return.Type_Selector.classList.contains('d-none')) {
         myDOMs.HST_Return.Type_Selector.classList.remove('d-none');
      }
   }

   ToggleMenuBar();
};

function hideHSTReturnModal() {
   $("#HSTReturnModal").modal("hide");
   myDOMs.HST_Return.Line101.value = '';
   myDOMs.HST_Return.Line103.value = '';
   myDOMs.HST_Return.Line104.value = '';
   myDOMs.HST_Return.Line105.value = '';
   myDOMs.HST_Return.Line106.value = '';
   myDOMs.HST_Return.Line107.value = '';
   myDOMs.HST_Return.Line108.value = '';
   myDOMs.HST_Return.Line109.value = '';
   myDOMs.HST_Return.Line110.value = '';
   myDOMs.HST_Return.Line111.value = '';
   myDOMs.HST_Return.Line112.value = '';
   myDOMs.HST_Return.Line113A.value = '';
   myDOMs.HST_Return.Line113B.value = '';
   myDOMs.HST_Return.Line113C.value = '';
   myDOMs.HST_Return.Line114.value = '';
   myDOMs.HST_Return.Line115.value = '';
   myDOMs.HST_Return.Line205.value = '';
   myDOMs.HST_Return.Line405.value = '';
   ZeroTheReturnData();
   ToggleMenuBar();
};

function updateReturnData(LineNumber) {
   let myTimePeriod = Return_Time_Period;
   let myLineValue = 0;
   let mydata = {};
   let Return_ID = '';
   formData = new FormData();

   switch (LineNumber) {
      case 103:
         myLineValue = Number(myDOMs.HST_Return.Line103.value);
         Return_ID = ID_Line103;
         break;
      case 104:
         myLineValue = Number(myDOMs.HST_Return.Line104.value);
         Return_ID = ID_Line104;
         break;
      case 106:
         myLineValue = Number(myDOMs.HST_Return.Line106.value);
         Return_ID = ID_Line106;
         break;
      case 107:
         myLineValue = Number(myDOMs.HST_Return.Line107.value);
         Return_ID = ID_Line107;
         break;
      case 110:
         myLineValue = Number(myDOMs.HST_Return.Line110.value);
         Return_ID = ID_Line110;
         break;
      case 111:
         myLineValue = Number(myDOMs.HST_Return.Line111.value);
         Return_ID = ID_Line111;
         break;
      case 205:
         myLineValue = Number(myDOMs.HST_Return.Line205.value);
         Return_ID = ID_Line205;
         break;
      case 405:
         myLineValue = Number(myDOMs.HST_Return.Line405.value);
         Return_ID = ID_Line405;
   }
   switch (myTimePeriod) {
      case 'YearAmt':
         if (myReturnType === 'HST') {
            formData.append('YearAmt', myLineValue);
         } else {
            formData.append('YearPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'Q1Amt':
         if (myReturnType === 'HST') {
            formData.append('Q1Amt', myLineValue);
         } else {
            formData.append('Q1PSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'Q2Amt':
         if (myReturnType === 'HST') {
            formData.append('Q2Amt', myLineValue);
         } else {
            formData.append('Q2PSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'Q3Amt':
         if (myReturnType === 'HST') {
            formData.append('Q3Amt', myLineValue);
         } else {
            formData.append('Q3PSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'Q4Amt':
         if (myReturnType === 'HST') {
            formData.append('Q4Amt', myLineValue);
         } else {
            formData.append('Q4PSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'JanAmt':
         if (myReturnType === 'HST') {
            formData.append('JanAmt', myLineValue);
         } else {
            formData.append('JanPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'FebAmt':
         if (myReturnType === 'HST') {
            formData.append('FebAmt', myLineValue);
         } else {
            formData.append('FebPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'MarAmt':
         if (myReturnType === 'HST') {
            formData.append('MarAmt', myLineValue);
         } else {
            formData.append('MarPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'AprAmt':
         if (myReturnType === 'HST') {
            formData.append('AprAmt', myLineValue);
         } else {
            formData.append('AprPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'MayAmt':
         if (myReturnType === 'HST') {
            formData.append('MayAmt', myLineValue);
         } else {
            formData.append('MayPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'JunAmt':
         if (myReturnType === 'HST') {
            formData.append('JunAmt', myLineValue);
         } else {
            formData.append('JunPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'JulAmt':
         if (myReturnType === 'HST') {
            formData.append('JulAmt', myLineValue);
         } else {
            formData.append('JulPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'AugAmt':
         if (myReturnType === 'HST') {
            formData.append('AugAmt', myLineValue);
         } else {
            formData.append('AugPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'SepAmt':
         if (myReturnType === 'HST') {
            formData.append('SepAmt', myLineValue);
         } else {
            formData.append('SepPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'OctAmt':
         if (myReturnType === 'HST') {
            formData.append('OctAmt', myLineValue);
         } else {
            formData.append('OctPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'NovAmt':
         if (myReturnType === 'HST') {
            formData.append('NovAmt', myLineValue);
         } else {
            formData.append('NovPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
         break;
      case 'DecAmt':
         if (myReturnType === 'HST') {
            formData.append('DecAmt', myLineValue);
         } else {
            formData.append('DecPSTAmt', myLineValue);
         }
         formData.append('LineNumber', LineNumber);
         formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
   }

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "PATCH",
         url: `${serverURL}return_data/${Return_ID}`,
         data: formData,
         enctype: "multipart/form-data",
         processData: false,
         contentType: false
      })
         .done(function (data) {
            resolve(data);
            switch (LineNumber) {
               case 103:
                  if (myReturnType === 'HST') {
                     Return_Line103 = myLineValue;
                  } else {
                     Return_PST_Line103 = myLineValue;
                  }
                  break;
               case 104:
                  if (myReturnType === 'HST') {
                     Return_Line104 = myLineValue;
                  } else {
                     Return_PST_Line104 = myLineValue;
                  }
                  break;
               case 106:
                  if (myReturnType === 'HST') {
                     Return_Line106 = myLineValue;
                  } else {
                     Return_PST_Line106 = myLineValue;
                  }
                  break;
               case 107:
                  if (myReturnType === 'HST') {
                     Return_Line107 = myLineValue;
                  } else {
                     Return_PST_Line107 = myLineValue;
                  }
                  break;
               case 110:
                  if (myReturnType === 'HST') {
                     Return_Line110 = myLineValue;
                  } else {
                     Return_PST_Line110 = myLineValue;
                  }
                  break;
               case 111:
                  if (myReturnType === 'HST') {
                     Return_Line111 = myLineValue;
                  } else {
                     Return_PST_Line111 = myLineValue;
                  }
                  break;
               case 205:
                  if (myReturnType === 'HST') {
                     Return_Line205 = myLineValue;
                  } else {
                     Return_PST_Line205 = myLineValue;
                  }
                  break;
               case 405:
                  if (myReturnType === 'HST') {
                     Return_Line405 = myLineValue;
                  } else {
                     Return_PST_Line405 = myLineValue;
                  }
            }
         })
         .fail(function (err) {
            reject(err.statusText, undefined, 2);
         });
   });
};

function getReturnData() {

   let tempData = {
      auth: window.sessionStorage.getItem('myRandomVar')
   };

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "GET",
         url: `${serverURL}return_data`,
         data: tempData,
         enctype: "multipart/form-data"
      })
         .done(function (data) {
            resolve(data);
            // console.log(JSON.stringify(data, undefined, 2));
            if (data.return_data !== []) {
               updateLineVariablesForPeriod(data.return_data);
            }
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

function postReturnData(LineNumber) {
   let myTimePeriod = Return_Time_Period;
   let myLineValue = 0;
   let mydata = {};

   switch (LineNumber) {
      case 103:
         myLineValue = Number(myDOMs.HST_Return.Line103.value);
         break;
      case 104:
         myLineValue = Number(myDOMs.HST_Return.Line104.value);
         break;
      case 106:
         myLineValue = Number(myDOMs.HST_Return.Line106.value);
         break;
      case 107:
         myLineValue = Number(myDOMs.HST_Return.Line107.value);
         break;
      case 110:
         myLineValue = Number(myDOMs.HST_Return.Line110.value);
         break;
      case 111:
         myLineValue = Number(myDOMs.HST_Return.Line111.value);
         break;
      case 205:
         myLineValue = Number(myDOMs.HST_Return.Line205.value);
         break;
      case 405:
         myLineValue = Number(myDOMs.HST_Return.Line405.value);
   }

   switch (myTimePeriod) {
      case 'YearAmt':
         if (myReturnType === 'HST') {
            mydata = {
               YearAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               YearPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }

         break;
      case 'Q1Amt':
         if (myReturnType === 'HST') {
            mydata = {
               Q1Amt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               Q1PSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'Q2Amt':
         if (myReturnType === 'HST') {
            mydata = {
               Q2Amt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               Q2PSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'Q3Amt':
         if (myReturnType === 'HST') {
            mydata = {
               Q3Amt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               Q3PSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'Q4Amt':
         if (myReturnType === 'HST') {
            mydata = {
               Q4Amt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               Q4PSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'JanAmt':
         if (myReturnType === 'HST') {
            mydata = {
               JanAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               JanPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'FebAmt':
         if (myReturnType === 'HST') {
            mydata = {
               FebAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               FebPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'MarAmt':
         if (myReturnType === 'HST') {
            mydata = {
               MarAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               MarPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'AprAmt':
         if (myReturnType === 'HST') {
            mydata = {
               AprAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               AprPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'MayAmt':
         if (myReturnType === 'HST') {
            mydata = {
               MayAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               MayPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'JunAmt':
         if (myReturnType === 'HST') {
            mydata = {
               JunAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               JunPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'JulAmt':
         if (myReturnType === 'HST') {
            mydata = {
               JulAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               JulPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'AugAmt':
         if (myReturnType === 'HST') {
            mydata = {
               AugAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               AugPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'SepAmt':
         if (myReturnType === 'HST') {
            mydata = {
               SepAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               SepPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'OctAmt':
         if (myReturnType === 'HST') {
            mydata = {
               OctAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               OctPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'NovAmt':
         if (myReturnType === 'HST') {
            mydata = {
               NovAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               NovPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
         break;
      case 'DecAmt':
         if (myReturnType === 'HST') {
            mydata = {
               DecAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         } else {
            mydata = {
               DecPSTAmt: myLineValue,
               LineNumber: LineNumber,
               auth: window.sessionStorage.getItem('myRandomVar')
            };
         }
   }

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "POST",
         url: `${serverURL}return_data`,
         data: mydata,
         enctype: "multipart/form-data"
      })
         .done(function (data) {
            resolve(data);
            switch (LineNumber) {
               case 103:
                  if (myReturnType === 'HST') {
                     Return_Line103 = myLineValue;
                  } else {
                     Return_PST_Line103 = myLineValue;
                  }
                  ID_Line103 = data._id;
                  break;
               case 104:
                  if (myReturnType === 'HST') {
                     Return_Line104 = myLineValue;
                  } else {
                     Return_PST_Line104 = myLineValue;
                  }
                  ID_Line104 = data._id;
                  break;
               case 106:
                  if (myReturnType === 'HST') {
                     Return_Line106 = myLineValue;
                  } else {
                     Return_PST_Line106 = myLineValue;
                  }
                  ID_Line106 = data._id;
                  break;
               case 107:
                  if (myReturnType === 'HST') {
                     Return_Line107 = myLineValue;
                  } else {
                     Return_PST_Line107 = myLineValue;
                  }
                  ID_Line107 = data._id;
                  break;
               case 110:
                  if (myReturnType === 'HST') {
                     Return_Line110 = myLineValue;
                  } else {
                     Return_PST_Line110 = myLineValue;
                  }
                  ID_Line110 = data._id;
                  break;
               case 111:
                  if (myReturnType === 'HST') {
                     Return_Line111 = myLineValue;
                  } else {
                     Return_PST_Line111 = myLineValue;
                  }
                  ID_Line111 = data._id;
                  break;
               case 205:
                  if (myReturnType === 'HST') {
                     Return_Line205 = myLineValue;
                  } else {
                     Return_PST_Line205 = myLineValue;
                  }
                  ID_Line205 = data._id;
                  break;
               case 405:
                  if (myReturnType === 'HST') {
                     Return_Line405 = myLineValue;
                  } else {
                     Return_PST_Line405 = myLineValue;
                  }
                  ID_Line405 = data._id;
            }
         })
         .fail(function (err) {
            reject(err.statusText, undefined, 2);
         });
   });
};

function getTimePeriod() {
   let myStartDate = new Date(myDOMs.main_page.StartDate.value);
   let myEndDate = new Date(myDOMs.main_page.EndDate.value);

   switch (myStartDate.getUTCMonth()) {
      case 0:
         switch (myEndDate.getUTCMonth()) {
            case 0:
               return 'JanAmt';
            case 2:
               return 'Q1Amt';
            case 11:
               return 'YearAmt'
         }
         break;
      case 1:
         switch (myEndDate.getUTCMonth()) {
            case 1:
               return 'FebAmt';
         }
         break;
      case 2:
         switch (myEndDate.getUTCMonth()) {
            case 2:
               return 'MarAmt';
         }
         break;
      case 3:
         switch (myEndDate.getUTCMonth()) {
            case 3:
               return 'AprAmt';
            case 5:
               return 'Q2Amt';
         }
         break;
      case 4:
         switch (myEndDate.getUTCMonth()) {
            case 4:
               return 'MayAmt';
         }
         break;
      case 5:
         switch (myEndDate.getUTCMonth()) {
            case 5:
               return 'JunAmt';
         }
         break;
      case 6:
         switch (myEndDate.getUTCMonth()) {
            case 6:
               return 'JulAmt';
            case 8:
               return 'Q3Amt';
         }
         break;
      case 7:
         switch (myEndDate.getUTCMonth()) {
            case 7:
               return 'AugAmt';
         }
         break;
      case 8:
         switch (myEndDate.getUTCMonth()) {
            case 8:
               return 'SepAmt';
         }
         break;
      case 9:
         switch (myEndDate.getUTCMonth()) {
            case 9:
               return 'OctAmt';
            case 11:
               return 'Q4Amt';
         }
         break;
      case 10:
         switch (myEndDate.getUTCMonth()) {
            case 10:
               return 'NovAmt';
         }
         break;
      case 11:
         switch (myEndDate.getUTCMonth()) {
            case 11:
               return 'DecAmt';
         }
   }

   alert('EZ-HST-CANADA cannot process your Return unless the Time Period Start Date and End Date correspond to a Predetermined Time Period. Please Select a Time Period from the Selector!');

};

async function FillAllArrays() {
   await GatherBusIncomeData();
   await GatherRentalIncomeData();
   await GatherAssetData();
   await GatherRequestedExpenseData('Bus');
   await GatherRequestedExpenseData('1');
   await GatherRequestedExpenseData('2');
   await GatherRequestedExpenseData('Home');
   await GatherRequestedExpenseData('Other');
   await GatherRequestedExpenseData('Rental');

};

function GatherBusIncomeData() {

   let tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: startDate.getUTCMonth(),
      startDay: startDate.getUTCDate(),
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
            BusinessIncDataArray = data.busIncome;
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

function updateLineVariablesForPeriod(myReturnArray) {
   let TempLineValue = 0;
   let TempLinePSTValue = 0;
   myReturnArray.forEach((el, index) => {

      switch (Return_Time_Period) {
         case 'YearAmt':
            TempLineValue = el.YearAmt;
            TempLinePSTValue = el.YearPSTAmt;
            break;
         case 'JanAmt':
            TempLineValue = el.JanAmt;
            TempLinePSTValue = el.JanPSTAmt;
            break;
         case 'FebAmt':
            TempLineValue = el.FebAmt;
            TempLinePSTValue = el.FebPSTAmt;
            break;
         case 'MarAmt':
            TempLineValue = el.MarAmt;
            TempLinePSTValue = el.MarPSTAmt;
            break;
         case 'AprAmt':
            TempLineValue = el.AprAmt;
            TempLinePSTValue = el.AprPSTAmt;
            break;
         case 'MayAmt':
            TempLineValue = el.MayAmt;
            TempLinePSTValue = el.MayPSTAmt;
            break;
         case 'JunAmt':
            TempLineValue = el.JunAmt;
            TempLinePSTValue = el.JunPSTAmt;
            break;
         case 'JulAmt':
            TempLineValue = el.JulAmt;
            TempLinePSTValue = el.JulPSTAmt;
            break;
         case 'AugAmt':
            TempLineValue = el.AugAmt;
            TempLinePSTValue = el.AugPSTAmt;
            break;
         case 'SepAmt':
            TempLineValue = el.SepAmt;
            TempLinePSTValue = el.SepPSTAmt;
            break;
         case 'OctAmt':
            TempLineValue = el.OctAmt;
            TempLinePSTValue = el.OctPSTAmt;
            break;
         case 'NovAmt':
            TempLineValue = el.NovAmt;
            TempLinePSTValue = el.NovPSTAmt;
            break;
         case 'DecAmt':
            TempLineValue = el.DecAmt;
            TempLinePSTValue = el.DecPSTAmt;
            break;
         case 'Q1Amt':
            TempLineValue = el.Q1Amt;
            TempLinePSTValue = el.Q1PSTAmt;
            break;
         case 'Q2Amt':
            TempLineValue = el.Q2Amt;
            TempLinePSTValue = el.Q2PSTAmt;
            break;
         case 'Q3Amt':
            TempLineValue = el.Q3Amt;
            TempLinePSTValue = el.Q3PSTAmt;
            break;
         case 'Q4Amt':
            TempLineValue = el.Q4Amt;
            TempLinePSTValue = el.Q4PSTAmt;
      }

      switch (el.LineNumber) {
         case '103':
            ID_Line103 = el._id;
            Return_Line103 = TempLineValue;
            Return_PST_Line103 = TempLinePSTValue;
            break;
         case '104':
            ID_Line104 = el._id;
            Return_Line104 = TempLineValue;
            Return_PST_Line104 = TempLinePSTValue;
            break;
         case '106':
            ID_Line106 = el._id;
            Return_Line106 = TempLineValue;
            Return_PST_Line106 = TempLinePSTValue;
            break;
         case '107':
            ID_Line107 = el._id;
            Return_Line107 = TempLineValue;
            Return_PST_Line107 = TempLinePSTValue;
            break;
         case '110':
            ID_Line110 = el._id;
            Return_Line110 = TempLineValue;
            Return_PST_Line110 = TempLinePSTValue;
            break;
         case '111':
            ID_Line111 = el._id;
            Return_Line111 = TempLineValue;
            Return_PST_Line111 = TempLinePSTValue;
            break;
         case '205':
            ID_Line205 = el._id;
            Return_Line205 = TempLineValue;
            Return_PST_Line205 = TempLinePSTValue;
            break;
         case '405':
            ID_Line405 = el._id;
            Return_Line405 = TempLineValue;
            Return_PST_Line405 = TempLinePSTValue;
      }
   });
};

function GatherRentalIncomeData() {

   let tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: startDate.getUTCMonth(),
      startDay: startDate.getUTCDate(),
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
            RentalIncDataArray = data.rentalIncome;
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

function GatherAssetData() {

   let tempData = {
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: startDate.getUTCMonth(),
      startDay: startDate.getUTCDate(),
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate()
   };

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "GET",
         url: `${serverURL}fixedAssets`,
         data: tempData,
         enctype: "multipart/form-data"
      })
         .done(function (data) {
            resolve(data);
            FixedAssetArray = data.assets;
         })
         .fail(function (e) {
            reject(JSON.stringify(e.statusText, undefined, 2));
            if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' || window.sessionStorage.getItem('myRandomVar') === null) {
               alert('You Must be logged in before using EZ-HST-CANADA>')
            } else {
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });
};

function GatherRequestedExpenseData(carNumber) {

   //carNumber = Income, 1, 2, Bus, Home, Other, Rental
   let tempData = {
      carNumber: carNumber,
      auth: window.sessionStorage.getItem('myRandomVar'),
      startYear: startDate.getUTCFullYear(),
      startMonth: startDate.getUTCMonth(),
      startDay: startDate.getUTCDate(),
      endYear: endDate.getUTCFullYear(),
      endMonth: endDate.getUTCMonth(),
      endDay: endDate.getUTCDate()
   };

   return new Promise((resolve, reject) => {
      $.ajax({
         method: "GET",
         url: `${serverURL}carExpense`,
         data: tempData,
         enctype: "multipart/form-data"
      })
         .done(function (myExpenses) {
            resolve(myExpenses);
            switch (carNumber) {
               case '1':
                  Vehicle1ExpDataArray = myExpenses.carexpense;
                  break;
               case '2':
                  Vehicle2ExpDataArray = myExpenses.carexpense;
                  break;
               case 'Bus':
                  BusinessExpDataArray = myExpenses.carexpense;
                  break;
               case 'Home':
                  HomeExpDataArray = myExpenses.carexpense;
                  break;
               case 'Other':
                  OtherCostExpDataArray = myExpenses.carexpense;
                  break;
               case 'Rental':
                  RentalExpDataArray = myExpenses.carexpense;
            }
         })
         .fail(function (e) {
            reject(JSON.stringify(e.statusText, undefined, 2));
            if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '' || window.sessionStorage.getItem('myRandomVar') === null) {
               alert('You Must be logged in before using EZ-HST-CANADA>')
            } else {
               alert(JSON.stringify(e.statusText, undefined, 2));
            }
         });
   });





};

async function StartReturnFunctions() {
   ZeroTheReturnData(false);
   await FillAllArrays();
   await LoopBusinessRevenue();
   await LoopRentalRevenue();
   await LoopBusinessITCs();
   await LoopVehicle1ITCs();
   await LoopVehicle2ITCs();
   await LoopHomeITCs();
   await LoopOtherITCs();
   await LoopRentalITCs();
   await LoopAssetITCs();
   DoTheMathonLoopedData();

};

function LoopBusinessRevenue() {
   BusinessIncDataArray.forEach((el, index) => {
      NetBusinessRevenue += Number(el.carnetAmt);
      CollectedHST += Number(el.carhstAmt);
      CollectedPST += Number(el.carpstAmt);
   });
};

function LoopRentalRevenue() {
   RentalIncDataArray.forEach((el, index) => {
      NetRentalRevenue += Number(el.carnetAmt);
   });
};

function LoopBusinessITCs() {
   BusinessExpDataArray.forEach((el, index) => {
      if (el.carExpCatSelect === 'Meals and Entertainment') {
         BushstITCs += Number(el.carhstAmt) * 0.5;
         BuspstITCs += Number(el.carpstAmt) * 0.5;
      } else {
         BushstITCs += Number(el.carhstAmt);
         BuspstITCs += Number(el.carpstAmt);
      }
   });
}

function LoopVehicle1ITCs() {
   Vehicle1ExpDataArray.forEach((el, index) => {
      let loopDate = new Date(el.carDate);
      let loopMonth = loopDate.getUTCMonth();
      switch (loopMonth) {
         case 0:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercJanV1 / 100);
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercJanV1 / 100);
            }
            break;
         case 1:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercFebV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercFebV1 / 100);;
            }
            break;
         case 2:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercMarV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercMarV1 / 100);;
            }
            break;
         case 3:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercAprV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercAprV1 / 100);;
            }
            break;
         case 4:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercMayV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercMayV1 / 100);;
            }
            break;
         case 5:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercJunV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercJunV1 / 100);;
            }
            break;
         case 6:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercJulV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercJulV1 / 100);;
            }
            break;
         case 7:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercAugV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercAugV1 / 100);;
            }
            break;
         case 8:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercSepV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercSepV1 / 100);;
            }
            break;
         case 9:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercOctV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercOctV1 / 100);;
            }
            break;
         case 10:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercNovV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercNovV1 / 100);;
            }
            break;
         case 11:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle1hstITCs += Number(el.carhstAmt);
               Vehicle1pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle1hstITCs += Number(el.carhstAmt) * (BusPercDecV1 / 100);;
               Vehicle1pstITCs += Number(el.carpstAmt) * (BusPercDecV1 / 100);;
            }
      }

   });
};

function LoopVehicle2ITCs() {
   Vehicle2ExpDataArray.forEach((el, index) => {
      let loopDate = new Date(el.carDate);
      let loopMonth = loopDate.getUTCMonth();

      switch (loopMonth) {
         case 0:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercJanV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercJanV2 / 100);;
            }
            break;
         case 1:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercFebV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercFebV2 / 100);;
            }
            break;
         case 2:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercMarV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercMarV2 / 100);;
            }
            break;
         case 3:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercAprV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercAprV2 / 100);;
            }
            break;
         case 4:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercMayV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercMayV2 / 100);;
            }
            break;
         case 5:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercJunV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercJunV2 / 100);;
            }
            break;
         case 6:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercJulV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercJulV2 / 100);;
            }
            break;
         case 7:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercAugV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercAugV2 / 100);;
            }
            break;
         case 8:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercSepV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercSepV2 / 100);;
            }
            break;
         case 9:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercOctV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercOctV2 / 100);;
            }
            break;
         case 10:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercNovV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercNovV2 / 100);;
            }
            break;
         case 11:
            if (el.carExpCatSelect === 'Business Parking Fees' || el.carExpCatSelect === 'Supplementary Business Insurance') {
               Vehicle2hstITCs += Number(el.carhstAmt);
               Vehicle2pstITCs += Number(el.carpstAmt);
            } else {
               Vehicle2hstITCs += Number(el.carhstAmt) * (BusPercDecV2 / 100);;
               Vehicle2pstITCs += Number(el.carpstAmt) * (BusPercDecV2 / 100);;
            }
      }

   });
};

function LoopHomeITCs() {
   HomeExpDataArray.forEach((el, index) => {
      let loopDate = new Date(el.carDate);
      let loopMonth = loopDate.getUTCMonth();
      switch (loopMonth) {
         case 0:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercJan / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercJan / 100);;
            break;
         case 1:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercFeb / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercFeb / 100);;
            break;
         case 2:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercMar / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercMar / 100);;
            break;
         case 3:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercApr / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercApr / 100);;
            break;
         case 4:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercMay / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercMay / 100);;
            break;
         case 5:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercJun / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercJun / 100);;
            break;
         case 6:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercJul / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercJul / 100);;
            break;
         case 7:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercAug / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercAug / 100);;
            break;
         case 8:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercSep / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercSep / 100);;
            break;
         case 9:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercOct / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercOct / 100);;
            break;
         case 10:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercNov / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercNov / 100);;
            break;
         case 11:
            HomehstITCs += Number(el.carhstAmt) * (dbMiscData.homePercDec / 100);;
            HomepstITCs += Number(el.carpstAmt) * (dbMiscData.homePercDec / 100);;
      }

   });
};

function LoopOtherITCs() {
   OtherCostExpDataArray.forEach((el, index) => {
      OtherhstITCs += Number(el.carhstAmt);
      OtherpstITCs += Number(el.carpstAmt);
   });
};

function LoopRentalITCs() {
   RentalExpDataArray.forEach((el, index) => {
      RentalhstITCs += Number(el.carhstAmt);
      RentalpstITCs += Number(el.carpstAmt);
   });
};

function LoopAssetITCs() {
   FixedAssetArray.forEach((el, index) => {
      FixedAssethstITCs += Number(el.itcClaimAmt * el.busPercent / 100);
      FixedAssetpstITCs += Number(el.itc_pstClaimAmt * el.busPercent / 100);
   });
};

function ZeroTheReturnData(fromLine) {
   RentalIncDataArray = [];
   BusinessIncDataArray = [];
   BusinessExpDataArray = [];
   Vehicle1ExpDataArray = [];
   Vehicle2ExpDataArray = [];
   HomeExpDataArray = [];
   OtherCostExpDataArray = [];
   RentalExpDataArray = [];
   FixedAssetArray = [];

   if (fromLine) {
   } else {
      NetBusinessRevenue = 0;
      NetRentalRevenue = 0;
      CollectedHST = 0;
      CollectedPST = 0;
      BushstITCs = 0;
      BuspstITCs = 0;
      Vehicle1hstITCs = 0;
      Vehicle1pstITCs = 0;
      Vehicle2hstITCs = 0;
      Vehicle2pstITCs = 0;
      HomehstITCs = 0;
      HomepstITCs = 0;
      OtherhstITCs = 0;
      OtherpstITCs = 0;
      RentalhstITCs = 0;
      RentalpstITCs = 0;
      FixedAssethstITCs = 0;
      FixedAssetpstITCs = 0;
   }
};

function DoTheMathonLoopedData() {
   let myZeroVal = 0;
   let myLine103 = 0;
   let myLine105 = 0;
   let myLine104 = 0;
   let myLine107 = 0;
   let myLine108 = 0;
   let myLine109 = 0;
   let myLine110 = 0;
   let myLine111 = 0;
   let myLine112 = 0;
   let myLine113A = 0;
   let myLine113B = 0;
   let myLine113C = 0;
   let myLine205 = 0;
   let myLine405 = 0;

   myDOMs.HST_Return.Line101.value = `$${formatNumber((NetBusinessRevenue + NetRentalRevenue).toFixed(2))}`;

   if (ID_Line103 !== '') {
      //If there is saved data in database for line one (Could be another Time Period and not current one so we need to check line value)
      if (myReturnType === 'HST') {
         if (Return_Line103 !== null && Return_Line103 !== undefined && Return_Line103 !== '' && Return_Line103 !== 0) {
            myDOMs.HST_Return.Line103.value = `$${formatNumber((Return_Line103).toFixed(2))}`;
            myLine103 = Return_Line103;
         } else {
            myDOMs.HST_Return.Line103.value = `$${formatNumber((CollectedHST).toFixed(2))}`;
            myLine103 = CollectedHST;
         }
      } else {
         if (Return_PST_Line103 !== null && Return_PST_Line103 !== undefined && Return_PST_Line103 !== '' && Return_PST_Line103 !== 0) {
            myDOMs.HST_Return.Line103.value = `$${formatNumber((Return_PST_Line103).toFixed(2))}`;
            myLine103 = Return_PST_Line103;
         } else {
            myDOMs.HST_Return.Line103.value = `$${formatNumber((CollectedPST).toFixed(2))}`;
            myLine103 = CollectedPST;
         }
      }

   } else {
      if (myReturnType === 'HST') {
         myDOMs.HST_Return.Line103.value = `$${formatNumber((CollectedHST).toFixed(2))}`;
         myLine103 = CollectedHST;
      } else {
         myDOMs.HST_Return.Line103.value = `$${formatNumber((CollectedPST).toFixed(2))}`;
         myLine103 = CollectedPST;
      }

   }

   if (ID_Line104 !== '') {
      if (myReturnType === 'HST') {
         if (Return_Line104 !== null && Return_Line104 !== undefined && Return_Line104 !== '' && Return_Line104 !== 0) {
            myDOMs.HST_Return.Line104.value = `$${formatNumber((Return_Line104).toFixed(2))}`;
            myLine104 = Return_Line104;
         } else {
            myDOMs.HST_Return.Line104.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine104 = 0;
         }
      } else {
         if (Return_PST_Line104 !== null && Return_PST_Line104 !== undefined && Return_PST_Line104 !== '' && Return_PST_Line104 !== 0) {
            myDOMs.HST_Return.Line104.value = `$${formatNumber((Return_PST_Line104).toFixed(2))}`;
            myLine104 = Return_PST_Line104;
         } else {
            myDOMs.HST_Return.Line104.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine104 = 0;
         }
      }


   } else {

      myDOMs.HST_Return.Line104.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
      myLine104 = 0;

   }

   myLine105 = myLine103 + myLine104;
   myDOMs.HST_Return.Line105.value = `$${formatNumber((myLine105).toFixed(2))}`;


   if (ID_Line106 !== '') {

      if (myReturnType === 'HST') {
         if (Return_Line106 !== null && Return_Line106 !== undefined && Return_Line106 !== '' && Return_Line106 !== 0) {
            myDOMs.HST_Return.Line106.value = `$${formatNumber((Return_Line106).toFixed(2))}`;
            myLine106 = Return_Line106;
         } else {
            myDOMs.HST_Return.Line106.value = `$${formatNumber((BushstITCs + Vehicle1hstITCs + Vehicle2hstITCs + HomehstITCs + OtherhstITCs + RentalhstITCs + FixedAssethstITCs).toFixed(2))}`;
            myLine106 = (BushstITCs + Vehicle1hstITCs + Vehicle2hstITCs + HomehstITCs + OtherhstITCs + RentalhstITCs + FixedAssethstITCs);
         }
      } else {
         if (Return_PST_Line106 !== null && Return_PST_Line106 !== undefined && Return_PST_Line106 !== '' && Return_PST_Line106 !== 0) {
            myDOMs.HST_Return.Line106.value = `$${formatNumber((Return_PST_Line106).toFixed(2))}`;
            myLine106 = Return_PST_Line106;
         } else {
            myLine106 = (BuspstITCs + Vehicle1pstITCs + Vehicle2pstITCs + HomepstITCs + OtherpstITCs + RentalpstITCs + FixedAssetpstITCs);
            myDOMs.HST_Return.Line106.value = `$${formatNumber((myLine106).toFixed(2))}`;
         }
      }

   } else {
      if (myReturnType === 'HST') {
         myDOMs.HST_Return.Line106.value = `$${formatNumber((BushstITCs + Vehicle1hstITCs + Vehicle2hstITCs + HomehstITCs + OtherhstITCs + RentalhstITCs + FixedAssethstITCs).toFixed(2))}`;
         myLine106 = (BushstITCs + Vehicle1hstITCs + Vehicle2hstITCs + HomehstITCs + OtherhstITCs + RentalhstITCs + FixedAssethstITCs);
      } else {
         myLine106 = (BuspstITCs + Vehicle1pstITCs + Vehicle2pstITCs + HomepstITCs + OtherpstITCs + RentalpstITCs + FixedAssetpstITCs);
         myDOMs.HST_Return.Line106.value = `$${formatNumber((myLine106).toFixed(2))}`;
      }

   }


   if (ID_Line107 !== '') {
      if (myReturnType === 'HST') {
         if (Return_Line107 !== null && Return_Line107 !== undefined && Return_Line107 !== '' && Return_Line107 !== 0) {
            myDOMs.HST_Return.Line107.value = `$${formatNumber((Return_Line107).toFixed(2))}`;
            myLine107 = Return_Line107;
         } else {
            myDOMs.HST_Return.Line107.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine107 = 0;
         }
      } else {
         if (Return_PST_Line107 !== null && Return_PST_Line107 !== undefined && Return_PST_Line107 !== '' && Return_PST_Line107 !== 0) {
            myDOMs.HST_Return.Line107.value = `$${formatNumber((Return_PST_Line107).toFixed(2))}`;
            myLine107 = Return_PST_Line107;
         } else {
            myDOMs.HST_Return.Line107.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine107 = 0;
         }
      }

   } else {
      myDOMs.HST_Return.Line107.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
      myLine107 = 0;
   }

   myDOMs.HST_Return.Line108.value = `$${formatNumber((myLine106 + myLine107).toFixed(2))}`;
   myLine108 = myLine106 + myLine107;
   myDOMs.HST_Return.Line109.value = `$${formatNumber((myLine105 - myLine108).toFixed(2))}`;
   myLine109 = myLine105 - myLine108;

   if (ID_Line110 !== '') {
      if (myReturnType === 'HST') {
         if (Return_Line110 !== null && Return_Line110 !== undefined && Return_Line110 !== '' && Return_Line110 !== 0) {
            myDOMs.HST_Return.Line110.value = `$${formatNumber((Return_Line110).toFixed(2))}`;
            myLine110 = Return_Line110;
         } else {
            myDOMs.HST_Return.Line110.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine110 = 0;
         }
      } else {
         if (Return_PST_Line110 !== null && Return_PST_Line110 !== undefined && Return_PST_Line110 !== '' && Return_PST_Line110 !== 0) {
            myDOMs.HST_Return.Line110.value = `$${formatNumber((Return_PST_Line110).toFixed(2))}`;
            myLine110 = Return_PST_Line110;
         } else {
            myDOMs.HST_Return.Line110.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine110 = 0;
         }
      }

   } else {
      myDOMs.HST_Return.Line110.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
      myLine110 = 0;
   }

   if (ID_Line111 !== '') {
      if (myReturnType === 'HST') {
         if (Return_Line111 !== null && Return_Line111 !== undefined && Return_Line111 !== '' && Return_Line111 !== 0) {
            myDOMs.HST_Return.Line111.value = `$${formatNumber((Return_Line111).toFixed(2))}`;
            myLine111 = Return_Line111;
         } else {
            myDOMs.HST_Return.Line111.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine111 = 0;
         }
      } else {
         if (Return_PST_Line111 !== null && Return_PST_Line111 !== undefined && Return_PST_Line111 !== '' && Return_PST_Line111 !== 0) {
            myDOMs.HST_Return.Line111.value = `$${formatNumber((Return_PST_Line111).toFixed(2))}`;
            myLine111 = Return_PST_Line111;
         } else {
            myDOMs.HST_Return.Line111.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine111 = 0;
         }
      }

   } else {
      myDOMs.HST_Return.Line111.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
      myLine111 = 0;
   }


   myLine112 = myLine110 + myLine111;
   myDOMs.HST_Return.Line112.value = `$${(myLine112).toFixed(2)}`;

   myLine113A = myLine109 - myLine112;
   myDOMs.HST_Return.Line113A.value = `$${(myLine113A).toFixed(2)}`;



   if (ID_Line205 !== '') {
      if (myReturnType === 'HST') {
         if (Return_Line205 !== null && Return_Line205 !== undefined && Return_Line205 !== '' && Return_Line205 !== 0) {
            myDOMs.HST_Return.Line205.value = `$${formatNumber((Return_Line205).toFixed(2))}`;
            myLine205 = Return_Line205;
         } else {
            myDOMs.HST_Return.Line205.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine205 = 0;
         }
      } else {
         if (Return_PST_Line205 !== null && Return_PST_Line205 !== undefined && Return_PST_Line205 !== '' && Return_PST_Line205 !== 0) {
            myDOMs.HST_Return.Line205.value = `$${formatNumber((Return_PST_Line205).toFixed(2))}`;
            myLine205 = Return_PST_Line205;
         } else {
            myDOMs.HST_Return.Line205.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine205 = 0;
         }
      }

   } else {
      myDOMs.HST_Return.Line205.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
      myLine205 = 0;
   }

   if (ID_Line405 !== '') {
      if (myReturnType === 'HST') {
         if (Return_Line405 !== null && Return_Line405 !== undefined && Return_Line405 !== '' && Return_Line405 !== 0) {
            myDOMs.HST_Return.Line405.value = `$${formatNumber((Return_Line405).toFixed(2))}`;
            myLine405 = Return_Line405;
         } else {
            myDOMs.HST_Return.Line405.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine405 = 0;
         }
      } else {
         if (Return_PST_Line405 !== null && Return_PST_Line405 !== undefined && Return_PST_Line405 !== '' && Return_PST_Line405 !== 0) {
            myDOMs.HST_Return.Line405.value = `$${formatNumber((Return_PST_Line405).toFixed(2))}`;
            myLine405 = Return_PST_Line405;
         } else {
            myDOMs.HST_Return.Line405.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
            myLine405 = 0;
         }
      }

   } else {
      myDOMs.HST_Return.Line405.value = `$${formatNumber((myZeroVal).toFixed(2))}`;
      myLine405 = 0;
   }

   myLine113B = myLine205 + myLine405;
   myDOMs.HST_Return.Line113B.value = `$${(myLine113B).toFixed(2)}`;

   myLine113C = myLine113A + myLine113B;
   myDOMs.HST_Return.Line113C.value = `$${(myLine113C).toFixed(2)}`;

   if (myLine113C < 0) {
      myDOMs.HST_Return.Line114.value = `$${(Math.abs(myLine113C)).toFixed(2)}`;
      myDOMs.HST_Return.Line115.value = '';
   } else if (myLine113C > 0) {
      myDOMs.HST_Return.Line114.value = '';
      myDOMs.HST_Return.Line115.value = `$${(Math.abs(myLine113C)).toFixed(2)}`;
   } else if (myLine113C === 0) {
      myDOMs.HST_Return.Line114.value = `$${myZeroVal}`;
      myDOMs.HST_Return.Line115.value = `$${myZeroVal}`;
   }

};

function updateAfterTypeSelectionChange() {

   if (myDOMs.HST_Return.Type_Selector.value === 'HST') {
      myReturnType = 'HST';
   } else if (myDOMs.HST_Return.Type_Selector.value === 'PST') {
      myReturnType = 'PST';
   }
   DoTheMathonLoopedData();
};



function generateReturnPDF() {

   var pdf = new jsPDF('p', 'pt', 'a4');

   pdf.addHTML(document.getElementById('HSTReturnModal'), function (canvas) {
      // var string = pdf.output('datauristring');
      // $('.preview-pane').attr('src', string);
      let myImage = canvas.toDataURL("img/png");
      pdf.addImage(myImage, 'png', 0, 0, canvas.width, canvas.height);

   });
   pdf.save(`GST_HST Return.pdf`);

   // html2canvas(document.getElementById('HSTReturnModal'), {
   //    function(canvas) {
   //       alert('Made it to here');
   //       let myImage = canvas.toDataURL("img/png");
   //       let doc = new jsPDF('p', 'px', 'letter');
   //       doc.addImage(myImage, 'png', 0, 0, canvas.width, canvas.height);

   //       doc.save(`GST_HST Return.pdf`);
   //    }
   // });
};

// function PrintReturnContent() {
//    let PageRestore = document.body.innerHTML;
//    let PrintContent = document.getElementById('HSTReturnModal');
//    document.body.innerHTML = PrintContent;
//    window.print();
//    document.body.innerHTML = PageRestore;
// };


function printElement() {
   elem = document.getElementById('HSTReturnModal');
   var domClone = elem.cloneNode(true);

   var $printSection = document.getElementById("printSection");

   if (!$printSection) {
      var $printSection = document.createElement("div");
      $printSection.id = "printSection";
      document.body.appendChild($printSection);
   }

   $printSection.innerHTML = "";
   $printSection.appendChild(domClone);
   window.print();
}



myDOMs.HST_Return.Line103.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line103.value !== null && !isNaN(myDOMs.HST_Return.Line103.value) && myDOMs.HST_Return.Line103.value !== undefined) {

      if (ID_Line103 !== '' && ID_Line103 !== null & ID_Line103 !== undefined) {
         await updateReturnData(103);
      } else {
         await postReturnData(103);
      }

      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line103.value = '';
      myDOMs.HST_Return.Line103.focus();
   }
});

myDOMs.HST_Return.Line103Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line103 !== '' && ID_Line103 !== null & ID_Line103 !== undefined) {
         myDOMs.HST_Return.Line103.value = 0;
         await updateReturnData(103);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

myDOMs.HST_Return.Line104.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line104.value !== null && !isNaN(myDOMs.HST_Return.Line104.value) && myDOMs.HST_Return.Line104.value !== undefined) {
      if (ID_Line104 !== '' && ID_Line104 !== null & ID_Line104 !== undefined) {
         await updateReturnData(104);
      } else {
         await postReturnData(104);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line104.value = '';
      myDOMs.HST_Return.Line104.focus();
   }
});

myDOMs.HST_Return.Line104Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line104 !== '' && ID_Line104 !== null & ID_Line104 !== undefined) {
         myDOMs.HST_Return.Line104.value = 0;
         await updateReturnData(104);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }

});

myDOMs.HST_Return.Line106.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line106.value !== null && !isNaN(myDOMs.HST_Return.Line106.value) && myDOMs.HST_Return.Line106.value !== undefined) {
      if (ID_Line106 !== '' && ID_Line106 !== null & ID_Line106 !== undefined) {
         await updateReturnData(106);
      } else {
         await postReturnData(106);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line106.value = '';
      myDOMs.HST_Return.Line106.focus();
   }
});

myDOMs.HST_Return.Line106Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line106 !== '' && ID_Line106 !== null & ID_Line106 !== undefined) {
         myDOMs.HST_Return.Line106.value = 0;
         await updateReturnData(106);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

myDOMs.HST_Return.Line107.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line107.value !== null && !isNaN(myDOMs.HST_Return.Line107.value) && myDOMs.HST_Return.Line107.value !== undefined) {
      if (ID_Line107 !== '' && ID_Line107 !== null & ID_Line107 !== undefined) {
         await updateReturnData(107);
      } else {
         await postReturnData(107);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line107.value = '';
      myDOMs.HST_Return.Line107.focus();
   }
});

myDOMs.HST_Return.Line107Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line107 !== '' && ID_Line107 !== null & ID_Line107 !== undefined) {
         myDOMs.HST_Return.Line107.value = 0;
         await updateReturnData(107);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

myDOMs.HST_Return.Line110.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line110.value !== null && !isNaN(myDOMs.HST_Return.Line110.value) && myDOMs.HST_Return.Line110.value !== undefined) {
      if (ID_Line110 !== '' && ID_Line110 !== null & ID_Line110 !== undefined) {
         await updateReturnData(110);
      } else {
         await postReturnData(110);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line110.value = '';
      myDOMs.HST_Return.Line110.focus();
   }
});

myDOMs.HST_Return.Line110Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line110 !== '' && ID_Line110 !== null & ID_Line110 !== undefined) {
         myDOMs.HST_Return.Line110.value = 0;
         await updateReturnData(110);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

myDOMs.HST_Return.Line111.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line111.value !== null && !isNaN(myDOMs.HST_Return.Line111.value) && myDOMs.HST_Return.Line111.value !== undefined) {
      if (ID_Line111 !== '' && ID_Line111 !== null & ID_Line111 !== undefined) {
         await updateReturnData(111);
      } else {
         await postReturnData(111);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line111.value = '';
      myDOMs.HST_Return.Line111.focus();
   }
});

myDOMs.HST_Return.Line111Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line111 !== '' && ID_Line111 !== null & ID_Line111 !== undefined) {
         myDOMs.HST_Return.Line111.value = 0;
         await updateReturnData(111);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

myDOMs.HST_Return.Line205.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line205.value !== null && !isNaN(myDOMs.HST_Return.Line205.value) && myDOMs.HST_Return.Line205.value !== undefined) {
      if (ID_Line205 !== '' && ID_Line205 !== null & ID_Line205 !== undefined) {
         await updateReturnData(205);
      } else {
         await postReturnData(205);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line205.value = '';
      myDOMs.HST_Return.Line205.focus();
   }
});

myDOMs.HST_Return.Line205Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line205 !== '' && ID_Line205 !== null & ID_Line205 !== undefined) {
         myDOMs.HST_Return.Line205.value = 0;
         await updateReturnData(205);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

myDOMs.HST_Return.Line405.addEventListener('change', async function (event) {
   if (myDOMs.HST_Return.Line405.value !== null && !isNaN(myDOMs.HST_Return.Line405.value) && myDOMs.HST_Return.Line405.value !== undefined) {
      if (ID_Line405 !== '' && ID_Line405 !== null & ID_Line405 !== undefined) {
         await updateReturnData(405);
      } else {
         await postReturnData(405);
      }
      ZeroTheReturnData(true);
      DoTheMathonLoopedData();
   } else {
      alert('Make sure you enter Numbers only!');
      myDOMs.HST_Return.Line405.value = '';
      myDOMs.HST_Return.Line405.focus();
   }
});

myDOMs.HST_Return.Line405Lbl.addEventListener('click', async function (event) {
   if (confirm("Are you sure you want to Reset this Amount back to the Calculated Value?")) {
      if (ID_Line405 !== '' && ID_Line405 !== null & ID_Line405 !== undefined) {
         myDOMs.HST_Return.Line405.value = 0;
         await updateReturnData(405);
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      } else {
         ZeroTheReturnData(true);
         DoTheMathonLoopedData();
      }
   }
});

//The next 2 function will gather all the required data to enable auto GST/HST Payment and PST Payment

async function findHSTDataForPayment() {
   Return_Time_Period = getTimePeriod();
   await getReturnData();
   await StartReturnFunctions();

   let myHSTBalance = Number(CollectedHST - (BushstITCs + Vehicle1hstITCs + Vehicle2hstITCs + HomehstITCs + OtherhstITCs + RentalhstITCs + FixedAssethstITCs));

   if (HSTPaymentModalOpen) {
      let myTextTimePeriod = '';
      switch (Return_Time_Period) {
         case 'YearAmt':
            myTextTimePeriod = 'Full Year';
            break;
         case 'Q1Amt':
            myTextTimePeriod = '1st ¼';
            break;
         case 'Q2Amt':
            myTextTimePeriod = '2nd ¼';
            break;
         case 'Q3Amt':
            myTextTimePeriod = '3rd ¼';
            break;
         case 'Q4Amt':
            myTextTimePeriod = '4th ¼';
            break;
         case 'JanAmt':
            myTextTimePeriod = 'January';
            break;
         case 'FebAmt':
            myTextTimePeriod = 'February';
            break;
         case 'MarAmt':
            myTextTimePeriod = 'March';
            break;
         case 'AprAmt':
            myTextTimePeriod = 'April';
            break;
         case 'MayAmt':
            myTextTimePeriod = 'May';
            break;
         case 'JunAmt':
            myTextTimePeriod = 'June';
            break;
         case 'JulAmt':
            myTextTimePeriod = 'July';
            break;
         case 'AugAmt':
            myTextTimePeriod = 'August';
            break;
         case 'SepAmt':
            myTextTimePeriod = 'September';
            break;
         case 'OctAmt':
            myTextTimePeriod = 'October';
            break;
         case 'NovAmt':
            myTextTimePeriod = 'November';
            break;
         case 'DecAmt':
            myTextTimePeriod = 'December';
            break;

      }
      if (myHSTBalance < 0) {
         alert(`You have a refund claim of $${(Math.abs(myHSTBalance)).toFixed(2)} for ${myTextTimePeriod} Time Period`);
      } else {
         myDOMs.HSTPayment.PaymentAmtInput.value = myHSTBalance.toFixed(2);
         alert(`The amount of $${(Math.abs(myHSTBalance)).toFixed(2)} which corresponds to ${myTextTimePeriod} Time Period, will be entered`);
      }
   }

};

async function findPSTDataForPayment() {
   if (PST_Claim_Value === 'EXP') {
      alert('Because the Setting (PST Claim) is set to AS EXPENSE,\nAll PST on expenses are claimed by adding to expenses net amount\nPST Payments should not be required unless your home province\nis Saskatchewan or Quebec.\nIf so, change the PST Claim setting to AS ITC.');
      return;
   }
   Return_Time_Period = getTimePeriod();
   await getReturnData();
   await StartReturnFunctions();

   let myPSTBalance = Number(CollectedPST - (BuspstITCs + Vehicle1pstITCs + Vehicle2pstITCs + HomepstITCs + OtherpstITCs + RentalpstITCs + FixedAssetpstITCs));

   if (PSTPaymentModalOpen) {
      let myTextTimePeriod = '';
      switch (Return_Time_Period) {
         case 'YearAmt':
            myTextTimePeriod = 'Full Year';
            break;
         case 'Q1Amt':
            myTextTimePeriod = '1st ¼';
            break;
         case 'Q2Amt':
            myTextTimePeriod = '2nd ¼';
            break;
         case 'Q3Amt':
            myTextTimePeriod = '3rd ¼';
            break;
         case 'Q4Amt':
            myTextTimePeriod = '4th ¼';
            break;
         case 'JanAmt':
            myTextTimePeriod = 'January';
            break;
         case 'FebAmt':
            myTextTimePeriod = 'February';
            break;
         case 'MarAmt':
            myTextTimePeriod = 'March';
            break;
         case 'AprAmt':
            myTextTimePeriod = 'April';
            break;
         case 'MayAmt':
            myTextTimePeriod = 'May';
            break;
         case 'JunAmt':
            myTextTimePeriod = 'June';
            break;
         case 'JulAmt':
            myTextTimePeriod = 'July';
            break;
         case 'AugAmt':
            myTextTimePeriod = 'August';
            break;
         case 'SepAmt':
            myTextTimePeriod = 'September';
            break;
         case 'OctAmt':
            myTextTimePeriod = 'October';
            break;
         case 'NovAmt':
            myTextTimePeriod = 'November';
            break;
         case 'DecAmt':
            myTextTimePeriod = 'December';
            break;

      }
      if (myPSTBalance < 0) {
         alert(`You have a PST refund claim of $${(Math.abs(myPSTBalance)).toFixed(2)} for ${myTextTimePeriod} Time Period`);
      } else {
         myDOMs.PSTPayment.PaymentAmtInput.value = myPSTBalance.toFixed(2);
         alert(`The amount of $${(Math.abs(myPSTBalance)).toFixed(2)} which corresponds to ${myTextTimePeriod} Time Period, will be entered`);
      }
   }

};