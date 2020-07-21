var countriesList = [];
var favoritesCountriesList = [];
var numberFormat = null;

window.addEventListener("load", () => {
    getCountries();

    numberFormat = Intl.NumberFormat('pt-BR');
});

async function getCountries() {

    let response = await fetch("https://restcountries.eu/rest/v2/all");
    if (response.ok) {
        console.log(response);
        let data = await response.json();

        countriesList = data.map(country => {
            const { name, population, flag, numericCode } = country;

            return {
                id: numericCode,
                flag,
                name,
                population,
                formattedPopulation: formatNumber(population)
            }
        });

        countriesList = countriesList.sort((a, b) => a.name.localeCompare(b.name));

        renderCountries();
    } else {
        console.log("Error to search countries");
    }
}

function renderCountries() {
    let countries = document.querySelector("#countries-list");
    countries.innerHTML = "";

    let favoritesCountries = document.querySelector("#favorites-countries-list");
    favoritesCountries.innerHTML = "";

    let totalPopulationCountriesList = countriesList.reduce((previousValue, currentValue) => previousValue + currentValue.population, 0);

    let pTotalPopulation = document.createElement("p");
    pTotalPopulation.textContent = `Total Population: ${formatNumber(totalPopulationCountriesList)}`;

    let h6Countries = document.createElement("h6");
    h6Countries.textContent = `Total Countries: ${countriesList.length}`;

    countries.appendChild(pTotalPopulation);
    countries.appendChild(h6Countries);

    let totalPopulationCountriesFavoritiesList = favoritesCountriesList.reduce((previousValue, currentValue) => previousValue + currentValue.population, 0);

    let pTotalFavoritesPopulation = document.createElement("p");
    pTotalFavoritesPopulation.textContent = `Total Population: ${formatNumber(totalPopulationCountriesFavoritiesList)}`;

    let h6FavoritesCountries = document.createElement("h6");
    h6FavoritesCountries.textContent = `Total Countries: ${favoritesCountriesList.length}`;

    favoritesCountries.appendChild(pTotalFavoritesPopulation);
    favoritesCountries.appendChild(h6FavoritesCountries);

    countriesList.forEach(country => {

        let { id, name, flag, population, formattedPopulation } = country;

        let divCountry = document.createElement("div");
        divCountry.className = "country"

        let divBtn = document.createElement("div");

        let btnAdd = document.createElement("button");
        btnAdd.id = id;
        btnAdd.textContent = "+";
        btnAdd.className = "btn-add"
        btnAdd.onclick = () => btnEventClickAdd(id);

        divBtn.appendChild(btnAdd);

        let divFlag = document.createElement("div");

        let img = document.createElement("img");
        img.src = flag;
        img.alt = name;
        img.className = "img";

        divFlag.appendChild(img);

        let divInfo = document.createElement("div");

        let liName = document.createElement("li");
        liName.innerText = name;

        let liPopulation = document.createElement("li");
        liPopulation.innerText = formattedPopulation;

        let ul = document.createElement("ul");
        ul.appendChild(liName);
        ul.appendChild(liPopulation);

        divInfo.appendChild(ul);

        divCountry.appendChild(divBtn);
        divCountry.appendChild(divFlag);
        divCountry.appendChild(divInfo);

        countries.appendChild(divCountry);
    });

    favoritesCountriesList.forEach(country => {

        let { id, name, flag, population, formattedPopulation } = country;

        let divCountry = document.createElement("div");
        divCountry.className = "country"

        let divBtn = document.createElement("div");

        let btnAdd = document.createElement("button");
        btnAdd.id = id;
        btnAdd.textContent = "-";
        btnAdd.className = "btn-remove"
        btnAdd.onclick = () => btnEventClickRemove(id);

        divBtn.appendChild(btnAdd);

        let divFlag = document.createElement("div");

        let img = document.createElement("img");
        img.src = flag;
        img.alt = name;
        img.className = "img";

        divFlag.appendChild(img);

        let divInfo = document.createElement("div");

        let liName = document.createElement("li");
        liName.innerText = name;

        let liPopulation = document.createElement("li");
        liPopulation.innerText = formattedPopulation;

        let ul = document.createElement("ul");
        ul.appendChild(liName);
        ul.appendChild(liPopulation);

        divInfo.appendChild(ul);

        divCountry.appendChild(divBtn);
        divCountry.appendChild(divFlag);
        divCountry.appendChild(divInfo);

        favoritesCountries.appendChild(divCountry);
    });
}

function btnEventClickAdd(id) {
    let country = countriesList.find((country) => country.id === id);

    favoritesCountriesList = [...favoritesCountriesList, country];

    favoritesCountriesList.sort((a, b) => a.name.localeCompare(b.name));

    countriesList = countriesList.filter((country) => country.id !== id);

    renderCountries();
}

function btnEventClickRemove(id) {
    let country = favoritesCountriesList.find((country) => country.id === id);

    countriesList = [...countriesList, country];

    countriesList.sort((a, b) => a.name.localeCompare(b.name));

    favoritesCountriesList = favoritesCountriesList.filter((country) => country.id !== id);

    renderCountries();
}

function formatNumber(number) {
    return numberFormat.format(number);
}
