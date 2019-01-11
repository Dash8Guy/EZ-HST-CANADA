
let VlogselectedArrayNum = 0;
let VlogselectedRowNum = 0;
// this variable is used to hold lenght of Month Array in order to know when code is at the last row to make Totals BOLD
let MonthArrayLenght;

let VlogcurTableArray = [];
let arrTableJan = [];
let arrTableFeb = [];
let arrTableMar = [];
let arrTableApr = [];
let arrTableMay = [];
let arrTableJun = [];
let arrTableJul = [];
let arrTableAug = [];
let arrTableSep = [];
let arrTableOct = [];
let arrTableNov = [];
let arrTableDec = [];

let VlogcurrentTablePage = 0;


let vLogli;
let vLoga;
let vLognav = document.createElement("nav");
let vLogul = document.createElement("ul");
vLogul.setAttribute(
  "class",
  "pagination pagination-warning pagination-sm justify-content-center"
);
vLognav.setAttribute("id", "navID");
let myvLogAlert = document.createElement("div");
let vLogtbl = document.createElement("table");
let vLogresponsiveDiv = document.createElement("div");
let vLogStrongTag = document.createElement("p");


function buildVehicleLogTable(
  curAlertContainer,
  curAlertID,
  closeBtnID,
  boldText,
  alertType,
  dismissTime,
  myPage
) {

  myvLogAlert.setAttribute(
    "class",
    "alert alert-secondary alert-dismissible collapse"
  );
  myvLogAlert.setAttribute("id", curAlertID);
  //Create the Table Header Row
  let myvLogHeaders = [
    "DATE",
    "Bus KM V1",
    "Pers KM V1",
    "ODO V1",
    "V1 Bus %",
    "Bus KM V2",
    "Pers KM V2",
    "ODO V2",
    "V2 Bus %",
  ];


  vLogtbl.setAttribute("class", "table table-success table-sm table-hover table-striped");
  vLogtbl.setAttribute("id", "expReportTable");
  vLogresponsiveDiv.setAttribute("class", "table-responsive");
  let tblHeaderVLog = document.createElement("tHead");
  tblHeaderVLog.setAttribute('id', 'tableHeader');
  let tblBodyVLog = document.createElement("tbody");

  //create row header
  let vLogrow = document.createElement("tr");
  //create header cells
  myvLogHeaders.forEach((el, index) => {
    let vLogcellh = document.createElement("th");
    let vLogheaderlink = document.createElement("a");
    let vLogcellTexth = document.createTextNode(el);

    vLogcellh.appendChild(vLogcellTexth);
    vLogrow.appendChild(vLogcellh);
    vLogcellh.setAttribute("class", "text-center thead-dark");

  });

  //Header now complete, append it to the Table Header
  tblHeaderVLog.appendChild(vLogrow);

  // creating a row ////////////////////////

  for (i = 0; i < 31; i++) {
    //If statement checks is array has less than Month has days and if smaller than after reaching last log in array loop keeps making empty rows until 31 
    //so that when user changes from month to month, enough rows will be there to accomodate full month logs. Code will hide rows if empty.
    if (i < arrTableJan.length) {
      // creates a table row
      let vLogrow = document.createElement("tr");
      vLogrow.setAttribute("id", `rowLog-${i}`);

      //Log Date

      let vLogcell = document.createElement("td");
      myvLogDate = new Date(arrTableJan[i].logDate);
      tempvLogDate = myvLogDate.toLocaleDateString();
      let vLogcellTxt = document.createTextNode(tempvLogDate);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-center");
      vLogcell.setAttribute("id", `cellDate-${i}`);
      vLogrow.appendChild(vLogcell);
      //Bus KM V1
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(`${arrTableJan[i].BusKMV1.toFixed(1)}`);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV1BusKM-${i}`);
      vLogrow.appendChild(vLogcell);
      //Pers KM V1
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(`${arrTableJan[i].PersKMV1.toFixed(1)}`);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV1PersKM-${i}`);
      vLogrow.appendChild(vLogcell);
      //V1 Odometer
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(arrTableJan[i].V1Odometer.toFixed(1));
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-sm-right");
      vLogcell.setAttribute("id", `cellV1Odometer-${i}`);
      vLogrow.appendChild(vLogcell);
      //V1 Bus % 
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(`${Number(arrTableJan[i].BusPercentV1 * 100).toFixed(2)}%`);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV1BusPercent-${i}`);
      vLogrow.appendChild(vLogcell);

      //Bus KM V2
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(`${arrTableJan[i].BusKMV2.toFixed(1)}`);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV2BusKM-${i}`);
      vLogrow.appendChild(vLogcell);
      //Pers KM V2
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(`${arrTableJan[i].PersKMV2.toFixed(1)}`);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV2PersKM-${i}`);
      vLogrow.appendChild(vLogcell);

      // V2 Odometer
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(arrTableJan[i].V2Odometer.toFixed(1));
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-sm-right");
      vLogcell.setAttribute("id", `cellV2Odometer-${i}`);
      vLogrow.appendChild(vLogcell);

      // V2 Bus %
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode(`${Number(arrTableJan[i].BusPercentV2 * 100).toFixed(2)}%`);
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV2BusPercent-${i}`);
      vLogrow.appendChild(vLogcell);

      // add the row to the end of the table body
      tblBodyVLog.appendChild(vLogrow);
    } else {
      // creates a table row
      let vLogrow = document.createElement("tr");
      vLogrow.setAttribute("id", `rowLog-${i}`);

      //Log Date

      let vLogcell = document.createElement("td");
      //myvLogDate = new Date(arrTableJan[i].logDate);
      //tempvLogDate = myvLogDate.toLocaleDateString();
      let vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-center");
      vLogcell.setAttribute("id", `cellDate-${i}`);
      vLogrow.appendChild(vLogcell);
      //Bus KM V1
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV1BusKM-${i}`);
      vLogrow.appendChild(vLogcell);
      //Pers KM V1
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV1PersKM-${i}`);
      vLogrow.appendChild(vLogcell);
      //V1 Odometer
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-sm-right");
      vLogcell.setAttribute("id", `cellV1Odometer-${i}`);
      vLogrow.appendChild(vLogcell);
      //V1 Bus % 
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV1BusPercent-${i}`);
      vLogrow.appendChild(vLogcell);

      //Bus KM V2
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV2BusKM-${i}`);
      vLogrow.appendChild(vLogcell);
      //Pers KM V2
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV2PersKM-${i}`);
      vLogrow.appendChild(vLogcell);

      // V2 Odometer
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-sm-right");
      vLogcell.setAttribute("id", `cellV2Odometer-${i}`);
      vLogrow.appendChild(vLogcell);

      // V2 Bus %
      vLogcell = document.createElement("td");
      vLogcellTxt = document.createTextNode('');
      vLogcell.appendChild(vLogcellTxt);
      vLogcell.setAttribute("class", "text-right");
      vLogcell.setAttribute("id", `cellV2BusPercent-${i}`);
      vLogrow.appendChild(vLogcell);

      // add the row to the end of the table body
      tblBodyVLog.appendChild(vLogrow);
    }

  };

  // put the <tbody> in the <table>
  vLogtbl.appendChild(tblHeaderVLog);
  vLogtbl.appendChild(tblBodyVLog);
  if (vLogresponsiveDiv.hasChildNodes()) {
    while (vLogresponsiveDiv.firstChild) {
      vLogresponsiveDiv.removeChild(vLogresponsiveDiv.firstChild);
    }
  }
  vLogresponsiveDiv.appendChild(vLogtbl);

  VlogcurrentTablePage = 'Jan';

  addVlogPagination();

  let vLogPDFBtn = document.createElement("button");
  vLogPDFBtn.setAttribute("class", "btn btn-sm btn-outline-secondary float-right mr-4");
  vLogPDFBtn.setAttribute("id", 'printPDFBtn');
  vLogPDFBtn.setAttribute("data-toogle", "tooltip");
  vLogPDFBtn.setAttribute("title", "Save Table as a PDF!");

  vLogPDFBtn.setAttribute("onclick", "generateVlogTablePDF()");


  let myPDFBtnText = document.createTextNode("Print PDF");
  vLogPDFBtn.appendChild(myPDFBtnText);

  let vLogBtn = document.createElement("button");
  vLogBtn.setAttribute("class", "close");
  vLogBtn.setAttribute("id", closeBtnID);
  vLogBtn.setAttribute("data-toogle", "tooltip");
  vLogBtn.setAttribute("title", "Close Table!");
  vLogBtn.setAttribute("onclick", "closevLogModal()");

  let btnText = document.createTextNode("x");
  vLogBtn.appendChild(btnText);


  myvLogAlert.appendChild(vLognav);

  addVLogTitleText(myvLogAlert, boldText);


  myvLogAlert.appendChild(vLogPDFBtn);
  myvLogAlert.appendChild(vLogBtn);
  myvLogAlert.appendChild(vLogresponsiveDiv);
  myDOMs.vLogReport.Container.appendChild(myvLogAlert);

  $(`#${curAlertID}`).show("fade");

  goToVlogPage('Jan');

  if (dismissTime === 0) {
  } else {
    setTimeout(function () {
      $(`#${curAlertID}`).hide("fade");
    }, dismissTime);
  }

  resetVlogText(boldText);
  $("#VLogViewModal").modal("show");
}

