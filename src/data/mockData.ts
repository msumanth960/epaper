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
    name: 'Maharashtra',
    districts: ['Pune', 'Nagpur', 'Mumbai']
  },
  {
    name: 'Karnataka',
    districts: ['Bengaluru', 'Mysuru']
  },
  {
    name: 'Gujarat',
    districts: ['Ahmedabad']
  }
];

export const ePapers: EPaper[] = [
  {
    id: 'ep1',
    date: '2025-11-24',
    state: 'Maharashtra',
    district: 'Pune',
    editionName: 'Pune Morning Edition',
    pdfUrl: '/dummy/pune-morning.pdf',
    thumbnailUrl: '/dummy/thumb1.jpg',
    pageCount: 12
  },
  {
    id: 'ep2',
    date: '2025-11-24',
    state: 'Maharashtra',
    district: 'Mumbai',
    editionName: 'Mumbai Daily',
    pdfUrl: '/dummy/mumbai-daily.pdf',
    thumbnailUrl: '/dummy/thumb2.jpg',
    pageCount: 16
  },
  {
    id: 'ep3',
    date: '2025-11-24',
    state: 'Karnataka',
    district: 'Bengaluru',
    editionName: 'Bengaluru Express',
    pdfUrl: '/dummy/bengaluru-express.pdf',
    thumbnailUrl: '/dummy/thumb3.jpg',
    pageCount: 14
  },
  {
    id: 'ep4',
    date: '2025-11-23',
    state: 'Gujarat',
    district: 'Ahmedabad',
    editionName: 'Ahmedabad Times',
    pdfUrl: '/dummy/ahmedabad-times.pdf',
    thumbnailUrl: '/dummy/thumb4.jpg',
    pageCount: 10
  },
  {
    id: 'ep5',
    date: '2025-11-23',
    state: 'Maharashtra',
    district: 'Nagpur',
    editionName: 'Nagpur Chronicle',
    pdfUrl: '/dummy/nagpur-chronicle.pdf',
    thumbnailUrl: '/dummy/thumb5.jpg',
    pageCount: 8
  },
  {
    id: 'ep6',
    date: '2025-11-24',
    state: 'Karnataka',
    district: 'Mysuru',
    editionName: 'Mysuru Herald',
    pdfUrl: '/dummy/mysuru-herald.pdf',
    thumbnailUrl: '/dummy/thumb6.jpg',
    pageCount: 10
  }
];

export const incidents: Incident[] = [
  {
    id: 'inc1',
    title: 'Traffic Accident on MG Road',
    state: 'Karnataka',
    district: 'Bengaluru',
    category: 'Accident',
    timestamp: '2025-11-24T05:30:00',
    description: 'Major traffic accident involving three vehicles on MG Road causing severe congestion.',
    status: 'Under Review',
    reportType: 'Citizen'
  },
  {
    id: 'inc2',
    title: 'Heavy Rainfall Warning',
    state: 'Maharashtra',
    district: 'Mumbai',
    category: 'Weather',
    timestamp: '2025-11-24T04:00:00',
    description: 'IMD issues heavy rainfall warning for Mumbai and surrounding areas for next 48 hours.',
    status: 'Reported',
    reportType: 'Official'
  },
  {
    id: 'inc3',
    title: 'Local Election Results Announced',
    state: 'Gujarat',
    district: 'Ahmedabad',
    category: 'Politics',
    timestamp: '2025-11-23T22:00:00',
    description: 'Municipal corporation election results declared with surprising outcomes in several wards.',
    status: 'Resolved',
    reportType: 'Official'
  },
  {
    id: 'inc4',
    title: 'Theft Reported at Commercial Complex',
    state: 'Maharashtra',
    district: 'Pune',
    category: 'Crime',
    timestamp: '2025-11-24T01:15:00',
    description: 'Multiple shops in Aundh commercial complex reported theft during night hours.',
    status: 'Under Review',
    reportType: 'Citizen'
  },
  {
    id: 'inc5',
    title: 'Road Construction Delays',
    state: 'Karnataka',
    district: 'Mysuru',
    category: 'Other',
    timestamp: '2025-11-23T18:30:00',
    description: 'Major road construction project facing delays due to material shortage.',
    status: 'Reported',
    reportType: 'Citizen'
  },
  {
    id: 'inc6',
    title: 'Power Outage in Central Areas',
    state: 'Maharashtra',
    district: 'Nagpur',
    category: 'Other',
    timestamp: '2025-11-24T06:00:00',
    description: 'Widespread power outage affecting central Nagpur areas, restoration work in progress.',
    status: 'Under Review',
    reportType: 'Official'
  },
  {
    id: 'inc7',
    title: 'Cyclone Alert Issued',
    state: 'Gujarat',
    district: 'Ahmedabad',
    category: 'Weather',
    timestamp: '2025-11-23T20:00:00',
    description: 'Cyclone warning issued for coastal Gujarat, residents advised to take precautions.',
    status: 'Resolved',
    reportType: 'Official'
  },
  {
    id: 'inc8',
    title: 'Protest March Downtown',
    state: 'Maharashtra',
    district: 'Mumbai',
    category: 'Politics',
    timestamp: '2025-11-24T03:00:00',
    description: 'Large protest march organized downtown demanding policy changes.',
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
