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

  if (events.find((event) => event.eventName == 'Order.DeliveryDispatched') == undefined) {
    timelineEvents.push({
      title: 'Dispatch package',
    });
  }

  if (events.find((event) => event.eventName == 'Order.DeliveryComplete') == undefined) {
    timelineEvents.push({
      title: 'Package received',
    });
  }

  //TODO check and show one day before the return date
  if (events.find((event) => event.eventName == 'Order.DeliveryComplete') == undefined) {
    timelineEvents.push({
      title: 'Use of items',
    });
  }

  if (events.find((event) => event.eventName == 'Order.ReturnDelivery') == undefined) {
    timelineEvents.push({
      title: 'Return package',
    });
  }

  if (events.find((event) => event.eventName == 'Order.ReturnDelivery') == undefined) {
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
