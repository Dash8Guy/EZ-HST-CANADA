let myToken;
//URL Variable
let serverURL = window.location.pathname;
//alert(serverURL);
//Variable to keep track of populated category list
let categoryCar = false;
let vendorCar = false;
//Holds Logged in User first name;
let loggedIn;




const myDOMs = {
  incomeStatement: {
    TabRevenue: document.getElementById('revenueTab'),
    TabBusExp: document.getElementById('busExpTab'),
    TabHomeExp: document.getElementById('homeExpTab'),
    TabVehicleExp1: document.getElementById('vehicle1ExpTab'),
    TabVehicleExp2: document.getElementById('vehicle2ExpTab'),
    TabOtherCostExp: document.getElementById('otherCostExpTab'),
    TabRentalExp: document.getElementById('rentalExpTab'),
    LinkTabRevenue: document.getElementById('revenueTabLink'),
    LinkTabBusExp: document.getElementById('busExpTabLink'),
    LinkTabHomeExp: document.getElementById('homeExpTabLink'),
    LinkTabVehicleExp1: document.getElementById('vehicle1ExpTabLink'),
    LinkTabVehicleExp2: document.getElementById('vehicle2ExpTabLink'),
    LinkTabOtherCostExp: document.getElementById('otherCostExpTabLink'),
    LinkTabRentalExp: document.getElementById('rentalExpTabLink'),
    BodyRevenue: document.getElementById('IncStatRevenue'),
    BodyBusExp: document.getElementById('IncStatBusExpenses'),
    BusBodyElement: {
      Advertising: document.getElementById('busAdvertisingLink'),
      Dues: document.getElementById('busDuesLink'),
      Meals: document.getElementById('busMealsLink'),
      Office: document.getElementById('busOfficeLink'),
      Supplies: document.getElementById('busSuppliesLink'),
      Cell: document.getElementById('busCellLink'),
      Other: document.getElementById('busOtherLink'),
      Freight: document.getElementById('busFreightLink'),
      Fuel: document.getElementById('busFuelLink'),
      Insurance: document.getElementById('busInsuranceLink'),
      Interest: document.getElementById('busInterestLink'),
      Maintenance: document.getElementById('busMaintenanceLink'),
      Admin: document.getElementById('busAdminLink'),
      Legal: document.getElementById('busLegalLink'),
      Property_Tax: document.getElementById('busPropertyTaxLink'),
      Rent: document.getElementById('busRentLink'),
      Wages: document.getElementById('busWagesLink'),
      Travel: document.getElementById('busTravelLink'),
      Variable1: document.getElementById('busVariable1Link'),
      Variable2: document.getElementById('busVariable2Link'),
      Variable3: document.getElementById('busVariable3Link'),
      Variable4: document.getElementById('busVariable4Link'),
      Variable5: document.getElementById('busVariable5Link'),
      CCA: document.getElementById('busCCALink'),
      Total: document.getElementById('incStBusinessExpTotal'),
      AdvertisingSpan: document.getElementById('busAdvertisingSpan'),
      DuesSpan: document.getElementById('busDuesSpan'),
      MealsSpan: document.getElementById('busMealsSpan'),
      OfficeSpan: document.getElementById('busOfficeSpan'),
      SuppliesSpan: document.getElementById('busSuppliesSpan'),
      CellSpan: document.getElementById('busCellSpan'),
      OtherSpan: document.getElementById('busOtherSpan'),
      FreightSpan: document.getElementById('busFreightSpan'),
      FuelSpan: document.getElementById('busFuelSpan'),
      InsuranceSpan: document.getElementById('busInsuranceSpan'),
      InterestSpan: document.getElementById('busInterestSpan'),
      MaintenanceSpan: document.getElementById('busMaintenanceSpan'),
      AdminSpan: document.getElementById('busAdminSpan'),
      LegalSpan: document.getElementById('busLegalSpan'),
      Property_TaxSpan: document.getElementById('busPropertyTaxSpan'),
      RentSpan: document.getElementById('busRentSpan'),
      WagesSpan: document.getElementById('busWagesSpan'),
      TravelSpan: document.getElementById('busTravelSpan'),
      Variable1Span: document.getElementById('busVariable1Span'),
      Variable2Span: document.getElementById('busVariable2Span'),
      Variable3Span: document.getElementById('busVariable3Span'),
      Variable4Span: document.getElementById('busVariable4Span'),
      Variable5Span: document.getElementById('busVariable5Span'),
      CCASpan: document.getElementById('busCCASpan'),
      TotalSpan: document.getElementById('busTotalExpensesSpan'),
    },
    HomeBodyElement: {
      Heat: document.getElementById('homeHeatLink'),
      Electricity: document.getElementById('homeElectricityLink'),
      Insurance: document.getElementById('homeInsuranceLink'),
      Maintenance: document.getElementById('homeMaintenanceLink'),
      Mortgage: document.getElementById('homeMortgageLink'),
      PropertyTax: document.getElementById('homePropertyTaxLink'),
      Other: document.getElementById('homeOtherLink'),
      Water: document.getElementById('homeWaterLink'),
      Variable1: document.getElementById('homeVariable1Link'),
      Variable2: document.getElementById('homeVariable2Link'),
      Variable3: document.getElementById('homeVariable3Link'),
      PercentDisplay: document.getElementById('incStHomePercentDisplay'),
      PercentButton: document.getElementById('incStHomePercentBtn'),
      Variable3: document.getElementById('homeVariable3Link'),
      Variable3: document.getElementById('homeVariable3Link'),
      Variable3: document.getElementById('homeVariable3Link'),
      Variable3: document.getElementById('homeVariable3Link'),
      Total: document.getElementById('incStHomeExpTotal'),
      HeatSpan: document.getElementById('homeHeatSpan'),
      ElectricitySpan: document.getElementById('homeElectricitySpan'),
      InsuranceSpan: document.getElementById('homeInsuranceSpan'),
      MaintenanceSpan: document.getElementById('homeMaintenanceSpan'),
      MortgageSpan: document.getElementById('homeMortgageSpan'),
      PropertyTaxSpan: document.getElementById('homePropertyTaxSpan'),
      OtherSpan: document.getElementById('homeOtherSpan'),
      WaterSpan: document.getElementById('homeWaterSpan'),
      Variable1Span: document.getElementById('homeVariable1Span'),
      Variable2Span: document.getElementById('homeVariable2Span'),
      Variable3Span: document.getElementById('homeVariable3Span'),
      PercentDisplay: document.getElementById('incStHomePercentDisplay'),
      PercentButton: document.getElementById('incStHomePercentBtn'),
      TotalSpan: document.getElementById('homeTotalExpensesSpan'),
    },
    Vehicle1BodyElement: {
      Fuel: document.getElementById('vehicle1FuelLink'),
      LoanInterest: document.getElementById('vehicle1InterestLoanLink'),
      Insurance: document.getElementById('vehicle1InsuranceLink'),
      Maintenance: document.getElementById('vehicle1MaintenanceLink'),
      Registration: document.getElementById('vehicle1RegistrationLink'),
      Leasing: document.getElementById('vehicle1LeasingLink'),
      Other: document.getElementById('vehicle1OtherLink'),
      Parking: document.getElementById('vehicle1BusParkLink'),
      SuppInsurance: document.getElementById('vehicle1SuppInsuranceLink'),
      Variable1: document.getElementById('vehicle1Variable1Link'),
      Variable2: document.getElementById('vehicle1Variable2Link'),
      Variable3: document.getElementById('vehicle1Variable3Link'),
      Total: document.getElementById('incStVehicle1ExpTotal'),
      FuelSpan: document.getElementById('vehicle1FuelSpan'),
      LoanInterestSpan: document.getElementById('vehicle1InterestLoanSpan'),
      InsuranceSpan: document.getElementById('vehicle1InsuranceSpan'),
      MaintenanceSpan: document.getElementById('vehicle1MaintenanceSpan'),
      RegistrationSpan: document.getElementById('vehicle1RegistrationSpan'),
      LeasingSpan: document.getElementById('vehicle1LeasingSpan'),
      OtherSpan: document.getElementById('vehicle1OtherSpan'),
      ParkingSpan: document.getElementById('vehicle1BusParkSpan'),
      SuppInsuranceSpan: document.getElementById('vehicle1SuppInsuranceSpan'),
      Variable1Span: document.getElementById('vehicle1Variable1Span'),
      Variable2Span: document.getElementById('vehicle1Variable2Span'),
      Variable3Span: document.getElementById('vehicle1Variable3Span'),
      TotalSpan: document.getElementById('vehicle1TotalExpensesSpan'),
      PercentDisplay: document.getElementById('incStVehicle1PercentDisplay'),
      PercentButton: document.getElementById('incStVehicle1PercentBtn'),
    },
    Vehicle2BodyElement: {
      Fuel: document.getElementById('vehicle2FuelLink'),
      LoanInterest: document.getElementById('vehicle2InterestLoanLink'),
      Insurance: document.getElementById('vehicle2InsuranceLink'),
      Maintenance: document.getElementById('vehicle2MaintenanceLink'),
      Registration: document.getElementById('vehicle2RegistrationLink'),
      Leasing: document.getElementById('vehicle2LeasingLink'),
      Other: document.getElementById('vehicle2OtherLink'),
      Parking: document.getElementById('vehicle2BusParkLink'),
      SuppInsurance: document.getElementById('vehicle2SuppInsuranceLink'),
      Variable1: document.getElementById('vehicle2Variable1Link'),
      Variable2: document.getElementById('vehicle2Variable2Link'),
      Variable3: document.getElementById('vehicle2Variable3Link'),
      Total: document.getElementById('incStVehicle2ExpTotal'),
      FuelSpan: document.getElementById('vehicle2FuelSpan'),
      LoanInterestSpan: document.getElementById('vehicle2InterestLoanSpan'),
      InsuranceSpan: document.getElementById('vehicle2InsuranceSpan'),
      MaintenanceSpan: document.getElementById('vehicle2MaintenanceSpan'),
      RegistrationSpan: document.getElementById('vehicle2RegistrationSpan'),
      LeasingSpan: document.getElementById('vehicle2LeasingSpan'),
      OtherSpan: document.getElementById('vehicle2OtherSpan'),
      ParkingSpan: document.getElementById('vehicle2BusParkSpan'),
      SuppInsuranceSpan: document.getElementById('vehicle2SuppInsuranceSpan'),
      Variable1Span: document.getElementById('vehicle2Variable1Span'),
      Variable2Span: document.getElementById('vehicle2Variable2Span'),
      Variable3Span: document.getElementById('vehicle2Variable3Span'),
      TotalSpan: document.getElementById('vehicle2TotalExpensesSpan'),
      PercentDisplay: document.getElementById('incStVehicle2PercentDisplay'),
      PercentButton: document.getElementById('incStVehicle2PercentBtn'),
    },
    RentalBodyElement: {
      Advertising: document.getElementById('rentalAdvertisingLink'),
      Insurance: document.getElementById('rentalInsuranceLink'),
      Interest: document.getElementById('rentalInterestLink'),
      Maintenance: document.getElementById('rentalMaintenanceLink'),
      Admin: document.getElementById('rentalAdminLink'),
      MotorVehicle: document.getElementById('rentalMotorLink'),
      Office: document.getElementById('rentalOfficeLink'),
      Legal: document.getElementById('rentalLegalLink'),
      PropertyTax: document.getElementById('rentalPropertyTaxLink'),
      Wages: document.getElementById('rentalWagesLink'),
      Travel: document.getElementById('rentalTravelLink'),
      Utilities: document.getElementById('rentalUtilitiesLink'),
      Other: document.getElementById('rentalOtherLink'),
      Variable1: document.getElementById('rentalVariable1Link'),
      Variable2: document.getElementById('rentalVariable2Link'),
      Total: document.getElementById('incStRentalExpTotal'),
      AdvertisingSpan: document.getElementById('rentalAdvertisingSpan'),
      InsuranceSpan: document.getElementById('rentalInsuranceSpan'),
      InterestSpan: document.getElementById('rentalInterestSpan'),
      MaintenanceSpan: document.getElementById('rentalMaintenanceSpan'),
      AdminSpan: document.getElementById('rentalAdminSpan'),
      MotorVehicleSpan: document.getElementById('rentalMotorSpan'),
      OfficeSpan: document.getElementById('rentalOfficeSpan'),
      LegalSpan: document.getElementById('rentalLegalSpan'),
      PropertyTaxSpan: document.getElementById('rentalPropertyTaxSpan'),
      WagesSpan: document.getElementById('rentalWagesSpan'),
      TravelSpan: document.getElementById('rentalTravelSpan'),
      UtilitiesSpan: document.getElementById('rentalUtilitiesSpan'),
      OtherSpan: document.getElementById('rentalOtherSpan'),
      Variable1Span: document.getElementById('rentalVariable1Span'),
      Variable2Span: document.getElementById('rentalVariable2Span'),
      TotalSpan: document.getElementById('rentalTotalExpensesSpan'),
    },
    OtherCostsBodyElement: {
      Goods: document.getElementById('otherGoodsLink'),
      Subcontracts: document.getElementById('otherSubcontractsLink'),
      Direct_Wage: document.getElementById('otherDirectWageCostLink'),
      Other_Costs: document.getElementById('otherOtherCostsLink'),
      Variable1: document.getElementById('otherVariable1Link'),
      Variable2: document.getElementById('otherVariable2Link'),
      Total: document.getElementById('incStOtherCostsExpTotal'),
      GoodsSpan: document.getElementById('otherGoodsSpan'),
      SubcontractsSpan: document.getElementById('otherSubcontractsSpan'),
      Direct_WageSpan: document.getElementById('otherDirectWageCostSpan'),
      Other_CostsSpan: document.getElementById('otherOtherCostsSpan'),
      Variable1Span: document.getElementById('otherVariable1Span'),
      Variable2Span: document.getElementById('otherVariable2Span'),
      TotalSpan: document.getElementById('otherCostsTotalExpensesSpan')
    },
    RevenueBodyElement: {
      BusinessRevenueSpan: document.getElementById('incomeBusinessSpan'),
      RentalRevenueSpan: document.getElementById('incomeRentalSpan'),
      BusinessRevenue: document.getElementById('incomeBusinessLink'),
      RentalRevenue: document.getElementById('incomeRentalLink'),
      GrandTotalRevenueSpan: document.getElementById('incStGdTtlRevenueSpan'),
    },
    bottomIncomeStatementTotals: {
      btmTotalRevenue: document.getElementById('incStGrTtlRevenueSpan'),
      btmTotalExpenses: document.getElementById('incStGrTtlExpensesSpan'),
      btmNetIncome: document.getElementById('incStGrTtlNetIncomeSpan'),
    },
    BodyHomeExp: document.getElementById('IncStatHomeExpenses'),
    BodyVehicleExp1: document.getElementById('IncStatVehicle1Expenses'),
    BodyVehicleExp2: document.getElementById('IncStatVehicle2Expenses'),
    BodyOtherCostExp: document.getElementById('IncStatOtherCostsExpenses'),
    BodyRentalExp: document.getElementById('IncStatRentalExpenses'),
  },
  randomData: {
    appYear: 2018,
    lockDate: document.getElementById('hiddenLockDate')
  },
  vehicleLog: {
    Modal: document.getElementById('vehicleLogModal'),
    Title: document.getElementById('vehicleLogTitle'),
    SelectForm: document.getElementById('vehicleLogSelectCarForm'),
    Selector: document.getElementById('vehicleLogSelector'),
    DisplayDay: document.getElementById('vLogDayDisplay'),
    DisplayMonth: document.getElementById('vLogMonthDisplay'),
    DisplayQuarter: document.getElementById('vLogQuarterDisplay'),
    DisplayYear: document.getElementById('vLogYearDisplay'),
    FirstBtn: document.getElementById('vLogBtnFirst'),
    PreviousBtn: document.getElementById('vLogBtnPrevious'),
    NextBtn: document.getElementById('vLogBtnNext'),
    LastBtn: document.getElementById('vLogBtnLast'),
    SaveBtn: document.getElementById('vLogBtnSave'),
    DeleteBtn: document.getElementById('vLogBtnDelete'),
    SaveOdometerBtn: document.getElementById('vLogBtnSaveOdometer'),
    ResetLogBtn: document.getElementById('vLogBtnResetLog'),
    QuickPercentBtn: document.getElementById('vLogQuickPercent'),
    DateLog: document.getElementById('vehicleLogDate'),
    BusKMInput: document.getElementById('vLogBusKMInput'),
    PerKMInput: document.getElementById('vLogPerKMInput'),
    OdometerInput: document.getElementById('vLogOdometer'),
    TotalBus: document.getElementById('vLogBusKMTotal'),
    TotalPer: document.getElementById('vLogPerKMTotal'),
    TotalOdometer: document.getElementById('vLogOdometerTotal'),
    BusPercentYear: document.getElementById('vLogBusPercentYear'),
    BusPercentQuarter: document.getElementById('vLogBusPercentQuarter'),
    BusPercentMonth: document.getElementById('vLogBusPercentMonth'),
    Alert: document.getElementById("alertVehicleLog"),
    AlertContainer: document.getElementById("alertVehicleLogContainer"),
    closeAlert: document.getElementById("VehicleLogCloseBtnAlert"),
    DisplayDateArea: document.getElementById('dayDisplayVLog')
  },
  main_page: {
    SelectPeriod: document.getElementById('timePeriodSelect'),
    NetRevenue: document.getElementById('netRevDisplay'),
    NetExpense: document.getElementById('netExpDisplay'),
    NetIncome: document.getElementById('netIncomeDisplay'),
    AccountBalance: document.getElementById('acctBalance'),
    LockDate: document.getElementById('lockDate'),
    StartDate: document.getElementById('startDatePage'),
    EndDate: document.getElementById('endDatePage'),
  },
  imageModal: {
    Img: document.getElementById("ModalImageTag")
  },
  nav: {
    Login: document.getElementById("navLogin"),
    Logout: document.getElementById("navLogout"),
    Register: document.getElementById("navRegister"),
    UserLogName: document.getElementById("navUserLog")
  },
  vLogReport: {
    Container: document.getElementById('vLogReportContainer'),
    Modal: document.getElementById('VLogViewModal')
  },
  main: {
    Alert: document.getElementById("mainAlert"),
    AlertContainer: document.getElementById("alertContainerMain"),
    closeAlert: document.getElementById("closeBtnAlertMain")
  },
  income: {
    EntryForm: document.getElementById("formIncomeEntry"),
    EntryDate: document.getElementById("incomeDate"),
    AutoAmount: document.getElementById("incomeAutoAmount"),
    NetAmt: document.getElementById("incomenetAmt"),
    HSTAmt: document.getElementById("incomehstAmt"),
    PSTAmt: document.getElementById("incomepstAmt"),
    TotalAmt: document.getElementById("incomeTotalAmt"),
    Description: document.getElementById("incomeDescription"),
    Vendor: document.getElementById("vendorSelectIncome"),
    Party: document.getElementById("incomePartySelect"),
    Title: document.getElementById("incomeTitle"),
    Reset: document.getElementById("incomeEntryformReset"),
    Img: document.getElementById("myImgIncome"),
    FullSizeImgBtn: document.getElementById('incomeExpShowFullSize'),
    FileSelector: document.getElementById("imgloadIncome"),
    Checkbox: document.getElementById("checkboxReceiptIncome"),
    ReoccurYES: document.getElementById("incomeExpReoccurringYES"),
    ReoccurNO: document.getElementById("incomeExpReoccurringNO"),
    Alert: document.getElementById("incomeExpAlert"),
    AlertContainer: document.getElementById("alertContainerIncome"),
    closeAlert: document.getElementById("incomeCloseBtnAlert"),
    ExpID: document.getElementById("incomeExpID"),
    BlindExpID: document.getElementById("incomeBlindExpID"),
    SubmitButton: document.getElementById("incomeExpBtn"),
    Modal: document.getElementById("IncomeModal"),
    SaveChanges: document.getElementById("incomeExpSaveChangesBtn"),
    ShowHideReceipt: document.getElementById("incomeExpShowHideReceipt"),
    ShowHideReceiptDiv: document.getElementById('incomeExpShowHideReceiptDiv'),
    AddVendor: document.getElementById('incomeAddVendor'),
    DeleteVendor: document.getElementById('incomeDeleteVendor'),
    AddParty: document.getElementById('incomeAddParty'),
    DeleteParty: document.getElementById('incomeDeleteParty'),
    FileSelectorButton: document.getElementById('incomeFileInputLbl'),
    RemoveImgButton: document.getElementById('btnRemoveImgIncome'),
    DeleteButton: document.getElementById('incomeExpDeleteBtn'),
    CloseButton: document.getElementById('closeIncomeExpModal'),
    Selector: document.getElementById('incomeSelector'),
  },
  carExp: {
    EntryForm: document.getElementById("formCarExpEntry"),
    EntryDate: document.getElementById("carDate"),
    AutoAmount: document.getElementById("carAutoAmount"),
    NetAmt: document.getElementById("carnetAmt"),
    HSTAmt: document.getElementById("carhstAmt"),
    PSTAmt: document.getElementById("carpstAmt"),
    TotalAmt: document.getElementById("carTotalAmt"),
    Description: document.getElementById("carDescription"),
    Vendor: document.getElementById("vendorSelect"),
    Category: document.getElementById("carExpCatSelect"),
    Selector: document.getElementById("carSelector"),
    Title: document.getElementById("carTitle"),
    Reset: document.getElementById("carEntryformReset"),
    Img: document.getElementById("myImg"),
    FullSizeImgBtn: document.getElementById('carExpShowFullSize'),
    FileSelector: document.getElementById("imgload"),
    Checkbox: document.getElementById("checkboxReceipt"),
    ReoccurYES: document.getElementById("carExpReoccurringYES"),
    ReoccurNO: document.getElementById("carExpReoccurringNO"),
    Alert: document.getElementById("carExpAlert"),
    AlertContainer: document.getElementById("alertContainer"),
    closeAlert: document.getElementById("closeBtnAlert"),
    ExpID: document.getElementById("carExpID"),
    BlindExpID: document.getElementById("carBlindExpID"),
    SubmitButton: document.getElementById("carExpBtn"),
    Modal: document.getElementById("addCarExpenseModal"),
    SaveChanges: document.getElementById("carExpSaveChangesBtn"),
    ShowHideReceipt: document.getElementById("carExpShowHideReceipt"),
    ShowHideReceiptDiv: document.getElementById('carExpShowHideReceiptDiv'),
    AddVendor: document.getElementById('carAddVendor'),
    DeleteVendor: document.getElementById('carDeleteVendor'),
    FileSelectorButton: document.getElementById('carFileInputLbl'),
    RemoveImgButton: document.getElementById('btnRemoveImg'),
    DeleteButton: document.getElementById('carExpDeleteBtn'),
    CloseButton: document.getElementById('closeCarExpModal')
  },
  busExp: {
    EntryForm: document.getElementById("formBusExpEntry"),
    EntryDate: document.getElementById("busDate"),
    AutoAmount: document.getElementById("busAutoAmount"),
    NetAmt: document.getElementById("busnetAmt"),
    HSTAmt: document.getElementById("bushstAmt"),
    PSTAmt: document.getElementById("buspstAmt"),
    TotalAmt: document.getElementById("busTotalAmt"),
    Description: document.getElementById("busDescription"),
    Vendor: document.getElementById("vendorSelectBus"),
    Category: document.getElementById("busExpCatSelect"),
    Title: document.getElementById("busTitle"),
    Reset: document.getElementById("busEntryformReset"),
    Img: document.getElementById("myImgBus"),
    FullSizeImgBtn: document.getElementById('busExpShowFullSize'),
    FileSelector: document.getElementById("imgloadBus"),
    Checkbox: document.getElementById("checkboxReceiptBus"),
    ReoccurYES: document.getElementById("busExpReoccurringYES"),
    ReoccurNO: document.getElementById("busExpReoccurringNO"),
    Alert: document.getElementById("busExpAlert"),
    AlertContainer: document.getElementById("alertContainerBusiness"),
    closeAlert: document.getElementById("busCloseBtnAlert"),
    ExpID: document.getElementById("busExpID"),
    BlindExpID: document.getElementById("busBlindExpID"),
    SubmitButton: document.getElementById("busExpBtn"),
    Modal: document.getElementById("BusExpenseModal"),
    SaveChanges: document.getElementById("busExpSaveChangesBtn"),
    ShowHideReceipt: document.getElementById("busExpShowHideReceipt"),
    ShowHideReceiptDiv: document.getElementById('busExpShowHideReceiptDiv'),
    AddVendor: document.getElementById('busAddVendor'),
    DeleteVendor: document.getElementById('busDeleteVendor'),
    FileSelectorButton: document.getElementById('busFileInputLbl'),
    RemoveImgButton: document.getElementById('btnRemoveImgBus'),
    DeleteButton: document.getElementById('busExpDeleteBtn'),
    CloseButton: document.getElementById('closeBusExpModal')
  },
  homeExp: {
    EntryForm: document.getElementById("formHomeExpEntry"),
    EntryDate: document.getElementById("homeDate"),
    AutoAmount: document.getElementById("homeAutoAmount"),
    NetAmt: document.getElementById("homenetAmt"),
    HSTAmt: document.getElementById("homehstAmt"),
    PSTAmt: document.getElementById("homepstAmt"),
    TotalAmt: document.getElementById("homeTotalAmt"),
    Description: document.getElementById("homeDescription"),
    Vendor: document.getElementById("vendorSelectHome"),
    Category: document.getElementById("homeExpCatSelect"),
    Title: document.getElementById("homeTitle"),
    Reset: document.getElementById("homeEntryformReset"),
    Img: document.getElementById("myImgHome"),
    FullSizeImgBtn: document.getElementById('homeExpShowFullSize'),
    FileSelector: document.getElementById("imgloadHome"),
    Checkbox: document.getElementById("checkboxReceiptHome"),
    ReoccurYES: document.getElementById("homeExpReoccurringYES"),
    ReoccurNO: document.getElementById("homeExpReoccurringNO"),
    Alert: document.getElementById("homeExpAlert"),
    AlertContainer: document.getElementById("alertContainerHome"),
    closeAlert: document.getElementById("homeCloseBtnAlert"),
    ExpID: document.getElementById("homeExpID"),
    BlindExpID: document.getElementById("homeBlindExpID"),
    SubmitButton: document.getElementById("homeExpBtn"),
    Modal: document.getElementById("HomeExpenseModal"),
    SaveChanges: document.getElementById("homeExpSaveChangesBtn"),
    ShowHideReceipt: document.getElementById("homeExpShowHideReceipt"),
    ShowHideReceiptDiv: document.getElementById('homeExpShowHideReceiptDiv'),
    AddVendor: document.getElementById('homeAddVendor'),
    DeleteVendor: document.getElementById('homeDeleteVendor'),
    FileSelectorButton: document.getElementById('homeFileInputLbl'),
    RemoveImgButton: document.getElementById('btnRemoveImgHome'),
    DeleteButton: document.getElementById('homeExpDeleteBtn'),
    CloseButton: document.getElementById('closeHomeExpModal')
  },
  otherExp: {
    EntryForm: document.getElementById("formOtherExpEntry"),
    EntryDate: document.getElementById("otherDate"),
    AutoAmount: document.getElementById("otherAutoAmount"),
    NetAmt: document.getElementById("othernetAmt"),
    HSTAmt: document.getElementById("otherhstAmt"),
    PSTAmt: document.getElementById("otherpstAmt"),
    TotalAmt: document.getElementById("otherTotalAmt"),
    Description: document.getElementById("otherDescription"),
    Vendor: document.getElementById("vendorSelectOther"),
    Category: document.getElementById("otherExpCatSelect"),
    Title: document.getElementById("otherTitle"),
    Reset: document.getElementById("otherEntryformReset"),
    Img: document.getElementById("myImgOther"),
    FullSizeImgBtn: document.getElementById('otherExpShowFullSize'),
    FileSelector: document.getElementById("imgloadOther"),
    Checkbox: document.getElementById("checkboxReceiptOther"),
    ReoccurYES: document.getElementById("otherExpReoccurringYES"),
    ReoccurNO: document.getElementById("otherExpReoccurringNO"),
    Alert: document.getElementById("otherExpAlert"),
    AlertContainer: document.getElementById("alertContainerOther"),
    closeAlert: document.getElementById("otherCloseBtnAlert"),
    ExpID: document.getElementById("otherExpID"),
    BlindExpID: document.getElementById("otherBlindExpID"),
    SubmitButton: document.getElementById("otherExpBtn"),
    Modal: document.getElementById("OtherExpenseModal"),
    SaveChanges: document.getElementById("otherExpSaveChangesBtn"),
    ShowHideReceipt: document.getElementById("otherExpShowHideReceipt"),
    ShowHideReceiptDiv: document.getElementById('otherExpShowHideReceiptDiv'),
    AddVendor: document.getElementById('otherAddVendor'),
    DeleteVendor: document.getElementById('otherDeleteVendor'),
    FileSelectorButton: document.getElementById('otherFileInputLbl'),
    RemoveImgButton: document.getElementById('btnRemoveImgOther'),
    DeleteButton: document.getElementById('otherExpDeleteBtn'),
    CloseButton: document.getElementById('closeOtherExpModal')
  },
  rentalExp: {
    EntryForm: document.getElementById("formRentalExpEntry"),
    EntryDate: document.getElementById("rentalDate"),
    AutoAmount: document.getElementById("rentalAutoAmount"),
    NetAmt: document.getElementById("rentalnetAmt"),
    HSTAmt: document.getElementById("rentalhstAmt"),
    PSTAmt: document.getElementById("rentalpstAmt"),
    TotalAmt: document.getElementById("rentalTotalAmt"),
    Description: document.getElementById("rentalDescription"),
    Vendor: document.getElementById("vendorSelectRental"),
    Category: document.getElementById("rentalExpCatSelect"),
    Title: document.getElementById("rentalTitle"),
    Reset: document.getElementById("rentalEntryformReset"),
    Img: document.getElementById("myImgRental"),
    FullSizeImgBtn: document.getElementById('rentalExpShowFullSize'),
    FileSelector: document.getElementById("imgloadRental"),
    Checkbox: document.getElementById("checkboxReceiptRental"),
    ReoccurYES: document.getElementById("rentalExpReoccurringYES"),
    ReoccurNO: document.getElementById("rentalExpReoccurringNO"),
    Alert: document.getElementById("rentalExpAlert"),
    AlertContainer: document.getElementById("alertContainerRental"),
    closeAlert: document.getElementById("rentalCloseBtnAlert"),
    ExpID: document.getElementById("rentalExpID"),
    BlindExpID: document.getElementById("rentalBlindExpID"),
    SubmitButton: document.getElementById("rentalExpBtn"),
    Modal: document.getElementById("RentalExpenseModal"),
    SaveChanges: document.getElementById("rentalExpSaveChangesBtn"),
    ShowHideReceipt: document.getElementById("rentalExpShowHideReceipt"),
    ShowHideReceiptDiv: document.getElementById('rentalExpShowHideReceiptDiv'),
    AddVendor: document.getElementById('rentalAddVendor'),
    DeleteVendor: document.getElementById('rentalDeleteVendor'),
    FileSelectorButton: document.getElementById('rentalFileInputLbl'),
    RemoveImgButton: document.getElementById('btnRemoveImgRental'),
    DeleteButton: document.getElementById('rentalExpDeleteBtn'),
    CloseButton: document.getElementById('closeRentalExpModal')
  },
  userSetupModal: {
    Form: document.getElementById("userSetupForm"),
    FirstName: document.getElementById("userfirstName"),
    LastName: document.getElementById("userlastName"),
    Email: document.getElementById("useremail"),
    EmailValidMessage: document.getElementById("emailMessage"),
    EmailConfirm: document.getElementById("userConfirmEmail"),
    EmailValidConfirmMessage: document.getElementById("emailConfirmMessage"),
    Password: document.getElementById("userpassword"),
    PasswordValidMessage: document.getElementById("passwordValidMessage"),
    PasswordConfirm: document.getElementById("userpasswordconfirm"),
    PasswordConfirmValidMessage: document.getElementById(
      "confirmPasswordValidMessage"
    ),
    SaveBtn: document.getElementById("userSaveBtn"),
    Alert: document.getElementById("carExpAlertUser"),
    AlertContainer: document.getElementById("alertContainerUser"),
    closeAlert: document.getElementById("closeBtnAlertUser")
  },
  userLoginModal: {
    Form: document.getElementById("userLoginForm"),
    FirstName: document.getElementById("userLoginfirstName"),
    LastName: document.getElementById("userLoginlastName"),
    Email: document.getElementById("userLoginemail"),
    Password: document.getElementById("userLoginPassword"),
    SaveBtn: document.getElementById("userLoginSaveBtn"),
    Alert: document.getElementById("AlertUserLogin"),
    AlertContainer: document.getElementById("alertContainerUserLogin"),
    closeAlert: document.getElementById("closeBtnAlertUserLogin")
  }
};

