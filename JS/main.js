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
});

document
  .getElementById("habit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const habitName = document.getElementById("habit-name").value;
    const habitGoal = document.getElementById("habit-goal").value;
    const habitCategory = document.getElementById("habit-category").value;
    const habitStartDate = document.getElementById("habit-start-date").value;

    if (habitName && habitGoal && habitCategory && habitStartDate) {
      addHabit(habitName, habitGoal, habitCategory, habitStartDate);
    } else {
      alert("Please fill in all fields.");
    }

    document.getElementById("habit-form").reset();
  });

function addHabit(habitName, habitGoal, habitCategory, habitStartDate) {
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
      <button class="remove-habit">Remove</button>
  `;
  habitList.appendChild(newHabit);
  saveHabits();
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
  }
});

function viewHabitsByDate(date) {
  const habitItems = document.querySelectorAll("#habits li");
  const habitsByDateList = document.getElementById("habits-by-date");
  habitsByDateList.innerHTML = "";

  habitItems.forEach((item) => {
    const itemStartDate = item
      .querySelector(".habit-start-date")
      .textContent.replace("Start: ", "");
    if (itemStartDate === date) {
      const habitClone = item.cloneNode(true);
      habitsByDateList.appendChild(habitClone);
    }
  });

  if (habitsByDateList.children.length === 0) {
    const noHabitsMessage = document.createElement("li");
    noHabitsMessage.textContent = "No habits found for the selected date.";
    habitsByDateList.appendChild(noHabitsMessage);
  }
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", function () {
    const categoryName = document.getElementById("new-category-name").value;
    if (categoryName) {
      const categoryOption = document.createElement("option");
      categoryOption.value = categoryName;
      categoryOption.textContent = categoryName;
      document.getElementById("habit-category").appendChild(categoryOption);
      document.getElementById("new-category-name").value = "";
    }
  });

function saveCategories() {
  const categories = Array.from(
    document.getElementById("habit-category").options
  ).map((option) => option.value);
  localStorage.setItem("categories", JSON.stringify(categories));
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", function () {
    const categoryName = document.getElementById("new-category-name").value;
    if (categoryName) {
      const categoryOption = document.createElement("option");
      categoryOption.value = categoryName;
      categoryOption.textContent = categoryName;
      document.getElementById("habit-category").appendChild(categoryOption);
      document.getElementById("new-category-name").value = "";
      saveCategories();
    }
  });

window.addEventListener("load", function () {
  const savedCategories = JSON.parse(localStorage.getItem("categories"));
  if (savedCategories) {
    savedCategories.forEach((category) => {
      const categoryOption = document.createElement("option");
      categoryOption.value = category;
      categoryOption.textContent = category;
      document.getElementById("habit-category").appendChild(categoryOption);
    });
  }
});

document
  .getElementById("habit-category")
  .addEventListener("change", function () {
    const selectedCategory = this.value;
    document.querySelectorAll("#habits li").forEach((li) => {
      const liCategory = li.dataset.category;
      li.style.display =
        selectedCategory === liCategory || selectedCategory === "All"
          ? ""
          : "none";
    });
  });

function handleCategoryInput() {
  const categoryName = document.getElementById("new-category-name").value;
  if (!categoryName) return;
  const categoryOption = new Option(categoryName, categoryName);
  document.getElementById("habit-category").add(categoryOption);
  saveCategories();
  document.getElementById("new-category-name").value = "";
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", handleCategoryInput);

function handleCategoryInput() {
  const categoryName = document.getElementById("new-category-name").value;
  if (!categoryName) return;
  const categoryOption = new Option(categoryName, categoryName);
  document.getElementById("habit-category").add(categoryOption);
  alert("Category added successfully!");
  saveCategories();
  document.getElementById("new-category-name").value = "";
}

document
  .getElementById("add-category-btn")
  .addEventListener("click", handleCategoryInput);
