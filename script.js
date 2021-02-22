async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.getElementById('recipeField').value;
    //remove capitalized letters, and spacing before/after input.
    const searchQuery = inputValue.toLowerCase().trim();
    console.log(searchQuery);

    try {
        const recipeResults = await searchRecipe(searchQuery);
        console.log(recipeResults);
        displayResults(recipeResults);
    } catch (err) {
        console.log(err);
        alert('Failed to Search Recipe Puppy');
    }
}


async function searchRecipe(searchQuery) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

function displayResults(recipeResults) {
    // reference linking to the div for showing the recipe results
    const searchResults = document.getElementById("searchResultsDisplay");

    for (let i = 0; i < recipeResults.meals.length; i++) {
        // recipeResults.results.forEach(result => {
        searchResults.insertAdjacentHTML('beforeend',
            `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${recipeResults.meals[i].strMealThumb}" alt="Thumbnail">
            <div class="card-body">
              <h5 class="card-title">${recipeResults.meals[i].strMeal}</h5>
              <p class="card-text">${recipeResults.meals[i].strInstructions.substring(0,250) + ' ...'}</p>
              <a href="${recipeResults.meals[i].strSource}" class="btn btn-primary">See the full meal instructions</a>
            </div>
          </div>`)
    }
}

// Find search from field Recipe
const form = document.getElementById("recipeSeeker");
form.addEventListener('submit', handleSubmit);