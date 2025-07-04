import { TabIconProps } from "@/types/tabs"
import { Image, View } from "react-native"

export const TabIcon = ({color, icon}: TabIconProps) => {

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