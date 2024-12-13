let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


const displaySpinner = (isVisible) => {
  if(isVisible){
    spinnerEl.classList.remove('d-none')
  }else{
    spinnerEl.classList.add('d-none')
  }
}

const iconElement = (iconTextSm, iconTextLg, paraText, alertBg) => {
  let divEl = document.createElement("div");
  divEl.classList.add("alert", alertBg, "ml-2", "mr-2");

  let iconEl = document.createElement("i");
  iconEl.classList.add(iconTextSm, iconTextLg);
  iconEl.style.marginRight = "10px";

  let p = document.createElement("p");
  p.classList.add("alert");
  p.textContent = paraText;

  divEl.appendChild(p);

  p.prepend(iconEl);

  return divEl;
};

function createAndAppendResults(searchData) {
  let { title, link, description } = searchData;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item", "shadow-sm", "card");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title || "No title available";
  titleEl.classList.add("result-title");

  let urlEl = document.createElement("a");
  urlEl.textContent = link;
  urlEl.href = link || "No link available";
  urlEl.classList.add("result-url");
  urlEl.target = "_blank";

  let descriptionEl = document.createElement("p");
  descriptionEl.textContent = description || "No description available";
  descriptionEl.classList.add("link-description");

  let brEl = document.createElement("br");

  resultItemEl.append(titleEl, brEl, urlEl, brEl, descriptionEl);
  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(results) {
  if (results.length === 0) {
    const element = iconElement(
      "fa-solid",
      "fa-face-smile",
      "No results found! :)",
      "alert-warning"
    );

    searchResultsEl.appendChild(element);
  } else {
    results.forEach((items) => createAndAppendResults(items));
  }
  displaySpinner(false)
}

async function wikipediaSearch(event) {
  if (event.key === "Enter") {
    displaySpinner(true)
    searchResultsEl.textContent = "";
    let searchInputElValue = searchInputEl.value.trim();

    if (searchInputElValue === "") {
      displaySpinner(false)
      return;
    }

    const url = "https://apis.ccbp.in/wiki-search?search=" + searchInputElValue;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      const { search_results } = data;

      if (search_results.length !== 0) {
        displayResults(search_results);
      }else{
        const element = iconElement(
          "fa-solid",
          "fa-face-smile",
          "No results found! :)",
          "alert-warning"
        );
    
        searchResultsEl.appendChild(element);
        displaySpinner(false)
      }
    } catch (err) {
      console.log(err.message);
      displaySpinner(false)

      const element = iconElement(
        "fa-solid",
        "fa-circle-exclamation",
        err.message,
        "alert-danger"
      );

      searchResultsEl.appendChild(element);
    }
  }
}

searchInputEl.addEventListener("keydown", wikipediaSearch);
