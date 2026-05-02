export function getFirstStart(gantt) {
  let firstStart = {};
  gantt.forEach(g => {
    let key = g.id;
    if (firstStart[key] === undefined) {
      firstStart[key] = g.start;
    }
  });
  return firstStart;
}
export function calcMetrics(processes, gantt, completionTimes) {
  let firstStart = getFirstStart(gantt);
  let result = [];
  let sumWT = 0, sumTAT = 0, sumRT = 0;
  processes.forEach(p => {
    let TAT = completionTimes[p.id] - p.arrival;
    if (TAT < 0 || isNaN(TAT)) TAT = 0;
    let WT = TAT - p.burst;
    if (WT < 0 || isNaN(WT)) WT = 0;
    let RT = firstStart[p.id] - p.arrival;
    if (RT < 0 || isNaN(RT)) RT = 0;
    sumWT += WT;
    sumTAT += TAT;
    sumRT += RT;
    result.push({
      id: p.id,   
      WT,
      TAT,
      RT
    });
  });
  return {
    processes: result,
    avgWT: sumWT / processes.length || 0,
    avgTAT: sumTAT / processes.length || 0,
    avgRT: sumRT / processes.length || 0
  };
}