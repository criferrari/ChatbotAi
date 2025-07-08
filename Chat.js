const OPENAI_API_KEY = "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"; 

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value;
  appendMessage("user", message);
  userInput.value = "";

  const response = await getGPTResponse(message);
  appendMessage("bot", response);
});

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender;
  msgDiv.innerText = `${sender === "user" ? "You" : "Bot"}: ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getGPTResponse(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";
}
