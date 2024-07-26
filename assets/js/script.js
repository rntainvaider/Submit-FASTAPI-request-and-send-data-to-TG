const lastName = document.getElementById("last-name");
const firstName = document.getElementById("first-name");
const patronimic = document.getElementById("patronimic");
const dateOfBrith = document.getElementById("date-of-birth");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
const btnForm = document.querySelector(".btn-form");

const patternFullName = /^[A-zА-я]{1,20}$/;
const patternEmail = /^[A-z]$/;

btnForm.addEventListener("click", () => {
  if (lastName.value === "" || patternFullName.test(lastName.value)) {
    lastName.placeholder = "Введите фамилию";
  } else {
    alert("Поле 'Фамилия' должно содержать только [A-zА-я]");
    lastName.value = "";
  }
  if (firstName.value === "" || patternFullName.test(firstName.value)) {
    firstName.placeholder = "Введите имя";
  } else {
    alert("Поле 'Имя' должно содержать только [A-zА-я]");
    firstName.value = "";
  }
  if (patronimic.value === "" || patternFullName.test(patronimic.value)) {
    patronimic.placeholder = "Введите отчество";
  } else {
    alert("Поле 'Отчество' должно содержать только [A-zА-я]");
    patronimic.value = "";
  }
  if (dateOfBrith.value === "") {
    dateOfBrith.placeholder = "Введите дату рождения";
  }
  if (email.value === "" || patternEmail.test(email.value)) {
    email.placeholder = "Введите email";
  } else {
    alert("В поле 'Email' должно содержать только");
    email.value = "";
  }
  if (phoneNumber.value === "") {
    phoneNumber.placeholder = "Введите номер телефона";
  }
});
