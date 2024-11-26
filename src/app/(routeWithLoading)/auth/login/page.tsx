import { LoginComponent } from "@/components/auth";

export const metadata = {
  title: "Login",
  description: "Black diamond Login",
};

export default function Login() {
  return <LoginComponent isEmbedded />;
}
