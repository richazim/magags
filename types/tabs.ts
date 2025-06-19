import { ImageSourcePropType } from "react-native"

export type TabIconProps = {
    color: string,
    icon: ImageSourcePropType
}

export type TabLabelProps = {
    color: string,
    focused: boolean,
    label: string
}