import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../courseActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { domainData } from "../../../app/api/domainOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function CourseForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) =>
    state.course.courses.find((e) => e.id === match.params.id)
  );

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

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedCourse
            ? dispatch(updateCourse({ ...selectedCourse, ...values }))
            : dispatch(
                createCourse({
                  ...values,
                  id: cuid(),
                  teacher: "Bob",
                  enrolledStudents: [],
                  domainPhotoURL: "/assets/user.png",
                })
              );
          history.push("/courses");
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
    </Segment>
  );
}
