import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAweosome from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  // logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Logout Sucessfully");
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAweosome
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});

export default HeaderMenu;
