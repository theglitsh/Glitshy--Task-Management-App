import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthFormData } from "../types/form-data";

const useAuth = (
  formData: AuthFormData,
  setFormData: any,
  url: string,
  isLinkedInRegister: boolean
) => {
  const router = useRouter();
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    linkedinProfileUrl: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerErrorMessage(null);
    setLoading(true);

    let isValid = true;
    const newValidationErrors = {
      name: "",
      email: "",
      password: "",
      linkedinProfileUrl: "",
    };

    if (!isLinkedInRegister) {
      if (!formData.email) {
        newValidationErrors.email = "Email is required";
        isValid = false;
      }

      if (!formData.password) {
        newValidationErrors.password = "Password is required";
        isValid = false;
      }
    } else {
      if (!formData.linkedinProfileUrl) {
        newValidationErrors.linkedinProfileUrl =
          "LinkedIn Profile URL is required";
        isValid = false;
      }
    }

    setValidationErrors(newValidationErrors);

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(url, formData);
      const userData = response.data;

      // Save token and user information to localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("email", userData.email);

      router.push("/dashboard");
    } catch (error: any) {
      setServerErrorMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    serverErrorMessage,
    validationErrors,
    loading,
  };
};

export default useAuth;
