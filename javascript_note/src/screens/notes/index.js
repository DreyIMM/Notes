import React, { Fragment, useState} from "react";
import HeaderLogged from "../../components/header_logged";
import Notes from "../../components/notes";

const NotesScreen = () =>{  

    //criando um estado compartilhado
    //quando o método for chamado dentro de HeaderLoged será alterado o valor, e os demais componenets acionados
    const [isOpen, setIsOpen] = useState(false);
    
    return( 
    <Fragment>
        <HeaderLogged setIsOpen={setIsOpen}/>
        <Notes setIsOpen={setIsOpen} isOpen={isOpen} />
    </Fragment>
        
    
    );
}


export default NotesScreen;