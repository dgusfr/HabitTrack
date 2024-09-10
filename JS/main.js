document.addEventListener("DOMContentLoaded", function () {
  Notification.requestPermission();
  loadCategories();
  loadHabits();
  updateProgress();
});

function loadCategories() {
  const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
  savedCategories.forEach((cat) => {
    const categoryOption = new Option(cat.name, cat.name);
    categoryOption.style.backgroundColor = cat.color;
    document.getElementById("habit-category").add(categoryOption);
  });
}

function loadHabits() {
  const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  savedHabits.forEach((habit) => {
    const li = document.createElement("li");
    li.textContent = habit;
    document.getElementById("habits").appendChild(li);
  });
}

document.getElementById("add-habit").addEventListener("click", function () {
  const habitName = document.getElementById("habit-name").value;
  const habitGoal = document.getElementById("habit-goal").value;
  const habitCategory = document.getElementById("habit-category").value;
  const habitStartDate = document.getElementById("habit-start-date").value;
  const habitFrequency = document.getElementById("habit-frequency").value;
  const enableNotification =
    document.getElementById("habit-notification").checked;
  addHabit(
    habitName,
    habitGoal,
    habitCategory,
    habitStartDate,
    habitFrequency,
    enableNotification
  );
  updateProgress();
});

function addHabit(name, goal, category, startDate, frequency, notification) {
  const li = document.createElement("li");
  li.textContent = `${name} - ${goal} times/day - Start: ${startDate} - Frequency: ${frequency} times/day`;
  if (notification) {
    li.textContent += " - Notifications Enabled";
  }
  document.getElementById("habits").appendChild(li);
  saveHabits();
}

function saveHabits() {
  const habits = Array.from(document.getElementById("habits").children).map(
    (li) => li.textContent
  );
  localStorage.setItem("habits", JSON.stringify(habits));
}

function updateProgress() {
  const progressList = document.getElementById("progress-list");
  progressList.innerHTML = "";
  document.querySelectorAll("#habits li").forEach((habit) => {
    const li = document.createElement("li");
    li.textContent = `Progress for ${habit.textContent}`;
    progressList.appendChild(li);
  });
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", function () {
    const categoryName = document.getElementById("new-category-name").value;
    const categoryColor = document.getElementById("category-color").value;
    addCategory(categoryName, categoryColor);
  });

function addCategory(name, color) {
  const categoryOption = new Option(name, name);
  categoryOption.style.backgroundColor = color;
  document.getElementById("habit-category").add(categoryOption);
  saveCategories();
}

function saveCategories() {
  const categories = Array.from(
    document.getElementById("habit-category").options
  ).map((option) => ({
    name: option.value,
    color: option.style.backgroundColor,
  }));
  localStorage.setItem("categories", JSON.stringify(categories));
}
