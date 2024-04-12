const GenerateEvents = (events: EventLog[], status: OrderStatus): TimelineEvent[] => {
  var timelineEvents: TimelineEvent[] = [];

  events.forEach((event) => {
    timelineEvents.push({
      title: event.title,
      date: event?.timestamp ? new Date(event.timestamp).toLocaleString() : '',
      description: event.description,
    });
  });

  if (events.find((event) => event.eventName == 'Order.Accepted') == undefined) {
    timelineEvents.push({
      title: 'Accepted',
    });
  }

  if (events.find((event) => event.eventName == 'Order.Dispatched') == undefined) {
    timelineEvents.push({
      title: 'Dispatch package',
    });
  }

  if (events.find((event) => event.eventName == 'Order.Delivered') == undefined) {
    timelineEvents.push({
      title: 'Package received',
    });
  }

  if (events.find((event) => event.eventName == 'Order.ReturnDispatched') == undefined) {
    timelineEvents.push({
      title: 'Return package',
    });
  }

  if (events.find((event) => event.eventName == 'Order.Returned') == undefined) {
    timelineEvents.push({
      title: 'Successful return',
    });
  }

  if (events.find((event) => event.eventName == 'Order.Complete') == undefined) {
    timelineEvents.push({
      title: 'Complete',
    });
  }

  return timelineEvents;
};

export { GenerateEvents };
