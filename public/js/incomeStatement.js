
function displayIncomeStatementModal() {
  $("#incStatementModal").modal("show");
}

function hideIncomeStatementModal() {
  $("#incStatementModal").modal("hide");
}

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

function displayAdvertisingReport() {
  alert('Advertising Report Under Construction!');
}

function displayDuesReport() {
  alert('Fees, licences, dues, memberships Report Under Construction!');
}

function displayMealsReport() {
  alert('Meals Report Under Construction!');
}

function displayOfficeReport() {
  alert('Office Expenses Report Under Construction!');
}

function displaySuppliesReport() {
  alert('Supplies Report Under Construction!');
}

function displayCellReport() {
  alert('Cell Phone Report Under Construction!');
}

function displayOtherReport() {
  alert('Other Expenses Report Under Construction!');
}

function displayFreightReport() {
  alert('Freight Report Under Construction!');
}

function displayFuelReport() {
  alert('Fuel Cost Report Under Construction!');
}

function displayInsuranceReport() {
  alert('Insurance Report Under Construction!');
}

function displayInterestReport() {
  alert('Interest Report Under Construction!');
}

function displayMaintenanceReport() {
  alert('Maintenance and Repairs Report Under Construction!');
}

//Business
function displayAdminReport() {
  alert('Management and administration fees Report Under Construction!');
}

function displayLegalReport() {
  alert('Legal Accounting and Other Prof. fees Report Under Construction!');
}

function displayPropertyTaxReport() {
  alert('Property Taxes Report Under Construction!');
}

function displayRentReport() {
  alert('Rent Report Under Construction!');
}

function displayWagesReport() {
  alert('Wages Report Under Construction!');
}

function displayTravelReport() {
  alert('Travel Report Under Construction!');
}

function displayVariable1Report() {
  alert('Variable 1 Report Under Construction!');
}

function displayVariable2Report() {
  alert('Variable 2 Report Under Construction!');
}

function displayVariable3Report() {
  alert('Variable 3 Report Under Construction!');
}

function displayVariable4Report() {
  alert('Variable 4 Report Under Construction!');
}

function displayVariable5Report() {
  alert('Variable 5 Report Under Construction!');
}

function displayCCAReport() {
  alert('CCA Report Under Construction!');
}

//Home 

function displayHomeHeatReport() {
  alert('Home Heat Report Under Construction!');
}

function displayHomeElectricityReport() {
  alert('Home Electricity Report Under Construction!');
}

function displayHomeInsuranceReport() {
  alert('Home Insurance Report Under Construction!');
}

function displayhomeMaintenanceReport() {
  alert('Home Maintenance Report Under Construction!');
}

function displayHomeMortgageReport() {
  alert('Home Mortgage Interest Report Under Construction!');
}

function displayHomePropertyTaxesReport() {
  alert('Home Property Taxes Report Under Construction!');
}

function displayHomeOtherReport() {
  alert('Home Other Expenses Report Under Construction!');
}

function displayHomeWaterReport() {
  alert('Home Water and Sewage Report Under Construction!');
}

function displayHomeVariable1Report() {
  alert('Home Variable 1 Report Under Construction!');
}

function displayHomeVariable2Report() {
  alert('Home Variable 2 Report Under Construction!');
}

function displayHomeVariable3Report() {
  alert('Home Variable 3 Report Under Construction!');
}

//Vehicle 1 

function displayVehicle1FuelReport() {
  alert('Vehicle 1 Fuel and Oil Report Under Construction!');
}

function displayVehicle1InterestLoanReport() {
  alert('Vehicle 1 Interest on Loan Report Under Construction!');
}

function displayVehicle1InsuranceReport() {
  alert('Vehicle 1 Insurance Report Under Construction!');
}

function displayVehicle1RegistrationReport() {
  alert('Vehicle 1 Licence and Registration Report Under Construction!');
}

function displayVehicle1MaintenanceReport() {
  alert('Vehicle 1 Manitenance and Repairs Report Under Construction!');
}

