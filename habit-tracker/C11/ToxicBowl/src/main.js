const form = document.getElementById('habit_form')
const habitList = document.getElementById('habit_list')

//load habits from local storage or start with an empty array
let habits = JSON.parse(localStorage.getItem('habits')) || []


function saveHabits(){
    localStorage.setItem('habits', JSON.stringify(habits))
}

//habit addition
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const habit = {
        name: data.get('habit_name'),
        targetStreak: Number(data.get('target_streak')),
        completedDates: [] 
    }

    habits.push(habit)
    saveHabits()
    renderHabits()
    
    form.reset()
})

// render habits to page with addition of delete button next to any habits added
function renderHabits() {
  habitList.innerHTML = habits.map((habit, index) => `
    <li>
      ${habit.name} - Target Streak: ${habit.targetStreak}
      <button data-index="${index}" class="delete-btn">Delete</button> 
    </li>
  `).join('');
}
//delete habit
habitList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')){
    const index = event.target.getAttribute('data-index')
    habits.splice(index, 1)
    saveHabits()
    renderHabits() 
  }
})

// Initial render on page load from local storage
renderHabits();