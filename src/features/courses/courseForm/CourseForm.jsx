import React, { useState, useEffect } from "react";
import { Segment, Header, Button, Confirm } from "semantic-ui-react";

import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  listenToSelectedCourse, clearSelectedCourse } from "../courseActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { domainData } from "../../../app/api/domainOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToCourseFromFirestore,
  updateCourseInFirestore,
  addCourseToFirestore,
  cancelCourseToggle,
  deleteCourseinFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function CourseForm({ match, history, location,course }) {
  const dispatch = useDispatch();
  const [setLoadingCancel] = useState(false);
  const [ setConfirmOpen] = useState(false);
  const { selectedCourse } = useSelector((state) => state.course);

  useEffect(()=>{
    if(location.pathname !== 'createCourse') return;
    dispatch(clearSelectedCourse());
  }, [dispatch, location.pathname] )

  const { loading, error } = useSelector((state) => state.async);

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

  async function handleCancelToggle(course) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelCourseToggle(course);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: match.params.id !== selectedCourse?.id && location.pathname!=='/createCourse',
    query: () => listenToCourseFromFirestore(match.params.id),
    data: (course) => dispatch(listenToSelectedCourse(course)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading course..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
      enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedCourse
              ? await updateCourseInFirestore(values)
              : await addCourseToFirestore(values);
            setSubmitting(false);
            history.push("/courses");
          } catch (error) {
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
            {/* <Header sub color="teal" content="Course Location Details" /> */}

            {/* <MyDateInput
              autoComplete="off"
              name="date"
              placeholderText="Course date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            /> */}
            {selectedCourse && (
               <Button
               onClick={() => deleteCourseinFirestore(course.id)}
               as={Link}
               to='/courses'
               color='red'
               floated='left'
               content='Delete'
             />
            )}

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
      {/* <Confirm
        content={
          selectedCourse?.isCancelled
            ? "This will reactivate your course enrolling - are you sure?"
            : "This will cancel your course enrolling - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedCourse)}
      /> */}
    </Segment>
  );
}
