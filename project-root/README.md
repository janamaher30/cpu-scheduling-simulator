# ⚙️ CPU Scheduling Simulator: Round Robin vs. Preemptive Priority

### **Project Overview**
This project is a high-fidelity web-based simulation tool developed for the **Operating Systems** course. It provides a comparative analysis between two major CPU scheduling algorithms: **Round Robin** (focusing on fairness) and **Preemptive Priority** (focusing on urgency). The simulator helps in understanding how different scheduling policies impact system performance through visual Gantt charts and precise metrics (WT, TAT, RT).

---

### **👥 Team Members**
- **جنى ماهر ناصر** 
- **رغد ايهاب محمود**
- **بسملة ابراهيم السيد**
- **اوليفيا ناجي فوزي**
- **روان سععيد عيد**
- **حبيبة كمال رمضان**
- **زيزف اشرف جمال**

---

### **🚀 Project Requirements**
To run this project, you only need a modern web browser (Chrome, Firefox, Edge, or Safari). 
* **Core Technologies:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+ Modules).
* **Dependencies:** None. The project is lightweight and runs entirely on the client side.

---

### **✨ Key Features**
1.  **Dynamic Process Management:** Add, edit, and delete processes at runtime.
2.  **Input Validation:** Robust error handling for duplicate IDs, empty fields, and invalid time/priority values.
3.  **Real-time Visualization:** Dynamic generation of color-coded Gantt charts with precise time markers.
4.  **Mathematical Engine:** Accurate calculation of:
    - **Waiting Time (WT)**
    - **Turnaround Time (TAT)**
    - **Response Time (RT)**
5.  **Smart Test Scenarios:** 5 built-in scenarios (A-E) to demonstrate concepts like Starvation, Fairness, and Validation.

---

### **📂 Directory Structure**
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
│   └── model/
│       └── testScenarios.js # Pre-defined Scenarios Data
└── README.md                # Project Documentation