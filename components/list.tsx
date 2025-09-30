import { useTodoList } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const List = () => {
  const { list, updateTodo, deleteTodo } = useTodoList((state) => state);

  return (
    <FlatList
      data={list}
      keyExtractor={(todo) => todo.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => updateTodo(item.id)}>
          <View style={item.isDone ? styles.itemsDone : styles.items}>
            <Text style={styles.itemText}>
              {item.isDone && "(Done)"} {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Ionicons style={styles.delete} name="trash" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  items: {
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemsDone: {
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 0.5,
  },
  itemText: {
    maxWidth: "90%",
    textAlign: "left",
  },
  delete: {
    padding: 5,
    fontSize: 15,
    color: "white",
    borderRadius: 5,
    backgroundColor: "indianred",
  },
});

export default List;