function renameIncomeStatementElements() {
  if (window.innerWidth < 992) {
    myDOMs.incomeStatement.BusBodyElement.Dues.innerText = 'Fees & Dues';
    myDOMs.incomeStatement.BusBodyElement.Freight.innerText = 'Delivery & Freight';
    myDOMs.incomeStatement.BusBodyElement.Fuel.innerText = 'Fuel costs(expt vehicle)';
    myDOMs.incomeStatement.BusBodyElement.Maintenance.innerText = 'Maintenance & Repair';
    myDOMs.incomeStatement.BusBodyElement.Admin.innerText = 'Management & admin';
    myDOMs.incomeStatement.BusBodyElement.Legal.innerText = 'Legal & Prof Fees';
    myDOMs.incomeStatement.BusBodyElement.Wages.innerText = 'Wages & benefits';
    myDOMs.incomeStatement.BusBodyElement.CCA.innerText = 'CCA/Fixed Asset Claim';
  } else {
    myDOMs.incomeStatement.BusBodyElement.Dues.innerText = 'Fees, licences, dues, memberships';
    myDOMs.incomeStatement.BusBodyElement.Freight.innerText = 'Delivery, freight, and express';
    myDOMs.incomeStatement.BusBodyElement.Fuel.innerText = 'Fuel costs (except vehicles)';
    myDOMs.incomeStatement.BusBodyElement.Maintenance.innerText = 'Maintenance and Repairs';
    myDOMs.incomeStatement.BusBodyElement.Admin.innerText = 'Management and administration fees';
    myDOMs.incomeStatement.BusBodyElement.Legal.innerText = 'Legal, accounting, and other Prof. Fees';
    myDOMs.incomeStatement.BusBodyElement.Wages.innerText = 'Salaries, wages, and benefits';
    myDOMs.incomeStatement.BusBodyElement.CCA.innerText = 'Capital Cost Allowance (CCA)/Fixed Asset Depreciation Claim';
  }
}



