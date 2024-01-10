$(document).ready(function () {
  var currentStep = 1;
  var $btnNext = $("#next");
  var $btnBack = $("#back");
  var $btnSend = $("#send");
  var $btnClose = $("#close");

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
  $btnNext.hide();
  $btnSend.hide();
  $btnClose.hide();

  // Function to handle clicking on an icon
  function handleIconClick() {
    var selectedValue = $(this).data("value");
    var step3QuizContainer = $(this).closest(".question");
    console.log("selectedValue: " + selectedValue);

    step3QuizContainer.find(".optns").hide();
    step3QuizContainer
      .find(".answer-selected")
      .html($(this).clone())
      .show()
      .data("value", selectedValue)
      .off("click")
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
    var isStep2an2Checked =
      $('[name="step2an2"]').find('input[type="checkbox"]:checked').length > 0;
    var areOptionsVisible = currentStep === 3 && $(".optns:visible").length > 0;

    if (currentStep === 1) {
      $btnNext.show();
      $btnSend.hide();
    } else if (currentStep === 2) {
      $btnBack.hide();

      $btnSend.hide();
      if ($('input[type="radio"][name="step2brk1y"]:checked').val() === "Si") {
        $btnNext.toggle(isStep2an1Checked && isStep2an2Checked);
      } else if (
        $('input[type="radio"][name="step2brk1y"]:checked').val() === "No"
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
      $btnClose.show();
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

  function disableAllOtherQuestions(section){
      console.log(section.find('.opt').attr("id"));
    
      const questions = [question1,question2,question3,question4,question5,question6,question7];
      const clickedQuestion = questions.find(question => section.find('.opt').attr("id") == question.find('.opt').attr("id"));
      const remainingQuestions = questions.filter(question => section.find('.opt').attr("id") != question.find('.opt').attr("id"));
      clickedQuestion.find('.answer-selected').children == 0;
      console.log(clickedQuestion.find('.answer-selected').children().length == 1);
      
       if(clickedQuestion.find('.answer-selected').children().length == 1){
        for(let question of remainingQuestions){
          question.addClass('disabledbutton');
        }
      }
  }

  function enableSectionsWithSelectedOptions(){
    const clickedElementId = $(this).attr("id");
    console.log(clickedElementId);
    const questions = [question1,question2,question3,question4,question5,question6,question7];
    const clickedQuestion = questions.find(question => clickedElementId == question.find('.opt').attr("id"));
    
    const remainingQuestions = questions.filter(question => clickedElementId != question.find('.opt').attr("id"));
    for(let question of remainingQuestions){
      if(question.find('.answer-selected').children().length == 1 || question.hasClass('currentSelection'))
      question.removeClass('disabledbutton');
    }
  }

  // Assign the click event to icons
  $(".opt").click(handleIconClick);
  $(".opt").click(enableNextQuestion);
  $(".opt").click(enableSectionsWithSelectedOptions);

  // Initially hide all 'answers selected'
  $(".answer-selected").hide();

  $btnSend.click(function () {
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
