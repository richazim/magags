import AuthContext from '@/context/AuthContext';
import { getLoggedInUser } from '@/libs/appwrite/account/getLoggedInUser';
import { login } from '@/libs/appwrite/account/login';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';

export const useSignInForm = () => {
  const router = useRouter();
  const { setLoggedInUser } = useContext(AuthContext);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    setFormSubmitted(true);
    try {
      await login(formData.email, formData.password);
      const user = await getLoggedInUser();
      setLoggedInUser(user);
      router.replace('/home');
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
    formSubmitted
  };
};
