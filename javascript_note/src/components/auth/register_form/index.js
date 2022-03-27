import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate } from "react-router-dom";


function RegisterForm() {
     
    //controlando state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //situação quando acontece um redirect (e vai direto para o login) que é niciado como false
    //Caso de acontecer algum erro
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    //realizando o redirect
    if(redirectToLogin){
        return <Navigate to={"/login"} />
    }

    return (
        <Fragment>
        <Column.Group centered>
            <form>
            <Column size={12}>
                <Field>
                <Label size="small">Name:</Label>
                <Control>
                    <Input type="name" required name="name" valeu={name} onChange={e =>setName(e.target.value)}/>
                </Control>
                </Field>
                <Field>
                <Label size="small">Email:</Label>
                <Control>
                    <Input type="email" required name="email" valeu={email} onChange={e =>setEmail(e.target.value)} />
                </Control>
                </Field>
                <Field>
                <Label size="small">Password:</Label>
                <Control>
                    <Input type="password" required name="password" valeu={password} onChange={e =>setPassword(e.target.value)} />
                </Control>
                </Field>
                <Field>
                <Control>
                    <Column.Group breakpoint="mobile">
                    <Column>
                        <a className="button is-white has-text-custom-purple"  onClick={e => setRedirectToLogin(true)} >
                        Login or
                        </a>
                    </Column>
                    <Column>
                        <Button color="custom-purple" outlined>
                        Register
                        </Button>
                    </Column>
                    </Column.Group>
                </Control>
                </Field>
                {error && <Help color="danger">Email ou senha invalidos</Help>}
            </Column>
            </form>
        </Column.Group>
        </Fragment>
    );
}

export default RegisterForm;