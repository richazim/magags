import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import TrendingItem from "./TrendingItem";
import * as Animatable from "react-native-animatable"
import {moderateScale} from "react-native-size-matters";

const TrendingItemsList = ({
    data
                           }) => {
    const [activeItemKey, setActiveItemKey] = useState(null);
    const [test, setTest] = useState(2)

    const handleChangedViewableItems = useRef(({viewableItems}) => {
        if(viewableItems.length > 0){
            setActiveItemKey(viewableItems[0]?.key)
        }
    })

 return (
  <View
  >
      <Text
          className="text-[24px] text-[#3333A4] pl-[20px] pb-[20px]"
      >
          Gags Tendance
      </Text>
      <Animatable.View
        animation="zoomIn"
      >
          <FlatList
              data={data}
              keyExtractor={item => item.$id} // Flatlist va les utiliser comme des cles
              horizontal={true}
              onViewableItemsChanged={handleChangedViewableItems.current}
              viewabilityConfig={{
                  itemVisiblePercentThreshold: 50
              }}
              renderItem={({item}) => {
                  return (
                      <TrendingItem
                          activeElementKey={activeItemKey}
                          currentElement={item}
                      />
                  )
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                  paddingLeft: moderateScale(20),
                  paddingRight: moderateScale(10),
                  paddingBottom: moderateScale(20)
              }}
          />
      </Animatable.View>

      <View
          className="w-[70px] h-[20px] mx-auto flex flex-row justify-between items-center"
      >
          {data?.map((item, index) => {
              if(index < data.length - 1){
                  return (
                      <View
                          key={index}
                          className={"w-[10px] h-[10px] rounded-full " + `${item.$id === activeItemKey ? "bg-[#E84B4B]" : "bg-[#333]"}`}
                      >

                      </View>
                  )
              }else{
                  return null;
              }

          })}
      </View>
  </View>
 );
};

export default TrendingItemsList;