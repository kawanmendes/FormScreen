export type User = {
  id: string | number;
  nome: string;
  email: string;
  bio: string;
};

export type RootStackParamList = {
  FormScreen: { id?: number } | undefined;
  ListScreen: undefined;
  PreviewScreen: { user: any };
};