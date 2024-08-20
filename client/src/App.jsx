import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar"
import Home from "./Home"
import TravelPlanList from "./components/TravelPlanList"
import TravelPlanForm from "./components/TravelPlanForm"
import EditTravelPlanForm from "./components/EditTravelPlanForm";
import UsersTravelPlanList from "./components/UsersTravelPlanList";
import LocationsTravelPlanList from "./components/LocationsTravelPlanList";
import CreateUserPage from "./components/CreateUserPage";

function App() {

  return (
    <Router>
        <Navbar />
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel_plans" element={<TravelPlanList />} />
          <Route path="/travel_plans/new" element={<TravelPlanForm />} />
          <Route path="/travel_plans/:id/edit" element={<EditTravelPlanForm />} />
          <Route path="/users_travel_plans" element={<UsersTravelPlanList />} />
          <Route path="/locations_travel_plans" element={<LocationsTravelPlanList />} />
          <Route path="/create_traveler" element={<CreateUserPage />} />
        </Routes>
        </div>
    </Router>
  )
}

export default App