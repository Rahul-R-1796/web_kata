const apiUrl = "https://api.openbrewerydb.org/breweries";

async function getBreweries() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Error fetching breweries:", error);
    return [];
  }
}

function displayBreweries(breweries) {
  const breweryList = document.getElementById("brewery-list");
  breweryList.innerHTML = "";
  breweries.forEach((brewery) => {
    const breweryItem = document.createElement("li");
    breweryItem.innerHTML = `
      <h3>${brewery.name}</h3>
      <p>Type: ${brewery.brewery_type}</p>
      <p>Address: ${brewery.street}, ${brewery.city}, ${brewery.state_province} ${brewery.postal_code}</p>
      <p>Website: <a href="${brewery.website_url}">${brewery.website_url}</a></p>
      <p>Phone: ${brewery.phone}</p>
    `;
    breweryList.appendChild(breweryItem);
  });                               
}

function filterBreweries(breweries, searchText) {
  return breweries.filter((brewery) => {
    const name = brewery.name.toLowerCase();
    const type = brewery.brewery_type.toLowerCase();
    const city = brewery.city.toLowerCase();
    const state = brewery.state_province.toLowerCase();
    const search = searchText.toLowerCase();
    return name.includes(search) || type.includes(search) || city.includes(search) || state.includes(search);
  });
}

async function init() {
  const breweries = await getBreweries();
  displayBreweries(breweries);

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.trim();
    const filteredBreweries = filterBreweries(breweries, searchText);
    displayBreweries(filteredBreweries);
  });
}

init();
