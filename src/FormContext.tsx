import React, { createContext, useState, useContext } from "react";

// Define o tipo dos dados do formulário
export interface FormData {
  id: number;
  nome: string;
  email: string;
  bio: string;
}

// Define o tipo do contexto
interface FormContextType {
  forms: FormData[];
  addForm: (form: Omit<FormData, "id">) => void;
  deleteForm: (id: number) => void;
  updateForm: (id: number, form: Omit<FormData , "id">) => void;
}

// Cria o contexto
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provedor do contexto
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forms, setForms] = useState<FormData[]>([]);
  

  const addForm = (form: Omit<FormData, "id">) => {
    const newForm: FormData = { ...form, id: forms.length + 1 };
    setForms((prevForms) => [...prevForms, newForm]);
  };

  const deleteForm = (id: number) => {
    setForms((prev) => prev.filter((f) => f.id !== id));
  };
  const updateForm =(id : number, form: Omit<FormData, "id">)=> {
    setForms((prev)=>
        prev.map((item)=>
            item.id === id ? {...item, ...form} : item
        )
    );
  };
  return (
    <FormContext.Provider value={{ forms, addForm, deleteForm, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook para usar o contexto
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext deve ser usado dentro de um FormProvider");
  }
  return context;
};