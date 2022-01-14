import { useState } from "react";

const formData = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
}
  
const errorData = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
}

const useForm = () => {
    const [form, setForm] = useState(formData);
    const [errors, setErrors] = useState(errorData);
    const [displayData, setDisplayData] = useState(false);

    const errorHandling = (fieldName, fieldValue) => {
        if (fieldName === "firstName" && fieldValue.length < 5)
          return `${fieldName} must have at least 5 characters.`;
    
        const emailRegex = /(.*)@(.*)\.(.+)/g;
        if (fieldName === "email" && !fieldValue.match(emailRegex))
          return `${fieldName} must be a valid email address.`;
    
        if (fieldName !== "message" && fieldValue === "")
          return `${fieldName} is a required field.`;
        
        return "";
      }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const submitErrors = {};
        Object.keys(errors).forEach(field => {
          submitErrors[field] = errorHandling(field, form[field])
        });
        
        setErrors(submitErrors);
        
        const hasErrors = (submitErrors.firstName === "" && submitErrors.lastName === "" && submitErrors.email === "" && submitErrors.message === "");
        setDisplayData(hasErrors);
          
    };

    const handleChange = (e) => {
        const errorMessage = errorHandling(e.target.name, e.target.value);
    
        if (errorMessage !== "") {
          setDisplayData(false);
        }
    
        setErrors({
          ...errors,
          [e.target.name]: errorMessage
        });
    
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
    }

    return [form, errors, displayData, handleSubmit, handleChange];
}

export default useForm;