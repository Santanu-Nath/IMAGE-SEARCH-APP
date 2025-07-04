const accesskey = 'nCoGyoOiJgK-XJmzsl6uQF6OINtRDdvJxVYC5PgRzIE';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;

//function to fetch images using unsplash api
const fetchImages = async (query,pageNo) =>{
    try {
        if(pageNo === 1){
            imagesContainer.innerHTML = '';
        }
        
        //console.log(query);
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accesskey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
    
        if(data.results.length > 0){
            data.results.forEach(photo => {
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
        
                //creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                //creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;

                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
                imagesContainer.appendChild(imageElement);
            });
        
            if(data.total_pages === pageNo){
                loadMoreBtn.style.display = "none";
            }
            else{
                loadMoreBtn.style.display = "block";
            }
        }
        else{
            imagesContainer.innerHTML = `<h2>No image found.</h2>`;
            if(loadMoreBtn.style.display === "block"){
                loadMoreBtn.style.display = "none"
            }
        }
    } 
    catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;
    }
    

}


//adding event listener to search form
searchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    //console.log(searchInput.value);
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        page = 1;
        fetchImages(inputText,page);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none"
        }
    }
});

//adding event listener to loadmore button to fetch more image
loadMoreBtn.addEventListener('click', () =>{
    fetchImages(searchInput.value.trim(), ++page);
});










