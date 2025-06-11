import { Trip, CostEntry, Attachment } from '../types';

export const mockTrips: Trip[] = [
  {
    id: 'T001',
    fleetNumber: '6H',
    driverName: 'Enock Mukonyerwa',
    clientName: 'Teralco',
    clientType: 'external',
    startDate: '2025-01-01',
    endDate: '2025-01-05',
    route: 'Johannesburg to Cape Town',
    description: 'Regular delivery route with machinery transport',
    baseRevenue: 45000,
    revenueCurrency: 'ZAR',
    distanceKm: 1400,
    status: 'active',
    paymentStatus: 'unpaid',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: [],
    // NEW: Planning timestamps
    plannedArrivalDateTime: '2025-01-05T08:00',
    plannedOffloadDateTime: '2025-01-05T10:00',
    plannedDepartureDateTime: '2025-01-05T12:00',
    actualArrivalDateTime: '2025-01-05T09:30',
    actualOffloadDateTime: '2025-01-05T11:45',
    actualDepartureDateTime: '2025-01-05T13:15'
  },
  {
    id: 'T002',
    fleetNumber: '26H',
    driverName: 'Jonathan Bepete',
    clientName: 'SPF',
    clientType: 'external',
    startDate: '2025-01-03',
    endDate: '2025-01-08',
    route: 'Beitbridge to Johannesburg',
    description: 'Cross-border freight with clearing requirements',
    baseRevenue: 8500,
    revenueCurrency: 'USD',
    distanceKm: 580,
    status: 'active',
    paymentStatus: 'unpaid',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: []
  },
  {
    id: 'T003',
    fleetNumber: '22H',
    driverName: 'Lovemore Qochiwe',
    clientName: 'National foods',
    clientType: 'internal',
    startDate: '2024-12-15',
    endDate: '2024-12-18',
    route: 'Cape Town to Johannesburg',
    description: 'Return trip with food products',
    baseRevenue: 38000,
    revenueCurrency: 'ZAR',
    distanceKm: 1400,
    status: 'invoiced',
    paymentStatus: 'unpaid',
    completedAt: '2024-12-20',
    completedBy: 'Fleet Manager',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: [],
    // NEW: Invoice details
    invoiceNumber: 'INV-2024-001',
    invoiceDate: '2024-12-21',
    invoiceDueDate: '2025-01-20'
  },
  {
    id: 'T004',
    fleetNumber: 'UD',
    driverName: 'Peter Farai',
    clientName: 'Dp World',
    clientType: 'external',
    startDate: '2024-12-10',
    endDate: '2024-12-12',
    route: 'Durban to Johannesburg',
    description: 'Container transport from port',
    baseRevenue: 6200,
    revenueCurrency: 'USD',
    distanceKm: 560,
    status: 'paid',
    paymentStatus: 'paid',
    completedAt: '2024-12-15',
    completedBy: 'Operations Manager',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: [],
    // NEW: Invoice and payment details
    invoiceNumber: 'INV-2024-002',
    invoiceDate: '2024-12-16',
    invoiceDueDate: '2024-12-30',
    paymentReceivedDate: '2024-12-28'
  },
  {
    id: 'T005',
    fleetNumber: '29H',
    driverName: 'Phillimon Kwarire',
    clientName: 'Aspen',
    clientType: 'external',
    startDate: '2024-12-20',
    endDate: '2024-12-23',
    route: 'Johannesburg to Durban',
    description: 'Pharmaceutical delivery',
    baseRevenue: 25000,
    revenueCurrency: 'ZAR',
    distanceKm: 560,
    status: 'invoiced',
    paymentStatus: 'partial',
    completedAt: '2024-12-25',
    completedBy: 'Depot Manager',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: [],
    // NEW: Invoice details with aging
    invoiceNumber: 'INV-2024-003',
    invoiceDate: '2024-12-26',
    invoiceDueDate: '2025-01-15'
  },
  {
    id: 'T006',
    fleetNumber: '30H',
    driverName: 'Taurayi Vherenaisi',
    clientName: 'Feedmix',
    clientType: 'internal',
    startDate: '2025-01-05',
    endDate: '2025-01-07',
    route: 'Harare to Bulawayo',
    description: 'Animal feed transport',
    baseRevenue: 15000,
    revenueCurrency: 'ZAR',
    distanceKm: 440,
    status: 'active',
    paymentStatus: 'unpaid',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: []
  },
  {
    id: 'T007',
    fleetNumber: '4H',
    driverName: 'Adrian Moyo',
    clientName: 'Massmart',
    clientType: 'external',
    startDate: '2025-01-02',
    endDate: '2025-01-04',
    route: 'Johannesburg to Pretoria',
    description: 'Retail goods delivery',
    baseRevenue: 3500,
    revenueCurrency: 'USD',
    distanceKm: 60,
    status: 'active',
    paymentStatus: 'unpaid',
    costs: [],
    additionalCosts: [],
    delayReasons: [],
    followUpHistory: []
  }
];

