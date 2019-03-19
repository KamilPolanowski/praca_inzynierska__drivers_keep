import { Task } from '@drivers-keep-shared/interfaces/tasks.interface';

/**
 * Dynamic import function for creating mock tasks
 *
 * @param  {number=1} howMany
 * @returns Task
 */
export function createMockTask(/* howMany: number = 1 */): Task {
  function randomize(limit: number): number {
    return Math.floor((Math.random() * limit) + 1);
  }

  // const outputTasks: Task[] = [];

  /* for (let index = 0; index < howMany; index++) { */
    const mockTask = {
      added: `2019-${randomize(12)}-${randomize(31)}`,
      additional_data: {},
      coordinator_id: randomize(400),
      description: 'Mock Task Description',
      freight_id: randomize(999999),
      freight_step_id: randomize(99999),
      id: randomize(9999),
      info: 'mockTask',
      kind: randomize(10) % 2 === 0 ? 'sms' : 'alert',
      name: '',
      phone: '',
      resolved: '',
      set_id: randomize(9999),
      sms_id: randomize(9999),
      sms_viewed: '',
      star: 0,
      user_id: randomize(400),
      visible_from: `2019-${randomize(12)}-${randomize(31)}`
    };
    /* outputTasks.push(mockTask);
  } */

  return mockTask;
}
