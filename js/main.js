const makeElament = (selector, parent = document) => parent.querySelector(selector);
const createDOM = (element) => document.createElement(element);


const elForm = makeElament('.form');
const elInputSearch = makeElament('.movies_input');
const elSearchSelect = makeElament('.type_select');
const elSearchBTn = makeElament('.search-btn');
const elMoviesList = makeElament('.movies-list');
const elMoviesTemplate = makeElament('.template').content;
const elBtnBox = makeElament('.box_btn');
const elPrevBtn = makeElament('.old_page');
const elNextBtn = makeElament('.new_page');

let page = 1;
let searchQuery = 'captain';

function renderMovies(filmsArr, element){
    element.innerHTML = null;
    const fragment = document.createDocumentFragment();


    filmsArr.forEach(film => {
        
        const filmTemplate = elMoviesTemplate.cloneNode(true);
      makeElament('.heading_film', filmTemplate).textContent = film.Title;
      makeElament('.year', filmTemplate).textContent = film.Year;
      makeElament('.type', filmTemplate).textContent = film.Type;
      makeElament('.film_img', filmTemplate).setAttribute('src', film.Poster);
      makeElament('.film_img', filmTemplate).onerror = (evt)=>{
          evt.target.src = './images/frontent.png'
      };
      makeElament('.film_img', filmTemplate).setAttribute('alt', film.Title);

        fragment.appendChild(filmTemplate);
    });
    element.appendChild(fragment);
};

    async function fetchMovies(){
        
        const API_KEY = '6702ee0b';
        const respons = await fetch('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + searchQuery + '&page='+ page);
 
    const data = await respons.json();
    const filmArr = data.Search;

    if(filmArr.length){
        renderMovies(filmArr, elMoviesList);
    }

    if(page<=1){
        elPrevBtn.disabled = true;
    } else{
        elPrevBtn.disabled = false;
    }

    const lastPage = Math.ceil(data.totalResults / 10);

    if(page === lastPage){
        elNextBtn.disabled = true;
    } else{
        elNextBtn.disabled = false;
    }
    elForm.addEventListener('submit', (evt)=>{
        evt.preventDefault();

console.log(elSearchSelect.value.trim());

        if(elSearchSelect.value.trim() === 'movie'){
            const typesArr = filmArr.filter((item) => item.Type ==='movie');
            renderMovies(typesArr, elMoviesList);
        }
       else if(elSearchSelect.value.trim() === 'series'){
            const typesArr = filmArr.filter((item) => item.Type ==='series');
            renderMovies(typesArr, elMoviesList);
        }

    })
};

elBtnBox.addEventListener('click', (evt)=>{
    if(evt.target.matches('.old_page')){
        page--;
        fetchMovies();
    }
    if(evt.target.matches('.new_page')){
        page++;
        fetchMovies();
    }
});
    elInputSearch.addEventListener('change', (evt)=>{
    searchQuery = evt.target.value.trim();
    console.log(evt.target.value.trim());
    
fetchMovies();
}) ;
    fetchMovies();
    
        
 