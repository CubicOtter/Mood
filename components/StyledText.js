import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'caveat' }]} />;
}

export function MonoTextBold(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'caveat-bold' }]} />;
}
