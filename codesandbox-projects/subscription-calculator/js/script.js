// selectors
var subTypeElement = document.querySelector("#subscription");
var subDurationElement = document.querySelector("#months");
var result = document.querySelector(".result");
// default values
var subType = "basic";
var subDuration = Number(1);

// event listeners
subTypeElement.addEventListener("change", function (e) {
  subType = e.target.value;
  updateSubscriptionDiv(subDuration, subType);
});

subDurationElement.addEventListener("change", function (e) {
  subDuration = Number(e.target.value);
  updateSubscriptionDiv(subDuration, subType);
});

// functions
var updateSubscriptionDiv = function (subDuration, subType) {
  var monthlyCost = 5;
  if (subType === "standard") {
    monthlyCost = 7;
  } else if (subType === "premium") {
    monthlyCost = 10;
  }

  var total = Number(subDuration * monthlyCost);
  result.innerHTML = `You have chosen a ${subDuration} month ${subType} plan for $${total}.`;
};
