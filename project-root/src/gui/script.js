import { calcMetrics } from "../js/metrics.js";
import { runPriorityPreemptive } from "../js/priority.js";
import { runRoundRobin } from "../js/roundrobin.js";
import { scenarios } from "../test/testScenarios.js";
let processes = [];
let editIndex = -1;

// --- 1.(Preview Mode) ---
window.addEventListener('DOMContentLoaded', () => {
    processes = [
        { id: "P1", arrival: 0, burst: 5, priority: 2 },
        { id: "P2", arrival: 2, burst: 2, priority: 1 },
        { id: "P3", arrival: 4, burst: 3, priority: 3 }
    ]; 
    displayProcesses();
    runAlgorithms();
});

// --- 2.(Add, Edit, Delete) ---
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
function displayProcesses() {
    let table = document.getElementById("processTable");
    table.innerHTML = "";
    processes.forEach((p, index) => {
        table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.arrival}</td>
                <td>${p.burst}</td>
                <td>${p.priority}</td>
                <td>
                    <button onclick="editProcess(${index})" style="background:#f59e0b; padding:5px; margin-right:5px;">Edit</button>
                    <button onclick="deleteProcess(${index})" style="background:#ef4444; padding:5px;">Delete</button>
                </td>
            </tr>`;
    });
}
// --- 3.(Basic Logic & Algorithm Execution) ---
function runAlgorithms() {
    if (processes.length === 0) return;

    let quantum = +document.getElementById("quantum").value;
    if (quantum <= 0 || isNaN(quantum)) {
        return alert("Please enter a valid Time Quantum (e.g., 3)");
    }
    let rrRaw = runRoundRobin(getProcesses(), quantum);
    let prRaw = runPriorityPreemptive(getProcesses());
    let rrMetrics = calcMetrics(getProcesses(), rrRaw.gantt, rrRaw.completionTimes);
    let prMetrics = calcMetrics(getProcesses(), prRaw.gantt, prRaw.completionTimes);
    displayResults(rrMetrics, prMetrics, rrRaw.gantt, prRaw.gantt);
}
function displayResults(rr, pr, rrGantt, prGantt) {
    document.getElementById("rrResults").innerHTML = `
        <p>Avg WT: <b>${rr.avgWT.toFixed(2)}</b> | Avg TAT: <b>${rr.avgTAT.toFixed(2)}</b></p>
        <p>Avg RT: <b>${rr.avgRT.toFixed(2)}</b></p>`;
    document.getElementById("priorityResults").innerHTML = `
        <p>Avg WT: <b>${pr.avgWT.toFixed(2)}</b> | Avg TAT: <b>${pr.avgTAT.toFixed(2)}</b></p>
        <p>Avg RT: <b>${pr.avgRT.toFixed(2)}</b></p>`;
    drawGantt("rr-gantt-wrapper", rrGantt);
    drawGantt("pr-gantt-wrapper", prGantt);
    const winnerText = rr.avgWT < pr.avgWT ? "🏆 Round Robin is more efficient for this case" : "🏆 Preemptive Priority is more efficient for this case";
    document.getElementById("comparison").innerText = winnerText;
}

// --- 4.(Gantt Chart Builder) ---
function drawGantt(wrapperId, ganttData) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;
    const barsEl = wrapper.querySelector(".bar-row");
    const ticksEl = wrapper.querySelector(".tick-row");
    barsEl.innerHTML = "";
    ticksEl.innerHTML = "";
    if (!ganttData || ganttData.length === 0) return;
    const scale = 35; 
    ganttData.forEach(item => {
        const duration = item.end - item.start;
        const blockWidth = duration * scale;
        const block = document.createElement("div");
        block.style.width = blockWidth + "px";
        block.style.backgroundColor = item.id === "Idle" ? "#475569" : getColor(item.id);
        block.style.color = "white";
        block.innerText = item.id;
        barsEl.appendChild(block);
        for (let i = 0; i < duration; i++) {
            const tick = document.createElement("div");
            tick.style.width = scale + "px";
            tick.innerText = item.start + i;
            ticksEl.appendChild(tick);
        }
    });
    const lastTick = document.createElement("div");
    lastTick.style.width = scale + "px";
    lastTick.innerText = ganttData[ganttData.length - 1].end;
    ticksEl.appendChild(lastTick);
}
// --- 5.(Scenarios & Validation) ---
function loadScenario(letter) {
    const data = scenarios[letter];
    const analysisBox = document.getElementById("analysis-box");
    if (letter === 'E' || !data) {
        clearAll();
        document.getElementById("scenario-title").innerText = "Scenario E: Validation Check";
        document.getElementById("scenario-question").innerText = "How the system handles empty inputs?";
        document.getElementById("priority-analysis").innerHTML = "<p style='color:#ef4444;'>⚠️ Error: No processes provided for Priority Scheduling.</p>";
        document.getElementById("rr-analysis").innerHTML = "<p style='color:#ef4444;'>⚠️ Error: Round Robin queue is empty.</p>";
        analysisBox.style.display = "block";
        return;
    }
    processes = data.table.map(p => ({
        id: p.p,
        arrival: p.at,
        burst: p.bt,
        priority: p.prio
    }));
    displayProcesses();
    document.getElementById("scenario-title").innerText = data.title;
    document.getElementById("scenario-question").innerText = data.question;
    document.getElementById("rr-analysis").innerHTML = `<p><b>Analysis:</b> ${data.analysis.rr}</p>`;
    document.getElementById("priority-analysis").innerHTML = `<p><b>Analysis:</b> ${data.analysis.priority}</p>`;
    analysisBox.style.display = "block";
    runAlgorithms();
}
// --- 6.(Helpers) ---
function getColor(id) {
    if (id === "Idle") return "#475569";
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    const numericId = parseInt(id.toString().replace("P", "")) || 0;
    return colors[numericId % colors.length];
}
function getProcesses() { return JSON.parse(JSON.stringify(processes)); }
function clearInputs() {
    ["id", "arrival", "burst", "priority"].forEach(id => {
        document.getElementById(id).value = "";
    });
}
function clearAll() {
    processes = [];
    displayProcesses();
    document.getElementById("analysis-box").style.display = "none";
    document.getElementById("rrResults").innerHTML = "";
    document.getElementById("priorityResults").innerHTML = "";
    document.getElementById("comparison").innerText = "";
    document.querySelector("#rr-gantt-wrapper .bar-row").innerHTML = "";
    document.querySelector("#rr-gantt-wrapper .tick-row").innerHTML = "";
    document.querySelector("#pr-gantt-wrapper .bar-row").innerHTML = "";
    document.querySelector("#pr-gantt-wrapper .tick-row").innerHTML = "";
}
function deleteProcess(index) {
    processes.splice(index, 1);
    displayProcesses();
}
function editProcess(index) {
    let p = processes[index];
    document.getElementById("id").value = p.id;
    document.getElementById("arrival").value = p.arrival;
    document.getElementById("burst").value = p.burst;
    document.getElementById("priority").value = p.priority;
    editIndex = index;
}
// --- 7.(Global Exposure) ---
window.addProcess = addProcess;
window.runAlgorithms = runAlgorithms;
window.clearAll = clearAll;
window.loadScenario = loadScenario;
window.editProcess = editProcess;
window.deleteProcess = deleteProcess;