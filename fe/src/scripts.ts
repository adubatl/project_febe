import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    socket.on("newData", (newData) => {
      setData(newData);
    });

    return () => {
      socket.off("newData");
    };
  }, []);

  if (!data) {
    return <div>Waiting for data...</div>;
  }

  return (
    <div>
      <h1>Rendered Content</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
