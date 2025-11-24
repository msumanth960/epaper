export interface State {
  name: string;
  districts: string[];
}

export interface EPaper {
  id: string;
  date: string;
  state: string;
  district: string;
  editionName: string;
  pdfUrl: string;
  thumbnailUrl: string;
  pageCount: number;
}

export interface Incident {
  id: string;
  title: string;
  state: string;
  district: string;
  category: 'Accident' | 'Crime' | 'Politics' | 'Weather' | 'Other';
  timestamp: string;
  description: string;
  status: 'Reported' | 'Under Review' | 'Resolved';
  reportType: 'Official' | 'Citizen';
}

export const states: State[] = [
  {
    name: 'Telangana',
    districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam']
  },
  {
    name: 'Andhra Pradesh',
    districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kakinada']
  }
];

export const ePapers: EPaper[] = [
  {
    id: 'ep1',
    date: '2025-11-24',
    state: 'Telangana',
    district: 'Hyderabad',
    editionName: 'Hyderabad Morning Edition',
    pdfUrl: '/pdfs/mnadeepam.pdf',
    thumbnailUrl: '/images/hyderabad-morning.jpg',
    pageCount: 12
  },
  {
    id: 'ep2',
    date: '2025-11-24',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    editionName: 'Vizag Daily',
    pdfUrl: '/pdfs/ts-main15.pdf',
    thumbnailUrl: '/images/vizag-daily.jpg',
    pageCount: 16
  },
  {
    id: 'ep3',
    date: '2025-11-24',
    state: 'Andhra Pradesh',
    district: 'Vijayawada',
    editionName: 'Vijayawada Express',
    pdfUrl: '/pdfs/ts-main152.pdf',
    thumbnailUrl: '/images/vijayawada-express.jpg',
    pageCount: 14
  },
  {
    id: 'ep4',
    date: '2025-11-23',
    state: 'Telangana',
    district: 'Warangal',
    editionName: 'Warangal Times',
    pdfUrl: '/pdfs/mnadeepam.pdf',
    thumbnailUrl: '/images/warangal-times.jpg',
    pageCount: 10
  },
  {
    id: 'ep5',
    date: '2025-11-23',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    editionName: 'Guntur Chronicle',
    pdfUrl: '/pdfs/ts-main15.pdf',
    thumbnailUrl: '/images/guntur-chronicle.jpg',
    pageCount: 8
  },
  {
    id: 'ep6',
    date: '2025-11-24',
    state: 'Telangana',
    district: 'Karimnagar',
    editionName: 'Karimnagar Herald',
    pdfUrl: '/pdfs/ts-main152.pdf',
    thumbnailUrl: '/images/karimnagar-herald.jpg',
    pageCount: 10
  }
];

export const incidents: Incident[] = [
  {
    id: 'inc1',
    title: 'Traffic Accident on Banjara Hills Road',
    state: 'Telangana',
    district: 'Hyderabad',
    category: 'Accident',
    timestamp: '2025-11-24T05:30:00',
    description: 'Major traffic accident involving three vehicles on Banjara Hills Road causing severe congestion.',
    status: 'Under Review',
    reportType: 'Citizen'
  },
  {
    id: 'inc2',
    title: 'Heavy Rainfall Warning',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    category: 'Weather',
    timestamp: '2025-11-24T04:00:00',
    description: 'IMD issues heavy rainfall warning for Visakhapatnam and surrounding coastal areas for next 48 hours.',
    status: 'Reported',
    reportType: 'Official'
  },
  {
    id: 'inc3',
    title: 'Municipal Election Results Announced',
    state: 'Andhra Pradesh',
    district: 'Vijayawada',
    category: 'Politics',
    timestamp: '2025-11-23T22:00:00',
    description: 'Municipal corporation election results declared with surprising outcomes in several wards.',
    status: 'Resolved',
    reportType: 'Official'
  },
  {
    id: 'inc4',
    title: 'Theft Reported at Shopping Mall',
    state: 'Telangana',
    district: 'Hyderabad',
    category: 'Crime',
    timestamp: '2025-11-24T01:15:00',
    description: 'Multiple shops in Kukatpally shopping mall reported theft during night hours.',
    status: 'Under Review',
    reportType: 'Citizen'
  },
  {
    id: 'inc5',
    title: 'Road Construction Delays',
    state: 'Telangana',
    district: 'Warangal',
    category: 'Other',
    timestamp: '2025-11-23T18:30:00',
    description: 'Major road construction project facing delays due to material shortage.',
    status: 'Reported',
    reportType: 'Citizen'
  },
  {
    id: 'inc6',
    title: 'Power Outage in Central Areas',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    category: 'Other',
    timestamp: '2025-11-24T06:00:00',
    description: 'Widespread power outage affecting central Guntur areas, restoration work in progress.',
    status: 'Under Review',
    reportType: 'Official'
  },
  {
    id: 'inc7',
    title: 'Cyclone Alert Issued',
    state: 'Andhra Pradesh',
    district: 'Kakinada',
    category: 'Weather',
    timestamp: '2025-11-23T20:00:00',
    description: 'Cyclone warning issued for coastal Andhra Pradesh, residents advised to take precautions.',
    status: 'Resolved',
    reportType: 'Official'
  },
  {
    id: 'inc8',
    title: 'Farmers Protest March',
    state: 'Telangana',
    district: 'Nizamabad',
    category: 'Politics',
    timestamp: '2025-11-24T03:00:00',
    description: 'Large farmers protest march organized demanding better crop prices and support.',
    status: 'Reported',
    reportType: 'Citizen'
  }
];

export const getDistrictsByState = (stateName: string): string[] => {
  const state = states.find(s => s.name === stateName);
  return state ? state.districts : [];
};

export const getTodayEPapers = (): EPaper[] => {
  const today = '2025-11-24';
  return ePapers.filter(ep => ep.date === today);
};

export const getLatestIncidents = (limit: number = 5): Incident[] => {
  return [...incidents]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getIncidentsByStateDistrict = (state: string, district: string): Incident[] => {
  return incidents.filter(inc => inc.state === state && inc.district === district);
};
