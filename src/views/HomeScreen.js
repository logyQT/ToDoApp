import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useTodos } from "../context/todoContext";
import { getETA } from "../utils/getETA";

const ToggleButton = ({ completed, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={{ padding: 8 }}>
    {completed ? <MaterialIcons name="check-circle" size={32} color="#4CAF50" /> : <MaterialIcons name="radio-button-unchecked" size={32} color="#9CA3AF" />}
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [, setTick] = React.useState(0);
  const rowRefs = React.useRef(new Map());

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    const unsubscribe = navigation.addListener("focus", () => {
      rowRefs.current.forEach((ref) => {
        if (ref) ref.close();
      });
    });
    return unsubscribe;
  }, [navigation]);

  const renderRightActions = (item) => (
    <View style={styles.rightActionsContainer}>
      <TouchableOpacity
        onPress={() => {
          rowRefs.current.get(item.id)?.close();
          navigation.navigate("EditTodo", { todo: item });
        }}
        style={styles.editBtn}
      >
        <MaterialIcons name="edit" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          rowRefs.current.get(item.id)?.close();
          deleteTodo(item.id);
        }}
        style={styles.deleteBtn}
      >
        <MaterialIcons name="delete" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    const etaStatus = getETA(item.deadline);
    return (
      <Swipeable
        ref={(ref) => {
          if (ref) {
            rowRefs.current.set(item.id, ref);
          } else {
            rowRefs.current.delete(item.id);
          }
        }}
        overshootRight={false}
        renderRightActions={() => renderRightActions(item)}
      >
        <View style={styles.todoRow}>
          <View style={styles.leftSection}>
            <ToggleButton completed={item.completed} onToggle={() => toggleTodo(item.id)} />
            <Text style={[styles.taskText, item.completed && styles.completedText]} numberOfLines={1}>
              {item.task}
            </Text>
          </View>
          {item.deadline && !item.completed && <Text style={[styles.etaRightText, { color: etaStatus.color }]}>ETA: {etaStatus.text}</Text>}
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={todos} renderItem={renderItem} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.emptyText}>Brak zadań do wyświetlenia! Dodaj nowe.</Text>} />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddTodo")}>
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
    paddingTop: 40,
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
    justifyContent: "space-between",
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
  rightActionsContainer: {
    flexDirection: "row",
    width: 160,
  },
  editBtn: {
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  deleteBtn: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  deadlineText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
});
