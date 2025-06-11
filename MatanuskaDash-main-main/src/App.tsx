import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import YearToDateKPIs from './components/dashboard/YearToDateKPIs';
import ActiveTrips from './components/trips/ActiveTrips';
import CompletedTrips from './components/trips/CompletedTrips';
import FlagsInvestigations from './components/flags/FlagsInvestigations';
import CurrencyFleetReport from './components/reports/CurrencyFleetReport';
import InvoiceAgingDashboard from './components/invoicing/InvoiceAgingDashboard';
import CustomerRetentionDashboard from './components/performance/CustomerRetentionDashboard';
import MissedLoadsTracker from './components/trips/MissedLoadsTracker';
import DieselDashboard from './components/diesel/DieselDashboard';
import TripDetails from './components/trips/TripDetails';
import TripForm from './components/trips/TripForm';
import SystemCostConfiguration from './components/admin/SystemCostConfiguration';
import Modal from './components/ui/Modal';
import { Trip, SystemCostRates, DEFAULT_SYSTEM_COST_RATES } from './types';

const AppContent: React.FC = () => {
  const { trips, addTrip, updateTrip, deleteTrip, missedLoads, addMissedLoad, updateMissedLoad, deleteMissedLoad } = useAppContext();

  const [currentView, setCurrentView] = useState('ytd-kpis');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | undefined>();
  const [systemCostRates, setSystemCostRates] = useState<Record<'USD' | 'ZAR', SystemCostRates>>(DEFAULT_SYSTEM_COST_RATES);

  const handleAddTrip = async (tripData: Omit<Trip, 'id' | 'costs' | 'status'>) => {
    try {
      const tripId = addTrip(tripData);
      setShowTripForm(false);
      setEditingTrip(undefined);
      
      // Show success message
      alert(`Trip created successfully!\n\nFleet: ${tripData.fleetNumber}\nDriver: ${tripData.driverName}\nRoute: ${tripData.route}\n\nTrip ID: ${tripId}`);
    } catch (error) {
      console.error('Error adding trip:', error);
      alert('Error creating trip. Please try again.');
    }
  };

  const handleUpdateTrip = (tripData: Omit<Trip, 'id' | 'costs' | 'status'>) => {
    if (editingTrip) {
      const updatedTrip = { 
        ...editingTrip, 
        ...tripData,
        // Preserve existing fields that shouldn't be overwritten
        costs: editingTrip.costs,
        status: editingTrip.status,
        additionalCosts: editingTrip.additionalCosts || [],
        delayReasons: editingTrip.delayReasons || [],
        followUpHistory: editingTrip.followUpHistory || []
      };
      updateTrip(updatedTrip);
      setEditingTrip(undefined);
      setShowTripForm(false);
      
      alert('Trip updated successfully!');
    }
  };

  const handleEditTrip = (trip: Trip) => {
    console.log('Setting editing trip:', trip);
    setEditingTrip(trip);
    setShowTripForm(true);
  };

  const handleDeleteTrip = (id: string) => {
    const trip = trips.find(t => t.id === id);
    if (trip && confirm(`Delete trip for fleet ${trip.fleetNumber}? This cannot be undone.`)) {
      deleteTrip(id);
      if (selectedTrip?.id === id) {
        setSelectedTrip(null);
      }
      alert('Trip deleted successfully.');
    }
  };

  const handleViewTrip = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleNewTrip = () => {
    setEditingTrip(undefined);
    setShowTripForm(true);
  };

  const handleCloseTripForm = () => {
    setShowTripForm(false);
    setEditingTrip(undefined);
  };

  const renderContent = () => {
    if (selectedTrip) {
      return <TripDetails trip={selectedTrip} onBack={() => setSelectedTrip(null)} />;
    }

    switch (currentView) {
      case 'ytd-kpis':
        return <YearToDateKPIs trips={trips} />;
      case 'dashboard':
        return <Dashboard trips={trips} />;
      case 'active-trips':
        return <ActiveTrips
          trips={trips.filter(t => t.status === 'active')}
          onEdit={handleEditTrip}
          onDelete={handleDeleteTrip}
          onView={handleViewTrip}
        />;
      case 'completed-trips':
        return <CompletedTrips trips={trips.filter(t => ['completed', 'invoiced', 'paid'].includes(t.status))} onView={handleViewTrip} />;
      case 'flags':
        return <FlagsInvestigations trips={trips} />;
      case 'reports':
        return <CurrencyFleetReport trips={trips} />;
      case 'system-costs':
        return (
          <SystemCostConfiguration
            currentRates={systemCostRates}
            onUpdateRates={(currency, rates) => {
              setSystemCostRates(prev => ({
                ...prev,
                [currency]: rates,
              }));
            }}
            userRole="admin"
          />
        );
      case 'invoice-aging':
        return <InvoiceAgingDashboard
          trips={trips}
          onViewTrip={setSelectedTrip}
        />;
      case 'customer-retention':
        return <CustomerRetentionDashboard trips={trips} />;
      case 'missed-loads':
        return <MissedLoadsTracker missedLoads={missedLoads} onAddMissedLoad={addMissedLoad} onUpdateMissedLoad={updateMissedLoad} onDeleteMissedLoad={deleteMissedLoad} />;
      case 'diesel-dashboard':
        return <DieselDashboard />;
      default:
        return <YearToDateKPIs trips={trips} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Header currentView={currentView} onNavigate={setCurrentView} onNewTrip={handleNewTrip} />
      <main className="flex-1 p-8 ml-64 w-full">
        {renderContent()}
      </main>
      <Modal
        isOpen={showTripForm}
        onClose={handleCloseTripForm}
        title={editingTrip ? 'Edit Trip' : 'Create New Trip'}
        maxWidth="lg"
      >
        <TripForm
          trip={editingTrip}
          onSubmit={editingTrip ? handleUpdateTrip : handleAddTrip}
          onCancel={handleCloseTripForm}
        />
      </Modal>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;