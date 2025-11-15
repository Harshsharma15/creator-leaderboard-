const API = "/api"; // Vercel functions live under /api
const tbody = document.querySelector("#leaderboard tbody");
const message = document.getElementById("message");

async function loadLeaderboard() {
  message.textContent = "Loading...";
  try {
    const res = await fetch(`${API}/getLeaderboard`);
    const data = await res.json();
    renderTable(data);
    message.textContent = "";
  } catch {
    message.textContent = "Failed to load leaderboard.";
  }
}

function renderTable(data) {
  if (!Array.isArray(data)) return;
  data.sort((a,b) => b.wagered - a.wagered);
  tbody.innerHTML = data.map((p,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${p.name}</td>
      <td><img src="${p.pic}"></td>
      <td>$${p.wagered.toLocaleString()}</td>
    </tr>
  `).join("");
}

async function clearLeaderboard() {
  if (!confirm("Clear all scores?")) return;
  await fetch(`${API}/clearLeaderboard`, { method: "POST" });
  loadLeaderboard();
}

document.getElementById("refresh").onclick = loadLeaderboard;
document.getElementById("clear").onclick = clearLeaderboard;
loadLeaderboard();
