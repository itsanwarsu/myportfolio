// ===============================
// AMBIL FILM YANG DIPILIH
// ===============================

const movieId = localStorage.getItem("selectedMovie");


if (!movieId) {

    alert("Belum memilih film");

    window.location.href = "index.html";

    throw new Error("Movie ID tidak ditemukan");

}


// ===============================
// AMBIL DATA FILM
// ===============================


let moviess =
JSON.parse(
    localStorage.getItem("moviess")
) || [];



let movie =
moviess.find(
    m => m.id == movieId
);



if (!movie) {

    alert("Film tidak ditemukan");

      throw new Error("Film tidak ditemukan");
   

}



// ===============================
// TAMPILKAN DATA FILM
// ===============================


const title =
document.getElementById("title");


const genre =
document.getElementById("genre");


const year =
document.getElementById("year");


const rating =
document.getElementById("rating");


const description =
document.getElementById("description");


const poster =
document.getElementById("poster");


const video =
document.getElementById("videoPlayer");



if(title)
title.innerHTML = movie.title;


if(genre)
genre.innerHTML = movie.genre;


if(year)
year.innerHTML = movie.year;


if(rating)
rating.innerHTML = movie.rating;


if(description)
description.innerHTML = movie.description;


if(poster)
poster.src = movie.poster;



if(video && movie.video){

    let youtubeId = movie.video;

    video.innerHTML = `

<iframe
src="https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1"
width="100%"
height="100%"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
allowfullscreen>
</iframe>

`;

}else{

    video.innerHTML = "Video tidak tersedia";

}



// ===============================
// SIMPAN PROGRESS VIDEO
// ===============================


let lastSave = 0;


if(video){



}



// ===============================
// LANJUTKAN TONTONAN
// ===============================


let savedProgress =
localStorage.getItem(
    "progress_" + movie.id
);



if(
    savedProgress &&
    video
){

    video.currentTime =
    Number(savedProgress);

}



// ===============================
// WATCHLIST
// ===============================


const favBtn =
document.getElementById(
    "favoriteBtn"
);



let watchlist =
JSON.parse(
    localStorage.getItem("watchlist")
) || [];




function updateButton(){


    if(!favBtn)
    return;



    if(
        watchlist.includes(movie.id)
    ){

        favBtn.innerHTML =
        "✓ In Watchlist";


    }else{


        favBtn.innerHTML =
        "+ Watchlist";


    }


}





if(favBtn){



favBtn.onclick = ()=>{


    if(
        watchlist.includes(movie.id)
    ){


        watchlist =
        watchlist.filter(
            id => id !== movie.id
        );


    }else{


        watchlist.push(movie.id);


    }



    localStorage.setItem(

        "watchlist",

        JSON.stringify(watchlist)

    );



    updateButton();


};



}



updateButton();



// ===============================
// REKOMENDASI FILM
// ===============================


const container =
document.getElementById(
    "recommendation"
);



if(container){



let recommend =
moviess.filter(

    m => m.id != movie.id

);



recommend
.slice(0,6)
.forEach(m=>{



container.innerHTML +=


`

<div 
class="card"
onclick="openMovie(${m.id})">
<img src="${m.poster}">
<p>
 ${m.genre}
</p>
<h2>
${m.title}
</h2>

</div>


`;



});



}




// ===============================
// PINDAH FILM
// ===============================


function openMovie(id){


localStorage.setItem(

    "selectedMovie",

    id

);



window.location.reload();


}



// ===============================
// KEMBALI
// ===============================


function goBack(){


history.back();


}



// Debug
console.log(
"Movie loaded:",
movie.title
);