import DangerZone from "@/components/DangerZone";
import Prefrence from "@/components/Prefrence";
import ProgressStats from "@/components/ProgressStats";
import { useTheme } from "@/hooks/useTheme";
import { createSettingsStyles } from "@/style/setting.style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsTab = () => {
  const { colors } = useTheme();

  const settingStyle = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingStyle.container}
    >
      <SafeAreaView style={settingStyle.safeArea}>
        {/* header */}
        <View style={settingStyle.header}>
          <View style={settingStyle.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyle.iconContainer}
            >
              <Ionicons name="settings" size={28} color={"#fff"} />
            </LinearGradient>
            <Text style={settingStyle.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={settingStyle.scrollView}
          contentContainerStyle={settingStyle.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Prefrence />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingsTab;
