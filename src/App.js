import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./client/components/mainLayout";
import Signin from "./client/components/Signin";
import { Home } from "./client/components/home";
import { Attendance } from "./client/components/attendance";
import { Marks } from "./client/components/marks";

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