window.addEventListener("load", function () {
  const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  savedHabits.forEach((habit) => {
    const li = document.createElement("li");
    li.textContent = habit;
    document.getElementById("habits").appendChild(li);
  });
  const savedCategories = JSON.parse(localStorage.getItem("categories"));
  if (savedCategories) {
    savedCategories.forEach((category) => {
      const categoryOption = document.createElement("option");
      categoryOption.value = category;
      categoryOption.textContent = category;
      document.getElementById("habit-category").appendChild(categoryOption);
    });
  }
  updateEmptyMessage();
  updateProgress();
});

document
  .getElementById("habit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const habitName = document.getElementById("habit-name").value;
    const habitGoal = document.getElementById("habit-goal").value;
    const habitCategory = document.getElementById("habit-category").value;
    const habitStartDate = document.getElementById("habit-start-date").value;
    const habitFrequency = document.getElementById("habit-frequency").value;

    if (
      habitName &&
      habitGoal &&
      habitCategory &&
      habitStartDate &&
      habitFrequency
    ) {
      addHabit(
        habitName,
        habitGoal,
        habitCategory,
        habitStartDate,
        habitFrequency
      );
      updateProgress();
    } else {
      alert("Please fill in all fields.");
    }

    document.getElementById("habit-form").reset();
  });

function addHabit(
  habitName,
  habitGoal,
  habitCategory,
  habitStartDate,
  habitFrequency
) {
  const habitList = document.getElementById("habits");
  const habitId = Date.now();
  const newHabit = document.createElement("li");
  newHabit.setAttribute("data-id", habitId);
  newHabit.innerHTML = `
      <input type="checkbox" class="habit-complete">
      <span class="habit-name">${habitName}</span> 
      <span class="habit-goal">${habitGoal} times/day</span>
      <span class="habit-category">${habitCategory}</span>
      <span class="habit-start-date">Start: ${habitStartDate}</span>
      <span class="habit-frequency">Frequency: ${habitFrequency} times/day</span>
      <button class="remove-habit">Remove</button>
  `;
  habitList.appendChild(newHabit);
  saveHabits();
  updateProgress();
}

function saveHabits() {
  const habits = [];
  document
    .querySelectorAll("#habits li")
    .forEach((li) => habits.push(li.textContent));
  localStorage.setItem("habits", JSON.stringify(habits));
}

document
  .getElementById("habits")
  .addEventListener("dblclick", function (event) {
    if (event.target.tagName === "LI") {
      if (confirm("Are you sure you want to remove this habit?")) {
        event.target.remove();
        saveHabits();
        updateEmptyMessage();
        updateProgress();
      }
    }
  });

function updateEmptyMessage() {
  const emptyMessage = document.getElementById("empty-message");
  const habitsList = document.getElementById("habits");
  emptyMessage.style.display =
    habitsList.children.length === 0 ? "block" : "none";
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", function () {
    const categoryName = document.getElementById("new-category-name").value;
    if (categoryName) {
      const categoryOption = new Option(categoryName, categoryName);
      document.getElementById("habit-category").add(categoryOption);
      saveCategories();
      document.getElementById("new-category-name").value = "";
    }
  });

function saveCategories() {
  const categories = Array.from(
    document.getElementById("habit-category").options
  ).map((option) => option.value);
  localStorage.setItem("categories", JSON.stringify(categories));
}

document.getElementById("clear-habits").addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all habits?")) {
    document.getElementById("habits").innerHTML = "";
    saveHabits();
    updateEmptyMessage();
    updateProgress();
  }
});

function updateProgress() {
  const habits = document.querySelectorAll("#habits li");
  const progressList = document.getElementById("progress-list");
  progressList.innerHTML = ""; // Clear current list

  habits.forEach((habit) => {
    const progressItem = document.createElement("li");
    const name = habit.querySelector(".habit-name").textContent;
    const frequency = habit.querySelector(".habit-frequency").textContent;
    progressItem.innerHTML = `${name}: 0/${frequency}`;
    progressList.appendChild(progressItem);
  });
}
function incrementProgress(button) {
  const habitItem = button.closest("li");
  const progressText = habitItem.querySelector(".progress-text");
  let [current, total] = progressText.textContent.split("/").map(Number);
  if (current < total) {
    current += 1;
    progressText.textContent = `${current}/${total}`;
    updateLocalStorage(); // Atualiza o localStorage após mudança
  }
}

