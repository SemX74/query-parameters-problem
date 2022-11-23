import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import App from "./App";

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  );
};

export default AppRoutes;