window.addEventListener('resize', function (e) {
  renameIncomeStatementElements();
});

function getTodaysDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '-' + dd + '-' + yyyy;
  return today;
}

function formatMyDate(date) {
  let myDate = new Date(date);
  let myDay = myDate.getDate();
  let myMonth = myDate.getMonth() + 1;
  let myYear = myDate.getFullYear();
  // if (myDay < 10) {
  //   myDay = `0${myDay}`;
  // }
  // if (myMonth < 10) {
  //   myMonth = `0${myMonth}`;
  // }

  return myMonth + "/" + myDay + "/" + myYear;
}

function arrOfObjectToArrOfArrays() {
  let netAmtSum = 0;
  let hstAmtSum = 0;
  let pstAmtSum = 0;
  let totalAmtSum = 0;
  let myTempData = [];
  let myTemp2Arr = [];
  curTableArray.forEach((el, index) => {
    let myTempArr = [];
    myTempArr.push(index + 1);
    let myTempDate = formatMyDate(el.carDate);
    myTempArr.push(myTempDate);
    myTempArr.push(formatNumber(el.carnetAmt.toFixed(2)));
    myTempArr.push(formatNumber(el.carhstAmt.toFixed(2)));
    myTempArr.push(formatNumber(el.carpstAmt.toFixed(2)));
    myTempArr.push(formatNumber(el.carTotalAmt.toFixed(2)));
    myTempArr.push(el.carDescription);
    myTempArr.push(el.vendorSelect);
    myTempArr.push(el.carExpCatSelect);

    myTempData.push(myTempArr);

    netAmtSum = netAmtSum + el.carnetAmt;
    hstAmtSum = hstAmtSum + el.carhstAmt;
    pstAmtSum = pstAmtSum + el.carpstAmt;
    totalAmtSum = totalAmtSum + el.carTotalAmt;
  });
  myTemp2Arr.push('');
  myTemp2Arr.push('Totals:');
  myTemp2Arr.push(formatNumber(netAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(hstAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(pstAmtSum.toFixed(2)));
  myTemp2Arr.push(formatNumber(totalAmtSum.toFixed(2)));
  myTemp2Arr.push('');
  myTemp2Arr.push('');
  myTemp2Arr.push('');

  myTempData.push(myTemp2Arr);

  return myTempData;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function generateTablePDF(expGroup) {
  let headText;
  let fileSaveText;
  let myTempDate = getTodaysDate();
  let data = arrOfObjectToArrOfArrays();
  let columns = ["  #  ", "DATE", "NET", "HST", "PST", "TOTAL", "DESCRIPTION", "SUPPLIER", "CATEGORY"];
  let doc = new jsPDF('l', 'px', 'letter', true);
  doc.setTextColor(41, 127, 186);
  doc.setFontSize(12);
  switch (expGroup) {
    case 'Bus-Exp':
      headText = `${curTableArray.length} Business Expenses. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Business Expenses(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;
      break;
    case 'V1-Exp':
      headText = `${curTableArray.length} Vehicle-1 Expenses. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Vehicle-1 Expenses(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`;
      break;
    case 'V2-Exp':
      headText = `${curTableArray.length} Vehicle-2 Expenses. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Vehicle-2 Expenses(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
      break;
    case 'Home-Exp':
      headText = `${curTableArray.length} Home Expenses. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Home Expenses(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
      break;
    case 'Other-Exp':
      headText = `${curTableArray.length} Other Expenses. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Other Expenses(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
      break;
    case 'Rental-Exp':
      headText = `${curTableArray.length} Rental Expenses. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Rental Expenses(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
      break;
    case 'Bus-Inc':
      headText = `${curTableArray.length} Business Revenue Entries. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Business Revenue(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
      break;
    case 'Rental-Inc':
      headText = `${curTableArray.length} Rental Revenue Entries. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Rental Revenue(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
      break;
    case 'VLog':
      headText = `${curTableArray.length} Log Entries. (${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()})`;
      fileSaveText = `Vehicle Log(${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} to ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}).pdf`
  }
  doc.text(headText, 34, 22);
  // if (data.column.dataKey === 'NET' || data.column.dataKey === 'HST' || data.column.dataKey === 'PST' || data.column.dataKey === 'TOTAL') {
  //   cell.styles.halign = 'right';
  // }
  doc.autoTable(columns, data, {
    tableWidth: 'auto',
    columnWidth: 'auto',
    styles: { cellPadding: 1, fontSize: 6.7 },
    createdHeaderCell: function (cell, data) {
      alignCol(cell, data);
    },
    createdCell: function (cell, data) {
      alignCol(cell, data);
    }
    //columnStyles: { DATE: { halign: 'right' }, NET: { halign: 'right' }, HST: { halign: 'right' }, PST: { halign: 'right' }, TOTAL: { halign: 'right' } }
  });

  doc.save(fileSaveText);

}

function alignCol(cell, data) {
  var col = data.column.index;
  var row = data.row.index;
  if (col == 1 || col == 2 || col == 3 || col == 4 || col == 5) {
    cell.styles.halign = 'right';
  } else {
    cell.styles.halign = 'center';
  }
  if (row === curTableArray.length) {

    cell.styles.fontStyle = 'bold';
  }
}

function tableToJson(table) {
  let data = [];

  let headers = [];
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerText;
  }
  data.push(headers);

  for (let i = 1; i < table.rows.length; i++) {
    let tableRow = table.rows[i];
    let rowData = {};

    for (let j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerText;
      // console.log(tableRow.cells[j].innerHTML);
    }

    data.push(rowData);
  }
  return data;
}

// function PrintPDFTable() {
//   let table = tableToJson($('#expReportTable').get(0));
//   let doc = new jsPDF('l', 'px', 'letter', true);
//   let counter = 0;
//   doc.setFontSize(8);
//   doc.cellInitialize();
//   $.each(table, function (i, row) {
//     //console.log(`i=${i} and row=${JSON.stringify(row, undefined, 2)}`);
//     if (i === 0) {
//       doc.setFontType('bold')
//     } else {
//       doc.setFontType('normal')
//     }

//     if (i === 26 || i === 51 || i === 76) {
//       counter = 0;
//       $.each(row, function (j, cell) {
//         // console.log(`Column:${j}- has(${cell})`);

//         if (counter === 0) {
//           //Number
//           doc.cell(2, 2, 14, 16.8, j, i);
//         } else if (counter === 6) {
//           //Description
//           doc.cell(2, 2, 185, 16.8, j, i);
//         } else if (counter === 7) {
//           //Vendor
//           doc.cell(2, 2, 90, 16.8, j, i);
//         } else if (counter === 8) {
//           //Category
//           doc.cell(2, 2, 105, 16.8, j, i);
//         } else if (counter === 9) {
//           //Receipt
//           doc.cell(2, 2, 31, 16.8, j, i);
//         } else if (counter === 1) {
//           //Date
//           doc.cell(2, 2, 33, 16.8, j, i);
//         } else if (counter === 2 || counter === 5) {
//           //Net or Total
//           doc.cell(2, 2, 36, 16.8, j, i);
//         } else {
//           //HST and PST
//           doc.cell(2, 2, 28, 16.8, j, i);
//         }
//         counter = counter + 1;
//       });
//     }

//     counter = 0;
//     $.each(row, function (j, cell) {
//       if (counter === 0) {
//         //Number
//         doc.cell(2, 2, 14, 16.8, cell, i);
//       } else if (counter === 6) {
//         //Description
//         doc.cell(2, 2, 185, 16.8, cell, i);
//       } else if (counter === 7) {
//         //Vendor
//         doc.cell(2, 2, 90, 16.8, cell, i);
//       } else if (counter === 8) {
//         //Category
//         doc.cell(2, 2, 105, 16.8, cell, i);
//       } else if (counter === 9) {
//         //Receipt
//         doc.cell(2, 2, 31, 16.8, cell, i);
//       } else if (counter === 1) {
//         //Date
//         doc.cell(2, 2, 33, 16.8, cell, i);
//       } else if (counter === 2 || counter === 5) {
//         //Net or Total
//         doc.cell(2, 2, 36, 16.8, cell, i);
//       } else {
//         //HST and PST
//         doc.cell(2, 2, 28, 16.8, cell, i);
//       }
//       counter = counter + 1;
//     });

//   });

//   doc.save('Test Table.pdf');
// }

function displayScreenSize() {
  alert(
    `Your Screen is ${window.innerWidth} wide and \n your Screen is ${
    window.innerHeight
    } high.`
  );
}

function browserLogout() {
  $.ajax({
    url: `${serverURL}users/me/token`,
    method: "DELETE",
    async: false,
    data: {
      auth: myToken
    }
  })
    .done(function (data) {
      vendorCar = false;
      categoryCar = false;
    })
    .fail(function (e) { });
}

function userLogout(autoGenerated) {
  if ($("#navLogout").hasClass("disabled")) {
    displayAlert(
      myDOMs.main.AlertContainer,
      "mainAlert",
      "closeBtnAlertMain",
      "You are NOT logged in! ",
      "",
      " ",
      "RED",
      6000
    );
    return;
  }
  $.ajax({
    url: `${serverURL}users/me/token`,
    method: "DELETE",
    data: {
      auth: myToken
    }
  })
    .done(function (data) {
      afterLogout();
      if (autoGenerated) {
        displayAlert(
          myDOMs.main.AlertContainer,
          "mainAlert",
          "closeBtnAlertMain",
          "EZ-HST-Canada has detected no activity for over 6 min and has Logged Out Successfully! ",
          "",
          " ",
          "GREEN",
          0
        );
      } else {
        displayAlert(
          myDOMs.main.AlertContainer,
          "mainAlert",
          "closeBtnAlertMain",
          "Logged Out Successfully! ",
          "",
          " ",
          "GREEN",
          6000
        );
      }
    })
    .fail(function (e) { });
}

function afterLogout() {
  myToken = "";
  vendorCar = false;
  categoryCar = false;
  emptyVendorSelect();
  emptyBusVendorSelect();
  emptyHomeVendorSelect();
  emptyOtherVendorSelect();
  emptyRentalVendorSelect();
  emptyCategorySelect();
  emptyBusCategorySelect();
  emptyHomeCategorySelect();
  emptyOtherCategorySelect();
  emptyRentalCategorySelect();
  emptyIncomeVendorSelect();
  var isDisabledLogin = $("#navLogin").hasClass("disabled");
  if (isDisabledLogin) {
    //console.log("Login is getting enabled");
    myDOMs.nav.Login.classList.remove("disabled");
  }

  var isDisabledLogout = $("#navLogout").hasClass("disabled");
  if (!isDisabledLogout) {
    //console.log("Logout is getting disabled");
    myDOMs.nav.Logout.classList.add("disabled");
  }

  myDOMs.nav.UserLogName.innerText = "";
  loggedIn = "";
}

async function afterLogin(userName) {
  loggedIn = userName;
  var isDisabledLogin = $("#navLogin").hasClass("disabled");
  if (!isDisabledLogin) {
    //console.log("Login is getting disabled");
    myDOMs.nav.Login.classList.add("disabled");
  }
  var isDisabledLogout = $("#navLogout").hasClass("disabled");
  if (isDisabledLogout) {
    //console.log("Logout is getting enabled");
    myDOMs.nav.Logout.classList.remove("disabled");
  }

  var isDisabledRegister = $("#navRegister").hasClass("disabled");
  if (!isDisabledRegister) {
    //console.log("Logout is getting enabled");
    myDOMs.nav.Register.classList.add("disabled");
  }

  myDOMs.nav.UserLogName.innerText = `${userName} - Logged In`;
  await populateVehicleVendors();
  await populateBusinessVendors();
  await populateHomeVendors();
  await populateOtherVendors();
  await populateRentalVendors();
  await populateIncomeVendors();
  await getMiscData();

  await getAllMainData();
  fillMainDataFromArrays();
}

function getUserMe() {
  $.ajax({
    method: "GET",
    url: `${serverURL}users/me`,
    data: {
      auth: myToken
    }
  })
    .done(function (myUser) {
      let myFirst = myUser.firstName;
      let myLast = myUser.lastName;
      let myEmail = myUser.email;
      let myID = myUser._id;
      let myMsg = [
        `Welcome ${myFirst} ${myLast}`,
        `Your ID: ${myID}`,
        `Your Email: ${myEmail}`
      ];
      displayAlert(
        myDOMs.main.AlertContainer,
        "mainAlert",
        "closeBtnAlertMain",
        "Authorized! ",
        myMsg,
        " ",
        "GREEN",
        6000
      );
    })
    .fail(function (e) {
      let myFailMsg = [`The Server was Unable to Authorize Login Credentials!`];
      displayAlert(
        myDOMs.main.AlertContainer,
        "mainAlert",
        "closeBtnAlertMain",
        "Unauthorized! ",
        myFailMsg,
        " ",
        "RED",
        6000
      );
    });
}

function loginUser() {
  let tempdata = {
    firstName: myDOMs.userLoginModal.FirstName.value,
    lastName: myDOMs.userLoginModal.LastName.value,
    email: myDOMs.userLoginModal.Email.value,
    password: myDOMs.userLoginModal.Password.value
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}users/login`,
    dataType: "json",
    data: tempdata
  })
    .done(function (data) {
      let myMsg = [
        `Welcome ${data.firstName} ${data.lastName}`,
        `Your ID: ${data._id}`,
        `Your Email: ${data.email}`
      ];

      displayAlert(
        myDOMs.userLoginModal.AlertContainer,
        "AlertUserLogin",
        "closeBtnAlertUserLogin",
        "Successful Login! ",
        myMsg,
        " ",
        "GREEN",
        6000
      );
      myToken = data.token;
      afterLogin(tempdata.firstName);
      myDOMs.userLoginModal.Form.reset();
    })
    .fail(function (e) {
      let myMsg = [e.responseText];
      displayAlert(
        myDOMs.userLoginModal.AlertContainer,
        "AlertUserLogin",
        "closeBtnAlertUserLogin",
        "Login Error! ",
        myMsg,
        " ",
        "RED",
        6000
      );
    });
}
let myAlert;

function displayAlert(
  curAlertContainer,
  curAlertID,
  closeBtnID,
  boldText,
  moreText,
  tempID,
  alertType,
  dismissTime
) {
  // this code checks for children nodes and removes if true

  if (curAlertContainer.hasChildNodes()) {
    while (curAlertContainer.firstChild) {
      curAlertContainer.removeChild(curAlertContainer.firstChild);
    }
  }

  if (alertType === "RED") {
    myAlert = document.createElement("div");
    myAlert.setAttribute(
      "class",
      "alert alert-danger alert-dismissible collapse"
    );
  } else if (alertType === "GREEN") {
    myAlert = document.createElement("div");
    myAlert.setAttribute(
      "class",
      "alert alert-success alert-dismissible collapse"
    );
  }
  // } else if (alertType === "TABLE CAR GREEN") {
  //   //this code calls the function on tables.js and builds the table structure and Pagination if required and is appended lower in this code
  //   buildVehicleExpenseTable(alertType);
  // }

  myAlert.setAttribute("id", curAlertID);

  let myBtn = document.createElement("button");
  myBtn.setAttribute("class", "close");
  myBtn.setAttribute("id", closeBtnID);
  myBtn.setAttribute("data-toogle", "tooltip");
  myBtn.setAttribute("title", "Close Message!");

  if (curAlertID === "mainAlert") {
    myBtn.setAttribute("onclick", "hideAlert('mainAlert')");
  } else if (curAlertID === "AlertUserLogin") {
    myBtn.setAttribute("onclick", "hideAlert('AlertUserLogin')");
  } else if (curAlertID === "carExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('carExpAlert')");
  } else if (curAlertID === "carExpAlertUser") {
    myBtn.setAttribute("onclick", "hideAlert('carExpAlertUser')");
  } else if (curAlertID === "busExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('busExpAlert')");
  } else if (curAlertID === "homeExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('homeExpAlert')");
  } else if (curAlertID === "otherExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('otherExpAlert')");
  } else if (curAlertID === "rentalExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('rentalExpAlert')");
  } else if (curAlertID === "incomeExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('incomeExpAlert')");
  } else if (curAlertID === "alertContainerVehicleLog") {
    myBtn.setAttribute("onclick", "hideAlert('alertContainerVehicleLog')");
  }



  let btnText = document.createTextNode("x");
  myBtn.appendChild(btnText);

  let myStrongTag = document.createElement("strong");

  let myStrongTextNode = document.createTextNode(boldText);
  myStrongTag.appendChild(myStrongTextNode);
  myAlert.appendChild(myStrongTag);

  for (i = 0; i < moreText.length; i++) {
    let myMoreText = document.createTextNode(moreText[i]);
    let myBreakTag = document.createElement("br");
    myAlert.appendChild(myBreakTag);
    myAlert.appendChild(myMoreText);
  }

  let myIDText;
  if (tempID !== " ") {
    myIDText = document.createTextNode(`${tempID}`);
    myAlert.appendChild(myIDText);
  }

  myAlert.appendChild(myBtn);

  curAlertContainer.appendChild(myAlert);

  $(`#${curAlertID}`).show("fade");

  if (dismissTime === 0) {
  } else {
    setTimeout(function () {
      $(`#${curAlertID}`).hide("fade");
    }, dismissTime);
  }
}
function hideAlert(AlertID) {
  $(`#${AlertID}`).hide("fade");
}

