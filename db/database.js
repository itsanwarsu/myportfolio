const moviess = [

    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.7,
        poster: "assets/poster/interstellar.jpg",
        video: "zSWdZVtXT7E",
        description:
        "Astronaut melakukan perjalanan melewati wormhole untuk mencari planet baru."
    },


    {
        id: 2,
        title: "The Batman",
        year: 2022,
        genre: "Action",
        rating: 7.8,
        poster: "assets/poster/thebatman.jpg",
        video: "mqqft2x_Aa4",
        description:
        "Batman menghadapi kriminal misterius di Gotham."
    },


    {
        id: 3,
        title: "Avatar",
        year: 2009,
        genre: "Fantasy",
        rating: 7.9,
        poster: "assets/poster/avatar.jpg",
        video: "5PSNL1qE6VY",
        description:
        "Petualangan manusia di planet Pandora."
    },


    {
        id: 4,
        title: "Twilight",
        year: 2008,
        genre: "Drama",
        rating: 8.0,
        poster: "assets/poster/twilight.jpg",
        video: "uxjNDE2fMjI",
        description:
        "Kisah vampir yang jatuh cinta pada manusia."
    },
    
     {
        id: 5,
        title: "The Dark Knight Rises",
        year: 2012,
        genre: "Action, Crime",
        rating: 8.0,
        poster: "assets/poster/TheDarkKnightRises.jpg",
        video: "GokKUqLcvD8",
        description:
        "Batman melawan musuh yang datang dari masa lalu siapakah yang akan bertahan"
    },
    
         {
        id: 6,
        title: "The Dark Knight",
        year: 2008,
        genre: "Action, Crime",
        rating: 8.0,
        poster: "assets/poster/TheDarkKnight.jpg",
        video: "EXeTwQWrcwY",
        description:
        "Batman melawan psikopat gila yang berkeliaran di gotham city"
    },
    
             {
        id: 7,
        title: "Batman Begins",
        year: 2005,
        genre: "Action, Crime",
        rating: 8.0,
        poster: "assets/poster/batmanbegins.jpg",
        video: "neY2xVmOfUM",
        description:
        "Bruce wayne meninggalkan gotham city dan mencari jati dirinya sehingga bertemu dengan organisasi league of shadow"
    },

      {
        id: 8,
        title: "Twilight New Moon",
        year: 2009,
        genre: "Drama, Crime",
        rating: 8.0,
        poster: "assets/poster/twilightnewmoon.jpg",
        video: "q58iQSHhZGg",
        description:
        "Edwad dan keluarganya menghilang dari forks meninggalkan bella "
    },
    
          {
        id: 9,
        title: "Twilight Eclipse",
        year: 2010,
        genre: "Drama, Crime",
        rating: 8.0,
        poster: "assets/poster/twilighteclipse.jpg",
        video: "kX2DKZcDM-o",
        description:
        "Edwad dan jacob bekerja sama untuk melindungi bella dan warga forks dari ancaman vampir baru "
    },
    
              {
        id: 10,
        title: "The Last Air Bender",
        year: 2010,
        genre: "Adventure, Crime",
        rating: 8.0,
        poster: "assets/poster/thelastairbender.jpg",
        video: "ezPM0_dPW7k",
        description:
        "Avatar pengendali angin terakhir yang menghilang akhirnya muncul dan mencoba mengembalikan stabilitas dunia dari invasi nagara api"
    }
];



localStorage.setItem(
    "moviess",
    JSON.stringify(moviess)
);