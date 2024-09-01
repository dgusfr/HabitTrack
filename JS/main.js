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

// Adiciona evento para remover hábito ao clicar duas vezes
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

// Salva hábitos no localStorage
function saveHabits() {
  const habits = [];
  document
    .querySelectorAll("#habits li")
    .forEach((li) => habits.push(li.textContent));
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Modifica o evento de adicionar hábito para salvar no localStorage
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

// Carrega hábitos do localStorage ao carregar a página
window.addEventListener("load", function () {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.forEach((habit) => {
    const li = document.createElement("li");
    li.textContent = habit;
    document.getElementById("habits").appendChild(li);
  });
});

// Atualiza a mensagem de lista vazia quando um hábito é adicionado ou removido
function updateEmptyMessage() {
  const emptyMessage = document.getElementById("empty-message");
  const habitsList = document.getElementById("habits");
  if (habitsList.children.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

// Modifica o evento de adicionar hábito para atualizar a mensagem
document.getElementById("add-habit").addEventListener("click", function () {
  // Código existente...
  updateEmptyMessage();
});

// Modifica o evento de remover hábito para atualizar a mensagem
document
  .getElementById("habits")
  .addEventListener("dblclick", function (event) {
    if (event.target.tagName === "LI") {
      event.target.remove();
      saveHabits();
      updateEmptyMessage();
    }
  });

// Chama a função de atualização ao carregar a página
window.addEventListener("load", updateEmptyMessage);

// Adiciona confirmação antes de remover um hábito
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

// Adiciona funcionalidade para limpar todos os hábitos
document.getElementById("clear-habits").addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all habits?")) {
    document.getElementById("habits").innerHTML = "";
    saveHabits();
    updateEmptyMessage();
  }
});
