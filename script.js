const apikey = '79ad6138e9e64f60b4ad4f94a02a966f'

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];
    }
}

searchButton.addEventListener('click', async () => {
    const query = searchField.value.trim()
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("No search input found", error)
        }
    }
});

searchField.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter'){
        e.preventDefault();
        const query = searchField.value.trim();
        if (query !== ""){
            try {
                const articles = await fetchNewsQuery(query);
                displayBlogs(articles);
            } catch (error){
                console.log("No search input found", error);
            }
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        //For condensed elements (i.e titles)
        // const trunkTitle = article.title.length > 30? article.title.slice(0,30) + 
        // "...": article.title;
        // title.textContent = trunkTitle;
        const desciption = document.createElement("p");
        desciption.textContent = article.desciption;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desciption);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error Fetching random news", error);
    }
})();