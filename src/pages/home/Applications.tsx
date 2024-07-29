import React from 'react';
import { Link } from 'react-router-dom';

const applications = [
  {
    url : '/members',
    name: 'Members',
    imgSrc: '/home/members.png', // Replace with actual image URL
  },
  {
    url : '/chat',
    name: 'Chats',
    imgSrc: '/home/whatsapp.png', // Replace with actual image URL
  },
  {
    url : '#',
    name: 'Tasks',
    imgSrc: '/home/tasks.png', // Replace with actual image URL
  },
  {
    url : '/settings',
    name: 'Settings',
    imgSrc: '/home/settings.png', // Replace with actual image URL
  },
];

const Applications: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {applications.map((app, index) => (
        <Link to={app.url}>
        <div key={index} className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
          <img src={app.imgSrc} alt={app.name} className="w-full p-12 rounded-3xl h-auto mb-2 rounded-md" />
          <h3 className="text-lg font-medium">{app.name}</h3>
        </div></Link>
      ))}
    </div>
  );
};

export default Applications;
