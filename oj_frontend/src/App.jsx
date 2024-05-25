// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import QuestionManager from "./components/admin/QuestionManager";
import EditQuestion from "./components/admin/EditQuestion";
import SingleQuestion  from "./components/users/SingleQuestion";
import QuestionList from "./components/admin/QuestionList";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/admin/add/questions" element={<QuestionManager  />} /> */}
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/admin/add/questions" element={<QuestionManager  />} />
              <Route path="/admin/update/question/:quesId" element={<EditQuestion  />} />
              <Route path="/question/:quesId" element={<SingleQuestion />} />
              <Route path="/admin/questions" element={<QuestionList />} />
              {/* Add other protected routes here */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
