import MyActivityIndicator from '@/components/shared/MyActivityIndicator';
import { TabIcon } from '@/components/Tabs/TabIcon';
import { TabLabel } from '@/components/Tabs/TabLabel';
import BookmarkIcon from '@/constants/icons/bookmarkIcon';
import HomeIcon from '@/constants/icons/homeIcon';
import PlusIcon from '@/constants/icons/plusIcon';
import ProfileIcon from '@/constants/icons/profileIcon';
import { tabsLabelsFrenchNames } from '@/constants/navigations';
import AuthContext from '@/context/AuthContext';
import { useRedirectIfNotAuthenticated } from '@/hooks/useRedirectIfNotAuthenticated';
import { Tabs } from "expo-router";
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';

const TabsLayout = () => {
    const {appwriteLoading, loggedInUser} = useContext(AuthContext)
    useRedirectIfNotAuthenticated();

    if(!loggedInUser || appwriteLoading){
        return <MyActivityIndicator loading={appwriteLoading} />
    }

 return (
     <>
         <Tabs
             screenOptions={{
                 tabBarActiveTintColor: "#6F6FF5",
                 tabBarInactiveTintColor: "#CDCDE0",
                 headerShown: false
             }}

         >
             <Tabs.Screen
                 name="home"
                 options={{
                     title: tabsLabelsFrenchNames.home,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={HomeIcon}/>,
                     tabBarLabel: ({ color, focused }) => <TabLabel color={color} focused={focused} label={tabsLabelsFrenchNames.home} />
                 }}
             />

             <Tabs.Screen
                 name="create"
                 options={{
                     title: tabsLabelsFrenchNames.create,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={PlusIcon}/>,
                     tabBarLabel: ({ color, focused }) => <TabLabel color={color} focused={focused} label={tabsLabelsFrenchNames.create} />
                 }}
             />

             <Tabs.Screen
                 name="bookmark"
                 options={{
                     title: tabsLabelsFrenchNames.bookmarks,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={BookmarkIcon}/>,
                     tabBarLabel: ({ color, focused }) => <TabLabel color={color} focused={focused} label={tabsLabelsFrenchNames.bookmarks} />
                 }}
             />

             <Tabs.Screen
                 name="profile"
                 options={{
                     title: tabsLabelsFrenchNames.profile,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={ProfileIcon}/>,
                     tabBarLabel: ({ color, focused }) => <TabLabel color={color} focused={focused} label={tabsLabelsFrenchNames.profile} />
                 }}
             />

             <Tabs.Screen
                 name="gags/[title]"
                 options={{
                     href: null
                 }}
             />
         </Tabs>

         <StatusBar barStyle="dark-content"/>
     </>
 )
};


export default TabsLayout;