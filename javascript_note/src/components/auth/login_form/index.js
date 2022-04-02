import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";
import UserService from '../../../services/users';

function LoginForm() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const [redirectToNotes, setRedirectToNotes] = useState(false);
    const [error, setError] = useState(false);
    
        //metodo para lidar com o envio dos params para a API
        const HandleSubmit = async (evt) =>{
          evt.preventDefault();
          
          try{
              const user = await UserService.login({email: email, password: password})
              setRedirectToNotes(true)
          }catch(error){
              setError(true);
          }
  
      }


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
              <Label size="small">Password:</Label>
              <Control>
                <Input 
                  type="password" 
                  required
                  name="password"
                  
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <a className="button is-white has-text-custom-purple"
                    onClick={e => setRedirectToRegister(true)}>
                        Register or
                    </a>
                  </Column>
                  <Column>
                    <Button color="custom-purple" outlined>Login</Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            { error && <Help color="danger">Email or Password invalid</Help> }
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  )
}

export default LoginForm; 