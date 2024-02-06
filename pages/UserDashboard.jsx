import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AddressForm from "./AddressForm";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Import Firestore methods
import { db } from "../lib/firebase/db";

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]); // State to store user addresses
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const addressesCollection = collection(db, "addresses");
      await deleteDoc(doc(addressesCollection, addressId));
      toast.success("Address deleted successfully!");
      // Update the addresses state after deletion
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error.message);
      toast.error("Error deleting address. Please try again.");
    }
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setSelectedAddress(null);
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
  };

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

  // Fetch user addresses when the component mounts and when user changes
  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        try {
          const addressesCollection = collection(db, "addresses");
          const q = query(addressesCollection, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const userAddresses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAddresses(userAddresses);
        } catch (error) {
          console.error("Error fetching addresses:", error.message);
        }
      }
    };

    fetchAddresses();
  }, [user, showAddressForm]); // Trigger the effect when user or showAddressForm changes

  return (
    <div className="user-dashboard section-p1">
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
            Addresses
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="right-card">
        {selectedTab === "welcome" && (
          <div className="personal-info">
            <h2 className="title-info">Personal Information</h2>
            <p className="info-name">
              Name: <span>{user?.displayName || "N/A"}</span>
            </p>
            <p>
              Email: <span>{user?.email || "N/A"}</span>
            </p>
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
            <div className="app__flex">
              <h2 className="title-info">Addresses</h2>
              <button className="add-address-button" onClick={handleAddAddress}>
                Add Address
              </button>
            </div>
            {showAddressForm ? (
              <div className="address-form-container">
                <AddressForm
                  address={selectedAddress}
                  onCancel={handleCancelAddressForm}
                  onUpdate={() => {
                    setShowAddressForm(false);
                    setSelectedAddress(null);
                  }}
                />
              </div>
            ) : (
              <div className="address-list-container">
                {addresses.length > 0 ? (
                  <ul className="address-list">
                    {addresses.map((address) => (
                      <li key={address.id}>
                        <div className="address-details">
                          <p>
                            {address.street}, {address.city}, {address.state},{" "}
                            {address.zipCode}
                          </p>
                        </div>
                        <div className="address-actions">
                          <button onClick={() => handleEditAddress(address)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No address added yet.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
