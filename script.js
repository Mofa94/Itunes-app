import ItunesSong from "./ItunesSong.js";

const tbody = document.querySelector("#tableBody");
const loader = document.querySelector("#loader");
let songArray = [];

document.querySelector("#searchBtn").addEventListener("click", fetchItunesData);

const input = document.querySelector("input");
input.addEventListener("keypress", searchTermOnEnter);

function fetchItunesData() {
    const term = document.querySelector("#searchTerm").value;
    console.log(term);

    if (!term) {
        alert("Enter search term!");
        return;
    }

    loader.classList.remove("d-none");
    loader.classList.add("d-flex");

    const fetchData = fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song`
    );

    fetchData
        .then((response) => response.json())
        .then((data) => {
            songArray = data.results.map((resultItem) => {
                return new ItunesSong(resultItem);
            });

            const tableRows = songArray.map((songItem) => {
                let tr = "<tr>";
                tr += `<td><img src = ${songItem.artworkUrl100} ></td>`;
                tr += "<td>" + songItem.artistName + "</td>";
                tr += "<td>" + songItem.collectionName + "</td>";
                tr += `<td><audio controls src=${songItem.previewURL}></audio></td>`;
                tr += "</tr>";
                return tr;
            });
            tbody.innerHTML += tableRows.join(" ");
        })
        .catch((error) => console.error(error))
        .finally(() => {
            loader.classList.add("d-none");
            loader.classList.remove("d-flex");
        });
}

function searchTermOnEnter(e) {
    if (e.key === "Enter") {
        return fetchItunesData();
    }
}
