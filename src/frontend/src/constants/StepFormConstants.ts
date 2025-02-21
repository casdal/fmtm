export interface ICreateProjectSteps {
  url: string;
  step: number;
  label: string;
  name: string;
}

export const createProjectSteps: ICreateProjectSteps[] = [
  {
    url: '/create-project',
    step: 1,
    label: '01',
    name: 'Project Details',
  },
  {
    url: '/project-area',
    step: 2,
    label: '02',
    name: 'Project Area',
  },
  {
    url: '/upload-survey',
    step: 3,
    label: '03',
    name: 'Upload Survey',
  },
  {
    url: '/map-data',
    step: 4,
    label: '04',
    name: 'Map Data',
  },
  {
    url: '/split-tasks',
    step: 5,
    label: '05',
    name: 'Split Tasks',
  },
];
