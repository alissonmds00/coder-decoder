const criptSentences = [];
const decriptSentences = [];

const input = document.querySelector("#texto");
const criptografarButton = document.querySelector("#criptografar");
const descriptografarButton = document.querySelector("#descriptografar");
const copiarButton = document.querySelector("#copiar");
const modeSelect = document.querySelector("#mode");
const buttonDisplayMode = document.querySelector("#display-mode");

const dictionaryContainer = document.querySelector(".dictionary-container");

function dictionaryContent(target = criptSentences) {
  if (target.length) {
    copiarButton.classList.remove("disabled");
    buttonDisplayMode.classList.remove("disabled");
    document.querySelector(".dictionary-container").classList.add("item");
  } else {
    copiarButton.classList.add("disabled");
  }
  const content =
    target.length == 0
      ? `
    <img src="./src/images/char.svg" alt="">
    <h2 class="bold f-24 gray-5">Nenhuma mensagem encontrada</h2>
    <p class="gray-4">Digite um texto que você deseja criptografar ou descriptografar.</p>
  </div>`
      : target
          .map((frase) => {
            return `<li class="sentence">${frase}</li>`;
          })
          .join("");
  dictionaryContainer.innerHTML = content;
}

// criptografia e descriptografia

function clickCriptografar() {
  criptografar(input.value);
  input.focus();
  input.value = "";
}

function clickDescriptografar() {
  descriptografar(input.value);
  input.focus();
  input.value = "";
}

function criptografar(value) {
  const converter = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };
  value = value
    .split("")
    .map((char) => converter[char] || char)
    .join("");
  criptSentences.push(value);
  dictionaryContent();
  return value;
}

function descriptografar(value) {
  const regex = [/ai/g, /enter/g, /imes/g, /ober/g, /ufat/g];
  value = value
    .replace(regex[0], "a")
    .replace(regex[1], "e")
    .replace(regex[2], "i")
    .replace(regex[3], "o")
    .replace(regex[4], "u");
  decriptSentences.push(value);
  dictionaryContent(decriptSentences);
  return value;
}

function renderContent() {
  buttonDisplayMode.classList.toggle("criptografar");
  if (buttonDisplayMode.classList.contains("criptografar")) {
    dictionaryContent();
  } else if (buttonDisplayMode.classList.contains("disabled") == false) {
    dictionaryContent(decriptSentences);
  }
}

// interações

const sentences = document.getElementsByClassName("sentence");
const arraySentences = Array.from(sentences);
arraySentences.forEach((sentence) => {
  console.log(sentence);
  sentence.addEventListener("click", selectSentence(sentence));
});

function selectSentence(e) {
  const target = e.currentTarget;
  const selectedSentence = target.innerText;
  navigator.clipboard.writeText(selectedSentence);
}

dictionaryContent();