function closevLogModal() {
  $("#VLogViewModal").modal("hide");
  removeVlogTblNavAlertChildNodes();
  ToggleMenuBar();
}

function resetVlogText(myText) {
  document.getElementById("vLogtitleNode").textContent = `${myText}`;
}

function addVLogTitleText(myvLogAlert, boldText) {
  vLogStrongTag.setAttribute("id", "vLogtitleNode");
  vLogStrongTag.textContent = `${boldText}`;
  myvLogAlert.appendChild(vLogStrongTag);
}

function addVlogPagination() {
  // Previous button
  vLogli = document.createElement("li");
  vLoga = document.createElement("a");

  mytxt = document.createTextNode("Previous");
  vLoga.appendChild(mytxt);
  vLoga.setAttribute("class", "page-link");
  vLoga.setAttribute("id", "vLogpagePrevious");
  vLoga.setAttribute("href", "#");
  vLoga.setAttribute("onclick", `goToPrevious()`);
  vLogli.appendChild(vLoga);
  vLogli.setAttribute("class", "page-item");
  vLogli.setAttribute("id", "vLogpageBtnPrevious");
  vLogul.appendChild(vLogli);

  // Month Button
  vLogli = document.createElement("li");
  vLoga = document.createElement("a");

  mytxt = document.createTextNode("January");
  vLoga.appendChild(mytxt);
  vLoga.setAttribute("class", "page-link");
  vLoga.setAttribute("id", "vLogpageMonth");
  vLoga.setAttribute("class", "font-weight-bold text-light");
  vLogli.appendChild(vLoga);
  vLogli.setAttribute("class", "page-item mx-2 px-2 bg-dark");
  vLogli.setAttribute("id", "vLogpageBtnNext");
  vLogul.appendChild(vLogli);


  // Next Button
  vLogli = document.createElement("li");
  vLoga = document.createElement("a");

  mytxt = document.createTextNode("Next");
  vLoga.appendChild(mytxt);
  vLoga.setAttribute("class", "page-link");
  vLoga.setAttribute("id", "vLogpageNext");
  vLoga.setAttribute("href", "#");
  vLoga.setAttribute("onclick", `goToNext()`);
  vLogli.appendChild(vLoga);
  vLogli.setAttribute("class", "page-item");
  vLogli.setAttribute("id", "vLogpageBtnNext");
  vLogul.appendChild(vLogli);

  vLognav.appendChild(vLogul);
};

