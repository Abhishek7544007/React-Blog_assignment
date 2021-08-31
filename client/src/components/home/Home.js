import React from "react";
import Navbar from "../navbar/navbar";

const Home = ({ user, authState }) => {
  return (
    <div>
      <Navbar user={user} authState={authState} />
    </div>
  );
};

export default Home;
