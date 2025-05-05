import { React, useState, useEffect } from "react";

const Cintillo = () => {
  const [cintillo, setCintillo] = useState("");

  const API_URL = process.env.REACT_APP_API_URL_PRODUCTION;

  useEffect(() => {
    fetch(`${API_URL}/cintillo`)
      .then((response) => response.json())
      .then((data) => setCintillo(data.cintillo))
      .catch((error) => console.error("Error al obtener el cintillo:", error));
  }, []);

  return (
    <div className="cintillo">
      <div dangerouslySetInnerHTML={{ __html: cintillo }} />
    </div>
  );
};

export default Cintillo;