function displayVehicle1LeasingReport() {
  alert('Vehicle 1 Leasing Report Under Construction!');
}

function displayVehicle1OtherReport() {
  alert('Vehicle 1 Other Expenses Report Under Construction!');
}

function displayVehicle1Variable1Report() {
  alert('Vehicle 1 Variable 1 Report Under Construction!');
}

function displayVehicle1Variable2Report() {
  alert('Vehicle 1 Variable 2 Report Under Construction!');
}

function displayVehicle1Variable3Report() {
  alert('Vehicle 1 Variable 3 Report Under Construction!');
}

function displayvehicle1BusParkReport() {
  alert('Vehicle 1 Business parking fees Report Under Construction!');
}

function displayVehicle1SuppInsuranceReport() {
  alert('Vehicle 1 Supplementary business insurance Report Under Construction!');
}

//Vehicle 2

function displayVehicle2FuelReport() {
  alert('Vehicle 2 Fuel and Oil Report Under Construction!');
}

function displayVehicle2InterestLoanReport() {
  alert('Vehicle 2 Interest on Loan Report Under Construction!');
}

function displayVehicle2InsuranceReport() {
  alert('Vehicle 2 Insurance Report Under Construction!');
}

function displayVehicle2RegistrationReport() {
  alert('Vehicle 2 Licence and Registration Report Under Construction!');
}

function displayVehicle2MaintenanceReport() {
  alert('Vehicle 2 Manitenance and Repairs Report Under Construction!');
}

function displayVehicle2LeasingReport() {
  alert('Vehicle 2 Leasing Report Under Construction!');
}

function displayVehicle2OtherReport() {
  alert('Vehicle 2 Other Expenses Report Under Construction!');
}

function displayVehicle2Variable1Report() {
  alert('Vehicle 2 Variable 1 Report Under Construction!');
}

function displayVehicle2Variable2Report() {
  alert('Vehicle 2 Variable 2 Report Under Construction!');
}

function displayVehicle2Variable3Report() {
  alert('Vehicle 2 Variable 3 Report Under Construction!');
}

function displayvehicle2BusParkReport() {
  alert('Vehicle 2 Business parking fees Report Under Construction!');
}

function displayVehicle2SuppInsuranceReport() {
  alert('Vehicle 2 Supplementary business insurance Report Under Construction!');
}


//Rental 

function displayRentalAdvertisingReport() {
  alert('Rental Advertising Report Under Construction!');
}

function displayRentalInsuranceReport() {
  alert('Rental Insurance Report Under Construction!');
}

function displayRentalInterestReport() {
  alert('Rental Interest Report Under Construction!');
}

function displayRentalMaintenanceReport() {
  alert('Rental Maintenance and Repairs Report Under Construction!');
}

function displayRentalAdminReport() {
  alert('Rental Management and administration fees Report Under Construction!');
}

function displayRentalMotorReport() {
  alert('Rental Motor Vehicle Expenses Report Under Construction!');
}

function displayRentalOfficeReport() {
  alert('Rental Office Expenses Report Under Construction!');
}

function displayRentalLegalReport() {
  alert('Rental Legal, accounting, and other Prof. Fees Report Under Construction!');
}

function displayRentalPropertyTaxReport() {
  alert('Rental Property Taxes Report Under Construction!');
}

function displayRentalWagesReport() {
  alert('Rental Salary Wages and Benefits Report Under Construction!');
}

function displayRentalTravelReport() {
  alert('Rental Travel Expenses Report Under Construction!');
}

function displayRentalUtilitiesReport() {
  alert('Rental Utility Expenses insurance Report Under Construction!');
}

function displayRentalOtherReport() {
  alert('Rental Other Expenses Report Under Construction!');
}

function displayRentalVariable1Report() {
  alert('Rental Variable 1 Expenses Report Under Construction!');
}

function displayRentalVariable2Report() {
  alert('Rental Variable 2 Expenses Report Under Construction!');
}

