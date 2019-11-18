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

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
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

      if ((type = "exp")) {
        newItem = new Expenses(Id, des, val);
      } else if ((type = "inc")) {
        newItem = new Income(Id, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
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
        value: document.querySelector(Domstings.inputValue).value
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
      fieldsArray.forEach(function(current, index, array) {
        console.log(current);
        current.value = "";
      });
      console.log(fields);
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

  var cntrlAddItem = function() {
    var input, newItem;
    input = UICtrl.getInput();

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    UICtrl.addListItem(newItem, input.type);
    UICtrl.clearField();
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
