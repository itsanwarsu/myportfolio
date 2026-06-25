const params = new URLSearchParams(window.location.search);
let keyword = params.get("keyword") || "";

const result = document.getElementById("result");
const keywordText = document.getElementById("keywordText");

keywordText.innerText = `Keyword: "${keyword}"`;

let movies = JSON.parse(localStorage.getItem("moviess")) || [];

function highlight(text, keyword){
  if(!keyword) return text;

  return text.replace(
    new RegExp(keyword, "gi"),
    match => `<span class="badge">${match}</span>`
  );
}

let found = movies.filter(movie =>
  movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
  movie.genre.toLowerCase().includes(keyword.toLowerCase()) ||
  movie.year.toString().includes(keyword)
);

if(found.length === 0){
  result.innerHTML = `
    <p style="color:#777">Film tidak ditemukan 😔</p>
  `;
} else {
  found.forEach(movie => {
    result.innerHTML += `
      <div class="card" onclick="openMovie(${movie.id})">
        <img src="${movie.poster}">
        <h4>${highlight(movie.title, keyword)}</h4>
        <p>${movie.genre} • ${movie.year}</p>
      </div>
    `;
  });
}

function openMovie(id){
  localStorage.setItem("selectedMovie", id);
  window.location.href = "watch.html";
}