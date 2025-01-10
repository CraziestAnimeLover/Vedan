import React, { useState } from "react";
import Navbar from "../shared/Navbar";

import SidebarLayout from "./librarycards/SidebarLayout";


const Library = () => {
  return (
    <>
      <div>
        <Navbar />
        <SidebarLayout />
      </div>
    </>
  );
};

export default Library;
