import firebase from "../config/firebase";
import cuid from "cuid";

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

export function listenToCoursesFromFirestore() {
  return db.collection("courses").orderBy("date");
}

export function listenToCourseFromFirestore(courseId) {
  return db.collection("courses").doc(courseId);
}

export function addCourseToFirestore(course) {
  return db.collection("courses").add({
    ...course,
    teacher: "Daiana",
    domainPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    enrolledStudents: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Daiana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
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
  const userDocRef = db.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid){
  return db.collection('users').doc(userUid).collection('photos');
}

export async function setMainPhoto(photo){
      const user = firebase.auth().currentUser;
      try{
          await db.collection('users').doc(user.uid).update({
            photoURL: photo.url
          })
          return await user.updateProfile({
            photoURL: photo.url
          })
      }catch(error){
        throw error;
      }
}

export function deletePhotoFromCollection(photoId){
  const userUid= firebase.auth().currentUser.uid;
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete();
}