function hideTableAlert() {
  $("#mainTableAlert").hide("fade");
  lastReportPageRowCount = 0;
  currentTablePage = 0;
  currentTablePages = 0;
  rowCountPerPage = rowCountPerPageDefault;
  emptyReportArrays();
  removeTblNavAlertChildNodes();
  removeVlogTblNavAlertChildNodes();
  if (reOpenIncomeStatement) {
    reOpenIncomeStatement = false;
    displayIncomeStatementModal();
  }
}

function removeVlogTblNavAlertChildNodes() {
  if (vLoga !== undefined) {
    if (vLoga.hasChildNodes()) {
      while (vLoga.firstChild) {
        vLoga.removeChild(vLoga.firstChild);
      }
    }
  }

  if (vLogli !== undefined) {
    if (vLogli.hasChildNodes()) {
      while (vLogli.firstChild) {
        vLogli.removeChild(vLogli.firstChild);
      }
    }
  }

  if (vLogul !== undefined) {
    if (vLogul.hasChildNodes()) {
      while (vLogul.firstChild) {
        vLogul.removeChild(vLogul.firstChild);
      }
    }
  }

  if (vLognav !== undefined) {
    if (vLognav.hasChildNodes()) {
      while (vLognav.firstChild) {
        vLognav.removeChild(vLognav.firstChild);
      }
    }
  }

  if (vLogStrongTag !== undefined) {
    if (vLogStrongTag.hasChildNodes()) {
      while (vLogStrongTag.firstChild) {
        vLogStrongTag.removeChild(vLogStrongTag.firstChild);
      }
    }
  }

  if (vLogtbl !== undefined) {
    if (vLogtbl.hasChildNodes()) {
      while (vLogtbl.firstChild) {
        vLogtbl.removeChild(vLogtbl.firstChild);
      }
    }
  }

  if (vLogresponsiveDiv !== undefined) {
    if (vLogresponsiveDiv.hasChildNodes()) {
      while (vLogresponsiveDiv.firstChild) {
        vLogresponsiveDiv.removeChild(vLogresponsiveDiv.firstChild);
      }
    }
  }

  if (myvLogAlert !== undefined) {
    if (myvLogAlert.hasChildNodes()) {
      while (myvLogAlert.firstChild) {
        myvLogAlert.removeChild(myvLogAlert.firstChild);
      }
    }
  }
}

