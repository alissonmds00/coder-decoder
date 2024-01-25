const newSentences = [];
function dictionaryContent() {
  const dictionaryContainer = document.querySelector(".dictionary-container");
  const content =
    newSentences.length == 0
      ? `
    <img src="./src/images/char.svg" alt="">
    <h2 class="bold f-24 gray-5">Nenhuma mensagem encontrada</h2>
    <p class="gray-4">Digite um texto que você deseja criptografar ou descriptografar.</p>
  </div>`
      : newSentences
          .map((frase) => {
            return `<li class="sentence">${frase}</li>`;
          })
          .join("");
  dictionaryContainer.innerHTML = content;
}


const input = document.querySelector("#texto")
const criptografarButton = document.querySelector("#criptografar")
const descriptografarButton = document.querySelector("#descriptografar")

function clickCriptografar() {
  criptografar(input.value)
}

function criptografar(value) {
  const regex = [/a/g, /e/g, /i/g, /o/g, /u/g];
  value = value.replace(regex[0], "ai");
  value = value.replace(regex[1], "enter");
  value = value.replace(regex[2], "imes");
  value = value.replace(regex[3], "ober");
  value = value.replace(regex[4], "ufat");
  newSentences.push(value);
  dictionaryContent();
  return value
}

dictionaryContent();