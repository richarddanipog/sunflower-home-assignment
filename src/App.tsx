import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const CityDetailsPage = lazy(
  () => import('./pages/CityDetailsPage/CityDetailsPage')
);
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <MainPage />
          </Suspense>
        </ErrorBoundary>
      }
    />
    <Route
      path="/city/:cityName"
      element={
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <CityDetailsPage />
          </Suspense>
        </ErrorBoundary>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<LoadingSpinner />}>
          <NotFound />
        </Suspense>
      }
    />
  </Routes>
);

export default App;
