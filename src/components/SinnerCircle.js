import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Tooltip } from '@mui/material';
import SinnerRadarChart from './RadarChart';
import './SinnerCircle.css';

const factorIcons = {
  temperature: '🌡️',
  chemical: '⚗️',
  mechanical: '⚙️',
  time: '⏱️'
};

const factorDescriptions = {
  temperature: 'Higher temperature generally increases cleaning effectiveness but consumes more energy',
  chemical: 'Chemical concentration affects cleaning power and environmental impact',
  mechanical: 'Mechanical action through pressure or scrubbing',
  time: 'Duration of the cleaning process'
};

const SinnerCircle = ({ factors, onFactorsChange, optimizedFactors, showEcoImpact }) => {
  const [totalExceeded, setTotalExceeded] = useState(false);

  useEffect(() => {
    const total = Object.values(factors).reduce((sum, value) => sum + value, 0);
    setTotalExceeded(total > 300);
  }, [factors]);

  const handleFactorChange = (factor, value) => {
    onFactorsChange({
      ...factors,
      [factor]: value
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Sinner Circle Parameters
      </Typography>

      {totalExceeded && (
        <div className="alert-bar">
          ⚠️ Total factor values exceed optimal balance. Consider reducing some parameters.
        </div>
      )}

      <div className="factors-grid">
        {Object.entries(factors).map(([factor, value]) => (
          <div key={factor} className="factor-control">
            <div className="factor-header">
              <span className="factor-icon">{factorIcons[factor]}</span>
              <Tooltip title={factorDescriptions[factor]} arrow placement="top">
                <Typography variant="subtitle1" component="label">
                  {factor.charAt(0).toUpperCase() + factor.slice(1)}
                </Typography>
              </Tooltip>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => handleFactorChange(factor, parseInt(e.target.value))}
            />
            
            <div className="factor-value">
              <span>Current: {value}%</span>
              {optimizedFactors && (
                <span>Recommended: {optimizedFactors[factor]}%</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Factor Balance Visualization
        </Typography>
        <div className="chart-container">
          <SinnerRadarChart
            currentFactors={factors}
            recommendedFactors={optimizedFactors || {}}
          />
        </div>
      </Box>

      {showEcoImpact && optimizedFactors && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Optimization Impact
          </Typography>
          <div className="optimization-impact">
            {Object.entries(factors).map(([factor, value]) => {
              const diff = optimizedFactors[factor] - value;
              const isImprovement = Math.abs(diff) > 5;
              if (!isImprovement) return null;
              
              return (
                <div key={factor} className="impact-item">
                  <span className="impact-icon">{factorIcons[factor]}</span>
                  <span className="impact-text">
                    {factor.charAt(0).toUpperCase() + factor.slice(1)}:{' '}
                    <strong className={diff > 0 ? 'increase' : 'decrease'}>
                      {diff > 0 ? '+' : ''}{diff}%
                    </strong>
                  </span>
                </div>
              );
            })}
          </div>
        </Box>
      )}
    </Paper>
  );
};

export default SinnerCircle;
