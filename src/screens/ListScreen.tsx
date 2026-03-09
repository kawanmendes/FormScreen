import React, { useMemo, useState } from "react";
import { View, FlatList, Pressable, Text, TextInput, Image } from "react-native";
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
          <Pressable
            onPress={() =>
              navigation.navigate("PreviewScreen", { user: item })
            }
            style={{
              padding: 14,
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            {/* Linha com foto + informações */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              
              {(item as any).foto ? (
                <Image
                  source={{ uri: (item as any).foto }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>👤</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  {item.nome}
                </Text>
                <Text style={{ opacity: 0.7 }}>{item.email}</Text>
              </View>
            </View>

            {/* Botões */}
            <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
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
          </Pressable>
        )}
      />
    </View>
  );
}