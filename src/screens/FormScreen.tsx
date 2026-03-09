import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useFormContext } from "../FormContext";

type Props = NativeStackScreenProps<RootStackParamList, "FormScreen">;

export default function FormScreen({ navigation, route }: Props) {
  // Se vier id, é modo edição
  const editId = route.params?.id;

  const { forms, addForm, updateForm } = useFormContext();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); // não vamos salvar no contexto
  const [bio, setBio] = useState("");

  // Preenche campos quando estiver editando
  useEffect(() => {
    if (!editId) {
      setNome("");
      setEmail("");
      setBio("");
      setSenha("");
      return;
    }

    const user = forms.find((f) => f.id === editId);
    if (!user) return;

    setNome(user.nome);
    setEmail(user.email);
    setBio(user.bio);
  }, [editId, forms]);

  const handleSave = () => {
    if (editId) {
      updateForm(editId, { nome, email, bio });
    } else {
      addForm({ nome, email, bio });
    }

    navigation.navigate("ListScreen");
  };

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

      <Text>Bio</Text>
      <TextInput
        placeholder="bio"
        value={bio}
        onChangeText={setBio}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        placeholderTextColor="#999"
      />

      <Button title={editId ? "Salvar alterações" : "Salvar"} onPress={handleSave} />
      <Button title="Listar" onPress={() => navigation.navigate("ListScreen")} />
    </View>
  );
}