let processes = [];

function addProcess() {
  let id = document.getElementById("id").value;
  let arrival = +document.getElementById("arrival").value;
  let burst = +document.getElementById("burst").value;
  let priority = +document.getElementById("priority").value;

  processes.push({ id, arrival, burst, priority });
  displayProcesses();
}
function displayProcesses() {
   table = document.getElementById("processTable");
   table.innerHTML = "";
  processes.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.arrival}</td>
        <td>${p.burst}</td>
        <td>${p.priority}</td>
      </tr>
    `;
  });
}

// 🔌 Integration ready
function runAlgorithms() {
  let rr = getRRResultFromTeam();
  let pr = getPriorityResultFromTeam();

  displayResults(rr, pr);
}
function getRRResultFromTeam() {
  return { avgWT: 0, avgTAT: 0, gantt: [] };
}

function getPriorityResultFromTeam() {
  return { avgWT: 0, avgTAT: 0, gantt: [] };
}

function displayResults(rr, pr) {
  document.getElementById("rrResults").innerHTML =
    `Avg WT: ${rr.avgWT} <br> Avg TAT: ${rr.avgTAT}`;

  document.getElementById("priorityResults").innerHTML =
    `Avg WT: ${pr.avgWT} <br> Avg TAT: ${pr.avgTAT}`;

  drawGantt("rrGantt", rr.gantt);
  drawGantt("prGantt", pr.gantt);
   document.getElementById("comparison").innerHTML =
    rr.avgWT < pr.avgWT ? "Round Robin Better" : "Priority Better";
}

function drawGantt(id, data) {
  let container = document.getElementById(id);
  container.innerHTML = "";

  data.forEach(item => {
    let div = document.createElement("div");
    div.className = "block";
    div.innerText = item.process;
    container.appendChild(div);
  });
}