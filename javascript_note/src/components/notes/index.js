import React, {useState, Fragment, useEffect} from "react";
import "../../styles/notes.scss";
import {push as Menu} from 'react-burger-menu'
import { Column, Button} from 'rbx';
import NotesService from '../../services/notes'
import Editor from './editor';
import List from '../notes/list';
import Search from '../notes/search';

function Notes(props) {
    
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: ""}); 

    //Metodo de listagem de nota
      async function fetchNotes(){
        const response = await NotesService.index();
        if(response.data.length >=1){
            setNotes(response.data.reverse());
            setCurrentNote(response.data[0]);
          
        }else{
          setNotes([]);
        }
      }

    //Metodo para criar uma nova nota e lista
    const createNote = async () =>{
        await NotesService.create()
        fetchNotes();
    }
    
    //Metodo para deletar nova nota
    const deleteNote = async (note) =>{
      await NotesService.delete(note._id);
      fetchNotes()
    }

    //Metodo para atualizar nota
    const updateNote = async (oldNote, params) => {
        const updatedNote = await NotesService.update(oldNote._id, params);
        const index = notes.indexOf(oldNote);
        const newNotes = notes;
        newNotes[index] = updatedNote.data;
        setNotes(newNotes);
        setCurrentNote(updatedNote.data);
    }

    //metodod de busca
    const searchNote = async (query) =>{
      const response = await NotesService.search(query);
      setNotes(response.data);
    }


    const selectNote = (id) => {
      const note =  notes.find((note) => {
        return note._id == id;
      })
      setCurrentNote(note);
    }

    useEffect(() =>{
      fetchNotes();
    }, [])


    return (
        <Fragment>
           <Column.Group className="notes" id="notes">
                <Menu
                pageWrapId={"notes-editor"}
                isOpen={props.isOpen}
                onStateChange={(state) => props.setIsOpen(state.isOpen)}
                disableAutoFocus
                outerContainerId={"notes"}
                customBurgerIcon={false}
                customCrossIcon={false}
                >
            <Column.Group>
                <Column size={10} offset={1}>
                 <Search searchNotes={searchNote} fetchNotes={fetchNotes}/>
                </Column>
            </Column.Group>
               <List
                notes={notes}
                selectNote={selectNote}
                current_note={current_note} 
                createNote={createNote}
                deleteNote={deleteNote}
              />
        </Menu>

        <Column size={12} className="notes-editor" id="notes-editor">
            <Editor 
              note={current_note} 
              updateNote={updateNote}
            />
        </Column>

      </Column.Group>
        </Fragment>
    )
}


export default Notes;