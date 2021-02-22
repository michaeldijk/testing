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
            `<div class="col-10">
    <h3>${recipeResults.meals[i].strMeal}</h3>
    <p>${recipeResults.meals[i].strInstructions}</p>
    <p>${recipeResults.meals[i].strSource}</p>
    </div>`)
    }
}

// Find search from field Recipe
const form = document.getElementById("recipeSeeker");
form.addEventListener('submit', handleSubmit);