function goToPrevious() {
  switch (VlogcurrentTablePage) {
    case 'Feb':
      goToVlogPage('Jan');
      break;
    case 'Mar':
      goToVlogPage('Feb');
      break;
    case 'Apr':
      goToVlogPage('Mar');
      break;
    case 'May':
      goToVlogPage('Apr');
      break;
    case 'Jun':
      goToVlogPage('May');
      break;
    case 'Jul':
      goToVlogPage('Jun');
      break;
    case 'Aug':
      goToVlogPage('Jul');
      break;
    case 'Sep':
      goToVlogPage('Aug');
      break;
    case 'Oct':
      goToVlogPage('Sep');
      break;
    case 'Nov':
      goToVlogPage('Oct');
      break;
    case 'Dec':
      goToVlogPage('Nov');
  }
};

function goToNext() {
  switch (VlogcurrentTablePage) {
    case 'Jan':
      goToVlogPage('Feb');
      break;
    case 'Feb':
      goToVlogPage('Mar');
      break;
    case 'Mar':
      goToVlogPage('Apr');
      break;
    case 'Apr':
      goToVlogPage('May');
      break;
    case 'May':
      goToVlogPage('Jun');
      break;
    case 'Jun':
      goToVlogPage('Jul');
      break;
    case 'Jul':
      goToVlogPage('Aug');
      break;
    case 'Aug':
      goToVlogPage('Sep');
      break;
    case 'Sep':
      goToVlogPage('Oct');
      break;
    case 'Oct':
      goToVlogPage('Nov');
      break;
    case 'Nov':
      goToVlogPage('Dec');
  }
};




