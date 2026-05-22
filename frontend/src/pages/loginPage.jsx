import { Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";
import { loginRequest } from "../services/authService";

function LoginPage() {
  const handleLogin = async (email, password) => {
    try {
      const data = await loginRequest(email, password);

      console.log("LOGIN OK:", data);

      // 👉 aquí luego:
      // localStorage.setItem("token", data.token)

    } catch (error) {
      console.error("Error login:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm onLogin={handleLogin} />
    </Box>
  );
}

export default LoginPage;