import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { api } from "../../convex/_generated/api";

const TodoInput = () => {
  const { colors } = useTheme();

  const homeStyle = createHomeStyles(colors);

  const createTodo = useMutation(api.Todo.addTodo);

  const [newTodo, setNewTodo] = useState("");

  const handleTodo = async () => {
    if (newTodo.trim()) {
      try {
        await createTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (err: Error | unknown) {
        console.log("error");
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <View style={homeStyle.inputSection}>
      <View style={homeStyle.inputWrapper}>
        <TextInput
          style={homeStyle.input}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleTodo}
          multiline
          placeholder="Add a new todo"
          placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity
          onPress={handleTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyle.addButton,
              !newTodo.trim() && homeStyle.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color={"#fff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
