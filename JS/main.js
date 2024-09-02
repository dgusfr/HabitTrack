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

document.getElementById("clear-view").addEventListener("click", function () {
  clearHabitVisualization();
});

document
  .getElementById("habits")
  .addEventListener("dblclick", function (event) {
    if (event.target.tagName === "LI") {
      event.target.remove();
    }
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

document.getElementById("habits").addEventListener("change", function (event) {
  if (event.target.classList.contains("habit-complete")) {
    const habitItem = event.target.parentElement;
    habitItem.classList.toggle("completed");
  }
});

function addHabit(habitName) {
  const li = document.createElement("li");
  li.textContent = habitName;
  document.getElementById("habits").appendChild(li);
  saveHabits();
  updateEmptyMessage();
}

document.getElementById("add-habit").addEventListener("click", function () {
  const habitName = document.getElementById("habit-name").value;
  if (habitName) {
    addHabit(habitName);
    document.getElementById("habit-name").value = "";
  }
});

document
  .getElementById("category-filter")
  .addEventListener("change", function (event) {
    const selectedCategory = event.target.value;
    const habitItems = document.querySelectorAll("#habits li");
    habitItems.forEach((item) => {
      const itemCategory = item.querySelector(".habit-category").textContent;
      if (selectedCategory === "" || itemCategory === selectedCategory) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

function filterHabitsByCategory(category) {
  const habitItems = document.querySelectorAll("#habits li");
  let hasVisibleItems = false;

  habitItems.forEach((item) => {
    const itemCategory = item.querySelector(".habit-category").textContent;
    if (category === "" || itemCategory === category) {
      item.style.display = "flex";
      hasVisibleItems = true;
    } else {
      item.style.display = "none";
    }
  });

  if (!hasVisibleItems) {
    alert("No habits found for the selected category.");
  }
}

document
  .getElementById("start-date-filter")
  .addEventListener("change", function (event) {
    const selectedDate = event.target.value;
    const habitItems = document.querySelectorAll("#habits li");

    habitItems.forEach((item) => {
      const itemStartDate = item
        .querySelector(".habit-start-date")
        .textContent.replace("Start: ", "");
      if (selectedDate === "" || itemStartDate === selectedDate) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

function filterHabitsByStartDate(date) {
  const habitItems = document.querySelectorAll("#habits li");

  habitItems.forEach((item) => {
    const itemStartDate = item
      .querySelector(".habit-start-date")
      .textContent.replace("Start: ", "");
    item.style.display =
      date === "" || itemStartDate === date ? "flex" : "none";
  });
}

document
  .getElementById("start-date-filter")
  .addEventListener("change", function (event) {
    filterHabitsByStartDate(event.target.value);
  });

function filterHabitsByStartDate(date) {
  const habitItems = document.querySelectorAll("#habits li");
  let hasVisibleItems = false;

  habitItems.forEach((item) => {
    const itemStartDate = item
      .querySelector(".habit-start-date")
      .textContent.replace("Start: ", "");
    if (date === "" || itemStartDate === date) {
      item.style.display = "flex";
      hasVisibleItems = true;
    } else {
      item.style.display = "none";
    }
  });

  if (!hasVisibleItems) {
    alert("No habits found for the selected start date.");
  }
}

function viewHabitsByDate(date) {
  const habitItems = [...document.querySelectorAll("#habits li")];
  const habitsByDateList = document.getElementById("habits-by-date");
  habitsByDateList.innerHTML = "";

  const filteredHabits = habitItems.filter(
    (item) =>
      item
        .querySelector(".habit-start-date")
        .textContent.replace("Start: ", "") === date
  );

  if (filteredHabits.length > 0) {
    filteredHabits.forEach((item) => {
      const habitClone = item.cloneNode(true);
      habitsByDateList.appendChild(habitClone);
    });
  } else {
    const noHabitsMessage = document.createElement("li");
    noHabitsMessage.textContent = "No habits found for the selected date.";
    habitsByDateList.appendChild(noHabitsMessage);
  }
}

document
  .getElementById("view-date")
  .addEventListener("change", function (event) {
    viewHabitsByDate(event.target.value);
  });

function clearHabitVisualization() {
  document.getElementById("habits-by-date").innerHTML = "";
  document.getElementById("view-date").value = "";
}

document
  .getElementById("view-date")
  .addEventListener("change", function (event) {
    if (event.target.value === "") {
      clearHabitVisualization();
    } else {
      viewHabitsByDate(event.target.value);
    }
  });

function saveHabits() {
  const habits = [];
  document
    .querySelectorAll("#habits li")
    .forEach((li) => habits.push(li.textContent));
  localStorage.setItem("habits", JSON.stringify(habits));
}

document.getElementById("add-habit").addEventListener("click", function () {
  const habitName = document.getElementById("habit-name").value;
  if (habitName) {
    const li = document.createElement("li");
    li.textContent = habitName;
    document.getElementById("habits").appendChild(li);
    saveHabits();
    document.getElementById("habit-name").value = "";
  }
});

window.addEventListener("load", function () {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.forEach((habit) => {
    const li = document.createElement("li");
    li.textContent = habit;
    document.getElementById("habits").appendChild(li);
  });
});

function updateEmptyMessage() {
  const emptyMessage = document.getElementById("empty-message");
  const habitsList = document.getElementById("habits");
  if (habitsList.children.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

document.getElementById("add-habit").addEventListener("click", function () {
  updateEmptyMessage();
});

document
  .getElementById("habits")
  .addEventListener("dblclick", function (event) {
    if (event.target.tagName === "LI") {
      event.target.remove();
      saveHabits();
      updateEmptyMessage();
    }
  });

window.addEventListener("load", updateEmptyMessage);

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

document.getElementById("clear-habits").addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all habits?")) {
    document.getElementById("habits").innerHTML = "";
    saveHabits();
    updateEmptyMessage();
  }
});

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

// Atualiza a função de adição de categoria para incluir salvamento
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
