async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.getElementById('recipeField').value;
    //remove capitalized letters, and spacing before/after input.
    const searchQuery = inputValue.toLowerCase().trim();
    console.log(searchQuery);

    try {
        const recipeResults = await searchRecipe(searchQuery);
        // console.log(recipeResults);
        displayResults(recipeResults);
    } catch (err) {
        console.log(err);
        alert('Failed to Search Recipe Puppy');
    }
}


async function searchRecipe(searchQuery) {
    const endpoint = `http://www.recipepuppy.com/api/?q=${searchQuery}`;
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

    for (let i = 0; i < recipeResults.length; i++) {
        // recipeResults.results.forEach(result => {
        searchResults.insertAdjacentHTML(
            `<div class="col-10">
    <h3>${title}</h3>
    <p>${href}</p>
    <p>${thumbnail}</p>
    <p>${ingredients}</p>
    </div>`);
    }

}

// Find search from field Recipe
const form = document.getElementById("recipeSeeker");
form.addEventListener('submit', handleSubmit);