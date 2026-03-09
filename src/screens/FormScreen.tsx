import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useFormContext } from "../FormContext";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParamList, "FormScreen">;

export default function FormScreen({ navigation, route }: Props) {
  const editId = route.params?.id;

  const { forms, addForm, updateForm } = useFormContext();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (!editId) {
      setNome("");
      setEmail("");
      setSenha("");
      setBio("");
      setFoto("");
      return;
    }

    const user = forms.find((f) => f.id === editId);
    if (!user) return;

    setNome(user.nome);
    setEmail(user.email);
    setBio(user.bio);
    setFoto((user as any).foto || "");
    setSenha("");
  }, [editId, forms]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão para acessar a galeria foi negada.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!nome.trim() || !email.trim()) {
      alert("Preencha nome e email.");
      return;
    }

    if (editId) {
      updateForm(editId, {
        nome,
        email,
        bio,
        foto,
      } as any);
    } else {
      addForm({
        nome,
        email,
        bio,
        foto,
      } as any);
    }

    navigation.navigate("ListScreen");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Foto de perfil</Text>

      <Pressable onPress={pickImage}>
        {foto ? (
          <Image
            source={{ uri: foto }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignSelf: "center",
              borderWidth: 1,
              marginBottom: 8,
            }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignSelf: "center",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text>Selecionar foto</Text>
          </View>
        )}
      </Pressable>

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
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        placeholderTextColor="#999"
      />

      <Text>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Digite sua bio"
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          minHeight: 100,
          textAlignVertical: "top",
        }}
        placeholderTextColor="#999"
      />

      <Button
        title={editId ? "Salvar alterações" : "Salvar"}
        onPress={handleSave}
      />

      <Button
        title="Listar"
        onPress={() => navigation.navigate("ListScreen")}
      />
    </View>
  );
}