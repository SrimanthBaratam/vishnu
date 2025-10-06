import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HealthData.css";

const API_URL = "http://localhost/mybackend";

export default function HealthData() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("form");

  // Fetch patients from backend
  const fetchPatients = () => {
  axios.get(`${API_URL}/get_patients.php`)
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error("Error fetching patients:", error);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on search and status
  useEffect(() => {
    let filtered = patients;

    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(patient => patient.status === statusFilter);
    }

    setFilteredPatients(filtered);
  }, [patients, searchTerm, statusFilter]);

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const patientData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      patientId: form.patientId.value,
      dateOfBirth: form.dateOfBirth.value,
      phone: form.phone.value,
      email: form.email.value,
      address: form.address.value,
      status: form.status.value,
      medicalProblems: form.medicalProblems.value,
      bloodGroup: form.bloodGroup.value,
      allergies: form.allergies.value,
      emergencyContact: form.emergencyContact.value
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Saving...";
    submitBtn.disabled = true;

    if (editingPatient) {
      patientData.id = editingPatient.id;
  axios.post(`${API_URL}/update_patient.php`, patientData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        submitBtn.textContent = "✓ Updated!";
        fetchPatients();
        setTimeout(() => {
          form.reset();
          setEditingPatient(null);
          setActiveTab("list");
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1000);
      })
      .catch(error => {
        console.error("Update error:", error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    } else {
  axios.post(`${API_URL}/add_patient.php`, patientData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        submitBtn.textContent = "✓ Saved!";
        fetchPatients();
        setTimeout(() => {
          form.reset();
          setActiveTab("list");
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1000);
      })
      .catch(error => {
        console.error("Save error:", error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    }
  };

  // Handle edit patient
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setSelectedPatient(null);
    setActiveTab("form");
  };

  // Handle view patient
  const handleView = (patient) => {
    setSelectedPatient(patient);
    setEditingPatient(null);
    setActiveTab("details");
  };

  // Handle delete patient
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
  axios.post(`${API_URL}/delete_patient.php`, { id }, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        fetchPatients();
      })
      .catch(error => {
        console.error("Delete error:", error);
      });
    }
  };

  // Calculate stats
  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === "active").length,
    inactive: patients.filter(p => p.status === "inactive").length,
    discharged: patients.filter(p => p.status === "discharged").length,
  };

  // PatientForm Component
  const PatientForm = () => (
    <div className="patient-form-container">
      <div className="form-header">
        <h2>{editingPatient ? "Edit Patient" : "Add New Patient"}</h2>
      </div>
      <form className="patient-form" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name *" defaultValue={editingPatient?.firstName || ""} required />
        <input type="text" name="lastName" placeholder="Last Name *" defaultValue={editingPatient?.lastName || ""} required />
        <input type="text" name="patientId" placeholder="Patient ID *" defaultValue={editingPatient?.patientId || ""} required />
        <input type="date" name="dateOfBirth" defaultValue={editingPatient?.dateOfBirth || ""} required />
        <input type="tel" name="phone" placeholder="Phone" defaultValue={editingPatient?.phone || ""} />
        <input type="email" name="email" placeholder="Email *" defaultValue={editingPatient?.email || ""} required />
        <input type="text" name="bloodGroup" placeholder="Blood Group" defaultValue={editingPatient?.bloodGroup || ""} />
        <input type="text" name="emergencyContact" placeholder="Emergency Contact" defaultValue={editingPatient?.emergencyContact || ""} />
        <input type="text" name="address" placeholder="Address" defaultValue={editingPatient?.address || ""} />
        <textarea name="medicalProblems" placeholder="Medical Problems" defaultValue={editingPatient?.medicalProblems || ""}></textarea>
        <textarea name="allergies" placeholder="Allergies" defaultValue={editingPatient?.allergies || ""}></textarea>
        <select name="status" defaultValue={editingPatient?.status || "active"}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discharged">Discharged</option>
        </select>
        <button type="submit">{editingPatient ? "Update Patient" : "Save Patient"}</button>
  <button type="button" onClick={() => { setEditingPatient(null); setActiveTab("list"); }}>Cancel</button>
      </form>
    </div>
  );

  // PatientDetails Component
  const PatientDetails = () => {
    if (!selectedPatient) return null;
    return (
      <div className="patient-details">
        <h2>Patient Details</h2>
        <p>Name: {selectedPatient.firstName} {selectedPatient.lastName}</p>
        <p>Patient ID: {selectedPatient.patientId}</p>
        <p>Date of Birth: {selectedPatient.dateOfBirth}</p>
        <p>Blood Group: {selectedPatient.bloodGroup}</p>
        <p>Phone: {selectedPatient.phone}</p>
        <p>Email: {selectedPatient.email}</p>
        <p>Address: {selectedPatient.address}</p>
        <p>Emergency Contact: {selectedPatient.emergencyContact}</p>
        <p>Status: {selectedPatient.status}</p>
        <p>Medical Problems: {selectedPatient.medicalProblems}</p>
        <p>Allergies: {selectedPatient.allergies}</p>
        <button onClick={() => handleEdit(selectedPatient)}>✏ Edit Patient</button>
        <button onClick={() => { setSelectedPatient(null); setActiveTab("list"); }}>← Back to List</button>
      </div>
    );
  };

  // PatientOverview Component
  const PatientOverview = () => {
    const commonProblems = {};
    const commonAllergies = {};
    patients.forEach(patient => {
      if (patient.medicalProblems) {
        patient.medicalProblems.split(',').forEach(problem => {
          const trimmed = problem.trim();
          commonProblems[trimmed] = (commonProblems[trimmed] || 0) + 1;
        });
      }
      if (patient.allergies) {
        patient.allergies.split(',').forEach(allergy => {
          const trimmed = allergy.trim();
          commonAllergies[trimmed] = (commonAllergies[trimmed] || 0) + 1;
        });
      }
    });
    const topProblems = Object.entries(commonProblems).sort(([,a], [,b]) => b - a).slice(0, 5);
    const topAllergies = Object.entries(commonAllergies).sort(([,a], [,b]) => b - a).slice(0, 5);

    return (
      <div>
        <h2>Patient Overview</h2>
        <p>Total: {stats.total}</p>
        <p>Active: {stats.active}</p>
        <p>Inactive: {stats.inactive}</p>
        <p>Discharged: {stats.discharged}</p>
        <h3>Common Problems</h3>
        {topProblems.length > 0 ? topProblems.map(([problem, count], index) => (
          <p key={index}>{problem}: {count}</p>
        )) : <p>No problems recorded.</p>}
        <h3>Common Allergies</h3>
        {topAllergies.length > 0 ? topAllergies.map(([allergy, count], index) => (
          <p key={index}>{allergy}: {count}</p>
        )) : <p>No allergies recorded.</p>}
      </div>
    );
  };

  // Render the main layout
  return (
    <div className="healthdata-container">
      <h1>Health Data Management</h1>
      <div>
  <button onClick={() => { setActiveTab("form"); setEditingPatient(null); setSelectedPatient(null); }}>➕ Add New Patient</button>
  <button onClick={() => { setActiveTab("list"); setSelectedPatient(null); }}>📋 Patient List</button>
  <button onClick={() => { setActiveTab("overview"); setSelectedPatient(null); }}>📊 Overview & Analytics</button>
      </div>

      {activeTab === "form" ? <PatientForm /> : null}
      {activeTab === "list" ? (
        <div>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="discharged">Discharged</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? filteredPatients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{index + 1}</td>
                  <td>{patient.patientId}</td>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.status}</td>
                  <td>
                    <button onClick={() => handleView(patient)}>View</button>
                    <button onClick={() => handleEdit(patient)}>Edit</button>
                    <button onClick={() => handleDelete(patient.id)}>Delete</button>
                  </td>
                </tr>
              )) : <tr><td colSpan="7">No patients found.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : null}
      {activeTab === "details" ? <PatientDetails /> : null}
      {activeTab === "overview" ? <PatientOverview /> : null}
    </div>
  );
}