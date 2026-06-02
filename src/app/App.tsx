import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import Parse from "./services/parseConfig";

export default function App() {
  useEffect(() => {
    console.log("Conectado com sucesso!");
    console.log(Parse);
  }, []);

  return <RouterProvider router={router} />;
}


console.log("Application ID:", Parse.applicationId);
console.log("Server URL:", Parse.serverURL);