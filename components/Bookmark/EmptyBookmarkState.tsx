// components/Bookmark/EmptyBookmarkState.tsx
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import EmptyState from "../States/EmptyState";

const EmptyBookmarkState = () => (
  <View
    style={{
      marginTop: moderateScale(50),
    }}
  >
    <EmptyState
      primaryTitle="Vous n'avez pas encore de gags favoris"
      secondaryTitle="Vos Gags enregistrés apparaitrons ici!"
    />
  </View>
);

export default EmptyBookmarkState;
