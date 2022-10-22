//Created By Hazzan
//dark and light mood
var icon = document.querySelector("#icon");
icon.addEventListener("click", () => {
   document.body.classList.toggle("dark-theme")
   if(document.body.classList.contains("dark-theme")){
      icon.src = "img/sun.png"
   }else{
      icon.src = "img/moon.png"
   }
});




var addbox = document.querySelector(".icon");
var popupBox = document.querySelector(".popup-box");
var closeIcon = document.querySelector(".close");

var addBtn = document.querySelector(".addBtn");
var title = document.querySelector("#title");
var textArea = document.querySelector("#textArea");
var addBox = document.querySelector(".add-box");
var popupTitle = document.querySelector(".popupTitle");

var isEdited = false, editedId;

// toggle the add note 
addbox.addEventListener("click", () => {
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    popupBox.classList.remove("show");
    title.value = "";
    textArea.value = "";
    popupTitle.innerHTML = "Add a Note"
    addBtn.textContent = "Add Note"
});

window.addEventListener("click", event => {
   if(event.target == popupBox){
      popupBox.classList.remove("show")
   }
});

//creating the note app

//changeing month from interger to string
var months = ["January", "February", "March", "April", "May",
"June", "July", "August", "September", "October", "November", "December"]

//getting the element stored in localstorage
var notes = JSON.parse(localStorage.getItem("note-list") || "[]");

//delete show function
function showNote(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
        <p>${note.title}</p>
        <span>${note.description}.</span>
        <div class="hr"></div>
        <div class="botton-content">
            <span>${note.date}</span>
            <div class="settings">
                <i class="fa fa-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick = "editNote(${index}, '${note.title}', '${note.description}')"><i class="fa fa-pencil-square-o"></i>Edit</li>
                    <li onclick = "deleteNote(${index})"><i class="fa fa-trash"></i>Delete</li>
                </ul>
            </div>
        </div>
        </li>`
        addBox.insertAdjacentHTML("afterend", liTag)
    });
}
showNote();

//edit btn function
function editNote(noteId, noteTitle, noteDescription){
    popupBox.classList.add("show");
    isEdited = true;
    editedId = noteId;
    title.value = noteTitle;
    textArea.value = noteDescription;
    popupTitle.innerHTML = "Update a Note";
    addBtn.textContent = "Update Note";
}

//delete btn function
function deleteNote(noteId){
    let confirem = confirm("Are u sure u want to delete this note?");
    if(!confirem) return; 
    notes.splice(noteId, 1);
    localStorage.setItem("note-list", JSON.stringify(notes));
    showNote();
}



//add btn function
addBtn.addEventListener("click", e => {
    e.preventDefault();
    var noteTitle = title.value,
    noteText = textArea.value;
    if(noteTitle || noteText){
        let date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteText,
           date: `${month}, ${day}, ${year}`
        }
        if(!isEdited){
            notes.push(noteInfo); //adding new note to notes
        }else{
            notes[editedId] = noteInfo;  //editing the specified note
        }
        // adding to localstorage
        localStorage.setItem("note-list", JSON.stringify(notes));
        showNote();
    }
    //remove the popup box one's the add button is clicked
    popupBox.classList.remove("show");
});


//Created By Hazzan
