"use strict";
// ========== GLOBAL VARIABLER =========
let _categories = [];
let _data = [];

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
//FIND INSPIRATION SECTION

//FETCH DATA LOCAL
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => console.log(data));

//SEARCH FUNCTION
function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  let results = [];
  for (const searchedData of _data) {
    let name = searchedData.name.toLowerCase();
    if (name.includes(searchValue)) {
      results.push(searchedData);
    }
  }
  console.log(results);
}
