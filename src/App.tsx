import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PredictionsProvider } from './context/PredictionsContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
// Pages
import Home from './pages/Home';
import Stadiums from './pages/Stadiums';
import Fixtures from './pages/Fixtures';
import GroupStage from './pages/GroupStage';
import KnockoutStage from './pages/KnockoutStage';
import Teams from './pages/Teams';

import Predictions from './pages/Predictions';
import MatchDetails from './pages/MatchDetails';
import About from './pages/About';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PredictionsProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/stadiums" element={<PageWrapper><Stadiums /></PageWrapper>} />
                  <Route path="/fixtures" element={<PageWrapper><Fixtures /></PageWrapper>} />
                  <Route path="/group-stage" element={<PageWrapper><GroupStage /></PageWrapper>} />
                  <Route path="/knockout" element={<PageWrapper><KnockoutStage /></PageWrapper>} />
                  <Route path="/teams" element={<PageWrapper><Teams /></PageWrapper>} />

                  <Route path="/predictions" element={<PageWrapper><Predictions /></PageWrapper>} />
                  <Route path="/match/:id" element={<PageWrapper><MatchDetails /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </PredictionsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
