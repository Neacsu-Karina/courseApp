import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  addUserEnrollment,
  cancelUserEnrollment,
} from "../../../app/firestore/firestoreService";
import { useSelector } from "react-redux";
import UnauthModal from "../../auth/UnauthModal";

const courseImageStyle = {
  filter: "brightness(30%)",
};

const courseImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

export default function CourseDetailedHeader({
  course,
  isTeacher,
  isEnrolled,
}) {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  async function handleUserEnrollingCourse() {
    setLoading(true);
    try {
      await addUserEnrollment(course);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveCourse() {
    setLoading(true);
    try {
      await cancelUserEnrollment(course);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={`/assets/domainImages/${course.domain}.jpg`}
            fluid
            style={courseImageStyle}
          />

          <Segment basic style={courseImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={course.title}
                    style={{ color: "white" }}
                  />
                  {/* <p>{format(course.date, "MMMM d, yyyy h:mm a")}</p> */}
                  <p>
                    Teached by{" "}
                    <strong>
                      <Link to={`/profile/${course.teacherUid}`}>
                        {course.teacher}
                      </Link>{" "}
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
          {!isTeacher && (
            <>
              {isEnrolled ? (
                <Button onClick={handleUserLeaveCourse} loading={loading}>
                  Cancel My Enrollment
                </Button>
              ) : (
                <Button
                  onClick={authenticated ? handleUserEnrollingCourse : ()=> setModalOpen(true)}
                  loading={loading}
                  color="teal"
                >
                  JOIN THIS COURSE
                </Button>
              )}
            </>
          )}

          {isTeacher && (
            <Button
              as={Link}
              to={`/manage/${course.id}`}
              color="orange"
              floated="right"
            >
              Manage Course
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