function fillTableArrays() {
  arrTableJan = filterVlogMonth(0);
  arrTableFeb = filterVlogMonth(1);
  arrTableMar = filterVlogMonth(2);
  arrTableApr = filterVlogMonth(3);
  arrTableMay = filterVlogMonth(4);
  arrTableJun = filterVlogMonth(5);
  arrTableJul = filterVlogMonth(6);
  arrTableAug = filterVlogMonth(7);
  arrTableSep = filterVlogMonth(8);
  arrTableOct = filterVlogMonth(9);
  arrTableNov = filterVlogMonth(10);
  arrTableDec = filterVlogMonth(11);

}

function filterVlogMonth(myMonth) {
  let myArray = VlogcurTableArray.filter((vLog, index) => {
    var date = new Date(vLog.logDate);
    return (date.getMonth() === myMonth);
  })
  return myArray;
}

async function getVlogReportData() {
  await getAllVehicleLogs();
  if (vLogArray.length > 0) {
    addPercentandOdometertoArray();
    fillTableArrays();
    buildVehicleLogTable(myDOMs.vLogReport.Container, "vLogTableAlert", "topCloseVlogViewModal", `${vLogArray.length} total logs displayed on 1 page per month.`, "TABLE CAR GREEN", 0, 'JAN');
    ToggleMenuBar();
  } else {
    alert('You have no Vehicle Log entries at this time. To start adding Vehicle Logs, go to Entry Forms and open Vehicle Log Entry.');
  }

}