function removeTblNavAlertChildNodes() {
  if (a !== undefined) {
    if (a.hasChildNodes()) {
      while (a.firstChild) {
        a.removeChild(a.firstChild);
      }
    }
  }

  if (li !== undefined) {
    if (li.hasChildNodes()) {
      while (li.firstChild) {
        li.removeChild(li.firstChild);
      }
    }
  }

  if (ul !== undefined) {
    if (ul.hasChildNodes()) {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    }
  }

  if (nav !== undefined) {
    if (nav.hasChildNodes()) {
      while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
      }
    }
  }

  if (myStrongTag !== undefined) {
    if (myStrongTag.hasChildNodes()) {
      while (myStrongTag.firstChild) {
        myStrongTag.removeChild(myStrongTag.firstChild);
      }
    }
  }

  if (tbl !== undefined) {
    if (tbl.hasChildNodes()) {
      while (tbl.firstChild) {
        tbl.removeChild(tbl.firstChild);
      }
    }
  }

  if (responsiveDiv !== undefined) {
    if (responsiveDiv.hasChildNodes()) {
      while (responsiveDiv.firstChild) {
        responsiveDiv.removeChild(responsiveDiv.firstChild);
      }
    }
  }

  if (myTableAlert !== undefined) {
    if (myTableAlert.hasChildNodes()) {
      while (myTableAlert.firstChild) {
        myTableAlert.removeChild(myTableAlert.firstChild);
      }
    }
  }
}

