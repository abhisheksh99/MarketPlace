import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]); 

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = []; // Temporary array to hold categories

      querySnapshot.forEach((doc) => {
        
        categories.push({ id: doc.id, ...doc.data() }); // Collecting category data
      });

      setCategoryList(categories); // Updating state with the collected data
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div>
      <h1>Add Post Screen</h1>
      <ul>
        {categoryList.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddPostScreen;
