import { Box } from '@mantine/core';
import { DatePickerProps, Calendar } from '@mantine/dates';

interface OrderCalendarProps {
  startDate: string;
  endDate: string;
}

const OrderCalendar: React.FC<OrderCalendarProps> = ({ startDate, endDate }) => {
  const getDayProps: DatePickerProps['getDayProps'] = (date) => {
    if (date >= new Date(startDate) && date <= new Date(endDate)) {
      return {
        style: {
          backgroundColor: 'var(--mantine-color-blue-filled)',
          color: 'var(--mantine-color-white)',
        },
      };
    }

    return {};
  };

  return (
    <Box>
      <Calendar defaultDate={new Date(startDate)} getDayProps={getDayProps} hasNextLevel={false} />
    </Box>
  );
};

export default OrderCalendar;
