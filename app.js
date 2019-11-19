//budget Controller
var budgetController = (function() {
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(curr) {
      sum += curr.value;
      console.log(sum);
    });

    data.total[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {
    addItem: function(type, des, val) {
      var newItem, Id;

      if (data.allItems[type].length > 0) {
        // finding the length of the array and setting to id
        Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        Id = 0;
      }

      if (type == "exp") {
        newItem = new Expenses(Id, des, val);
      } else if (type == "inc") {
        newItem = new Income(Id, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },

    calculateBudget: function() {
      calculateTotal("inc");
      calculateTotal("exp");

      data.budget = data.total.inc - data.total.exp;

      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalIncome: data.total.inc,
        totalExpense: data.total.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//UIController
var UIController = (function() {
  var Domstings = {
    inputType: ".add__type",
    inputDescripton: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(Domstings.inputType).value, // will be either inc or exp
        description: document.querySelector(Domstings.inputDescripton).value,
        value: parseFloat(document.querySelector(Domstings.inputValue).value)
      };
    },
    getDomstrings: function() {
      return Domstings;
    },

    addListItem: function(obj, type) {
      //Create html string with html placeholder
      var html, newHtml, element;

      if (type === "inc") {
        element = Domstings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix">' +
          '<div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = Domstings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix">' +
          '<div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearField: function() {
      var fields, fieldsArray;
      fields = document.querySelectorAll(
        Domstings.inputDescripton + "," + Domstings.inputValue
      );

      fieldsArray = Array.prototype.slice.call(fields);
      console.log(fieldsArray);
      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();
    }
  };
})();

//Global app controller
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListener = function() {
    var DOM = UICtrl.getDomstrings();
    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", cntrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        cntrlAddItem();
      }
    });
  };

  var updateBudget = function() {
    budgetCtrl.calculateBudget();

    var budget = budgetCtrl.getBudget();
    console.log("budget", budget);
  };

  var cntrlAddItem = function() {
    var input, newItem;
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearField();
      updateBudget();
    }

    //   console.log(input);
  };

  return {
    init: function() {
      //initialize the event listener fuction
      setupEventListener();
    }
  };
})(budgetController, UIController);

controller.init();
