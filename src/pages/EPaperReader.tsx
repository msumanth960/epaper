import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Download as DownloadIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { ePapers, getIncidentsByStateDistrict } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function EPaperReader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const ePaper = ePapers.find((ep) => ep.id === id);

  if (!ePaper) {
    return (
      <Box>
        <Typography variant="h5">E-Paper not found</Typography>
        <Button onClick={() => navigate('/epapers')} sx={{ mt: 2 }}>
          Back to Library
        </Button>
      </Box>
    );
  }

  const relatedIncidents = getIncidentsByStateDistrict(ePaper.state, ePaper.district);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(ePaper.pageCount, prev + 1));
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(200, prev + 10));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(50, prev - 10));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reported':
        return 'warning';
      case 'Under Review':
        return 'info';
      case 'Resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Button
        startIcon={<ChevronLeftIcon />}
        onClick={() => navigate('/epapers')}
        sx={{ mb: 2 }}
      >
        Back to Library
      </Button>

      <Typography variant="h4" gutterBottom>
        {ePaper.editionName}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {ePaper.date} • {ePaper.state} &gt; {ePaper.district}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
        {/* Page List */}
        <Paper sx={{ width: 200, flexShrink: 0, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Pages
          </Typography>
          <List dense>
            {Array.from({ length: ePaper.pageCount }, (_, i) => i + 1).map((page) => (
              <ListItem key={page} disablePadding>
                <ListItemButton
                  selected={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  <DescriptionIcon sx={{ mr: 1, fontSize: 20 }} />
                  <ListItemText primary={`Page ${page}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Main Viewer */}
        <Box sx={{ flexGrow: 1 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="body2">
                Page {currentPage} of {ePaper.pageCount}
              </Typography>
              <IconButton onClick={handleNextPage} disabled={currentPage === ePaper.pageCount}>
                <ChevronRightIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <IconButton onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
              <Typography variant="body2">{zoom}%</Typography>
              <IconButton onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                href={ePaper.pdfUrl}
                download
              >
                Download
              </Button>
            </Box>
          </Paper>

          <Paper
            sx={{
              height: 600,
              bgcolor: 'grey.100',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              component="iframe"
              src={`${ePaper.pdfUrl}#page=${currentPage}&zoom=${zoom}`}
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title={`${ePaper.editionName} - Page ${currentPage}`}
            />
          </Paper>
        </Box>

        {/* Related Incidents */}
        <Paper sx={{ width: 300, flexShrink: 0, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Related Incidents
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {ePaper.state} &gt; {ePaper.district}
          </Typography>
          {relatedIncidents.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              No incidents reported
            </Typography>
          ) : (
            <Box sx={{ mt: 2 }}>
              {relatedIncidents.map((incident) => (
                <Card key={incident.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      {incident.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                      {incident.description.substring(0, 80)}...
                    </Typography>
                    <Chip
                      label={incident.status}
                      size="small"
                      color={getStatusColor(incident.status) as any}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
