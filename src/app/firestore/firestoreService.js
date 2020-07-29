import firebase from '../config/firebase';
import cuid from 'cuid';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot){
    if(!snapshot.exists) return undefined;

    const data = snapshot.data();

    for(const prop in data){
        if (data.hasOwnProperty(prop)){
            if(data[prop] instanceof firebase.firestore.Timestamp){

                data[prop] = data[prop].toDate();
            }
        }
    }

    return{
        ...data,
        id:snapshot.id
    }
}

export function listenToCoursesFromFirestore(){
    return db.collection('courses').orderBy('date');
}

export function listenToCourseFromFirestore(courseId){
    return db.collection('courses').doc(courseId);

}

export function addCourseToFirestore(course){
    return db.collection('courses').add({
        ...course, 
        teacher: 'Daiana',
        domainPhotoURL:'https://randomuser.me/api/portraits/women/20.jpg',
        enrolledStudents: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName:'Daiana',
            photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
        })

    })
}

export function updateCourseInFirestore(course){
    return db.collection('courses').doc(course.id).update(course);
}

export function deleteCourseinFirestore(courseId){
    return db.collection('courses').doc(courseId).delete();
}

export function cancelCourseToggle(course){
    return db.collection('courses').doc(course.id).update({
        isCancelled: !course.isCancelled
    })
}

export function setUserProfileData(user){
    return db.collection('users').doc(user.uid).set({
        displayName:user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt:firebase.firestore.FieldValue.serverTimestamp()
    })
}