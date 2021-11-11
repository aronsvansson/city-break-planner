"use strict";
// ========== GLOBAL VARIABLER =========
let _categories = [];
let _data;
let _searches = [];

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
// DETAIL VIEW - FILTER - KULTUR

// FILTER - RESTAURANTS BTN
/*function restaurantOnClick() {
  let x = document.querySelector("#restaurantview");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}*/
//FILTER - ACTIVITES BTN
function filterSelection() {
  let x = document.querySelector("#restaurantview");
  let i = document.querySelector("#activitiesview");
  if (x.style.display === "none" && i.style.display === "none") {
    x.style.display = "block" && i.style.display === "none";
  } else {
    x.style.display = "none" && i.style.display === "block";
  }
}

/*
// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// DETAIL VIEW
/*function detailview(categoriesDetail) {
  let htmlTemplate = "";
  for (const category of categoriesDetail) {
    htmlTemplate += html `
    <p>${category.Name}</p>
    `;
  }
  document.querySelector("#detailView").innerHTML = htmlTemplate;
}*/

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
/*
function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);
  let results = [];
  for (const searchedData of _data) {
    let name = searchedData.name.toLowerCase();
    if (name.includes(searchValue)) {
      results.push(searchedData);
    }
  }
  appendResultSearch(results);
}
*/
/*
function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);

  let results = [];

  for (const search of _data) {
    console.log(search);
    let name = search.name.toLowerCase();
    if (name.includes(searchValue)) {
      results.push(search);
    }
  }

  appendCategories(results);
}
*/
