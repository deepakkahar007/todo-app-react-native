import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";

type Todo = Doc<"todo">;

const TodoTab = () => {
  const { toggleDarkMode, colors } = useTheme();

  const style = createHomeStyles(colors);

  const [editingId, setEditingId] = useState<Id<"todo"> | null>(null);
  const [editingText, setEditingText] = useState("");

  const todos = useQuery(api.Todo.getAllTodos);

  const toggleTodo = useMutation(api.Todo.toggleTodo);

  const deleteTodo = useMutation(api.Todo.deleteTodo);

  const editTodo = useMutation(api.Todo.updateTodo);

  const handleToggleTodo = async (id: Id<"todo">) => {
    try {
      await toggleTodo({ id });
    } catch (err: Error | unknown) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleTodoDelete = async (id: Id<"todo">) => {
    Alert.alert("Delete Todo", "Are you sure want to delete ?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };
  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await editTodo({ id: editingId, text: editingText });
        setEditingId(null);
        setEditingText("");
      } catch (err: Error | unknown) {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={style.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={style.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={style.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.completed
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                style.checkboxInner,
                { borderColor: item.completed ? "transparent" : colors.border },
              ]}
            >
              {item.completed && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={style.editContainer}>
              <TextInput
                style={style.editInput}
                value={editingText}
                onChangeText={setEditingText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />

              <View style={style.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={style.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color={"#fff"} />
                    <Text style={style.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={style.editButton}
                  >
                    <Ionicons name="close" size={16} color={"#fff"} />
                    <Text style={style.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={style.todoTextContainer}>
              <Text
                style={[
                  style.todoText,
                  item.completed && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={style.todoActions}>
                <TouchableOpacity
                  onPress={() => handleEditTodo(item)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={style.actionButton}
                  >
                    <Ionicons name="pencil" size={24} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleTodoDelete(item._id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={style.actionButton}
                  >
                    <Ionicons name="trash" size={24} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  if (todos === undefined) return <LoadingSpinner />;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={style.container}
    >
      <StatusBar />
      <SafeAreaView style={style.safeArea}>
        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={style.todoList}
          contentContainerStyle={style.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoTab;
