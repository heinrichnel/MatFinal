import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAppContext } from '../../context/AppContext';
import { Upload, X, FileSpreadsheet, AlertTriangle } from 'lucide-react';

interface DieselImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DieselImportModal: React.FC<DieselImportModalProps> = ({ isOpen, onClose }) => {
  const { importDieselFromCSV } = useAppContext();
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
      
      const records = data.map((row: any) => {
        const kmReading = parseFloat(row.kmReading || row.km || '0');
        const previousKmReading = parseFloat(row.previousKmReading || row.previousKm || '0');
        const litresFilled = parseFloat(row.litresFilled || row.litres || '0');
        const costPerLitre = parseFloat(row.costPerLitre || row.pricePerLitre || '0');
        const totalCost = parseFloat(row.totalCost || row.cost || '0');
        
        // Calculate derived values
        const distanceTravelled = previousKmReading > 0 ? kmReading - previousKmReading : 0;
        const kmPerLitre = distanceTravelled > 0 && litresFilled > 0 ? distanceTravelled / litresFilled : 0;
        const calculatedCostPerLitre = litresFilled > 0 ? totalCost / litresFilled : costPerLitre;

        return {
          fleetNumber: row.fleetNumber || row.fleet || '',
          date: row.date || '',
          kmReading,
          litresFilled,
          costPerLitre: calculatedCostPerLitre,
          totalCost,
          fuelStation: row.fuelStation || row.station || '',
          driverName: row.driverName || row.driver || '',
          notes: row.notes || '',
          previousKmReading: previousKmReading > 0 ? previousKmReading : undefined,
          distanceTravelled: distanceTravelled > 0 ? distanceTravelled : undefined,
          kmPerLitre: kmPerLitre > 0 ? kmPerLitre : undefined
        };
      });

      importDieselFromCSV(records);
      alert(`Successfully imported ${records.length} diesel records from CSV file.\n\nAll KM/L calculations and efficiency metrics have been automatically computed.`);
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Import Diesel Records from CSV" maxWidth="lg">
      <div className="space-y-6">
        {/* Enhanced CSV Format Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">CSV Format Requirements</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <p>Your CSV file should include the following columns (all calculations will be done automatically):</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="font-medium text-blue-800 mb-1">Required Fields:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>fleetNumber</strong> - Fleet identifier (e.g., "6H", "26H")</li>
                  <li><strong>date</strong> - Date of fuel purchase (YYYY-MM-DD)</li>
                  <li><strong>kmReading</strong> - Current kilometer reading</li>
                  <li><strong>litresFilled</strong> - Liters of fuel purchased</li>
                  <li><strong>totalCost</strong> - Total cost of fuel</li>
                  <li><strong>fuelStation</strong> - Name of fuel station</li>
                  <li><strong>driverName</strong> - Driver name</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-blue-800 mb-1">Optional Fields:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>previousKmReading</strong> - Previous km reading</li>
                  <li><strong>costPerLitre</strong> - Price per liter</li>
                  <li><strong>notes</strong> - Additional notes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Automatic Calculations Info */}
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">Automatic Calculations</h4>
          <div className="text-sm text-green-700 space-y-1">
            <p>The system will automatically calculate:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Distance Travelled:</strong> Current KM - Previous KM</li>
              <li><strong>KM per Litre:</strong> Distance ÷ Litres Filled</li>
              <li><strong>Cost per Litre:</strong> Total Cost ÷ Litres (if not provided)</li>
              <li><strong>Cost per KM:</strong> Total Cost ÷ Distance</li>
              <li><strong>Efficiency Variance:</strong> Compared to fleet norms</li>
              <li><strong>Performance Status:</strong> Excellent/Normal/Poor classification</li>
            </ul>
          </div>
        </div>

        {/* Debrief System Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">Automatic Debrief System</h4>
              <p className="text-sm text-amber-700 mt-1">
                Records that exceed efficiency tolerance limits will be automatically flagged for debrief. 
                You can configure tolerance ranges for each fleet in the dashboard settings.
              </p>
            </div>
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

        {/* Sample Data Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Sample CSV Format:</h4>
          <div className="text-xs font-mono bg-white p-3 rounded border overflow-x-auto">
            <div className="whitespace-nowrap">
              fleetNumber,date,kmReading,previousKmReading,litresFilled,totalCost,fuelStation,driverName,notes
            </div>
            <div className="whitespace-nowrap text-gray-600">
              6H,2025-01-15,125000,123560,450,8325,RAM Petroleum Harare,Enock Mukonyerwa,Full tank
            </div>
            <div className="whitespace-nowrap text-gray-600">
              26H,2025-01-16,89000,87670,380,7296,Engen Beitbridge,Jonathan Bepete,Border crossing
            </div>
          </div>
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
            {isProcessing ? 'Importing & Calculating...' : 'Import & Calculate'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DieselImportModal;