import { data } from "../data/data";

// Text elements
const resultTxtEl = document.getElementById("result") as HTMLParagraphElement;
const weightRangeTxtEl = document.getElementById("weight-range") as HTMLSpanElement;
const weightCategorieTxtEl = document.getElementById("weight-categorie") as HTMLSpanElement;
const bmiAdviseTxtEl = document.getElementById("bmi-advise") as HTMLParagraphElement;
const welcomeTxtEl = document.getElementById("welcome") as HTMLDivElement;
const bmiInfoTxtEl = document.getElementById("bmi-info") as HTMLDivElement;

// Input elements - Metric
const metricRadioInputEl = document.getElementById("metric") as HTMLInputElement;
const metricContainerEl = document.getElementById("metricContainer") as HTMLDivElement;
const heightCmInputEl = document.getElementById("heightCm") as HTMLInputElement;
const weightKgInputEl = document.getElementById("weightKg") as HTMLInputElement;

// Input elements - Imperial
const imperialRadioInputEl = document.getElementById("imperial") as HTMLInputElement;
const imperialHeightContainerEl = document.getElementById("imperialHeightContainer") as HTMLDivElement;
const imperialWeightContainerEl = document.getElementById("imperialWeightContainer") as HTMLDivElement;
const heightFtInputEl = document.getElementById("heightFt") as HTMLInputElement;
const heightInInputEl = document.getElementById("heightIn") as HTMLInputElement;
const weightStInputEl = document.getElementById("weightSt") as HTMLInputElement;
const weightLbsInputEl = document.getElementById("weightLbs") as HTMLInputElement;

// Display function
const displayUnits = () => {
  if (metricRadioInputEl.checked) {
    heightCmInputEl.value = "";
    weightKgInputEl.value = "";
    metricContainerEl.classList.remove("hidden");
    imperialHeightContainerEl.classList.add("hidden");
    imperialWeightContainerEl.classList.add("hidden");
  } else if (imperialRadioInputEl.checked) {
    metricContainerEl.classList.add("hidden");
    imperialHeightContainerEl.classList.remove("hidden");
    imperialWeightContainerEl.classList.remove("hidden");
    heightFtInputEl.value = "";
    heightInInputEl.value = "";
    weightStInputEl.value = "";
    weightLbsInputEl.value = "";
  }
};

// Function to check whether all the necessary fields have been filled in
const areInputsFilled = (): boolean => {
  if (metricRadioInputEl.checked) {
    return !!heightCmInputEl.value && parseFloat(heightCmInputEl.value) > 0 && !!weightKgInputEl.value && parseFloat(weightKgInputEl.value) > 0;
  } else if (imperialRadioInputEl.checked) {
    return !!heightFtInputEl.value && parseFloat(heightFtInputEl.value) > 0 && !!heightInInputEl.value && !!weightStInputEl.value && parseFloat(weightStInputEl.value) > 0 && !!weightLbsInputEl.value;
  }
  return false;
};

// Function to manage the display of sections
const toggleDisplaySections = () => {
  if (areInputsFilled()) {
    welcomeTxtEl.classList.add("hidden");
    bmiInfoTxtEl.classList.remove("hidden");
  } else {
    welcomeTxtEl.classList.remove("hidden");
    bmiInfoTxtEl.classList.add("hidden");
  }
};
// Conversion functions
const convertImperialToMetric = {
  height: (ft: number, inches: number): number => {
    const totalInches = ft * 12 + inches;
    return parseFloat((totalInches * 2.54).toFixed(1)); // Convert to cm
  },
  weight: (stones: number, lbs: number): number => {
    const totalLbs = stones * 14 + lbs;
    return parseFloat((totalLbs * 0.45359237).toFixed(1)); // Convert to kg
  },
};

const convertMetricToImperial = {
  height: (cm: number): { ft: number; inches: number } => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { ft, inches };
  },
  weight: (kg: number): { stones: number; lbs: number } => {
    const totalLbs = kg * 2.20462;
    const stones = Math.floor(totalLbs / 14);
    const lbs = Math.round(totalLbs % 14);
    return { stones, lbs };
  },
};

