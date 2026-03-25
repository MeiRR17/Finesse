# Call Center Dashboard

A modern React-based Call Center Dashboard with Tailwind CSS, designed as a Finesse UI replacement.

## Features

- **Spatial Room Layout**: Visual representation of 12 agent desks in a room with a central aisle
- **Real-time Status**: Color-coded indicators for agent status (Ready/Not Ready)
- **Hebrew Names Support**: Displays agent names in Hebrew
- **Dark Mode Design**: Sleek dashboard interface optimized for monitoring
- **Responsive Design**: Built with Tailwind CSS for modern UI

## Room Layout

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Component Structure

- `FinesseDashboard.jsx`: Main dashboard component with room layout
- `App.jsx`: Root application component
- Mock data generation with Hebrew names
- Status indicators with color coding (Green = Ready, Red = Not Ready)

## Status Indicators

- 🟢 **Green**: Agent is READY to take calls
- 🔴 **Red**: Agent is NOT_READY (unavailable)

## Technologies Used

- React 18
- Tailwind CSS 3
- JavaScript (no TypeScript)
- CSS Grid/Flexbox for layout

## Customization

The dashboard is designed to be easily modifiable by junior developers. Key areas to customize:

- Agent data in `generateMockAgents()` function
- Color schemes in `getStatusColor()` function
- Layout adjustments in the grid structure
- Additional status types can be added to the `statuses` array
