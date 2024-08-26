document.addEventListener("DOMContentLoaded", () => {
  console.log("HabitTrack is ready!");
});

document
  .getElementById("habit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const habitName = document.getElementById("habit-name").value;
    const habitGoal = document.getElementById("habit-goal").value;

    if (habitName && habitGoal) {
      const habitList = document.getElementById("habits");
      const newHabit = document.createElement("li");
      newHabit.innerHTML = `<span class="habit-name">${habitName}</span> <span class="habit-goal">${habitGoal} times/day</span>`;
      habitList.appendChild(newHabit);
    }

    document.getElementById("habit-form").reset();
  });
