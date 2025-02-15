import React from 'react';
import { Card } from './ui/card';


interface StatusCardProps {
  statusArray: string[];
}

const StatusCard: React.FC<StatusCardProps> = ({ statusArray }) => {
  const getColor = (status: string) => {
    switch (status) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'green':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Card className="p-4 mt-6">
      <div className="grid grid-cols-10 gap-2">
        {statusArray.map((status, index) => (
          <div
            key={index}
            className={`w-8 h-8 ${getColor(status)} rounded-md transition-transform transform hover:scale-110`}
          ></div>
        ))}
      </div>
    </Card>
  );
};

export default StatusCard; 