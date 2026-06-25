// navbar
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const searchBtn = document.getElementById("searchBtn");

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
})

const input =
document.getElementById("searchInput");

const result =
document.getElementById("searchResult");

let movies =
JSON.parse(
localStorage.getItem("moviess")
) || [];

function highlight(text, keyword){
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(
    new RegExp(escaped, "gi"),
    match => `<b>${match}</b>`
  );
}

function searchMovie(keyword){
keyword = keyword.toLowerCase();
return movies.filter(movie=>{
return (
movie.title.toLowerCase().includes(keyword) || movie.genre.toLowerCase().includes(keyword) || movie.year.toString().includes(keyword)
);
});
}

let timer;
input.addEventListener("input",()=>{
clearTimeout(timer);
timer=setTimeout(()=>{
let keyword = input.value.trim();
if(keyword===""){result.innerHTML="";
return;
}

let found = searchMovie(keyword);
result.innerHTML="";
if(found.length===0){
result.innerHTML=
`
<div class="movie-result">
Film tidak ditemukan
</div>
`;
return;
}
found.slice(0,5).forEach(movie=>{
result.innerHTML +=
`
<div 
class="movie-result"
onclick="openMovie(${movie.id})">
<img src="${movie.poster}">
<div>
<h4>${highlight(movie.title,keyword)}
</h4>
<p>${movie.genre}
 •${movie.year}
</p>
⭐ ${movie.rating}
</div>
</div>`;
});
},300);
});

searchBtn.addEventListener("click",searchmovies);
input.addEventListener("keydown",function(e) {
  if(e.key === "Enter"){searchmovies();
  }
});

function searchmovies() {
    let keyword =
    input.value.trim();


    if(keyword !== ""){

        window.location.href =
        "search.html?keyword=" + keyword;

    }

};

const params =
new URLSearchParams(
window.location.search
);


let keyword =
params.get("keyword") || "";


keyword =
keyword.toLowerCase();



function openMovie(id){
localStorage.setItem(
"selectedMovie",id
);
window.location.href="watch.html";
}

function watchMovie(id){

    localStorage.setItem(
        "selectedMovie",
        id
    );


    window.location.href =
    "watch.html";

}