import { IconCheck, IconError404, IconInfoCircleFilled } from '@tabler/icons-react';

const Success = (data: NotificationProps) => {
  return {
    id: data.id,
    color: 'green',
    title: data.title,
    message: data.message,
    withCloseButton: true,
    icon: <IconCheck />,
    loading: false,
    autoClose: data.autoClose,
  };
};

const Information = (data: NotificationProps) => {
  return {
    id: data.id,
    color: 'blue',
    title: data.title,
    message: data.message,
    withCloseButton: true,
    icon: <IconInfoCircleFilled />,
    loading: false,
    autoClose: data.autoClose,
  };
};

const Error = (data: NotificationProps) => {
  return {
    id: data.id,
    color: 'red',
    title: data.title,
    message: data.message,
    withCloseButton: true,
    icon: <IconError404 />,
    loading: false,
    autoClose: data.autoClose,
  };
};

export { Success, Information, Error };
