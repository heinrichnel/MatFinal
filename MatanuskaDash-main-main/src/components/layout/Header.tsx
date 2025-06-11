import React from 'react';
import { Truck, Plus, Flag, CheckCircle, Activity, FileText, BarChart3, Settings, Target, Users, Calendar, DollarSign, Clock, TrendingDown, Upload, Fuel } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onNewTrip: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onNewTrip }) => {
  const navItems = [
    { id: 'ytd-kpis', label: 'YTD KPIs', icon: Target },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'active-trips', label: 'Active Trips', icon: Truck },
    { id: 'completed-trips', label: 'Completed Trips', icon: CheckCircle },
    { id: 'flags', label: 'Flags & Investigations', icon: Flag },
    { id: 'reports', label: 'Reports & Exports', icon: BarChart3 },
    { id: 'system-costs', label: 'System Costs', icon: Settings },
    { id: 'invoice-aging', label: 'Invoice Aging', icon: Clock },
    { id: 'customer-retention', label: 'Customer Retention', icon: Users },
    { id: 'missed-loads', label: 'Missed Loads', icon: TrendingDown },
    { id: 'diesel-dashboard', label: 'Diesel Dashboard', icon: Fuel }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 border-r border-gray-200 bg-white z-10 flex flex-col h-screen">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">TripPro</h1>
          <p className="text-sm text-gray-500">Mtanauska Transport</p>
        </div>
      </div>

      {/* Vertical Nav Items */}
      <nav className="flex flex-col p-2 space-y-1 overflow-y-auto flex-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-md transition-colors
                ${currentView === item.id 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onNewTrip}
          icon={<Plus className="w-4 h-4" />}
          fullWidth
        >
          Add Trip
        </Button>
      </div>
    </aside>
  );
};

export default Header;