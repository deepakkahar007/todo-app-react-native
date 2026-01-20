import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { api } from "../../convex/_generated/api";

const Header = () => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.Todo.getAllTodos);

  const completedCount = todos
    ? todos.filter((todo) => todo.completed).length
    : 0;

  const totalCount = todos ? todos.length : 0;

  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color={"white"} />
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Todo&apos;s Tracker 👀</Text>
          <Text
            style={homeStyles.subtitle}
          >{`${completedCount}/${totalCount} completed`}</Text>
        </View>
      </View>

      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[homeStyles.progressFill, { width: `${progress}%` }]}
            />
          </View>
          <Text style={homeStyles.progressText}>{Math.round(progress)}%</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
