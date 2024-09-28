"use strict";

let chartBMI;

function updateChart(bmi, color) {
  const ctx = document.getElementById("bmiChart").getContext("2d");

  if (chartBMI) {
    chartBMI.destroy();
  }

  chartBMI = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Your BMI"],
      datasets: [
        {
          label: "BMI Value",
          data: [bmi],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 40,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function calculateBMI() {
  const weightInput = parseInt(document.getElementById("weight").value);
  const heightInput = parseInt(document.getElementById("height").value) / 100;
  const statusValue = document.getElementById("status-value");
  const statusMessage = document.getElementById("status-text");
  const adviceMessage = document.getElementById("advice-text");

  let status = "", statusValueColor = "", statusMessageColor = "";
  let chartColor = "";
  let advice = "", adviceColor = "";
  const bmi = weightInput / (heightInput * heightInput);

  if (!weightInput || !heightInput) {
    alert("Enter valid values with numbers for weight and height.");
    return;
  }

  if (bmi < 18.5) {
    const weightToGain = ((18.5 * heightInput * heightInput) - weightInput).toFixed(1);

    statusValueColor = "#ca8a04";
    chartColor = "#ca8a04";
    statusMessageColor = "#ca8a04";
    adviceColor = "#ca8a04";

    status = "Underweight";
    advice = `You need to gain another ${weightToGain} kg to achieve a normal weight.`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    statusValueColor = "#16a34a";
    chartColor = "#16a34a";
    statusMessageColor = "#16a34a";
    adviceColor = "#16a34a";

    status = "Normal";
    advice = "Your weight is already ideal! Keep up your healthy eating and lifestyle.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    const weightToLose = (weightInput - (24.9 * heightInput * heightInput)).toFixed(1);

    statusValueColor = "#ea580c";
    chartColor = "#ea580c";
    statusMessageColor = "#ea580c";
    adviceColor = "#ea580c";

    status = "Overweight";
    advice = `Lose ${weightToLose} kg to reach a normal weight.`;
  } else {
    const weightToLose = (weightInput - (24.9 * heightInput * heightInput)).toFixed(1);

    statusValueColor = "#dc2626";
    chartColor = "#dc2626";
    statusMessageColor = "#dc2626";
    adviceColor = "#dc2626";

    status = "Obesity";
    advice = `Lose ${weightToLose} kg to reach a normal weight. Talk to a specialist for a safe weight loss plan.`;
  }

  statusValue.textContent = bmi.toFixed(1);
  statusValue.style.color = statusValueColor;

  statusMessage.textContent = status;
  statusMessage.style.color = statusMessageColor;

  adviceMessage.textContent = advice;
  adviceMessage.style.color = adviceColor;

  updateChart(bmi, chartColor);
}