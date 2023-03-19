// get the button element

const button = document.getElementById('quoteButton');

//// define the options for the API call
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'accd224a1amsh05fa66da7a6936ap1c4e91jsn43d65025a4eb',
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

// add a click event listener to the button
button.addEventListener('click', () => {
  // make the API call
  fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
    .then(response => response.json())
    .then(response => {
      document.getElementById('quote').innerHTML = response.content;
      document.getElementById('author').innerHTML = '- ' + response.originator.name + ' -';
    })
    .catch(err => console.error(err));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

const form = document.querySelector('form');
const input = document.querySelector('input');
const gameDetails = document.querySelector('#game-details');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevents the form from submitting and reloading the page
  

const query = document.getElementById('gameNameInput').value;
const apiKey = '1a2d3d41c7e94b45b5732d9ec78d7952';
const searchUrl = `https://api.rawg.io/api/games?search=${query}&key=${apiKey}`;

fetch(searchUrl)
  .then(response => response.json())
  .then(response => {
    if (response.results.length === 0) {
      gameDetails.innerHTML=`There's no game called ${query}`;
      return;
    }
    const gameSlug = response.results[0].slug;
    const gameUrl = `https://api.rawg.io/api/games/${gameSlug}?key=${apiKey}`;
    return fetch(gameUrl);
  })
  .then(response => response.json())
  .then(response => {
    const name = response.name;
    const screenshotUrl = response.background_image_additional;
    const description = response.description;
    const website = response.website;

    gameDetails.innerHTML = `
      <h2>${name}</h2>
      <img src="${screenshotUrl}"  alt="Screenshot of ${name}" style="max-width: 100%">
      <p>${description}</p>
      <a href="${website}" target="_blank">${website}</a>
    `;
  })
  .catch(error => console.error(error));
});


const options1 ={
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'accd224a1amsh05fa66da7a6936ap1c4e91jsn43d65025a4eb',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
};

fetch('https://covid-193.p.rapidapi.com/countries',options1)
.then(response =>response.json())
.then(response =>{

       const CountrySelect = document.getElementById('country-select');
      response.response.forEach(country => {
             const option = document.createElement('option');
             option.value = country;
             option.text = country;
             CountrySelect.appendChild(option);
      });
  })
  .catch(err =>console.error(err));


  const countrySelect = document.getElementById('country-select');
countrySelect.addEventListener('change', () => {
  const selectedCountry = countrySelect.value;
  fetchCountryStats(selectedCountry);
});

function fetchCountryStats(country) {
  
  fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, options1)
    .then(response => response.json())
    .then(response => {
      const stats = response.response[0];
      updateUI(stats);
    })
    .catch(err => console.error(err));
}

function updateUI(stats) {
 
  const timeElement = stats.time;
  const populationElement = stats.population; 
  const totalCasesElement = stats.cases.total;
  const newCasesElement = stats.cases.new;
  const activeCasesElement = stats.cases.active;
  const totalDeathsElement = stats.deaths.total;
  const newDeathsElement = stats.deaths.new;
  const totalTestsElement = stats.tests.total;

  const CountryDetails=document.getElementById('country-details');

  CountryDetails.innerHTML= `
  <font size="3" face="arial-black">
  <p>Time: ${timeElement}</p>
  <p>Population: ${populationElement}</p>
  <p>Total Cases :${totalCasesElement}</p>
  <p>New Cases: ${newCasesElement}</p>
  <p>Active Cases: ${activeCasesElement}</p>
  <p>Total Deaths:<font color="red"> ${totalDeathsElement}</font></p>
  <p>New Deaths:<font color="red"> ${newDeathsElement}</font></p>
  <p>Total Tests: ${totalTestsElement}</p>
  </font>
`;

}
