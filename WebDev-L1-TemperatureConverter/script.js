// =========================================
// Temperature Converter
// JavaScript Logic
// =========================================

// DOM Elements
const temperatureForm = document.getElementById("temperature-form");
const temperatureInput = document.getElementById("temperature");
const inputUnit = document.getElementById("input-unit");
const copyButton = document.getElementById("copy-button");


const temperatureError = document.getElementById("temperature-error");
const conversionStatus = document.getElementById("conversion-status");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

const resetButton = document.getElementById("reset-button");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history-button");


// Absolute zero constants
const ABSOLUTE_ZERO_CELSIUS = -273.15;
const ABSOLUTE_ZERO_KELVIN = 0;

// =========================================
// Form Submission
// =========================================

temperatureForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearError();

    const temperatureValue = temperatureInput.value.trim();
    const selectedUnit = inputUnit.value;

    // Validate empty input
    if (temperatureValue === "") {
        showError("Please enter a temperature value.");
        return;
    }

    const temperature = Number(temperatureValue);

    // Validate numeric input
    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }

    // Validate absolute zero
    if (
        selectedUnit === "celsius" &&
        temperature < ABSOLUTE_ZERO_CELSIUS
    ) {
        showError(
            "Temperature cannot be below absolute zero (−273.15°C)."
        );
        return;
    }

    if (
        selectedUnit === "kelvin" &&
        temperature < ABSOLUTE_ZERO_KELVIN
    ) {
        showError(
            "Temperature cannot be below absolute zero (0 K)."
        );
        return;
    }

    if (
        selectedUnit === "fahrenheit" &&
        temperature < -459.67
    ) {
        showError(
            "Temperature cannot be below absolute zero (−459.67°F)."
        );
        return;
    }

    // Perform conversion
    const convertedTemperatures = convertTemperature(
        temperature,
        selectedUnit
    );

    // Display results
    displayResults(convertedTemperatures);
    conversionStatus.textContent =
    `Converted successfully from ${getUnitLabel(selectedUnit)}.`;
    copyButton.disabled = false;



    saveConversion(
    temperature,
    selectedUnit,
    convertedTemperatures
);



});

// =========================================
// Temperature Conversion
// =========================================

function convertTemperature(temperature, unit) {
    let celsius;
    let fahrenheit;
    let kelvin;

    switch (unit) {
        case "celsius":
            celsius = temperature;
            fahrenheit = (temperature * 9) / 5 + 32;
            kelvin = temperature + 273.15;
            break;

        case "fahrenheit":
            celsius = ((temperature - 32) * 5) / 9;
            fahrenheit = temperature;
            kelvin = celsius + 273.15;
            break;

        case "kelvin":
            celsius = temperature - 273.15;
            fahrenheit = (celsius * 9) / 5 + 32;
            kelvin = temperature;
            break;

        default:
            throw new Error("Unsupported temperature unit.");
    }

    return {
        celsius,
        fahrenheit,
        kelvin
    };
}

// =========================================
// Display Results
// =========================================

function displayResults(results) {
    celsiusResult.textContent =
        `${formatTemperature(results.celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatTemperature(results.fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatTemperature(results.kelvin)} K`;
}

// =========================================
// Number Formatting
// =========================================

function formatTemperature(value) {
    // Avoid displaying floating-point artifacts
    const roundedValue = Number(value.toFixed(2));

    return roundedValue.toLocaleString("en-US", {
        maximumFractionDigits: 2
    });
}

// =========================================
// Error Handling
// =========================================

function showError(message) {
    temperatureError.textContent = message;

    temperatureInput.classList.add("input-error");

    temperatureInput.setAttribute("aria-invalid", "true");

    temperatureInput.focus();
}

function clearError() {
    temperatureError.textContent = "";

    temperatureInput.classList.remove("input-error");

    temperatureInput.removeAttribute("aria-invalid");
}

// =========================================
// Clear Error While Typing
// =========================================

temperatureInput.addEventListener("input", function () {
    if (temperatureInput.classList.contains("input-error")) {
        clearError();
    }
});

// =========================================
// Reset
// =========================================

resetButton.addEventListener("click", function () {
    temperatureInput.value = "";

    inputUnit.value = "celsius";

    celsiusResult.textContent = "—";
    fahrenheitResult.textContent = "—";
    kelvinResult.textContent = "—";

    conversionStatus.textContent = "";
    copyButton.disabled = true;
    copyButton.textContent = "Copy Results";



    clearError();

    temperatureInput.focus();
});
function getUnitLabel(unit) {
    const unitLabels = {
        celsius: "Celsius",
        fahrenheit: "Fahrenheit",
        kelvin: "Kelvin"
    };

    return unitLabels[unit] || "selected unit";
}
function getUnitSymbol(unit) {
    const unitSymbols = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K"
    };

    return unitSymbols[unit] || "";
}


copyButton.addEventListener("click", async function () {
    const resultsText = [
        `Celsius: ${celsiusResult.textContent}`,
        `Fahrenheit: ${fahrenheitResult.textContent}`,
        `Kelvin: ${kelvinResult.textContent}`
    ].join("\n");

    try {
        await navigator.clipboard.writeText(resultsText);

        conversionStatus.textContent = "Conversion results copied successfully.";

        copyButton.textContent = "Copied!";
        
        setTimeout(function () {
            copyButton.textContent = "Copy Results";
        }, 1500);

    } catch (error) {
        conversionStatus.textContent =
            "Unable to copy results. Please copy them manually.";
    }
});


// =========================================
// Conversion History
// =========================================

const HISTORY_STORAGE_KEY = "temperatureConverterHistory";

let conversionHistory =
    JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];

   function renderHistory() {
    historyList.innerHTML = "";

    if (conversionHistory.length === 0) {
        const emptyMessage = document.createElement("div");

        emptyMessage.className = "history-empty";

        emptyMessage.innerHTML =
            "No conversions yet.<br>Your recent conversions will appear here.";

        historyList.appendChild(emptyMessage);

        return;
    }

    conversionHistory.forEach(function (item) {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";

        const inputElement = document.createElement("span");
        inputElement.className = "history-input";
        inputElement.textContent = item.input;

        const outputElement = document.createElement("span");
        outputElement.className = "history-output";
        outputElement.textContent = item.output;

        historyItem.appendChild(inputElement);
        historyItem.appendChild(outputElement);

        historyList.appendChild(historyItem);
    });
}

function saveConversion(temperature, unit, results) {
    const historyEntry = {
        input: `${formatTemperature(temperature)} ${getUnitSymbol(unit)}`,

        output:
            `${formatTemperature(results.celsius)} °C • ` +
            `${formatTemperature(results.fahrenheit)} °F • ` +
            `${formatTemperature(results.kelvin)} K`
    };

    conversionHistory.unshift(historyEntry);

    // Keep only the 5 most recent conversions
    conversionHistory = conversionHistory.slice(0, 5);

    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(conversionHistory)
    );

    renderHistory();
}

// =========================================
// Clear Conversion History
// =========================================

clearHistoryButton.addEventListener("click", function () {
    conversionHistory = [];

    localStorage.removeItem(HISTORY_STORAGE_KEY);

    renderHistory();
});