function addPercentandOdometertoArray() {
  let myUpdatedVlogArray = [];
  let BusinessPercentV1 = 0;
  let BusinessPercentV2 = 0;
  let runningBusAmtV1 = 0;
  let runningPersAmtV1 = 0;
  let runningBusAmtV2 = 0;
  let runningPersAmtV2 = 0;
  let continuousRunningBusAmtV1 = 0;
  let continuousRunningPersAmtV1 = 0;
  let continuousRunningBusAmtV2 = 0;
  let continuousRunningPersAmtV2 = 0;
  let mytempLogDate = new Date(vLogArray[0].logDate);
  let previousLoggedMonth = mytempLogDate.getMonth();
  vLogArray.forEach((vLog, index) => {
    let myrunningDate = new Date(vLog.logDate);
    //alert(`${myrunningDate.getMonth()}`);
    let myLoggedMonth = myrunningDate.getMonth();

    if (previousLoggedMonth !== myLoggedMonth) {

      runningBusAmtV1 = 0;
      runningPersAmtV1 = 0;
      runningBusAmtV2 = 0;
      runningPersAmtV2 = 0;
    }
    continuousRunningBusAmtV1 += vLog.BusKMV1;
    continuousRunningPersAmtV1 += vLog.PersKMV1;
    continuousRunningBusAmtV2 += vLog.BusKMV2;
    continuousRunningPersAmtV2 += vLog.PersKMV2;
    previousLoggedMonth = myrunningDate.getMonth();
    runningBusAmtV1 += vLog.BusKMV1;
    runningPersAmtV1 += vLog.PersKMV1;
    runningBusAmtV2 += vLog.BusKMV2;
    runningPersAmtV2 += vLog.PersKMV2;
    BusinessPercentV1 = runningBusAmtV1 / (runningBusAmtV1 + runningPersAmtV1);
    BusinessPercentV2 = runningBusAmtV2 / (runningBusAmtV2 + runningPersAmtV2);
    let newLogObj = {
      logDate: vLog.logDate,
      PersKMV1: vLog.PersKMV1,
      BusKMV1: vLog.BusKMV1,
      PersKMV2: vLog.PersKMV2,
      BusKMV2: vLog.BusKMV2,
      BusPercentV1: BusinessPercentV1,
      BusPercentV2: BusinessPercentV2,
      V1Odometer: dbMiscData.odometerV1 + continuousRunningBusAmtV1 + continuousRunningPersAmtV1,
      V2Odometer: dbMiscData.odometerV2 + continuousRunningBusAmtV2 + continuousRunningPersAmtV2
    }

    myUpdatedVlogArray.push(newLogObj);
  });
  VlogcurTableArray = myUpdatedVlogArray;
}

function emptyVlogTableCells() {
  for (i = 0; i < 31; i++) {
    document.getElementById(`cellDate-${i}`).innerHTML = null;
    document.getElementById(`cellV1BusKM-${i}`).innerHTML = null;
    document.getElementById(`cellV1PersKM-${i}`).innerHTML = null;
    document.getElementById(`cellV1Odometer-${i}`).innerHTML = null;
    document.getElementById(`cellV1BusPercent-${i}`).innerHTML = null;
    document.getElementById(`cellV2BusKM-${i}`).innerHTML = null;
    document.getElementById(`cellV2PersKM-${i}`).innerHTML = null;
    document.getElementById(`cellV2Odometer-${i}`).innerHTML = null;
    document.getElementById(`cellV2BusPercent-${i}`).innerHTML = null;
  }
}


