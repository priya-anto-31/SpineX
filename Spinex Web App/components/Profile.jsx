import React, { useState, useEffect } from "react";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/profile.css";

const Card = ({ children }) => <div className="card">{children}</div>;
const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);

const Profile = () => {
  const [xrayData, setXrayData] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const fetchImages = async () => {
      const database = getDatabase();
      const userImagesRef = dbRef(database, `users/${user.uid}/images`);

      try {
        const snapshot = await get(userImagesRef);
        if (snapshot.exists()) {
          const images = snapshot.val();

          // Convert Firebase object to array and assign mock Cobb angles
          const formattedData = Object.keys(images).map((key, index) => {
            const image = images[key];
            return {
              id: index + 1,
              img: image.url,
              cobbAngle: parseFloat(image.cobbsAngle) || 0,
              curveType: image.curveType || "N/A",
              severity: image.severity || "N/A",
              timestamp: image.scanDate || "Unknown Date",
            };
          });

          setXrayData(formattedData);
        } else {
          console.log("No images found.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [user]);

  // Generate recommendations based on Cobb angle progression
  const latestAngle =
    xrayData.length > 0 ? xrayData[xrayData.length - 1].cobbAngle : 0;
  let recommendation = "Continue monitoring.";
  if (latestAngle > 40) recommendation = "Surgery may be required.";
  else if (latestAngle > 20) recommendation = "Bracing is recommended.";
  else recommendation = "Corrective exercises should be maintained.";

  return (
    <div className="profile-container">
      {/* X-ray Display Section */}
      <div className="xray-display">
        {xrayData.map((xray) => (
          <Card key={xray.id}>
            <img
              src={xray.img}
              alt={`X-ray ${xray.id}`}
              className="xray-image"
            />
            <CardContent>
              <p>
                <strong>Cobb Angle:</strong> {xray.cobbAngle}°
              </p>
              <p>
                <strong>Curve Type:</strong> {xray.curveType}-Shape
              </p>
              <p>
                <strong>Severity:</strong> {xray.severity}
              </p>
              <p>
                <strong>Uploaded:</strong> {xray.timestamp}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cobb Angle Trend Graph */}
      <div className="graph-container">
        <h2 className="graph-heading">Cobb Angle Progression</h2>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={xrayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 70]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cobbAngle"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendation Section */}
      <div className="recommendation-container">
        <h2 className="recommendation-heading">Recommendation</h2>
        <p class="rec">{recommendation}</p>
      </div>
    </div>
  );
};

export default Profile;
