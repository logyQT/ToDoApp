import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTodos } from "../context/todoContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTodoScreen = ({ navigation }) => {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const { addTodo } = useTodos();

  const saveTask = () => {
    if (!taskText.trim()) {
      Alert.alert("Błąd", "Zadanie nie może być puste!");
      return;
    }
    addTodo(taskText);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.inner}>
        <TextInput style={styles.input} placeholder="Wpisz nowe zadanie..." placeholderTextColor="#9CA3AF" value={taskText} onChangeText={setTaskText} autoFocus />

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker((showPicker) => !showPicker)}>
          <Text style={styles.dateButtonText}>{deadline ? deadline.toLocaleString() : "Ustaw deadline"}</Text>
          <MaterialIcons name="calendar-today" size={20} color="#ffffff" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="datetime"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowPicker(Platform.OS === "ios");
              if (selectedDate) {
                setDeadline(selectedDate);
              }
            }}
            minimumDate={new Date()}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
          <MaterialIcons name="add-circle" size={24} color="#ffffff" />
          <Text style={styles.saveButtonText}>Zapisz Zadanie</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export { AddTodoScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
    justifyContent: "center",
  },
  inner: {
    width: "100%",
  },
  input: {
    backgroundColor: "#222222ff",
    color: "#F3F4F6",
    borderColor: "#444444",
    borderWidth: 1,
    fontSize: 18,
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  dateButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
