import React, { useState, useEffect } from 'react';

// Helper function to extract first name from full name
const getFirstName = (fullName) => {
  return fullName.split(' ')[0];
};

// Mock data generator - creates 6 active agents and 6 empty desks
const generateMockAgents = () => {
  const hebrewFirstNames = ['מאיר', 'אליה', 'יונתן', 'יעקב', 'שמעון', 'עדן'];
  const lastNames = ['כהן', 'לוי', 'ישראלי', 'דוד', 'בן דוד', 'אברהם', 'מוזס', 'שמעוני', 'פרץ', 'גולדברג'];
  const statuses = ['READY', 'NOT_READY'];
  
  const agents = [];
  
  // Generate 6 active agents (desks 1-6 on LEFT side)
  for (let i = 0; i < 6; i++) {
    const firstName = hebrewFirstNames[i % hebrewFirstNames.length];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    agents.push({
      id: i + 1,
      fullName: `${firstName} ${lastName}`,
      status: status,
      isEmpty: false,
      side: 'LEFT'
    });
  }
  
  // Generate 6 empty desks (desks 7-12 on RIGHT side)
  for (let i = 6; i < 12; i++) {
    agents.push({
      id: i + 1,
      fullName: 'עמדה ריקה',
      status: 'EMPTY',
      isEmpty: true,
      side: 'RIGHT'
    });
  }
  
  return agents;
};

// Separate components for metrics
const TotalDailyCalls = ({ totalDailyCalls }) => (
  <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/30 backdrop-blur-md rounded-2xl p-4 border border-blue-500/30 shadow-lg shadow-blue-500/20">
    <div className="text-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {totalDailyCalls}
      </div>
      <div className="text-xs text-blue-300 mt-1">Total Daily Calls</div>
    </div>
  </div>
);

const CallsWaiting = ({ callsWaiting }) => (
  <div className="bg-gradient-to-br from-red-600/20 to-red-700/30 backdrop-blur-md rounded-2xl p-4 border border-red-500/30 shadow-lg shadow-red-500/20">
    <div className="text-center">
      <div className={`text-2xl font-bold ${callsWaiting > 0 ? 'bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent animate-pulse' : 'bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'}`}>
        {callsWaiting}
      </div>
      <div className="text-xs text-red-300 mt-1">Calls Waiting</div>
    </div>
  </div>
);

const CallCenterDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  
  // Initialize mock data
  useEffect(() => {
    setAgents(generateMockAgents());
  }, []);
  
  // Dynamic Day/Night Mode Effect
  useEffect(() => {
    const hour = new Date().getHours();
    setCurrentHour(hour);
    
    // Debug log
    console.log('Current hour:', hour);
    console.log('Mode:', hour >= 18 || hour < 6 ? 'Night' : 'Day');
    
    // Force Day Mode for testing - remove this line after testing
    const testHour = 12; // Force Day Mode
    setCurrentHour(testHour);
    
    // Apply dark class for night mode, remove for day mode
    if (hour >= 18 || hour < 6) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const getDeskBackgroundClass = (status, isEmpty) => {
    const isNight = currentHour >= 18 || currentHour < 6;
    
    if (isEmpty) {
      return isNight ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
    }
    
    if (status === 'READY') {
      return isNight 
        ? 'bg-gradient-to-br from-green-600/90 to-green-500/90 border-green-400/50 shadow-green-500/30' 
        : 'bg-gradient-to-br from-green-400 to-green-500 border-green-300 shadow-green-500/20';
    }
    
    return isNight 
      ? 'bg-gradient-to-br from-red-600/90 to-red-500/90 border-red-400/50 shadow-red-500/30' 
      : 'bg-gradient-to-br from-red-400 to-red-500 border-red-300 shadow-red-500/20';
  };

  const getDeskTextClass = (isEmpty) => {
    const isNight = currentHour >= 18 || currentHour < 6;
    return isEmpty ? (isNight ? 'text-gray-500' : 'text-gray-600') : (isNight ? 'text-white' : 'text-gray-900');
  };

  const getDeskLabel = (agent) => {
    if (agent.isEmpty) {
      return `עמדה ${agent.id}`;
    }
    return getFirstName(agent.fullName);
  };

  const getDeskIndicatorClass = (status, isEmpty) => {
    const isNight = currentHour >= 18 || currentHour < 6;
    
    if (isEmpty) {
      return isNight ? 'bg-gray-600/50' : 'bg-gray-400/50';
    }
    
    return isNight 
      ? (status === 'READY' ? 'bg-green-300/80' : 'bg-red-300/80')
      : (status === 'READY' ? 'bg-green-600' : 'bg-red-600');
  };

  const getOverlayClass = () => {
    if (currentHour >= 18 || currentHour < 6) {
      // Night Mode - show overlays
      return 'absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse';
    } else {
      // Day Mode - no overlays
      return '';
    }
  };

  const getRoomBackgroundClass = () => {
    if (currentHour >= 18 || currentHour < 6) {
      // Night Mode - dark theme
      return 'bg-gradient-to-br from-gray-800/40 to-gray-900/60';
    } else {
      // Day Mode - light theme
      return 'bg-white';
    }
  };

  // Mock metrics data
  const totalDailyCalls = 452;
  const callsWaiting = 3;

  // Separate agents by side for proper rendering
  const leftAgents = agents.filter(agent => agent.side === 'LEFT');
  const rightAgents = agents.filter(agent => agent.side === 'RIGHT');

  const getTextClass = () => {
    return currentHour >= 18 || currentHour < 6 ? 'text-gray-100' : 'text-gray-900';
  };

  const getHeaderClass = () => {
    return currentHour >= 18 || currentHour < 6 
      ? 'text-blue-400' 
      : 'text-blue-700';
  };

  const getSubTextClass = () => {
    return currentHour >= 18 || currentHour < 6 
      ? 'text-gray-400' 
      : 'text-gray-700';
  };

  const getMainScreenClass = () => {
    const isNight = currentHour >= 18 || currentHour < 6;
    return isNight 
      ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/80' 
      : 'bg-white border-gray-300';
  };

  const getMainScreenTextClass = () => {
    const isNight = currentHour >= 18 || currentHour < 6;
    return isNight ? 'text-gray-400' : 'text-gray-700';
  };

  const getMainScreenNumberClass = () => {
    const isNight = currentHour >= 18 || currentHour < 6;
    return isNight ? 'text-blue-400' : 'text-blue-600';
  };

  const getBackgroundClass = () => {
    if (currentHour >= 18 || currentHour < 6) {
      // Night Mode - dark theme
      return 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-gray-100';
    } else {
      // Day Mode - pure white background
      return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} p-8 transition-all duration-500`}>
      {/* Header with modern gradient styling */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${getHeaderClass()}`}>Call Center Dashboard</h1>
              <p className={`${getSubTextClass()} text-sm`}>Real-time Agent Status Monitor</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`text-sm ${getSubTextClass()} bg-gray-800/50 dark:bg-gray-200/50 px-4 py-2 rounded-full border ${currentHour >= 18 || currentHour < 6 ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
              {currentHour >= 18 || currentHour < 6 ? '🌙 Night Mode' : '☀️ Day Mode'} ({currentHour}:00)
            </div>
          </div>
        </div>
      </header>
        
      {/* 
        Modern Room Layout Container with enhanced styling
        CRITICAL: Fixed aspect ratio of exactly 1030x380 pixels (2.7:1 proportion)
        Enhanced with modern gradients and glassmorphism effects
      */}
      <div className={`relative ${getRoomBackgroundClass()} rounded-3xl shadow-2xl border border-gray-700/30 overflow-hidden`}>
        {/* Animated background gradient overlay */}
        <div className={getOverlayClass()}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div 
          className="grid grid-cols-[400fr_230fr_400fr] relative"
          style={{ aspectRatio: '1030 / 380' }}
        >
          
          {/* 
            Zone 1: LEFT Side (400fr width)
            Enhanced with modern glassmorphism effects
          */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/30 backdrop-blur-sm p-4 border-r border-gray-700/30">
            <div className="grid grid-cols-3 gap-3 h-full">
              {leftAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`relative p-3 rounded-2xl border ${getDeskBackgroundClass(agent.status, agent.isEmpty)} 
                             transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                             flex flex-col items-center justify-center text-center
                             backdrop-blur-sm group`}
                >
                  {/* Glow effect for active agents */}
                  {!agent.isEmpty && (
                    <div className={`absolute inset-0 rounded-2xl ${agent.status === 'READY' ? 'bg-green-500/20' : 'bg-red-500/20'} animate-pulse`}></div>
                  )}
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`text-lg font-bold ${getDeskTextClass(agent.isEmpty)}`}>
                      {getDeskLabel(agent)}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getDeskIndicatorClass(agent.status, agent.isEmpty)} animate-pulse shadow-lg`}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Desk {agent.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 
            Zone 2: CENTRAL AISLE (230fr width)
            Enhanced MAIN SCREEN with separate metric components
          */}
          <div className="bg-gradient-to-br from-gray-800/10 to-gray-900/20 backdrop-blur-md relative border-r border-gray-700/30">
            {/* Total Daily Calls Component - Above Main Screen */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
              <TotalDailyCalls totalDailyCalls={totalDailyCalls} />
            </div>
            
            {/* MAIN SCREEN - Modern glassmorphism design */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className={`w-52 h-36 ${getMainScreenClass()} backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-600/50 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 group`}>
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl animate-pulse"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl"></div>
                
                <div className="text-center relative z-10">
                  <div className={`text-xs ${getMainScreenTextClass()} mb-3 font-medium tracking-wider uppercase`}>Main Screen</div>
                  <div className={`text-4xl font-bold ${getMainScreenNumberClass()} drop-shadow-lg`}>
                    {agents.filter(a => !a.isEmpty && a.status === 'READY').length} / {agents.filter(a => !a.isEmpty).length}
                  </div>
                  <div className={`text-xs ${getMainScreenTextClass()} mt-2`}>Ready</div>
                </div>
              </div>
            </div>
            
            {/* Calls Waiting Component - Below Main Screen */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
              <CallsWaiting callsWaiting={callsWaiting} />
            </div>
          </div>
          
          {/* 
            Zone 3: RIGHT Side (400fr width)
            Enhanced with glassmorphism effects matching Zone 1
          */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/30 backdrop-blur-sm p-4">
            <div className="grid grid-cols-3 gap-3 h-full">
              {rightAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`relative p-3 rounded-2xl border ${getDeskBackgroundClass(agent.status, agent.isEmpty)} 
                             transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                             flex flex-col items-center justify-center text-center
                             backdrop-blur-sm group`}
                >
                  {/* Glow effect for active agents */}
                  {!agent.isEmpty && (
                    <div className={`absolute inset-0 rounded-2xl ${agent.status === 'READY' ? 'bg-green-500/20' : 'bg-red-500/20'} animate-pulse`}></div>
                  )}
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`text-lg font-bold ${getDeskTextClass(agent.isEmpty)}`}>
                      {getDeskLabel(agent)}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getDeskIndicatorClass(agent.status, agent.isEmpty)} animate-pulse shadow-lg`}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Desk {agent.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        
      {/* Modern Legend and Stats */}
      <div className="mt-8 bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-gray-700/30">
        <div className="flex justify-between items-center">
          {/* Legend */}
          <div className="flex space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/50"></div>
              <span className="text-sm text-gray-300 font-medium">Ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
              <span className="text-sm text-gray-300 font-medium">Not Ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full shadow-lg"></div>
              <span className="text-sm text-gray-300 font-medium">Empty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
