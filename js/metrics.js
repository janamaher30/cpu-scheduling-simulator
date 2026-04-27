export function getFirstStart(gantt) {
  let firstStart = {};
  gantt.forEach(g => {
    if (firstStart[g.process] === undefined) {
      firstStart[g.process] = g.start;
    }
  });
  return firstStart;
}

export function calcMetrics(processes, gantt, completionTimes) {
  let firstStart = getFirstStart(gantt);

  let result = [];
  let sumWT = 0, sumTAT = 0, sumRT = 0;

  processes.forEach(p => {
    let TAT = completionTimes[p.process] - p.arrival;
    if (TAT < 0) {
      alert("TAT can't be negative!");
      TAT = 0;
    }
    let WT = TAT - p.burst;
    if (WT < 0) {
      alert("WT can't be negative!");
      WT = 0;
    }
    let RT = firstStart[p.process] - p.arrival;
    if (RT < 0) {
      alert("RT can't be negative!");
      RT = 0;
    }

    sumWT += WT;
    sumTAT += TAT;
    sumRT += RT;

    result.push({ process: p.process, WT, TAT, RT });
  });

  return {
    processes: result,
    avgWT: sumWT / processes.length,
    avgTAT: sumTAT / processes.length,
    avgRT: sumRT / processes.length
  };
}
