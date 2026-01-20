import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/style/home.style";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoTab = () => {
  const { toggleDarkMode, colors } = useTheme();

  const style = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={style.container}
    >
      <StatusBar />
      <SafeAreaView style={style.safeArea}>
        <Header />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoTab;
