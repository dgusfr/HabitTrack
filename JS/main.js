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
}

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
