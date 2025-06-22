let motorOn = false;
let alertThreshold = 90;
let historyLogs = [];

// Toggle motor button
document.getElementById("toggleMotor").addEventListener("click", () => {
  motorOn = !motorOn;
  document.getElementById("toggleMotor").textContent = motorOn ? "ON" : "OFF";
});

// Change alert threshold input
document.getElementById("alertThreshold").addEventListener("input", (e) => {
  alertThreshold = parseInt(e.target.value);
});

// Chart setup
const ctx = document.getElementById('usageChart').getContext('2d');
const usageChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Water Usage (L)',
      data: [],
      backgroundColor: '#0077cc'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Update history table
function updateHistoryLog(flow, tank, moist) {
  const today = new Date().toLocaleDateString();
  const log = { date: today, flow, tank, moist };
  historyLogs.unshift(log);

  const table = document.getElementById("historyTable");
  table.innerHTML = "";

  historyLogs.slice(0, 5).forEach(log => {
    const row = `<tr>
      <td>${log.date}</td>
      <td>${log.flow} L/min</td>
      <td>${log.tank}%</td>
      <td>${log.moist}%</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Update usage chart
function updateChart(flow) {
  const date = new Date().toLocaleDateString();
  const labels = usageChart.data.labels;
  const data = usageChart.data.datasets[0].data;

  if (labels.includes(date)) {
    const index = labels.indexOf(date);
    data[index] = (parseFloat(data[index]) + parseFloat(flow)).toFixed(1);
  } else {
    labels.push(date);
    data.push(flow);
  }

  usageChart.update();
}

// Main update function
function updateDashboard() {
  const flowRate = (Math.random() * 4).toFixed(1);
  const tankLevel = Math.floor(Math.random() * 101);
  const moisture = Math.floor(Math.random() * 101);

  document.getElementById("flowRate").textContent = flowRate;
  document.getElementById("tankLevel").textContent = tankLevel;
  document.getElementById("moisture").textContent = moisture;

  updateHistoryLog(flowRate, tankLevel, moisture);
  updateChart(flowRate);

  const alertBox = document.getElementById("alertBox");
  if (tankLevel >= alertThreshold) {
    alertBox.style.display = "block";
    alertBox.textContent = `⚠️ ALERT: Tank is ${tankLevel}%. Please stop the motor!`;
  } else {
    alertBox.style.display = "none";
  }
}

// Update every 5 seconds
updateDashboard();
setInterval(updateDashboard, 5000);
