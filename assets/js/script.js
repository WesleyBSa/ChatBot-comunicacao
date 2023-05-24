const chatInput = document.getElementById("input-field");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-body");
const readButton = document.getElementById("read-button");



sendButton.addEventListener("click", () => {
  const userMessage = chatInput.value;
  chatInput.value = "";

  // Adiciona mensagem do usuário
  chatMessages.innerHTML += `
    <div class="message-container">
      <div class="message user-message">
        <p>${userMessage}</p>
      </div>
    </div>
  `;

  // Simula digitação do bot
  chatMessages.innerHTML += `
    <div class="message-container">
      <div class="message bot-message typing">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  `;
  
  // Envia resposta do bot após 2 segundos
  setTimeout(() => {
    const chatbotResponse = chatbotData[userMessage] || "Desculpe, não entendi sua pergunta.";
    const lastMessageContainer = document.querySelector(".message-container:last-of-type");

    // Remove ícone de digitação
    lastMessageContainer.querySelector(".bot-message.typing").remove();

    // Adiciona mensagem do bot
    lastMessageContainer.innerHTML += `
      <div class="message bot-message">
        <p>${chatbotResponse}</p>
      </div>
    `;

    // Faz o scroll para a última mensagem
    const lastMessage = chatMessages.lastElementChild;
    lastMessage.scrollIntoView({behavior: "smooth"});
  },2000);
});

const typingText = "#NonViolentVoice";
const typingDelay = 100; // tempo em milissegundos
const erasingDelay = 50; // tempo em milissegundos
const newTextDelay = 2000; // tempo em milissegundos
let textIndex = 0;
let charIndex = 0;
const typingSpan = document.querySelector(".typing");

function type() {
  if (charIndex < typingText.length) {
    typingSpan.textContent += typingText.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingSpan.textContent = typingText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    charIndex = 0;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (typingText) {
    setTimeout(type, newTextDelay);
  }
});
