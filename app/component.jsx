"use client";
import React, { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:8000"; // Change if needed
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex border-b border-gray-300">
        <button className={tabClass(activeTab, "tab1")} onClick={() => setActiveTab("tab1")}>Stimulant Analysis</button>
        <button className={tabClass(activeTab, "tab2")} onClick={() => setActiveTab("tab2")}>Readout Analysis</button>
        <button className={tabClass(activeTab, "tab3")} onClick={() => setActiveTab("tab3")}>Readout Correlation</button>
      </div>
      <div className="p-6 border border-gray-200 rounded-b-md shadow-md">
        {activeTab === "tab1" && <StimulantTab />}
        {activeTab === "tab2" && <CellTypeStimulantGender />}
        {activeTab === "tab3" && <FullSelection />}
      </div>
    </div>
  );
};
// Dropdown Options
const cellTypes = ["B Cells", "Basophils", "CD11b-/CD16-", "CD11b+/CD16-", "CD16+/CD11b-", "CD16+/CD11b+", "CD1c+ B cells", "CD4+/CD8+", "CD4+T cells", "CD7+/HLA-DR-", "CD8+T cells", "Neutrophils", "pDCs"];
const stimulants = ["Anthrax", "Basal", "CD40L", "Ebola VLPs", "GM-CSF", "IFNa2", "IFNb", "IFNg", "IL-12", "IL-2", "IL-4", "IL-6", "LPS", "PMAIono", "R848", "TNFa"];
const genders = ["Female", "Male", "Prefer not to say"];
const reagents = ["IkBa", "Ki67", "p4E-BP1", "pCREB", "pErk1/2", "pMAPKAPK2", "pP38", "pPLCg2", "pS6", "pSTAT1", "pSTAT3", "pSTAT4", "pSTAT5", "pSTAT6", "pTBK1", "pZap70/Syk"];
const StimulantTab = () => {
  const [stimulus, setStimulus] = useState("TNFa");
  const handleSubmit = async () => {
    console.log("Sending request to backend:", { stimulus });
    try {
      const response = await axios.post(`${API_URL}/tab1`, { stimulus });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return <DropdownWithSubmit label="Stimulant" options={stimulants} value={stimulus} setValue={setStimulus} onSubmit={handleSubmit} />;
};
const CellTypeStimulantGender = () => {
  const [cellType, setCellType] = useState("B Cells");
  const [stimulus, setStimulus] = useState("TNFa");
  const [gender, setGender] = useState("Female");
  const handleSubmit = async () => {
    const payload = { cell_type: cellType, stimulus, gender };
    console.log("Sending request to backend:", payload);
    try {
      const response = await axios.post(`${API_URL}/tab2`, payload);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return (
    <>
      <Dropdown label="Cell Type" options={cellTypes} value={cellType} setValue={setCellType} />
      <Dropdown label="Stimulant" options={stimulants} value={stimulus} setValue={setStimulus} />
      <Dropdown label="Gender" options={genders} value={gender} setValue={setGender} />
      <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-md">Submit</button>
    </>
  );
};
const FullSelection = () => {
  const [cellType, setCellType] = useState("B Cells");
  const [stimulus, setStimulus] = useState("TNFa");
  const [reagent1, setReagent1] = useState("IkBa");
  const [reagent2, setReagent2] = useState("pSTAT3");
  const handleSubmit = async () => {
    const payload = { cell_type: cellType, stimulus, read1: reagent1, read2: reagent2 };
    console.log("Sending request to backend:", payload);
    try {
      const response = await axios.post(`${API_URL}/tab3`, payload);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return (
    <>
      <Dropdown label="Cell Type" options={cellTypes} value={cellType} setValue={setCellType} />
      <Dropdown label="Stimulant" options={stimulants} value={stimulus} setValue={setStimulus} />
      <Dropdown label="Reagent 1" options={reagents} value={reagent1} setValue={setReagent1} />
      <DropdownWithSubmit label="Reagent 2" options={reagents} value={reagent2} setValue={setReagent2} onSubmit={handleSubmit} />
    </>
  );
};
const Dropdown = ({ label, options, value, setValue }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select className="w-full p-3 border rounded-md" value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);
const DropdownWithSubmit = ({ label, options, value, setValue, onSubmit }) => (
  <div>
    <Dropdown label={label} options={options} value={value} setValue={setValue} />
    <button onClick={onSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-md">Submit</button>
  </div>
);
const tabClass = (activeTab, tab) => `py-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`;
export default Tabs;