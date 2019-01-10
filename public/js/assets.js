function displayAssetModal() {
   $("#AssetModal").modal("show");
   let myMainNav = document.getElementById("main-nav");
   let myTopVal = myMainNav.offsetTop;
   if (myTopVal === 0 && AssetTableOpen === false) {
      ToggleMenuBar();
   }
}
function hideAssetModal() {
   $("#AssetModal").modal("hide");
   myDOMs.FixedAssets.Form.reset();
   let myMainNav = document.getElementById("main-nav");
   let myTopVal = myMainNav.offsetTop;
   if (myTopVal === -108 && AssetTableOpen === false) {
      ToggleMenuBar();
   }
}

myDOMs.FixedAssets.Vehicle1_Selector.addEventListener('click', function (event) {
   if (myDOMs.FixedAssets.Vehicle1_Selector.checked === true) {
      myDOMs.FixedAssets.Vehicle2_Selector.checked = false;
   } else {
      myDOMs.FixedAssets.Vehicle1_Selector.checked = true;
   }
});

myDOMs.FixedAssets.Vehicle2_Selector.addEventListener('click', function (event) {
   if (myDOMs.FixedAssets.Vehicle2_Selector.checked === true) {
      myDOMs.FixedAssets.Vehicle1_Selector.checked = false;
   } else {
      myDOMs.FixedAssets.Vehicle2_Selector.checked = true;
   }
});

myDOMs.FixedAssets.Vehicle_Percent_Btn.addEventListener('click', function (event) {
   if (myDOMs.FixedAssets.Vehicle1_Selector.checked === false && myDOMs.FixedAssets.Vehicle2_Selector.checked === false) {
      alert('Please Select Vehicle 1 or Vehicle 2');
      return;
   }
   if (myDOMs.FixedAssets.Vehicle1_Selector.checked === true) {
      myDOMs.FixedAssets.Business_Percent.value = V1BusPercent;
   } else if (myDOMs.FixedAssets.Vehicle2_Selector.checked === true) {
      myDOMs.FixedAssets.Business_Percent.value = V2BusPercent;
   }
   updateAssetStatus();
});

myDOMs.FixedAssets.Start_Value.addEventListener('change', function (event) {
   myDOMs.FixedAssets.Start_Value.value = formatNumber(Number(myDOMs.FixedAssets.Start_Value.value).toFixed(2));
});

myDOMs.FixedAssets.Depreciation_Claim.addEventListener('change', function (event) {
   myDOMs.FixedAssets.Depreciation_Claim.value = formatNumber(Number(myDOMs.FixedAssets.Depreciation_Claim.value).toFixed(2));
   updateAssetStatus();
});

myDOMs.FixedAssets.ITC_Claim.addEventListener('change', function (event) {
   myDOMs.FixedAssets.ITC_Claim.value = formatNumber(Number(myDOMs.FixedAssets.ITC_Claim.value).toFixed(2));
   updateAssetStatus();
});

myDOMs.FixedAssets.Business_Percent.addEventListener('change', function (event) {

   if (myDOMs.FixedAssets.Business_Percent.value === '' || myDOMs.FixedAssets.Business_Percent.value === null || myDOMs.FixedAssets.Business_Percent.value === undefined) {
      return;
   }
   if (myDOMs.FixedAssets.Business_Percent.value > 100) {
      alert('Please enter a number not exceeding 100');
      myDOMs.FixedAssets.Business_Percent.value = '';
      myDOMs.FixedAssets.Business_Percent.focus();
      return;
   }
   if (myDOMs.FixedAssets.Business_Percent.value >= 1) {
      myDOMs.FixedAssets.Business_Percent.value = Number(myDOMs.FixedAssets.Business_Percent.value).toFixed(2);
   } else {
      myDOMs.FixedAssets.Business_Percent.value = Number(myDOMs.FixedAssets.Business_Percent.value * 100).toFixed(2);
   }
   updateAssetStatus();
});

