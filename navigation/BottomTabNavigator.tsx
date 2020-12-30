import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { TabOneScreen } from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabRulesScreen from '../screens/TabRulesScreen';
import {
  BottomTabParamList,
  TabOneParamList,
  TabOptionsParamList,
  TabTwoParamList
} from '../types';
import TabTwoMyScores from '../screens/TabTwoMyScores';
import TabOptions from '../screens/TabOptions';

const Tab = createMaterialTopTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Game"
      lazy
      lazyPreloadDistance={1}
    >
      <Tab.Screen
        name="Game"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({
            focused,
            color
          }: {
            focused: boolean;
            color: string;
          }) => <TabBarIcon name="logo-game-controller-a" color={color} />
        }}
      />
      <Tab.Screen
        name="Scores"
        component={TabScoresNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-podium" color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Options"
        component={TabOptionsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Minesweeper' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabOptionsStack = createStackNavigator<TabOptionsParamList>();

function TabOptionsNavigator() {
  return (
    <TabOptionsStack.Navigator>
      <TabOptionsStack.Screen
        name="TabOptionsScreen"
        component={TabOptions}
        options={{ headerTitle: 'Options' }}
      />
      <TabOptionsStack.Screen
        name="TabRulesScreen"
        component={TabRulesScreen}
        options={{ headerTitle: 'Rules' }}
      />
    </TabOptionsStack.Navigator>
  );
}

const TabScoresStack = createStackNavigator<TabTwoParamList>();

function TabScoresNavigator() {
  return (
    <TabScoresStack.Navigator>
      <TabScoresStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Best Scores' }}
      />
      <TabScoresStack.Screen
        name="TabTwoMyScores"
        component={TabTwoMyScores}
        options={{ headerTitle: 'My Scores' }}
      />
    </TabScoresStack.Navigator>
  );
}
