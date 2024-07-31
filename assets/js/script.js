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
  validateInput(lastName, "Фамилию", patternFullName);
  validateInput(firstName, "Имя", patternFullName);
  validateInput(patronimic, "Отчество", patternFullName);
  validateInput(email, "Email", patternEmail);
  validateInput(phoneNumber, "Номер телефона", patternPhoneNumber);

  if (dateOfBrith.value === "") {
    errorDate.textContent = "Введите дату";
  } else {
    errorDate.textContent = "";
  }

  if (checkAllInputsValid()) {
    submitFormData(
      lastName.value,
      firstName.value,
      patronimic.value,
      dateOfBrith.value,
      email.value,
      phoneNumber.value
    );
  }
});

function validateInput(input, fieldName, pattern) {
  if (input.value === "" || pattern.test(input.value)) {
    input.placeholder = `Введите ${fieldName}`;
  } else {
    alert(`Поле '${fieldName}' должно содержать только буквы`);
    input.value = "";
  }
}

function checkAllInputsValid() {
  return (
    lastName.value !== "" &&
    firstName.value !== "" &&
    patronimic.value !== "" &&
    email.value !== "" &&
    phoneNumber.value !== "" &&
    patternFullName.test(lastName.value) &&
    patternFullName.test(firstName.value) &&
    patternFullName.test(patronimic.value) &&
    patternEmail.test(email.value) &&
    patternPhoneNumber.test(phoneNumber.value)
  );
}

async function submitFormData(
  lastName,
  firstName,
  patronimic,
  dateOfBrith,
  email,
  phoneNumber
) {
  try {
    let url = "http://127.0.0.1:8000/userdata/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        last_name: lastName,
        first_name: firstName,
        patronimic: patronimic,
        date_of_brith: dateOfBrith,
        email: email,
        phone_number: phoneNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }

    let json = await response.json();
  } catch (error) {
    alert(error.message);
  }
}
