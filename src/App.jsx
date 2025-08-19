import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Player from "./pages/Player"
import MainLayout from "./layouts/MainLayout"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path="/player" element={<Player />} />
      </Route>
    </Routes>
  )
}
