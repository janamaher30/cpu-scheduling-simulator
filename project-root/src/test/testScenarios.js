export const scenarios = {
    A: {
        title: "Scenario A: Normal Workload (Normal)",
        question: "How do algorithms handle a basic 1-2-3 queue?",
        table: [
            { p: "P1", at: 0, bt: 5, prio: 3 },
            { p: "P2", at: 0, bt: 4, prio: 1 },
            { p: "P3", at: 0, bt: 3, prio: 2 }
        ],
        // Priority order: P2(1), P3(2), P1(3)
        nonPre: [{ id: 2, start: 0, end: 4 }, { id: 3, start: 4, end: 7 }, { id: 1, start: 7, end: 12 }],
        pre: [{ id: 2, start: 0, end: 4 }, { id: 3, start: 4, end: 7 }, { id: 1, start: 7, end: 12 }],
        // RR rotation (q=3): P1(3s), P2(3s), P3(3s), P1(2s), P2(1s)
        rr: [
            { id: 1, start: 0, end: 3 }, { id: 2, start: 3, end: 6 }, 
            { id: 3, start: 6, end: 9 }, { id: 1, start: 9, end: 11 }, { id: 2, start: 11, end: 12 }
        ],
        analysis: {
            priority: "Since all arrive at 0, they execute purely by rank: P2 (High) -> P3 (Med) -> P1 (Low).",
            rr: "Every process gets a fair 3s slice. Notice P1 and P2 appear twice because their bursts exceed the quantum."
        }
    },
    B: {
        title: "Scenario B: The Urgency Test (Preemption)",
        question: "P2 (High Prio) arrives at Time 2 while P1 is running. Where does P3 fit?",
        table: [
            { p: "P1", at: 0, bt: 8, prio: 2 },
            { p: "P2", at: 2, bt: 2, prio: 1 },
            { p: "P3", at: 3, bt: 2, prio: 3 }
        ],
        // Non-Preemptive: P1 finishes 8s, then P2 (2s), then P3 (2s)
        nonPre: [{ id: 1, start: 0, end: 8 }, { id: 2, start: 8, end: 10 }, { id: 3, start: 10, end: 12 }],
        // Preemptive: P2 cuts P1 at Time 2, finishes, P1 resumes, finishes, then P3
        pre: [
            { id: 1, start: 0, end: 2 },  // P1 starts
            { id: 2, start: 2, end: 4 },  // P2 cuts in and finishes
            { id: 1, start: 4, end: 10 }, // P1 finishes its remaining 6s
            { id: 3, start: 10, end: 12 } // P3 runs last
        ],
        rr: [{ id: 1, start: 0, end: 3 }, { id: 2, start: 3, end: 5 }, { id: 3, start: 5, end: 7 }, { id: 1, start: 7, end: 12 }],
        analysis: {
            priority: "Preemptive: P1 is kicked out at Time 2 so P2 can finish. P3 waits until both are done.",
            rr: "P2 and P3 enter the queue as they arrive, taking their turns after P1's first slice."
        }
    },
    C: {
        title: "Scenario C: Fairness & Rotation",
        question: "Does the CPU rotate effectively with three processes?",
        table: [
            { p: "P1", at: 0, bt: 6, prio: 1 },
            { p: "P2", at: 0, bt: 6, prio: 2 },
            { p: "P3", at: 0, bt: 6, prio: 3 }
        ],
        nonPre: [{ id: 1, start: 0, end: 6 }, { id: 2, start: 6, end: 12 }, { id: 3, start: 12, end: 18 }],
        pre: [{ id: 1, start: 0, end: 6 }, { id: 2, start: 6, end: 12 }, { id: 3, start: 12, end: 18 }],
        rr: [
            { id: 1, start: 0, end: 3 }, { id: 2, start: 3, end: 6 }, { id: 3, start: 6, end: 9 },
            { id: 1, start: 9, end: 12 }, { id: 2, start: 12, end: 15 }, { id: 3, start: 15, end: 18 }
        ],
        analysis: {
            priority: "P1 hogs the CPU for 6s, then P2, then P3. Low-priority P3 waits a full 12s to start.",
            rr: "ensures fairness by granting every process an equal time quantum of 3 units, cycling through each in order so no process is starved or prioritized over another."
        }
    },
    D: {
        title: "Scenario D: The Starvation Risk",
        question: "Can multiple high-prio tasks block a low-prio task?",
        table: [
            { p: "P1", at: 0, bt: 10, prio: 1 },
            { p: "P2", at: 1, bt: 5, prio: 1 },
            { p: "P3", at: 2, bt: 2, prio: 5 } // Low priority
        ],
        nonPre: [{ id: 1, start: 0, end: 10 }, { id: 2, start: 10, end: 15 }, { id: 3, start: 15, end: 17 }],
        pre: [{ id: 1, start: 0, end: 10 }, { id: 2, start: 10, end: 15 }, { id: 3, start: 15, end: 17 }],
        rr: [
            { id: 1, start: 0, end: 3 }, { id: 2, start: 3, end: 6 }, { id: 3, start: 6, end: 8 },
            { id: 1, start: 8, end: 11 }, { id: 2, start: 11, end: 13 }, { id: 1, start: 13, end: 17 }
        ],
        analysis: {
            priority: "Starvation: P3 is 'trapped' behind P1 and P2 because they both have higher priority.",
            rr: "P3 finishes at Time 8, which is much faster than waiting until Time 15 in the priority charts."
        }
    },
    E: { 
    title: "Scenario E: Validation Case", 
    question: "What happens when invalid process data is submitted to the scheduler?", 
    table: [], nonPre: [], pre: [], rr: [], 
    analysis: { priority: "N/A", rr: "N/A" } 
    }
};
