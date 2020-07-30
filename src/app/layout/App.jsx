import React from 'react';
import CourseDashboard from '../../features/courses/courseDashboard/CourseDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CourseDetailedPage from '../../features/courses/courseDetailed/CourseDetailedPage';
import CourseForm from '../../features/courses/courseForm/CourseForm';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import {ToastContainer} from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';

export default function App() {
  const {key} = useLocation();
  const{initialized} =useSelector(state=> state.async);
  if(!initialized) return <LoadingComponent content='Loading app...'/>

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/courses' component={CourseDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/courses/:id' component={CourseDetailedPage} />
              <Route path={['/createCourse', '/manage/:id']} component={CourseForm} key={key} />
              <Route path='/account' component={AccountPage} />
              <Route path='/profile/:id' component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}
