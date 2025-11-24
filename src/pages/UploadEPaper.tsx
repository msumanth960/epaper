import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { states, getDistrictsByState, EPaper } from '../data/mockData';

export default function UploadEPaper() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    state: '',
    district: '',
    editionName: '',
    file: null as File | null,
  });

  const [recentUploads, setRecentUploads] = useState<EPaper[]>([]);
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
    if (event.target.files && event.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: event.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.state || !formData.district || !formData.editionName) {
      return;
    }

    const newEPaper: EPaper = {
      id: `ep-${Date.now()}`,
      date: formData.date,
      state: formData.state,
      district: formData.district,
      editionName: formData.editionName,
      pdfUrl: `/dummy/${formData.editionName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      thumbnailUrl: `/dummy/thumb-${Date.now()}.jpg`,
      pageCount: 12,
    };

    setRecentUploads((prev) => [newEPaper, ...prev].slice(0, 5));
    setSnackbarOpen(true);

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      state: '',
      district: '',
      editionName: '',
      file: null,
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upload E-Paper
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload New E-Paper
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                    label="Edition Name"
                    value={formData.editionName}
                    onChange={(e) => handleChange('editionName', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    {formData.file ? formData.file.name : 'Upload PDF'}
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                  >
                    Upload E-Paper
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Uploads
            </Typography>
            {recentUploads.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No recent uploads yet
              </Typography>
            ) : (
              <List>
                {recentUploads.map((upload) => (
                  <ListItem key={upload.id} divider>
                    <ListItemText
                      primary={upload.editionName}
                      secondary={`${upload.date} • ${upload.state} > ${upload.district}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

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
          E-paper uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