function registerUser() {
  mydata = {
    firstName: myDOMs.userSetupModal.FirstName.value,
    lastName: myDOMs.userSetupModal.LastName.value,
    email: myDOMs.userSetupModal.Email.value,
    password: myDOMs.userSetupModal.Password.value
  };

  $.ajax({
    method: "POST",
    url: `${serverURL}users`,
    dataType: "json",
    data: mydata,
    success: function (data, textStatus, request) {
      let myObjMsg = [`${data.firstName} ${data.lastName}`, `${data.email}`];

      displayAlert(
        myDOMs.userSetupModal.AlertContainer,
        "carExpAlertUser",
        "closeBtnAlertUser",
        "New User added Successfully! ",
        myObjMsg,
        `User ID: ${data._id}`,
        "RED",
        6000
      );
      afterLogin(mydata.firstName);
      myToken = data.token;
      myDOMs.userSetupModal.Form.reset();
    },
    error: function (error) {
      if (error.responseJSON === undefined) {
        let myObjMsg;
        if (error.readyState === 0) {
          myObjMsg = ["Connection Refused"];
        } else {
          myObjMsg = ["Unknown Problem"];
        }
        displayAlert(
          myDOMs.userSetupModal.AlertContainer,
          "carExpAlertUser",
          "closeBtnAlertUser",
          "User Setup Error! ",
          myObjMsg,
          " ",
          "RED",
          6000
        );
      } else {
        let myObjMsg = [error.responseJSON.body, error.responseJSON.fix];
        displayAlert(
          myDOMs.userSetupModal.AlertContainer,
          "carExpAlertUser",
          "closeBtnAlertUser",
          `${error.responseJSON.title}! `,
          myObjMsg,
          " ",
          "RED",
          6000
        );
      }
    }
  });
}

