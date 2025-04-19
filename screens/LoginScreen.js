import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(""); // State lưu email
  const [password, setPassword] = useState(""); // State lưu password

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      // Lấy thông tin đã lưu từ AsyncStorage
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Kiểm tra email và password
        if (user.email === email && user.password === password) {
          Alert.alert("Success", "Login successful!");
          // Chuyển hướng sau khi đăng nhập thành công (có thể đến màn hình chính)
        } else {
          Alert.alert("Error", "Invalid email or password.");
        }
      } else {
        Alert.alert("Error", "No user found. Please sign up.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Biểu tượng cà rốt */}
      <Image
        source={require("../assets/carrot.jpg")} // Thay bằng ảnh cà rốt của bạn
        style={styles.logo}
      />
      {/* Tiêu đề */}
      <Text style={styles.title}>LOGIN</Text>
      {/* Mô tả */}
      <Text style={styles.description}>Enter your emails and password</Text>
      {/* Input Email */}
      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="imshuvo97@gmail.com"
      />
      {/* Input Password */}
      <Text style={styles.label}>PASSWORD</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Ẩn mật khẩu
        placeholder="••••••••"
      />
      {/* Quên mật khẩu */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* Nút Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      {/* Chuyển đến Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupLink}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ màn hình
    backgroundColor: "#fff", // Màu nền trắng
    alignItems: "center", // Căn giữa theo chiều ngang
    padding: 20, // Khoảng cách bên trong
  },
  logo: {
    width: 50, // Chiều rộng ảnh
    height: 50, // Chiều cao ảnh
    marginTop: 50, // Khoảng cách phía trên
  },
  title: {
    fontSize: 24, // Kích thước chữ
    fontWeight: "bold", // Chữ đậm
    marginTop: 20, // Khoảng cách phía trên
    marginBottom: 10, // Khoảng cách phía dưới
  },
  description: {
    fontSize: 16, // Kích thước chữ
    color: "#666", // Màu chữ xám
    marginBottom: 30, // Khoảng cách phía dưới
  },
  label: {
    alignSelf: "flex-start", // Căn trái
    fontSize: 14, // Kích thước chữ
    color: "#666", // Màu chữ xám
    marginBottom: 5, // Khoảng cách phía dưới
  },
  input: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    borderWidth: 1, // Viền
    borderColor: "#ccc", // Màu viền xám
    borderRadius: 5, // Bo góc
    padding: 10, // Khoảng cách bên trong
    marginBottom: 20, // Khoảng cách phía dưới
  },
  forgotPassword: {
    alignSelf: "flex-end", // Căn phải
    color: "#28a745", // Màu xanh
    fontSize: 14, // Kích thước chữ
    marginBottom: 20, // Khoảng cách phía dưới
  },
  loginButton: {
    backgroundColor: "#28a745", // Màu nền xanh
    paddingVertical: 15, // Khoảng cách trên/dưới
    paddingHorizontal: 40, // Khoảng cách trái/phải
    borderRadius: 25, // Bo góc
    marginTop: 20, // Khoảng cách phía trên
  },
  loginButtonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Chữ đậm
  },
  signupContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    marginTop: 20, // Khoảng cách phía trên
  },
  signupText: {
    fontSize: 14, // Kích thước chữ
    color: "#666", // Màu chữ xám
  },
  signupLink: {
    fontSize: 14, // Kích thước chữ
    color: "#28a745", // Màu xanh
    fontWeight: "bold", // Chữ đậm
  },
});