export const mockCostEntries: CostEntry[] = [
  // Trip T001 costs (ZAR) - Active trip with some flagged items
  {
    id: 'C001',
    tripId: 'T001',
    category: 'Diesel',
    subCategory: 'RAM Petroleum Harare - Horse',
    amount: 4500.75,
    currency: 'ZAR',
    referenceNumber: 'INV-D456',
    date: '2025-01-01',
    notes: 'Full tank at departure',
    attachments: [
      {
        id: 'A001',
        costEntryId: 'C001',
        filename: 'diesel_receipt_001.pdf',
        fileUrl: '#',
        fileType: 'application/pdf',
        fileSize: 245760,
        uploadedAt: '2025-01-01T10:30:00Z'
      }
    ],
    isFlagged: false,
    isSystemGenerated: false
  },
  {
    id: 'C002',
    tripId: 'T001',
    category: 'Tolls',
    subCategory: 'Tolls Cape Town to JHB',
    amount: 950.00,
    currency: 'ZAR',
    referenceNumber: 'TOLL-123',
    date: '2025-01-02',
    notes: 'All tolls combined for route',
    attachments: [],
    isFlagged: true,
    flagReason: 'Missing documentation',
    noDocumentReason: 'Receipt lost during trip',
    investigationStatus: 'pending',
    flaggedAt: '2025-01-02T10:30:00Z',
    flaggedBy: 'System Auto-Flag',
    isSystemGenerated: false
  },
  {
    id: 'C003',
    tripId: 'T001',
    category: 'Trip Allowances',
    subCategory: 'Food',
    amount: 800.00,
    currency: 'ZAR',
    referenceNumber: 'ALLOW-001',
    date: '2025-01-01',
    notes: 'Driver meal allowance for 5 days',
    attachments: [
      {
        id: 'A002',
        costEntryId: 'C003',
        filename: 'food_allowance_receipt.jpg',
        fileUrl: '#',
        fileType: 'image/jpeg',
        fileSize: 156432,
        uploadedAt: '2025-01-01T18:45:00Z'
      }
    ],
    isFlagged: false,
    isSystemGenerated: false
  }
];

// Merge the cost entries with their respective trips
mockTrips.forEach(trip => {
  trip.costs = mockCostEntries.filter(cost => cost.tripId === trip.id);
});

export const mockAttachments: Attachment[] = [
  {
    id: 'A001',
    costEntryId: 'C001',
    filename: 'diesel_receipt_001.pdf',
    fileUrl: '#',
    fileType: 'application/pdf',
    fileSize: 245760,
    uploadedAt: '2025-01-01T10:30:00Z'
  },
  {
    id: 'A002',
    costEntryId: 'C003',
    filename: 'food_allowance_receipt.jpg',
    fileUrl: '#',
    fileType: 'image/jpeg',
    fileSize: 156432,
    uploadedAt: '2025-01-01T18:45:00Z'
  }
];