function displayUserSetupModal() {
  if ($("#navRegister").hasClass("disabled")) {
    let myMsg = [
      "Which means you have already registered!",
      "If you are certain you have not registered",
      "Refresh the page to enable the menu."
    ];
    displayAlert(
      myDOMs.main.AlertContainer,
      "mainAlert",
      "closeBtnAlertMain",
      "You ARE logged in! ",
      myMsg,
      " ",
      "RED",
      10000
    );
    return;
  }
  $("#userSetupModal").modal();
}

function displayLoginUser() {

  if ($("#navLogin").hasClass("disabled")) {
    displayAlert(
      myDOMs.main.AlertContainer,
      "mainAlert",
      "closeBtnAlertMain",
      "You ARE already logged in! ",
      "",
      " ",
      "RED",
      6000,
      ""
    );
    return;
  }
  $("#userLoginModal").modal('show');
}

function setPasswordValidClass(myPassInput) {
  if (myPassInput === "first") {
    if (myDOMs.userSetupModal.Password.value.length >= 8) {
      if (myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.remove("is-invalid");
      }
      if (
        myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordValidMessage.innerText =
          "Your Password is not strong enough! (Min 8 character)";
      }
    }

    if (
      myDOMs.userSetupModal.Password.value ===
      myDOMs.userSetupModal.PasswordConfirm.value
    ) {
      if (myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.remove("is-invalid");
      }
      if (
        myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordValidMessage.innerText =
          "Your Passwords do not match!";
      }
    }
  } else if (myPassInput === "confirm") {
    if (
      myDOMs.userSetupModal.Password.value ===
      myDOMs.userSetupModal.PasswordConfirm.value &&
      myDOMs.userSetupModal.PasswordConfirm.value.length >= 8
    ) {
      if (
        myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.remove("is-invalid");
      }

      if (myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.remove("is-invalid");
      }
    } else {
      if (
        !myDOMs.userSetupModal.PasswordConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.PasswordConfirm.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordConfirmValidMessage.innerText =
          "Your Passwords do not match!";
      }
      if (!myDOMs.userSetupModal.Password.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Password.classList.add("is-invalid");
        myDOMs.userSetupModal.PasswordValidMessage.innerText =
          "Your Passwords do not match!";
      }
    }
  }
}

