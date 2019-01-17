//User Email
let userEmail = '';

//URL Variable
let serverURL = window.location.pathname;
//alert(serverURL);
//Variable to keep track of populated category list
let categoryCar = false;
let vendorCar = false;
//Holds Logged in User first name;
let loggedIn;
//This varaible is set to true when Collapse Nav Bar is Open and false when closed
let NavBarCollapseOpen = false;

//Next varaible used to know if any Modals are open
let AssetModalOpen = false;
let TaxPaymentModalOpen = false;
let HSTPaymentModalOpenForNAV = false;
let PSTPaymentModalOpenForNAV = false;
let VehicleExpEntryModalOpen = false;
let BusExpEntryModalOpen = false;
let HomeExpEntryModalOpen = false;
let OtherExpEntryModalOpen = false;
let RentalExpEntryModalOpen = false;
let IncomeEntryModalOpen = false;
let VLogModalOpen = false;
let UserSetupModalOpen = false;
let UserLoginModalOpen = false;
let VLogReportModalOpen = false;
let PaymentReportModalOpen = false;
let AssetReportModalOpen = false;
let IncomeStatementModalOpen = false;
let HomePercentModalOpen = false;
let AccountSummaryModalOpen = false;
let HSTReturnModalOpen = false;


function closeFullViewImage() {
  $('#ImageViewModal').modal('hide');
  let img = document.getElementById('DivFullImage');
  img.setAttribute('style', 'transform:rotate(0deg)');
  imageAngle = 0;
};



