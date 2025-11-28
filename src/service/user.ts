import axios from "axios";

export async function registerUser(name: string, email: string, password: string) {
  try {
    const res = await axios.post("/api/register", { name, email, password });
    return res.data; 
  } catch  {
    const message = "Registration failed";
    throw new Error(message);
  }
}
