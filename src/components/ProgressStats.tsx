import { useTheme } from "@/hooks/useTheme";
import { createSettingsStyles } from "@/style/setting.style";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { api } from "../../convex/_generated/api";

const ProgressStats = () => {
  const { colors } = useTheme();

  const settingStyle = createSettingsStyles(colors);

  const todos = useQuery(api.Todo.getAllTodos);

  const completdTodos = todos
    ? todos.filter((todo) => todo.completed).length
    : 0;

  const totalTodos = todos ? todos.length : 0;

  const activeTodos = todos
    ? todos.filter((todo) => !todo.completed).length
    : 0;

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyle.section}
    >
      <Text style={settingStyle.sectionTitle}>Progress Stats</Text>

      <View style={settingStyle.statsContainer}>
        {/* TOTAL TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyle.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyle.statIcon}
            >
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingStyle.statNumber}>{totalTodos}</Text>
            <Text style={settingStyle.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>

        {/* COMPLETED TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyle.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingStyle.statIcon}
            >
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingStyle.statNumber}>{completdTodos}</Text>
            <Text style={settingStyle.statLabel}>Completed</Text>
          </View>
        </LinearGradient>

        {/* ACTIVE TODOS */}

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyle.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingStyle.statIcon}
            >
              <Ionicons name="time" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingStyle.statNumber}>{activeTodos}</Text>
            <Text style={settingStyle.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
