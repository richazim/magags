// features/auth/useSignUpForm.ts
import AuthContext from '@/context/AuthContext';
import { registerAndSaveDocumentAndLogin } from '@/libs/appwrite/account/createUser';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';

type SignUpData = {
  username: string;
  email: string;
  password: string;
}

export const useSignUpForm = () => {
  const { setLoggedInUser } = useContext(AuthContext);
  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    setFormSubmitted(true);
    try {
      const user = await registerAndSaveDocumentAndLogin(formData.username, formData.email, formData.password);
      // const user = await getLoggedInUser();
      setLoggedInUser(user);
      
      router.replace('/sign-up');
    } catch (err: any) {
      Alert.alert('Appwrite', err.message);
      console.error(err);
    } finally {
      setFormSubmitted(false);
    }
  };

  return {
    formData,
    handleChange,
    submit,
    formSubmitted,
  };
};
