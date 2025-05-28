let bugs = [];

function addBug() {
  const desc = document.getElementById("bugDesc").value.trim();
  const severity = document.getElementById("severity").value;

  if (desc === "") {
    alert("Please enter a bug description.");
    return;
  }

  const bug = {
    id: Date.now(),
    description: desc,
    severity: severity,
    status: "Open"
  };

  bugs.push(bug);
  saveBugs();
  renderBugs();

  // Clear input
  document.getElementById("bugDesc").value = "";
}

function saveBugs() {
  localStorage.setItem("bugs", JSON.stringify(bugs));
}

function loadBugs() {
  const stored = localStorage.getItem("bugs");
  if (stored) {
    bugs = JSON.parse(stored);
  }
}

function renderBugs() {
  const bugList = document.getElementById("bugList");
  bugList.innerHTML = "";

  bugs.forEach(bug => {
    const div = document.createElement("div");
    div.className = "bug";
    div.innerHTML = `
      <p><strong>${bug.description}</strong></p>
      <p>Severity: ${bug.severity}</p>
      <p>Status: ${bug.status}</p>
      <button onclick="toggleStatus(${bug.id})">Toggle Status</button>
      <button onclick="deleteBug(${bug.id})">Delete</button>
    `;
    bugList.appendChild(div);
  });
}

function toggleStatus(id) {
  bugs = bugs.map(bug => {
    if (bug.id === id) {
      bug.status = bug.status === "Open" ? "Resolved" : "Open";
    }
    return bug;
  });
  saveBugs();
  renderBugs();
}

function deleteBug(id) {
  bugs = bugs.filter(bug => bug.id !== id);
  saveBugs();
  renderBugs();
}

// Load on page load
loadBugs();
renderBugs();
