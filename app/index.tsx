import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
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

const API_URL = "http://192.168.1.2:4000";

export default function Index() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);

      const mapped = res.data.map((t: any) => ({
        id: t.id,
        title: t.title,
        isDone: t.is_done,
      }));
      setTodoList(mapped);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };


  const addTodo = async () => {
    if (todoTitle) {
      try {
        const res = await axios.post(`${API_URL}/todos`, { title: todoTitle });
        const newTodo: Todo = {
          id: res.data.id,
          title: res.data.title,
          isDone: res.data.is_done, 
        };
        setTodoList((prev) => [...prev, newTodo]);
        setTodoTitle("");
      } catch (err) {
        console.error("Error adding todo:", err);
      }
    }
  };





  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodoList(todoList.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const updateTodo = async (id: number) => {
    try {
      const res = await axios.put(`${API_URL}/todos/${id}`);
      const updated = {
        id: res.data.id,
        title: res.data.title,
        isDone: res.data.is_done,
      };
      setTodoList(todoList.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
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
