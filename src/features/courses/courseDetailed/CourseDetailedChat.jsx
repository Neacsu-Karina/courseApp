import React, { useEffect } from 'react';
import { Segment, Comment, Header } from 'semantic-ui-react';
import CourseDetailedChatForm from './CourseDetailedChatForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourseChatRef,
  firebaseObjectToArray,
} from '../../../app/firestore/firebaseService';
import { listenToCourseChat } from '../courseActions';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { CLEAR_COMMENTS } from '../courseConstants';
import { useState } from 'react';
import { createDataTree } from '../../../app/common/util/util';

export default function CourseDetailedChat({ courseId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.course);
  const { authenticated } = useSelector((state) => state.auth);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getCourseChatRef(courseId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToCourseChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    return () => {
      dispatch({ type: CLEAR_COMMENTS });
      getCourseChatRef().off();
    };
  }, [courseId, dispatch]);

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>{authenticated ? 'Chat about this course' : 'Sign in to view and comment'}</Header>
      </Segment>

      {authenticated &&
      <Segment attached>
        <CourseDetailedChatForm
          courseId={courseId}
          parentId={0}
          closeForm={setShowReplyForm}
        />
        <Comment.Group>
          {createDataTree(comments).map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split('\n').map((text, i) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <CourseDetailedChatForm
                        courseId={courseId}
                        parentId={comment.id}
                        closeForm={handleCloseReplyForm}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>
              {comment.childNodes.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map((child) => (
                    <Comment key={child.id}>
                      <Comment.Avatar
                        src={child.photoURL || '/assets/user.png'}
                      />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                          {child.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(child.date, new Date())}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {child.text.split('\n').map((text, i) => (
                            <span key={i}>
                              {text}
                              <br />
                            </span>
                          ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setShowReplyForm({
                                open: true,
                                commentId: child.id,
                              })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm.open &&
                            showReplyForm.commentId === child.id && (
                              <CourseDetailedChatForm
                                courseId={courseId}
                                parentId={child.parentId}
                                closeForm={handleCloseReplyForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>}
    </>
  );
}