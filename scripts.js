//search related dom element
const searchBtn = document.getElementById('search-btn');
const searchBox = document.getElementById('search-box');
const searchDiv = document.getElementById('search-result-div');

//lyrics display related dom

const songName = document.getElementsByClassName('lyrics-name');
const authorName = document.getElementsByClassName('author-name');
const albumCoverImg = document.getElementsByClassName('album-cover-img');
const albumName = document.getElementsByClassName('album-name');
const songTitle = document.getElementsByClassName('song-title');

//lyrics element
const getLyricsBtn = document.getElementsByClassName('get-lyrics-btn');
const lyricsResultShow = document.getElementsByClassName('lyrics-result-show');

// hide search result div
searchDiv.style.display = 'none';

//make search button
searchBtn.addEventListener('click', fetchApi);


//fetch data from server by user search value
async function fetchApi() {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchBox.value}`); // fetch data from api
    const data = await response.json();
    if (data.error) {
        alert(`Not Found`);
    } else {
        displayResult(data);
        getLyrics(data);
    }

}


// fetch lyrics by song title and artist name
async function fetchLyrics(artist, title, index) {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`); // fetching data 
    const data = await response.json(); // convert promise to json format 
    if (data.error) {
        lyricsResultShow[index].innerHTML = `<h3 class="text-danger">No Lyrics Found</h3>`;
    } else {
        lyricsResultShow[index].innerText = data.lyrics;

    }
}


// displaying all search result
function displayResult(data) {
    searchDiv.style.display = 'block';
    for (let i = 0; i < songName.length; i++) {
        songName[i].innerText = data.data[i].title; // display lyrics name
        authorName[i].innerText = data.data[i].artist.name; // display album name
        albumCoverImg[i].src = data.data[i].album.cover; // display album cover pic
        albumName[i].innerText = data.data[i].album.title; //display song name
        songTitle[i].innerText = data.data[i].title + ' - ' + data.data[i].artist.name;
    }
}

// getlyrics btn 
function getLyrics(data) {
    for (let i = 0; i < getLyricsBtn.length; i++) {
        const lyricsBtn = getLyricsBtn[i];
        lyricsBtn.addEventListener('click', () => {
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            fetchLyrics(artist, title, i); // call fetch lyrics function with artist title and index parameter 
            // console.log(i);
        });
    }
}