import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewProducts() {
  const { user } = useAuthContext();
  const navigation = useNavigate();
  useEffect(() => {
    if (user?.isAdmin === false || user === null) {
      navigation("/");
    }
  }, [user]);
  return <div>hi</div>;
}
