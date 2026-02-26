import React from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ListScreen">;

const MOCK_USERS = [
  { id: "1", nome: "Ana", email: "ana@email.com" },
  { id: "2", nome: "Bruno", email: "bruno@email.com" },
  { id: "3", nome: "Carla", email: "carla@email.com" },
];

export default function ListScreen({ navigation }: Props) {
  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={MOCK_USERS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("PreviewScreen", { user: item })}
            style={{ padding: 14, borderWidth: 1, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.nome}</Text>
            <Text style={{ opacity: 0.7 }}>{item.email}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}