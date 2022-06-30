import { Suspense } from "react";
import * as ROUTES from "./constants/routes";
import { Routes, Route } from "react-router-dom";
import OrdersContextProvider from "./context/OrdersContext";
import IntermidiaryListContextProvider from "./context/IntermidiaryListContext";

function App() {
  return (
    <IntermidiaryListContextProvider>
      <OrdersContextProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" index element={<ROUTES.Home />} />
            <Route path="intermidiaries" index element={<ROUTES.AddIntermidiary />} />
            <Route path="intermidiaries/:id" index element={<ROUTES.EditIntermidiary />} />
          </Routes>
        </Suspense>
      </OrdersContextProvider>
    </IntermidiaryListContextProvider>
  );
}

export default App;