myDOMs.FixedAssets.Auto_Claim_Rate.addEventListener('change', function (event) {
   if (myDOMs.FixedAssets.Auto_Claim_Rate.value === '' || myDOMs.FixedAssets.Auto_Claim_Rate.value === null || myDOMs.FixedAssets.Auto_Claim_Rate.value === undefined) {
      return;
   }
   if (myDOMs.FixedAssets.Auto_Claim_Rate.value > 100) {
      alert('Please enter a number not exceeding 100');
      myDOMs.FixedAssets.Auto_Claim_Rate.value = '';
      myDOMs.FixedAssets.Auto_Claim_Rate.focus();
      return;
   }
   if (myDOMs.FixedAssets.Auto_Claim_Rate.value >= 1) {
      myDOMs.FixedAssets.Auto_Claim_Rate.value = Number(myDOMs.FixedAssets.Auto_Claim_Rate.value).toFixed(2);
   } else {
      myDOMs.FixedAssets.Auto_Claim_Rate.value = Number(myDOMs.FixedAssets.Auto_Claim_Rate.value * 100).toFixed(2);
   }
});

myDOMs.FixedAssets.Reset_Btn.addEventListener('click', function (event) {
   if (myDOMs.FixedAssets.Status.value === 'ALTERED') {
      if (confirm("Are you sure you want to Reset your Entry Form and fill the form with all the saved data?")) {
         addAssetOriginalValues();
      } else {
         e.preventDefault();
      }
   } else {
      if (confirm("Are you sure you want to Reset your Entry Form and EMPTY ALL inputs?")) {
         myDOMs.FixedAssets.Form.reset();
         updateFormButtons('Asset');
      } else {
         e.preventDefault();
      }
   }

});

