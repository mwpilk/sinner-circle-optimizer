import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Grid,
  Divider
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ImpactIndicator = ({ value, label, color }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      {label}
    </Typography>
    <LinearProgress
      variant="determinate"
      value={value * 100}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: `${color}22`,
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
        },
      }}
    />
  </Box>
);

const OptimizationResults = ({ results }) => {
  const {
    timeSavings,
    efficiency,
    ecoImpact,
    context
  } = results;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Optimization Results
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Time & Cost Savings
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={`${timeSavings.timeSaved} minutes saved per cleaning`}
            color="primary"
          />
          <Chip
            icon={<TrendingUpIcon />}
            label={`${timeSavings.percentageImprovement}% more efficient`}
            color="success"
          />
          <Chip
            icon={<AttachMoneyIcon />}
            label={`$${timeSavings.costSavingsPerCleaning} saved per cleaning`}
            color="success"
            variant="outlined"
          />
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <Typography variant="body2" color="text.secondary">
                Current Labor Cost
              </Typography>
              <Typography variant="h6" color="error">
                ${timeSavings.currentLaborCost}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per cleaning
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
              <Typography variant="body2" color="text.secondary">
                Optimized Labor Cost
              </Typography>
              <Typography variant="h6" color="success.main">
                ${timeSavings.optimizedLaborCost}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per cleaning
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Efficiency Scores
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Current Efficiency
            </Typography>
            <LinearProgress
              variant="determinate"
              value={efficiency.current}
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {Math.round(efficiency.current)}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Optimized Efficiency
            </Typography>
            <LinearProgress
              variant="determinate"
              value={efficiency.optimized}
              color="success"
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {Math.round(efficiency.optimized)}%
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <LeafIcon sx={{ mr: 1 }} />
          Environmental Impact
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Current Impact
            </Typography>
            <ImpactIndicator
              value={ecoImpact.current.energy}
              label="Energy Usage"
              color="#ff9800"
            />
            <ImpactIndicator
              value={ecoImpact.current.water}
              label="Water Usage"
              color="#2196f3"
            />
            <ImpactIndicator
              value={ecoImpact.current.chemical}
              label="Chemical Usage"
              color="#f44336"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Optimized Impact
            </Typography>
            <ImpactIndicator
              value={ecoImpact.optimized.energy}
              label="Energy Usage"
              color="#ff9800"
            />
            <ImpactIndicator
              value={ecoImpact.optimized.water}
              label="Water Usage"
              color="#2196f3"
            />
            <ImpactIndicator
              value={ecoImpact.optimized.chemical}
              label="Chemical Usage"
              color="#f44336"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Context Analysis
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Industry Profile:</strong> {context.industryProfile}
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Method Profile:</strong> {context.methodProfile}
        </Typography>
        <Typography variant="body2">
          <strong>Surface Type Detected:</strong> {context.surfaceType}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OptimizationResults;
