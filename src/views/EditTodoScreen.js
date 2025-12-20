import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTodos } from "../context/todoContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditTodoScreen = ({ route, navigation }) => {
  const { todo } = route.params;
  const [taskText, setTaskText] = useState(todo.task);
  const [deadline, setDeadline] = useState(todo.deadline ? new Date(todo.deadline) : null);
  const [showPicker, setShowPicker] = useState(false);
  const { updateTodo } = useTodos();

  const handleUpdate = () => {
    updateTodo(todo.id, taskText, deadline);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.inner}>
        <TextInput style={styles.input} value={taskText} onChangeText={setTaskText} />

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateButtonText}>{deadline ? deadline.toLocaleString() : "Ustaw deadline"}</Text>
          <MaterialIcons name="calendar-today" size={20} color="#ffffff" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="datetime"
            onChange={(e, date) => {
              setShowPicker(false);
              if (date) setDeadline(date);
            }}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.saveButtonText}>Zaktualizuj Zadanie</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export { EditTodoScreen };

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
