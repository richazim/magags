import React, {useContext, useEffect} from 'react';
import {Image, Text, View} from "react-native";
import GlobalContext from "../../context/GlobalProvider";
import {useRouter, Tabs} from "expo-router";
import Loader from "../../components/Loader";
import {StatusBar} from "expo-status-bar";
import icons from "../../constants/icons";


const TabsLayout = () => {
    const tabsLabels = {
        "home": "Accueil",
        "create": "Créer",
        "bookmarks": "Favoris",
        "profile": "Profil"
    }
    const router = useRouter();
    const {loggedInUser, appwriteLoading} = useContext(GlobalContext);
    useEffect(() => {
        if(!appwriteLoading && !loggedInUser){
            router.replace("/sign-in")
        }
    }, [appwriteLoading, loggedInUser]);

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
                     title: tabsLabels.home,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={icons.home}/>,
                     tabBarLabel: ({ color, focused }) => <TabIconLabel color={color} focused={focused} label={tabsLabels.home} />
                 }}
             />

             <Tabs.Screen
                 name="create"
                 options={{
                     title: tabsLabels.create,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={icons.plus}/>,
                     tabBarLabel: ({ color, focused }) => <TabIconLabel color={color} focused={focused} label={tabsLabels.create} />
                 }}
             />

             <Tabs.Screen
                 name="bookmark"
                 options={{
                     title: tabsLabels.bookmarks,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={icons.bookmark}/>,
                     tabBarLabel: ({ color, focused }) => <TabIconLabel color={color} focused={focused} label={tabsLabels.bookmarks} />
                 }}
             />

             <Tabs.Screen
                 name="profile"
                 options={{
                     title: tabsLabels.profile,
                     tabBarIcon: ({ color }) => <TabIcon color={color} icon={icons.profile}/>,
                     tabBarLabel: ({ color, focused }) => <TabIconLabel color={color} focused={focused} label={tabsLabels.profile} />
                 }}
             />

             <Tabs.Screen
                 name="gags/[title]"
                 options={{
                     href: null
                 }}
             />
         </Tabs>
         <Loader loading={appwriteLoading}/>
         <StatusBar style="dark"/>
     </>
 )
};


export const TabIcon = ({color, icon}) => {

    return (
        <View>
            <Image
                source={icon}
                className="w-[24px] h-[24px]"
                resizeMode={"contain"}
                tintColor={color}
            />
        </View>
    )
}

export const TabIconLabel = ({color, focused, label}) => {
    return (
        <View>
            <Text
                className=""
                style={{
                    color: focused ? color : '#CDCDE0',
                    fontSize: 10,
                    fontFamily: focused ? 'Poppins-Bold' : 'Poppins-Regular'
                }}
            >
                {label}
            </Text>
        </View>
    )
}

export default TabsLayout;