import React, { Fragment, useState, useEffect} from 'react';
import { Button, Delete, Notification } from "rbx";
import { Navigate } from "react-router-dom";
import "../../styles/notification.scss";


function Notifcation(){
  
    const closeOnclick = () =>{
      let inputNotification = document.getElementsByClassName('notification is-light')[0];  
      inputNotification.setAttribute('id', 'close')
    }

    const DeleteCount = () =>{
      

    }
    


    return (
        <Fragment className="container">
          <Notification color="light" id='close'>
            <Delete onClick={closeOnclick} as="button" />
              Ao excluir seu usuário da base de dados do sistema notes, automáticamente
             <strong> todas as suas anotações irão ser excluídas imediatamente da base da dados</strong>,caso deseja realmente isso, basta confirmar
             <Button className="show" onClick={DeleteCount} color="danger" size='small'>Confirmar</Button>
          </Notification> 
        </Fragment>
      )
    }
    
export default Notifcation; 
