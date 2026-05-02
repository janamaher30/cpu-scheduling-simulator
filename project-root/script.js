import { calcMetrics } from "../js/metrics.js";
import { runPriorityPreemptive } from "../js/priority.js";
import { runRoundRobin } from "../js/roundrobin.js";
let processes = [];
let editIndex = -1;
// Add Process
function addProcess() {
  let id = document.getElementById("id").value.trim();
  let arrival = +document.getElementById("arrival").value;
  let burst = +document.getElementById("burst").value;
  let priority = +document.getElementById("priority").value;
  if (!id) return alert("ID required");
  if (arrival < 0 || isNaN(arrival)) return alert("Invalid arrival");
  if (burst <= 0 || isNaN(burst)) return alert("Invalid burst");
  if (priority < 0 || isNaN(priority)) return alert("Invalid priority");
  if (processes.some(p => p.id === id) && editIndex === -1) {
    return alert("ID already exists");
  }
  let process = { id, arrival, burst, priority };
  if (editIndex === -1) {
    processes.push(process);
  } else {
    processes[editIndex] = process;
    editIndex = -1;
  }
  clearInputs();
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
//run
function runAlgorithms() {
  let quantum = +document.getElementById("quantum").value;
  if (quantum <= 0 || isNaN(quantum)) {
    return alert("Enter valid quantum");
  }
  let rrRaw = runRoundRobin(getProcesses(), quantum);
  let prRaw = runPriorityPreemptive(getProcesses());
  let rrMetrics = calcMetrics(
    getProcesses(),
    rrRaw.gantt,
    rrRaw.completionTimes
  );
  let prMetrics = calcMetrics(
    getProcesses(),
    prRaw.gantt,
    prRaw.completionTimes
  );
  displayResults(rrMetrics, prMetrics, rrRaw.gantt, prRaw.gantt);
}
// DISPLAY RESULTS
function displayResults(rr, pr, rrGantt, prGantt) {
  document.getElementById("rrResults").innerHTML =
    `Avg WT: ${rr.avgWT} <br>
     Avg TAT: ${rr.avgTAT} <br>
     Avg RT: ${rr.avgRT}`;
  document.getElementById("priorityResults").innerHTML =
    `Avg WT: ${pr.avgWT} <br>
     Avg TAT: ${pr.avgTAT} <br>
     Avg RT: ${pr.avgRT}`;
  drawGantt("rrGantt", rrGantt);
  drawGantt("prGantt", prGantt);
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
div.innerText = item.id || item.process || "P";
    container.appendChild(div);
  });
}
function getProcesses() {
  return JSON.parse(JSON.stringify(processes));
}
function editProcess(index) {
  let p = processes[index];
  document.getElementById("id").value = p.id;
  document.getElementById("arrival").value = p.arrival;
  document.getElementById("burst").value = p.burst;
  document.getElementById("priority").value = p.priority;
  editIndex = index;
}
function deleteProcess(index) {
  processes.splice(index, 1);
  displayProcesses();
}
function clearInputs() {
  document.getElementById("id").value = "";
  document.getElementById("arrival").value = "";
  document.getElementById("burst").value = "";
  document.getElementById("priority").value = "";
}
function clearAll() {
  processes = [];
  displayProcesses();
}
// expose to HTML
window.addProcess = addProcess;
window.runAlgorithms = runAlgorithms;