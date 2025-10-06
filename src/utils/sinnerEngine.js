// Industry-specific base weightings
const industryWeightings = {
  agriculture: {
    temperature: 60,
    chemical: 70,
    mechanical: 80,
    time: 40,
    description: 'Heavy organic matter, outdoor conditions'
  },
  automotive: {
    temperature: 50,
    chemical: 75,
    mechanical: 85,
    time: 40,
    description: 'Oil, grease, road grime removal'
  },
  construction: {
    temperature: 45,
    chemical: 65,
    mechanical: 90,
    time: 50,
    description: 'Concrete, dust, heavy materials'
  },
  contractCleaning: {
    temperature: 40,
    chemical: 60,
    mechanical: 70,
    time: 80,
    description: 'Variable surfaces, general maintenance'
  },
  foodBeverage: {
    temperature: 75,
    chemical: 80,
    mechanical: 60,
    time: 35,
    description: 'Sanitation critical, organic residues'
  },
  marine: {
    temperature: 45,
    chemical: 85,
    mechanical: 75,
    time: 45,
    description: 'Salt exposure, marine growth'
  },
  government: {
    temperature: 50,
    chemical: 60,
    mechanical: 65,
    time: 75,
    description: 'Public spaces, varied surfaces'
  },
  education: {
    temperature: 45,
    chemical: 55,
    mechanical: 60,
    time: 90,
    description: 'High traffic areas, safety focus'
  }
};

// Method-specific modifiers
const methodModifiers = {
  handBucket: {
    temperature: 0.8,
    chemical: 1.0,
    mechanical: 0.7,
    time: 1.3,
    description: 'Manual cleaning with basic tools'
  },
  pressureWasher: {
    temperature: 0.9,
    chemical: 0.8,
    mechanical: 1.5,
    time: 0.7,
    description: 'High pressure water cleaning'
  },
  steamCleaning: {
    temperature: 1.8,
    chemical: 0.6,
    mechanical: 0.9,
    time: 0.8,
    description: 'High temperature vapor cleaning'
  },
  foamLance: {
    temperature: 0.9,
    chemical: 1.4,
    mechanical: 0.8,
    time: 0.9,
    description: 'Chemical foam application'
  },
  cip: {
    temperature: 1.2,
    chemical: 1.3,
    mechanical: 1.1,
    time: 0.6,
    description: 'Automated cleaning system'
  },
  automaticWasher: {
    temperature: 1.1,
    chemical: 1.2,
    mechanical: 1.3,
    time: 0.7,
    description: 'Machine-based cleaning'
  }
};

// Surface type keywords and their modifiers
const surfaceModifiers = {
  metal: { chemical: 1.2, mechanical: 0.9 },
  plastic: { chemical: 0.8, mechanical: 0.7 },
  glass: { chemical: 0.9, mechanical: 0.6 },
  concrete: { chemical: 1.1, mechanical: 1.3 },
  wood: { chemical: 0.7, mechanical: 0.6 },
  fabric: { chemical: 1.0, mechanical: 0.5 },
  ceramic: { chemical: 0.9, mechanical: 0.8 },
  rubber: { chemical: 0.8, mechanical: 0.9 }
};

// Calculate cleaning efficiency score
const calculateEfficiencyScore = (factors) => {
  const { temperature, chemical, mechanical, time } = factors;
  
  // Base efficiency calculation using weighted multiplication
  const baseScore = (
    (temperature * 0.25) *
    (chemical * 0.3) *
    (mechanical * 0.25) *
    (time * 0.2)
  ) / 1000; // Normalize to 0-100 scale
  
  return Math.min(100, baseScore);
};

