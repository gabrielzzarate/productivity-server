import mongoose from 'mongoose';
import Task from '../../models/task';
import keys from '../../../config/keys';

async function taskSeeder() {
  const createTaskPromises = [];
  await Task.remove({});

  const tasks = [
    {
      title: 'Build a GraphQL schema',
      description: 'Use Koa and GraphQL',
      complete: false
    },
    {
      title: 'Get eggs at the grocery store',
      description: '2 dozen free range eggs',
      complete: false,
    },
    {
      title: 'Walk the dog',
      description: 'Go in the morning for it gets hot',
      complete: true,
    },
    {
      title: 'Go to the closest bank branch',
      description: 'Bring my account number and id',
      complete: false,
    }
  ];

  tasks.forEach(t => {
    createTaskPromises.push(Task.create(t));
  });

  return Promise.all(createTaskPromises);
}

const closeConnection = () => {
  mongoose.connection.close(() => {
    console.log('Done, mongoose connection disconnected.');
  });
}

async function initSeed() {
  await mongoose.connect(keys.mongoURI);

  console.log('****** seeding session instances...');
  await taskSeeder();

  closeConnection();
}

initSeed();
       