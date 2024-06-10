import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin login
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy check for admin login based on stored token or user role
    const isAdminUser = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminUser);
  }, []);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      setError("You must be logged in to access this page");
      navigate("/");
    }
  }, [loginState, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render admin login form if isAdmin state is true
  if (isAdmin) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        {/* Admin login form */}
      </div>
    );
  }

  // Render user profile form
  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
          {/* Form fields */}
          <button
            className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      )}
    </>
  );
};

export default Profile;
