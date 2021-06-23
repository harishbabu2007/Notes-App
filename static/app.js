//Made by harish babu

let add_btn = document.getElementById("add-btn");

add_btn.addEventListener("click", function(e){
    let add_text = document.getElementById("add-note");
    let notes = localStorage.getItem("notes");

    if (notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    if (add_text.value!=""){
        let text_added = add_text.value.replace("\n", "<br>")
        notesObj.push(text_added)

        localStorage.setItem("notes", JSON.stringify(notesObj));
        add_text.value = "";
        showNotes();
        window.location.href = `/#yournotes`
    }
})

function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let html = "";

    let html_nothing = `
        <h3>Nothing Here!</h3>
    `

    notesObj.forEach(function(e,i){
        html += `
        <div class="card note-cards my-2 mx-2">
            <div class="card-body">
            <h5 id="${notesObj.length+2} class="card-title">Note ${i + 1}</h5>
            <p class="card-text">${e}</p>
            <button id="${i}" onclick="DeleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `
    });

    let notesElm = document.getElementById("note-cards");
    if (notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = html_nothing;
    }
}

function DeleteNote(index){
    let notes = localStorage.getItem("notes")

    if (notes == null){
        notesObj = []
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search_text = document.getElementById("search-text")

search_text.addEventListener("input", function(e){
    let unwanted_text = document.getElementById("add");
    unwanted_text.innerHTML = "";

    let message = document.getElementById("message");
    message.innerText = "Click anywhere to start adding notes"

    let query = search_text.value.toLowerCase();

    let noteCards = document.getElementsByClassName("note-cards");

    Array.from(noteCards).forEach(function(element){
        let card_txt = element.getElementsByTagName("p")[0].innerText;

        if (card_txt.includes(query)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

let clickget = document.getElementById("clickget")

clickget.addEventListener("click", function(e){
    let add_div = document.getElementById("add");
    let message = document.getElementById("message");

    if (add_div.innerHTML == ""){
        add_div.innerHTML = `
        <h1>Welcome to Notes App</h1>
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">Add a Note</h5>
            <textarea class="form-control" id="add-note" rows="6"></textarea><br>
            <button id="add-btn" class="btn btn-primary">Add Note</button>
            </div>
        </div>
        <br>
        <hr>
        `
        message.innerText = ""
    }
})

showNotes();
