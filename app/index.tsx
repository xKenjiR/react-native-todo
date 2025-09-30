import List from "@/components/list";
import { useTodoList } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

const API_URL = "http://localhost:4000";

export default function Index() {
  const [todoTitle, setTodoTitle] = useState("");
  const { setList, addTodo } = useTodoList((state) => state);

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
      setList(mapped);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addButton = async () => {
    if (todoTitle) {
      addTodo(todoTitle);
      setTodoTitle("");
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
        <TouchableOpacity onPress={addButton}>
          <Ionicons name="add" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <List />
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
});