// Input management function
const handleInput = () => {
  const isUnitSelected = () => metricRadioInputEl.checked || imperialRadioInputEl.checked;

  if (!isUnitSelected()) {
    console.log("Please select Metric or Imperial before entering values.");
    return;
  }
  let heightInCm: number;
  let weightInKg: number;
  if (imperialRadioInputEl.checked) {
    // Get imperial values
    const heightFt = parseFloat(heightFtInputEl.value) || 0;
    const heightIn = parseFloat(heightInInputEl.value) || 0;
    const weightSt = parseFloat(weightStInputEl.value) || 0;
    const weightLbs = parseFloat(weightLbsInputEl.value) || 0;

    // Convert to metric
    heightInCm = convertImperialToMetric.height(heightFt, heightIn);
    weightInKg = convertImperialToMetric.weight(weightSt, weightLbs);
  } else {
    // Get metric values directly
    heightInCm = parseFloat(heightCmInputEl.value) || 0;
    weightInKg = parseFloat(weightKgInputEl.value) || 0;
  }

 // Check and update the display
  toggleDisplaySections();

  // Continue only if inputs are valid
  if (!areInputsFilled()) return;

  // Calculate BMI using metric values
  const bmiResult = calculateMetricBMI(heightInCm, weightInKg);

  // Define healthy BMI range
  const minBMI = 18.5;
  const maxBMI = 24.9;

  if (!weightCategorieTxtEl || !weightRangeTxtEl || !bmiAdviseTxtEl) return;

  if (heightInCm > 0 && weightInKg > 0 && resultTxtEl) {
    resultTxtEl.textContent = bmiResult.toString();
  }
  let category = data.find((entry) => {
    if (bmiResult < 18.5) return entry.type === "underweight";
    if (bmiResult >= 18.5 && bmiResult <= 24.9) return entry.type === "healthy weight";
    if (bmiResult >= 25 && bmiResult <= 29.9) return entry.type === "overweight";
    if (bmiResult >= 30) return entry.type === "obese";
  });

  if (!category) return;

  const weightRange = calculateWeightRange(heightInCm, minBMI, maxBMI);

  // Convert weight range to imperial if needed
  let weightRangeText: string;
  if (imperialRadioInputEl.checked) {
    const minWeightImperial = convertMetricToImperial.weight(weightRange[0]);
    const maxWeightImperial = convertMetricToImperial.weight(weightRange[1]);
    weightRangeText = `${minWeightImperial.stones}st ${minWeightImperial.lbs}lbs - ${maxWeightImperial.stones}st ${maxWeightImperial.lbs}lbs`;
  } else {
    weightRangeText = `${weightRange[0]}kgs - ${weightRange[1]}kgs`;
  }

  weightCategorieTxtEl.textContent = category.type;
  weightRangeTxtEl.textContent = weightRangeText;
  bmiAdviseTxtEl.textContent = category.advise;
  
};

// Input calculation function
const calculateMetricBMI = (heightCm: number, weightKg: number): number => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return parseFloat(bmi.toFixed(1));
};

const calculateWeightRange = (heightCm: number, minBMI: number, maxBMI: number): [number, number] => {
  const heightM = heightCm / 100;
  const minWeight = minBMI * (heightM * heightM);
  const maxWeight = maxBMI * (heightM * heightM);

  return [parseFloat(minWeight.toFixed(1)), parseFloat(maxWeight.toFixed(1))];
};

// Input validation functions
const validateImperialHeight = () => {
  let inches = parseFloat(heightInInputEl.value) || 0;
  if (inches >= 12) {
    const additionalFeet = Math.floor(inches / 12);
    inches = inches % 12;
    const currentFeet = parseFloat(heightFtInputEl.value) || 0;
    heightFtInputEl.value = (currentFeet + additionalFeet).toString();
    heightInInputEl.value = inches.toString();
  }
};

const validateImperialWeight = () => {
  let lbs = parseFloat(weightLbsInputEl.value) || 0;
  if (lbs >= 14) {
    const additionalStones = Math.floor(lbs / 14);
    lbs = lbs % 14;
    const currentStones = parseFloat(weightStInputEl.value) || 0;
    weightStInputEl.value = (currentStones + additionalStones).toString();
    weightLbsInputEl.value = lbs.toString();
  }
};

/* Event Listener */
metricRadioInputEl.addEventListener("click", () => {
  displayUnits();
  toggleDisplaySections();
});

imperialRadioInputEl.addEventListener("click", () => {
  displayUnits();
  toggleDisplaySections();
});

// Metric input listeners
heightCmInputEl.addEventListener("input", handleInput);
weightKgInputEl.addEventListener("input", handleInput);

// Imperial input listeners
heightFtInputEl.addEventListener("input", () => {
  handleInput();
});
heightInInputEl.addEventListener("input", () => {
  validateImperialHeight();
  handleInput();
});
weightStInputEl.addEventListener("input", () => {
  handleInput();
});
weightLbsInputEl.addEventListener("input", () => {
  validateImperialWeight();
  handleInput();
});
// Display initialisation
toggleDisplaySections();
