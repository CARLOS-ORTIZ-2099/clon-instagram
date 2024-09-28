import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { ProtectedRoutes } from "./components/protected-routes/ProtectedRoutes";
import { Profile } from "./pages/profile/Profile";
import { NotFound } from "./pages/NotFound";
import { PublicRoutes } from "./components/public-routes/PublicRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { Publication } from "./pages/publication/Publication";
import { Explore } from "./pages/explore/Explore";
import { EditProfile } from "./pages/edit-profile/EditProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* esta tiene que ser una ruta protegida */}

            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />

              <Route path="/profile/:username" element={<Profile />} />

              <Route path="/p/:idpublication" element={<Publication />} />

              <Route path="/explore" element={<Explore />} />
            </Route>
            <Route path="/edit-profile/:id" element={<EditProfile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
