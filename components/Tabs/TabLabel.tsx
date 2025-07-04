import { TabLabelProps } from "@/types/tabs"
import { Text, View } from "react-native"

export const TabLabel = ({color, focused, label}: TabLabelProps) => {
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
