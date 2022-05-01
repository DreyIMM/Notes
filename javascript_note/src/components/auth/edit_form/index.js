import React, { Fragment, useState, useEffect} from 'react';
import { Button, Field, Control, Input, Column, Tag, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from '../../../services/users';
import Confirmed from '../../alert';

function LoginForm() {
 
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);
  
  //metodo para lidar com o envio dos params para a API
  const HandleSubmit = async (evt) =>{
  
    evt.preventDefault();      
       
    try {

      const user = await UserService.updateUser(id,({email: email, password:passwordActual, newPassword: newPassword}))    

    } catch (error) {
      
       setError(true) 
    }             
        
  }

  const Delete = (evt) =>{
    
      evt.preventDefault();
     
    
  }

  const disableInput = () =>{

      let newPassword = document.getElementById("newPassword");

      if(!(passwordActual == "")){
  
        newPassword.removeAttribute('disabled');

      }     
  
  }

  const DateStorage = async ()=>{
    try {

      let users = JSON.parse(localStorage.getItem("user"));
      const response = await UserService.index(users._id);
      setId(users._id)
      setEmail(response.data.email)
      
    } catch (error) {
        console.log(error)
    }     
  }

  useEffect(() =>{
      DateStorage();
  }, [])

  if(redirectToRegister)
      return <Navigate to={{pathname: "/register"}}/>
  else if(redirectToNotes)
      return <Navigate to={{pathname: "/notes"}}/>
  
  return (
    <Fragment>
      <Column.Group centered>
        <form>
          <Column size={12}>
            <Field>
              <Label size="small">Email:</Label>
              <Control>
                <Input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Password :</Label>
              <Control>
                <Input
                  
                  id="password" 
                  type="password" 
                  required
                  name="passwordActual"
                  value={passwordActual}
                  onChange={e => setPasswordActual(e.target.value)}                  
                />
              </Control>
            </Field>

            <Field>
              <Label size="small">New Password :</Label>
              <Control>
                <Input
                  disabled
                  id="newPassword"
                  type="password" 
                  required
                  name="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}                  
                />
              </Control>
            </Field>
            
            <Field>
              <Control >
                <Column.Group  breakpoint="mobile">
           
                  <Column  align="right">
                    <Button onClick={Delete} color="danger" size='small'> Delete</Button>
                  </Column>
              
                </Column.Group>
              </Control>
            </Field>

            <Field>
              <Control >
                <Column.Group  breakpoint="mobile">
           
                  <Column >
                    <Button fullwidth  color="custom-purple" outlined onSubmit={HandleSubmit}>Atualizar</Button>
                    
                  </Column>

                </Column.Group>
              </Control>
            </Field>

            { error && <Help color="danger">Password incorret</Help> }
            {}
          </Column>
        </form>
      </Column.Group>
      {show && <Confirmed/>}
      {}
    </Fragment>
  )
}

export default LoginForm; 