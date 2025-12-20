import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "todos";

const formatTodo = (docSnapshot) => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    ...data,
    deadline: data.deadline ? data.deadline.toDate() : null,
  };
};

export const todoApi = {
  fetchAll: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("deadline", "asc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(formatTodo);
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  add: async (task, deadline) => {
    try {
      const newTodo = {
        task,
        completed: false,
        deadline: deadline || null,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newTodo);
      return { id: docRef.id, ...newTodo };
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const todoRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(todoRef, data);
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const todoRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(todoRef);
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },
};
