import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Paper,
} from '@mui/material';
import { Newspaper as NewspaperIcon } from '@mui/icons-material';
import { ePapers, states, getDistrictsByState } from '../data/mockData';

export default function EPapersLibrary() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    date: '',
    state: '',
    district: '',
    search: '',
  });

  const availableDistricts = useMemo(() => {
    return filters.state ? getDistrictsByState(filters.state) : [];
  }, [filters.state]);

  const filteredEPapers = useMemo(() => {
    return ePapers.filter((paper) => {
      if (filters.date && paper.date !== filters.date) return false;
      if (filters.state && paper.state !== filters.state) return false;
      if (filters.district && paper.district !== filters.district) return false;
      if (
        filters.search &&
        !paper.editionName.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters]);

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        E-Papers Library
      </Typography>

      {/* Filter Bar */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
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
              label="Search by edition name"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* E-Papers Grid */}
      <Typography variant="h6" gutterBottom>
        {filteredEPapers.length} E-Paper{filteredEPapers.length !== 1 ? 's' : ''} Found
      </Typography>
      <Grid container spacing={3}>
        {filteredEPapers.map((paper) => (
          <Grid item xs={12} sm={6} md={4} key={paper.id}>
            <Card>
              <Box
                sx={{
                  height: 200,
                  bgcolor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NewspaperIcon sx={{ fontSize: 80, color: 'grey.600' }} />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {paper.editionName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {paper.date}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Chip label={paper.state} size="small" color="primary" />
                  <Chip label={paper.district} size="small" color="secondary" />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/reader/${paper.id}`)}
                >
                  Open e-paper
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEPapers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No e-papers found matching your filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}
