import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Input } from '../ui/FormElements';
import { Upload, X } from 'lucide-react';

interface LoadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadImportModal: React.FC<LoadImportModalProps> = ({ isOpen, onClose }) => {
  const { importTripsFromCSV } = useAppContext();
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setCsvFile(e.target.files[0]);
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }
    
    return data;
  };

  const handleImport = async () => {
    if (!csvFile) return;

    setIsProcessing(true);
    
    try {
      const text = await csvFile.text();
      const data = parseCSV(text);
      
      const trips = data.map((row: any) => ({
        fleetNumber: row.fleetNumber || row.fleet || '',
        route: row.route || '',
        clientName: row.clientName || row.client || '',
        baseRevenue: parseFloat(row.baseRevenue || row.revenue || '0'),
        revenueCurrency: row.revenueCurrency || row.currency || 'ZAR',
        startDate: row.startDate || '',
        endDate: row.endDate || '',
        driverName: row.driverName || row.driver || '',
        distanceKm: parseFloat(row.distanceKm || row.distance || '0'),
        clientType: row.clientType || 'external',
        description: row.description || ''
      }));

      importTripsFromCSV(trips);
      alert(`Successfully imported ${trips.length} trips from CSV file.`);
      onClose();
    } catch (error) {
      console.error('Failed to import CSV:', error);
      alert('Failed to import CSV file. Please check the file format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setCsvFile(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Import Trips from CSV" maxWidth="md">
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">CSV Format Requirements</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>Your CSV file should include the following columns:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>fleetNumber</strong> - Fleet identifier (e.g., "6H", "26H")</li>
              <li><strong>driverName</strong> - Driver name</li>
              <li><strong>clientName</strong> - Client/customer name</li>
              <li><strong>route</strong> - Trip route description</li>
              <li><strong>baseRevenue</strong> - Revenue amount (numeric)</li>
              <li><strong>revenueCurrency</strong> - Currency (USD or ZAR)</li>
              <li><strong>startDate</strong> - Start date (YYYY-MM-DD)</li>
              <li><strong>endDate</strong> - End date (YYYY-MM-DD)</li>
              <li><strong>distanceKm</strong> - Distance in kilometers (optional)</li>
              <li><strong>clientType</strong> - "internal" or "external" (optional)</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:text-sm file:font-medium 
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                file:cursor-pointer cursor-pointer"
            />
          </div>

          {csvFile && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Selected: {csvFile.name}
                </span>
                <span className="text-sm text-green-600">
                  ({(csvFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
            icon={<X className="w-4 h-4" />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!csvFile || isProcessing}
            isLoading={isProcessing}
            icon={<Upload className="w-4 h-4" />}
          >
            {isProcessing ? 'Importing...' : 'Import Trips'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoadImportModal;