const apiKey = ''; // No API key is needed for MealDB
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const query = encodeURIComponent(searchInput.value.trim());
  if (query) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;

    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(data => {
        const meals = data.meals;
        resultsDiv.innerHTML = '';
        if (meals) {
          meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('meal-card');
            mealElement.innerHTML = `
              <h2>${meal.strMeal}</h2>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
            `;
            resultsDiv.appendChild(mealElement);
          });
        } else {
          resultsDiv.innerHTML = '<p>No meals found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        resultsDiv.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`;
      });
  } else {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
  }
});
