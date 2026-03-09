import React, { useMemo, useState } from "react";
import { View, FlatList, Pressable, Text, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useFormContext } from "../FormContext";

type Props = NativeStackScreenProps<RootStackParamList, "ListScreen">;

export default function ListScreen({ navigation }: Props) {
  const { forms, deleteForm } = useFormContext();
  const [search, setSearch] = useState("");

  const filteredForms = useMemo(() => {
    return forms.filter((item) =>
      item.nome.toLowerCase().includes(search.toLowerCase())
    );
  }, [forms, search]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Área de pesquisa */}
      <TextInput
        placeholder="Pesquisar usuário..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <FlatList
        data={filteredForms}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <Text style={{ opacity: 0.7 }}>
            {search
              ? "Nenhum usuário encontrado."
              : "Nenhum usuário cadastrado ainda."}
          </Text>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 14,
              borderWidth: 1,
              borderRadius: 10,
              gap: 10,
            }}
          >
            {/* Card (abre preview) */}
            <Pressable
              onPress={() =>
                navigation.navigate("PreviewScreen", { user: item })
              }
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.nome}
              </Text>
              <Text style={{ opacity: 0.7 }}>{item.email}</Text>
            </Pressable>

            {/* Ações */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() =>
                  navigation.navigate("FormScreen", { id: item.id })
                }
                style={{
                  flex: 1,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text>Editar</Text>
              </Pressable>

              <Pressable
                onPress={() => deleteForm(item.id)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}