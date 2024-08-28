document.addEventListener("DOMContentLoaded", () => {
  console.log("HabitTrack is ready!");
});

document.getElementById("habits").addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-habit")) {
    const habitItem = event.target.parentElement;
    habitItem.remove();
  }
});

document.getElementById("reset-habits").addEventListener("click", resetHabits);

document
  .getElementById("habit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const habitName = document.getElementById("habit-name").value;
    const habitGoal = document.getElementById("habit-goal").value;
    const habitCategory = document.getElementById("habit-category").value;

    if (habitName && habitGoal && habitCategory) {
      addHabit(habitName, habitGoal, habitCategory);
    } else {
      alert("Please fill in all fields.");
    }

    document.getElementById("habit-form").reset();
  });

document.getElementById("habits").addEventListener("change", function (event) {
  if (event.target.classList.contains("habit-complete")) {
    const habitItem = event.target.parentElement;
    habitItem.classList.toggle("completed");
  }
});

function addHabit(habitName, habitGoal, habitCategory) {
  const habitList = document.getElementById("habits");
  const habitId = Date.now();
  const newHabit = document.createElement("li");
  newHabit.setAttribute("data-id", habitId);
  newHabit.innerHTML = `
      <input type="checkbox" class="habit-complete">
      <span class="habit-name">${habitName}</span> 
      <span class="habit-goal">${habitGoal} times/day</span>
      <span class="habit-category">${habitCategory}</span>
      <button class="remove-habit">Remove</button>
  `;
  habitList.appendChild(newHabit);
}

document
  .getElementById("category-filter")
  .addEventListener("change", function (event) {
    const selectedCategory = event.target.value;
    const habitItems = document.querySelectorAll("#habits li");
    //teste
    habitItems.forEach((item) => {
      const itemCategory = item.querySelector(".habit-category").textContent;
      if (selectedCategory === "" || itemCategory === selectedCategory) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
