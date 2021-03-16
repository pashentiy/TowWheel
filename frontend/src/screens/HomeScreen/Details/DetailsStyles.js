import styled from "styled-components/native";

export const Container = styled.View`
  background: #fff;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 20px;
`;

export const TypeTitle = styled.Text`
  font-size: 20px;
  color: #222;
`;
export const TypeDescription = styled.Text`
  color: #9c9c9c;
  font-size: 14px;
`;
export const TypeImage = styled.Image`
  height: 80px;
  margin: 2px 0;
`;
export const RequestButton = styled.TouchableOpacity`
  background: #dd4d5e;
  background: #9c9c9c;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 3px;
  
`;
export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