myDOMs.FixedAssets.Claim_Date.addEventListener('change', function (event) {
   if (new Date(dbMiscData.lockDate) >= new Date(myDOMs.FixedAssets.Claim_Date.value)) {
      alert(`Because your ITC Claim Date is before or the same as the Lock Date \n The Entry Form will not allow you to Submit this Fixed Asset! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
      myDOMs.FixedAssets.Claim_Date.value = null;
      myDOMs.FixedAssets.Claim_Date.focus;
   }
});


function generateClaims() {
   let NetAlgoAll = (100 / (1 + Number(provinceTaxSettings.Current.HST) + Number(provinceTaxSettings.Current.PST))) / 100;
   let myCCAClaim = 0;
   let myITCClaim = 0;
   let DepreciationRate = 0;
   let ZeroVariable = 0;
   let myHSTPortion = 0;
   let myPSTPortion = 0;
   let myNetPortion = 0;

   let tempAmt = myDOMs.FixedAssets.Start_Value.value.split(',');
   let newAmt = '';

   tempAmt.forEach((el, index) => {
      newAmt += `${el}`
   });


   if (myDOMs.FixedAssets.Auto_Claim_Rate.value === '' || myDOMs.FixedAssets.Auto_Claim_Rate.value === null || myDOMs.FixedAssets.Auto_Claim_Rate.value === undefined) {
      alert('A Depreciation Rate is required to calculate \nthe Depreciation Claim and ITC Claim amounts!');
      return;
   }

   DepreciationRate = Number(myDOMs.FixedAssets.Auto_Claim_Rate.value);
   if (DepreciationRate > 1) {
      DepreciationRate = DepreciationRate / 100;
   }

   if (Number(provinceTaxSettings.Current.PST) === 0) {
      if (myDOMs.FixedAssets.Include_ITC_Selector.checked === true) {
         myNetPortion = Number(newAmt) * NetAlgoAll;
         myHSTPortion = myNetPortion * provinceTaxSettings.Current.HST
         myCCAClaim = myNetPortion * DepreciationRate;
         myITCClaim = myHSTPortion * DepreciationRate;
         myDOMs.FixedAssets.Depreciation_Claim.value = formatNumber(myCCAClaim.toFixed(2));
         myDOMs.FixedAssets.ITC_Claim.value = formatNumber(myITCClaim.toFixed(2));
      } else {
         myCCAClaim = Number(newAmt) * DepreciationRate;
         myDOMs.FixedAssets.Depreciation_Claim.value = formatNumber(myCCAClaim.toFixed(2));
         myDOMs.FixedAssets.ITC_Claim.value = ZeroVariable.toFixed(2);
      }
   } else {

      if (myDOMs.FixedAssets.Include_ITC_Selector.checked === true) {
         myNetPortion = Number(newAmt) * NetAlgoAll;
         myHSTPortion = myNetPortion * provinceTaxSettings.Current.HST
         myPSTPortion = myNetPortion * provinceTaxSettings.Current.PST

         myCCAClaim = (myNetPortion + myPSTPortion) * DepreciationRate;
         myITCClaim = myHSTPortion * DepreciationRate;
         myDOMs.FixedAssets.Depreciation_Claim.value = formatNumber(myCCAClaim.toFixed(2));
         myDOMs.FixedAssets.ITC_Claim.value = formatNumber(myITCClaim.toFixed(2));
      } else {
         myCCAClaim = Number(newAmt) * DepreciationRate;
         myDOMs.FixedAssets.Depreciation_Claim.value = formatNumber(myCCAClaim.toFixed(2));
         myDOMs.FixedAssets.ITC_Claim.value = ZeroVariable.toFixed(2);
      }
   }
   updateAssetStatus();
};

function addFixedAsset() {
   if (!validateAssetEntryForm()) {
      return;
   }
   let startDate = new Date(myDOMs.FixedAssets.Purchase_Date.value);
   startDate.setHours(startDate.getHours() + (startDate.getTimezoneOffset() / 60));
   let claimDate = new Date(myDOMs.FixedAssets.Claim_Date.value);
   claimDate.setHours(claimDate.getHours() + (claimDate.getTimezoneOffset() / 60));

   let tempAmt = myDOMs.FixedAssets.Start_Value.value.split(',');
   let myStartAmt = '';

   tempAmt.forEach((el, index) => {
      myStartAmt += `${el}`
   });

   tempAmt = myDOMs.FixedAssets.Depreciation_Claim.value.split(',');
   let myDepreciationtAmt = '';
   tempAmt.forEach((el, index) => {
      myDepreciationtAmt += `${el}`
   });

   tempAmt = myDOMs.FixedAssets.ITC_Claim.value.split(',');
   let myITCClaimAmt = '';
   tempAmt.forEach((el, index) => {
      myITCClaimAmt += `${el}`
   });

   mydata = {
      purchaseDate: startDate,
      claimDate: claimDate,
      description: myDOMs.FixedAssets.Description.value,
      startValue: myStartAmt,
      busPercent: myDOMs.FixedAssets.Business_Percent.value,
      claimAmt: myDepreciationtAmt,
      itcClaimAmt: myITCClaimAmt,
      auth: myToken
   };

   $.ajax({
      method: "POST",
      url: `${serverURL}fixedAssets`,
      data: mydata,
      enctype: "multipart/form-data"
   })
      .done(async function (data) {
         // if (AssetTableOpen) {
         //    alert('When Fixed Asset Table Report is open, any New Assets added will not be updated in the Table Report! \n\n To view the Report with the new Asset, close and Re-open the Report!');
         // }

         displayAlert(
            myDOMs.FixedAssets.AlertContainer,
            "FixedAssetAlert",
            "FixedAssetCloseBtnAlert",
            `${data} `,
            "",
            ` `,
            "GREEN",
            6000
         );
         myDOMs.FixedAssets.Form.reset();
         myDOMs.FixedAssets.Purchase_Date.focus();

         await getAllMainData('Assets');
         fillMainDataFromArrays();
      })
      .fail(function (err) {
         displayAlert(
            myDOMs.FixedAssets.AlertContainer,
            "FixedAssetAlert",
            "FixedAssetCloseBtnAlert",
            `${err} `,
            "",
            " ",
            "RED",
            6000
         );
      });
};

function updateFixedAsset() {
   if (savedTransactionLocked) {
      alert(`Because the Claim Date is before or the same as the Lock Date \n The Entry Form will not allow you to Save any changes to this Asset! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
      addAssetOriginalValues();
      return;
   }
   if (myDOMs.FixedAssets.Status.value === 'SAVED') {
      displayAlert(
         myDOMs.FixedAssets.AlertContainer,
         "FixedAssetAlert",
         "FixedAssetCloseBtnAlert",
         `Save Changes is only available when Asset Status is ALTERED!`,
         "",
         " ",
         "RED",
         6000
      );
      return;
   } else if (myDOMs.FixedAssets.Status.value === 'NEW') {
      displayAlert(
         myDOMs.FixedAssets.AlertContainer,
         "FixedAssetAlert",
         "FixedAssetCloseBtnAlert",
         `Save Changes is not available for New Assets. To Save a New Asset, use the Submit button.`,
         "",
         " ",
         "RED",
         6000
      );
      return;
   }

   let assetID = myDOMs.FixedAssets.Blind_ID.value;
   formData = new FormData();
   let myClaimDate;
   myClaimDate = new Date(myDOMs.FixedAssets.Claim_Date.value);
   myClaimDate.setHours(myClaimDate.getHours() + (myClaimDate.getTimezoneOffset() / 60));
   formData.append("claimDate", myClaimDate);
   let myPurchaseDate;
   myPurchaseDate = new Date(myDOMs.FixedAssets.Purchase_Date.value);
   myPurchaseDate.setHours(myPurchaseDate.getHours() + (myPurchaseDate.getTimezoneOffset() / 60));
   formData.append("purchaseDate", myPurchaseDate);

   let myCorrectedStartValue = formatedNumberToSimpleNumber(myDOMs.FixedAssets.Start_Value.value);
   let myCorrectedClaimValue = formatedNumberToSimpleNumber(myDOMs.FixedAssets.Depreciation_Claim.value);
   let myCorrectedITCClaimValue = formatedNumberToSimpleNumber(myDOMs.FixedAssets.ITC_Claim.value);

   formData.append("description", myDOMs.FixedAssets.Description.value);
   formData.append("startValue", myCorrectedStartValue);
   formData.append("busPercent", myDOMs.FixedAssets.Business_Percent.value);
   formData.append("claimAmt", myCorrectedClaimValue);
   formData.append("itcClaimAmt", myCorrectedITCClaimValue);
   formData.append("auth", myToken);

   $.ajax({
      method: "PATCH",
      url: `${serverURL}fixedAssets/${assetID}`,
      data: formData,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false
   })
      .done(async function (data) {
         let myObjMsg = [""];

         displayAlert(
            myDOMs.FixedAssets.AlertContainer,
            "FixedAssetAlert",
            "FixedAssetCloseBtnAlert",
            `${data.message} `,
            myObjMsg,
            ` `,
            "GREEN",
            6000
         );
         //Code to update report array
         let purchaseDate = myPurchaseDate;
         let claimDate = myClaimDate;
         let Description = myDOMs.FixedAssets.Description.value;
         let StartValue = parseFloat(myCorrectedStartValue);
         let BusPercent = parseFloat(myDOMs.FixedAssets.Business_Percent.value);
         let claimAmt = parseFloat(myCorrectedClaimValue);
         let itcClaimAmt = parseFloat(myCorrectedITCClaimValue);

         let AssetData = {
            purchaseDate,
            claimDate,
            Description,
            StartValue,
            BusPercent,
            claimAmt,
            itcClaimAmt,
         };
         updateAssetTable(selectedRowNum, AssetData);

         let myDay = myPurchaseDate.getDate();
         let myMonth = myPurchaseDate.getMonth() + 1;
         let myYear = myPurchaseDate.getFullYear();
         if (myDay < 10) {
            myDay = `0${myDay}`;
         }
         if (myMonth < 10) {
            myMonth = `0${myMonth}`;
         }
         originalAsset.PurchaseDate = myYear + "-" + myMonth + "-" + myDay;

         myDay = myClaimDate.getDate();
         myMonth = myClaimDate.getMonth() + 1;
         myYear = myClaimDate.getFullYear();
         if (myDay < 10) {
            myDay = `0${myDay}`;
         }
         if (myMonth < 10) {
            myMonth = `0${myMonth}`;
         }
         originalAsset.ClaimDate = myYear + "-" + myMonth + "-" + myDay;

         originalAsset.ID = assetID;
         originalAsset.Description = myDOMs.FixedAssets.Description.value;
         originalAsset.StartValue = myDOMs.FixedAssets.Start_Value.value;
         originalAsset.BusPercent = myDOMs.FixedAssets.Business_Percent.value;
         originalAsset.ClaimAmt = myDOMs.FixedAssets.Depreciation_Claim.value;
         originalAsset.ITCClaimAmt = myDOMs.FixedAssets.ITC_Claim.value;
         originalAsset.Status = 'SAVED';
         myDOMs.FixedAssets.Status.value = 'SAVED';

         setAssetStatusColor();

         await getAllMainData('Assets');
         fillMainDataFromArrays();
         totalUpAllAsset();
         updateAssetTableTotals();

      })
      .fail(function (err) {
         let myObjMsg = ["Payment Entry Failed to POST to the database"];

         displayAlert(
            myDOMs.HSTPayment.AlertContainer,
            "HSTPaymentExpAlert",
            "HSTPaymentCloseBtnAlert",
            `Payment Update Failed! `,
            myObjMsg,
            " ",
            "RED",
            6000
         );
      });
}


function deleteFixedAsset() {
   if (savedTransactionLocked) {
      alert(`Because the Claim Date is before or the same as the Lock Date \n The Entry Form will not allow you to Delete this Fixed Asset! \n This is likely because the Lock Date was Set to Prevent any changes during the time period in which the HST/GST return as been filed.`);
      return;
   }

   if (myDOMs.FixedAssets.Status.value === 'NEW') {
      displayAlert(
         myDOMs.FixedAssets.AlertContainer,
         "FixedAssetAlert",
         "FixedAssetCloseBtnAlert",
         `Delete is not available when Asset Status is NEW!`,
         "",
         " ",
         "RED",
         6000
      );
      return;
   }
   let AssetID = myDOMs.FixedAssets.Blind_ID.value;

   if (confirm("Are you sure you want to Delete this Fixed Asset?")) {
      let tempData;
      tempData = {
         auth: myToken,
      };
      $.ajax({
         url: `${serverURL}fixedAssets/${AssetID}`,
         method: "DELETE",
         enctype: "multipart/form-data",
         data: tempData
      })
         .done(async function (data) {
            displayAlert(
               myDOMs.FixedAssets.AlertContainer,
               "FixedAssetAlert",
               "FixedAssetCloseBtnAlert",
               "Fixed Asset Successfully Deleted! ",
               "",
               ` `,
               "GREEN",
               6000
            );
            //next lines resets the expense entry form/modal
            myDOMs.FixedAssets.Form.reset();
            myDOMs.FixedAssets.Purchase_Date.focus();
            //need to remove that expense from array table.
            let myIndex = assetArray
               .map(function (x) {
                  return x._id;
               })
               .indexOf(AssetID);

            if (myIndex > -1) {
               assetArray.splice(myIndex, 1);
            }

            resetOriginaAssetData();
            arrTablePage1 = assetArray;
            removeAssetTblNavAlertChildNodes();
            buildAssetReportTable(
               myDOMs.AssetTable.AlertContainer,
               "AssetTableAlert",
               "AssetReportModalCloseBtn",
               `You have ${
               assetArray.length
               } Fixed Assets displayed on 1 page.`,
               "TABLE CAR GREEN",
               0,
               "Asset"
            );
            updateFormButtons('Asset');
            await getAllMainData('Assets');
            fillMainDataFromArrays();

         })
         .fail(function (e) {
            let myMsg = [e.responseText];
            displayAlert(
               myDOMs.FixedAssets.AlertContainer,
               "FixedAssetAlert",
               "FixedAssetCloseBtnAlert",
               `${e.statusText} `,
               myMsg,
               " ",
               "RED",
               6000
            );
         });
   }
};

function getFixedAssets() {
   if (AssetTableOpen) {
      hideAssetTableModal();
   }

   let tempData;

   tempData = {
      auth: myToken,
      startYear: startDate.getFullYear(),
      startMonth: startDate.getMonth(),
      startDay: startDate.getDate(),
      endYear: endDate.getFullYear(),
      endMonth: endDate.getMonth(),
      endDay: endDate.getDate()
   };

   $.ajax({
      method: "GET",
      url: `${serverURL}fixedAssets`,
      data: tempData,
      enctype: "multipart/form-data"
   })
      .done(function (data) {
         let tempTitle = 'Fixed Assets';
         AssetDataArray = data.assets;
         assetArray = data.assets;
         buildAssetReportTable(
            myDOMs.AssetTable.AlertContainer,
            "AssetTableAlert",
            "AssetReportModalCloseBtn",
            `You have ${
            assetArray.length
            } ${tempTitle} displayed on 1 page.`,
            "TABLE CAR GREEN",
            0,
            "Asset"
         );
         ToggleMenuBar();
      })
      .fail(function (e) {
         if (e.readyState === 0 || myToken === '') {
            alert('You Must be logged in before using EZ-HST-CANADA>')
         } else {
            alert(JSON.stringify(e.statusText, undefined, 2));
         }
      });
};

function updateAssetTableTotals() {
   document.getElementById('cellAssetClaimAmtTotal').innerText = `$${(formatNumber(Number(myAssetReportTotal.claimAmt).toFixed(2)))}`;
   document.getElementById('cellAssetActualClaimAmtTotal').innerText = `$${(formatNumber(Number(myAssetReportTotal.ActualclaimAmt).toFixed(2)))}`;
   document.getElementById('cellAssetITCClaimAmtTotal').innerText = `$${(formatNumber(Number(myAssetReportTotal.ITCClaimAmt).toFixed(2)))}`;
   document.getElementById('cellAssetActualITCClaimAmtTotal').innerText = `$${(formatNumber(Number(myAssetReportTotal.ActualITCClaimAmt).toFixed(2)))}`;
};



let originalAsset = {
   PurchaseDate: null,
   ClaimDate: null,
   Description: '',
   StartValue: 0,
   ClaimAmt: 0,
   ITCClaimAmt: 0,
   BusPercent: 0,
   ID: '',
   Status: 'NEW'
}

function resetOriginaAssetData() {
   originalAsset.PurchaseDate = null;
   originalAsset.ClaimDate = null;
   originalAsset.Description = null;
   originalAsset.StartValue = 0;
   originalAsset.ClaimAmt = 0;
   originalAsset.ITCClaimAmt = 0;
   originalAsset.BusPercent = 0;
   originalAsset.ID = '';
   originalAsset.Status = 'NEW'
};

function addAssetOriginalValues() {
   myDOMs.FixedAssets.Purchase_Date.value = originalAsset.PurchaseDate;
   myDOMs.FixedAssets.Claim_Date.value = originalAsset.ClaimDate;
   myDOMs.FixedAssets.Description.value = originalAsset.Description;
   myDOMs.FixedAssets.Start_Value.value = originalAsset.StartValue;
   myDOMs.FixedAssets.Depreciation_Claim.value = originalAsset.ClaimAmt;
   myDOMs.FixedAssets.ITC_Claim.value = originalAsset.ITCClaimAmt;
   myDOMs.FixedAssets.Business_Percent.value = originalAsset.BusPercent;
   myDOMs.FixedAssets.Blind_ID.value = originalAsset.ID;
   myDOMs.FixedAssets.Status.value = 'SAVED';
   originalAsset.Status = 'SAVED';

   setAssetStatusColor();
};

function updateAssetTable(row, data) {
   var myTable = document.getElementById("assetReportTable");
   let myDate = new Date(data.purchaseDate);
   let myDay = myDate.getDate();
   let myMonth = myDate.getMonth() + 1;
   let myYear = myDate.getFullYear();

   myTable.rows[row].cells[1].innerHTML = myMonth + "/" + myDay + "/" + myYear;

   myDate = new Date(data.claimDate);
   myDay = myDate.getDate();
   myMonth = myDate.getMonth() + 1;
   myYear = myDate.getFullYear();

   myTable.rows[row].cells[2].innerHTML = myMonth + "/" + myDay + "/" + myYear;

   let varNumOne = 1;
   let arrRow = row;
   row = +row + +varNumOne;

   myTable.rows[row].cells[3].innerHTML = data.Description;
   myTable.rows[row].cells[4].innerHTML = `$${data.StartValue.toFixed(2)}`;
   myTable.rows[row].cells[5].innerHTML = data.BusPercent.toFixed(2);
   myTable.rows[row].cells[6].innerHTML = `$${data.claimAmt.toFixed(2)}`;
   myTable.rows[row].cells[7].innerHTML = `$${(data.claimAmt * data.BusPercent / 100).toFixed(2)}`;
   myTable.rows[row].cells[8].innerHTML = `$${data.itcClaimAmt.toFixed(2)}`;
   myTable.rows[row].cells[9].innerHTML = `$${(data.itcClaimAmt * data.BusPercent / 100).toFixed(2)}`;

   assetArray[arrRow].purchaseDate = data.purchaseDate;
   assetArray[arrRow].claimDate = data.claimDate;
   assetArray[arrRow].description = data.Description;
   assetArray[arrRow].startValue = data.StartValue;
   assetArray[arrRow].busPercent = data.BusPercent;
   assetArray[arrRow].claimAmt = data.claimAmt;
   assetArray[arrRow].itcClaimAmt = data.itcClaimAmt;

};

function formatedNumberToSimpleNumber(numVar) {
   let tempAmt = numVar.split(',');
   let newAmt = '';
   tempAmt.forEach((el, index) => {
      newAmt += `${el}`
   });
   return newAmt;
}

function validateAssetEntryForm() {
   const PurchaseDate = document.forms["AssetEntryForm"]["AssetPurchaseDate"];
   const ClaimDate = document.forms["AssetEntryForm"]["AssetClaimDate"];
   const Description = document.forms["AssetEntryForm"]["AssetDescription"];
   let StartAmt = document.forms["AssetEntryForm"]["AssetStartValue"];
   let ClaimAmt = document.forms["AssetEntryForm"]["AssetClaimAmt"];
   let ITCClaimAmt = document.forms["AssetEntryForm"]["ITCClaimAmt"];
   const BusinessPercent = document.forms["AssetEntryForm"]["AssetBusinessPercent"];

   StartAmt.value = formatedNumberToSimpleNumber(StartAmt.value);
   ClaimAmt.value = formatedNumberToSimpleNumber(ClaimAmt.value);
   ITCClaimAmt.value = formatedNumberToSimpleNumber(ITCClaimAmt.value);

   if (PurchaseDate.value == "") {
      window.alert("Please Select a Date Added.");
      PurchaseDate.focus();
      return false;
   }

   if (ClaimDate.value == "") {
      window.alert("Please Select an ITC Claim Date.");
      ClaimDate.focus();
      return false;
   }

   if (Description.value == "") {
      window.alert("Please enter a Description.");
      Description.focus();
      return false;
   }

   if (isNaN(StartAmt.value)) {
      window.alert("Please enter a Number in Asset Value.");
      StartAmt.focus();
      return false;
   }

   if (StartAmt.value == "") {
      window.alert("Please enter an Asset Value.");
      StartAmt.focus();
      return false;
   }

   if (StartAmt.value == 0) {
      window.alert("Please enter an Asset Value other than zero.");
      StartAmt.focus();
      return false;
   }

   if (isNaN(ClaimAmt.value)) {
      window.alert("Please enter a Number in Depreciation Claim.");
      ClaimAmt.focus();
      return false;
   }

   if (ClaimAmt.value == "") {
      window.alert("Please enter a Depreciation Claim.");
      ClaimAmt.focus();
      return false;
   }

   if (ClaimAmt.value == 0) {
      window.alert("Please enter a Depreciation Claim other than zero.");
      ClaimAmt.focus();
      return false;
   }

   if (isNaN(ITCClaimAmt.value)) {
      window.alert("Please enter a Number in ITC Claim.");
      ITCClaimAmt.focus();
      return false;
   }

   if (ITCClaimAmt.value == "") {
      window.alert("Please enter an ITC Claim.");
      ITCClaimAmt.focus();
      return false;
   }

   if (isNaN(BusinessPercent.value)) {
      window.alert("Please enter a Number in Business %.");
      BusinessPercent.focus();
      return false;
   }

   if (BusinessPercent.value == "") {
      window.alert("Please enter a Business %.");
      BusinessPercent.focus();
      return false;
   }

   if (BusinessPercent.value == 0) {
      window.alert("Please enter a Business % other than zero.");
      BusinessPercent.focus();
      return false;
   }
   return true;
}

function updateAssetStatus() {

   if (myDOMs.FixedAssets.Status.value === 'NEW') { return; }
   let dataMatch = true;
   if (originalAsset.PurchaseDate === myDOMs.FixedAssets.Purchase_Date.value) {
   } else {
      dataMatch = false;
   }
   if (originalAsset.Description === myDOMs.FixedAssets.Description.value) {
   } else {
      dataMatch = false;
   }
   if (originalAsset.ClaimDate === myDOMs.FixedAssets.Claim_Date.value) {
   } else {
      dataMatch = false;
   }
   if (originalAsset.StartValue === myDOMs.FixedAssets.Start_Value.value) {
   } else {
      dataMatch = false;
   }
   if (originalAsset.ClaimAmt === myDOMs.FixedAssets.Depreciation_Claim.value) {
   } else {
      dataMatch = false;
   }
   if (originalAsset.ITCClaimAmt === myDOMs.FixedAssets.ITC_Claim.value) {
   } else {
      dataMatch = false;
   }
   if (originalAsset.BusPercent === myDOMs.FixedAssets.Business_Percent.value) {
   } else {
      dataMatch = false;
   }


   if (dataMatch === false) {
      myDOMs.FixedAssets.Status.value = 'ALTERED';
      originalAsset.Status = 'ALTERED';
   } else {
      myDOMs.FixedAssets.Status.value = 'SAVED';
      originalAsset.Status = 'SAVED';
   }

   setAssetStatusColor();
}

function setAssetStatusColor() {
   if (myDOMs.FixedAssets.Status.value === 'ALTERED') {
      if ($('#AssetStatus').hasClass("text-danger")) {
      } else {
         $('#AssetStatus').addClass("text-danger");
      }
   } else {
      if ($('#AssetStatus').hasClass("text-danger")) {
         $('#AssetStatus').removeClass("text-danger");
      }
   }
};
