let busExpArray = [];
let homeExpArray = [];
let homeExpReducedData = {};
let vehicle1ExpArray = [];
let vehicle2ExpArray = [];
let otherExpArray = [];
let rentalExpArray = [];
let busIncArray = [];
let rentalIncArray = [];
let PaymentsArray = [];
let AssetDataArray = [];

let HomeReductionApplied = true;


async function displayIncomeStatementModal() {
  $("#incStatementModal").modal("show");
  reOpenIncomeStatement = false;
  await getVehiclePercentage();
  fillMainDataFromArrays();
  getHomePercentForDisplayText();
  populateIncomeStatement();
  myDOMs.incomeStatement.Vehicle1BodyElement.PercentButton.innerText = `${V1BusPercent} %`;
  myDOMs.incomeStatement.Vehicle2BodyElement.PercentButton.innerText = `${V2BusPercent} %`;
  myDOMs.incomeStatement.HomeBodyElement.PercentButton.innerText = `${HomePercent} %`;
  reduceVehicle1AmountPercentage();
  reduceVehicle2AmountPercentage();
  reduceHomeAmountPercentage();
  ToggleMenuBar();
}

function hideIncomeStatementModal() {
  $("#incStatementModal").modal("hide");
  ToggleMenuBar();
}

//This Part is code for all the Tabs function
function displayRevenueIncStat() {
  updateTabandBodyClass('Revenue');
}

function displayBusExpIncStat() {
  updateTabandBodyClass('Business');
}

function displayHomeExpIncStat() {
  updateTabandBodyClass('Home');
}

function displayVehicle1ExpIncStat() {
  updateTabandBodyClass('Vehicle1');
}

function displayVehicle2ExpIncStat() {
  updateTabandBodyClass('Vehicle2');
}

function displayOtherCostsExpIncStat() {
  updateTabandBodyClass('Other');
}

function displayRentalExpIncStat() {
  updateTabandBodyClass('Rental');
}

function updateTabandBodyClass(activeClass) {

  if (myDOMs.incomeStatement.BodyRevenue.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyRevenue.classList.add('d-none');
  }
  if (myDOMs.incomeStatement.BodyBusExp.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyBusExp.classList.add('d-none');
  }
  if (myDOMs.incomeStatement.BodyHomeExp.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyHomeExp.classList.add('d-none');
  }
  if (myDOMs.incomeStatement.BodyVehicleExp1.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyVehicleExp1.classList.add('d-none');
  }
  if (myDOMs.incomeStatement.BodyVehicleExp2.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyVehicleExp2.classList.add('d-none');
  }
  if (myDOMs.incomeStatement.BodyOtherCostExp.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyOtherCostExp.classList.add('d-none');
  }
  if (myDOMs.incomeStatement.BodyRentalExp.classList.contains('d-none')) {
  } else {
    myDOMs.incomeStatement.BodyRentalExp.classList.add('d-none');
  }


  if (myDOMs.incomeStatement.LinkTabRevenue.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabRevenue.classList.remove('active');
  }
  if (myDOMs.incomeStatement.LinkTabBusExp.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabBusExp.classList.remove('active');
  }
  if (myDOMs.incomeStatement.LinkTabHomeExp.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabHomeExp.classList.remove('active');
  }
  if (myDOMs.incomeStatement.LinkTabVehicleExp1.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabVehicleExp1.classList.remove('active');
  }
  if (myDOMs.incomeStatement.LinkTabVehicleExp2.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabVehicleExp2.classList.remove('active');
  }
  if (myDOMs.incomeStatement.LinkTabOtherCostExp.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabOtherCostExp.classList.remove('active');
  }
  if (myDOMs.incomeStatement.LinkTabRentalExp.classList.contains('active')) {
    myDOMs.incomeStatement.LinkTabRentalExp.classList.remove('active');
  }





  if (activeClass === 'Revenue') {
    if (myDOMs.incomeStatement.BodyRevenue.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyRevenue.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabRevenue.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabRevenue.classList.add('active');
    }
  } else if (activeClass === 'Business') {
    if (myDOMs.incomeStatement.BodyBusExp.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyBusExp.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabBusExp.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabBusExp.classList.add('active');
    }
  } else if (activeClass === 'Home') {
    if (myDOMs.incomeStatement.BodyHomeExp.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyHomeExp.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabHomeExp.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabHomeExp.classList.add('active');
    }
  } else if (activeClass === 'Vehicle1') {
    if (myDOMs.incomeStatement.BodyVehicleExp1.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyVehicleExp1.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabVehicleExp1.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabVehicleExp1.classList.add('active');
    }
  } else if (activeClass === 'Vehicle2') {
    if (myDOMs.incomeStatement.BodyVehicleExp2.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyVehicleExp2.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabVehicleExp2.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabVehicleExp2.classList.add('active');
    }
  } else if (activeClass === 'Other') {
    if (myDOMs.incomeStatement.BodyOtherCostExp.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyOtherCostExp.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabOtherCostExp.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabOtherCostExp.classList.add('active');
    }
  } else if (activeClass === 'Rental') {
    if (myDOMs.incomeStatement.BodyRentalExp.classList.contains('d-none')) {
      myDOMs.incomeStatement.BodyRentalExp.classList.remove('d-none');
    }
    if (myDOMs.incomeStatement.LinkTabRentalExp.classList.contains('active')) {
    } else {
      myDOMs.incomeStatement.LinkTabRentalExp.classList.add('active');
    }
  }
}

function displayImportantNote() {
  let myText = 'The Net Income is Simply the Total Net Revenue minus Total Net Expenses'
  let myText2 = 'It is meant to be a quick reference on the Status of your Activities.'
  let myText3 = 'It is not a full Business type Income Statement, because many other factors are not included in the calculations. Income Taxes being one.'
  let myText4 = 'Also, the Totals below, always applies the Vehicles and Home Percent reduction (if present) regardless of the percent toggle buttons state.'

  alert(`${myText}\n${myText2}\n\n${myText3}\n\n${myText4}`);
}

let mainData = {
  busExp: {
    net: 0,
    hst: 0,
    pst: 0,
    Admin: 0,
    AdminHST: 0,
    AdminPST: 0,
    Advertising: 0,
    AdvertisingHST: 0,
    AdvertisingPST: 0,
    CCA: 0,
    CCAHST: 0,
    CCAPST: 0,
    Cell: 0,
    CellHST: 0,
    CellPST: 0,
    Dues: 0,
    DuesHST: 0,
    DuesPST: 0,
    Freight: 0,
    FreightHST: 0,
    FreightPST: 0,
    Fuel: 0,
    FuelHST: 0,
    FuelPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Interest: 0,
    InterestHST: 0,
    InterestPST: 0,
    Legal: 0,
    LegalHST: 0,
    LegalPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Meals: 0,
    MealsHST: 0,
    MealsPST: 0,
    Office: 0,
    OfficeHST: 0,
    OfficePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    Property_Tax: 0,
    Property_TaxHST: 0,
    Property_TaxPST: 0,
    Rent: 0,
    RentHST: 0,
    RentPST: 0,
    Supplies: 0,
    SuppliesHST: 0,
    SuppliesPST: 0,
    Travel: 0,
    TravelHST: 0,
    TravelPST: 0,
    Wages: 0,
    WagesHST: 0,
    WagesPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0,
    Variable4: 0,
    Variable4HST: 0,
    Variable4PST: 0,
    Variable5: 0,
    Variable5HST: 0,
    Variable5PST: 0
  },
  homeExp: {
    net: 0,
    hst: 0,
    pst: 0,
    Total: 0,
    Electricity: 0,
    ElectricityHST: 0,
    ElectricityPST: 0,
    Heat: 0,
    HeatHST: 0,
    HeatPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Mortgage: 0,
    MortgageHST: 0,
    MortgagePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    PropertyTax: 0,
    PropertyTaxHST: 0,
    PropertyTaxPST: 0,
    Water: 0,
    WaterHST: 0,
    WaterPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0
  },
  vehicle1Exp: {
    net: 0,
    hst: 0,
    pst: 0,
    Total: 0,
    Fuel: 0,
    FuelHST: 0,
    FuelPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Leasing: 0,
    LeasingHST: 0,
    LeasingPST: 0,
    LoanInterest: 0,
    LoanInterestHST: 0,
    LoanInterestPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    Parking: 0,
    ParkingHST: 0,
    ParkingPST: 0,
    Registration: 0,
    RegistrationHST: 0,
    RegistrationPST: 0,
    SuppInsurance: 0,
    SuppInsuranceHST: 0,
    SuppInsurancePST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0
  },
  vehicle2Exp: {
    net: 0,
    hst: 0,
    pst: 0,
    Total: 0,
    Fuel: 0,
    FuelHST: 0,
    FuelPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Leasing: 0,
    LeasingHST: 0,
    LeasingPST: 0,
    LoanInterest: 0,
    LoanInterestHST: 0,
    LoanInterestPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    Parking: 0,
    ParkingHST: 0,
    ParkingPST: 0,
    Registration: 0,
    RegistrationHST: 0,
    RegistrationPST: 0,
    SuppInsurance: 0,
    SuppInsuranceHST: 0,
    SuppInsurancePST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0
  },
  otherCostsExp: {
    net: 0,
    hst: 0,
    pst: 0,
    Total: 0,
    Direct_Wage: 0,
    Direct_WageHST: 0,
    Direct_WagePST: 0,
    Goods: 0,
    GoodsHST: 0,
    GoodsPST: 0,
    Other_Costs: 0,
    Other_CostsHST: 0,
    Other_CostsPST: 0,
    Subcontracts: 0,
    SubcontractsHST: 0,
    SubcontractsPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0
  },
  rentalExp: {
    net: 0,
    hst: 0,
    pst: 0,
    Total: 0,
    Admin: 0,
    AdminHST: 0,
    AdminPST: 0,
    Advertising: 0,
    AdvertisingHST: 0,
    AdvertisingPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Interest: 0,
    InterestHST: 0,
    InterestPST: 0,
    Legal: 0,
    LegalHST: 0,
    LegalPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    MotorVehicle: 0,
    MotorVehicleHST: 0,
    MotorVehiclePST: 0,
    Office: 0,
    OfficeHST: 0,
    OfficePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    PropertyTax: 0,
    PropertyTaxHST: 0,
    PropertyTaxPST: 0,
    Travel: 0,
    TravelHST: 0,
    TravelPST: 0,
    Utilities: 0,
    UtilitiesHST: 0,
    UtilitiesPST: 0,
    Wages: 0,
    WagesHST: 0,
    WagesPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0
  },
  RevenueBus: {
    net: 0,
    hst: 0,
    pst: 0,
    BusinessRevenue: 0
  },
  RevenueRental: {
    net: 0,
    hst: 0,
    pst: 0,
    RentalRevenue: 0
  },
  Payments: {
    hst: 0,
    pst: 0,
    tax: 0
  },
  Assets: {
    Depreciation_Claim_Total: 0,
    Actual_Depreciation_Claim_Total: 0,
    ITC_Claim: 0,
    Actual_ITC_Claim: 0,
    ITC_PST_Claim: 0,
    Actual_ITC_PST_Claim: 0
  }
}

//Getting data from database

async function getAllMainData(myExpIncType) {

  if (!myExpIncType) {
    await getRequestedData('1', '');
    await getRequestedData('2', '');
    await getRequestedData('Bus', '');
    await getRequestedData('Home', '');
    await getRequestedData('Other', '');
    await getRequestedData('Rental', '');
    await getRequestedData('Income', 'Business');
    await getRequestedData('Income', 'Rental');
    await getPaymentData();
    await getAssetData();
    return;
  } else {
    switch (myExpIncType) {
      case 'Business':
        await getRequestedData('Bus', '');
        break;
      case 'Vehicle-1':
        await getRequestedData('1', '');
        break;
      case 'Vehicle-2':
        await getRequestedData('2', '');
        break;
      case 'Home':
        await getRequestedData('Home', '');
        break;
      case 'Other Costs':
        await getRequestedData('Other', '');
        break;
      case 'Rental':
        await getRequestedData('Rental', '');
        break;
      case 'Business Income':
        await getRequestedData('Income', 'Business');
        break;
      case 'Rental Income':
        await getRequestedData('Income', 'Rental');
        break;
      case 'Payments':
        await getPaymentData();
        break;
      case 'Assets':
        await getAssetData();

        return;
    }
  }
};

