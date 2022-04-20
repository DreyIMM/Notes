import React, { Fragment } from "react";
import HeaderLoged from '../../../components/header_logged';
import { Column,Section, Title, Container, Card } from "rbx";
import logoImage from '../../../assets/images/logo.png';
import '../../../styles/auth.scss';
import EditForm from "../../../components/auth/edit_form";

const UserEditcreen = () =>( 
    <Fragment>
        <HeaderLoged />
        <Section size="medium" className="edit">
        <Container>
          <Column.Group centered>
            <Column size={6}>
              <Card>
                <Card.Content>
                  <Section>
                    <Column.Group centered>
                      <Column size={6}>
                        <img src={logoImage} />
                      </Column>
                    </Column.Group>
                    <Column.Group>
                      <Column size={12}>
                        <Title size={6} className="has-text-grey has-text-centered">
                          Your notes on the cloud
                        </Title>
                      </Column>
                    </Column.Group>
                      <EditForm />
                  </Section>
                </Card.Content>
              </Card>
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Fragment>
) 


export default UserEditcreen;