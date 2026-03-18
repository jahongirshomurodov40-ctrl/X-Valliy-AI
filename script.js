async function send() {
    let input = document.getElementById("savol");
    let savol = input.value;
    if (!savol) return;

    let messages = document.getElementById("messages");

    // USER MESSAGE
    let userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = savol;
    messages.appendChild(userMsg);

    input.value = "";

    // LOADING
    let loading = document.createElement("div");
    loading.className = "message ai";
    loading.innerText = "⏳ AI o‘ylayapti...";
    messages.appendChild(loading);

    // 🔥 API KEY SHU YERDA
    const API_KEY = "AIzaSyDnkbLe94YeXw2PtbyfZRPzF1-jSKorsHo";

    try {
        let response = await fetch(
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: savol }]
                        }
                    ]
                })
            }
        );

        let data = await response.json();

        let text =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "⚠️ Xatolik chiqdi";

        loading.innerText = text;

    } catch (e) {
        loading.innerText = "❌ Internet yoki API xato!";
    }

    messages.scrollTop = messages.scrollHeight;
}
document.getElementById("savol").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        send();
    }
});