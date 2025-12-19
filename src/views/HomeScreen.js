import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useTodos } from "../context/todoContext";

const ToggleButton = ({ completed, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={{ padding: 8 }}>
    {completed ? (
      <MaterialIcons name="check-circle" size={32} color="#4CAF50" />
    ) : (
      <MaterialIcons name="radio-button-unchecked" size={32} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const renderRightActions = (id) => (
    <TouchableOpacity onPress={() => deleteTodo(id)} style={styles.deleteBtn}>
      <MaterialIcons name="delete" size={32} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => renderRightActions(item.id)}
    >
      <View style={styles.todoRow}>
        <View style={styles.leftSection}>
          <ToggleButton
            completed={item.completed}
            onToggle={() => toggleTodo(item.id)}
          />
          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedText,
            ]}
            numberOfLines={1}
          >
            {item.task}
          </Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Brak zadań do wyświetlenia! Dodaj nowe.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <MaterialIcons name="add-circle" size={64} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 40
  },
  list: {
    marginBottom: 16,
    paddingTop: 8,
    backgroundColor: "#000000",
    borderRadius: 10,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.17,
    borderBottomColor: "#ffffff",
    backgroundColor: "#000000",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 16,
  },
  taskText: {
    marginLeft: 12,
    fontSize: 18,
    color: "#F3F4F6",
  },
  completedText: {
    color: "#6B7280",
    textDecorationLine: "line-through",
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 32,
  },
  deleteBtn: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 1,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