function goToVlogPage(myMonth) {

  unHidevLogRows();
  emptyVlogTableCells();
  let myTempArray = [];
  switch (myMonth) {
    case 'Jan':
      myTempArray = arrTableJan;
      document.getElementById('vLogpageNext').innerText = 'February';
      document.getElementById('vLogpagePrevious').innerText = 'N/A';
      document.getElementById('vLogpageMonth').innerText = 'January';
      if ($(`#vLogpagePrevious`).hasClass("disabled")) {
      } else {
        $(`#vLogpagePrevious`).addClass("disabled");
      }
      if ($(`#vLogpageNext`).hasClass("disabled")) {
        $(`#vLogpageNext`).removeClass("disabled");
      }
      break;
    case 'Feb':
      myTempArray = arrTableFeb;
      document.getElementById('vLogpageNext').innerText = 'March';
      document.getElementById('vLogpagePrevious').innerText = 'January';
      document.getElementById('vLogpageMonth').innerText = 'February';
      if ($(`#vLogpagePrevious`).hasClass("disabled")) {
        $(`#vLogpagePrevious`).removeClass("disabled");
      }
      if ($(`#vLogpageNext`).hasClass("disabled")) {
        $(`#vLogpageNext`).removeClass("disabled");
      }
      break;
    case 'Mar':
      myTempArray = arrTableMar;
      document.getElementById('vLogpageNext').innerText = 'April';
      document.getElementById('vLogpagePrevious').innerText = 'February';
      document.getElementById('vLogpageMonth').innerText = 'March';
      break;
    case 'Apr':
      myTempArray = arrTableApr;
      document.getElementById('vLogpageNext').innerText = 'May';
      document.getElementById('vLogpagePrevious').innerText = 'March';
      document.getElementById('vLogpageMonth').innerText = 'April';
      break;
    case 'May':
      myTempArray = arrTableMay;
      document.getElementById('vLogpageNext').innerText = 'June';
      document.getElementById('vLogpagePrevious').innerText = 'April';
      document.getElementById('vLogpageMonth').innerText = 'May';
      break;
    case 'Jun':
      myTempArray = arrTableJun;
      document.getElementById('vLogpageNext').innerText = 'July';
      document.getElementById('vLogpagePrevious').innerText = 'May';
      document.getElementById('vLogpageMonth').innerText = 'June';
      break;
    case 'Jul':
      myTempArray = arrTableJul;
      document.getElementById('vLogpageNext').innerText = 'August';
      document.getElementById('vLogpagePrevious').innerText = 'June';
      document.getElementById('vLogpageMonth').innerText = 'July';
      break;
    case 'Aug':
      myTempArray = arrTableAug;
      document.getElementById('vLogpageNext').innerText = 'September';
      document.getElementById('vLogpagePrevious').innerText = 'July';
      document.getElementById('vLogpageMonth').innerText = 'August';
      break;
    case 'Sep':
      myTempArray = arrTableSep;
      document.getElementById('vLogpageNext').innerText = 'October';
      document.getElementById('vLogpagePrevious').innerText = 'August';
      document.getElementById('vLogpageMonth').innerText = 'September';
      break;
    case 'Oct':
      myTempArray = arrTableOct;
      document.getElementById('vLogpageNext').innerText = 'November';
      document.getElementById('vLogpagePrevious').innerText = 'September';
      document.getElementById('vLogpageMonth').innerText = 'October';
      break;
    case 'Nov':
      myTempArray = arrTableNov;
      document.getElementById('vLogpageNext').innerText = 'December';
      document.getElementById('vLogpagePrevious').innerText = 'October';
      document.getElementById('vLogpageMonth').innerText = 'November';
      if ($(`#vLogpagePrevious`).hasClass("disabled")) {
        $(`#vLogpagePrevious`).removeClass("disabled");
      }
      if ($(`#vLogpageNext`).hasClass("disabled")) {
        $(`#vLogpageNext`).removeClass("disabled");
      }
      break;
    case 'Dec':
      myTempArray = arrTableDec;
      document.getElementById('vLogpageNext').innerText = 'N/A';
      document.getElementById('vLogpagePrevious').innerText = 'November';
      document.getElementById('vLogpageMonth').innerText = 'December';
      if ($(`#vLogpagePrevious`).hasClass("disabled")) {
        $(`#vLogpagePrevious`).removeClass("disabled");
      }
      if ($(`#vLogpageNext`).hasClass("disabled")) {
      } else {
        $(`#vLogpageNext`).addClass("disabled");
      }
      break;
  }

  myTempArray.forEach(function (el, index) {

    myDate = new Date(el.logDate);
    tempDate = myDate.toLocaleDateString();
    document.getElementById(`cellDate-${index}`).innerHTML = tempDate;
    document.getElementById(`cellV1BusKM-${index}`).innerHTML = `${formatNumber(el.BusKMV1.toFixed(1))}`;
    document.getElementById(`cellV1PersKM-${index}`).innerHTML = `${formatNumber(el.PersKMV1.toFixed(1))}`;
    document.getElementById(`cellV1Odometer-${index}`).innerHTML = `${formatNumber(el.V1Odometer.toFixed(1))}`;
    document.getElementById(`cellV1BusPercent-${index}`).innerHTML = `${Number((el.BusPercentV1 * 100).toFixed(2))}%`;
    document.getElementById(`cellV2BusKM-${index}`).innerHTML = `${formatNumber(el.BusKMV2.toFixed(1))}`;
    document.getElementById(`cellV2PersKM-${index}`).innerHTML = `${formatNumber(el.PersKMV2.toFixed(1))}`;
    document.getElementById(`cellV2Odometer-${index}`).innerHTML = `${formatNumber(el.V2Odometer.toFixed(1))}`;
    document.getElementById(`cellV2BusPercent-${index}`).innerHTML = `${Number((el.BusPercentV2 * 100).toFixed(2))}%`;
  });

  VlogcurrentTablePage = myMonth;
  if (myTempArray.length < 31) {
    hideVlogRows(myTempArray.length);
  }
}


