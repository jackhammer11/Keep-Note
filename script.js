const addButton = document.getElementById('add')

const updateLSData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    textareaData.forEach((note) =>{
        return notes.push(note.value);
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}


const addNewNote = (text='') =>{
    const note = document.createElement('div');
    note.classList.add('note');
    note.classList.add('yellow');

    const htmlData = `
    <div class="row">
    
    <i class="pin"></i>
    <div class="col">
    <button class="edit"><i class="fas fa-edit"></i> </button>
    
    <button class="delete"><i class="fas fa-trash-alt"></i> </button>
    </div>
    </div>
    <div class="row">

    <div class="main ${text ? "":"hidden"} yellow"></div> 
    <textarea class="${text ? "hidden":""} yellow"></textarea>
    </div>
    `;

    note.insertAdjacentHTML('afterbegin',htmlData);
    //getting ref
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');
    //deleting node


    delButton.addEventListener('click',()=>{
        note.remove();
        updateLSData();
    })
    //toggle


    textarea.value = text;
    mainDiv.innerHTML =  text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');

    });

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML =  value;


        updateLSData();
    })


    document.body.appendChild(note);
    //console.log(note);

}

//get data from local storage

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note)=>addNewNote(note));
}

addButton.addEventListener('click',()=>addNewNote());

