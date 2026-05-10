#  CPU Scheduling Simulator: Round Robin vs. Preemptive Priority

### **Project Overview**
This project is a high-fidelity web-based simulation tool developed for the **Operating Systems** course. It provides a comparative analysis between two major CPU scheduling algorithms: **Round Robin** (focusing on fairness) and **Preemptive Priority** (focusing on urgency). The simulator helps in understanding how different scheduling policies impact system performance through visual Gantt charts and precise metrics (WT, TAT, RT).

---

### ** Team Members**
- **جنى ماهر ناصر** 
- **رغد ايهاب محمود**
- **بسملة ابراهيم السيد**
- **اوليفيا ناجي فوزي**
- **روان سعد عيد**
- **حبيبة كمال رمضان**
- **زيزف اشرف جمال**

---

### ** Project Requirements**
To run this project, you only need a modern web browser (Chrome, Firefox, Edge, or Safari). 
* **Core Technologies:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+ Modules).
* **Dependencies:** None. The project is lightweight and runs entirely on the client side.

---

### ** Key Features**
1.  **Dynamic Process Management:** Add, edit, and delete processes at runtime.
2.  **Input Validation:** Robust error handling for duplicate IDs, empty fields, and invalid time/priority values.
3.  **Real-time Visualization:** Dynamic generation of color-coded Gantt charts with precise time markers.
4.  **Mathematical Engine:** Accurate calculation of:
    - **Waiting Time (WT)**
    - **Turnaround Time (TAT)**
    - **Response Time (RT)**
5.  **Smart Test Scenarios:** 5 built-in scenarios (A-E) to demonstrate concepts like Starvation, Fairness, and Validation.

---

### ** Directory Structure**
```text
project-root/
├── src/
│   ├── gui/
│   │   ├── index.html       # Main UI Layout
│   │   ├── script.js        # Controller & Event Handling
│   │   └── style.css        # Professional Dark Theme Styling
│   ├── js/
│   │   ├── priority.js      # Preemptive Priority Logic
│   │   ├── roundrobin.js    # Round Robin Logic
│   │   └── metrics.js       # Calculations Engine
│   └── test/
│       └── testScenarios.js # Pre-defined Scenarios Data
└── README.md                # Project Documentation

---

### ** How to Build & Run**
1.  **Download/Clone:** Clone the repository or download the ZIP file.
2.  **Navigate:** Go to the `src/gui/` directory.
3.  **Launch:**
    * Right-click `index.html` and select **"Open with..."** and choose your preferred browser.
    * *Optional:* Use the **Live Server** extension in VS Code for real-time updates and a smoother experience.

---

### ** Technical Assumptions & Rules**
* **Priority Rule:** A **lower numerical value** represents a higher priority (e.g., Priority 0 or 1 is the highest).
* **Tie-Breaking:** If two processes arrive at the same time with the same priority, the one that appeared first in the input list (**FCFS**) is handled first.
* **Preemption:** The Priority algorithm is **Preemptive**; it re-evaluates the CPU owner at every 1-unit time step to ensure high-priority tasks are served immediately.
* **RR Behavior:** New arrivals during a process execution are added to the back of the ready queue **before** the current process (if it has remaining time and is returning to the queue).

---

### ** Analysis Formulas**
The simulator uses the following standard Operating Systems formulas:

* **Turnaround Time (TAT):** $$TAT = Completion\ Time - Arrival\ Time$$
* **Waiting Time (WT):** $$WT = Turnaround\ Time - Burst\ Time$$
* **Response Time (RT):** $$RT = First\ Start\ Time - Arrival\ Time$$

---

### ** Test Scenarios Breakdown**
| Scenario | Focus | Description |
| :--- | :--- | :--- |
| **Scenario A** | *Normal* | Basic workload to test general logic and a standard queue. |
| **Scenario B** | *Urgency* | Shows how high-priority tasks **preempt** (cut) current execution. |
| **Scenario C** | *Fairness* | Demonstrates equal CPU distribution using Round Robin's quantum. |
| **Scenario D** | *Starvation* | Illustrates how low-priority tasks can be blocked in Priority systems. |
| **Scenario E** | *Validation* | Tests robust error handling for empty or invalid inputs. |

---

> **Note:** All charts and metrics are generated dynamically based on the current process table and settings.
