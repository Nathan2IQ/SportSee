import { createContext, useContext, useState } from "react";

const DataSourceContext = createContext(undefined);

export function DataSourceProvider({ children }) {
  const [dataSource, setDataSource] = useState("api");

  const toggleDataSource = () => {
    setDataSource((prev) => (prev === "api" ? "mock" : "api"));
  };

  return (
    <DataSourceContext.Provider value={{ dataSource, toggleDataSource }}>
      {children}
    </DataSourceContext.Provider>
  );
}

export function useDataSource() {
  const context = useContext(DataSourceContext);

  if (!context) {
    throw new Error("useDataSource must be used within DataSourceProvider");
  }

  return context;
}
