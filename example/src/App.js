import React from "react";

import TableOptions from "table-options";

const App = () => {
  function handleSettings() {
    console.log("Dispara a função de configurações do menu");
  }

  function handleExit() {
    console.log("Dispara a função de saída do menu");
  }

  return <TableOptions navbarActions={{ handleSettings, handleExit }} />;
};

export default App;
