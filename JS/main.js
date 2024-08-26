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

    if (!habitName || !habitGoal || habitGoal <= 0) {
      alert("Please enter a valid habit name and goal.");
      return;
    }

    document.getElementById("habit-form").reset();
  });

document.getElementById("habits").addEventListener("change", function (event) {
  if (event.target.classList.contains("habit-complete")) {
    const habitItem = event.target.parentElement;
    habitItem.classList.toggle("completed");
  }
});

function addHabit(habitName, habitGoal) {
  const habitList = document.getElementById("habits");
  const newHabit = document.createElement("li");
  newHabit.innerHTML = `
      <input type="checkbox" class="habit-complete">
      <span class="habit-name">${habitName}</span> 
      <span class="habit-goal">${habitGoal} times/day</span>
  `;
  habitList.appendChild(newHabit);
}
