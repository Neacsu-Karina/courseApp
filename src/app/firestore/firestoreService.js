import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function listenToCoursesFromFirestore(predicate) {
  const user = firebase.auth().currentUser;

  let coursesRef = db.collection("courses").orderBy("date");
  switch (predicate.get("filter")) {
    case "isGoing":
      return coursesRef
        .where("enrolledStudentIds", "array-contains", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    case "isTeacher":
      return coursesRef
        .where("teacherUid", "==", user.uid)
        .where("date", ">=", predicate.get("startDate"));
    default:
      return coursesRef.where("date", ">=", predicate.get("startDate"));
  }
}

export function listenToCourseFromFirestore(courseId) {
  return db.collection("courses").doc(courseId);
}

export function addCourseToFirestore(course) {
  const user = firebase.auth().currentUser;
  return db.collection("courses").add({
    ...course,
    teacherUid: user.uid,
    teacher: user.displayName,
    teacherPhotoURL: user.photoURL || null,
    enrolledStudents: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    enrolledStudentIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

export function updateCourseInFirestore(course) {
  return db.collection("courses").doc(course.id).update(course);
}

export function deleteCourseinFirestore(courseId) {
  return db.collection("courses").doc(courseId).delete();
}

export function cancelCourseToggle(course) {
  return db.collection("courses").doc(course.id).update({
    isCancelled: !course.isCancelled,
  });
}

export function setUserProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }

    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhotos(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

export function addUserEnrollment(course) {
  const user = firebase.auth().currentUser;
  return db
    .collection("courses")
    .doc(course.id)
    .update({
      enrolledStudents: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      enrolledStudentIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

export async function cancelUserEnrollment(course) {
  const user = firebase.auth().currentUser;
  try {
    const courseDoc = await db.collection("courses").doc(course.id).get();
    return db
      .collection("courses")
      .doc(course.id)
      .update({
        enrolledStudentIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        enrolledStudents: courseDoc
          .data()
          .enrolledStudents.filter(
            (enrolledStudent) => enrolledStudent.id !== user.uid
          ),
      });
  } catch (error) {
    throw error;
  }
}

export function getUserCoursesQuery(activeTab, userUid) {
  let eventsRef = db.collection("courses");
  // const today = new Date();
  // switch (activeTab) {
  //   case 1: //past events
  //     return eventsRef
  //       .where("enrolledStudentIds", "array-contains", userUid)
  //       .where("date", "<=", today)
  //       .orderBy("date", "desc");

  //   case 2: //hosting
  //     return eventsRef.where("teacherUid", "==", userUid).orderBy("date");
  //   default:
  //     //future
      return eventsRef
        .where("enrolledStudentIds", "array-contains", userUid)
        // .where("date", ">=", today)
        .orderBy("date");
  //}
}