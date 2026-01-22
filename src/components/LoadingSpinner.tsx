import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";
import { createHomeStyles } from "../style/home.style";

const LoadingSpinner = () => {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyle.container}
    >
      <View style={homeStyle.loadingContainer}>
        <ActivityIndicator size={"large"} color={colors.primary} />

        <Text style={homeStyle.loadingText}>Loading your todos...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner;
