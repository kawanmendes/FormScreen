import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "PreviewScreen">;

export default function PreviewScreen({ route }: Props) {
  const params = route.params;

  const data = "formData" in params ? params.formData : params.user;

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Preview</Text>

      <View style={{ padding: 14, borderWidth: 1, borderRadius: 10, gap: 6 }}>
        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: "700" }}>Nome: </Text>
          {data.nome}
        </Text>
        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: "700" }}>Email: </Text>
          {data.email}
        </Text>
      </View>
    </View>
  );
}