import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';
import firebase from "../../app/config/firebase";


export default function NavBar({ setFormOpen }) {
  const db = firebase.firestore();

  //let teacherCollection= db.collection('teachers').doc('lImXSUZ7LxDM4OyOhD36');
  let teacher = db.collection('teachers').doc('123.uid');
  const user=firebase.auth().currentUser;
  //const { currentUser } = useSelector((state) => state.auth);
  const {authenticated} = useSelector(state => state.auth);
  //const teachers = useSelector((state) => state.course.selectedCourse);
  const isTeacher = user?.uid === teacher;
 
  return (
    <Menu  inverted  fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/courses' name='Courses' />
        <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
        {isTeacher &&  (
          <Menu.Item as={NavLink} to='/createCourse'>
            <Button positive inverted content='Create Course' />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
  );
}