const myDOMs = {
  HST_Return: {
    StartDate: document.getElementById('PeriodStartDate'),
    EndDate: document.getElementById('PeriodEndDate'),
    Line101: document.getElementById('Line101'),
    Line103: document.getElementById('Line103'),
    Line103Lbl: document.getElementById('Line103Lbl'),
    Line104: document.getElementById('Line104'),
    Line104Lbl: document.getElementById('Line104Lbl'),
    Line105: document.getElementById('Line105'),
    Line106: document.getElementById('Line106'),
    Line106Lbl: document.getElementById('Line106Lbl'),
    Line107: document.getElementById('Line107'),
    Line107Lbl: document.getElementById('Line107Lbl'),
    Line108: document.getElementById('Line108'),
    Line109: document.getElementById('Line109'),
    Line110: document.getElementById('Line110'),
    Line110Lbl: document.getElementById('Line110Lbl'),
    Line111: document.getElementById('Line111'),
    Line111Lbl: document.getElementById('Line111Lbl'),
    Line112: document.getElementById('Line112'),
    Line113A: document.getElementById('Line113A'),
    Line113B: document.getElementById('Line113B'),
    Line113C: document.getElementById('Line113C'),
    Line114: document.getElementById('Line114'),
    Line115: document.getElementById('Line115'),
    Line205: document.getElementById('Line205'),
    Line205Lbl: document.getElementById('Line205Lbl'),
    Line405: document.getElementById('Line405'),
    Line405Lbl: document.getElementById('Line405Lbl'),
    Body: document.getElementById('ReturnBody'),
    Modal: document.getElementById('HSTReturnModal')
  },
  AccountSummary: {
    GrossRevBus: document.getElementById('ASgrossRevBus'),
    GrossIncBus: document.getElementById('ASgrossIncBus'),
    GrossIncRental: document.getElementById('ASgrossIncRental'),
    NetIncome: document.getElementById('ASnetInc'),
    TotalDeductionGrossInc: document.getElementById('ASBigNumberTop'),
    HSTGrossRev: document.getElementById('ASHSTgrossRev'),
    PSTGrossRev: document.getElementById('ASPSTgrossRev'),
    TAXGrossInc: document.getElementById('ASTAXgrossInc'),
    CPP: document.getElementById('ASCPP'),
    TotalIN: document.getElementById('ASBigNumberMid'),
    HSTPayment: document.getElementById('ASHSTPayment'),
    PSTPayments: document.getElementById('ASPSTPayment'),
    TAXPayments: document.getElementById('ASTAXPayment'),
    TotalOUT: document.getElementById('ASBigNumberBtm'),
    BusAcctBal: document.getElementById('ASLastBigNumberBtm'),
    TimePeriodSeletor: document.getElementById('ASTimePeriodSelect'),
    IncludeCheckBox: document.getElementById('ASIncludeToPeriod'),
    AmountandTimeTitle: document.getElementById('ASTopLbl3')
  },
  AssetTable: {
    AlertContainer: document.getElementById('alertReportAsset'),
  },
  FixedAssets: {
    AlertContainer: document.getElementById('AssetContainer'),
    Modal: document.getElementById('AssetModal'),
    Modal_Header: document.getElementById('AssetmodalHead'),
    Form: document.getElementById('AssetEntryForm'),
    Purchase_Date: document.getElementById('AssetPurchaseDate'),
    Description: document.getElementById('AssetDescription'),
    Claim_Date: document.getElementById('AssetClaimDate'),
    Start_Value: document.getElementById('AssetStartValue'),
    Depreciation_Claim: document.getElementById('AssetClaimAmt'),
    ITC_Claim: document.getElementById('ITCClaimAmt'),
    Business_Percent: document.getElementById('AssetBusinessPercent'),
    Vehicle1_Selector: document.getElementById('AssetVehicle1'),
    Vehicle2_Selector: document.getElementById('AssetVehicle2'),
    Vehicle_Percent_Btn: document.getElementById('AssetVehiclePercentApplyBtn'),
    Reset_Btn: document.getElementById('AssetReset'),
    Delete_Btn: document.getElementById('AssetDeleteBtn'),
    Close_btn: document.getElementById('AssetBottomCloseModal'),
    Save_Changes_Btn: document.getElementById('AssetSaveChangesBtn'),
    Submit_Btn: document.getElementById('AssetSubmitBtn'),
    Auto_Claim_Rate: document.getElementById('AssetAutoClaimRate'),
    Include_ITC_Selector: document.getElementById('AssetIncludeITC'),
    Auto_Generate_Btn: document.getElementById('AssetGenerateClaimBtn'),
    Status: document.getElementById('AssetStatus'),
    Blind_ID: document.getElementById('Asset_id')
  },
  PaymentTable: {
    AlertContainer: document.getElementById('alertReportHSTPayment'),
  },
  TAXPayment: {
    Modal: document.getElementById('taxPaymentModal'),
    DateInput: document.getElementById('taxPaymentDate'),
    PaymentAmtInput: document.getElementById('taxPaymentAmt'),
    PaymentStatus: document.getElementById('taxPaymentStatus'),
    BlindID: document.getElementById('taxBlindPaymentID'),
    PaymentDescription: document.getElementById('taxPaymentDescription'),
    AutoAmountBtn: document.getElementById('taxPaymentAutoAmtBtn'),
    DeleteBtn: document.getElementById('taxPaymentDeleteBtn'),
    CloseBtn: document.getElementById('closeTAXPaymentModal'),
    SaveChangesBtn: document.getElementById('taxPaymentSaveChangesBtn'),
    SubmitBtn: document.getElementById('taxPaymentSubmitBtn'),
    ResetBtn: document.getElementById('taxPaymentformReset'),
    Form: document.getElementById('formTAXPaymentEntry'),
    AlertContainer: document.getElementById('alertContainerTAXPayment')
  },
  PSTPayment: {
    Modal: document.getElementById('pstPaymentModal'),
    DateInput: document.getElementById('pstPaymentDate'),
    PaymentAmtInput: document.getElementById('pstPaymentAmt'),
    PaymentStatus: document.getElementById('pstPaymentStatus'),
    BlindID: document.getElementById('pstBlindPaymentID'),
    PaymentDescription: document.getElementById('pstPaymentDescription'),
    AutoAmountBtn: document.getElementById('pstPaymentAutoAmtBtn'),
    DeleteBtn: document.getElementById('pstPaymentDeleteBtn'),
    CloseBtn: document.getElementById('closePSTPaymentModal'),
    SaveChangesBtn: document.getElementById('pstPaymentSaveChangesBtn'),
    SubmitBtn: document.getElementById('pstPaymentSubmitBtn'),
    ResetBtn: document.getElementById('pstPaymentformReset'),
    Form: document.getElementById('formPSTPaymentEntry'),
    AlertContainer: document.getElementById('alertContainerPSTPayment')
  },
  HSTPayment: {
    Modal: document.getElementById('hstPaymentModal'),
    Title: document.getElementById('paymentTitle'),
    DateInput: document.getElementById('hstPaymentDate'),
    PaymentAmtInput: document.getElementById('hstPaymentAmt'),
    PaymentStatus: document.getElementById('hstPaymentStatus'),
    BlindID: document.getElementById('hstBlindPaymentID'),
    PaymentDescription: document.getElementById('hstPaymentDescription'),
    AutoAmountBtn: document.getElementById('hstPaymentAutoAmtBtn'),
    DeleteBtn: document.getElementById('hstPaymentDeleteBtn'),
    CloseBtn: document.getElementById('closeHSTPaymentModal'),
    SaveChangesBtn: document.getElementById('hstPaymentSaveChangesBtn'),
    SubmitBtn: document.getElementById('hstPaymentSubmitBtn'),
    ResetBtn: document.getElementById('hstPaymentformReset'),
    Form: document.getElementById('formHSTPaymentEntry'),
    AlertContainer: document.getElementById('alertContainerHSTPayment')
  },
  homePercentModal: {
    hrsPerDay: document.getElementById('hoursPerDay'),
    daysPerWeek: document.getElementById('daysPerWeek'),
    businessArea: document.getElementById('businessArea'),
    homeArea: document.getElementById('houseArea'),
    BusinessHomePercent: document.getElementById('businessPercent'),
    PeriodSelect: document.getElementById('timePeriodHomePercentSelect'),
    applyPercentBtn: document.getElementById('btnApplyPercent'),
    resetBtn: document.getElementById('btnPercentCalcReset')
  },
  settingsModal: {
    TooltipBtnEnabled: document.getElementById('tooltipOn'),
    TooltipBtnDisabled: document.getElementById('tooltipOFF'),
    ExpensePerPageSelect: document.getElementById('countPerPageSelect'),
    ProvinceSelect: document.getElementById('settingsProvinceSelect'),
    HSTsetting: document.getElementById('hstSetting'),
    PSTsetting: document.getElementById('pstSetting'),
  },
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
      PercentTextDisplay: document.getElementById('incStVehicle1PercentText'),
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
      PercentTextDisplay: document.getElementById('incStVehicle2PercentText'),
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
    DisplayDateArea: document.getElementById('dayDisplayVLog'),
    BusKMsInputLabel: document.getElementById('vLogBusKMInputLbl'),
    PersKMsInputLabel: document.getElementById('vLogPerKMInputLbl'),
    OdometerInputLabel: document.getElementById('vLogOdometerLbl'),
    BusKMsTotalLabel: document.getElementById('vLogBusKMTotalLbl'),
    PersKMsTotalsLabel: document.getElementById('vLogPerKMTotalLbl'),
    OdometerTotalLabel: document.getElementById('vLogOdometerTotalLbl'),
    BusPercentYearLabel: document.getElementById('vLogBusPercentYearLbl'),
    BusPercentQuarterLabel: document.getElementById('vLogBusPercentQuarterLbl'),
    BusPercentMonthLabel: document.getElementById('vLogBusPercentMonthLbl')

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
    SettingsBtn: document.getElementById('mainSettings'),
    NavToggleBtn: document.getElementById('toggleNav')
  },
  imageModal: {
    Img: document.getElementById("ModalImageTag")
  },
  nav: {
    Login: document.getElementById("navLogin"),
    Logout: document.getElementById("navLogout"),
    Register: document.getElementById("navRegister"),
    UserLogName: document.getElementById("navUserLog"),
    Main: document.getElementById("main-nav"),
    NavBarCollapse: document.getElementById("NavBarCollapseBtn")

  },
  vLogReport: {
    Container: document.getElementById('vLogReportContainer'),
    Modal: document.getElementById('VLogViewModal')
  },
  main: {
    Alert: document.getElementById("mainAlert"),
    AlertContainer: document.getElementById("alertContainerMain"),
    closeAlert: document.getElementById("closeBtnAlertMain"),
    HSTPaymentEntryMenu: document.getElementById("hstPaymentEntryMenu"),
    HSTPaymentReportMenu: document.getElementById("hstPaymentReportMenu"),
    MainMiddleSection: document.getElementById("MainMiddleSection")
  },
  income: {
    EntryForm: document.getElementById("formIncomeEntry"),
    EntryDate: document.getElementById("incomeDate"),
    AutoAmount: document.getElementById("incomeAutoAmount"),
    NetAmt: document.getElementById("incomenetAmt"),
    HSTAmtLabel: document.getElementById("incomehstAmtLbl"),
    HSTAmt: document.getElementById("incomehstAmt"),
    PSTAmt: document.getElementById("incomepstAmt"),
    TotalAmt: document.getElementById("incomeTotalAmt"),
    Description: document.getElementById("incomeDescription"),
    Vendor: document.getElementById("vendorSelectIncome"),
    Party: document.getElementById("incomePartySelect"),
    Title: document.getElementById("incomeTitle"),
    Reset: document.getElementById("incomeEntryformReset"),
    Img: document.getElementById("myImgIncome"),
    BlindImg: document.getElementById("myImgIncomeBlind"),
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
    HSTAmtLabel: document.getElementById("carhstAmtLbl"),
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
    BlindImg: document.getElementById("myImgBlind"),
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
    HSTAmtLabel: document.getElementById("bushstAmtLbl"),
    HSTAmt: document.getElementById("bushstAmt"),
    PSTAmt: document.getElementById("buspstAmt"),
    TotalAmt: document.getElementById("busTotalAmt"),
    Description: document.getElementById("busDescription"),
    Vendor: document.getElementById("vendorSelectBus"),
    Category: document.getElementById("busExpCatSelect"),
    Title: document.getElementById("busTitle"),
    Reset: document.getElementById("busEntryformReset"),
    Img: document.getElementById("myImgBus"),
    BlindImg: document.getElementById("myImgBusBlind"),
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
    HSTAmtLabel: document.getElementById("homehstAmtLbl"),
    HSTAmt: document.getElementById("homehstAmt"),
    PSTAmt: document.getElementById("homepstAmt"),
    TotalAmt: document.getElementById("homeTotalAmt"),
    Description: document.getElementById("homeDescription"),
    Vendor: document.getElementById("vendorSelectHome"),
    Category: document.getElementById("homeExpCatSelect"),
    Title: document.getElementById("homeTitle"),
    Reset: document.getElementById("homeEntryformReset"),
    Img: document.getElementById("myImgHome"),
    BlindImg: document.getElementById("myImgHomeBlind"),
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
    HSTAmtLabel: document.getElementById("otherhstAmtLbl"),
    HSTAmt: document.getElementById("otherhstAmt"),
    PSTAmt: document.getElementById("otherpstAmt"),
    TotalAmt: document.getElementById("otherTotalAmt"),
    Description: document.getElementById("otherDescription"),
    Vendor: document.getElementById("vendorSelectOther"),
    Category: document.getElementById("otherExpCatSelect"),
    Title: document.getElementById("otherTitle"),
    Reset: document.getElementById("otherEntryformReset"),
    Img: document.getElementById("myImgOther"),
    BlindImg: document.getElementById("myImgOtherBlind"),
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
    HSTAmtLabel: document.getElementById("rentalhstAmtLbl"),
    HSTAmt: document.getElementById("rentalhstAmt"),
    PSTAmt: document.getElementById("rentalpstAmt"),
    TotalAmt: document.getElementById("rentalTotalAmt"),
    Description: document.getElementById("rentalDescription"),
    Vendor: document.getElementById("vendorSelectRental"),
    Category: document.getElementById("rentalExpCatSelect"),
    Title: document.getElementById("rentalTitle"),
    Reset: document.getElementById("rentalEntryformReset"),
    Img: document.getElementById("myImgRental"),
    BlindImg: document.getElementById("myImgRentalBlind"),
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

myDOMs.nav.NavBarCollapse.addEventListener('click', function (event) {

  if (NavBarCollapseOpen === true) {
    NavBarCollapseOpen = false;
  } else {
    NavBarCollapseOpen = true;
  }

});


function ToggleMenuBar() {

  let myMainNav = document.getElementById("main-nav");
  let LeftMainDOM = document.getElementById("timePeriodDiv");
  let RightMainDOM = document.getElementById("MainViewTotals");
  let MainContainerAlertTemp = document.getElementById("alertContainerMain");
  let MainAlertTemp = document.getElementById("mainAlert");
  let MiddleMainDOM = document.getElementById("MainMiddleSection");

  let BusExpTableAlertDOM = document.getElementById("mainTableAlert");
  let myTopVal = myMainNav.offsetTop;

  if (AssetModalOpen === true || TaxPaymentModalOpen === true || HSTPaymentModalOpenForNAV === true || PSTPaymentModalOpenForNAV === true || VehicleExpEntryModalOpen === true || BusExpEntryModalOpen === true || HomeExpEntryModalOpen === true || OtherExpEntryModalOpen === true || RentalExpEntryModalOpen === true || IncomeEntryModalOpen === true || VLogModalOpen === true || UserSetupModalOpen === true || UserLoginModalOpen === true || VLogReportModalOpen === true || PaymentReportModalOpen === true || AssetReportModalOpen === true || IncomeStatementModalOpen === true || HomePercentModalOpen === true || AccountSummaryModalOpen === true || HSTReturnModalOpen === true) {
    // alert('1st');
    myMainNav.style.top = '-108px';
    LeftMainDOM.style.top = '-108px';
    RightMainDOM.style.top = '-108px';
    MiddleMainDOM.style.top = '-108px';
    MainContainerAlertTemp.style.top = '-108px';
    if (MainAlertTemp === undefined || MainAlertTemp === null) {
    } else {
      MainAlertTemp.style.top = '-108px';
    }
    if (BusExpTableAlertDOM === undefined || BusExpTableAlertDOM === null) {
    } else {
      BusExpTableAlertDOM.style.top = '-108px';
    }
    myDOMs.main_page.NavToggleBtn.innerText = 'Display Menu Bar';

    if (window.innerWidth < 992) {
      let MyCollapse = document.getElementById("navbarCollapse");
      let myCollapseVal = MyCollapse.offsetTop;
      if (myCollapseVal !== 0 || myCollapseVal === 0 && NavBarCollapseOpen === true) {
        myDOMs.nav.NavBarCollapse.click(false);
      }
    }

  } else if (AssetModalOpen === false && TaxPaymentModalOpen === false && HSTPaymentModalOpenForNAV === false && PSTPaymentModalOpenForNAV === false && VehicleExpEntryModalOpen === false && BusExpEntryModalOpen === false && HomeExpEntryModalOpen === false && OtherExpEntryModalOpen === false && RentalExpEntryModalOpen === false && IncomeEntryModalOpen === false && VLogModalOpen === false && UserSetupModalOpen === false && UserLoginModalOpen === false && VLogReportModalOpen === false && PaymentReportModalOpen === false && AssetReportModalOpen === false && IncomeStatementModalOpen === false && HomePercentModalOpen === false && AccountSummaryModalOpen === false && HSTReturnModalOpen === false) {

    if (myTopVal === -108) {
      // alert('2nd');
      if (reOpenIncomeStatement) { return };
      myMainNav.style.top = '0';
      LeftMainDOM.style.top = '0';
      RightMainDOM.style.top = '0';
      MiddleMainDOM.style.top = '0';
      MainContainerAlertTemp.style.top = '0';
      if (MainAlertTemp === undefined || MainAlertTemp === null) {
      } else {
        MainAlertTemp.style.top = '0';
      }
      if (BusExpTableAlertDOM === undefined || BusExpTableAlertDOM === null) {
      } else {
        BusExpTableAlertDOM.style.top = '0';
      }
      myDOMs.main_page.NavToggleBtn.innerText = 'Hide Menu Bar';

      if (window.innerWidth < 992) {
        let MyCollapse = document.getElementById("navbarCollapse");
        let myCollapseVal = MyCollapse.offsetTop;
        if (myCollapseVal !== 0 || myCollapseVal === 0 && NavBarCollapseOpen === true) {
          myDOMs.nav.NavBarCollapse.click(false);
        }
      }

    } else {
      // alert('3rd');
      myMainNav.style.top = '-108px';
      LeftMainDOM.style.top = '-108px';
      RightMainDOM.style.top = '-108px';
      MiddleMainDOM.style.top = '-108px';
      MainContainerAlertTemp.style.top = '-108px';
      if (MainAlertTemp === undefined || MainAlertTemp === null) {
      } else {
        MainAlertTemp.style.top = '-108px';
      }
      if (BusExpTableAlertDOM === undefined || BusExpTableAlertDOM === null) {
      } else {
        BusExpTableAlertDOM.style.top = '-108px';
      }
      myDOMs.main_page.NavToggleBtn.innerText = 'Display Menu Bar';

      if (window.innerWidth < 992) {
        let MyCollapse = document.getElementById("navbarCollapse");
        let myCollapseVal = MyCollapse.offsetTop;
        if (myCollapseVal !== 0 || myCollapseVal === 0 && NavBarCollapseOpen === true) {
          myDOMs.nav.NavBarCollapse.click(false);
        }
      }


    }

  }

};

updateHSTMenus();

function updateHSTMenus() {
  let myProv = localStorage.getItem(`${userEmail}_Selected_Province`);
  if (myProv === "4" || myProv === "5" || myProv === "7" || myProv === "9" || myProv === "10") {
    myDOMs.main.HSTPaymentEntryMenu.innerText = ' HST Payment'
    myDOMs.main.HSTPaymentReportMenu.innerText = ' HST Payment Report'
  } else {
    myDOMs.main.HSTPaymentEntryMenu.innerText = ' GST Payment'
    myDOMs.main.HSTPaymentReportMenu.innerText = ' GST Payment Report'
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
    myDOMs.incomeStatement.RentalBodyElement.Wages.innerText = `Salaries,wages, and benefits`;
  } else {
    myDOMs.incomeStatement.BusBodyElement.Dues.innerText = 'Fees, licences, dues, memberships';
    myDOMs.incomeStatement.BusBodyElement.Freight.innerText = 'Delivery, freight, and express';
    myDOMs.incomeStatement.BusBodyElement.Fuel.innerText = 'Fuel costs (except vehicles)';
    myDOMs.incomeStatement.BusBodyElement.Maintenance.innerText = 'Maintenance and Repairs';
    myDOMs.incomeStatement.BusBodyElement.Admin.innerText = 'Management and administration fees';
    myDOMs.incomeStatement.BusBodyElement.Legal.innerText = 'Legal, accounting, and other Prof. Fees';
    myDOMs.incomeStatement.BusBodyElement.Wages.innerText = 'Salaries, wages, and benefits';
    myDOMs.incomeStatement.BusBodyElement.CCA.innerText = 'Capital Cost Allowance (CCA)/Fixed Asset Depreciation Claim';
    myDOMs.incomeStatement.RentalBodyElement.Wages.innerText = `Salaries,wages, and benefits(incl employer's contribution)`;
  }
}

function AddorRemoveVLogNavBtnsText() {
  if (window.innerWidth < 510) {
    myDOMs.vehicleLog.PreviousBtn.innerHTML = '<i class="fas fa-step-backward"></i>';
    myDOMs.vehicleLog.NextBtn.innerHTML = '<i class="fas fa-step-forward"></i>';
    myDOMs.vehicleLog.FirstBtn.innerHTML = '<i class="fas fa-fast-backward"></i>';
    myDOMs.vehicleLog.LastBtn.innerHTML = '<i class="fas fa-fast-forward"></i>';
  } else {
    myDOMs.vehicleLog.PreviousBtn.innerHTML = '<i class="fas fa-step-backward"></i> Previous';
    myDOMs.vehicleLog.NextBtn.innerHTML = 'Next <i class="fas fa-step-forward"></i>';
    myDOMs.vehicleLog.FirstBtn.innerHTML = '<i class="fas fa-fast-backward"></i> First';
    myDOMs.vehicleLog.LastBtn.innerHTML = 'Last <i class="fas fa-fast-forward"></i>';
  }
};

function ChangeVlogLabelTextForResize() {
  if (window.innerWidth < 992) {
    myDOMs.vehicleLog.BusKMsInputLabel.innerText = 'Bus KM';
    myDOMs.vehicleLog.PersKMsInputLabel.innerText = 'Per KM';
    myDOMs.vehicleLog.OdometerInputLabel.innerText = 'Od Pr Yr';
    myDOMs.vehicleLog.SaveOdometerBtn.innerText = 'Save Od';

    myDOMs.vehicleLog.BusKMsTotalLabel.innerText = 'Ttl Bus KM';
    myDOMs.vehicleLog.PersKMsTotalsLabel.innerText = 'Ttl Per KM';
    myDOMs.vehicleLog.OdometerTotalLabel.innerText = 'Odometer';
    myDOMs.vehicleLog.ResetLogBtn.innerText = 'Reset Log';

    myDOMs.vehicleLog.BusPercentYearLabel.innerText = '% Yr';
    myDOMs.vehicleLog.BusPercentQuarterLabel.innerText = '% ¼';
    myDOMs.vehicleLog.BusPercentMonthLabel.innerText = '% Mth';
    myDOMs.vehicleLog.QuickPercentBtn.innerText = 'Quick Set %';
  } else {
    myDOMs.vehicleLog.BusKMsInputLabel.innerText = 'Business KM';
    myDOMs.vehicleLog.PersKMsInputLabel.innerText = 'Personal KM';
    myDOMs.vehicleLog.OdometerInputLabel.innerText = 'Odometer Previous Year';
    myDOMs.vehicleLog.SaveOdometerBtn.innerText = 'Save Odometer';

    myDOMs.vehicleLog.BusKMsTotalLabel.innerText = 'Total Business KM';
    myDOMs.vehicleLog.PersKMsTotalsLabel.innerText = 'Total Personal KM';
    myDOMs.vehicleLog.OdometerTotalLabel.innerText = 'Odometer';
    myDOMs.vehicleLog.ResetLogBtn.innerText = 'Reset Log';

    myDOMs.vehicleLog.BusPercentYearLabel.innerText = 'Business % Year';
    myDOMs.vehicleLog.BusPercentQuarterLabel.innerText = 'Business % ¼';
    myDOMs.vehicleLog.BusPercentMonthLabel.innerText = 'Business % Month';
    myDOMs.vehicleLog.QuickPercentBtn.innerText = 'Quick Method Set %';
  }
}

runResizeCode();

window.addEventListener('resize', function (e) {
  runResizeCode();
});

function runResizeCode() {
  renameIncomeStatementElements();
  AddorRemoveVLogNavBtnsText();
  ChangeVlogLabelTextForResize();
};

function getTodaysDate() {
  let today = new Date();
  let dd = today.getUTCDate();
  let mm = today.getUTCMonth() + 1; //January is 0!
  let yyyy = today.getUTCFullYear();

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
  let myDay = myDate.getUTCDate();
  let myMonth = myDate.getUTCMonth() + 1;
  let myYear = myDate.getUTCFullYear();

  if (myDay < 10) {
    myDay = `0${myDay}`;
  }
  if (myMonth < 10) {
    myMonth = `0${myMonth}`;
  }

  return myMonth + "-" + myDay + "-" + myYear;
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
  let data = arrOfObjectToArrOfArrays();
  let columns = ["  #  ", "DATE", "NET", "HST", "PST", "TOTAL", "DESCRIPTION", "SUPPLIER", "CATEGORY"];
  let doc = new jsPDF('l', 'px', 'letter', true);
  if (expGroup === 'Bus-Inc' || expGroup === 'Rental-Inc') {
    doc.setTextColor(40, 167, 69);
  } else {
    doc.setTextColor(18, 19, 194);
  }

  doc.setFontSize(9);
  switch (expGroup) {
    case 'Bus-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Business(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      } else {
        headText = `${curTableArray.length} Business Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      }
      break;
    case 'V1-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Vehicle-1(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-1 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      } else {
        headText = `${curTableArray.length} Vehicle-1 Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-1 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`;
      }
      break;
    case 'V2-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Vehicle-2(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-2 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Vehicle-2 Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Vehicle-2 Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Home-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Home(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Home Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Home Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Home Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Other-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Other(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Other Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Other Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Other Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Rental-Exp':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Rental(${myReportTotal.categoryFull}) Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Rental Expenses. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Expenses(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Bus-Inc':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Business Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Business Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Business Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'Rental-Inc':
      if (reOpenIncomeStatement) {
        headText = `${curTableArray.length} Rental Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      } else {
        headText = `${curTableArray.length} Rental Revenue Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
        fileSaveText = `Rental Revenue(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
      }
      break;
    case 'VLog':
      headText = `${curTableArray.length} Log Entries. (${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()})`;
      fileSaveText = `Vehicle Log(${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDate()} to ${endDate.getUTCFullYear()}-${endDate.getUTCMonth() + 1}-${endDate.getUTCDate()}).pdf`
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
      alignCol(cell, data, true, expGroup);
    },
    createdCell: function (cell, data) {
      alignCol(cell, data, false, expGroup);
    }
    //columnStyles: { DATE: { halign: 'right' }, NET: { halign: 'right' }, HST: { halign: 'right' }, PST: { halign: 'right' }, TOTAL: { halign: 'right' } }
  });

  doc.save(fileSaveText);

}

