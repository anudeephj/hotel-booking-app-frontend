import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


const RegisterPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: ""
    });


    //This line is declaring a piece of state named message using the useState hook in React.

    //message: holds the current state (an object with type and text).
    //setMessage: is the function you'll use to update the message state.
    //{type: "", text: ""} is the initial state — empty type and text.
    const [message, setMessage] = useState({type: "", text: ""});
    const navigate = useNavigate();

    //handle input change
    //In React, when building forms, we often want to keep track of what the user types into each input
    //  field. The handleInputChange function is used for this purpose. It takes the name and value of the
    //  input field (for example, "firstName" and "John") and updates the corresponding field in the formData 
    // state. This is done using setFormData, which keeps the previous state values unchanged while updating 
    // only the field that was modified. This allows us to handle multiple form inputs with a single function,
    //  making the code cleaner and more efficient.
    //It keeps the other values like lastName, email the same — only updates firstName.
    const handleInputChange = ({target: {name, value}}) => 
        setFormData((prev) => ({... prev, [name]:value}));

    //validate from field
    //This line checks if all form fields are filled in properly before allowing the user to submit the form.
    //Object.values(formData)
    //This takes all the values from your formData object (like first name, email, etc.) and puts them in an 
    // array. field.trim() removes spaces from the beginning and end.
    //If even one field is empty (""), isFormValid will be false.
    const isFormValid = Object.values(formData).every((field) => field.trim());

    //handle form submissiion When a user fills in the registration form and clicks "Submit", 
    //It’s a function triggered when the Register form is submitted.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setMessage({type: "error", text: "Please fill all fields"})
            setTimeout(()=> setMessage({}), 5000);
            return;
        }
        try {
            const resp = await ApiService.registerUser(formData);
            if (resp.status === 200) {
                setMessage({type: "success", text: "User Registered successfully"})
                setTimeout(()=> navigate("/login"), 3000);
            }
            
        } catch (error) {
            setMessage({type: "error", text: error.response?.data?.message || error.message})
            setTimeout(()=> setMessage({}), 5000);
            
        }
    }


    return(
        <div className="auth-container">
            {message.text && (<p className={`${message.type}-message`}>{message.text}</p>)}

            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {["firstName", "lastName", "email", "phoneNumber", "password"].map(
                    (field) => (
                        <div className="form-group" key={field}>
                            <label>{field.replace(/([A-Z])/g, " $1").trim()}: </label>
                            <input type={field === "email" ? "email" : "text"} 
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                    )
                )}
                <button type="submit">Register</button>
            </form>
            <p className="register-link"> Already have an account? <a href="/login">Login</a></p>

        </div>
    )

}

export default RegisterPage;