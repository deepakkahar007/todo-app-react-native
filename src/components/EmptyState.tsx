import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const EmptyState = () => {
  const { colors } = useTheme();

  const homeStyle = createHomeStyles(colors);

  return (
    <View style={homeStyle.emptyContainer}>
      <LinearGradient
        colors={colors.gradients.empty}
        style={homeStyle.emptyIconContainer}
      >
        <Ionicons name="clipboard-outline" size={60} color={colors.textMuted} />
      </LinearGradient>
      <Text style={homeStyle.emptyText}>No Todos yet</Text>
      <Text style={homeStyle.emptySubtext}>Add a todo to get started</Text>
    </View>
  );
};

export default EmptyState;
