// import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

// const Products = lazy(() => import("./pages/Products"))
// const Cart = lazy(() => import("./pages/Cart"))

import Products from "./pages/Products"
import Cart from "./pages/Cart"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default App