// Calculate time savings potential
const calculateTimeSavings = (currentTime, currentFactors, optimizedFactors, laborCostPerHour) => {
  const currentEfficiency = calculateEfficiencyScore(currentFactors);
  const optimizedEfficiency = calculateEfficiencyScore(optimizedFactors);
  
  const improvementRatio = optimizedEfficiency / currentEfficiency;
  const estimatedNewTime = currentTime / improvementRatio;
  const timeSaved = currentTime - estimatedNewTime;
  
  // Calculate labor costs
  const currentLaborCost = (currentTime / 60) * laborCostPerHour;
  const optimizedLaborCost = (estimatedNewTime / 60) * laborCostPerHour;
  const costSavings = currentLaborCost - optimizedLaborCost;
  
  return {
    timeSaved: Math.round(timeSaved),
    percentageImprovement: Math.round((1 - (estimatedNewTime / currentTime)) * 100),
    currentLaborCost: currentLaborCost.toFixed(2),
    optimizedLaborCost: optimizedLaborCost.toFixed(2),
    costSavingsPerCleaning: costSavings.toFixed(2),
    estimatedNewTime: Math.round(estimatedNewTime)
  };
};

// Calculate environmental impact
const calculateEcoImpact = (factors, method) => {
  const { temperature, chemical, mechanical } = factors;
  
  return {
    energy: (temperature * 0.7 + mechanical * 0.3) / 100,
    water: (mechanical * 0.6 + chemical * 0.4) / 100,
    chemical: chemical / 100
  };
};

// Method name mapping
const methodNameMap = {
  'hand & bucket': 'handBucket',
  'pressure washer': 'pressureWasher',
  'steam cleaning': 'steamCleaning',
  'foam lance': 'foamLance',
  'cip (clean in place)': 'cip',
  'automatic washer': 'automaticWasher'
};

// Industry name mapping
const industryNameMap = {
  'agriculture': 'agriculture',
  'automotive': 'automotive',
  'construction': 'construction',
  'contract cleaning': 'contractCleaning',
  'food & beverage': 'foodBeverage',
  'marine': 'marine',
  'government': 'government',
  'education': 'education'
};

// Main optimization function
export const optimizeCleaningProcess = (input) => {
  const {
    industry,
    surface,
    method,
    currentTime,
    currentFactors,
    laborCostPerHour
  } = input;
  
  // Get base weightings for industry
  const industryKey = industryNameMap[industry.toLowerCase()] || 'contractCleaning';
  const baseWeights = industryWeightings[industryKey];
  
  // Apply method modifiers
  const methodKey = methodNameMap[method.toLowerCase()] || 'handBucket';
  const methodMods = methodModifiers[methodKey];
  
  // Detect surface type and get modifiers
  const surfaceType = Object.keys(surfaceModifiers).find(type => 
    surface.toLowerCase().includes(type)
  ) || 'metal';
  const surfaceMods = surfaceModifiers[surfaceType];
  
  // Calculate optimized factors
  const optimizedFactors = {
    temperature: Math.round(baseWeights.temperature * methodMods.temperature),
    chemical: Math.round(baseWeights.chemical * methodMods.chemical * surfaceMods.chemical),
    mechanical: Math.round(baseWeights.mechanical * methodMods.mechanical * surfaceMods.mechanical),
    time: Math.round(baseWeights.time * methodMods.time)
  };
  
  // Calculate improvements
  const timeSavings = calculateTimeSavings(currentTime, currentFactors, optimizedFactors, laborCostPerHour);
  const currentEcoImpact = calculateEcoImpact(currentFactors, method);
  const optimizedEcoImpact = calculateEcoImpact(optimizedFactors, method);
  
  return {
    currentFactors,
    optimizedFactors,
    timeSavings,
    ecoImpact: {
      current: currentEcoImpact,
      optimized: optimizedEcoImpact
    },
    efficiency: {
      current: calculateEfficiencyScore(currentFactors),
      optimized: calculateEfficiencyScore(optimizedFactors)
    },
    context: {
      industryProfile: baseWeights.description,
      methodProfile: methodMods.description,
      surfaceType
    }
  };
};