function hideVlogRows(rowCount) {
  for (i = 30; i >= rowCount; i--) {
    if (document.getElementById(`rowLog-${i}`) !== null) {
      document.getElementById(`rowLog-${i}`).style.display = "none";
    }
  }
}

function unHidevLogRows() {
  for (i = 0; i < 31; i++) {
    if (document.getElementById(`rowLog-${i}`) !== undefined) {
      document.getElementById(`rowLog-${i}`).style.display = "table-row";
    }
  }
}

function generateVlogTablePDF() {
  let headText;
  let fileSaveText;
  let doc = new jsPDF('l', 'px', 'letter', true);
  doc.setTextColor(41, 127, 186);
  doc.setFontSize(11);
  fileSaveText = `Vehicle Logs.pdf`;
  let data;
  let monthRows = 0;
  let columns;
  let PageCount = 0;
  for (i = 1; i < 13; i++) {
    PageCount += 1;
    switch (i) {
      case 1:
        data = vLogArrOfObjectToArrOfArrays(arrTableJan);
        headText = `${arrTableJan.length} Vehicle Log Entries in January.`;
        monthRows = arrTableJan.length;
        break;
      case 2:
        data = vLogArrOfObjectToArrOfArrays(arrTableFeb);
        headText = `${arrTableFeb.length} Vehicle Log Entries in February.`;
        monthRows = arrTableFeb.length;
        break;
      case 3:
        data = vLogArrOfObjectToArrOfArrays(arrTableMar);
        headText = `${arrTableMar.length} Vehicle Log Entries in March.`;
        monthRows = arrTableMar.length;
        break;
      case 4:
        data = vLogArrOfObjectToArrOfArrays(arrTableApr);
        headText = `${arrTableApr.length} Vehicle Log Entries in April.`;
        monthRows = arrTableApr.length;
        break;
      case 5:
        data = vLogArrOfObjectToArrOfArrays(arrTableMay);
        headText = `${arrTableMay.length} Vehicle Log Entries in May.`;
        monthRows = arrTableMay.length;
        break;
      case 6:
        data = vLogArrOfObjectToArrOfArrays(arrTableJun);
        headText = `${arrTableJun.length} Vehicle Log Entries in June.`;
        monthRows = arrTableJun.length;
        break;
      case 7:
        data = vLogArrOfObjectToArrOfArrays(arrTableJul);
        headText = `${arrTableJul.length} Vehicle Log Entries in July.`;
        monthRows = arrTableJul.length;
        break;
      case 8:
        data = vLogArrOfObjectToArrOfArrays(arrTableAug);
        headText = `${arrTableAug.length} Vehicle Log Entries in August.`;
        monthRows = arrTableAug.length;
        break;
      case 9:
        data = vLogArrOfObjectToArrOfArrays(arrTableSep);
        headText = `${arrTableSep.length} Vehicle Log Entries in September.`;
        monthRows = arrTableSep.length;
        break;
      case 10:
        data = vLogArrOfObjectToArrOfArrays(arrTableOct);
        headText = `${arrTableOct.length} Vehicle Log Entries in October.`;
        monthRows = arrTableOct.length;
        break;
      case 11:
        data = vLogArrOfObjectToArrOfArrays(arrTableNov);
        headText = `${arrTableNov.length} Vehicle Log Entries in November.`;
        monthRows = arrTableNov.length;
        break;
      case 12:
        data = vLogArrOfObjectToArrOfArrays(arrTableDec);
        headText = `${arrTableDec.length} Vehicle Log Entries in December.`;
        monthRows = arrTableDec.length;
    }

    MonthArrayLenght = monthRows;


    doc.text(headText, 34, 22);

    columns = ["DATE", "Bus KM V1", "Pers KM V1", "ODO V1", "V1 Bus %", "Bus KM V2", "Pers KM V2", "ODO V2", "V2 Bus %"];

    doc.autoTable(columns, data, {
      tableWidth: 'auto',
      columnWidth: 'auto',
      styles: { cellPadding: 1, fontSize: 11.5 },
      createdHeaderCell: function (cell, data) {
        alignVlogCol(cell, data);
      },
      createdCell: function (cell, data) {
        alignVlogCol(cell, data);
      }
    });

    if (PageCount < 12) {
      doc.addPage();
    }
  }

  doc.save(fileSaveText);

}

