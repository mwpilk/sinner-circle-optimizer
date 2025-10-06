import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
  Button,
  Switch,
  FormControlLabel
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import './App.css';

import SinnerCircle from './components/SinnerCircle';
import CleaningForm from './components/CleaningForm';
import OptimizationResults from './components/OptimizationResults';
import { optimizeCleaningProcess } from './utils/sinnerEngine';

function App() {
  const [showEcoImpact, setShowEcoImpact] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [currentFactors, setCurrentFactors] = useState({
    temperature: 50,
    chemical: 50,
    mechanical: 50,
    time: 50
  });

  const handleAnalyze = (formData) => {
    const results = optimizeCleaningProcess({
      ...formData,
      currentFactors
    });
    setOptimizationResults(results);
  };

  const handleExport = () => {
    if (!optimizationResults) return;

    const report = {
      timestamp: new Date().toISOString(),
      input: {
        currentFactors,
        ...optimizationResults
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sinner-circle-optimization-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleHelp = () => {
    window.open('https://en.wikipedia.org/wiki/Sinner%27s_circle', '_blank');
  };

  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sinner Circle Optimizer – Pro
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showEcoImpact}
                onChange={(e) => setShowEcoImpact(e.target.checked)}
                color="default"
              />
            }
            label="Show Eco Impact"
            sx={{ color: 'white', mr: 2 }}
          />
          <Button
            startIcon={<FileDownloadIcon />}
            color="inherit"
            onClick={handleExport}
            disabled={!optimizationResults}
          >
            Export Report
          </Button>
          <IconButton color="inherit" onClick={handleHelp}>
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sinner Circle Optimizer – Pro
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Optimize your cleaning efficiency with real science
          </Typography>
        </Box>

        <CleaningForm onAnalyze={handleAnalyze} />

        <SinnerCircle
          factors={currentFactors}
          onFactorsChange={setCurrentFactors}
          optimizedFactors={optimizationResults?.optimizedFactors}
          showEcoImpact={showEcoImpact}
        />

        {optimizationResults && (
          <OptimizationResults results={optimizationResults} />
        )}
      </Container>
    </div>
  );
}

export default App;
