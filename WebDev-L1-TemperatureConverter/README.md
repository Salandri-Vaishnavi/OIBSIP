# 🌡️ Temperature Converter

A modern, responsive, and accessible temperature conversion web application that converts temperatures between Celsius, Fahrenheit, and Kelvin with real-time validation and persistent conversion history.

## 🚀 Live Features

- 🌡️ Convert between Celsius, Fahrenheit, and Kelvin
- ⚡ Fast and accurate temperature calculations
- ✅ Input validation for invalid or empty values
- ❄️ Absolute-zero validation
- 📊 Simultaneous display of all converted values
- 📋 Copy conversion results to clipboard
- 🔄 Reset current conversion
- 🕘 Recent conversion history
- 💾 Persistent history using browser LocalStorage
- 🗑️ Clear conversion history
- 📱 Responsive design for desktop, tablet, and mobile
- ♿ Keyboard-friendly accessibility
- 🎨 Realistic temperature-themed visual design
- 🔢 Clean and readable number formatting

---

## 📌 Project Overview

The Temperature Converter is designed as a practical web utility rather than a basic internship demonstration.

The application allows users to enter a temperature, select its unit, and instantly view the equivalent values in Celsius, Fahrenheit, and Kelvin.

The interface focuses on simplicity, accuracy, accessibility, and a realistic user experience.

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage API
- Clipboard API

No external JavaScript frameworks or libraries are required.

---

## ✨ Core Features

### Temperature Conversion

The application supports:

- Celsius → Fahrenheit & Kelvin
- Fahrenheit → Celsius & Kelvin
- Kelvin → Celsius & Fahrenheit

### Input Validation

The application validates:

- Empty input
- Invalid numeric values
- Temperatures below absolute zero

### Absolute Zero Protection

The application prevents physically invalid temperatures.

Supported minimum values:

| Unit | Minimum |
|---|---:|
| Celsius | -273.15 °C |
| Fahrenheit | -459.67 °F |
| Kelvin | 0 K |

---

## 🧮 Conversion Formulas

### Celsius

```text
Fahrenheit = (Celsius × 9/5) + 32

Kelvin = Celsius + 273.15