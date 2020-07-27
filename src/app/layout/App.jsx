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

export default function App() {
  const {key} = useLocation();

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
            </Container>
          </>
        )}
      />
    </>
  );
}
