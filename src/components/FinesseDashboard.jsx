import React, { useState, useEffect } from 'react';

// Helper function to extract first name from full name
const getFirstName = (fullName) => {
  return fullName.split(' ')[0];
};

// Mock data generator
const generateMockAgents = () => {
  const hebrewFirstNames = ['מאיר', 'אליה', 'יונתן', 'יעקב', 'שמעון', 'עדן'];
  const lastNames = ['כהן', 'לוי', 'ישראלי', 'דוד', 'בן דוד', 'אברהם', 'מוזס', 'שמעוני', 'פרץ', 'גולדברג'];
  const statuses = ['READY', 'NOT_READY'];
  
  const agents = [];
  
  // Generate 12 agents
  for (let i = 0; i < 12; i++) {
    const firstName = hebrewFirstNames[i % hebrewFirstNames.length];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    agents.push({
      id: i + 1,
      fullName: `${firstName} ${lastName}`,
      status: status
    });
  }
  
  return agents;
};

const FinesseDashboard = () => {
  const [agents, setAgents] = useState([]);
  
  useEffect(() => {
    // Initialize with mock data
    setAgents(generateMockAgents());
  }, []);
  
  const getStatusColor = (status) => {
    return status === 'READY' 
      ? 'bg-green-500 border-green-400 shadow-green-500/20' 
      : 'bg-red-500 border-red-400 shadow-red-500/20';
  };
  
  const getStatusIndicator = (status) => {
    return (
      <div className={`w-3 h-3 rounded-full ${status === 'READY' ? 'bg-green-300' : 'bg-red-300'} animate-pulse`}></div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">Call Center Dashboard</h1>
          <p className="text-gray-400">Real-time Agent Status Monitor</p>
        </div>
        
        {/* Room Layout */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
          {/* Main Room Container */}
          <div className="grid grid-cols-3 gap-8 h-96">
            
            {/* Left Side - 6 Desks */}
            <div className="col-span-1 space-y-4">
              <div className="grid grid-rows-2 gap-4 h-full">
                {/* Front 3 desks */}
                <div className="grid grid-cols-1 gap-2">
                  {agents.slice(0, 3).map((agent) => (
                    <div
                      key={agent.id}
                      className={`relative p-4 rounded-lg border-2 ${getStatusColor(agent.status)} 
                                 transform transition-all duration-200 hover:scale-105 hover:shadow-lg
                                 flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-white">
                          {getFirstName(agent.fullName)}
                        </div>
                        {getStatusIndicator(agent.status)}
                      </div>
                      <div className="text-xs text-gray-300">
                        Desk {agent.id}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Back 3 desks */}
                <div className="grid grid-cols-1 gap-2">
                  {agents.slice(3, 6).map((agent) => (
                    <div
                      key={agent.id}
                      className={`relative p-4 rounded-lg border-2 ${getStatusColor(agent.status)} 
                                 transform transition-all duration-200 hover:scale-105 hover:shadow-lg
                                 flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-white">
                          {getFirstName(agent.fullName)}
                        </div>
                        {getStatusIndicator(agent.status)}
                      </div>
                      <div className="text-xs text-gray-300">
                        Desk {agent.id}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Central Aisle with Big Screen */}
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                {/* Big Screen */}
                <div className="bg-gray-700 rounded-lg p-6 shadow-inner border border-gray-600 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">MAIN SCREEN</div>
                    <div className="text-3xl font-bold text-blue-400">
                      {agents.filter(a => a.status === 'READY').length} / {agents.length}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Agents Ready</div>
                  </div>
                </div>
                
                {/* Aisle Indicator */}
                <div className="text-gray-500 text-sm font-semibold tracking-wider">
                  CENTRAL AISLE
                </div>
              </div>
            </div>
            
            {/* Right Side - 6 Desks */}
            <div className="col-span-1 space-y-4">
              <div className="grid grid-rows-2 gap-4 h-full">
                {/* Front 3 desks */}
                <div className="grid grid-cols-1 gap-2">
                  {agents.slice(6, 9).map((agent) => (
                    <div
                      key={agent.id}
                      className={`relative p-4 rounded-lg border-2 ${getStatusColor(agent.status)} 
                                 transform transition-all duration-200 hover:scale-105 hover:shadow-lg
                                 flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-white">
                          {getFirstName(agent.fullName)}
                        </div>
                        {getStatusIndicator(agent.status)}
                      </div>
                      <div className="text-xs text-gray-300">
                        Desk {agent.id}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Back 3 desks */}
                <div className="grid grid-cols-1 gap-2">
                  {agents.slice(9, 12).map((agent) => (
                    <div
                      key={agent.id}
                      className={`relative p-4 rounded-lg border-2 ${getStatusColor(agent.status)} 
                                 transform transition-all duration-200 hover:scale-105 hover:shadow-lg
                                 flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-white">
                          {getFirstName(agent.fullName)}
                        </div>
                        {getStatusIndicator(agent.status)}
                      </div>
                      <div className="text-xs text-gray-300">
                        Desk {agent.id}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-8 flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-300">Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-300">Not Ready</span>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{agents.length}</div>
            <div className="text-xs text-gray-400">Total Agents</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {agents.filter(a => a.status === 'READY').length}
            </div>
            <div className="text-xs text-gray-400">Ready</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {agents.filter(a => a.status === 'NOT_READY').length}
            </div>
            <div className="text-xs text-gray-400">Not Ready</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {Math.round((agents.filter(a => a.status === 'READY').length / agents.length) * 100)}%
            </div>
            <div className="text-xs text-gray-400">Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinesseDashboard;
