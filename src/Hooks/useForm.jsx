import React from "react";

const validation = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Preencha um email válido",
  },
  password:{
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: "A senha deve ter no mínimo 8 caracteres, pelo menos uma letra e um número",
  }
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function onChange({ target }) {
    console.log(target.value);
    setError(null);

    if (error) validate(target.value);
    setValue(target.value);
  }

  function validate(value) {
    if (type == false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    }
    if (validation[type] && validation[type].regex.test(value)) {
        return true;
    }
      else {
        setError(validation[type].message);
        return false;
      }
    }
  

  return {
    value,
    setValue,
    onChange,
    validate: (type) => validate(type),
    onBlur: (type) => validate(type),
    error,
  };
};

export default useForm;
