let RefundEmailIsOn = false;

function displayPaymentModal() {
   $("#paymentModal").modal("show");
   updatePaymentType('Multi');
};

function hidePaymentModal() {
   $("#paymentModal").modal("hide");
};

function updatePaymentType(source) {

   if (source === 'Single') {

      if ($('#payNowBtn').hasClass("disabled")) {
         $('#payNowBtn').removeClass("disabled");
      }
      if ($('#payMonthlyBtn').hasClass("disabled")) {
      } else {
         $('#payMonthlyBtn').addClass("disabled");
      }

      myDOMs.Payments.Single_Payment_Radio.checked = true;
      myDOMs.Payments.Subscription_Radio.checked = false;

   } else if (source === 'Multi') {
      if ($('#payMonthlyBtn').hasClass("disabled")) {
         $('#payMonthlyBtn').removeClass("disabled");
      }
      if ($('#payNowBtn').hasClass("disabled")) {
      } else {
         $('#payNowBtn').addClass("disabled");
      }

      myDOMs.Payments.Subscription_Radio.checked = true;
      myDOMs.Payments.Single_Payment_Radio.checked = false;
   }

};

function updatePaymentPlanSelect() {

   let myDateTemp = new Date(myDOMs.main_page.StartDate.value);
   let myYearTemp = myDateTemp.getUTCFullYear();
   if (myDOMs.Payments.Payment_Plan_Select.value === '5') {
      myDOMs.Payments.Start_Date.value = `${myYearTemp}-01-01`;
   } else {
      myDOMs.Payments.Start_Date.value = '';
   }

};

function startPaymentMethod() {

   let PaymentAmt = 0;
   let StartDate = new Date(myDOMs.Payments.Start_Date.value);

   switch (myDOMs.Payments.Payment_Plan_Select.value) {
      case '1':
         PaymentAmt = 1.99;
         break;
      case '2':
         PaymentAmt = 5.22;
         break;
      case '3':
         PaymentAmt = 8.94;
         break;
      case '4':
         PaymentAmt = 11.16;
         break;
      case '5':
         PaymentAmt = 11.88;
         break;
   }

   let formData = new FormData();
   formData.append("auth", window.sessionStorage.getItem('myRandomVar'));
   formData.append("PaymentAmt", PaymentAmt);
   formData.append("StartDate", StartDate);

   // let myData = {
   //   auth: window.sessionStorage.getItem('myRandomVar')
   // }

   $.ajax({
      method: "POST",
      url: `${serverURL}payPal`,
      data: formData,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false
      // enctype: "multipart/form-data",
      // enctype: "form-data",
      // processData: false,
      // contentType: "text/json"
   })
      .done(async function (data) {
         window.open(data);

      })
      .fail(function (err) {
         alert(JSON.stringify(err, undefined, 2));
         alert("Payment was NOT completed Successfully!");
      });


};











let resetRecaptcha = function () {
   $('.pls-container').remove();
   grecaptcha.reset();
};



function displayEmailContactModal(fromPayment) {
   if (userEmail === null || userEmail === '') {
      alert('You must be looged in to use any controls!');
      return;
   }
   if (fromPayment) {
      hidePaymentModal();
   }
   $("#emailContactModal").modal("show");
};

function hideEmailContactModal() {
   myDOMs.Contact_Email.Form.reset();
   resetRecaptcha();
   $("#emailContactModal").modal("hide");
};


function SendContactEmail() {
   if (!validateContactEmailEntryForm()) {
      return;
   }
   let myCaptcha = document.querySelector('#g-recaptcha-response').value;

   if (
      myCaptcha === undefined ||
      myCaptcha === '' ||
      myCaptcha === null
   ) {
      displayAlert(
         myDOMs.Contact_Email.Alert_Container,
         "contact_EmailAlert",
         "contact_EmailCloseBtnAlert",
         'Do not forget to check i am Not a Robot!',
         "",
         ` `,
         "RED",
         6000
      );
      return;
   }


   let mydata = {
      firstName: myDOMs.Contact_Email.First_Name.value,
      lastName: myDOMs.Contact_Email.Last_Name.value,
      email: myDOMs.Contact_Email.Email.value,
      message: myDOMs.Contact_Email.Email_Msg.value,
      captcha: document.querySelector('#g-recaptcha-response').value,
      auth: window.sessionStorage.getItem('myRandomVar'),
   };

   $.ajax({
      method: "POST",
      url: `${serverURL}contact`,
      data: mydata,
      enctype: "multipart/form-data"
   })
      .done(async function (data) {

         displayAlert(
            myDOMs.Contact_Email.Alert_Container,
            "contact_EmailAlert",
            "contact_EmailCloseBtnAlert",
            `${data} `,
            "",
            ` `,
            "GREEN",
            6000
         );

      })
      .fail(function (err) {
         displayAlert(
            myDOMs.Contact_Email.Alert_Container,
            "contact_EmailAlert",
            "contact_EmailCloseBtnAlert",
            `${err} `,
            "",
            " ",
            "RED",
            6000
         );
      });

};

function validateContactEmailEntryForm() {
   const First_Name = document.forms["emailContactForm"]["emailContactfirstName"];
   const Last_Name = document.forms["emailContactForm"]["emailContactlastName"];
   const Contact_Email = document.forms["emailContactForm"]["emailContactEmail"];
   const Email_Msg = document.forms["emailContactForm"]["emailContactMessage"];



   if (First_Name.value == "") {
      window.alert("Please Enter Your First Name.");
      First_Name.focus();
      return false;
   }


   if (Last_Name.value == "") {
      window.alert("Please Enter Your Last Name.");
      Last_Name.focus();
      return false;
   }

   if (Contact_Email.value == "") {
      window.alert("Please Enter Your Email.");
      Contact_Email.focus();
      return false;
   }

   if (Email_Msg.value == "") {
      window.alert("Please Enter Your Message.");
      Email_Msg.focus();
      return false;
   }

   return true;
}