function saveCategories() {
  const categories = Array.from(
    document.getElementById("habit-category").options
  ).map((option) => ({
    name: option.value,
    color: option.dataset.color,
  }));
  localStorage.setItem("categories", JSON.stringify(categories));
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", function () {
    const categoryName = document.getElementById("new-category-name").value;
    const categoryColor = document.getElementById("category-color").value;
    if (categoryName) {
      const categoryOption = new Option(categoryName, categoryName);
      categoryOption.style.backgroundColor = categoryColor;
      document.getElementById("habit-category").add(categoryOption);
      saveCategories();
      document.getElementById("new-category-name").value = "";
    }
  });

newHabit.style.backgroundColor =
  document.getElementById(
    "habit-category"
  ).selectedOptions[0].style.backgroundColor;

document
  .getElementById("habit-category")
  .addEventListener("change", function () {
    this.style.backgroundColor = this.selectedOptions[0].style.backgroundColor;
  });

document
  .getElementById("reset-category-form")
  .addEventListener("click", function () {
    document.getElementById("new-category-name").value = "";
    document.getElementById("category-color").value = "#ff0000";
    document.getElementById("habit-category").style.backgroundColor = "";
  });

window.addEventListener("load", function () {
  const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
  savedCategories.forEach((cat) => {
    const categoryOption = new Option(cat.name, cat.name);
    categoryOption.style.backgroundColor = cat.color;
    document.getElementById("habit-category").add(categoryOption);
  });
});

categoryOption.title = `Color: ${categoryColor}`;
function addCategory(name, color) {
  const categoryOption = new Option(name, name);
  categoryOption.style.backgroundColor = color;
  categoryOption.title = `Color: ${color}`;
  document.getElementById("habit-category").add(categoryOption);
}
progressItem.style.backgroundColor =
  habit.querySelector(".habit-category").style.backgroundColor;

function addHabit(
  habitName,
  habitGoal,
  habitCategory,
  habitStartDate,
  habitFrequency,
  enableNotification
) {
  const habitList = document.getElementById("habits");
  const habitId = Date.now();
  const newHabit = document.createElement("li");
  newHabit.setAttribute("data-id", habitId);
  newHabit.innerHTML = `
        <input type="checkbox" class="habit-complete">
        <span class="habit-name">${habitName}</span>
        <span class="habit-goal">${habitGoal} times/day</span>
        <span class="habit-category">${habitCategory}</span>
        <span class="habit-start-date">Start: ${habitStartDate}</span>
        <span class="habit-frequency">Frequency: ${habitFrequency} times/day</span>
        <span class="habit-notification">${
          enableNotification ? "Notifications Enabled" : "No Notifications"
        }</span>
        <button class="remove-habit">Remove</button>
    `;
  habitList.appendChild(newHabit);
  saveHabits();
}
function sendNotification(habitName) {
  if (Notification.permission === "granted") {
    new Notification("Time for your habit!", {
      body: `Don't forget to complete your habit: ${habitName}`,
      icon: "/path/to/icon.png",
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (
    Notification.permission !== "denied" ||
    Notification.permission === "default"
  ) {
    Notification.requestPermission();
  }
});
function scheduleDailyNotification(habitName, time) {
  let today = new Date();
  let scheduledTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    time.hours,
    time.minutes
  );

  setTimeout(function () {
    sendNotification(habitName);
    scheduleDailyNotification(habitName, time); // Re-schedule the next day
  }, scheduledTime.getTime() - today.getTime());
}
document.querySelectorAll(".cancel-notification").forEach((button) => {
  button.addEventListener("click", function () {
    const habitId = this.closest("li").getAttribute("data-id");
    cancelNotification(habitId);
    updateHabitList();
  });
});
function remindAtIntervals(habitName, interval) {
  setInterval(() => {
    sendNotification(habitName);
  }, interval);
}
document
  .getElementById("reminder-interval")
  .addEventListener("change", function () {
    const interval = this.value * 3600000; // Convert hours to milliseconds
    const habitName = document.getElementById("habit-name").value;
    remindAtIntervals(habitName, interval);
  });
