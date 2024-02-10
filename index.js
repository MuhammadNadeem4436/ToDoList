// add node 
const addButton = document.querySelector('#add');

const updateLSData = () => { 
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    textareaData.forEach( (note) => {
        return notes.push(note.value);
    });

    localStorage.setItem('notes' , JSON.stringify(notes));
};





const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="textareaOpr">
        <div class="operation"> 
            <input type="text" placeholder="Enter Title" class="input">
            <button class="edit"> <i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div><br>
        <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class="${text ? "hidden" : ""}" cols="36" rows="10"></textarea>
    </div>
    `

    note.insertAdjacentHTML('afterbegin' , htmlData);
    
    // getting the refrences

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // deleting the node 

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData().remove();
    })

    // toggle using edit button 
    textarea.value = text;
    mainDiv.innerHTML = text;


    editButton.addEventListener('click' , () =>{
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    } );

    textarea.addEventListener('change' , (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })


    document.body.appendChild(note)
}

// getting data from local Storage 

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){notes.forEach((note) => addNewNote(note))};


addButton.addEventListener('click' , () =>{
    addNewNote();
});