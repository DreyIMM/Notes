import React, { Fragment, useState, useEffect} from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from '../../../services/users';


function LoginForm() {
 
  
  const [email, setEmail] = useState("");
  const [hash, setHas] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const [error, setError] = useState(false);

  
  //metodo para lidar com o envio dos params para a API
  const HandleSubmit = async (evt) =>{
  
    evt.preventDefault();      
     
    

    try {
      
       

    } catch (error) {
      
    }             
        
  }

  const DateStorage = async ()=>{

    try {

      let users = JSON.parse(localStorage.getItem("user"));
      
      const response = await UserService.index(users._id);
      setEmail(response.data.email)
      setHas(response.data.password);
      
    } catch (error) {
      
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
      <Column.Group centered onSubmit={HandleSubmit}>
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
                  type="password" 
                  required
                  name="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}                  
                />
              </Control>
            </Field>
            
            <Field>
              <Control>
                <Column.Group  breakpoint="mobile">
           
                  <Column >
                    <Button  fullwidth  color="custom-purple" outlined>Atualizar</Button>
                  </Column>

                </Column.Group>
              </Control>
            </Field>
            { error && <Help color="danger">Password not iguals</Help> }
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  )
}

export default LoginForm; 