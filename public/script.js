import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjkUoOCncuyYYI2thkDkC5P9txz3Ts-rk",
  authDomain: "taskmanager-bf940.firebaseapp.com",
  projectId: "taskmanager-bf940",
  storageBucket: "taskmanager-bf940.firebasestorage.app",
  messagingSenderId: "379862027259",
  appId: "1:379862027259:web:c01cc6c037c8688244d95e",
  measurementId: "G-YY9Y70Y7YK"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const taskCollection = collection(db, "tasks");

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


onSnapshot(taskCollection, (snapshot) => {
  taskList.innerHTML = '';
  snapshot.forEach((docSnap) => {
    const task = docSnap.data();
    const li = document.createElement('li');
    li.className = task.isCompleted ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask('${docSnap.id}', ${task.isCompleted})">${task.description}</span>
      <button onclick="deleteTask('${docSnap.id}')">✖</button>
    `;
    taskList.appendChild(li);
  });
});


addTaskBtn.addEventListener('click', async () => {
  const description = taskInput.value.trim();
  if (description !== '') {
    await addDoc(taskCollection, { description, isCompleted: false });
    taskInput.value = '';
  }
});


window.toggleTask = async (id, isCompleted) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, { isCompleted: !isCompleted });
};


window.deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
};

