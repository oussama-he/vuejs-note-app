function getNotes() {
    let notes = localStorage.getItem('notes')
    notes = JSON.parse(notes)
    return notes ? notes : []
}

let notes = getNotes()


function updateNotesLocalStorage(notes) {
    notes = JSON.stringify(notes)
    localStorage.setItem('notes', notes)
    localStorage.getItem('notes')
}

function addNote(note) {
    notes.unshift(note)
    updateNotesLocalStorage(notes)
}

function updateNote(note) {
    let index = notes.findIndex(element => element.timestamp == note.timestamp)

    if (index == -1) {
        notes.push(note)
    } else {
        notes[index] = note
    }
    updateNotesLocalStorage(notes)
}

function deleteNote(note) {
    notes = notes.filter(element => {return element.timestamp !== note.timestamp})
    updateNotesLocalStorage(notes)
}


export { getNotes, addNote, updateNote, deleteNote}