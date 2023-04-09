const addGuestButton = document.querySelector(".invite");
const guestInputLabel = document.querySelector(".add-guest label");
const guestInput = document.querySelector(".add-guest input");
const guestList = document.querySelector(".guest-list");
const guestCount = document.querySelector(".attendance");
const guestFull = document.querySelector(".alert");
const assignButton = document.querySelector(".assign");
const assignedItems = document.querySelector(".assigned-items");

// event listener for addGuestButton
addGuestButton.addEventListener("click", function () {
  const guest = guestInput.value;

  if (guest !== "") {
    addToList(guest);
    updateGuestCount();
    clearInput();
  }
});

// add guest to list
const addToList = function (guest) {
  const listItem = document.createElement("li");
  listItem.innerText = guest;
  guestList.append(listItem);
};

// clear input box after entry
const clearInput = function () {
  guestInput.value = "";
};

// limit guests to 8
const updateGuestCount = function () {
  const guests = document.querySelectorAll(".guest-list li");
  guestCount.innerText = guests.length;

  if (guests.length === 8) {
    addGuestButton.classList.add("hide");
    guestInput.classList.add("hide");
    guestInputLabel.classList.add("hide");
    guestFull.classList.remove("hide");
  }
};

// assign dishes to guests
const assignItems = function () {
  const potluckItems = [
    "cocktail meatballs",
    "deviled eggs",
    "chips & guacamole",
    "pigs in a blanket",
    "fruit salad",
    "macaroni salad",
    "potato salad",
    "drinks",
    "buffalo wings",
    "mozzarella sticks",
    "potato skins",
    "cupcakes"
  ];

  const allGuests = document.querySelectorAll(".guest-list li");

  for (let guest of allGuests) {
    let randomPotluckIndex = Math.floor(Math.random() * potluckItems.length);
    let randomPotluckItem = potluckItems[randomPotluckIndex];
    let listItem = document.createElement("li");
    listItem.innerText = `${guest.innerText} is bringing ${randomPotluckItem}.`;
    assignedItems.append(listItem);
    potluckItems.splice(randomPotluckIndex, 1);
  }
};

// event listener for potluck button
assignButton.addEventListener("click", function () {
  assignItems();
  assignButton.disabled = true;
});