function setEmailValidClass(myPassInput) {
  if (myPassInput === "first") {
    if (
      myDOMs.userSetupModal.Email.value ===
      myDOMs.userSetupModal.EmailConfirm.value
    ) {
      if (myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.remove("is-invalid");
      }
      if (myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.EmailConfirm.classList.remove("is-invalid");
      }
    } else {
      if (!myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidMessage.innerText =
          "Your emails do not match!";
      }

      if (
        !myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.EmailConfirm.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidConfirmMessage.innerText =
          "Your Emails do not match!";
      }
    }
  } else if (myPassInput === "confirm") {
    if (
      myDOMs.userSetupModal.Email.value ===
      myDOMs.userSetupModal.EmailConfirm.value
    ) {
      if (myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.EmailConfirm.classList.remove("is-invalid");
      }

      if (myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.remove("is-invalid");
      }
    } else {
      if (
        !myDOMs.userSetupModal.EmailConfirm.classList.contains("is-invalid")
      ) {
        myDOMs.userSetupModal.EmailConfirm.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidConfirmMessage.innerText =
          "Your Emails do not match!";
      }
      if (!myDOMs.userSetupModal.Email.classList.contains("is-invalid")) {
        myDOMs.userSetupModal.Email.classList.add("is-invalid");
        myDOMs.userSetupModal.EmailValidMessage.innerText =
          "Your Emails do not match!";
      }
    }
  }
}

$("#userSetupModal").on("hidden.bs.modal", function () {
  myDOMs.userSetupModal.Form.reset();
});

$("#userLoginModal").on("hidden.bs.modal", function () {
  myDOMs.userLoginModal.Form.reset();
});

// code to Logout when browser is closed
window.addEventListener("beforeunload", function (event) {
  if (myToken !== "") {
    browserLogout();
  }
});

function updateFormButtons(myForm) {
  switch (myForm) {
    case 'income':
      alert('ID is present');
      if ($('#incomeBlindExpID').val() !== "") {
        if ($('#incomeExpBtn').hasClass("disabled")) {
        } else {
          $('#incomeExpBtn').addClass("disabled");
        }
        if ($('#incomeExpDeleteBtn').hasClass("disabled")) {
          $('#incomeExpDeleteBtn').removeClass("disabled");
        }
        if ($('#incomeExpSaveChangesBtn').hasClass("disabled")) {
          $('#incomeExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        alert('no ID');
        if ($('#incomeExpBtn').hasClass("disabled")) {
          $('#incomeExpBtn').removeClass("disabled");
        }
        if ($('#incomeExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#incomeExpDeleteBtn').addClass("disabled");
        }
        if ($('#incomeExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#incomeExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;

    case 'vehicle':
      if ($('#carBlindExpID').val() !== "") {
        if ($('#carExpBtn').hasClass("disabled")) {
        } else {
          $('#carExpBtn').addClass("disabled");
        }
        if ($('#carExpDeleteBtn').hasClass("disabled")) {
          $('#carExpDeleteBtn').removeClass("disabled");
        }
        if ($('#carExpSaveChangesBtn').hasClass("disabled")) {
          $('#carExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#carExpBtn').hasClass("disabled")) {
          $('#carExpBtn').removeClass("disabled");
        }
        if ($('#carExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#carExpDeleteBtn').addClass("disabled");
        }
        if ($('#carExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#carExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'business':
      if ($('#busBlindExpID').val() !== "") {
        if ($('#busExpBtn').hasClass("disabled")) {
        } else {
          $('#busExpBtn').addClass("disabled");
        }
        if ($('#busExpDeleteBtn').hasClass("disabled")) {
          $('#busExpDeleteBtn').removeClass("disabled");
        }
        if ($('#busExpSaveChangesBtn').hasClass("disabled")) {
          $('#busExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#busExpBtn').hasClass("disabled")) {
          $('#busExpBtn').removeClass("disabled");
        }
        if ($('#busExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#busExpDeleteBtn').addClass("disabled");
        }
        if ($('#busExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#busExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'home':
      if ($('#homeBlindExpID').val() !== "") {
        if ($('#homeExpBtn').hasClass("disabled")) {
        } else {
          $('#homeExpBtn').addClass("disabled");
        }
        if ($('#homeExpDeleteBtn').hasClass("disabled")) {
          $('#homeExpDeleteBtn').removeClass("disabled");
        }
        if ($('#homeExpSaveChangesBtn').hasClass("disabled")) {
          $('#homeExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#homeExpBtn').hasClass("disabled")) {
          $('#homeExpBtn').removeClass("disabled");
        }
        if ($('#homeExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#homeExpDeleteBtn').addClass("disabled");
        }
        if ($('#homeExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#homeExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'other':
      if ($('#otherBlindExpID').val() !== "") {
        if ($('#otherExpBtn').hasClass("disabled")) {
        } else {
          $('#otherExpBtn').addClass("disabled");
        }
        if ($('#otherExpDeleteBtn').hasClass("disabled")) {
          $('#otherExpDeleteBtn').removeClass("disabled");
        }
        if ($('#otherExpSaveChangesBtn').hasClass("disabled")) {
          $('#otherExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#otherExpBtn').hasClass("disabled")) {
          $('#otherExpBtn').removeClass("disabled");
        }
        if ($('#otherExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#otherExpDeleteBtn').addClass("disabled");
        }
        if ($('#otherExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#otherExpSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'rental':
      if ($('#rentalBlindExpID').val() !== "") {
        if ($('#rentalExpBtn').hasClass("disabled")) {
        } else {
          $('#rentalExpBtn').addClass("disabled");
        }
        if ($('#rentalExpDeleteBtn').hasClass("disabled")) {
          $('#rentalExpDeleteBtn').removeClass("disabled");
        }
        if ($('#rentalExpSaveChangesBtn').hasClass("disabled")) {
          $('#rentalExpSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#rentalExpBtn').hasClass("disabled")) {
          $('#rentalExpBtn').removeClass("disabled");
        }
        if ($('#rentalExpDeleteBtn').hasClass("disabled")) {
        } else {
          $('#rentalExpDeleteBtn').addClass("disabled");
        }
        if ($('#rentalExpSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#rentalExpSaveChangesBtn').addClass("disabled");
        }
      }
  }
}
