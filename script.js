// -----------------search-engine-logic----------------
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

// ---------------------home-page-logic---------------
var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");

        function opentab(tabname){
            for(tablink of tablinks){
                tablink.classList.remove("active-link");
            }
            for(tabcontent of tabcontents){
                tabcontent.classList.remove("active-tab");
            }
            event.currentTarget.classList.add("active-link");
            document.getElementById(tabname).classList.add("active-tab");
        }


        const scriptURL = 'https://script.google.com/macros/s/AKfycbzYfvpOtZOhUtVRGku3vdqy3x0jLXlOc9_HOxgCKGKCR-km0xhPqU-oFlSjq5od_ox2DQ/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById('msg')
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Submission received!"
            setTimeout(function(){
                msg.innerHTML = ""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })

    var sidemenu = document.getElementById("sidemenu");

        function openmenu(){
            sidemenu.style.right = "0";
        }
        function closemenu(){
            sidemenu.style.right = "-200px";
        }