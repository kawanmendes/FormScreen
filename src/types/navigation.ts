export type RootStackParamList = {
  FormScreen: undefined;
  ListScreen: undefined;

  PreviewScreen:
    | {
        formData: {
          nome: string;
          email: string;
        };
      }
    | {
        user: {
          id: string;
          nome: string;
          email: string;
        };
      };
};