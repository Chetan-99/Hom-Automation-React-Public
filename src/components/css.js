let buttonColor = "black";
let buttonTextColor = "#E0E0E0";
let cardColor = "#5e5e5e";
let cardTextColor = "#E0E0E0";
let historyCardColor = "#5e5e5e";
let historyEmptyTextColor = "grey";
let historyCardTextColor = "#E0E0E0";
let bottomNavigationIconColor = "#E0E0E0";
let bottomNavigationColor = "black";
let navBarBackgroundColor = "black";
let navItemsColor = "#E0E0E0";

export function darkMode() {
  document.body.style = "background-color:black;";
  buttonColor = "black";
  buttonTextColor = "white";
  cardColor = "#313236";
  cardTextColor = "#FFFFFF";
  historyCardColor = "#313236";
  historyEmptyTextColor = "grey";
  historyCardTextColor = "#FFFFFF";
  bottomNavigationIconColor = "#E0E0E0";
  bottomNavigationColor = "black";
  navBarBackgroundColor = "black";
  navItemsColor = "#FFFFFF";
}

export function lightMode() {
  document.body.style = "background-color:white;";
  navBarBackgroundColor = "black";
  navItemsColor = "#E0E0E0";
  cardColor = "#5e5e5e";
  cardTextColor = "#E0E0E0";
  buttonColor = "black";
  buttonTextColor = "#E0E0E0";
  historyCardColor = "#5e5e5e";
  historyEmptyTextColor = "grey";
  historyCardTextColor = "#E0E0E0";
  bottomNavigationIconColor = "#E0E0E0";
  bottomNavigationColor = "black";
}

export {
  buttonColor,
  buttonTextColor,
  cardColor,
  cardTextColor,
  historyCardColor,
  historyEmptyTextColor,
  historyCardTextColor,
  bottomNavigationIconColor,
  bottomNavigationColor,
  navBarBackgroundColor,
  navItemsColor,
};
