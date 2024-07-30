const lastName = document.getElementById("last-name");
const firstName = document.getElementById("first-name");
const patronimic = document.getElementById("patronimic");
const dateOfBrith = document.getElementById("date-of-birth");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
const errorDate = document.querySelector(".error-date");
const btnForm = document.querySelector(".btn-form");

const patternFullName = /^[A-zА-я]{1,20}$/;
const patternEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const patternPhoneNumber = /^\+?[78]\(?\d{3}\)?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

btnForm.addEventListener("click", () => {
  if (lastName.value === "" || patternFullName.test(lastName.value)) {
    lastName.placeholder = "Введите фамилию";
  } else {
    alert("Поле 'Фамилия' должно содержать только буквы");
    lastName.value = "";
  }
  if (firstName.value === "" || patternFullName.test(firstName.value)) {
    firstName.placeholder = "Введите имя";
  } else {
    alert("Поле 'Имя' должно содержать только буквы");
    firstName.value = "";
  }
  if (patronimic.value === "" || patternFullName.test(patronimic.value)) {
    patronimic.placeholder = "Введите отчество";
  } else {
    alert("Поле 'Отчество' должно содержать только буквы");
    patronimic.value = "";
  }
  if (dateOfBrith.value === "") {
    errorDate.textContent = "Введите дату";
  } else {
    errorDate.textContent = "";
  }
  if (email.value === "" || patternEmail.test(email.value)) {
    email.placeholder = "Введите email";
  } else {
    alert("Поле 'Email' должно состоять, пример 'asd.asd.123@gmail.com'");
    email.value = "";
  }
  if (phoneNumber.value === "" || patternPhoneNumber.test(phoneNumber.value)) {
    phoneNumber.placeholder = "Введите номер телефона";
  } else {
    alert("Поле 'Номер телефона' неправильно заполнено");
    phoneNumber.value = "";
  }

  submitFormData();
});

async function submitFormData(
  lastName,
  firstName,
  patronimic,
  dateOfBrith,
  email,
  phoneNumber
) {
  let response = await fetch("/userdata", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      lastName: lastName,
      firstName: firstName,
      patronimic: patronimic,
      dateOfBrith: dateOfBrith,
      email: email,
      phoneNumber: phoneNumber,
    }),
  });

  if (response.ok) {
    let json = await response.json();
    console.log(json);
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
