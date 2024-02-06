import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/firebase/auth";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../lib/firebase/db";
import toast from "react-hot-toast";

const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const AddressForm = ({ address, onCancel }) => {
  const { user } = useAuth();
  const [street, setStreet] = useState(address?.street || "");
  const [city, setCity] = useState(address?.city || "");
  const [state, setState] = useState(address?.state || "");
  const [zipCode, setZipCode] = useState(address?.zipCode || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Update form fields when the address prop changes
    setStreet(address?.street || "");
    setCity(address?.city || "");
    setState(address?.state || "");
    setZipCode(address?.zipCode || "");
  }, [address]);

  const handleStateInput = (input) => {
    const filteredStates = statesList.filter((state) =>
      state.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredStates);
    setShowSuggestions(true);
    setState(input); // Update the state while typing
  };

  const handleKeyDown = (e) => {
    // Handle backspace key to clear suggestions
    if (e.key === "Backspace" && state === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleStateChange = (value) => {
    setState(value);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    try {
      // Save or update address in Firestore based on the presence of the address prop
      const addressesCollection = collection(db, "addresses");
      if (address) {
        const addressDoc = doc(addressesCollection, address.id);
        await updateDoc(addressDoc, { street, city, state, zipCode });
        toast.success("Address updated successfully!");
      } else {
        await addDoc(addressesCollection, {
          userId: user.uid,
          street,
          city,
          state,
          zipCode,
        });
        toast.success("Address saved successfully!");
      }

      // Clear form after submission
      setStreet("");
      setCity("");
      setState("");
      setZipCode("");
      setSuggestions([]);
      setShowSuggestions(false);

      // Trigger page reload
      window.location.reload();
    } catch (error) {
      console.error("Error saving address:", error.message);
      toast.error("Error saving address. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Enter your street address"
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          required
        />
      </label>
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => handleStateInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your state"
          required
        />
        {showSuggestions && (
          <ul className="suggestions-list">
            {suggestions.map((suggest) => (
              <li key={suggest} onClick={() => handleStateChange(suggest)}>
                {suggest}
              </li>
            ))}
          </ul>
        )}
      </label>
      <label>
        Postal Code:
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter your ZIP code"
          required
        />
      </label>
      <div className="form-buttons">
        <button type="submit">
          {address ? "Update Address" : "Save Address"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;