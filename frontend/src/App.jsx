import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './components/Layout';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AccountsPage from './pages/AccountsPage';
import EmployeesPage from './pages/EmployeesPage';
import ProtectedRoute from './components/ProtectedRoute';
// ... import other pages

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="projects" element={<ProtectedRoute permission="projects"><ProjectsPage /></ProtectedRoute>} />
              <Route path="projects/:id" element={<ProtectedRoute permission="projects"><ProjectDetailPage /></ProtectedRoute>} />
              <Route path="accounts" element={<ProtectedRoute permission="accounts"><AccountsPage /></ProtectedRoute>} />
              <Route path="employees" element={<ProtectedRoute role="admin"><EmployeesPage /></ProtectedRoute>} />
              {/* ... other protected routes */}
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;