"use strict";
// ========== GLOBAL VARIABLER =========
let _categories = [];
let _data;
let _searches = [];
let _liked;

const _baseUrl = "https://api.jsonbin.io/b/618120f7aa02be1d4462754e";
const _headers = {
  "X-Master-Key":
    "$2b$10$5DEHz9MIE9TIv8IqBuQRju.qGk9/Z0.CioC42q5ZBlEKw/iAcZMq.",
  "Content-Type": "application/json",
};

async function loadCategories() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, {
    headers: _headers,
  });
  const data = await response.json();
  console.log(data);
  _categories = data;
  appendCategories(_categories);
  inspirationCategories(_categories);
}
loadCategories();

function appendCategories(categories) {
  let htmlTemplate = "";
  for (const category of categories) {
    htmlTemplate += /*html*/ `
      <article>
        <h2>${category.Name}</h2>
        <p>${category.Children[0].Name}</p>
        <img src="${category.ImageUrl}">
      </article>
      `;
  }
  document.querySelector("#grid-categories").innerHTML = htmlTemplate;
}

// LANGUAGE SWAP
var selectedLanguage = document.getElementById("selected_language");
var smallLanguage = document.getElementsByClassName("small_language");

smallLanguage[0].onclick = function () {
  selectedLanguage.src = smallLanguage[0].src;
};

smallLanguage[1].onclick = function () {
  selectedLanguage.src = smallLanguage[1].src;
};

//FIND INSPIRATION SECTION
function inspirationCategories(categoriesHome) {
  let htmlTemplate = "";
  for (const category of categoriesHome) {
    htmlTemplate += /*html*/ `
    <div class="flex">
   <article class="citybox2">
     <img class="citybox2-img" src="${category.ImageUrl}">
     
    </article>
    <div class="box1txt box1txt2">
    <p>${category.Name}</p>
    </div></div>
    
    `;
  }
  document.querySelector("#homebox1").innerHTML = htmlTemplate;
}
// Fetch data.json
async function getData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data;
}

// Filtrer alle Arrays der har id: '63' og '62' - Restauranter (106)
async function restaurantDataByCategory(id) {
  const results = _data.filter((item) => item.Category.Id === id);
  console.log(results);

  restaurantOnClickFilter(results);

  restaurantFlux(results);
}

async function restaurantDataByMainCategory(id) {
  const results = _data.filter((item) => item.MainCategory.Id === id);
  console.log(results);
  return results;
}

async function init() {
  _data = await getData();
  console.log(_data);
  await restaurantDataByCategory(63);
  await restaurantDataByMainCategory(62);
}

init();

// DETAIL VIEW - FILTER - RESTAURANTS
function restaurantOnClickFilter(restaurants) {
  let htmlTemplate = "";
  for (const restaurant of restaurants) {
    htmlTemplate += /*html*/ `
    <section>
    <span class="iconify iconify7" data-icon="bytesize:heart"></span>
    <img class="filter-img" src="${getImage(restaurant)}">
    <p class="restaurantName">${restaurant.Name}</p>
    </section>
    `;
  }
  document.querySelector("#restaurantview").innerHTML = htmlTemplate;
}
// SET DEFAULT IMG
function getImage(restaurant) {
  let imageUrl = "img/Image_Coming_Soon.png";
  if (restaurant.Files.length) {
    imageUrl = restaurant.Files[0].Uri;
  }
  return imageUrl;
}
// Filtrer alle arrays der har id = 36 - aktiviteter (132)
async function aktiviteterDataByMainCategory(id) {
  const results = _data.filter((item) => item.MainCategory.Id === id);
  console.log(results);
  activitiesOnClickFilter(results);
}

async function init2() {
  _data = await getData();
  console.log(_data);
  await aktiviteterDataByMainCategory(36);
}

init2();

// DETAIL VIEW - FILTER - AKTIVITETER
function activitiesOnClickFilter(activities) {
  let htmlTemplate = "";
  for (const activity of activities) {
    htmlTemplate += /*html*/ `
    <section>
    <span class="iconify iconify7" data-icon="bytesize:heart"></span>
    <img class="filter-img" src="${getImage(activity)}">
    <p class="activityName">${activity.Name}</p>
    </section>
    `;
  }
  document.querySelector("#activitiesview").innerHTML = htmlTemplate;
}

// Filtrer alle arrays der har id = 3 - kultur (163)
async function kulturDataByMainCategory(id) {
  const results = _data.filter((item) => item.MainCategory.Id === id);
  console.log(results);
  return results;
}

async function init3() {
  _data = await getData();
  console.log(_data);
  await kulturDataByMainCategory(3);
}

init3();

// DETAIL VIEW - FILTER - RESTAURANTS BTN
function showRestaurants() {
  let restaurants = _data.filter((item) => item.Category.Id === 63);
  appendData(restaurants);
  console.log(restaurants);
}
// DETAIL VIEW - FILTER - ACTIVITES BTN
function showActivities() {
  let activities = _data.filter((item) => item.MainCategory.Id === 36);
  appendData(activities);
  console.log(activities);
}
// DETAIL VIEW - FILTER - CULTURE BTN
function showCulture() {
  let culture = _data.filter((item) => item.MainCategory.Id === 3);
  appendData(culture);
  console.log(culture);
}
function appendData(items) {
  let htmlTemplate = "";
  for (const item of items) {
    htmlTemplate += /*html*/ `
    <section>
    <span class="iconify iconify7" data-icon="bytesize:heart"></span>
    <img class="filter-img" src="${getImage(item)}">
    <p class="restaurantName">${item.Name}</p>
    </section>

    `;
  }
  document.querySelector("#restaurantview").innerHTML = htmlTemplate;
}

// DETAIL VIEW - RESTAURANT FLUX
function restaurantFlux(restaurantsFlux) {
  let htmlTemplate = "";
  for (const restaurantFlux of restaurantsFlux) {
    for (const FilesFlux of restaurantFlux.Files) {
      htmlTemplate += /*html*/ `
    <section>
    <img class="detail-img-flux" src="${FilesFlux.Uri}">
    <h3 class="restaurantNameFlux">${restaurantFlux.Name}</h3>
    </section>
    `;
    }
  }
  document.querySelector("#detailviewFlux").innerHTML = htmlTemplate;
}

//SEARCH FUNCTION
function appendResultSearch(data) {
  let htmlDrinks = "";
  for (const filteredData of data) {
    htmlTemplate += /*html*/ `
    <article class="result-section" onclick="showData('${filteredData.id}')">
      <div class="result-card">
      
        <div class="${filteredData.Children[0].Name}">
          <img src="${filteredData.ImageUrl}">
        </div>
        
      </div>
    </article>  
    `;
  }
  document.querySelector("#search-result").innerHTML = htmlDrinks;
}

//GREETING
let myDate = new Date();
let hrs = myDate.getHours();

let greet;

if (hrs < 12) greet = "God morgen";
else if (hrs >= 12 && hrs <= 17) greet = "God eftermiddag";
else if (hrs >= 17 && hrs <= 24) greet = "Good aften";

document.getElementById("greeting").innerHTML = greet + " og velkommen";
