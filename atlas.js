document.getElementById('continent-select').addEventListener('change', function () {
    fetchCountries(this.value);
});

function fetchCountries(region) {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .then(countries => {
            displayCountries(countries);
        })
        .catch(error => console.error('Error loading the countries:', error));
}

function displayCountries(countries) {
    const countriesContainer = document.getElementById('staty');
    countriesContainer.innerHTML = ''; // Clear previous countries
    countries.forEach(country => {
        const countryHtml = `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card" data-bs-toggle="modal" data-bs-target="#modal${country.cca3}">
                <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.official}">
                <div class="card-body">
                    <h5 class="card-title">${country.translations.ces.common}</h5>
                    <p class="card-text">Počet obyvatel: ${country.population.toLocaleString()}</p>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal${country.cca3}" tabindex="-1" aria-labelledby="countryLabel${country.cca3}">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="countryLabel${country.cca3}">${country.translations.ces.common}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                Hlavní město: ${country.capital ? country.capital[0] : 'Není dostupné'}
                                <br>Rozloha: ${country.area.toLocaleString()} km²
                                <br>Jazyky: ${Object.values(country.languages).join(', ')}
                            </div>
                            <div class="col-md-6" id="map${country.cca3}" style="height: 500px; width: 800px"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        countriesContainer.innerHTML += countryHtml;
    });

    // Initialize maps after the countries have been displayed
    countries.forEach(country => {
        const mapDiv = document.getElementById(`map${country.cca3}`);
        const mapOptions = {
            center: new google.maps.LatLng(country.latlng[0], country.latlng[1]),
            zoom: 6
        };
        new google.maps.Map(mapDiv, mapOptions);
    });
}


// Load initial data for Europe
fetchCountries('europe');
