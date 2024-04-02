const criptSentences = [];
const decriptSentences = [];

const input = document.querySelector("#texto");
const criptografarButton = document.querySelector("#criptografar");
const descriptografarButton = document.querySelector("#descriptografar");
const copiarButton = document.querySelector("#copiar");
const modeSelect = document.querySelector("#mode");
const buttonDisplayMode = document.querySelector("#display-mode");

const dictionaryContainer = document.querySelector(".dictionary-container");

let selectedSentence;

function dictionaryContent(target = criptSentences) {
  let content;
  if (target.length) {
    copiarButton.classList.remove("disabled");
    buttonDisplayMode.classList.remove("disabled");
    document.querySelector(".dictionary-container").classList.add("item");

    content = target
      .map((frase) => {
        return `<li class="sentence">${frase}</li>`;
      })
      .join("");
  } else {
    copiarButton.classList.add("disabled");

    content = `
    <img src="./src/images/char.svg" alt="">
    <h2 class="bold f-24 gray-5">Nenhuma mensagem encontrada</h2>
    <p class="gray-4">Digite um texto que você deseja criptografar ou descriptografar.</p>
  </div>`;
  }

  dictionaryContainer.innerHTML = content;

  let sentences = document.getElementsByClassName("sentence");
  let arraySentences = Array.from(sentences);
  arraySentences.forEach((sentence, index) => {
    sentence.addEventListener("click", function () {
      selectedSentence = sentence.innerText;
      selectSentence(index);
    });
  });
  function selectSentence(index) {
    arraySentences.forEach((sentence) => sentence.classList.remove("selected"));
    arraySentences[index].classList.add("selected");
  }
}

// criptografia e descriptografia

function clickCriptografar() {
  if (input.value.length) {
    criptografar(input.value);
    input.focus();
    input.value = "";
  }
}

function clickDescriptografar() {
  if (input.value.length) {
    descriptografar(input.value);
    input.focus();
    input.value = "";
  }
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

function selectSentence(e) {
  const selectedSentence = e.currentTarget;
  console.log(selectedSentence)
  copy(selectedSentence);
}

function copy() {
  navigator.clipboard.writeText(selectedSentence);
  alert(
    `'${selectedSentence}' foi copiado para a sua área de transferência. \n CTRL + V para utilizar.`
  );
}

dictionaryContent();
