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

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState(""); // State lưu username
  const [email, setEmail] = useState(""); // State lưu email
  const [password, setPassword] = useState(""); // State lưu password

  // Hàm xử lý đăng ký
  const handleSignUp = async () => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!username || !email || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      // Tạo object chứa thông tin người dùng
      const user = {
        username,
        email,
        password,
      };

      // Lưu thông tin vào AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(user));

      // Thông báo thành công
      Alert.alert("Success", "Sign up successful! Please log in.");
      // Chuyển đến màn hình Login
      navigation.navigate("Login");
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
      <Text style={styles.title}>SIGN UP</Text>
      {/* Mô tả */}
      <Text style={styles.description}>Enter your credentials to continue</Text>
      {/* Input Username */}
      <Text style={styles.label}>USERNAME</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Afsar Hossen Shuvo"
      />
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
      {/* Điều khoản dịch vụ */}
      <Text style={styles.terms}>
        By continuing you agree to our{" "}
        <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
        <Text style={styles.termsLink}>Privacy Policy</Text>.
      </Text>
      {/* Nút Sign Up */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Chuyển đến Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Signup</Text>
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
  terms: {
    fontSize: 14, // Kích thước chữ
    color: "#666", // Màu chữ xám
    textAlign: "center", // Căn giữa chữ
    marginBottom: 20, // Khoảng cách phía dưới
  },
  termsLink: {
    color: "#28a745", // Màu xanh
    fontWeight: "bold", // Chữ đậm
  },
  signupButton: {
    backgroundColor: "#28a745", // Màu nền xanh
    paddingVertical: 15, // Khoảng cách trên/dưới
    paddingHorizontal: 40, // Khoảng cách trái/phải
    borderRadius: 25, // Bo góc
    marginTop: 20, // Khoảng cách phía trên
  },
  signupButtonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Chữ đậm
  },
  loginContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    marginTop: 20, // Khoảng cách phía trên
  },
  loginText: {
    fontSize: 14, // Kích thước chữ
    color: "#666", // Màu chữ xám
  },
  loginLink: {
    fontSize: 14, // Kích thước chữ
    color: "#28a745", // Màu xanh
    fontWeight: "bold", // Chữ đậm
  },
});
