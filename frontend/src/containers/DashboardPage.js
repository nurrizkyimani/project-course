import React, { useState } from "react";

function DashboardPage() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <form onSubmit={(e) => console.log(e.target.value)}>
        <input
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => console.log(e.target.value)}
        />
      </form>
    </div>
  );
}

export default DashboardPage;
