import { View, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

const BookmarkHeader = () => (
  <View
    style={{
      marginTop: moderateScale(20),
      paddingHorizontal: moderateScale(20),
    }}
  >
    <Text className="text-[24px] font-bold text-[#FF8E01] text-center">
      Gags Enregistrés
    </Text>
  </View>
);

export default BookmarkHeader;
