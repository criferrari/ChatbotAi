const chatContainer = document.createElement("div");
chatContainer.innerHTML = `
  <div id="chatbox" style="position:fixed;bottom:20px;right:20px;width:300px;height:400px;background:#fff;border:1px solid #ccc;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);z-index:9999;display:flex;flex-direction:column;">
    <div style="flex:1;overflow-y:auto;padding:10px;" id="chat-messages"></div>
    <div style="display:flex;">
      <input type="text" id="chat-input" placeholder="Type your message..." style="flex:1;padding:10px;border:none;border-top:1px solid #ccc;">
      <button id="send-btn" style="padding:10px;background:#4CAF50;color:white;border:none;">Send</button>
    </div>
  </div>
`;
document.body.appendChild(chatContainer);

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  document.getElementById("chat-messages").appendChild(msg);
}

document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("chat-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  input.value = "";

  try {
    const response = await fetch("https://openai-proxy-noobscience.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
        model: "gpt-3.5-turbo"
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";
    appendMessage("AI", reply);
  } catch (err) {
    appendMessage("AI", "There was an error connecting to the server.");
    console.error(err);
  }
});
