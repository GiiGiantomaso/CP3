// IMC DATA
const data = [
  {
    min: 0,
    max: 17,
    classification: "Abaixo de 17,0",
    info: "Muito abaixo do peso ideal",
    obesity: "0",
  },
  {
    min: 17,
    max: 18.49,
    classification: "Entre 17,0 e 18,49",
    info: "Abaixo do peso",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.99,
    classification: "Entre 18,5 e 24,99",
    info: "Peso normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.99,
    classification: "Entre 25,0 e 29,9",
    info: "Acima do peso",
    obesity: "0",
  },
  {
    min: 30,
    max: 24.99,
    classification: "Entre 30,0 e 24,99",
    info: "Obesidade grau 1",
    obesity: "I",
  },
  {
    min: 35,
    max: 39.99,
    classification: "Entre 35,0 e 39,99",
    info: "Obesidade grau 2",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grau 3",
    obesity: "III",
  },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#altura");
const weightInput = document.querySelector("#peso");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

// Funções
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight, gender) {
  let imc;

  if (gender === "male") {
    imc = (weight / (height * height)).toFixed(1);
  } else if (gender === "female") {
    imc = (0.9 * (weight / (height * height))).toFixed(1);
  }

  return imc;
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.className = "";
  imcInfo.className = "";
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Init
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);

    e.target.value = updatedValue;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");
  const gender = document.getElementById("gender").value;

  if (!weight || !height) return;

  const imc = calcImc(height, weight, gender);
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cleanInputs();
});

backBtn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});