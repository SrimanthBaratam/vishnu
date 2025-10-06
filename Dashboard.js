import React from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import DoctorCard from "../components/DoctorCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main">
        <h2>Admin Dashboard</h2>

        {/* Statistics Section */}
        <div className="stats">
          <StatCard title="Patients" value="2" color="#dfe9ff" />
          <StatCard title="Doctors" value="2" color="#ffe0e0" />
          <StatCard title="Appointments" value="2" color="#fff4d9" />
          <StatCard title="Consultations" value="2" color="#e0f5ec" />
        </div>

        {/* Graph & Summary */}
        <div className="row">
          <div className="graph">
            <h3>Appointments</h3>
            <div className="bar"></div>
          </div>

          <div className="summary">
            <h3>Summary</h3>
            <div className="circle"></div>
            <p>Appointments: 0</p>
            <p>Completed: 2</p>
          </div>
        </div>

        {/* Doctors List */}
        <div className="doctors">
          <h3>Available Doctors</h3>
          <DoctorCard name="Doctor 1" specialty="Cardiologist" time="09:00 - 17:00" />
        </div>

        {/* Recent Appointments */}
        <div className="appointments">
          <h3>Recent Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Info</th>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CODEWAVE PATIENT</td>
                <td>27-11-2024</td>
                <td>9:30 am</td>
                <td>Doctor 1</td>
                <td className="completed">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
