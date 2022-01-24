import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  children?: any;
  style?: StyleProp<ViewStyle>;
}

export const ScrollableView = (props: ScrollViewProps) => {
  const {children, style, ...rest} = props;
  return (
    <ScrollView {...rest} style={[{width: '100%'}, props.style]}>
      <View style={{width: '100%', alignItems: 'center'}}>{children}</View>
    </ScrollView>
  );
};
