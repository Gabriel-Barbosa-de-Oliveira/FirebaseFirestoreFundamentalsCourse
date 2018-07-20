//Initialize Cloud Firestore

var db = firebase.firestore();
var employeesRef = db.collection("employess");

employeesRef.get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    console.log(`${doc.id}`);
  });
});

// employeesRef.doc("R.Dikles").set({
//   fName: "Ranice",
//   lName: "Dikles",
//   email: "rdikles@hatena.ne.jp",
//   age: 39,
//   gender: "Female",
//   yearsOfExperience: 9,
//   isFullTime: true
// });

// employeesRef.doc("Teste").set({
//     fName: "teste",
//     lName: "teste",
//     email: "teste@hatena.ne.jp",
//     age: 20,
//     gender: "Male",
//     yearsOfExperience: 9,
//     isFullTime: true
//   });