function alignCol(cell, data, isHeader, expGroup) {

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
  if (isHeader) {
    if (expGroup === 'Bus-Inc' || expGroup === 'Rental-Inc') {
      cell.styles.fillColor = [40, 167, 69];
    } else {
      cell.styles.fillColor = [18, 19, 194];
    }

  }
}


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
      auth: window.sessionStorage.getItem('myRandomVar')
    }
  })
    .done(function (data) {
      vendorCar = false;
      categoryCar = false;
    })
    .fail(function (e) { });
}

async function userLogout(autoGenerated) {
  await resumeUserLogout(autoGenerated);
  ToggleMenuBar();

}

function resumeUserLogout(autoGenerated) {
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
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${serverURL}users/me/token`,
      method: "DELETE",
      data: {
        auth: window.sessionStorage.getItem('myRandomVar')
      }
    })
      .done(function (data) {
        resolve(data);
        afterLogout();
        if (autoGenerated) {
          displayAlert(
            myDOMs.main.AlertContainer,
            "mainAlert",
            "closeBtnAlertMain",
            "EZ-HST-Canada has detected no activity for over 15 min and has Logged Out Successfully! ",
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
          ToggleNavAfterTimeDelay();
          userEmail = '';
        }
      })
      .fail(function (e) {
        reject(e);
      });
  });


};

function ToggleNavAfterTimeDelay() {
  setTimeout(function () {
    let myMainNav = document.getElementById("main-nav");
    let myTopVal = myMainNav.offsetTop;
    if (myTopVal === -108) {
      ToggleMenuBar();
    }
  }, 6000);
};



function afterLogout() {
  window.sessionStorage.removeItem('myRandomVar');
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
  verifyAllLocalStorageForSettings();
  myDOMs.nav.UserLogName.innerText = `${userName} - Logged In`;
  await populateBusinessCategories();
  await populateHomeCategories();
  await populateOtherCategories();
  await populateRentalCategories();
  await populateVehicleCategories();
  await populateVehicleVendors();
  await populateBusinessVendors();
  await populateHomeVendors();
  await populateOtherVendors();
  await populateRentalVendors();
  await populateIncomeVendors();
  await getMiscData();

  await getAllMainData();
  await getVehiclePercentage();
  fillMainDataFromArrays();
  fillAcctBalance();
}

function getUserMe() {
  $.ajax({
    method: "GET",
    url: `${serverURL}users/me`,
    data: {
      auth: window.sessionStorage.getItem('myRandomVar')
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
      window.sessionStorage.setItem('myRandomVar', data.token);
      userEmail = tempdata.email;
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
  } else if (curAlertID === "HSTPaymentExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('HSTPaymentExpAlert')");
  } else if (curAlertID === "PSTPaymentExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('PSTPaymentExpAlert')");
  } else if (curAlertID === "TAXPaymentExpAlert") {
    myBtn.setAttribute("onclick", "hideAlert('TAXPaymentExpAlert')");
  } else if (curAlertID === "FixedAssetAlert") {
    myBtn.setAttribute("onclick", "hideAlert('FixedAssetAlert')");
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
  let myMainNav = document.getElementById("main-nav");
  let myTopVal = myMainNav.offsetTop;

  if (myTopVal === -108 && AlertID === 'mainAlert') {
    ToggleMenuBar();
  }
};

function hideTableAlert() {
  $("#mainTableAlert").hide("fade");
  lastReportPageRowCount = 0;
  currentTablePage = 0;
  currentTablePages = 0;
  rowCountPerPage = rowCountPerPageDefault;
  emptyReportArrays();
  removeTblNavAlertChildNodes();
  removeVlogTblNavAlertChildNodes();
  TableOpen = false;
  if (reOpenIncomeStatement) {
    reOpenIncomeStatement = false;
    displayIncomeStatementModal();
    return;
  }

  ToggleMenuBar();

};

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

  if (myDOMs.main.AlertContainer.hasChildNodes()) {
    while (myDOMs.main.AlertContainer.firstChild) {
      myDOMs.main.AlertContainer.removeChild(myDOMs.main.AlertContainer.firstChild);
    }
  }

};

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

  if (myDOMs.main.AlertContainer.hasChildNodes()) {
    while (myDOMs.main.AlertContainer.firstChild) {
      myDOMs.main.AlertContainer.removeChild(myDOMs.main.AlertContainer.firstChild);
    }
  }

};

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
      window.sessionStorage.setItem('myRandomVar', data.token);
      afterLogin(mydata.firstName);
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
};

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
  ToggleMenuBar();
};

function hideUserSetupModal() {

  $("#userSetupModal").modal('hide');
  ToggleMenuBar();

};

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
  ToggleMenuBar();
};

function hideLoginUser() {

  $("#userLoginModal").modal('hide');
  ToggleMenuBar();

};

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
};

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
};

$("#userSetupModal").on("hidden.bs.modal", function () {
  myDOMs.userSetupModal.Form.reset();
});

$("#userLoginModal").on("hidden.bs.modal", function () {
  myDOMs.userLoginModal.Form.reset();
});

// code to Logout when browser is closed
window.addEventListener("beforeunload", function (event) {
  if (window.sessionStorage.getItem('myRandomVar') !== "" || window.sessionStorage.getItem('myRandomVar') !== null) {
    browserLogout();
  }
});

function updateFormButtons(myForm) {
  switch (myForm) {
    case 'Asset':
      if ($('#Asset_id').val() !== "") {
        if ($('#AssetSubmitBtn').hasClass("disabled")) {
        } else {
          $('#AssetSubmitBtn').addClass("disabled");
        }
        if ($('#AssetDeleteBtn').hasClass("disabled")) {
          $('#AssetDeleteBtn').removeClass("disabled");
        }
        if ($('#AssetSaveChangesBtn').hasClass("disabled")) {
          $('#AssetSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#AssetSubmitBtn').hasClass("disabled")) {
          $('#AssetSubmitBtn').removeClass("disabled");
        }
        if ($('#AssetDeleteBtn').hasClass("disabled")) {
        } else {
          $('#AssetDeleteBtn').addClass("disabled");
        }
        if ($('#AssetSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#AssetSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'TAXPayment':
      if ($('#taxBlindPaymentID').val() !== "") {
        if ($('#taxPaymentSubmitBtn').hasClass("disabled")) {
        } else {
          $('#taxPaymentSubmitBtn').addClass("disabled");
        }
        if ($('#taxPaymentDeleteBtn').hasClass("disabled")) {
          $('#taxPaymentDeleteBtn').removeClass("disabled");
        }
        if ($('#taxPaymentSaveChangesBtn').hasClass("disabled")) {
          $('#taxPaymentSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#taxPaymentSubmitBtn').hasClass("disabled")) {
          $('#taxPaymentSubmitBtn').removeClass("disabled");
        }
        if ($('#taxPaymentDeleteBtn').hasClass("disabled")) {
        } else {
          $('#taxPaymentDeleteBtn').addClass("disabled");
        }
        if ($('#taxPaymentSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#taxPaymentSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'PSTPayment':
      if ($('#pstBlindPaymentID').val() !== "") {
        if ($('#pstPaymentSubmitBtn').hasClass("disabled")) {
        } else {
          $('#pstPaymentSubmitBtn').addClass("disabled");
        }
        if ($('#pstPaymentDeleteBtn').hasClass("disabled")) {
          $('#pstPaymentDeleteBtn').removeClass("disabled");
        }
        if ($('#pstPaymentSaveChangesBtn').hasClass("disabled")) {
          $('#pstPaymentSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#pstPaymentSubmitBtn').hasClass("disabled")) {
          $('#pstPaymentSubmitBtn').removeClass("disabled");
        }
        if ($('#pstPaymentDeleteBtn').hasClass("disabled")) {
        } else {
          $('#pstPaymentDeleteBtn').addClass("disabled");
        }
        if ($('#pstPaymentSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#pstPaymentSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'HSTPayment':
      if ($('#hstBlindPaymentID').val() !== "") {
        if ($('#hstPaymentSubmitBtn').hasClass("disabled")) {
        } else {
          $('#hstPaymentSubmitBtn').addClass("disabled");
        }
        if ($('#hstPaymentDeleteBtn').hasClass("disabled")) {
          $('#hstPaymentDeleteBtn').removeClass("disabled");
        }
        if ($('#hstPaymentSaveChangesBtn').hasClass("disabled")) {
          $('#hstPaymentSaveChangesBtn').removeClass("disabled");
        }
      } else {
        if ($('#hstPaymentSubmitBtn').hasClass("disabled")) {
          $('#hstPaymentSubmitBtn').removeClass("disabled");
        }
        if ($('#hstPaymentDeleteBtn').hasClass("disabled")) {
        } else {
          $('#hstPaymentDeleteBtn').addClass("disabled");
        }
        if ($('#hstPaymentSaveChangesBtn').hasClass("disabled")) {
        } else {
          $('#hstPaymentSaveChangesBtn').addClass("disabled");
        }
      }
      break;
    case 'income':
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


function ResizeImage(mySource) {
  let filesToUploads;
  // if (window.File && window.FileReader && window.FileList && window.Blob) {
  switch (mySource) {
    case 'BusExp':
      filesToUploads = document.getElementById('imgloadBus').files;
      break;
    case 'CarExp':
      filesToUploads = document.getElementById('imgload').files;
      break;
    case 'HomeExp':
      filesToUploads = document.getElementById('imgloadHome').files;
      break;
    case 'OtherExp':
      filesToUploads = document.getElementById('imgloadOther').files;
      break;
    case 'RentalExp':
      filesToUploads = document.getElementById('imgloadRental').files;
      break;
    case 'Income':
      filesToUploads = document.getElementById('imgloadIncome').files;
  }

  let file = filesToUploads[0];
  if (file) {
    readFile(file, mySource);
  }
};

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};


function processFile(dataURL, fileType, mySource) {
  var maxWidth = 900;
  var maxHeight = 900;

  var image = new Image();
  image.src = dataURL;

  image.onload = function () {
    var width = image.width;
    var height = image.height;
    var shouldResize = (width > maxWidth) || (height > maxHeight);

    if (!shouldResize) {
      sendFile(dataURL);
      return;
    }

    var newWidth;
    var newHeight;

    if (width > height) {
      newHeight = height * (maxWidth / width);
      newWidth = maxWidth;
    } else {
      newWidth = width * (maxHeight / height);
      newHeight = maxHeight;
    }

    var canvas = document.createElement('canvas');

    canvas.width = newWidth;
    canvas.height = newHeight;

    var context = canvas.getContext('2d');

    context.drawImage(this, 0, 0, newWidth, newHeight);

    dataURL = canvas.toDataURL(fileType);

    ImgReceiptToSend = dataURL;

    switch (mySource) {
      case 'BusExp':
        document.getElementById('myImgBus').src = dataURL;
        document.getElementById('myImgBusBlind').src = dataURL;
        break;
      case 'CarExp':
        document.getElementById('myImg').src = dataURL;
        document.getElementById('myImgBlind').src = dataURL;
        break;
      case 'HomeExp':
        document.getElementById('myImgHome').src = dataURL;
        document.getElementById('myImgHomeBlind').src = dataURL;
        break;
      case 'OtherExp':
        document.getElementById('myImgOther').src = dataURL;
        document.getElementById('myImgOtherBlind').src = dataURL;
        break;
      case 'RentalExp':
        document.getElementById('myImgRental').src = dataURL;
        document.getElementById('myImgRentalBlind').src = dataURL;
        break;
      case 'Income':
        document.getElementById('myImgIncome').src = dataURL;
        document.getElementById('myImgIncomeBlind').src = dataURL;
    }
  };

  image.onerror = function () {
    alert('There was an error processing your file!');
  };
}



function readFile(file, mySource) {
  var reader = new FileReader();

  reader.onloadend = function () {
    processFile(reader.result, file.typ, mySource);
  }

  reader.onerror = function () {
    alert('There was an error reading the file!');
  }

  reader.readAsDataURL(file);
}