import React from "react";
import { View, Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "PreviewScreen">;

export default function PreviewScreen({ route }: Props) {
  const params = route.params;

  // pega o objeto correto sem "as"
  const data = "formData" in params ? params.formData : params.user;

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Preview</Text>

      <View style={{ padding: 14, borderWidth: 1, borderRadius: 10, gap: 6 }}>

        <Image
          source={{ uri: data.foto }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 8,
          }}
          
        />
        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: "700" }}>Nome: </Text>
          {data.nome}
        </Text>

        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: "700" }}>Email: </Text>
          {data.email}
        </Text>

        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: "700" }}>Bio: </Text>
          {data.bio ?? "—"}
        </Text>
      </View>
    </View>
  );
}