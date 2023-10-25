import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "ios-settings-sharp";
            } else if (route.name === "Notifications") {
              iconName = focused ? "ios-notifications" : "notifications-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} style={{ marginBottom: -1 }}/>;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: ""
        })} 
      >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Notifications" component={HomeScreen} />
          <Tab.Screen name="Settings" component={HomeScreen} />
      </Tab.Navigator>
  )
}