"use client";
import axios from "axios";

import React, { useState } from "react";

const DropdownMenus = () => {
  // State for selected values
  const [cellType, setCellType] = useState("T Cells");
  const [stimulant, setStimulant] = useState("IL-2");

  // Options for dropdowns
  const cellTypes = ["T Cells", "B Cells", "Macrophages", "Neutrophils"];
  const stimulants = ["IL-2", "PMA", "LPS", "Ionomycin"];


  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/tab1",
        { cellType, stimulant },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">

      {/* Dropdowns Container */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
        
        {/* Cell Type Dropdown */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cell Type</label>
          <select 
            value={cellType} 
            onChange={(e) => setCellType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          >
            {cellTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Stimulant Dropdown */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Stimulant</label>
          <select 
            value={stimulant} 
            onChange={(e) => setStimulant(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          >
            {stimulants.map((stim) => (
              <option key={stim} value={stim}>{stim}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-center">
        <button 
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>

      {/* Selected Values Display */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md text-lg">
        <p><strong>Selected Cell Type:</strong> {cellType}</p>
        <p><strong>Selected Stimulant:</strong> {stimulant}</p>
      </div>
    </div>
  );
}

export default DropdownMenus;
