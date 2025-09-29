import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function Index() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todoTitle) {
      setTodoList((state) => [
        ...state,
        {
          id: state.length,
          title: todoTitle,
          isDone: false,
        },
      ]);
      setTodoTitle("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodoList((state) => {
      let counter = 0;
      const newList: Todo[] = [];
      state.forEach((item) => {
        if (id != item.id) {
          newList.push({ ...item, id: counter });
          counter++;
        }
      });
      return newList;
    });
  };

  const updateTodo = (id: number) => {
    setTodoList((state) =>
      state.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          value={todoTitle}
          onChangeText={setTodoTitle}
          placeholder="Add todo..."
        />
        <TouchableOpacity onPress={addTodo}>
          <Ionicons name="add" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todoList}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 10,
    justifyContent: "center",
  },
  search: {
    gap: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "white",
  },
  icon: {
    padding: 5,
    fontSize: 25,
    color: "white",
    borderRadius: 5,
    backgroundColor: "dodgerblue",
  },
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
