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
  Paper,
} from '@mui/material';
import {
  Newspaper as NewspaperIcon,
  Report as ReportIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { getTodayEPapers, getLatestIncidents, incidents } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const navigate = useNavigate();
  const todayEPapers = getTodayEPapers();
  const latestIncidents = getLatestIncidents(5);

  const todayIncidentsCount = incidents.filter(
    inc => inc.timestamp.startsWith('2025-11-24')
  ).length;

  const incidentsByState = incidents.reduce((acc, inc) => {
    acc[inc.state] = (acc[inc.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topState = Object.entries(incidentsByState).sort((a, b) => b[1] - a[1])[0];

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
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <NewspaperIcon sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4">{todayEPapers.length}</Typography>
              <Typography variant="body2">E-Papers Today</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <ReportIcon sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4">{todayIncidentsCount}</Typography>
              <Typography variant="body2">Incidents Today</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h4">{topState?.[0] || 'N/A'}</Typography>
              <Typography variant="body2">Top Active State</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Today's E-Papers */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Today's E-Papers
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          mb: 4,
        }}
      >
        {todayEPapers.map((paper) => (
          <Card key={paper.id} sx={{ minWidth: 280, flexShrink: 0 }}>
            <Box
              component="img"
              src={paper.thumbnailUrl}
              alt={paper.editionName}
              sx={{
                height: 140,
                width: '100%',
                objectFit: 'cover',
              }}
            />
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
                onClick={() => navigate(`/reader/${paper.id}`)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Read
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Latest Incidents */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Latest Incidents
      </Typography>
      <Grid container spacing={2}>
        {latestIncidents.map((incident) => (
          <Grid item xs={12} md={6} key={incident.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {incident.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {incident.state} &gt; {incident.district}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                  {incident.description}
                </Typography>
                <Chip
                  label={incident.status}
                  size="small"
                  color={getStatusColor(incident.status) as any}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
