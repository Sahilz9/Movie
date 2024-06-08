let movieContainer = document.querySelector("#movieContainer");
let searchInput = document.querySelector("#searchInput");
let popup = document.querySelector("#popup");

let timeOut;

let getMovieData = async (search) => {
  let response = await fetch(
    `https://www.omdbapi.com/?apikey=1e16119&s=${search}`
  );
  let data = await response.json();

  if (data.Response == "True") {
    return data;
  } else {
    movieContainer.innerHTML = "No movie found";
  }
};

let showData = (data) => {
  movieContainer.innerHTML = "";
  data.forEach((ele) => {
    let cards = document.createElement("div");

    cards.addEventListener("click", () => {
      displayCards(ele.Poster, ele.Title, ele.Year, ele.imdbID);
      toggle();
    });

    let title = document.createElement("p");
    title.innerHTML = ele.Title;

    let image = document.createElement("img");
    image.src = ele.Poster;

    cards.append(image, title);
    movieContainer.append(cards);
  });
};

let validation = async () => {
  let value = searchInput.value;

  let mainData = await getMovieData(value);

  showData(mainData.Search);
};

let debounce = (operation, delay) => {
  let value = searchInput.value;

  if (value.length < 3) {
    return false;
  }

  if (timeOut) {
    clearTimeout(timeOut);
  }

  timeOut = setTimeout(() => {
    operation();
  }, delay);
};

let displayCards = (image, title, year, imdbId) => {
  popup.innerHTML = "";

  let movieTitle = document.createElement("p");
  movieTitle.innerHTML = title;

  let movieYear = document.createElement("p");
  movieYear.innerHTML = year;
  let movieImdb = document.createElement("p");
  movieImdb.innerHTML = `Imdb Id: ${imdbId}`;

  let movieImage = document.createElement("img");
  movieImage.src = image;

  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "X";

  closeBtn.addEventListener("click", () => {
    popup.innerHTML = "";
    toggle();
  });
  popup.append(movieImage, closeBtn, movieTitle, movieYear, movieImdb);
};

function toggle() {
  movieContainer.classList.toggle("active");
  popup.classList.toggle("active");
}

searchInput.addEventListener("input", () => {
  debounce(validation, 2000);
});
