import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Formik } from "formik";
import * as ImagePicker from 'expo-image-picker';

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));

      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const initialValues = {
    title: "",
    description: "",
    category: "",
    address: "",
    price: "",
    image: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Add your submission logic here
  };

  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("image", result.assets[0].uri);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.description) errors.description = "Description is required";
    if (!values.category) errors.category = "Category is required";
    if (!values.price) errors.price = "Price is required";
    if (!values.image) errors.image = "Image is required";
    if (!values.address) errors.address = "Address is required";
    return errors;
  };

  return (
    <ScrollView className="flex-1 p-5">
      <View>
        <Text className="items-center text-[20px] font-bold">Add New Post</Text>
        <Text className="text-[16px] text-gray-500 mb-5">
          Create New Post and Start Selling
        </Text>

        <Formik 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
            <View className="space-y-4">
              <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
                <Image
                  source={values.image ? { uri: values.image } : require("../../assets/images/placeholder.jpeg")}
                  style={{ width: 200, height: 200, borderRadius: 15 }}
                />
              </TouchableOpacity>
              {errors.image && touched.image && <Text className="text-red-500">{errors.image}</Text>}
              
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange("title")}
              />
              {errors.title && touched.title && <Text className="text-red-500">{errors.title}</Text>}
              
              <TextInput
                className="border border-gray-300 rounded-md p-2 h-24"
                placeholder="Description"
                value={values.description}
                multiline
                numberOfLines={5}
                onChangeText={handleChange("description")}
              />
              {errors.description && touched.description && <Text className="text-red-500">{errors.description}</Text>}
              
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Price"
                value={values.price}
                onChangeText={handleChange("price")}
                keyboardType="number-pad"
              />
              {errors.price && touched.price && <Text className="text-red-500">{errors.price}</Text>}
              
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Address"
                value={values.address}
                onChangeText={handleChange("address")}
              />
              {errors.address && touched.address && <Text className="text-red-500">{errors.address}</Text>}
              
              <View className="border border-gray-300 rounded-md p-2">
                <Picker
                  selectedValue={values.category}
                  onValueChange={(itemVal) =>
                    setFieldValue("category", itemVal)
                  }
                  style={{ height: 50, width: "100%" }}
                >
                  <Picker.Item label="Select a category" value="" />
                  {categoryList.map((category) => (
                    <Picker.Item
                      key={category.id}
                      label={category.name}
                      value={category.name}
                    />
                  ))}
                </Picker>
              </View>
              {errors.category && touched.category && <Text className="text-red-500">{errors.category}</Text>}
              
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 rounded-md p-3"
              >
                <Text className="text-white text-center">Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default AddPostScreen;