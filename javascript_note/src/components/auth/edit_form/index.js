import React, { Fragment, useState, useEffect} from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from '../../../services/users';

function LoginForm() {
 
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const [error, setError] = useState(false);
  
  //metodo para lidar com o envio dos params para a API
  const HandleSubmit = async (evt) =>{
  
    evt.preventDefault();      
    
    try
    {
      const user = await UserService.updateUser(id,{email: email, password: passwordActual})
     
    }catch(error)
    {
      setError(true);
    }          
        
  }

  const DateStorage = ()=>{
      let users = JSON.parse(localStorage.getItem("user"));
      setEmail(users.email)
      setId(users._id);
      
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