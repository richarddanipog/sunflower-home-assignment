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
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/city/:cityName" element={<CityDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default App;
