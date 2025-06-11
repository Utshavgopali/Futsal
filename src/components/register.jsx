









function register(){
    const {register, handlesubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        alart("register successfully");
        navigate("/login");
    }
}