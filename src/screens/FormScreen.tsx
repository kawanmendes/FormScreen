import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "FormScreen">;

export default function FormScreen({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [bil, setBil] = useState("");

  function irParaPreview() {
    navigation.navigate("PreviewScreen", {
      formData: { nome, email },
    });
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        placeholderTextColor="#999"

      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        placeholderTextColor="#999"

      />
      <Text>Senha</Text>  
      <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
          secureTextEntry
          placeholderTextColor="#999"
      />
      <Text>Bil</Text>  
      <TextInput
          placeholder="bil"
          value={bil}
          onChangeText={setBil}
          style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
          placeholderTextColor="#999"
      />


      <Button title="salvar" onPress={irParaPreview} />
      <Button title="listar" onPress={() => navigation.navigate("ListScreen")} />
    </View>
  );
}