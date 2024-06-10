import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import FontAweosome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  // handle delete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          handleDeletePost(id);
        },
      },
    ]);
  };

  // delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("MyPosts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAweosome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {setPost(post), setModalVisible(true)}}
                />
              </Text>
              <Text>
                <FontAweosome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />
              </Text>
            </View>
          )}
          <Text style={styles.title}>Title: {post?.title}</Text>
          <Text style={styles.desc}>{post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                {" "}
                <FontAweosome5 name="user" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              <FontAweosome5 name="clock" color={"orange"} />
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
