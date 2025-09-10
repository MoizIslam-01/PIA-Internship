const ctx = document.getElementById("myBarChart").getContext("2d");
const myBarChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Admins", "Editors", "Subscribers"],
    datasets: [
      {
        label: "Users",
        data: [105, 198, 152],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107"], // Bootstrap colors
        borderRadius: 5,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2 },
      },
    },
  },
});
