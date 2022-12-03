import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/mainLayout";
import Signin from "./components/Signin";
import { Home } from "./components/home";
import { Attendance } from "./components/attendance";
import { Marks } from "./components/marks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Signin />
      } />
      <Route path="/home" element={
        <MainLayout />
      }>
        <Route index element={<Home />} />
        <Route
          path="attendance"
          element={<Attendance />}
        />
        <Route exact path="/home/marks" element={<Marks />} />
      </Route>
    </Routes>
  )
}

export default App;