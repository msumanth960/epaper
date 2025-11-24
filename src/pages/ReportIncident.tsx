import { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { states, getDistrictsByState, Incident } from '../data/mockData';

const categories = ['Accident', 'Crime', 'Politics', 'Weather', 'Other'];

export default function ReportIncident() {
  const [formData, setFormData] = useState({
    title: '',
    state: '',
    district: '',
    location: '',
    category: '',
    description: '',
    files: [] as File[],
    confirmed: false,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const availableDistricts = useMemo(() => {
    return formData.state ? getDistrictsByState(formData.state) : [];
  }, [formData.state]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      // Reset district if state changes
      if (field === 'state') {
        newData.district = '';
      }
      return newData;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: Array.from(event.target.files!),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.state ||
      !formData.district ||
      !formData.category ||
      !formData.description ||
      !formData.confirmed
    ) {
      return;
    }

    // Simulate adding to incidents (in a real app, this would be sent to backend)
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      title: formData.title,
      state: formData.state,
      district: formData.district,
      category: formData.category as any,
      timestamp: new Date().toISOString(),
      description: formData.description,
      status: 'Reported',
      reportType: 'Citizen',
    };

    console.log('New incident submitted:', newIncident);
    setSnackbarOpen(true);

    // Reset form
    setFormData({
      title: '',
      state: '',
      district: '',
      location: '',
      category: '',
      description: '',
      files: [],
      confirmed: false,
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Report Incident
      </Typography>

      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Submit New Incident Report
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Please provide accurate information about the incident. Your report will be reviewed by our team.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Incident Title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                  placeholder="Brief description of the incident"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  required
                >
                  <MenuItem value="">Select State</MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="District"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  disabled={!formData.state}
                  required
                >
                  <MenuItem value="">Select District</MenuItem>
                  {availableDistricts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location Details"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Specific location, landmark, or address"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  required
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  placeholder="Provide detailed information about the incident"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                >
                  {formData.files.length > 0
                    ? `${formData.files.length} file(s) selected`
                    : 'Upload Images/Videos (Optional)'}
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.confirmed}
                      onChange={(e) => handleChange('confirmed', e.target.checked)}
                      required
                    />
                  }
                  label="I confirm this information is accurate and I understand that false reporting may have legal consequences."
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!formData.confirmed}
                >
                  Submit Incident Report
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Incident submitted for review. Thank you for your report!
        </Alert>
      </Snackbar>
    </Box>
  );
}
