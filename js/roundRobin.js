/**
 * Round Robin (RR) Scheduling Algorithm
 * Focuses on fairness by allocating a fixed Time Quantum to each process.
 */
export const runRoundRobin = (processes, quantum) => {
    let currentTime = 0;
    let finishedCount = 0;
    const n = processes.length;
    let queue = [];
    let gantt = [];
    let completionTimes = {};

    // Input Validation
    for (let p of processes) {
        if (p.burst <= 0 || p.arrival < 0 || !p.id) {
            throw new Error(`Invalid process data for ID: ${p.id}`);
        }
    }

    // Clone processes and initialize remaining time
    let pClone = processes.map(p => ({
        ...p,
        rem: p.burst
    })).sort((a, b) => a.arrival - b.arrival);

    while (finishedCount < n) {
        // Add newly arrived processes to the Ready Queue
        pClone.forEach(p => {
            if (p.arrival <= currentTime && p.rem > 0 && !queue.includes(p)) {
                queue.push(p);
            }
        });

        if (queue.length === 0) {
            // Handle CPU Idle time
            if (gantt.length > 0 && gantt[gantt.length - 1].id === "Idle") {
                gantt[gantt.length - 1].end++;
            } else {
                gantt.push({ id: "Idle", start: currentTime, end: currentTime + 1 });
            }
            currentTime++;
            continue;
        }

        // Pick the next process from the queue
        let current = queue.shift();
        let executeTime = Math.min(current.rem, quantum);

        // Record execution in Gantt Chart
        gantt.push({
            id: current.id,
            start: currentTime,
            end: currentTime + executeTime
        });

        // Update system clock and check for arrivals during execution
        for (let i = 0; i < executeTime; i++) {
            currentTime++;
            pClone.forEach(p => {
                if (p.arrival === currentTime && p.rem > 0 && !queue.includes(p) && p !== current) {
                    queue.push(p);
                }
            });
        }
        
        current.rem -= executeTime;

        // If process is not finished, return it to the end of the queue
        if (current.rem > 0) {
            queue.push(current);
        } else {
            completionTimes[current.id] = currentTime;
            finishedCount++;
        }
    }

    return { gantt, completionTimes };
};
