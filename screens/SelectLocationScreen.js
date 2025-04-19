import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import thư viện picker
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Danh sách châu lục
const continents = [
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "Africa", value: "Africa" },
  { label: "North America", value: "NorthAmerica" },
  { label: "South America", value: "SouthAmerica" },
  { label: "Australia", value: "Australia" },
];

// Danh sách quốc gia theo châu lục
const countries = {
  Asia: [
    { label: "Vietnam", value: "Vietnam" },
    { label: "China", value: "China" },
    { label: "Japan", value: "Japan" },
  ],
  Europe: [
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
    { label: "Italy", value: "Italy" },
  ],
  Africa: [
    { label: "Nigeria", value: "Nigeria" },
    { label: "Kenya", value: "Kenya" },
  ],
  NorthAmerica: [
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
  ],
  SouthAmerica: [
    { label: "Brazil", value: "Brazil" },
    { label: "Argentina", value: "Argentina" },
  ],
  Australia: [
    { label: "Australia", value: "Australia" },
    { label: "New Zealand", value: "NewZealand" },
  ],
};

export default function SelectLocationScreen({ navigation }) {
  const [continent, setContinent] = useState(null); // State lưu châu lục được chọn
  const [country, setCountry] = useState(null); // State lưu quốc gia được chọn
  const [customCountry, setCustomCountry] = useState(""); // State lưu quốc gia nhập tay
  const [useCustomCountry, setUseCustomCountry] = useState(false); // State xác định người dùng có nhập tay hay không

  // Hàm xử lý khi nhấn Submit
  const handleSubmit = async () => {
    try {
      // Kiểm tra xem người dùng đã chọn hoặc nhập thông tin chưa
      if (!continent) {
        Alert.alert("Error", "Please select a continent.");
        return;
      }
      if (!useCustomCountry && !country) {
        Alert.alert("Error", "Please select a country or enter one manually.");
        return;
      }

      // Lưu thông tin vào AsyncStorage
      const locationData = {
        continent,
        country: useCustomCountry ? customCountry : country,
      };
      await AsyncStorage.setItem("location", JSON.stringify(locationData));

      // Thông báo thành công và chuyển đến màn hình Login
      Alert.alert("Success", "Location saved successfully!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "An error occurred: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Biểu tượng vị trí */}
      <Image
        source={require("../assets/location.png")} // Thay bằng ảnh vị trí của bạn
        style={styles.locationImage}
      />
      {/* Tiêu đề */}
      <Text style={styles.title}>SELECT YOUR LOCATION</Text>
      {/* Mô tả */}
      <Text style={styles.description}>
        Switch on your location to stay in tune with what's happening in your
        area
      </Text>
      {/* Dropdown Continent */}
      <Text style={styles.label}>CONTINENT</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setContinent(value); // Cập nhật châu lục được chọn
          setCountry(null); // Reset quốc gia khi đổi châu lục
        }}
        items={continents} // Danh sách châu lục
        style={pickerSelectStyles} // Định kiểu cho picker
        placeholder={{ label: "Select a continent...", value: null }} // Placeholder
        value={continent} // Giá trị hiện tại
      />
      {/* Dropdown Country hoặc Input nhập tay */}
      <Text style={styles.label}>COUNTRY</Text>
      {useCustomCountry ? (
        <TextInput
          style={styles.input}
          value={customCountry}
          onChangeText={setCustomCountry}
          placeholder="Enter your country"
        />
      ) : (
        <RNPickerSelect
          onValueChange={(value) => setCountry(value)} // Cập nhật quốc gia được chọn
          items={continent ? countries[continent] || [] : []} // Danh sách quốc gia dựa trên châu lục
          style={pickerSelectStyles} // Định kiểu cho picker
          placeholder={{ label: "Select a country...", value: null }} // Placeholder
          value={country} // Giá trị hiện tại
          disabled={!continent} // Vô hiệu hóa nếu chưa chọn châu lục
        />
      )}
      {/* Nút chuyển đổi giữa chọn và nhập tay */}
      <TouchableOpacity
        onPress={() => setUseCustomCountry(!useCustomCountry)} // Chuyển đổi giữa nhập tay và chọn
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>
          {useCustomCountry ? "Select from list" : "Enter manually"}
        </Text>
      </TouchableOpacity>
      {/* Nút Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
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
  locationImage: {
    width: 150, // Chiều rộng ảnh
    height: 150, // Chiều cao ảnh
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
    textAlign: "center", // Căn giữa chữ
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
  toggleButton: {
    marginBottom: 20, // Khoảng cách phía dưới
  },
  toggleButtonText: {
    color: "#28a745", // Màu xanh
    fontSize: 14, // Kích thước chữ
  },
  submitButton: {
    backgroundColor: "#28a745", // Màu nền xanh
    paddingVertical: 15, // Khoảng cách trên/dưới
    paddingHorizontal: 40, // Khoảng cách trái/phải
    borderRadius: 25, // Bo góc
    marginTop: 20, // Khoảng cách phía trên
  },
  submitButtonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Chữ đậm
  },
});

// Định kiểu cho RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    borderWidth: 1, // Viền
    borderColor: "#ccc", // Màu viền xám
    borderRadius: 5, // Bo góc
    padding: 10, // Khoảng cách bên trong
    marginBottom: 20, // Khoảng cách phía dưới
    fontSize: 16, // Kích thước chữ
    color: "#000", // Màu chữ đen
  },
  inputAndroid: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    borderWidth: 1, // Viền
    borderColor: "#ccc", // Màu viền xám
    borderRadius: 5, // Bo góc
    padding: 10, // Khoảng cách bên trong
    marginBottom: 20, // Khoảng cách phía dưới
    fontSize: 16, // Kích thước chữ
    color: "#000", // Màu chữ đen
  },
});
