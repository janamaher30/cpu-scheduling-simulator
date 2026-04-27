let processes = [];

// Add Process
function addProcess() {
  let id = document.getElementById("id").value;
  let arrival = +document.getElementById("arrival").value;
  let burst = +document.getElementById("burst").value;
  let priority = +document.getElementById("priority").value;

  if (!id) return alert("Enter Process ID");

  processes.push({ id, arrival, burst, priority });
  displayProcesses();
}

// Table
function displayProcesses() {
  let table = document.getElementById("processTable");
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

//  RUN
function runAlgorithms() {

  let rrRaw = getRRResultFromTeam();
  let prRaw = getPriorityResultFromTeam();

  // metrics calculation
  let rrMetrics = calcMetrics(
    processes,
    rrRaw.gantt,
    rrRaw.completionTimes
  );

  let prMetrics = calcMetrics(
    processes,
    prRaw.gantt,
    prRaw.completionTimes
  );

  displayResults(rrMetrics, prMetrics);
}

//  TEAM PLACEHOLDERS
function getRRResultFromTeam() {
  return {
    gantt: [],
    completionTimes: {}
  };
}

function getPriorityResultFromTeam() {
  return {
    gantt: [],
    completionTimes: {}
  };
}

//  DISPLAY RESULTS
function displayResults(rr, pr) {

  document.getElementById("rrResults").innerHTML =
    `Avg WT: ${rr.avgWT} <br>
     Avg TAT: ${rr.avgTAT} <br>
     Avg RT: ${rr.avgRT}`;

  document.getElementById("priorityResults").innerHTML =
    `Avg WT: ${pr.avgWT} <br>
     Avg TAT: ${pr.avgTAT} <br>
     Avg RT: ${pr.avgRT}`;

  //  FIX IMPORTANT HERE
  drawGantt("rrGantt", rr.processes);
  drawGantt("prGantt", pr.processes);

  document.getElementById("comparison").innerHTML =
    rr.avgWT < pr.avgWT
      ? "🏆 Round Robin Better"
      : "🏆 Priority Better";
}

// Gantt Chart
function drawGantt(id, data) {
  let container = document.getElementById(id);
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No Gantt data yet</p>";
    return;
  }

  data.forEach(item => {
    let div = document.createElement("div");
    div.className = "block";

    // safe fallback
    div.innerText = item.process || item.id || "P";

    container.appendChild(div);
  });
}