// UserDashboard.jsx

import React, { useState } from "react";
import { useAuth } from "./firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("welcome");

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="user-dashboard">
      <div className="left-card">
        <h2>Welcome, {user?.displayName || "User"}!</h2>
        <div className="tabs">
          <div
            className={`tab ${selectedTab === "welcome" ? "active" : ""}`}
            onClick={() => setSelectedTab("welcome")}
          >
            Welcome
          </div>
          <div
            className={`tab ${selectedTab === "myOrders" ? "active" : ""}`}
            onClick={() => setSelectedTab("myOrders")}
          >
            My Orders
          </div>
          <div
            className={`tab ${selectedTab === "address" ? "active" : ""}`}
            onClick={() => setSelectedTab("address")}
          >
            Address
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="right-card">
        {selectedTab === "welcome" && (
          <div className="personal-info">
            <h2 className="title-info">Personal Information</h2>
            <p className="info-name">Name: <span>{user?.displayName || "N/A"}</span></p>
            <p>Email: <span>{user?.email || "N/A"}</span></p>
          </div>
        )}

        {selectedTab === "myOrders" && (
          <div className="orders">
            <h2 className="title-info">My Orders</h2>
            <p>No orders right now.</p>
          </div>
        )}

        {selectedTab === "address" && (
          <div className="address">
            <h2 className="title-info">Address</h2>
            <p>No address added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
