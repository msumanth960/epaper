import { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Paper,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { incidents, states, getDistrictsByState } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

type TabValue = 'all' | 'official' | 'citizen';

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    dateFrom: '',
    dateTo: '',
  });

  const availableDistricts = useMemo(() => {
    return filters.state ? getDistrictsByState(filters.state) : [];
  }, [filters.state]);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      // Tab filter
      if (activeTab === 'official' && incident.reportType !== 'Official') return false;
      if (activeTab === 'citizen' && incident.reportType !== 'Citizen') return false;

      // State filter
      if (filters.state && incident.state !== filters.state) return false;

      // District filter
      if (filters.district && incident.district !== filters.district) return false;

      // Date range filter
      if (filters.dateFrom && incident.timestamp < filters.dateFrom) return false;
      if (filters.dateTo && incident.timestamp > filters.dateTo + 'T23:59:59') return false;

      return true;
    });
  }, [activeTab, filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [field]: value };
      // Reset district if state changes
      if (field === 'state') {
        newFilters.district = '';
      }
      return newFilters;
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Accident':
        return 'error';
      case 'Crime':
        return 'warning';
      case 'Politics':
        return 'info';
      case 'Weather':
        return 'primary';
      case 'Other':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        News Feed
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="All News" value="all" />
          <Tab label="Official Reports" value="official" />
          <Tab label="Citizen Reports" value="citizen" />
        </Tabs>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="State"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
            >
              <MenuItem value="">All States</MenuItem>
              {states.map((state) => (
                <MenuItem key={state.name} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="District"
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              disabled={!filters.state}
            >
              <MenuItem value="">All Districts</MenuItem>
              {availableDistricts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Incident Cards */}
      <Typography variant="h6" gutterBottom>
        {filteredIncidents.length} Incident{filteredIncidents.length !== 1 ? 's' : ''} Found
      </Typography>
      <Grid container spacing={2}>
        {filteredIncidents.map((incident) => (
          <Grid item xs={12} key={incident.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6">
                    {incident.title}
                  </Typography>
                  <Chip
                    label={incident.category}
                    size="small"
                    color={getCategoryColor(incident.category) as any}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {incident.state} &gt; {incident.district}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })} • {incident.reportType} Report
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                  {incident.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton size="small" color="primary">
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <CommentIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredIncidents.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No incidents found matching your filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}
