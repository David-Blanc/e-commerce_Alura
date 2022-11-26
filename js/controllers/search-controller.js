const searchBar = document.querySelector("[data-form-search]");

searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchWord = event.target.querySelector("input").value;


    
    console.log(searchWord);
})
