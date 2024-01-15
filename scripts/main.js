
$(document).ready(function () {

  const url = "";
  const username = '';
  const password = '';

  var queryParams = getUrlQueryParams();

  const $btnNext = $("#next");
  const $btnBack = $("#back");
  const $btnSend = $("#send");
  $btnNext.hide();
  $btnSend.hide();
  $btnBack.hide();

  var firstSection = $('#first-section');
  var lastSection = $('#last-section');
  var warningSection = $('#last-section-warning');
  var isSurveyAv = isSurveyAvailable(queryParams["token"]);
  console.log(isSurveyAv);
  var currentStep = 1;

  firstSection.hide();
  lastSection.hide();

  if(isSurveyAv){
    showWelcomeSection();
  }

  if(isSurveyAv == false){
    showEndingSection();
  }

  if(isSurveyAv === 'error'){
    showWarningSection();
  }


 


  var question1 = $("#question-1");
  var question2 = $("#question-2");
  var question3 = $("#question-3");
  var question4 = $("#question-4");
  var question5 = $("#question-5");
  var question6 = $("#question-6");
  var question7 = $("#question-7");

  question2.addClass("disabledbutton");
  question3.addClass("disabledbutton");
  question4.addClass("disabledbutton");
  question5.addClass("disabledbutton");
  question6.addClass("disabledbutton");
  question7.addClass("disabledbutton");

  // Hide the "Siguiente" button at startup
  

  // Function to handle clicking on an icon
  function handleIconClick() {
    var selectedValue = $(this).data("value");
    var step3QuizContainer = $(this).closest(".question");
  

    step3QuizContainer.find(".optns").hide();
    step3QuizContainer
      .find(".answer-selected")
      .html($(this).clone())
      .show()
      .data("value", selectedValue)
      .off("click")
      .addClass("final-" + $(this).prop("id"))
      .click(function () {
        // When 'answer-selected' is clicked, hide the "Siguiente" button
        disableAllOtherQuestions($(this));
        $(this).hide().empty();
        step3QuizContainer.find(".optns").show();

        $btnNext.hide(); // Hide the "Siguiente" button
        $btnSend.hide();
      });
  }

  // Function to update the status of the "Siguiente" button
  function updateNextButtonState() {
    var isStep2an1Checked =
      $('[name="step2an1"]').find('input[type="checkbox"]:checked').length > 0;
    /* var isStep2an2Checked =
      $('[name="step2an2"]').find('input[type="checkbox"]:checked').length > 0;
      console.log(isStep2an2Checked); */
    var areOptionsVisible = currentStep === 3 && $(".optns:visible").length > 0;

    if (currentStep === 1) {
      $btnNext.show();
      $btnSend.hide();
    } else if (currentStep === 2) {
      $btnBack.hide();

      $btnSend.hide();
      if (
        $('input[type="radio"][name="step2brk1y"]:checked').attr("id") === "Si"
      ) {
        $btnNext.toggle(isStep2an1Checked /* && isStep2an2Checked */);
      } else if (
        $('input[type="radio"][name="step2brk1y"]:checked').attr("id") === "No"
      ) {
        $btnNext.toggle(isStep2an1Checked);
      } else {
        $btnNext.hide();
        $btnSend.hide();
      }
    } else if (currentStep === 3) {
      $btnNext.hide();
      $btnSend.toggle(checkAllQuestionsAnswered() && !areOptionsVisible);
    } else if (currentStep === 4) {
      //$btnNext.show();
      $btnBack.hide();
      //$btnNext.html('Cerrar');
      $btnNext.hide();
      $btnSend.hide();
      
      $('[name="happy"]').show();
    } else {
      $btnNext.hide();
      $btnSend.hide();
      $btnBack.hide();
    }
  }
  // Function to check if all questions have been answered
  function checkAllQuestionsAnswered() {
    var allAnswered = true;
    $("#qnr .question").each(function () {
      if ($(this).find(".answer-selected").is(":empty")) {
        allAnswered = false;
        return false;
      }
    });
    return allAnswered;
  }

  function enableNextQuestion() {
    var clickedElementId = $(this).attr("id");
    switch (clickedElementId) {
      case "answer1":
        question2.removeClass("disabledbutton");
        question2.addClass("currentSelection");
        break;
      case "answer2":
        question2.removeClass("currentSelection");
        question3.removeClass("disabledbutton");
        question3.addClass("currentSelection");
        break;
      case "answer3":
        question3.removeClass("currentSelection");
        question4.removeClass("disabledbutton");
        question4.addClass("currentSelection");
        break;
      case "answer4":
        question4.removeClass("currentSelection");
        question5.removeClass("disabledbutton");
        question5.addClass("currentSelection");
        break;
      case "answer5":
        question5.removeClass("currentSelection");
        question6.removeClass("disabledbutton");
        question6.addClass("currentSelection");
        break;
      case "answer6":
        question6.removeClass("currentSelection");
        question7.addClass("currentSelection");
        question7.removeClass("disabledbutton");
        break;
      default:
        break;
    }
  }

  function disableAllOtherQuestions(section) {

    const questions = [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
    ];
    const clickedQuestion = questions.find(
      (question) =>
        section.find(".opt").attr("id") == question.find(".opt").attr("id")
    );

    const remainingQuestions = questions.filter(
      (question) =>
        section.find(".opt").attr("id") != question.find(".opt").attr("id")
    );

    clickedQuestion.find(".answer-selected").children == 0;

    if (clickedQuestion.find(".answer-selected").children().length == 1) {
      for (let question of remainingQuestions) {
        question.addClass("disabledbutton");
      }
    }
  }

  function enableSectionsWithSelectedOptions() {
    const clickedElementId = $(this).attr("id");
    
    const questions = [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
    ];
    const clickedQuestion = questions.find(
      (question) => clickedElementId == question.find(".opt").attr("id")
    );

    const remainingQuestions = questions.filter(
      (question) => clickedElementId != question.find(".opt").attr("id")
    );
    for (let question of remainingQuestions) {
      if (
        question.find(".answer-selected").children().length == 1 ||
        question.hasClass("currentSelection")
      )
        question.removeClass("disabledbutton");
    }
  }

  function getUrlQueryParams() {
    var vars = [],
      hash;
    var hashes = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  function isSurveyAvailable(token) {
    let isAvailable = false;
    const payload = {
      action: "survey_status",
      token: token,
    };

    const headers = {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(username + ":" + password)
    };

    $.ajax({
      type: "POST",
      url: url,
      async: false,
      dataType: 'json',
      data: JSON.stringify(payload),
      headers: headers,
      success: (response) => {
        if(response.event_status === "DRAFT" ){
          isAvailable = true
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        warningSection.show();
        isAvailable = 'error';
      },
    });
    return isAvailable;
  }

  function sendSurveyData() {
    let checkboxConsultaGeneral = $("#checkbox-consulta-general").is(
      ":checked"
    );
    let checkboxCitologia = $("#checkbox-citologia").is(":checked");
    let checkboxConsejeria = $("#checkbox-consejeria").is(":checked");
    let checkboxEntrega = $("#checkbox-entrega").is(":checked");
    let checkboxAtencion = $("#checkbox-atencion").is(":checked");
    let checkboxOtros = $("#checkbox-otros").is(":checked");

    let wasInformationDeliveredRadioButton = $(
      "input[name = 'step2brk1y']:checked"
    ).val();
    let wasContraceptiveInfoReceived = false;
    let question1Answer = $(".final-answer1").find(".opt").attr("data-value");
    let question2Answer = $(".final-answer2").find(".opt").attr("data-value");
    let question3Answer = $(".final-answer3").find(".opt").attr("data-value");
    let question4Answer = $(".final-answer4").find(".opt").attr("data-value");
    let question5Answer = $(".final-answer5").find(".opt").attr("data-value");
    let question6Answer = $(".final-answer6").find(".opt").attr("data-value");
    let question7Answer = $(".final-answer7").find(".opt").attr("data-value");
    if (wasInformationDeliveredRadioButton === "true"){
      wasContraceptiveInfoReceived = true;
    }

    const headers = {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(username + ":" + password)
    };


    const payload = {
      action: "survey_record",
      token: getUrlQueryParams().token,
      datavalues: [
        {
          datapoint: "serviceDesired_medcons",
          value: checkboxConsultaGeneral,
        },
        {
          datapoint: "serviceDesired_cito",
          value: checkboxCitologia,
        },
        {
          datapoint: "serviceDesired_fplcoun_a",
          value: checkboxConsejeria,
        },
        {
          datapoint: "serviceDesired_fplcoun_b",
          value: checkboxEntrega,
        },
        {
          datapoint: "serviceDesired_osti",
          value: checkboxAtencion,
        },
        {
          datapoint: "serviceDesired_other",
          value: checkboxOtros,
        },
        {
          datapoint: "contraceptiveInfoReceived",
          value: wasContraceptiveInfoReceived,
        },
        {
          datapoint: "userGeneralSat",
          value: question1Answer,
        },
        {
          datapoint: "waitingSat",
          value: question2Answer,
        },
        {
          datapoint: "kindnessStaffSat",
          value: question3Answer,
        },
        {
          datapoint: "kindnessProviderSat",
          value: question4Answer,
        },
        {
          datapoint: "claritySat",
          value: question5Answer,
        },
        {
          datapoint: "durationSat",
          value: question6Answer,
        },
        {
          datapoint: "recommendSat",
          value: question7Answer,
        },
      ],
    };

    $.ajax({
      type: "POST",
      url: url,
      headers: headers,
      data: JSON.stringify(payload),
      success: (response)=>{endSurvey(response)},
      error: function (jqXHR, textStatus, errorThrown) {
        $('*[id*=question-section]:visible').each(function() {
          $(this).hide();
        });
      
        showWarningSection();
      },
      async:false,
    });
  }

  function endSurvey(response) {
    console.log(response);
    if (currentStep < 4) {
      $(".step" + currentStep).removeClass("active");
      $(".section")
        .eq(currentStep - 1)
        .hide();
      $(".wrapper").animate({ scrollTop: 0 }, "slow");
      currentStep++;
      $(".step" + currentStep).addClass("active");
      $(".section")
        .eq(currentStep - 1)
        .show();
      if (currentStep > 1) {
        $("#back").show();
      }
    }
    updateNextButtonState();
  }

  function showWelcomeSection(){
    firstSection.show();
    lastSection.hide();
    warningSection.hide();
  }

  function showEndingSection(){
    currentStep=4;
    firstSection.hide();
    warningSection.hide();

    $btnNext.hide();
    $btnSend.hide();
    $btnBack.hide();

    lastSection.show();
  }

  function showWarningSection(){
    currentStep=4;
    firstSection.hide();
    lastSection.hide();

    $btnNext.hide();
    $btnSend.hide();
    $btnBack.hide();
    
    warningSection.show();
  }

  // Assign the click event to icons
  $(".opt").click(handleIconClick);
  $(".opt").click(enableNextQuestion);
  $(".opt").click(enableSectionsWithSelectedOptions);

  $btnSend.click(sendSurveyData);

  // Initially hide all 'answers selected'
  $(".answer-selected").hide();


  $btnNext.click(function () {
    if (currentStep < 4) {
      $(".step" + currentStep).removeClass("active");
      $(".section")
        .eq(currentStep - 1)
        .hide();
      $(".wrapper").animate({ scrollTop: 0 }, "slow");
      currentStep++;
      $(".step" + currentStep).addClass("active");
      $(".section")
        .eq(currentStep - 1)
        .show();
      if (currentStep > 1) {
        $("#back").show();
      }
    }
    updateNextButtonState();
  });

  //'Click' event for the "Anterior" button
  $btnBack.click(function () {
    if (currentStep > 1) {
      $(".step" + currentStep).removeClass("active");
      $(".section")
        .eq(currentStep - 1)
        .hide();
      currentStep--;
      $(".step" + currentStep).addClass("active");
      $(".section")
        .eq(currentStep - 1)
        .show();
      if (currentStep === 1) {
        $("#back").hide();
      }
    }
    updateNextButtonState();
  });

  // 'change' event for 'step2brk1y' radio buttons

  $('input[type="radio"][name="step2brk1y"]').change(function () {
    var value = $(this).val();

    if (value === "Si") {
      //$('[name="step2an2"]').show();
      $('[name="step2an1"]').show();
      $('[name="step2an2"]')
        .find('input[type="checkbox"]')
        .prop("checked", true);
    } else if (value === "No") {
      //$('[name="step2an2"]').hide();
      $('[name="step2an2"]')
        .find('input[type="checkbox"]')
        .prop("checked", false);
    }
    updateNextButtonState();
  });

  // Events to update the state of the "Siguiente" button
  $(".section")
    .eq(1)
    .find('input[type="checkbox"], input[type="radio"]')
    .change(updateNextButtonState);
  $("#qnr .opt").click(function () {
    setTimeout(updateNextButtonState, 1);
  });

  // Initialize "Siguiente" button state on page load
  updateNextButtonState();
});