function alignVlogCol(cell, data) {
  var col = data.column.index;
  var row = data.row.index;
  if (col == 0) {
    cell.styles.halign = 'center';
  } else {
    cell.styles.halign = 'right';
  }
  if (row === MonthArrayLenght) {

    cell.styles.fontStyle = 'bold';
  }
}

function vLogArrOfObjectToArrOfArrays(workArray) {
  let myTempData = [];
  let myTemp2Arr = [];
  let runBusKMV1 = 0;
  let runPersKMV1 = 0;
  let runBusKMV2 = 0;
  let runPersKMV2 = 0;
  let runTotalKMV1 = 0;
  let runTotalKMV2 = 0;
  let BusPercentV1 = 0;
  let BusPercentV2 = 0;
  let runODOV1 = 0;
  let runODOV2 = 0;
  workArray.forEach((el) => {
    runBusKMV1 += el.BusKMV1;
    runPersKMV1 += el.PersKMV1;
    runBusKMV2 += el.BusKMV2;
    runPersKMV2 += el.PersKMV2;
    runODOV1 = el.V1Odometer
    runODOV2 = el.V2Odometer
    let myTempArr = [];
    let myTempDate = formatMyDate(el.logDate);
    myTempArr.push(myTempDate);
    myTempArr.push(formatNumber(el.BusKMV1.toFixed(1)));
    myTempArr.push(formatNumber(el.PersKMV1.toFixed(1)));
    myTempArr.push(formatNumber(el.V1Odometer.toFixed(1)));
    myTempArr.push(`${Number(((runBusKMV1 / (runBusKMV1 + runPersKMV1)) * 100).toFixed(2))}%`);
    myTempArr.push(formatNumber(el.BusKMV2.toFixed(1)));
    myTempArr.push(formatNumber(el.PersKMV2.toFixed(1)));
    myTempArr.push(formatNumber(el.V2Odometer.toFixed(1)));
    myTempArr.push(`${Number(((runBusKMV2 / (runBusKMV2 + runPersKMV2)) * 100).toFixed(2))}%`);

    myTempData.push(myTempArr);

  });

  runTotalKMV1 = runBusKMV1 + runPersKMV1;
  runTotalKMV2 = runBusKMV2 + runPersKMV2;
  BusPercentV1 = runBusKMV1 / runTotalKMV1;
  BusPercentV2 = runBusKMV2 / runTotalKMV2;

  myTemp2Arr.push('Totals:');
  myTemp2Arr.push(formatNumber(runBusKMV1.toFixed(1)));
  myTemp2Arr.push(formatNumber(runPersKMV1.toFixed(1)));
  myTemp2Arr.push(formatNumber(runODOV1.toFixed(1)));
  myTemp2Arr.push(`${Number((BusPercentV1 * 100).toFixed(2))}%`);
  myTemp2Arr.push(formatNumber(runBusKMV2.toFixed(1)));
  myTemp2Arr.push(formatNumber(runPersKMV2.toFixed(1)));
  myTemp2Arr.push(formatNumber(runODOV2.toFixed(1)));
  myTemp2Arr.push(`${Number((BusPercentV2 * 100).toFixed(2))}%`);

  myTempData.push(myTemp2Arr);

  return myTempData;
}