function populateIncomeStatement() {
  if (PST_Claim_Value === 'ITC') {
    // Business Expenses
    myDOMs.incomeStatement.BusBodyElement.AdminSpan.innerText = `$${formatNumber((mainData.busExp.Admin).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.AdvertisingSpan.innerText = `$${formatNumber((mainData.busExp.Advertising).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.CellSpan.innerText = `$${formatNumber((mainData.busExp.Cell).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.DuesSpan.innerText = `$${formatNumber((mainData.busExp.Dues).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.FreightSpan.innerText = `$${formatNumber((mainData.busExp.Freight).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.FuelSpan.innerText = `$${formatNumber((mainData.busExp.Fuel).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.busExp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.InterestSpan.innerText = `$${formatNumber((mainData.busExp.Interest).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.LegalSpan.innerText = `$${formatNumber((mainData.busExp.Legal).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.busExp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.MealsSpan.innerText = `$${formatNumber((mainData.busExp.Meals).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.OfficeSpan.innerText = `$${formatNumber((mainData.busExp.Office).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.busExp.Other).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Property_TaxSpan.innerText = `$${formatNumber((mainData.busExp.Property_Tax).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.RentSpan.innerText = `$${formatNumber((mainData.busExp.Rent).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.SuppliesSpan.innerText = `$${formatNumber((mainData.busExp.Supplies).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.TravelSpan.innerText = `$${formatNumber((mainData.busExp.Travel).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.WagesSpan.innerText = `$${formatNumber((mainData.busExp.Wages).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.busExp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.busExp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable3Span.innerText = `$${formatNumber((mainData.busExp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable4Span.innerText = `$${formatNumber((mainData.busExp.Variable4).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable5Span.innerText = `$${formatNumber((mainData.busExp.Variable5).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.busExp.net + mainData.Assets.Actual_Depreciation_Claim_Total).toFixed(2))}`
    //Assets
    myDOMs.incomeStatement.BusBodyElement.CCASpan.innerText = `$${formatNumber((mainData.Assets.Actual_Depreciation_Claim_Total).toFixed(2))}`


    // Vehicle 1 Expenses
    myDOMs.incomeStatement.Vehicle1BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Fuel).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Leasing).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.LoanInterest).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Other).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Parking).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Registration).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.SuppInsurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.net).toFixed(2))}`

    // Vehicle 2 Expenses
    myDOMs.incomeStatement.Vehicle2BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Fuel).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Leasing).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.LoanInterest).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Other).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Parking).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Registration).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.SuppInsurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.net).toFixed(2))}`

    // Home Expenses
    myDOMs.incomeStatement.HomeBodyElement.ElectricitySpan.innerText = `$${formatNumber((mainData.homeExp.Electricity).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.HeatSpan.innerText = `$${formatNumber((mainData.homeExp.Heat).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.homeExp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.homeExp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MortgageSpan.innerText = `$${formatNumber((mainData.homeExp.Mortgage).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.homeExp.Other).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((mainData.homeExp.PropertyTax).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.WaterSpan.innerText = `$${formatNumber((mainData.homeExp.Water).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.homeExp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.homeExp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable3Span.innerText = `$${formatNumber((mainData.homeExp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.homeExp.net).toFixed(2))}`

    // Rental Expenses
    myDOMs.incomeStatement.RentalBodyElement.AdminSpan.innerText = `$${formatNumber((mainData.rentalExp.Admin).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.AdvertisingSpan.innerText = `$${formatNumber((mainData.rentalExp.Advertising).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.rentalExp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.InterestSpan.innerText = `$${formatNumber((mainData.rentalExp.Interest).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.LegalSpan.innerText = `$${formatNumber((mainData.rentalExp.Legal).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.rentalExp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.MotorVehicleSpan.innerText = `$${formatNumber((mainData.rentalExp.MotorVehicle).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.OfficeSpan.innerText = `$${formatNumber((mainData.rentalExp.Office).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.rentalExp.Other).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((mainData.rentalExp.PropertyTax).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.TravelSpan.innerText = `$${formatNumber((mainData.rentalExp.Travel).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.UtilitiesSpan.innerText = `$${formatNumber((mainData.rentalExp.Utilities).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.WagesSpan.innerText = `$${formatNumber((mainData.rentalExp.Wages).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.rentalExp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.rentalExp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.rentalExp.net).toFixed(2))}`

    // Other Costs Expenses
    myDOMs.incomeStatement.OtherCostsBodyElement.Direct_WageSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Direct_Wage).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.GoodsSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Goods).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.Other_CostsSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Other_Costs).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.SubcontractsSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Subcontracts).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.otherCostsExp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.otherCostsExp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.otherCostsExp.net).toFixed(2))}`

  } else if (PST_Claim_Value === 'EXP') {

    // Business Expenses
    myDOMs.incomeStatement.BusBodyElement.AdminSpan.innerText = `$${formatNumber((mainData.busExp.Admin + mainData.busExp.AdminPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.AdvertisingSpan.innerText = `$${formatNumber((mainData.busExp.Advertising + mainData.busExp.AdvertisingPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.CellSpan.innerText = `$${formatNumber((mainData.busExp.Cell + mainData.busExp.CellPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.DuesSpan.innerText = `$${formatNumber((mainData.busExp.Dues + mainData.busExp.DuesPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.FreightSpan.innerText = `$${formatNumber((mainData.busExp.Freight + mainData.busExp.FreightPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.FuelSpan.innerText = `$${formatNumber((mainData.busExp.Fuel + mainData.busExp.FuelPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.busExp.Insurance + mainData.busExp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.InterestSpan.innerText = `$${formatNumber((mainData.busExp.Interest + mainData.busExp.InterestPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.LegalSpan.innerText = `$${formatNumber((mainData.busExp.Legal + mainData.busExp.LegalPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.busExp.Maintenance + mainData.busExp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.MealsSpan.innerText = `$${formatNumber((mainData.busExp.Meals + mainData.busExp.MealsPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.OfficeSpan.innerText = `$${formatNumber((mainData.busExp.Office + mainData.busExp.OfficePST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.busExp.Other + mainData.busExp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Property_TaxSpan.innerText = `$${formatNumber((mainData.busExp.Property_Tax + mainData.busExp.Property_TaxPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.RentSpan.innerText = `$${formatNumber((mainData.busExp.Rent + mainData.busExp.RentPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.SuppliesSpan.innerText = `$${formatNumber((mainData.busExp.Supplies + mainData.busExp.SuppliesPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.TravelSpan.innerText = `$${formatNumber((mainData.busExp.Travel + mainData.busExp.TravelPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.WagesSpan.innerText = `$${formatNumber((mainData.busExp.Wages + mainData.busExp.WagesPST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.busExp.Variable1 + mainData.busExp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.busExp.Variable2 + mainData.busExp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable3Span.innerText = `$${formatNumber((mainData.busExp.Variable3 + mainData.busExp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable4Span.innerText = `$${formatNumber((mainData.busExp.Variable4 + mainData.busExp.Variable4PST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.Variable5Span.innerText = `$${formatNumber((mainData.busExp.Variable5 + mainData.busExp.Variable5PST).toFixed(2))}`
    myDOMs.incomeStatement.BusBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.busExp.net + mainData.Assets.Actual_Depreciation_Claim_Total + mainData.busExp.pst + mainData.Assets.Actual_ITC_PST_Claim).toFixed(2))}`
    //Assets
    myDOMs.incomeStatement.BusBodyElement.CCASpan.innerText = `$${formatNumber((mainData.Assets.Actual_Depreciation_Claim_Total + mainData.Assets.Actual_ITC_PST_Claim).toFixed(2))}`


    // Vehicle 1 Expenses
    myDOMs.incomeStatement.Vehicle1BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.FuelPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LeasingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.LoanInterestPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Other + mainData.vehicle1Exp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.ParkingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.RegistrationPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.SuppInsurance + mainData.vehicle1Exp.SuppInsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable3 + mainData.vehicle1Exp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.net + mainData.vehicle1Exp.pst).toFixed(2))}`

    // Vehicle 2 Expenses
    myDOMs.incomeStatement.Vehicle2BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.FuelPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LeasingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.LoanInterestPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Other + mainData.vehicle2Exp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.ParkingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.RegistrationPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.SuppInsurance + mainData.vehicle2Exp.SuppInsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable3 + mainData.vehicle2Exp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.net + mainData.vehicle2Exp.pst).toFixed(2))}`

    // Home Expenses
    myDOMs.incomeStatement.HomeBodyElement.ElectricitySpan.innerText = `$${formatNumber((mainData.homeExp.Electricity + mainData.homeExp.ElectricityPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.HeatSpan.innerText = `$${formatNumber((mainData.homeExp.Heat + mainData.homeExp.HeatPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.homeExp.Insurance + mainData.homeExp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.homeExp.Maintenance + mainData.homeExp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MortgageSpan.innerText = `$${formatNumber((mainData.homeExp.Mortgage + mainData.homeExp.MortgagePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.homeExp.Other + mainData.homeExp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((mainData.homeExp.PropertyTax + mainData.homeExp.PropertyTaxPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.WaterSpan.innerText = `$${formatNumber((mainData.homeExp.Water + mainData.homeExp.WaterPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.homeExp.Variable1 + mainData.homeExp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.homeExp.Variable2 + mainData.homeExp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable3Span.innerText = `$${formatNumber((mainData.homeExp.Variable3 + mainData.homeExp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.homeExp.net + mainData.homeExp.pst).toFixed(2))}`

    // Rental Expenses
    myDOMs.incomeStatement.RentalBodyElement.AdminSpan.innerText = `$${formatNumber((mainData.rentalExp.Admin + mainData.rentalExp.AdminPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.AdvertisingSpan.innerText = `$${formatNumber((mainData.rentalExp.Advertising + mainData.rentalExp.AdvertisingPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.rentalExp.Insurance + mainData.rentalExp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.InterestSpan.innerText = `$${formatNumber((mainData.rentalExp.Interest + mainData.rentalExp.InterestPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.LegalSpan.innerText = `$${formatNumber((mainData.rentalExp.Legal + mainData.rentalExp.LegalPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.rentalExp.Maintenance + mainData.rentalExp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.MotorVehicleSpan.innerText = `$${formatNumber((mainData.rentalExp.MotorVehicle + mainData.rentalExp.MotorVehiclePST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.OfficeSpan.innerText = `$${formatNumber((mainData.rentalExp.Office + mainData.rentalExp.OfficePST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.rentalExp.Other + mainData.rentalExp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((mainData.rentalExp.PropertyTax + mainData.rentalExp.PropertyTaxPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.TravelSpan.innerText = `$${formatNumber((mainData.rentalExp.Travel + mainData.rentalExp.TravelPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.UtilitiesSpan.innerText = `$${formatNumber((mainData.rentalExp.Utilities + mainData.rentalExp.UtilitiesPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.WagesSpan.innerText = `$${formatNumber((mainData.rentalExp.Wages + mainData.rentalExp.WagesPST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.rentalExp.Variable1 + mainData.rentalExp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.rentalExp.Variable2 + mainData.rentalExp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.RentalBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.rentalExp.net + mainData.rentalExp.pst).toFixed(2))}`

    // Other Costs Expenses
    myDOMs.incomeStatement.OtherCostsBodyElement.Direct_WageSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Direct_Wage + mainData.otherCostsExp.Direct_WagePST).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.GoodsSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Goods + mainData.otherCostsExp.GoodsPST).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.Other_CostsSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Other_Costs + mainData.otherCostsExp.Other_CostsPST).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.SubcontractsSpan.innerText = `$${formatNumber((mainData.otherCostsExp.Subcontracts + mainData.otherCostsExp.SubcontractsPST).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.otherCostsExp.Variable1 + mainData.otherCostsExp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.otherCostsExp.Variable2 + mainData.otherCostsExp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.OtherCostsBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.otherCostsExp.net + mainData.otherCostsExp.pst).toFixed(2))}`
  }


  // Business Revenue
  myDOMs.incomeStatement.RevenueBodyElement.BusinessRevenueSpan.innerText = `$${formatNumber((mainData.RevenueBus.net).toFixed(2))}`
  myDOMs.incomeStatement.RevenueBodyElement.RentalRevenueSpan.innerText = `$${formatNumber((mainData.RevenueRental.net).toFixed(2))}`
  myDOMs.incomeStatement.RevenueBodyElement.GrandTotalRevenueSpan.innerText = `$${formatNumber((mainData.RevenueRental.net + mainData.RevenueBus.net).toFixed(2))}`

  // Bottom Grand Totals
  let reducedV1Total = 0;
  let reducedV2Total = 0;
  let V1Reduction = V1BusPercent / 100;
  let V2Reduction = V2BusPercent / 100;

  if (PST_Claim_Value === 'ITC') {
    reducedV1Total = (mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.Other + mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable3) * V1Reduction;
    reducedV1Total += mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.SuppInsurance

    reducedV2Total = (mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.Other + mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable3) * V2Reduction;
    reducedV2Total += mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.SuppInsurance
  } else if (PST_Claim_Value === 'EXP') {
    reducedV1Total = (mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.Other + mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable3) * V1Reduction;
    reducedV1Total += (mainData.vehicle1Exp.FuelPST + mainData.vehicle1Exp.InsurancePST + mainData.vehicle1Exp.LeasingPST + mainData.vehicle1Exp.LoanInterestPST + mainData.vehicle1Exp.MaintenancePST + mainData.vehicle1Exp.OtherPST + mainData.vehicle1Exp.RegistrationPST + mainData.vehicle1Exp.Variable1PST + mainData.vehicle1Exp.Variable2PST + mainData.vehicle1Exp.Variable3PST) * V1Reduction;
    reducedV1Total += mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.SuppInsurance;
    reducedV1Total += mainData.vehicle1Exp.ParkingPST + mainData.vehicle1Exp.SuppInsurancePST;

    reducedV2Total = (mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.Other + mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable3) * V2Reduction;
    reducedV2Total = (mainData.vehicle2Exp.FuelPST + mainData.vehicle2Exp.InsurancePST + mainData.vehicle2Exp.LeasingPST + mainData.vehicle2Exp.LoanInterestPST + mainData.vehicle2Exp.MaintenancePST + mainData.vehicle2Exp.OtherPST + mainData.vehicle2Exp.RegistrationPST + mainData.vehicle2Exp.Variable1PST + mainData.vehicle2Exp.Variable2PST + mainData.vehicle2Exp.Variable3PST) * V2Reduction;
    reducedV2Total += mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.SuppInsurance;
    reducedV2Total += mainData.vehicle2Exp.ParkingPST + mainData.vehicle2Exp.SuppInsurancePST;
  }

  let TotalRevenueTemp = 0;
  let TotalExpensesTemp = 0;

  if (PST_Claim_Value === 'ITC') {
    myDOMs.incomeStatement.bottomIncomeStatementTotals.btmTotalRevenue.innerText = `$${formatNumber((mainData.RevenueRental.net + mainData.RevenueBus.net).toFixed(2))}`;
    TotalRevenueTemp = mainData.RevenueRental.net + mainData.RevenueBus.net;
    myDOMs.incomeStatement.bottomIncomeStatementTotals.btmTotalExpenses.innerText = `$${formatNumber((mainData.otherCostsExp.net + mainData.rentalExp.net + homeExpReducedData.totalNet + reducedV2Total + reducedV1Total + mainData.busExp.net + mainData.Assets.Actual_Depreciation_Claim_Total).toFixed(2))}`;
    TotalExpensesTemp = mainData.otherCostsExp.net + mainData.rentalExp.net + homeExpReducedData.totalNet + reducedV2Total + reducedV1Total + mainData.busExp.net + mainData.Assets.Actual_Depreciation_Claim_Total;
    myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.innerText = `$${formatNumber((Number(TotalRevenueTemp) - Number(TotalExpensesTemp)).toFixed(2))}`

  } else if (PST_Claim_Value === 'EXP') {
    myDOMs.incomeStatement.bottomIncomeStatementTotals.btmTotalRevenue.innerText = `$${formatNumber((mainData.RevenueRental.net + mainData.RevenueBus.net).toFixed(2))}`;
    TotalRevenueTemp = mainData.RevenueRental.net + mainData.RevenueBus.net;
    myDOMs.incomeStatement.bottomIncomeStatementTotals.btmTotalExpenses.innerText = `$${formatNumber((mainData.otherCostsExp.net + mainData.rentalExp.net + homeExpReducedData.totalNet + reducedV2Total + reducedV1Total + mainData.busExp.net + mainData.Assets.Actual_Depreciation_Claim_Total + mainData.otherCostsExp.pst + mainData.rentalExp.pst + homeExpReducedData.totalPST + mainData.busExp.pst + mainData.Assets.Actual_ITC_PST_Claim).toFixed(2))}`;
    TotalExpensesTemp = mainData.otherCostsExp.net + mainData.rentalExp.net + (homeExpReducedData.totalNet) + reducedV2Total + reducedV1Total + mainData.busExp.net + mainData.Assets.Actual_Depreciation_Claim_Total + mainData.otherCostsExp.pst + mainData.rentalExp.pst + homeExpReducedData.totalPST + mainData.busExp.pst + mainData.Assets.Actual_ITC_PST_Claim;
    myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.innerText = `$${formatNumber(((TotalRevenueTemp) - (TotalExpensesTemp)).toFixed(2))}`
  }


  if (TotalRevenueTemp - TotalExpensesTemp < 0) {
    if (myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.classList.contains('badge-success')) {
      myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.classList.remove('badge-success');
      myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.classList.add('badge-danger');
    }
  } else {
    if (myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.classList.contains('badge-danger')) {
      myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.classList.remove('badge-danger');
      myDOMs.incomeStatement.bottomIncomeStatementTotals.btmNetIncome.classList.add('badge-success');
    }
  }

};

function fillMainDataFromArrays() {
  let myCallData = [];
  //Vehicle 1 Exp
  myCallData = loopData(vehicle1ExpArray);
  mainData.vehicle1Exp.net = myCallData.myNet;
  mainData.vehicle1Exp.hst = myCallData.myHST;
  mainData.vehicle1Exp.pst = myCallData.myPST;
  myCallLoopedData = loopDataByVehicleCategory(vehicle1ExpArray);
  mainData.vehicle1Exp.Fuel = myCallLoopedData.Fuel;
  mainData.vehicle1Exp.FuelHST = myCallLoopedData.FuelHST;
  mainData.vehicle1Exp.FuelPST = myCallLoopedData.FuelPST;
  mainData.vehicle1Exp.Insurance = myCallLoopedData.Insurance;
  mainData.vehicle1Exp.InsuranceHST = myCallLoopedData.InsuranceHST;
  mainData.vehicle1Exp.InsurancePST = myCallLoopedData.InsurancePST;
  mainData.vehicle1Exp.Leasing = myCallLoopedData.Leasing;
  mainData.vehicle1Exp.LeasingHST = myCallLoopedData.LeasingHST;
  mainData.vehicle1Exp.LeasingPST = myCallLoopedData.LeasingPST;
  mainData.vehicle1Exp.LoanInterest = myCallLoopedData.LoanInterest;
  mainData.vehicle1Exp.LoanInterestHST = myCallLoopedData.LoanInterestHST;
  mainData.vehicle1Exp.LoanInterestPST = myCallLoopedData.LoanInterestPST;
  mainData.vehicle1Exp.Maintenance = myCallLoopedData.Maintenance;
  mainData.vehicle1Exp.MaintenanceHST = myCallLoopedData.MaintenanceHST;
  mainData.vehicle1Exp.MaintenancePST = myCallLoopedData.MaintenancePST;
  mainData.vehicle1Exp.Other = myCallLoopedData.Other;
  mainData.vehicle1Exp.OtherHST = myCallLoopedData.OtherHST;
  mainData.vehicle1Exp.OtherPST = myCallLoopedData.OtherPST;
  mainData.vehicle1Exp.Parking = myCallLoopedData.Parking;
  mainData.vehicle1Exp.ParkingHST = myCallLoopedData.ParkingHST;
  mainData.vehicle1Exp.ParkingPST = myCallLoopedData.ParkingPST;
  mainData.vehicle1Exp.Registration = myCallLoopedData.Registration;
  mainData.vehicle1Exp.RegistrationHST = myCallLoopedData.RegistrationHST;
  mainData.vehicle1Exp.RegistrationPST = myCallLoopedData.RegistrationPST;
  mainData.vehicle1Exp.SuppInsurance = myCallLoopedData.SuppInsurance;
  mainData.vehicle1Exp.SuppInsuranceHST = myCallLoopedData.SuppInsuranceHST;
  mainData.vehicle1Exp.SuppInsurancePST = myCallLoopedData.SuppInsurancePST;
  mainData.vehicle1Exp.Variable1 = myCallLoopedData.Variable1;
  mainData.vehicle1Exp.Variable1HST = myCallLoopedData.Variable1HST;
  mainData.vehicle1Exp.Variable1PST = myCallLoopedData.Variable1PST;
  mainData.vehicle1Exp.Variable2 = myCallLoopedData.Variable2;
  mainData.vehicle1Exp.Variable2HST = myCallLoopedData.Variable2HST;
  mainData.vehicle1Exp.Variable2PST = myCallLoopedData.Variable2PST;
  mainData.vehicle1Exp.Variable3 = myCallLoopedData.Variable3;
  mainData.vehicle1Exp.Variable3HST = myCallLoopedData.Variable3HST;
  mainData.vehicle1Exp.Variable3PST = myCallLoopedData.Variable3PST;
  //Vehicle 2 Exp
  myCallData = loopData(vehicle2ExpArray);
  mainData.vehicle2Exp.net = myCallData.myNet;
  mainData.vehicle2Exp.hst = myCallData.myHST;
  mainData.vehicle2Exp.pst = myCallData.myPST;
  myCallLoopedData = loopDataByVehicleCategory(vehicle2ExpArray);
  mainData.vehicle2Exp.Fuel = myCallLoopedData.Fuel;
  mainData.vehicle2Exp.FuelHST = myCallLoopedData.FuelHST;
  mainData.vehicle2Exp.FuelPST = myCallLoopedData.FuelPST;
  mainData.vehicle2Exp.Insurance = myCallLoopedData.Insurance;
  mainData.vehicle2Exp.InsuranceHST = myCallLoopedData.InsuranceHST;
  mainData.vehicle2Exp.InsurancePST = myCallLoopedData.InsurancePST;
  mainData.vehicle2Exp.Leasing = myCallLoopedData.Leasing;
  mainData.vehicle2Exp.LeasingHST = myCallLoopedData.LeasingHST;
  mainData.vehicle2Exp.LeasingPST = myCallLoopedData.LeasingPST;
  mainData.vehicle2Exp.LoanInterest = myCallLoopedData.LoanInterest;
  mainData.vehicle2Exp.LoanInterestHST = myCallLoopedData.LoanInterestHST;
  mainData.vehicle2Exp.LoanInterestPST = myCallLoopedData.LoanInterestPST;
  mainData.vehicle2Exp.Maintenance = myCallLoopedData.Maintenance;
  mainData.vehicle2Exp.MaintenanceHST = myCallLoopedData.MaintenanceHST;
  mainData.vehicle2Exp.MaintenancePST = myCallLoopedData.MaintenancePST;
  mainData.vehicle2Exp.Other = myCallLoopedData.Other;
  mainData.vehicle2Exp.OtherHST = myCallLoopedData.OtherHST;
  mainData.vehicle2Exp.OtherPST = myCallLoopedData.OtherPST;
  mainData.vehicle2Exp.Parking = myCallLoopedData.Parking;
  mainData.vehicle2Exp.ParkingHST = myCallLoopedData.ParkingHST;
  mainData.vehicle2Exp.ParkingPST = myCallLoopedData.ParkingPST;
  mainData.vehicle2Exp.Registration = myCallLoopedData.Registration;
  mainData.vehicle2Exp.RegistrationHST = myCallLoopedData.RegistrationHST;
  mainData.vehicle2Exp.RegistrationPST = myCallLoopedData.RegistrationPST;
  mainData.vehicle2Exp.SuppInsurance = myCallLoopedData.SuppInsurance;
  mainData.vehicle2Exp.SuppInsuranceHST = myCallLoopedData.SuppInsuranceHST;
  mainData.vehicle2Exp.SuppInsurancePST = myCallLoopedData.SuppInsurancePST;
  mainData.vehicle2Exp.Variable1 = myCallLoopedData.Variable1;
  mainData.vehicle2Exp.Variable1HST = myCallLoopedData.Variable1HST;
  mainData.vehicle2Exp.Variable1PST = myCallLoopedData.Variable1PST;
  mainData.vehicle2Exp.Variable2 = myCallLoopedData.Variable2;
  mainData.vehicle2Exp.Variable2HST = myCallLoopedData.Variable2HST;
  mainData.vehicle2Exp.Variable2PST = myCallLoopedData.Variable2PST;
  mainData.vehicle2Exp.Variable3 = myCallLoopedData.Variable3;
  mainData.vehicle2Exp.Variable3HST = myCallLoopedData.Variable3HST;
  mainData.vehicle2Exp.Variable3PST = myCallLoopedData.Variable3PST;
  // Business Exp
  myCallLoopedData = loopDataByBusinessCategory(busExpArray);
  mainData.busExp.Admin = myCallLoopedData.Admin;
  mainData.busExp.AdminHST = myCallLoopedData.AdminHST;
  mainData.busExp.AdminPST = myCallLoopedData.AdminPST;
  mainData.busExp.Advertising = myCallLoopedData.Advertising;
  mainData.busExp.AdvertisingHST = myCallLoopedData.AdvertisingHST;
  mainData.busExp.AdvertisingPST = myCallLoopedData.AdvertisingPST;
  mainData.busExp.CCA = myCallLoopedData.CCA;
  mainData.busExp.CCAHST = myCallLoopedData.CCAHST;
  mainData.busExp.CCAPST = myCallLoopedData.CCAPST;
  mainData.busExp.Cell = myCallLoopedData.Cell;
  mainData.busExp.CellHST = myCallLoopedData.CellHST;
  mainData.busExp.CellPST = myCallLoopedData.CellPST;
  mainData.busExp.Dues = myCallLoopedData.Dues;
  mainData.busExp.DuesHST = myCallLoopedData.DuesHST;
  mainData.busExp.DuesPST = myCallLoopedData.DuesPST;
  mainData.busExp.Freight = myCallLoopedData.Freight;
  mainData.busExp.FreightHST = myCallLoopedData.FreightHST;
  mainData.busExp.FreightPST = myCallLoopedData.FreightPST;
  mainData.busExp.Fuel = myCallLoopedData.Fuel;
  mainData.busExp.FuelHST = myCallLoopedData.FuelHST;
  mainData.busExp.FuelPST = myCallLoopedData.FuelPST;
  mainData.busExp.Insurance = myCallLoopedData.Insurance;
  mainData.busExp.InsuranceHST = myCallLoopedData.InsuranceHST;
  mainData.busExp.InsurancePST = myCallLoopedData.InsurancePST;
  mainData.busExp.Interest = myCallLoopedData.Interest;
  mainData.busExp.InterestHST = myCallLoopedData.InterestHST;
  mainData.busExp.InterestPST = myCallLoopedData.InterestPST;
  mainData.busExp.Legal = myCallLoopedData.Legal;
  mainData.busExp.LegalHST = myCallLoopedData.LegalHST;
  mainData.busExp.LegalPST = myCallLoopedData.LegalPST;
  mainData.busExp.Maintenance = myCallLoopedData.Maintenance;
  mainData.busExp.MaintenanceHST = myCallLoopedData.MaintenanceHST;
  mainData.busExp.MaintenancePST = myCallLoopedData.MaintenancePST;
  mainData.busExp.Meals = myCallLoopedData.Meals / 2;
  mainData.busExp.MealsHST = myCallLoopedData.MealsHST / 2;
  mainData.busExp.MealsPST = myCallLoopedData.MealsPST / 2;
  mainData.busExp.Office = myCallLoopedData.Office;
  mainData.busExp.OfficeHST = myCallLoopedData.OfficeHST;
  mainData.busExp.OfficePST = myCallLoopedData.OfficePST;
  mainData.busExp.Other = myCallLoopedData.Other;
  mainData.busExp.OtherHST = myCallLoopedData.OtherHST;
  mainData.busExp.OtherPST = myCallLoopedData.OtherPST;
  mainData.busExp.Property_Tax = myCallLoopedData.Property_Tax;
  mainData.busExp.Property_TaxHST = myCallLoopedData.Property_TaxHST;
  mainData.busExp.Property_TaxPST = myCallLoopedData.Property_TaxPST;
  mainData.busExp.Rent = myCallLoopedData.Rent;
  mainData.busExp.RentHST = myCallLoopedData.RentHST;
  mainData.busExp.RentPST = myCallLoopedData.RentPST;
  mainData.busExp.Supplies = myCallLoopedData.Supplies;
  mainData.busExp.SuppliesHST = myCallLoopedData.SuppliesHST;
  mainData.busExp.SuppliesPST = myCallLoopedData.SuppliesPST;
  mainData.busExp.Travel = myCallLoopedData.Travel;
  mainData.busExp.TravelHST = myCallLoopedData.TravelHST;
  mainData.busExp.TravelPST = myCallLoopedData.TravelPST;
  mainData.busExp.Wages = myCallLoopedData.Wages;
  mainData.busExp.WagesHST = myCallLoopedData.WagesHST;
  mainData.busExp.WagesPST = myCallLoopedData.WagesPST;
  mainData.busExp.Variable1 = myCallLoopedData.Variable1;
  mainData.busExp.Variable1HST = myCallLoopedData.Variable1HST;
  mainData.busExp.Variable1PST = myCallLoopedData.Variable1PST;
  mainData.busExp.Variable2 = myCallLoopedData.Variable2;
  mainData.busExp.Variable2HST = myCallLoopedData.Variable2HST;
  mainData.busExp.Variable2PST = myCallLoopedData.Variable2PST;
  mainData.busExp.Variable3 = myCallLoopedData.Variable3;
  mainData.busExp.Variable3HST = myCallLoopedData.Variable3HST;
  mainData.busExp.Variable3PST = myCallLoopedData.Variable3PST;
  mainData.busExp.Variable4 = myCallLoopedData.Variable4;
  mainData.busExp.Variable4HST = myCallLoopedData.Variable4HST;
  mainData.busExp.Variable4PST = myCallLoopedData.Variable4PST;
  mainData.busExp.Variable5 = myCallLoopedData.Variable5;
  mainData.busExp.Variable5HST = myCallLoopedData.Variable5HST;
  mainData.busExp.Variable5PST = myCallLoopedData.Variable5PST;

  myCallData = loopData(busExpArray);
  mainData.busExp.net = myCallData.myNet - (myCallLoopedData.Meals / 2);
  mainData.busExp.hst = myCallData.myHST - (myCallLoopedData.MealsHST / 2);
  mainData.busExp.pst = myCallData.myPST - (myCallLoopedData.MealsPST / 2);
  //Home Exp
  //the call to loopForHomePercentReduction populates an object variable that is used when toggling home percent
  loopForHomePercentReduction(homeExpArray);
  myCallData = loopData(homeExpArray);
  mainData.homeExp.net = myCallData.myNet;
  mainData.homeExp.hst = myCallData.myHST;
  mainData.homeExp.pst = myCallData.myPST;
  myCallLoopedData = loopDataByHomeCategory(homeExpArray);
  mainData.homeExp.Electricity = myCallLoopedData.Electricity;
  mainData.homeExp.ElectricityHST = myCallLoopedData.ElectricityHST;
  mainData.homeExp.ElectricityPST = myCallLoopedData.ElectricityPST;
  mainData.homeExp.Heat = myCallLoopedData.Heat;
  mainData.homeExp.HeatHST = myCallLoopedData.HeatHST;
  mainData.homeExp.HeatPST = myCallLoopedData.HeatPST;
  mainData.homeExp.Insurance = myCallLoopedData.Insurance;
  mainData.homeExp.InsuranceHST = myCallLoopedData.InsuranceHST;
  mainData.homeExp.InsurancePST = myCallLoopedData.InsurancePST;
  mainData.homeExp.Maintenance = myCallLoopedData.Maintenance;
  mainData.homeExp.MaintenanceHST = myCallLoopedData.MaintenanceHST;
  mainData.homeExp.MaintenancePST = myCallLoopedData.MaintenancePST;
  mainData.homeExp.Mortgage = myCallLoopedData.Mortgage;
  mainData.homeExp.MortgageHST = myCallLoopedData.MortgageHST;
  mainData.homeExp.MortgagePST = myCallLoopedData.MortgagePST;
  mainData.homeExp.Other = myCallLoopedData.Other;
  mainData.homeExp.OtherHST = myCallLoopedData.OtherHST;
  mainData.homeExp.OtherPST = myCallLoopedData.OtherPST;
  mainData.homeExp.PropertyTax = myCallLoopedData.PropertyTax;
  mainData.homeExp.PropertyTaxHST = myCallLoopedData.PropertyTaxHST;
  mainData.homeExp.PropertyTaxPST = myCallLoopedData.PropertyTaxPST;
  mainData.homeExp.Water = myCallLoopedData.Water;
  mainData.homeExp.WaterHST = myCallLoopedData.WaterHST;
  mainData.homeExp.WaterPST = myCallLoopedData.WaterPST;
  mainData.homeExp.Variable1 = myCallLoopedData.Variable1;
  mainData.homeExp.Variable1HST = myCallLoopedData.Variable1HST;
  mainData.homeExp.Variable1PST = myCallLoopedData.Variable1PST;
  mainData.homeExp.Variable2 = myCallLoopedData.Variable2;
  mainData.homeExp.Variable2HST = myCallLoopedData.Variable2HST;
  mainData.homeExp.Variable2PST = myCallLoopedData.Variable2PST;
  mainData.homeExp.Variable3 = myCallLoopedData.Variable3;
  mainData.homeExp.Variable3HST = myCallLoopedData.Variable3HST;
  mainData.homeExp.Variable3PST = myCallLoopedData.Variable3PST;
  //Other Exp
  myCallData = loopData(otherExpArray);
  mainData.otherCostsExp.net = myCallData.myNet;
  mainData.otherCostsExp.hst = myCallData.myHST;
  mainData.otherCostsExp.pst = myCallData.myPST;
  myCallLoopedData = loopDataByOtherCostsCategory(otherExpArray);
  mainData.otherCostsExp.Direct_Wage = myCallLoopedData.Direct_Wage;
  mainData.otherCostsExp.Direct_WageHST = myCallLoopedData.Direct_WageHST;
  mainData.otherCostsExp.Direct_WagePST = myCallLoopedData.Direct_WagePST;
  mainData.otherCostsExp.Goods = myCallLoopedData.Goods;
  mainData.otherCostsExp.GoodsHST = myCallLoopedData.GoodsHST;
  mainData.otherCostsExp.GoodsPST = myCallLoopedData.GoodsPST;
  mainData.otherCostsExp.Other_Costs = myCallLoopedData.Other_Costs;
  mainData.otherCostsExp.Other_CostsHST = myCallLoopedData.Other_CostsHST;
  mainData.otherCostsExp.Other_CostsPST = myCallLoopedData.Other_CostsPST;
  mainData.otherCostsExp.Subcontracts = myCallLoopedData.Subcontracts;
  mainData.otherCostsExp.SubcontractsHST = myCallLoopedData.SubcontractsHST;
  mainData.otherCostsExp.SubcontractsPST = myCallLoopedData.SubcontractsPST;
  mainData.otherCostsExp.Variable1 = myCallLoopedData.Variable1;
  mainData.otherCostsExp.Variable1HST = myCallLoopedData.Variable1HST;
  mainData.otherCostsExp.Variable1PST = myCallLoopedData.Variable1PST;
  mainData.otherCostsExp.Variable2 = myCallLoopedData.Variable2;
  mainData.otherCostsExp.Variable2HST = myCallLoopedData.Variable2HST;
  mainData.otherCostsExp.Variable2PST = myCallLoopedData.Variable2PST;
  //Rental Exp
  myCallData = loopData(rentalExpArray);
  mainData.rentalExp.net = myCallData.myNet;
  mainData.rentalExp.hst = myCallData.myHST;
  mainData.rentalExp.pst = myCallData.myPST;
  myCallLoopedData = loopDataByRentalCategory(rentalExpArray);
  mainData.rentalExp.Admin = myCallLoopedData.Admin;
  mainData.rentalExp.AdminHST = myCallLoopedData.AdminHST;
  mainData.rentalExp.AdminPST = myCallLoopedData.AdminPST;
  mainData.rentalExp.Advertising = myCallLoopedData.Advertising;
  mainData.rentalExp.AdvertisingHST = myCallLoopedData.AdvertisingHST;
  mainData.rentalExp.AdvertisingPST = myCallLoopedData.AdvertisingPST;
  mainData.rentalExp.Insurance = myCallLoopedData.Insurance;
  mainData.rentalExp.InsuranceHST = myCallLoopedData.InsuranceHST;
  mainData.rentalExp.InsurancePST = myCallLoopedData.InsurancePST;
  mainData.rentalExp.Interest = myCallLoopedData.Interest;
  mainData.rentalExp.InterestHST = myCallLoopedData.InterestHST;
  mainData.rentalExp.InterestPST = myCallLoopedData.InterestPST;
  mainData.rentalExp.Legal = myCallLoopedData.Legal;
  mainData.rentalExp.LegalHST = myCallLoopedData.LegalHST;
  mainData.rentalExp.LegalPST = myCallLoopedData.LegalPST;
  mainData.rentalExp.Maintenance = myCallLoopedData.Maintenance;
  mainData.rentalExp.MaintenanceHST = myCallLoopedData.MaintenanceHST;
  mainData.rentalExp.MaintenancePST = myCallLoopedData.MaintenancePST;
  mainData.rentalExp.MotorVehicle = myCallLoopedData.MotorVehicle;
  mainData.rentalExp.MotorVehicleHST = myCallLoopedData.MotorVehicleHST;
  mainData.rentalExp.MotorVehiclePST = myCallLoopedData.MotorVehiclePST;
  mainData.rentalExp.Office = myCallLoopedData.Office;
  mainData.rentalExp.OfficeHST = myCallLoopedData.OfficeHST;
  mainData.rentalExp.OfficePST = myCallLoopedData.OfficePST;
  mainData.rentalExp.Other = myCallLoopedData.Other;
  mainData.rentalExp.OtherHST = myCallLoopedData.OtherHST;
  mainData.rentalExp.OtherPST = myCallLoopedData.OtherPST;
  mainData.rentalExp.PropertyTax = myCallLoopedData.PropertyTax;
  mainData.rentalExp.PropertyTaxHST = myCallLoopedData.PropertyTaxHST;
  mainData.rentalExp.PropertyTaxPST = myCallLoopedData.PropertyTaxPST;
  mainData.rentalExp.Travel = myCallLoopedData.Travel;
  mainData.rentalExp.TravelHST = myCallLoopedData.TravelHST;
  mainData.rentalExp.TravelPST = myCallLoopedData.TravelPST;
  mainData.rentalExp.Utilities = myCallLoopedData.Utilities;
  mainData.rentalExp.UtilitiesHST = myCallLoopedData.UtilitiesHST;
  mainData.rentalExp.UtilitiesPST = myCallLoopedData.UtilitiesPST;
  mainData.rentalExp.Wages = myCallLoopedData.Wages;
  mainData.rentalExp.WagesHST = myCallLoopedData.WagesHST;
  mainData.rentalExp.WagesPST = myCallLoopedData.WagesPST;
  mainData.rentalExp.Variable1 = myCallLoopedData.Variable1;
  mainData.rentalExp.Variable1HST = myCallLoopedData.Variable1HST;
  mainData.rentalExp.Variable1PST = myCallLoopedData.Variable1PST;
  mainData.rentalExp.Variable2 = myCallLoopedData.Variable2;
  mainData.rentalExp.Variable2HST = myCallLoopedData.Variable2HST;
  mainData.rentalExp.Variable2PST = myCallLoopedData.Variable2PST;
  //Business Inc
  myCallData = loopData(busIncArray);
  mainData.RevenueBus.net = myCallData.myNet;
  mainData.RevenueBus.hst = myCallData.myHST;
  mainData.RevenueBus.pst = myCallData.myPST;
  //Rental Inc
  myCallData = loopData(rentalIncArray);
  mainData.RevenueRental.net = myCallData.myNet;
  mainData.RevenueRental.hst = myCallData.myHST;
  mainData.RevenueRental.pst = myCallData.myPST;
  //Payments
  myCallData = loopPaymentData();
  mainData.Payments.hst = myCallData.myHST;
  mainData.Payments.pst = myCallData.myPST;
  mainData.Payments.tax = myCallData.myTax;
  //Assets
  myCallData = loopAssetData();
  mainData.Assets.Depreciation_Claim_Total = myCallData.myClaim;
  mainData.Assets.Actual_Depreciation_Claim_Total = myCallData.myActualClaim;
  mainData.Assets.ITC_Claim = myCallData.myITC_Claim;
  mainData.Assets.Actual_ITC_Claim = myCallData.myActual_ITC_Claim;
  mainData.Assets.ITC_PST_Claim = myCallData.myITC_PST_Claim;
  mainData.Assets.Actual_ITC_PST_Claim = myCallData.myActual_ITC_PST_Claim;

  updateMainPageDisplayAmounts();
}

function updateMainPageDisplayAmounts() {
  let reducedV1Total = 0;
  let reducedV2Total = 0;
  let V1Reduction = V1BusPercent / 100;
  let V2Reduction = V2BusPercent / 100;
  let TotalNetIncomeTemp = 0;


  if (PST_Claim_Value === 'ITC') {
    reducedV1Total = (mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.Other + mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable3) * V1Reduction;
    reducedV1Total += mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.SuppInsurance

    reducedV2Total = (mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.Other + mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable3) * V2Reduction;
    reducedV2Total += mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.SuppInsurance
  } else if (PST_Claim_Value === 'EXP') {
    reducedV1Total = (mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.Other + mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable3) * V1Reduction;
    reducedV1Total += (mainData.vehicle1Exp.FuelPST + mainData.vehicle1Exp.InsurancePST + mainData.vehicle1Exp.LeasingPST + mainData.vehicle1Exp.LoanInterestPST + mainData.vehicle1Exp.MaintenancePST + mainData.vehicle1Exp.OtherPST + mainData.vehicle1Exp.RegistrationPST + mainData.vehicle1Exp.Variable1PST + mainData.vehicle1Exp.Variable2PST + mainData.vehicle1Exp.Variable3PST) * V1Reduction;
    reducedV1Total += mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.SuppInsurance;
    reducedV1Total += mainData.vehicle1Exp.ParkingPST + mainData.vehicle1Exp.SuppInsurancePST;

    reducedV2Total = (mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.Other + mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable3) * V2Reduction;
    reducedV2Total = (mainData.vehicle2Exp.FuelPST + mainData.vehicle2Exp.InsurancePST + mainData.vehicle2Exp.LeasingPST + mainData.vehicle2Exp.LoanInterestPST + mainData.vehicle2Exp.MaintenancePST + mainData.vehicle2Exp.OtherPST + mainData.vehicle2Exp.RegistrationPST + mainData.vehicle2Exp.Variable1PST + mainData.vehicle2Exp.Variable2PST + mainData.vehicle2Exp.Variable3PST) * V2Reduction;
    reducedV2Total += mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.SuppInsurance;
    reducedV2Total += mainData.vehicle2Exp.ParkingPST + mainData.vehicle2Exp.SuppInsurancePST;
  }


  if (PST_Claim_Value === 'ITC') {
    myDOMs.main_page.NetExpense.value = `$${(formatNumber(Number(mainData.busExp.net + homeExpReducedData.totalNet + mainData.otherCostsExp.net + mainData.rentalExp.net + reducedV1Total + reducedV2Total + mainData.Assets.Actual_Depreciation_Claim_Total).toFixed(2)))}`;
    myDOMs.main_page.NetRevenue.value = `$${(formatNumber(Number(mainData.RevenueBus.net + mainData.RevenueRental.net).toFixed(2)))}`;
    myDOMs.main_page.NetIncome.value = `$${(formatNumber(Number((mainData.RevenueBus.net + mainData.RevenueRental.net) - (mainData.busExp.net + homeExpReducedData.totalNet + mainData.otherCostsExp.net + mainData.rentalExp.net + reducedV1Total + reducedV2Total + mainData.Assets.Actual_Depreciation_Claim_Total)).toFixed(2)))}`;

  } else if (PST_Claim_Value === 'EXP') {
    myDOMs.main_page.NetExpense.value = `$${(formatNumber(Number(mainData.busExp.net + homeExpReducedData.totalNet + mainData.otherCostsExp.net + mainData.rentalExp.net + reducedV1Total + reducedV2Total + mainData.Assets.Actual_Depreciation_Claim_Total + mainData.otherCostsExp.pst + mainData.rentalExp.pst + homeExpReducedData.totalPST + mainData.busExp.pst + mainData.Assets.Actual_ITC_PST_Claim).toFixed(2)))}`;
    myDOMs.main_page.NetRevenue.value = `$${(formatNumber(Number(mainData.RevenueBus.net + mainData.RevenueRental.net).toFixed(2)))}`;
    myDOMs.main_page.NetIncome.value = `$${(formatNumber(Number((mainData.RevenueBus.net + mainData.RevenueRental.net) - (mainData.busExp.net + homeExpReducedData.totalNet + mainData.otherCostsExp.net + mainData.rentalExp.net + reducedV1Total + reducedV2Total + mainData.Assets.Actual_Depreciation_Claim_Total + mainData.otherCostsExp.pst + mainData.rentalExp.pst + homeExpReducedData.totalPST + mainData.busExp.pst + mainData.Assets.Actual_ITC_PST_Claim)).toFixed(2)))}`;
    TotalNetIncomeTemp = `$${(formatNumber(Number((mainData.RevenueBus.net + mainData.RevenueRental.net) - (mainData.busExp.net + homeExpReducedData.totalNet + mainData.otherCostsExp.net + mainData.rentalExp.net + reducedV1Total + reducedV2Total + mainData.Assets.Actual_Depreciation_Claim_Total + mainData.otherCostsExp.pst + mainData.rentalExp.pst + homeExpReducedData.totalPST + mainData.busExp.pst + mainData.Assets.Actual_ITC_PST_Claim)).toFixed(2)))}`;

  }


  if (TotalNetIncomeTemp < 0) {
    if (myDOMs.main_page.NetIncome.classList.contains('text-success')) {
      myDOMs.main_page.NetIncome.classList.remove('text-success');
      myDOMs.main_page.NetIncome.classList.add('text-danger');
    }
  } else {
    if (myDOMs.main_page.NetIncome.classList.contains('text-danger')) {
      myDOMs.main_page.NetIncome.classList.remove('text-danger');
      myDOMs.main_page.NetIncome.classList.add('text-success');
    }
  }
}

function getAssetData() {
  let tempData;

  tempData = {
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
        AssetDataArray = data.assets;
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

function getPaymentData() {
  tempData = {
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
      url: `${serverURL}payments`,
      data: tempData,
      enctype: "multipart/form-data"
    })
      .done(function (myPayments) {
        resolve(myPayments);
        PaymentsArray = myPayments.paymentEntries;
      })
      .fail(function (e) {
        reject(JSON.stringify(e.statusText, undefined, 2));
        if (e.readyState === 0 || window.sessionStorage.getItem('myRandomVar') === '') {
          alert('You Must be logged in before using EZ-HST-CANADA>')
        } else {
          alert(JSON.stringify(e.statusText, undefined, 2));
        }
      });
  });
}

function getRequestedData(carNumber, source) {
  //source = Business or Rental
  //carNumber = Income, 1, 2, Bus, Home, Other, Rental
  tempData = {
    carNumber: carNumber,
    auth: window.sessionStorage.getItem('myRandomVar'),
    startYear: startDate.getUTCFullYear(),
    startMonth: startDate.getUTCMonth(),
    startDay: startDate.getUTCDate(),
    endYear: endDate.getUTCFullYear(),
    endMonth: endDate.getUTCMonth(),
    endDay: endDate.getUTCDate(),
    source: source
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
            vehicle1ExpArray = myExpenses.carexpense;
            break;
          case '2':
            vehicle2ExpArray = myExpenses.carexpense;
            break;
          case 'Bus':
            busExpArray = myExpenses.carexpense;
            break;
          case 'Home':
            homeExpArray = myExpenses.carexpense;
            break;
          case 'Other':
            otherExpArray = myExpenses.carexpense;
            break;
          case 'Rental':
            rentalExpArray = myExpenses.carexpense;
            break;
          case 'Income':
            if (source === 'Business') {
              busIncArray = myExpenses.carexpense;
            } else if (source === 'Rental') {
              rentalIncArray = myExpenses.carexpense;
            }
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





}

function loopAssetData() {
  let Claim = 0;
  let Actual_Claim = 0;
  let ITC_Claim = 0;
  let Actual_ITC_Claim = 0;
  let ITC_PST_Claim = 0;
  let Actual_ITC_PST_Claim = 0;

  AssetDataArray.forEach((el, index) => {
    Claim += el.claimAmt;
    Actual_Claim += (el.claimAmt * el.busPercent / 100);
    ITC_Claim += el.itcClaimAmt;
    Actual_ITC_Claim += (el.itcClaimAmt * el.busPercent / 100);
    ITC_PST_Claim += el.itc_pstClaimAmt;
    Actual_ITC_PST_Claim += (el.itc_pstClaimAmt * el.busPercent / 100);


  });
  return {
    myClaim: Claim,
    myActualClaim: Actual_Claim,
    myITC_Claim: ITC_Claim,
    myActual_ITC_Claim: Actual_ITC_Claim,
    myITC_PST_Claim: ITC_PST_Claim,
    myActual_ITC_PST_Claim: Actual_ITC_PST_Claim
  }
};

function loopDataByBusinessCategory(data) {
  let myLoopedData = {
    Admin: 0,
    AdminHST: 0,
    AdminPST: 0,
    Advertising: 0,
    AdvertisingHST: 0,
    AdvertisingPST: 0,
    CCA: 0,
    CCAHST: 0,
    CCAPST: 0,
    Cell: 0,
    CellHST: 0,
    CellPST: 0,
    Dues: 0,
    DuesHST: 0,
    DuesPST: 0,
    Freight: 0,
    FreightHST: 0,
    FreightPST: 0,
    Fuel: 0,
    FuelHST: 0,
    FuelPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Interest: 0,
    InterestHST: 0,
    InterestPST: 0,
    Legal: 0,
    LegalHST: 0,
    LegalPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Meals: 0,
    MealsHST: 0,
    MealsPST: 0,
    Office: 0,
    OfficeHST: 0,
    OfficePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    Property_Tax: 0,
    Property_TaxHST: 0,
    Property_TaxPST: 0,
    Rent: 0,
    RentHST: 0,
    RentPST: 0,
    Supplies: 0,
    SuppliesHST: 0,
    SuppliesPST: 0,
    Travel: 0,
    TravelHST: 0,
    TravePST: 0,
    Wages: 0,
    WagesHST: 0,
    WagesPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0,
    Variable4: 0,
    Variable4HST: 0,
    Variable4PST: 0,
    Variable5: 0,
    Variable5HST: 0,
    Variable5PST: 0
  }

  data.forEach((el, index) => {
    switch (el.carExpCatSelect) {
      case 'Advertising':
        myLoopedData.Advertising += el.carnetAmt;
        myLoopedData.AdvertisingHST += el.carhstAmt;
        myLoopedData.AdvertisingPST += el.carpstAmt;
        break;
      case 'Fees, licences, dues, memberships':
        myLoopedData.Dues += el.carnetAmt;
        myLoopedData.DuesHST += el.carhstAmt;
        myLoopedData.DuesPST += el.carpstAmt;
        break;
      case 'Meals and Entertainment':
        myLoopedData.Meals += el.carnetAmt;
        myLoopedData.MealsHST += el.carhstAmt;
        myLoopedData.MealsPST += el.carpstAmt;
        break;
      case 'Office Expenses':
        myLoopedData.Office += el.carnetAmt;
        myLoopedData.OfficeHST += el.carhstAmt;
        myLoopedData.OfficePST += el.carpstAmt;
        break;
      case 'Supplies':
        myLoopedData.Supplies += el.carnetAmt;
        myLoopedData.SuppliesHST += el.carhstAmt;
        myLoopedData.SuppliesPST += el.carpstAmt;
        break;
      case 'Cell Phone':
        myLoopedData.Cell += el.carnetAmt;
        myLoopedData.CellHST += el.carhstAmt;
        myLoopedData.CellPST += el.carpstAmt;
        break;
      case 'Other Expenses':
        myLoopedData.Other += el.carnetAmt;
        myLoopedData.OtherHST += el.carhstAmt;
        myLoopedData.OtherPST += el.carpstAmt;
        break;
      case 'Delivery, freight, and express':
        myLoopedData.Freight += el.carnetAmt;
        myLoopedData.FreightHST += el.carhstAmt;
        myLoopedData.FreightPST += el.carpstAmt;
        break;
      case 'Fuel costs (except  vehicles)':
        myLoopedData.Fuel += el.carnetAmt;
        myLoopedData.FuelHST += el.carhstAmt;
        myLoopedData.FuelPST += el.carpstAmt;
        break;
      case 'Insurance':
        myLoopedData.Insurance += el.carnetAmt;
        myLoopedData.InsuranceHST += el.carhstAmt;
        myLoopedData.InsurancePST += el.carpstAmt;
        break;
      case 'Interest':
        myLoopedData.Interest += el.carnetAmt;
        myLoopedData.InterestHST += el.carhstAmt;
        myLoopedData.InterestPST += el.carpstAmt;
        break;
      case 'Maintenance and Repairs':
        myLoopedData.Maintenance += el.carnetAmt;
        myLoopedData.MaintenanceHST += el.carhstAmt;
        myLoopedData.MaintenancePST += el.carpstAmt;
        break;
      case 'Management and administration fees':
        myLoopedData.Admin += el.carnetAmt;
        myLoopedData.AdminHST += el.carhstAmt;
        myLoopedData.AdminPST += el.carpstAmt;
        break;
      case 'Legal, accounting, and other Prof. Fees':
        myLoopedData.Legal += el.carnetAmt;
        myLoopedData.LegalHST += el.carhstAmt;
        myLoopedData.LegalPST += el.carpstAmt;
        break;
      case 'Property Taxes':
        myLoopedData.Property_Tax += el.carnetAmt;
        myLoopedData.Property_TaxHST += el.carhstAmt;
        myLoopedData.Property_TaxPST += el.carpstAmt;
        break;
      case 'Rent':
        myLoopedData.Rent += el.carnetAmt;
        myLoopedData.RentHST += el.carhstAmt;
        myLoopedData.RentPST += el.carpstAmt;
        break;
      case 'Salaries, wages, and benefits':
        myLoopedData.Wages += el.carnetAmt;
        myLoopedData.WagesHST += el.carhstAmt;
        myLoopedData.WagesPST += el.carpstAmt;
        break;
      case 'Travel':
        myLoopedData.Travel += el.carnetAmt;
        myLoopedData.TravelHST += el.carhstAmt;
        myLoopedData.TravelPST += el.carpstAmt;
        break;
      case 'Variable 1':
        myLoopedData.Variable1 += el.carnetAmt;
        myLoopedData.Variable1HST += el.carhstAmt;
        myLoopedData.Variable1PST += el.carpstAmt;
        break;
      case 'Variable 2':
        myLoopedData.Variable2 += el.carnetAmt;
        myLoopedData.Variable2HST += el.carhstAmt;
        myLoopedData.Variable2PST += el.carpstAmt;
        break;
      case 'Variable 3':
        myLoopedData.Variable3 += el.carnetAmt;
        myLoopedData.Variable3HST += el.carhstAmt;
        myLoopedData.Variable3PST += el.carpstAmt;
        break;
      case 'Variable 4':
        myLoopedData.Variable4 += el.carnetAmt;
        myLoopedData.Variable4HST += el.carhstAmt;
        myLoopedData.Variable4PST += el.carpstAmt;
        break;
      case 'Variable 5':
        myLoopedData.Variable5 += el.carnetAmt;
        myLoopedData.Variable5HST += el.carhstAmt;
        myLoopedData.Variable5PST += el.carpstAmt;
    }
  });
  return myLoopedData;
};

function loopDataByVehicleCategory(data) {
  let myLoopedData = {
    Total: 0,
    Fuel: 0,
    FuelHST: 0,
    FuelPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Leasing: 0,
    LeasingHST: 0,
    LeasingPST: 0,
    LoanInterest: 0,
    LoanInterestHST: 0,
    LoanInterestPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    Parking: 0,
    ParkingHST: 0,
    ParkingPST: 0,
    Registration: 0,
    RegistrationHST: 0,
    RegistrationPST: 0,
    SuppInsurance: 0,
    SuppInsuranceHST: 0,
    SuppInsurancePST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0
  }

  data.forEach((el, index) => {
    switch (el.carExpCatSelect) {
      case 'Fuel and Oil':
        myLoopedData.Fuel += el.carnetAmt;
        myLoopedData.FuelHST += el.carhstAmt;
        myLoopedData.FuelPST += el.carpstAmt;
        break;
      case 'Insurance':
        myLoopedData.Insurance += el.carnetAmt;
        myLoopedData.InsuranceHST += el.carhstAmt;
        myLoopedData.InsurancePST += el.carpstAmt;
        break;
      case 'Licence and Registration':
        myLoopedData.Registration += el.carnetAmt;
        myLoopedData.RegistrationHST += el.carhstAmt;
        myLoopedData.RegistrationPST += el.carpstAmt;
        break;
      case 'Maintenance and Repairs':
        myLoopedData.Maintenance += el.carnetAmt;
        myLoopedData.MaintenanceHST += el.carhstAmt;
        myLoopedData.MaintenancePST += el.carpstAmt;
        break;
      case 'Other Expenses':
        myLoopedData.Other += el.carnetAmt;
        myLoopedData.OtherHST += el.carhstAmt;
        myLoopedData.OtherPST += el.carpstAmt;
        break;
      case 'Business Parking Fees':
        myLoopedData.Parking += el.carnetAmt;
        myLoopedData.ParkingHST += el.carhstAmt;
        myLoopedData.ParkingPST += el.carpstAmt;
        break;
      case 'Supplementary Business Insurance':
        myLoopedData.SuppInsurance += el.carnetAmt;
        myLoopedData.SuppInsuranceHST += el.carhstAmt;
        myLoopedData.SuppInsurancePST += el.carpstAmt;
        break;
      case 'Leasing':
        myLoopedData.Leasing += el.carnetAmt;
        myLoopedData.LeasingHST += el.carhstAmt;
        myLoopedData.LeasingPST += el.carpstAmt;
        break;
      case 'Interest on Loan':
        myLoopedData.LoanInterest += el.carnetAmt;
        myLoopedData.LoanInterestHST += el.carhstAmt;
        myLoopedData.LoanInterestPST += el.carpstAmt;
        break;
      case 'Variable 1':
        myLoopedData.Variable1 += el.carnetAmt;
        myLoopedData.Variable1HST += el.carhstAmt;
        myLoopedData.Variable1PST += el.carpstAmt;
        break;
      case 'Variable 2':
        myLoopedData.Variable2 += el.carnetAmt;
        myLoopedData.Variable2HST += el.carhstAmt;
        myLoopedData.Variable2PST += el.carpstAmt;
        break;
      case 'Variable 3':
        myLoopedData.Variable3 += el.carnetAmt;
        myLoopedData.Variable3HST += el.carhstAmt;
        myLoopedData.Variable3PST += el.carpstAmt;
    }
  });
  return myLoopedData;
};

function loopDataByHomeCategory(data) {
  let myLoopedData = {
    Electricity: 0,
    ElectricityHST: 0,
    ElectricityPST: 0,
    Heat: 0,
    HeatHST: 0,
    HeatPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Mortgage: 0,
    MortgageHST: 0,
    MortgagePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    PropertyTax: 0,
    PropertyTaxHST: 0,
    PropertyTaxPST: 0,
    Water: 0,
    WaterHST: 0,
    WaterPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0
  }

  data.forEach((el, index) => {
    switch (el.carExpCatSelect) {
      case 'Heat':
        myLoopedData.Heat += el.carnetAmt;
        myLoopedData.HeatHST += el.carhstAmt;
        myLoopedData.HeatPST += el.carpstAmt;
        break;
      case 'Electricity':
        myLoopedData.Electricity += el.carnetAmt;
        myLoopedData.ElectricityHST += el.carhstAmt;
        myLoopedData.ElectricityPST += el.carpstAmt;
        break;
      case 'Insurance':
        myLoopedData.Insurance += el.carnetAmt;
        myLoopedData.InsuranceHST += el.carhstAmt;
        myLoopedData.InsurancePST += el.carpstAmt;
        break;
      case 'Maintenance':
        myLoopedData.Maintenance += el.carnetAmt;
        myLoopedData.MaintenanceHST += el.carhstAmt;
        myLoopedData.MaintenancePST += el.carpstAmt;
        break;
      case 'Mortgage Interest':
        myLoopedData.Mortgage += el.carnetAmt;
        myLoopedData.MortgageHST += el.carhstAmt;
        myLoopedData.MortgagePST += el.carpstAmt;
        break;
      case 'Water and Sewage':
        myLoopedData.Water += el.carnetAmt;
        myLoopedData.WaterHST += el.carhstAmt;
        myLoopedData.WaterPST += el.carpstAmt;
        break;
      case 'Property Taxes':
        myLoopedData.PropertyTax += el.carnetAmt;
        myLoopedData.PropertyTaxHST += el.carhstAmt;
        myLoopedData.PropertyTaxPST += el.carpstAmt;
        break;
      case 'Other Expenses':
        myLoopedData.Other += el.carnetAmt;
        myLoopedData.OtherHST += el.carhstAmt;
        myLoopedData.OtherPST += el.carpstAmt;
        break;
      case 'Variable 1':
        myLoopedData.Variable1 += el.carnetAmt;
        myLoopedData.Variable1HST += el.carhstAmt;
        myLoopedData.Variable1PST += el.carpstAmt;
        break;
      case 'Variable 2':
        myLoopedData.Variable2 += el.carnetAmt;
        myLoopedData.Variable2HST += el.carhstAmt;
        myLoopedData.Variable2PST += el.carpstAmt;
        break;
      case 'Variable 3':
        myLoopedData.Variable3 += el.carnetAmt;
        myLoopedData.Variable3HST += el.carhstAmt;
        myLoopedData.Variable3PST += el.carpstAmt;
    }
  });

  return myLoopedData;
};

function loopForHomePercentReduction(data) {
  let myLoopedData = {
    totalNet: 0,
    totalHST: 0,
    totalPST: 0,
    Electricity: 0,
    ElectricityHST: 0,
    ElectricityPST: 0,
    Heat: 0,
    HeatHST: 0,
    HeatPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    Mortgage: 0,
    MortgageHST: 0,
    MortgagePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    PropertyTax: 0,
    PropertyTaxHST: 0,
    PropertyTaxPST: 0,
    Water: 0,
    WaterHST: 0,
    WaterPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
    Variable3: 0,
    Variable3HST: 0,
    Variable3PST: 0
  }
  data.forEach((el, index) => {
    let myElementDate = new Date(el.carDate);
    let myElementMonth = myElementDate.getUTCMonth();
    let myCurrentReduction = 0;

    switch (myElementMonth) {
      case 0:
        myCurrentReduction = Number(dbMiscData.homePercJan / 100);
        break;
      case 1:
        myCurrentReduction = Number(dbMiscData.homePercFeb / 100);
        break;
      case 2:
        myCurrentReduction = Number(dbMiscData.homePercMar / 100);
        break;
      case 3:
        myCurrentReduction = Number(dbMiscData.homePercApr / 100);
        break;
      case 4:
        myCurrentReduction = Number(dbMiscData.homePercMay / 100);
        break;
      case 5:
        myCurrentReduction = Number(dbMiscData.homePercJun / 100);
        break;
      case 6:
        myCurrentReduction = Number(dbMiscData.homePercJul / 100);
        break;
      case 7:
        myCurrentReduction = Number(dbMiscData.homePercAug / 100);
        break;
      case 8:
        myCurrentReduction = Number(dbMiscData.homePercSep / 100);
        break;
      case 9:
        myCurrentReduction = Number(dbMiscData.homePercOct / 100);
        break;
      case 10:
        myCurrentReduction = Number(dbMiscData.homePercNov / 100);
        break;
      case 11:
        myCurrentReduction = Number(dbMiscData.homePercDec / 100);
    }
    myLoopedData.totalNet += el.carnetAmt * myCurrentReduction;
    myLoopedData.totalHST += el.carhstAmt * myCurrentReduction;
    myLoopedData.totalPST += el.carpstAmt * myCurrentReduction;

    switch (el.carExpCatSelect) {
      case 'Heat':
        myLoopedData.Heat += el.carnetAmt * myCurrentReduction;
        myLoopedData.HeatHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.HeatPST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Electricity':
        myLoopedData.Electricity += el.carnetAmt * myCurrentReduction;
        myLoopedData.ElectricityHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.ElectricityPST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Insurance':
        myLoopedData.Insurance += el.carnetAmt * myCurrentReduction;
        myLoopedData.InsuranceHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.InsurancePST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Maintenance':
        myLoopedData.Maintenance += el.carnetAmt * myCurrentReduction;
        myLoopedData.MaintenanceHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.MaintenancePST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Mortgage Interest':
        myLoopedData.Mortgage += el.carnetAmt * myCurrentReduction;
        myLoopedData.MortgageHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.MortgagePST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Water and Sewage':
        myLoopedData.Water += el.carnetAmt * myCurrentReduction;
        myLoopedData.WaterHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.WaterPST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Property Taxes':
        myLoopedData.PropertyTax += el.carnetAmt * myCurrentReduction;
        myLoopedData.PropertyTaxHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.PropertyTaxPST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Other Expenses':
        myLoopedData.Other += el.carnetAmt * myCurrentReduction;
        myLoopedData.OtherHST += el.carhstAmt * myCurrentReduction;
        myLoopedData.OtherPST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Variable 1':
        myLoopedData.Variable1 += el.carnetAmt * myCurrentReduction;
        myLoopedData.Variable1HST += el.carhstAmt * myCurrentReduction;
        myLoopedData.Variable1PST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Variable 2':
        myLoopedData.Variable2 += el.carnetAmt * myCurrentReduction;
        myLoopedData.Variable2HST += el.carhstAmt * myCurrentReduction;
        myLoopedData.Variable2PST += el.carpstAmt * myCurrentReduction;
        break;
      case 'Variable 3':
        myLoopedData.Variable3 += el.carnetAmt * myCurrentReduction;
        myLoopedData.Variable3HST += el.carhstAmt * myCurrentReduction;
        myLoopedData.Variable3PST += el.carpstAmt * myCurrentReduction;
    }
  });
  homeExpReducedData = myLoopedData;
};

function loopDataByRentalCategory(data) {
  let myLoopedData = {
    Admin: 0,
    AdminHST: 0,
    AdminPST: 0,
    Advertising: 0,
    AdvertisingHST: 0,
    AdvertisingPST: 0,
    Insurance: 0,
    InsuranceHST: 0,
    InsurancePST: 0,
    Interest: 0,
    InterestHST: 0,
    InterestPST: 0,
    Legal: 0,
    LegalHST: 0,
    LegalPST: 0,
    Maintenance: 0,
    MaintenanceHST: 0,
    MaintenancePST: 0,
    MotorVehicle: 0,
    MotorVehicleHST: 0,
    MotorVehiclePST: 0,
    Office: 0,
    OfficeHST: 0,
    OfficePST: 0,
    Other: 0,
    OtherHST: 0,
    OtherPST: 0,
    PropertyTax: 0,
    PropertyTaxHST: 0,
    PropertyTaxPST: 0,
    Travel: 0,
    TravelHST: 0,
    TravelPST: 0,
    Utilities: 0,
    UtilitiesHST: 0,
    UtilitiesPST: 0,
    Wages: 0,
    WagesHST: 0,
    WagesPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0
  }

  data.forEach((el, index) => {
    switch (el.carExpCatSelect) {
      case 'Advertising':
        myLoopedData.Advertising += el.carnetAmt;
        myLoopedData.AdvertisingHST += el.carhstAmt;
        myLoopedData.AdvertisingPST += el.carpstAmt;
        break;
      case 'Insurance':
        myLoopedData.Insurance += el.carnetAmt;
        myLoopedData.InsuranceHST += el.carhstAmt;
        myLoopedData.InsurancePST += el.carpstAmt;
        break;
      case 'Interest':
        myLoopedData.Interest += el.carnetAmt;
        myLoopedData.InterestHST += el.carhstAmt;
        myLoopedData.InterestPST += el.carpstAmt;
        break;
      case 'Maintenance and repairs':
        myLoopedData.Maintenance += el.carnetAmt;
        myLoopedData.MaintenanceHST += el.carhstAmt;
        myLoopedData.MaintenancePST += el.carpstAmt;
        break;
      case 'Management and administration fees':
        myLoopedData.Admin += el.carnetAmt;
        myLoopedData.AdminHST += el.carhstAmt;
        myLoopedData.AdminPST += el.carpstAmt;
        break;
      case 'Motor vehicle expenses (Not including CCA)':
        myLoopedData.MotorVehicle += el.carnetAmt;
        myLoopedData.MotorVehicleHST += el.carhstAmt;
        myLoopedData.MotorVehiclePST += el.carpstAmt;
        break;
      case 'Office expenses':
        myLoopedData.Office += el.carnetAmt;
        myLoopedData.OfficeHST += el.carhstAmt;
        myLoopedData.OfficePST += el.carpstAmt;
        break;
      case 'Legal, accounting, and other Prof. Fees':
        myLoopedData.Legal += el.carnetAmt;
        myLoopedData.LegalHST += el.carhstAmt;
        myLoopedData.LegalPST += el.carpstAmt;
        break;
      case 'Property taxes':
        myLoopedData.PropertyTax += el.carnetAmt;
        myLoopedData.PropertyTaxHST += el.carhstAmt;
        myLoopedData.PropertyTaxPST += el.carpstAmt;
        break;
      case `Salaries, wages and benefits (incl employer's contributions)`:
        myLoopedData.Wages += el.carnetAmt;
        myLoopedData.WagesHST += el.carhstAmt;
        myLoopedData.WagesPST += el.carpstAmt;
        break;
      case 'Travel':
        myLoopedData.Travel += el.carnetAmt;
        myLoopedData.TravelHST += el.carhstAmt;
        myLoopedData.TravelPST += el.carpstAmt;
        break;
      case 'Utilities':
        myLoopedData.Utilities += el.carnetAmt;
        myLoopedData.UtilitiesHST += el.carhstAmt;
        myLoopedData.UtilitiesPST += el.carpstAmt;
        break;
      case 'Other expenses':
        myLoopedData.Other += el.carnetAmt;
        myLoopedData.OtherHST += el.carhstAmt;
        myLoopedData.OtherPST += el.carpstAmt;
        break;
      case 'Variable 1':
        myLoopedData.Variable1 += el.carnetAmt;
        myLoopedData.Variable1HST += el.carhstAmt;
        myLoopedData.Variable1PST += el.carpstAmt;
        break;
      case 'Variable 2':
        myLoopedData.Variable2 += el.carnetAmt;
        myLoopedData.Variable2HST += el.carhstAmt;
        myLoopedData.Variable2PST += el.carpstAmt;
        break;
    }
  });
  return myLoopedData;
};

function loopDataByOtherCostsCategory(data) {
  let myLoopedData = {
    Direct_Wage: 0,
    Direct_WageHST: 0,
    Direct_WagePST: 0,
    Goods: 0,
    GoodsHST: 0,
    GoodsPST: 0,
    Other_Costs: 0,
    Other_CostsHST: 0,
    Other_CostsPST: 0,
    Subcontracts: 0,
    SubcontractsHST: 0,
    SubcontractsPST: 0,
    Variable1: 0,
    Variable1HST: 0,
    Variable1PST: 0,
    Variable2: 0,
    Variable2HST: 0,
    Variable2PST: 0,
  }

  data.forEach((el, index) => {
    switch (el.carExpCatSelect) {
      case 'Goods Purchased during the year':
        myLoopedData.Goods += el.carnetAmt;
        myLoopedData.GoodsHST += el.carhstAmt;
        myLoopedData.GoodsPST += el.carpstAmt;
        break;
      case 'Subcontracts':
        myLoopedData.Subcontracts += el.carnetAmt;
        myLoopedData.SubcontractsHST += el.carhstAmt;
        myLoopedData.SubcontractsPST += el.carpstAmt;
        break;
      case 'Direct wage costs':
        myLoopedData.Direct_Wage += el.carnetAmt;
        myLoopedData.Direct_WageHST += el.carhstAmt;
        myLoopedData.Direct_WagePST += el.carpstAmt;
        break;
      case 'Other costs':
        myLoopedData.Other_Costs += el.carnetAmt;
        myLoopedData.Other_CostsHST += el.carhstAmt;
        myLoopedData.Other_CostsPST += el.carpstAmt;
        break;
      case 'Variable 1':
        myLoopedData.Variable1 += el.carnetAmt;
        myLoopedData.Variable1HST += el.carhstAmt;
        myLoopedData.Variable1PST += el.carpstAmt;
        break;
      case 'Variable 2':
        myLoopedData.Variable2 += el.carnetAmt;
        myLoopedData.Variable2HST += el.carhstAmt;
        myLoopedData.Variable2PST += el.carpstAmt;
    }
  });
  return myLoopedData;
};

function loopPaymentData() {
  let totalHST = 0;
  let totalPST = 0;
  let totalTax = 0;

  PaymentsArray.forEach((el, index) => {
    totalHST += el.hstAmt;
    totalPST += el.pstAmt;
    totalTax += el.taxAmt;
  });
  return {
    myHST: totalHST,
    myPST: totalPST,
    myTax: totalTax,
  }
};


function loopData(data) {
  let totalNet = 0;
  let totalHST = 0;
  let totalPST = 0;

  data.forEach((el, index) => {
    totalNet += el.carnetAmt;
    totalHST += el.carhstAmt;
    totalPST += el.carpstAmt;
  });
  return {
    myNet: totalNet,
    myHST: totalHST,
    myPST: totalPST
  }
};
let V1BusPercent = 0;
let V2BusPercent = 0;
let HomePercent = 0;

function getHomePercentForDisplayText() {
  let myAvgPercent = 0;
  let percentFound = false;
  switch (myDOMs.main_page.SelectPeriod.value) {
    case 'Full Year':
      myAvgPercent = Number((dbMiscData.homePercJan + dbMiscData.homePercFeb + dbMiscData.homePercMar + dbMiscData.homePercApr + dbMiscData.homePercMay + dbMiscData.homePercJun + dbMiscData.homePercJul + dbMiscData.homePercAug + dbMiscData.homePercSep + dbMiscData.homePercOct + dbMiscData.homePercNov + dbMiscData.homePercDec) / 12);
      HomePercent = myAvgPercent
      if (myAvgPercent === dbMiscData.homePercJan) {
        percentFound = true;
      }
      break;
    case '1st ¼':
      myAvgPercent = Number((dbMiscData.homePercJan + dbMiscData.homePercFeb + dbMiscData.homePercMar) / 3);
      HomePercent = myAvgPercent
      if (myAvgPercent === dbMiscData.homePercJan) {
        percentFound = true;
      }
      break;
    case '2nd ¼':
      myAvgPercent = Number((dbMiscData.homePercApr + dbMiscData.homePercMay + dbMiscData.homePercJun) / 3);
      HomePercent = myAvgPercent
      if (myAvgPercent === dbMiscData.homePercApr) {
        percentFound = true;
      }
      break;
    case '3rd ¼':
      myAvgPercent = Number((dbMiscData.homePercJul + dbMiscData.homePercAug + dbMiscData.homePercSep) / 3);
      HomePercent = myAvgPercent
      if (myAvgPercent === dbMiscData.homePercJul) {
        percentFound = true;
      }
      break;
    case '4th ¼':
      myAvgPercent = Number((dbMiscData.homePercOct + dbMiscData.homePercNov + dbMiscData.homePercDec) / 3);
      HomePercent = myAvgPercent
      if (myAvgPercent === dbMiscData.homePercOct) {
        percentFound = true;
      }
      break;
    case 'January':
      myAvgPercent = Number(dbMiscData.homePercJan);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'February':
      myAvgPercent = Number(dbMiscData.homePercFeb);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'March':
      myAvgPercent = Number(dbMiscData.homePercMar);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'April':
      myAvgPercent = Number(dbMiscData.homePercApr);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'May':
      myAvgPercent = Number(dbMiscData.homePercMay);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'June':
      myAvgPercent = Number(dbMiscData.homePercJun);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'July':
      myAvgPercent = Number(dbMiscData.homePercJul);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'August':
      myAvgPercent = Number(dbMiscData.homePercAug);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'September':
      myAvgPercent = Number(dbMiscData.homePercSep);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'October':
      myAvgPercent = Number(dbMiscData.homePercOct);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'November':
      myAvgPercent = Number(dbMiscData.homePercNov);
      HomePercent = myAvgPercent
      percentFound = true;
      break;
    case 'December':
      myAvgPercent = Number(dbMiscData.homePercDec);
      HomePercent = myAvgPercent
      percentFound = true;
  }
  if (percentFound === false) {
    myDOMs.incomeStatement.HomeBodyElement.PercentDisplay.innerText = 'N/A';
  } else {
    myDOMs.incomeStatement.HomeBodyElement.PercentDisplay.innerText = `${HomePercent}%`;
  }
};

function toggleHomePercentButton() {
  if (myDOMs.incomeStatement.HomeBodyElement.PercentButton.innerText === '100 %') {
    myDOMs.incomeStatement.HomeBodyElement.PercentButton.innerText = `${HomePercent} %`;
    reduceHomeAmountPercentage();
  } else {
    myDOMs.incomeStatement.HomeBodyElement.PercentButton.innerText = '100 %';
    increaseHomeAmountPercentage();
  }
};

function reduceHomeAmountPercentage() {
  if (PST_Claim_Value === 'ITC') {
    myDOMs.incomeStatement.HomeBodyElement.ElectricitySpan.innerText = `$${formatNumber((homeExpReducedData.Electricity).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.HeatSpan.innerText = `$${formatNumber((homeExpReducedData.Heat).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.InsuranceSpan.innerText = `$${formatNumber((homeExpReducedData.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MaintenanceSpan.innerText = `$${formatNumber((homeExpReducedData.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MortgageSpan.innerText = `$${formatNumber((homeExpReducedData.Mortgage).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.OtherSpan.innerText = `$${formatNumber((homeExpReducedData.Other).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((homeExpReducedData.PropertyTax).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.WaterSpan.innerText = `$${formatNumber((homeExpReducedData.Water).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable1Span.innerText = `$${formatNumber((homeExpReducedData.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable2Span.innerText = `$${formatNumber((homeExpReducedData.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable3Span.innerText = `$${formatNumber((homeExpReducedData.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.TotalSpan.innerText = `$${formatNumber((homeExpReducedData.totalNet).toFixed(2))}`

  } else if (PST_Claim_Value === 'EXP') {

    myDOMs.incomeStatement.HomeBodyElement.ElectricitySpan.innerText = `$${formatNumber((homeExpReducedData.Electricity + homeExpReducedData.ElectricityPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.HeatSpan.innerText = `$${formatNumber((homeExpReducedData.Heat + homeExpReducedData.HeatPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.InsuranceSpan.innerText = `$${formatNumber((homeExpReducedData.Insurance + homeExpReducedData.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MaintenanceSpan.innerText = `$${formatNumber((homeExpReducedData.Maintenance + homeExpReducedData.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MortgageSpan.innerText = `$${formatNumber((homeExpReducedData.Mortgage + homeExpReducedData.MortgagePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.OtherSpan.innerText = `$${formatNumber((homeExpReducedData.Other + homeExpReducedData.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((homeExpReducedData.PropertyTax + homeExpReducedData.PropertyTaxPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.WaterSpan.innerText = `$${formatNumber((homeExpReducedData.Water + homeExpReducedData.WaterPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable1Span.innerText = `$${formatNumber((homeExpReducedData.Variable1 + homeExpReducedData.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable2Span.innerText = `$${formatNumber((homeExpReducedData.Variable2 + homeExpReducedData.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable3Span.innerText = `$${formatNumber((homeExpReducedData.Variable3 + homeExpReducedData.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.TotalSpan.innerText = `$${formatNumber((homeExpReducedData.totalNet + homeExpReducedData.totalPST).toFixed(2))}`
  }
};


function increaseHomeAmountPercentage() {

  if (PST_Claim_Value === 'ITC') {

    myDOMs.incomeStatement.HomeBodyElement.ElectricitySpan.innerText = `$${formatNumber((mainData.homeExp.Electricity).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.HeatSpan.innerText = `$${formatNumber((mainData.homeExp.Heat).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.homeExp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.homeExp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MortgageSpan.innerText = `$${formatNumber((mainData.homeExp.Mortgage).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.homeExp.Other).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((mainData.homeExp.PropertyTax).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.WaterSpan.innerText = `$${formatNumber((mainData.homeExp.Water).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.homeExp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.homeExp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable3Span.innerText = `$${formatNumber((mainData.homeExp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.homeExp.net).toFixed(2))}`

  } else if (PST_Claim_Value === 'EXP') {

    myDOMs.incomeStatement.HomeBodyElement.ElectricitySpan.innerText = `$${formatNumber((mainData.homeExp.Electricity + mainData.homeExp.ElectricityPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.HeatSpan.innerText = `$${formatNumber((mainData.homeExp.Heat + mainData.homeExp.HeatPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.homeExp.Insurance + mainData.homeExp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.homeExp.Maintenance + mainData.homeExp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.MortgageSpan.innerText = `$${formatNumber((mainData.homeExp.Mortgage + mainData.homeExp.MortgagePST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.OtherSpan.innerText = `$${formatNumber((mainData.homeExp.Other + mainData.homeExp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.PropertyTaxSpan.innerText = `$${formatNumber((mainData.homeExp.PropertyTax + mainData.homeExp.PropertyTaxPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.WaterSpan.innerText = `$${formatNumber((mainData.homeExp.Water + mainData.homeExp.WaterPST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable1Span.innerText = `$${formatNumber((mainData.homeExp.Variable1 + mainData.homeExp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable2Span.innerText = `$${formatNumber((mainData.homeExp.Variable2 + mainData.homeExp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.Variable3Span.innerText = `$${formatNumber((mainData.homeExp.Variable3 + mainData.homeExp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.HomeBodyElement.TotalSpan.innerText = `$${formatNumber((mainData.homeExp.net + mainData.homeExp.pst).toFixed(2))}`

  };

};

function toggleVehicle1PercentButton() {

  if (myDOMs.incomeStatement.Vehicle1BodyElement.PercentButton.innerText === '100 %') {
    myDOMs.incomeStatement.Vehicle1BodyElement.PercentButton.innerText = `${V1BusPercent} %`;
    reduceVehicle1AmountPercentage();
  } else {
    myDOMs.incomeStatement.Vehicle1BodyElement.PercentButton.innerText = '100 %';
    increaseVehicle1AmountPercentage();
  }
}

function toggleVehicle2PercentButton() {
  if (myDOMs.incomeStatement.Vehicle2BodyElement.PercentButton.innerText === '100 %') {
    myDOMs.incomeStatement.Vehicle2BodyElement.PercentButton.innerText = `${V2BusPercent} %`;
    reduceVehicle2AmountPercentage();
  } else {
    myDOMs.incomeStatement.Vehicle2BodyElement.PercentButton.innerText = '100 %';
    increaseVehicle2AmountPercentage();
  }
}

async function getVehiclePercentage() {
  let percentFound = false;
  let myEndDate = new Date(myDOMs.main_page.EndDate.value);
  let myStartDate = new Date(myDOMs.main_page.StartDate.value);


  await getAllVehicleLogs();
  calculateBusinessPercentage(myEndDate, true);

  switch (myStartDate.getUTCMonth()) {
    case 0:
      switch (myEndDate.getUTCMonth()) {
        case 0:
          V1BusPercent = BusPercJanV1;
          V2BusPercent = BusPercJanV2;
          percentFound = true;
          break;
        case 2:
          V1BusPercent = BusinessPercentQ1V1;
          V2BusPercent = BusinessPercentQ1V2;
          percentFound = true;
          break;
        case 11:
          V1BusPercent = BusinessPercentYearV1;
          V2BusPercent = BusinessPercentYearV2;
          percentFound = true;
          break;
      }
      break;
    case 1:
      switch (myEndDate.getUTCMonth()) {
        case 1:
          V1BusPercent = BusPercFebV1;
          V2BusPercent = BusPercFebV2;
          percentFound = true;
      }
      break;
    case 2:
      switch (myEndDate.getUTCMonth()) {
        case 2:
          V1BusPercent = BusPercMarV1;
          V2BusPercent = BusPercMarV2;
          percentFound = true;
      }
      break;
    case 3:
      switch (myEndDate.getUTCMonth()) {
        case 3:
          V1BusPercent = BusPercAprV1;
          V2BusPercent = BusPercAprV2;
          percentFound = true;
          break;
        case 5:
          V1BusPercent = BusinessPercentQ2V1;
          V2BusPercent = BusinessPercentQ2V2;
          percentFound = true;
      }
      break;
    case 4:
      switch (myEndDate.getUTCMonth()) {
        case 4:
          V1BusPercent = BusPercMayV1;
          V2BusPercent = BusPercMayV2;
          percentFound = true;
      }
      break;
    case 5:
      switch (myEndDate.getUTCMonth()) {
        case 5:
          V1BusPercent = BusPercJunV1;
          V2BusPercent = BusPercJunV2;
          percentFound = true;
      }
      break;
    case 6:
      switch (myEndDate.getUTCMonth()) {
        case 6:
          V1BusPercent = BusPercJulV1;
          V2BusPercent = BusPercJulV2;
          percentFound = true;
          break;
        case 8:
          V1BusPercent = BusinessPercentQ3V1;
          V2BusPercent = BusinessPercentQ3V2;
          percentFound = true;
      }
      break;
    case 7:
      switch (myEndDate.getUTCMonth()) {
        case 7:
          V1BusPercent = BusPercAugV1;
          V2BusPercent = BusPercAugV2;
          percentFound = true;
      }
      break;
    case 8:
      switch (myEndDate.getUTCMonth()) {
        case 8:
          V1BusPercent = BusPercSepV1;
          V2BusPercent = BusPercSepV2;
          percentFound = true;
      }
      break;
    case 9:
      switch (myEndDate.getUTCMonth()) {
        case 9:
          V1BusPercent = BusPercOctV1;
          V2BusPercent = BusPercOctV2;
          percentFound = true;
          break;
        case 11:
          V1BusPercent = BusinessPercentQ4V1;
          V2BusPercent = BusinessPercentQ4V2;
          percentFound = true;
      }
      break;
    case 10:
      switch (myEndDate.getUTCMonth()) {
        case 10:
          V1BusPercent = BusPercNovV1;
          V2BusPercent = BusPercNovV2;
          percentFound = true;
      }
      break;
    case 11:
      switch (myEndDate.getUTCMonth()) {
        case 11:
          V1BusPercent = BusPercDecV1;
          V2BusPercent = BusPercDecV2;
          percentFound = true;
      }
  }

  if (percentFound === false) {
    myDOMs.incomeStatement.Vehicle1BodyElement.PercentDisplay.innerText = 'N/A';
    myDOMs.incomeStatement.Vehicle1BodyElement.PercentTextDisplay.innerHTML = `Vehicle 1 % is not Calculated for none-standard Time Period!`;
    myDOMs.incomeStatement.Vehicle2BodyElement.PercentDisplay.innerText = 'N/A';
    myDOMs.incomeStatement.Vehicle2BodyElement.PercentTextDisplay.innerText = `Vehicle 2 % is not Calculated for none-standard Time Period!`;
  } else {
    myDOMs.incomeStatement.Vehicle1BodyElement.PercentDisplay.innerText = `${V1BusPercent}%`;
    myDOMs.incomeStatement.Vehicle1BodyElement.PercentTextDisplay.innerHTML = `Vehicle 1 % for ${myDOMs.main_page.SelectPeriod.value}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.PercentDisplay.innerText = `${V2BusPercent}%`;
    myDOMs.incomeStatement.Vehicle2BodyElement.PercentTextDisplay.innerText = `Vehicle 2 % for ${myDOMs.main_page.SelectPeriod.value}`;
  }
}

function reduceVehicle1AmountPercentage() {
  let V1Reduction = V1BusPercent / 100;
  let reducedTotal = 0;

  if (PST_Claim_Value === 'ITC') {
    myDOMs.incomeStatement.Vehicle1BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Fuel * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Insurance * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Leasing * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.LoanInterest * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Maintenance * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Other * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Registration * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable1 * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable2 * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable3 * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Parking).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.SuppInsurance).toFixed(2))}`
    reducedTotal = (mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.Other + mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable3) * V1Reduction;
  } else if (PST_Claim_Value === 'EXP') {
    myDOMs.incomeStatement.Vehicle1BodyElement.FuelSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.FuelPST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.InsuranceSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.InsurancePST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.LeasingSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LeasingPST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.LoanInterestSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.LoanInterestPST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.MaintenanceSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.MaintenancePST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.OtherSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.Other + mainData.vehicle1Exp.OtherPST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.RegistrationSpan.innerText = `$${formatNumber(((mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.RegistrationPST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable1Span.innerText = `$${formatNumber(((mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable1PST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable2Span.innerText = `$${formatNumber(((mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable2PST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable3Span.innerText = `$${formatNumber(((mainData.vehicle1Exp.Variable3 + mainData.vehicle1Exp.Variable3PST) * V1Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle1BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.ParkingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.SuppInsurance + mainData.vehicle1Exp.SuppInsurancePST).toFixed(2))}`
    reducedTotal = (mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.Other + mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable3) * V1Reduction;
    reducedTotal += (mainData.vehicle1Exp.FuelPST + mainData.vehicle1Exp.InsurancePST + mainData.vehicle1Exp.LeasingPST + mainData.vehicle1Exp.LoanInterestPST + mainData.vehicle1Exp.MaintenancePST + mainData.vehicle1Exp.OtherPST + mainData.vehicle1Exp.RegistrationPST + mainData.vehicle1Exp.Variable1PST + mainData.vehicle1Exp.Variable2PST + mainData.vehicle1Exp.Variable3PST) * V1Reduction;
  }

  reducedTotal += mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.SuppInsurance
  myDOMs.incomeStatement.Vehicle1BodyElement.TotalSpan.innerText = `$${formatNumber((reducedTotal).toFixed(2))}`

};

function reduceVehicle2AmountPercentage() {
  let V2Reduction = V2BusPercent / 100;
  let reducedTotal = 0;

  if (PST_Claim_Value === 'ITC') {
    myDOMs.incomeStatement.Vehicle2BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Fuel * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Insurance * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Leasing * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.LoanInterest * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Maintenance * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Other * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Registration * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable1 * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable2 * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable3 * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Parking).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.SuppInsurance).toFixed(2))}`
    reducedTotal = (mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.Other + mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable3) * V2Reduction;
  } else if (PST_Claim_Value === 'EXP') {
    myDOMs.incomeStatement.Vehicle2BodyElement.FuelSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.FuelPST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.InsuranceSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.InsurancePST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.LeasingSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LeasingPST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.LoanInterestSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.LoanInterestPST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.MaintenanceSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.MaintenancePST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.OtherSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.Other + mainData.vehicle2Exp.OtherPST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.RegistrationSpan.innerText = `$${formatNumber(((mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.RegistrationPST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable1Span.innerText = `$${formatNumber(((mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable1PST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable2Span.innerText = `$${formatNumber(((mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable2PST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable3Span.innerText = `$${formatNumber(((mainData.vehicle2Exp.Variable3 + mainData.vehicle2Exp.Variable3PST) * V2Reduction).toFixed(2))}`;
    myDOMs.incomeStatement.Vehicle2BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.ParkingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.SuppInsurance + mainData.vehicle2Exp.SuppInsurancePST).toFixed(2))}`
    reducedTotal = (mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.Other + mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable3) * V2Reduction;
    reducedTotal += (mainData.vehicle2Exp.FuelPST + mainData.vehicle2Exp.InsurancePST + mainData.vehicle2Exp.LeasingPST + mainData.vehicle2Exp.LoanInterestPST + mainData.vehicle2Exp.MaintenancePST + mainData.vehicle2Exp.OtherPST + mainData.vehicle2Exp.RegistrationPST + mainData.vehicle2Exp.Variable1PST + mainData.vehicle2Exp.Variable2PST + mainData.vehicle2Exp.Variable3PST) * V2Reduction;
  }

  reducedTotal += mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.SuppInsurance
  myDOMs.incomeStatement.Vehicle2BodyElement.TotalSpan.innerText = `$${formatNumber((reducedTotal).toFixed(2))}`


};

function increaseVehicle1AmountPercentage() {
  if (PST_Claim_Value === 'ITC') {
    myDOMs.incomeStatement.Vehicle1BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Fuel).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Leasing).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.LoanInterest).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Other).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Parking).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Registration).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.SuppInsurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.net).toFixed(2))}`
  } else if (PST_Claim_Value === 'EXP') {
    myDOMs.incomeStatement.Vehicle1BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Fuel + mainData.vehicle1Exp.FuelPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Insurance + mainData.vehicle1Exp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Leasing + mainData.vehicle1Exp.LeasingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.LoanInterest + mainData.vehicle1Exp.LoanInterestPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Maintenance + mainData.vehicle1Exp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Other + mainData.vehicle1Exp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Parking + mainData.vehicle1Exp.ParkingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.Registration + mainData.vehicle1Exp.RegistrationPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.SuppInsurance + mainData.vehicle1Exp.SuppInsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable1 + mainData.vehicle1Exp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable2 + mainData.vehicle1Exp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle1Exp.Variable3 + mainData.vehicle1Exp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle1BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle1Exp.net + mainData.vehicle1Exp.pst).toFixed(2))}`
  }
};

function increaseVehicle2AmountPercentage() {
  if (PST_Claim_Value === 'ITC') {
    myDOMs.incomeStatement.Vehicle2BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Fuel).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Insurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Leasing).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.LoanInterest).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Maintenance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Other).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Parking).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Registration).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.SuppInsurance).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable1).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable2).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable3).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.net).toFixed(2))}`
  } else if (PST_Claim_Value === 'EXP') {
    myDOMs.incomeStatement.Vehicle2BodyElement.FuelSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Fuel + mainData.vehicle2Exp.FuelPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.InsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Insurance + mainData.vehicle2Exp.InsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LeasingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Leasing + mainData.vehicle2Exp.LeasingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.LoanInterestSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.LoanInterest + mainData.vehicle2Exp.LoanInterestPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.MaintenanceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Maintenance + mainData.vehicle2Exp.MaintenancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.OtherSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Other + mainData.vehicle2Exp.OtherPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.ParkingSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Parking + mainData.vehicle2Exp.ParkingPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.RegistrationSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.Registration + mainData.vehicle2Exp.RegistrationPST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.SuppInsuranceSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.SuppInsurance + mainData.vehicle2Exp.SuppInsurancePST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable1Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable1 + mainData.vehicle2Exp.Variable1PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable2Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable2 + mainData.vehicle2Exp.Variable2PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.Variable3Span.innerText = `$${formatNumber((mainData.vehicle2Exp.Variable3 + mainData.vehicle2Exp.Variable3PST).toFixed(2))}`
    myDOMs.incomeStatement.Vehicle2BodyElement.TotalSpan.innerText = `$${formatNumber((mainData.vehicle2Exp.net + mainData.vehicle2Exp.pst).toFixed(2))}`
  }
};


//Business
function displayAdvertisingReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Advertising;
  myReportTotal.totalHST = mainData.busExp.AdvertisingHST;
  myReportTotal.totalPST = mainData.busExp.AdvertisingPST;
  myReportTotal.category = 'Advertising';
  getBusinessExpenses('Advertising');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayDuesReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Dues;
  myReportTotal.totalHST = mainData.busExp.DuesHST;
  myReportTotal.totalPST = mainData.busExp.DuesPST;
  myReportTotal.category = 'Dues';
  getBusinessExpenses('Fees, licences, dues, memberships');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayMealsReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Meals * 2;
  myReportTotal.totalHST = mainData.busExp.MealsHST * 2;
  myReportTotal.totalPST = mainData.busExp.MealsPST * 2;
  myReportTotal.category = 'Meals';
  getBusinessExpenses('Meals and Entertainment');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayOfficeReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Office;
  myReportTotal.totalHST = mainData.busExp.OfficeHST;
  myReportTotal.totalPST = mainData.busExp.OfficePST;
  myReportTotal.category = 'Office';
  getBusinessExpenses('Office Expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displaySuppliesReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Supplies;
  myReportTotal.totalHST = mainData.busExp.SuppliesHST;
  myReportTotal.totalPST = mainData.busExp.SuppliesPST;
  myReportTotal.category = 'Supplies';
  getBusinessExpenses('Supplies');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayCellReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Cell;
  myReportTotal.totalHST = mainData.busExp.CellHST;
  myReportTotal.totalPST = mainData.busExp.CellPST;
  myReportTotal.category = 'Cell';
  getBusinessExpenses('Cell Phone');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayOtherReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Other;
  myReportTotal.totalHST = mainData.busExp.OtherHST;
  myReportTotal.totalPST = mainData.busExp.OtherPST;
  myReportTotal.category = 'Other';
  getBusinessExpenses('Other Expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayFreightReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Freight;
  myReportTotal.totalHST = mainData.busExp.FreightHST;
  myReportTotal.totalPST = mainData.busExp.FreightPST;
  myReportTotal.category = 'Freight';
  getBusinessExpenses('Delivery, freight, and express');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayFuelReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Fuel;
  myReportTotal.totalHST = mainData.busExp.FuelHST;
  myReportTotal.totalPST = mainData.busExp.FuelPST;
  myReportTotal.category = 'Fuel';
  getBusinessExpenses('Fuel costs (except vehicles)');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayInsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Insurance;
  myReportTotal.totalHST = mainData.busExp.InsuranceHST;
  myReportTotal.totalPST = mainData.busExp.InsurancePST;
  myReportTotal.category = 'Insurance';
  getBusinessExpenses('Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayInterestReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Interest;
  myReportTotal.totalHST = mainData.busExp.InterestHST;
  myReportTotal.totalPST = mainData.busExp.InterestPST;
  myReportTotal.category = 'Interest';
  getBusinessExpenses('Interest');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayMaintenanceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Maintenance;
  myReportTotal.totalHST = mainData.busExp.MaintenanceHST;
  myReportTotal.totalPST = mainData.busExp.MaintenancePST;
  myReportTotal.category = 'Maintenance';
  getBusinessExpenses('Maintenance and Repairs');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayAdminReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Admin;
  myReportTotal.totalHST = mainData.busExp.AdminHST;
  myReportTotal.totalPST = mainData.busExp.AdminPST;
  myReportTotal.category = 'Admin';
  getBusinessExpenses('Management and administration fees');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayLegalReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Legal;
  myReportTotal.totalHST = mainData.busExp.LegalHST;
  myReportTotal.totalPST = mainData.busExp.LegalPST;
  myReportTotal.category = 'Legal';
  getBusinessExpenses('Legal, accounting, and other Prof. Fees');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayPropertyTaxReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Property_Tax;
  myReportTotal.totalHST = mainData.busExp.Property_TaxHST;
  myReportTotal.totalPST = mainData.busExp.Property_TaxPST;
  myReportTotal.category = 'Property_Tax';
  getBusinessExpenses('Property Taxes');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Rent;
  myReportTotal.totalHST = mainData.busExp.RentHST;
  myReportTotal.totalPST = mainData.busExp.RentPST;
  myReportTotal.category = 'Rent';
  getBusinessExpenses('Rent');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayWagesReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Wages;
  myReportTotal.totalHST = mainData.busExp.WagesHST;
  myReportTotal.totalPST = mainData.busExp.WagesPST;
  myReportTotal.category = 'Wages';
  getBusinessExpenses('Salaries, wages, and benefits');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayTravelReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Travel;
  myReportTotal.totalHST = mainData.busExp.TravelHST;
  myReportTotal.totalPST = mainData.busExp.TravelPST;
  myReportTotal.category = 'Travel';
  getBusinessExpenses('Travel');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVariable1Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Variable1;
  myReportTotal.totalHST = mainData.busExp.Variable1HST;
  myReportTotal.totalPST = mainData.busExp.Variable1PST;
  myReportTotal.category = 'Variable1';
  getBusinessExpenses('Variable 1');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVariable2Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Variable2;
  myReportTotal.totalHST = mainData.busExp.Variable2HST;
  myReportTotal.totalPST = mainData.busExp.Variable2PST;
  myReportTotal.category = 'Variable2';
  getBusinessExpenses('Variable 2');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVariable3Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Variable3;
  myReportTotal.totalHST = mainData.busExp.Variable3HST;
  myReportTotal.totalPST = mainData.busExp.Variable3PST;
  myReportTotal.category = 'Variable3';
  getBusinessExpenses('Variable 3');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVariable4Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Variable4;
  myReportTotal.totalHST = mainData.busExp.Variable4HST;
  myReportTotal.totalPST = mainData.busExp.Variable4PST;
  myReportTotal.category = 'Variable4';
  getBusinessExpenses('Variable 4');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVariable5Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.busExp.Variable5;
  myReportTotal.totalHST = mainData.busExp.Variable5HST;
  myReportTotal.totalPST = mainData.busExp.Variable5PST;
  myReportTotal.category = 'Variable5';
  getBusinessExpenses('Variable 5');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayCCAReport() {
  // myReportTotal.totalNet = mainData.busExp.Advertising;
  // myReportTotal.totalHST = mainData.busExp.AdvertisingHST;
  // myReportTotal.totalPST = mainData.busExp.AdvertisingPST;
  // getBusinessExpenses('CCA');
  // hideIncomeStatementModal();
  // reOpenIncomeStatement = true;
}

//Home 

function displayHomeHeatReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Heat;
  myReportTotal.totalHST = mainData.homeExp.HeatHST;
  myReportTotal.totalPST = mainData.homeExp.HeatPST;
  myReportTotal.category = 'Heat';
  getHomeExpenses('Heat');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeElectricityReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Electricity;
  myReportTotal.totalHST = mainData.homeExp.ElectricityHST;
  myReportTotal.totalPST = mainData.homeExp.ElectricityPST;
  myReportTotal.category = 'Electricity';
  getHomeExpenses('Electricity');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeInsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Insurance;
  myReportTotal.totalHST = mainData.homeExp.InsuranceHST;
  myReportTotal.totalPST = mainData.homeExp.InsurancePST;
  myReportTotal.category = 'Insurance';
  getHomeExpenses('Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayhomeMaintenanceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Maintenance;
  myReportTotal.totalHST = mainData.homeExp.MaintenanceHST;
  myReportTotal.totalPST = mainData.homeExp.MaintenancePST;
  myReportTotal.category = 'Maintenance';
  getHomeExpenses('Maintenance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeMortgageReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Mortgage;
  myReportTotal.totalHST = mainData.homeExp.MortgageHST;
  myReportTotal.totalPST = mainData.homeExp.MortgagePST;
  myReportTotal.category = 'Mortgage';
  getHomeExpenses('Mortgage Interest');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomePropertyTaxesReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.PropertyTax;
  myReportTotal.totalHST = mainData.homeExp.PropertyTaxHST;
  myReportTotal.totalPST = mainData.homeExp.PropertyTaxPST;
  myReportTotal.category = 'PropertyTax';
  getHomeExpenses('Property Taxes');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeOtherReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Other;
  myReportTotal.totalHST = mainData.homeExp.OtherHST;
  myReportTotal.totalPST = mainData.homeExp.OtherPST;
  myReportTotal.category = 'Other';
  getHomeExpenses('Other Expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeWaterReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Water;
  myReportTotal.totalHST = mainData.homeExp.WaterHST;
  myReportTotal.totalPST = mainData.homeExp.WaterPST;
  myReportTotal.category = 'Water';
  getHomeExpenses('Water and Sewage');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeVariable1Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Variable1;
  myReportTotal.totalHST = mainData.homeExp.Variable1HST;
  myReportTotal.totalPST = mainData.homeExp.Variable1PST;
  myReportTotal.category = 'Variable1';
  getHomeExpenses('Variable 1');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeVariable2Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Variable2;
  myReportTotal.totalHST = mainData.homeExp.Variable2HST;
  myReportTotal.totalPST = mainData.homeExp.Variable2PST;
  myReportTotal.category = 'Variable2';
  getHomeExpenses('Variable 2');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayHomeVariable3Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.homeExp.Variable3;
  myReportTotal.totalHST = mainData.homeExp.Variable3HST;
  myReportTotal.totalPST = mainData.homeExp.Variable3PST;
  myReportTotal.category = 'Variable3';
  getHomeExpenses('Variable 3');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

//Vehicle 1 

function displayVehicle1FuelReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Fuel;
  myReportTotal.totalHST = mainData.vehicle1Exp.FuelHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.FuelPST;
  myReportTotal.category = 'Fuel';
  getVehicleExpenses(1, 'Fuel and Oil');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1InterestLoanReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.LoanInterest;
  myReportTotal.totalHST = mainData.vehicle1Exp.LoanInterestHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.LoanInterestPST;
  myReportTotal.category = 'LoanInterest';
  getVehicleExpenses(1, 'Interest on Loan');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1InsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Insurance;
  myReportTotal.totalHST = mainData.vehicle1Exp.InsuranceHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.InsurancePST;
  myReportTotal.category = 'Insurance';
  getVehicleExpenses(1, 'Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1RegistrationReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Registration;
  myReportTotal.totalHST = mainData.vehicle1Exp.RegistrationHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.RegistrationPST;
  myReportTotal.category = 'Registration';
  getVehicleExpenses(1, 'Licence and Registration');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1MaintenanceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Maintenance;
  myReportTotal.totalHST = mainData.vehicle1Exp.MaintenanceHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.MaintenancePST;
  myReportTotal.category = 'Maintenance';
  getVehicleExpenses(1, 'Maintenance and Repairs');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1LeasingReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Leasing;
  myReportTotal.totalHST = mainData.vehicle1Exp.LeasingHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.LeasingPST;
  myReportTotal.category = 'Leasing';
  getVehicleExpenses(1, 'Leasing');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1OtherReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Other;
  myReportTotal.totalHST = mainData.vehicle1Exp.OtherHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.OtherPST;
  myReportTotal.category = 'Other';
  getVehicleExpenses(1, 'Other Expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1Variable1Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Variable1;
  myReportTotal.totalHST = mainData.vehicle1Exp.Variable1HST;
  myReportTotal.totalPST = mainData.vehicle1Exp.Variable1PST;
  myReportTotal.category = 'Variable1';
  getVehicleExpenses(1, 'Variable 1');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1Variable2Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Variable2;
  myReportTotal.totalHST = mainData.vehicle1Exp.Variable2HST;
  myReportTotal.totalPST = mainData.vehicle1Exp.Variable2PST;
  myReportTotal.category = 'Variable2';
  getVehicleExpenses(1, 'Variable 2');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1Variable3Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Variable3;
  myReportTotal.totalHST = mainData.vehicle1Exp.Variable3HST;
  myReportTotal.totalPST = mainData.vehicle1Exp.Variable3PST;
  myReportTotal.category = 'Variable3';
  getVehicleExpenses(1, 'Variable 3');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayvehicle1BusParkReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.Parking;
  myReportTotal.totalHST = mainData.vehicle1Exp.ParkingHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.ParkingPST;
  myReportTotal.category = 'Parking';
  getVehicleExpenses(1, 'Business Parking Fees');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle1SuppInsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle1Exp.SuppInsurance;
  myReportTotal.totalHST = mainData.vehicle1Exp.SuppInsuranceHST;
  myReportTotal.totalPST = mainData.vehicle1Exp.SuppInsurancePST;
  myReportTotal.category = 'SuppInsurance';
  getVehicleExpenses(1, 'Supplementary Business Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

//Vehicle 2

function displayVehicle2FuelReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Fuel;
  myReportTotal.totalHST = mainData.vehicle2Exp.FuelHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.FuelPST;
  myReportTotal.category = 'Fuel';
  getVehicleExpenses(2, 'Fuel and Oil');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2InterestLoanReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.LoanInterest;
  myReportTotal.totalHST = mainData.vehicle2Exp.LoanInterestHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.LoanInterestPST;
  myReportTotal.category = 'LoanInterest';
  getVehicleExpenses(2, 'Interest on Loan');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2InsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Insurance;
  myReportTotal.totalHST = mainData.vehicle2Exp.InsuranceHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.InsurancePST;
  myReportTotal.category = 'Insurance';
  getVehicleExpenses(2, 'Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2RegistrationReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Registration;
  myReportTotal.totalHST = mainData.vehicle2Exp.RegistrationHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.RegistrationPST;
  myReportTotal.category = 'Registration';
  getVehicleExpenses(2, 'Licence and Registration');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2MaintenanceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Maintenance;
  myReportTotal.totalHST = mainData.vehicle2Exp.MaintenanceHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.MaintenancePST;
  myReportTotal.category = 'Maintenance';
  getVehicleExpenses(2, 'Maintenance and Repairs');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2LeasingReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Leasing;
  myReportTotal.totalHST = mainData.vehicle2Exp.LeasingHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.LeasingPST;
  myReportTotal.category = 'Leasing';
  getVehicleExpenses(2, 'Leasing');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2OtherReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Other;
  myReportTotal.totalHST = mainData.vehicle2Exp.OtherHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.OtherPST;
  myReportTotal.category = 'Other';
  getVehicleExpenses(2, 'Other Expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2Variable1Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Variable1;
  myReportTotal.totalHST = mainData.vehicle2Exp.Variable1HST;
  myReportTotal.totalPST = mainData.vehicle2Exp.Variable1PST;
  myReportTotal.category = 'Variable1';
  getVehicleExpenses(2, 'Variable 1');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2Variable2Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Variable2;
  myReportTotal.totalHST = mainData.vehicle2Exp.Variable2HST;
  myReportTotal.totalPST = mainData.vehicle2Exp.Variable2PST;
  myReportTotal.category = 'Variable2';
  getVehicleExpenses(2, 'Variable 2');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2Variable3Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Variable3;
  myReportTotal.totalHST = mainData.vehicle2Exp.Variable3HST;
  myReportTotal.totalPST = mainData.vehicle2Exp.Variable3PST;
  myReportTotal.category = 'Variable3';
  getVehicleExpenses(2, 'Variable 3');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayvehicle2BusParkReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.Parking;
  myReportTotal.totalHST = mainData.vehicle2Exp.ParkingHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.ParkingPST;
  myReportTotal.category = 'Parking';
  getVehicleExpenses(2, 'Business Parking Fees');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayVehicle2SuppInsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.vehicle2Exp.SuppInsurance;
  myReportTotal.totalHST = mainData.vehicle2Exp.SuppInsuranceHST;
  myReportTotal.totalPST = mainData.vehicle2Exp.SuppInsurancePST;
  myReportTotal.category = 'SuppInsurance';
  getVehicleExpenses(2, 'Supplementary Business Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}


//Rental 

function displayRentalAdvertisingReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Advertising;
  myReportTotal.totalHST = mainData.rentalExp.AdvertisingHST;
  myReportTotal.totalPST = mainData.rentalExp.AdvertisingPST;
  myReportTotal.category = 'Advertising';
  getRentalExpenses('Advertising');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalInsuranceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Insurance;
  myReportTotal.totalHST = mainData.rentalExp.InsuranceHST;
  myReportTotal.totalPST = mainData.rentalExp.InsurancePST;
  myReportTotal.category = 'Insurance';
  getRentalExpenses('Insurance');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalInterestReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Interest;
  myReportTotal.totalHST = mainData.rentalExp.InterestHST;
  myReportTotal.totalPST = mainData.rentalExp.InterestPST;
  myReportTotal.category = 'Interest';
  getRentalExpenses('Interest');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalMaintenanceReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Maintenance;
  myReportTotal.totalHST = mainData.rentalExp.MaintenanceHST;
  myReportTotal.totalPST = mainData.rentalExp.MaintenancePST;
  myReportTotal.category = 'Maintenance';
  getRentalExpenses('Maintenance and repairs');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalAdminReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Admin;
  myReportTotal.totalHST = mainData.rentalExp.AdminHST;
  myReportTotal.totalPST = mainData.rentalExp.AdminPST;
  myReportTotal.category = 'Admin';
  getRentalExpenses('Management and administration fees');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalMotorReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.MotorVehicle;
  myReportTotal.totalHST = mainData.rentalExp.MotorVehicleHST;
  myReportTotal.totalPST = mainData.rentalExp.MotorVehiclePST;
  myReportTotal.category = 'MotorVehicle';
  getRentalExpenses('Motor vehicle expenses (Not including CCA)');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalOfficeReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Office;
  myReportTotal.totalHST = mainData.rentalExp.OfficeHST;
  myReportTotal.totalPST = mainData.rentalExp.OfficePST;
  myReportTotal.category = 'Office';
  getRentalExpenses('Office expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalLegalReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Legal;
  myReportTotal.totalHST = mainData.rentalExp.LegalHST;
  myReportTotal.totalPST = mainData.rentalExp.LegalPST;
  myReportTotal.category = 'Legal';
  getRentalExpenses('Legal, accounting, and other Prof. Fees');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalPropertyTaxReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.PropertyTax;
  myReportTotal.totalHST = mainData.rentalExp.PropertyTaxHST;
  myReportTotal.totalPST = mainData.rentalExp.PropertyTaxPST;
  myReportTotal.category = 'PropertyTax';
  getRentalExpenses('Property taxes');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalWagesReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Wages;
  myReportTotal.totalHST = mainData.rentalExp.WagesHST;
  myReportTotal.totalPST = mainData.rentalExp.WagesPST;
  myReportTotal.category = 'Wages';
  getRentalExpenses(`Salaries, wages and benefits (incl employer's contributions)`);
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalTravelReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Travel;
  myReportTotal.totalHST = mainData.rentalExp.TravelHST;
  myReportTotal.totalPST = mainData.rentalExp.TravelPST;
  myReportTotal.category = 'Travel';
  getRentalExpenses('Travel');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalUtilitiesReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Utilities;
  myReportTotal.totalHST = mainData.rentalExp.UtilitiesHST;
  myReportTotal.totalPST = mainData.rentalExp.UtilitiesPST;
  myReportTotal.category = 'Utilities';
  getRentalExpenses('Utilities');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalOtherReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Other;
  myReportTotal.totalHST = mainData.rentalExp.OtherHST;
  myReportTotal.totalPST = mainData.rentalExp.OtherPST;
  myReportTotal.category = 'Other';
  getRentalExpenses('Other expenses');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalVariable1Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Variable1;
  myReportTotal.totalHST = mainData.rentalExp.Variable1HST;
  myReportTotal.totalPST = mainData.rentalExp.Variable1PST;
  myReportTotal.category = 'Variable1';
  getRentalExpenses('Variable 1');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalVariable2Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.rentalExp.Variable2;
  myReportTotal.totalHST = mainData.rentalExp.Variable2HST;
  myReportTotal.totalPST = mainData.rentalExp.Variable2PST;
  myReportTotal.category = 'Variable2';
  getRentalExpenses('Variable 2');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}


//Other 

function displayotherGoodsReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.otherCostsExp.Goods;
  myReportTotal.totalHST = mainData.otherCostsExp.GoodsHST;
  myReportTotal.totalPST = mainData.otherCostsExp.GoodsPST;
  myReportTotal.category = 'Goods';
  getOtherExpenses('Goods Purchased during the year');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayotherSubcontractsReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.otherCostsExp.Subcontracts;
  myReportTotal.totalHST = mainData.otherCostsExp.SubcontractsHST;
  myReportTotal.totalPST = mainData.otherCostsExp.SubcontractsPST;
  myReportTotal.category = 'Subcontracts';
  getOtherExpenses('Subcontracts');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayotherDirectWageCostReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.otherCostsExp.Direct_Wage;
  myReportTotal.totalHST = mainData.otherCostsExp.Direct_WageHST;
  myReportTotal.totalPST = mainData.otherCostsExp.Direct_WagePST;
  myReportTotal.category = 'Direct_Wage';
  getOtherExpenses('Direct wage costs');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayOtherOtherCostsReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.otherCostsExp.Other_Costs;
  myReportTotal.totalHST = mainData.otherCostsExp.Other_CostsHST;
  myReportTotal.totalPST = mainData.otherCostsExp.Other_CostsPST;
  myReportTotal.category = 'Other_Costs';
  getOtherExpenses('Other costs');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayOtherVariable1Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.otherCostsExp.Variable1;
  myReportTotal.totalHST = mainData.otherCostsExp.Variable1HST;
  myReportTotal.totalPST = mainData.otherCostsExp.Variable1PST;
  myReportTotal.category = 'Variable1';
  getOtherExpenses('Variable 1');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayOtherVariable2Report() {
  if (TableOpen) {
    hideTableAlert();
  }
  myReportTotal.totalNet = mainData.otherCostsExp.Variable2;
  myReportTotal.totalHST = mainData.otherCostsExp.Variable2HST;
  myReportTotal.totalPST = mainData.otherCostsExp.Variable2PST;
  myReportTotal.category = 'Variable2';
  getOtherExpenses('Variable 2');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

//Income 

function displayBusinessIncomeReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  // myReportTotal.totalNet = mainData.RevenueBus.net;
  // myReportTotal.totalHST = mainData.RevenueBus.hst;
  // myReportTotal.totalPST = mainData.RevenueBus.pst;
  getIncomeExpenses('Business');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

function displayRentalIncomeReport() {
  if (TableOpen) {
    hideTableAlert();
  }
  // myReportTotal.totalNet = mainData.RevenueRental.net;
  // myReportTotal.totalHST = mainData.RevenueRental.hst;
  // myReportTotal.totalPST = mainData.RevenueRental.pst;
  getIncomeExpenses('Rental');
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}

//Assets
function displayCCAReport() {
  getFixedAssets();
  hideIncomeStatementModal();
  reOpenIncomeStatement = true;
}
