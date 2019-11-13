//budget Controller
var budgetController = (function() {})();

//UIController
var UIController = (function() {
  var Domstings = {
    inputType: ".add__type",
    inputDescripton: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(inputType).value,
        description: document.querySelector(inputDescripton).value,
        value: document.querySelector(inputValue).value
      };
    },
    getDomstrings: function() {
      return Domstings;
    }
  };
})();

//Global app controller
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListener = function() {
    var DOM = UICtrl.Domstings;
    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", cntrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        cntrlAddItem();
      }
    });
  };

  var cntrlAddItem = function() {
    var input = UICtrl.getInput();
    console.log(input);
  };

  return {
    init: function() {
      //initialize the event listener fuction
      setupEventListener();
    }
  };
})(budgetController, UIController);

controller.init();
