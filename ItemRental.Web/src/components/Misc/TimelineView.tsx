import { getDateTimeLabel } from '@/utils/Dates';
import { Timeline, Text } from '@mantine/core';

interface TimelineViewProps {
  events: TimelineEvent[];
  bulletSize?: number;
  active?: number;
  lineWidth?: number;
  color?: string;
}

const TimelineView: React.FC<TimelineViewProps> = ({
  events,
  active = 0,
  bulletSize = 25,
  lineWidth = 3,
  color = 'blue',
}) => (
  <Timeline active={active} bulletSize={bulletSize} lineWidth={lineWidth} color={color}>
    {events.map((event, index) => (
      <Timeline.Item
        key={index}
        title={event.title}
        lineVariant={index > active ? 'dashed' : 'solid'}
      >
        <Text c="dimmed" size="sm">
          {event.description}
        </Text>
        <Text size="xs" mt={4}>
          {getDateTimeLabel(event.date)}
        </Text>
      </Timeline.Item>
    ))}
  </Timeline>
);

export default TimelineView;
