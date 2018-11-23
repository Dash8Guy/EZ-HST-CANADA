
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