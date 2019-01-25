//enableTooltip
//rowCountPerPage
//rowCountPerPageDefault
//Province Selector
//Current HST
//Current PST

//This variable is set to False in order to disable the Tooltips
let enableTooltip;
let PST_Claim_Value;

//this variable will be set to 10, 25, 50 or 100 and is the amount of expenses per page
//It can be set in settings by users
let rowCountPerPage = 10;
//This variable is the Default to the one above and is used to keep track of the setting the user adjusted in settings
let rowCountPerPageDefault = 10;

const myDOMs = {
   User_Profile: {
      First_Name: document.getElementById('userProfilefirstName'),
      Last_Name: document.getElementById('userProfilelastName'),
      Email: document.getElementById('userProfileemail'),
      Save_Changes_Btn: document.getElementById('userProfileSaveBtn'),
      Change_Password_Btn: document.getElementById('userProfileChangePasswordBtn'),
      Close_Btn: document.getElementById('topCloseUserProfileModal'),
      Modal: document.getElementById('userProfileModal'),
      Form: document.getElementById('userProfileForm'),
      Alert_Container: document.getElementById('alertContainerUserProfile'),

   },
   Change_Password: {
      Modal: document.getElementById('userChangePasswordModal'),
      Top_Close_Btn: document.getElementById('topCloseChangePasswordUserModal'),
      Alert_Container: document.getElementById('alertContainerChangePassword'),
      Form: document.getElementById('userChangePasswordForm'),
      Password_Input: document.getElementById('ChangePassword'),
      Confirm_Password_Input: document.getElementById('ChangePasswordconfirm'),
      Save_New_Password: document.getElementById('ChangePasswordSaveBtn'),
      Invalid_Msg: document.getElementById('ChangePasswordValidMessage'),
      Invalid_Confirm_Msg: document.getElementById('confirmChangePasswordValidMessage')
   },
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
      Modal: document.getElementById('HSTReturnModal'),
      Type_Selector: document.getElementById('HSTReturnSelect')
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
      ITC_PST_Claim: document.getElementById('ITCPSTClaimAmt'),
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
      PST_ITC: document.getElementById('PSTasITC'),
      PST_EXP: document.getElementById('PSTasExpense')
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

   if (localStorage.getItem(`${userEmail}_PST_Claim_Value`) === null) {
      localStorage.setItem(`${userEmail}_PST_Claim_Value`, 'EXP');
      myDOMs.settingsModal.PST_EXP.checked = true;
      myDOMs.settingsModal.PST_ITC.checked = false;
   } else {
      PST_Claim_Value = localStorage.getItem(`${userEmail}_PST_Claim_Value`);
      if (PST_Claim_Value === 'EXP') {
         myDOMs.settingsModal.PST_EXP.checked = true;
         myDOMs.settingsModal.PST_ITC.checked = false;
      } else if (PST_Claim_Value === 'ITC') {
         myDOMs.settingsModal.PST_EXP.checked = false;
         myDOMs.settingsModal.PST_ITC.checked = true;
      }

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

async function updatePSTClaimSelection(source, FromProvSelect) {

   if (source === 'ITC') {
      myDOMs.settingsModal.PST_EXP.checked = false;
      myDOMs.settingsModal.PST_ITC.checked = true;
      localStorage.setItem(`${userEmail}_PST_Claim_Value`, 'ITC');
      PST_Claim_Value = 'ITC';
      if (Number(myDOMs.settingsModal.ProvinceSelect.value) != 11 && Number(myDOMs.settingsModal.ProvinceSelect.value) != 12 && FromProvSelect === undefined) {
         alert('The only time you should select AS ITC is when your service charges include PST\nOnly provinces that charges PST on Real Estate fees are Saskatchewan and Quebec\nThe Program will add any PST on expenses as ITCs\nThis will result in no return as you have not collected any PST on income\nand would not be registered as such with the province\nOnly select AS ITC when in Saskatchewan or Quebec.');
      }
   } else if (source === 'EXP') {
      myDOMs.settingsModal.PST_EXP.checked = true;
      myDOMs.settingsModal.PST_ITC.checked = false;
      localStorage.setItem(`${userEmail}_PST_Claim_Value`, 'EXP');
      PST_Claim_Value = 'EXP';
      if (Number(myDOMs.settingsModal.ProvinceSelect.value) === 11 && FromProvSelect === undefined || Number(myDOMs.settingsModal.ProvinceSelect.value) === 12 && FromProvSelect === undefined) {
         alert('Because your selected Province is Saskatchewan or Quebec\nThe PST Claim should be set to (AS ITC)\nIf set to AS ITC, you are able to reduce the PST owing by full amount of PST on expenses\nIf set to AS EXPENSE,\nyou can only reduce your income by the full PST amount,\nwhich results as only percentage of the full PST on expenses.');
      }
   }
   await getAllMainData();
   await getVehiclePercentage();
   fillMainDataFromArrays();
   fillAcctBalance();
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
};

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
};

myDOMs.settingsModal.ProvinceSelect.addEventListener('change', function (event) {
   let ShowalertAboutPST = '';
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
         ShowalertAboutPST = 'BC';
         break;
      case "3":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.MB.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.MB.PST
         selectedProvince = "3";
         ShowalertAboutPST = 'MB';
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
         ShowalertAboutPST = 'SK';
         break;
      case "12":
         myDOMs.settingsModal.HSTsetting.value = provinceTaxSettings.SK.HST
         myDOMs.settingsModal.PSTsetting.value = provinceTaxSettings.SK.PST
         selectedProvince = "12";
         ShowalertAboutPST = 'QC';
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
   if (ShowalertAboutPST === 'SK' || ShowalertAboutPST === 'QC') {
      alert('When your Province is Saskatchewan or Quebec\nThe PST Claim should be set to (AS ITC) for maximum return\nThe program will set it as so if not already done\nBut you can change it to suit your preferences');
      updatePSTClaimSelection('ITC', true);
   }
   if (ShowalertAboutPST === 'BC' || ShowalertAboutPST === 'MB' || ShowalertAboutPST === '') {
      alert('When your Province is not Saskatchewan or Quebec\nThe PST Claim should be set to (AS EXPENSE)\nThe program will set it as so if not already done\nBut you can change it to suit your preferences');
      updatePSTClaimSelection('EXP', true);
   }

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
