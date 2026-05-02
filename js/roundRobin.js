export const runRoundRobin = (processes, quantum) => {
    let currentTime = 0;
    let finishedCount = 0;
    const n = processes.length;
    let queue = [];
    let gantt = [];
    let completionTimes = {};
    for (let p of processes) {
        if (p.burst <= 0 || p.arrival < 0 || !p.id) {
            throw new Error(`Invalid process data for ID: ${p.id}`);
        }
    }
    let pClone = processes.map(p => ({
        ...p,
        rem: p.burst
    })).sort((a, b) => a.arrival - b.arrival);
    while (finishedCount < n) {
        pClone.forEach(p => {
            if (p.arrival <= currentTime && p.rem > 0 && !queue.includes(p)) {
                queue.push(p);
            }
        });
        if (queue.length === 0) {
            if (gantt.length > 0 && gantt[gantt.length - 1].id === "Idle") {
                gantt[gantt.length - 1].end++;
            } else {
                gantt.push({ id: "Idle", start: currentTime, end: currentTime + 1 });
            }
            currentTime++;
            continue;
        }
        let current = queue.shift();
        let executeTime = Math.min(current.rem, quantum);

        gantt.push({
            id: current.id,
            start: currentTime,
            end: currentTime + executeTime
        });

        for (let i = 0; i < executeTime; i++) {
            currentTime++;
            pClone.forEach(p => {
                if (p.arrival === currentTime && p.rem > 0 && !queue.includes(p) && p !== current) {
                    queue.push(p);
                }
            });
        } 
        current.rem -= executeTime;
        if (current.rem > 0) {
            queue.push(current);
        } else {
            completionTimes[current.id] = currentTime;
            finishedCount++;
        }
    }
    return { gantt, completionTimes };
};
