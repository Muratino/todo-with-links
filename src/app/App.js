import { Routes, Route } from "react-router-dom"
import { Todo } from "../components/Todo";
import { Links } from "../components/Links";
import { Layout } from "../components/layout/Layout";

export const path = [
  { id: 1, path: '/', name: 'Todo' },
  { id: 2, path: 'links', name: 'Links' },
]

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}  >
        <Route index element={<Todo />} />
        <Route path="links" element={<Links />} />
      </Route>
      <Route path="*" element={<span>Error not found</span>} />
    </Routes>
  );
}

export default App;
