import { Route, Routes } from "react-router-dom";

import ConversationPage from "./pages/ConversationPage";
import InboxPage from "./pages/InboxPage";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import useAuthLoginCheck from "./hooks/useAuthLoginCheck";
import ApplicationLoading from "./components/UI/ApplicationLoading";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  // check user loggedIn or not
  const LoggedIn = useAuthLoginCheck();
  return (
    <>
      {!LoggedIn ? (
        <ApplicationLoading />
      ) : (
        <Routes>
          <Route
            index
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/singup"
            element={
              <PublicRoute>
                <SingupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <PrivateRoute>
                <ConversationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/inbox/:id"
            element={
              <PrivateRoute>
                <InboxPage />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
