const API = "https://www.world-wonders-api.org/v0/wonders" 
const cards = document.getElementById("cards")
const title = document.getElementById("title")
async function fetchWonderWorldData(){
    try{
        const response = await fetch(API);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json()

        for(let i = 0; i < data.length; i++){
            const div = document.createElement("div")
            div.classList = "card"
            div.innerHTML = 
            `
            <h1>${data[i].name}</h1>
            <a href="details.html?id=${i}" id=${i}><button>View Details</button></a>

            `
            cards.appendChild(div)
        }
    }
    catch(error){
        cards.innerHTML = error
        console.error(error);
    }
}


// Get the query string from the URL
const queryString = window.location.search;

// Create a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the 'id' parameter value
const id = urlParams.get('id');

const container = document.getElementById("container")
let category_string = ""

async function fetchOneWonder(){
    try{
        const response = await fetch(API);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json()
        title.innerText = data[id].name

        if(data[id].categories.length > 0){
            data[id].categories.forEach(category => {
                category_string = category_string + category + " "
            });
        }
        else{
            category_string = "No Categories"
        }

        const img_bg = document.getElementById("img-container")
        img_bg.innerHTML = `<img src="${data[id].links.images[0]}">`
        container.innerHTML = 
        `
        <h1>${data[id].name}</h2>
        <h2>${data[id].summary}</h2>
        <p>Location: ${data[id].location}</p>
        <p>Build Year: ${data[id].build_year}</p>
        <p>Time Period: ${data[id].time_period}</p>
        <a href="${data[id].links.wiki}" target="_blank">
            <p>Wiki</p>
        </a>
        <a href="${data[id].links.britannica}" target="_blank">
            <p>Britannica</p>
        </a>
        <a href="${data[id].links.google_maps}" target="_blank">
            <p>Google Maps</p>
        </a>
        <p>Categories: ${category_string}</p>
        `

        if(data[id].links.images.length > 0){

            const img_div = document.createElement("div");
            img_div.classList = "gallery"
            img_div.innerText = "Gallery:"
            container.appendChild(img_div)
            data[id].links.images.forEach(img => {
                const newImg = document.createElement("img");
                newImg.src = img
                newImg.classList = "picture"
                img_div.appendChild(newImg)
            });
        }
        else{
            images = "No images"
        }
    }
    catch(error){
        console.error(error);
    }
}

if (document.body.contains(cards)) {
    fetchWonderWorldData();
}
else if (document.body.contains(container)) {
    fetchOneWonder();
}