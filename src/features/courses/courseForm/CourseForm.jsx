import React, { useState } from "react";
import { Segment, Header, Button, Confirm } from "semantic-ui-react";

import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  listenToCourses } from "../courseActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { domainData } from "../../../app/api/domainOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToCourseFromFirestore, updateCourseInFirestore, addCourseToFirestore, cancelCourseToggle } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function CourseForm({ match, history }) {
  const dispatch = useDispatch();
  const[loadingCancel, setLoadingCancel] = useState(false);
  const[confirmOpen, setConfirmOpen] = useState(false);
  const selectedCourse = useSelector((state) =>
    state.course.courses.find((e) => e.id === match.params.id)
  );

  const {loading, error} = useSelector(state => state.async);

  const initialValues = selectedCourse ?? {
    title: "",
    domain: "",
    description: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    domain: Yup.string().required("You must provide a domain"),
    description: Yup.string().required(),
    date: Yup.string().required(),
  });

  async function handleCancelToggle(course){
    setConfirmOpen(false);
    setLoadingCancel(true);
    try{
      await cancelCourseToggle(course);
      setLoadingCancel(false);

    }catch(error){
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }


  useFirestoreDoc({
    shouldExecute: !!match.params.id, 
    query: () => listenToCourseFromFirestore(match.params.id),
    data: (course) => dispatch(listenToCourses([course])),
    deps: [match.params.id, dispatch],
  });



  if (loading )
    return <LoadingComponent content="Loading course..." />;


  if(error) return <Redirect to='/error' />

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, {setSubmitting}) => {
          try{
            selectedCourse
            ? await updateCourseInFirestore(values)
            : await addCourseToFirestore(values);
            setSubmitting(false);
          history.push("/courses");

          }catch(error){
            toast.error(error.message);
            setSubmitting(false);
          }
          
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Course Details" />
            <MyTextInput name="title" placeholder="Course title" />
            <MySelectInput
              name="domain"
              placeholder="Course domain"
              options={domainData}
            />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <Header sub color="teal" content="Course Location Details" />

            <MyDateInput
              name="date"
              placeholderText="Course date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            {selectedCourse &&
             <Button
              loading={loadingCancel}
              type='button'
              floated="left"
              color ={selectedCourse.isCancelled ? 'green': 'red'}
             
              content={selectedCourse.isCancelled ? 'Reactivate Course Enrolling' : 'Cancel Course Enrolling'}
              onClick={()=> setConfirmOpen(true)}
            />}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/courses"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm
      content={selectedCourse?.isCancelled ? 'This will reactivate your course enrolling - are you sure?' :
      'This will cancel your course enrolling - are you sure?'}
      open={confirmOpen}
      onCancel={()=> setConfirmOpen(false)}
      onConfirm ={()=> handleCancelToggle(selectedCourse)}
      />
    </Segment>
  );
}
