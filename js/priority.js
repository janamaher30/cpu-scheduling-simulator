/**
 * Priority Scheduling (Preemptive)
 * Rule:
 * Smaller priority number = higher priority
 * Tie-breaking:
 * 1) Lower priority number
 * 2) Earlier arrival time
 * 3) Smaller process ID
 */

export const runPriorityPreemptive = (processes) => {
    let currentTime = 0;
    let finishedCount = 0;
    const n = processes.length;

    let gantt = [];
    let completionTimes = {};

    // Validation
    for (let p of processes) {
        if (
            p.burst <= 0 ||
            p.arrival < 0 ||
            p.priority < 0 ||
            !p.id
        ) {
            throw new Error(`Invalid process input: ${JSON.stringify(p)}`);
        }
    }

    // Clone processes,add remaining time
    let remaining = processes.map(p => ({
        ...p,
        rem: p.burst
    }));

    while (finishedCount < n) {
        let available = remaining.filter(
            p => p.arrival <= currentTime && p.rem > 0
        );

        // If CPU is idle
        if (available.length === 0) {
            if (
                gantt.length > 0 &&
                gantt[gantt.length - 1].id === "Idle"
            ) {
                gantt[gantt.length - 1].end++;
            } else {
                gantt.push({
                    id: "Idle",
                    start: currentTime,
                    end: currentTime + 1
                });
            }

            currentTime++;
            continue;
        }

        // Sort by:
        // 1) Priority
        // 2) Arrival time
        // 3) Process ID
        available.sort((a, b) =>
            a.priority - b.priority ||
            a.arrival - b.arrival ||
            a.id.localeCompare(b.id)
        );

        let current = available[0];

        // Update Gantt chart
        if (
            gantt.length > 0 &&
            gantt[gantt.length - 1].id === current.id
        ) {
            gantt[gantt.length - 1].end++;
        } else {
            gantt.push({
                id: current.id,
                start: currentTime,
                end: currentTime + 1
            });
        }

        // Execute for 1 time unit
        current.rem--;
        currentTime++;

        // Check if finished
        if (current.rem === 0) {
            completionTimes[current.id] = currentTime;
            finishedCount++;
        }
    }

    return {
        gantt,
        completionTimes
    };
};