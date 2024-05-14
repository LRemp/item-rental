const GenerateEvents = (events: EventLog[]): TimelineEvent[] => {
  const timelineEvents: TimelineEvent[] = [];

  events.forEach((event) => {
    timelineEvents.push({
      title: event.title,
      date: event?.timestamp ? new Date(event.timestamp).toLocaleString() : '',
      description: event.description,
    });
  });

  if (events.find((event) => event.eventName === 'Order.Accepted') === undefined) {
    timelineEvents.push({
      title: 'Rezervacija patvirtinta',
    });
  }

  if (events.find((event) => event.eventName === 'Order.Dispatched') === undefined) {
    timelineEvents.push({
      title: 'Išsiųsta',
    });
  }

  if (events.find((event) => event.eventName === 'Order.Delivered') === undefined) {
    timelineEvents.push({
      title: 'Užsakymas pristatytas',
    });
  }

  if (events.find((event) => event.eventName === 'Order.ReturnDispatched') === undefined) {
    timelineEvents.push({
      title: 'Grąžinamas užsakymas',
    });
  }

  if (events.find((event) => event.eventName === 'Order.Returned') === undefined) {
    timelineEvents.push({
      title: 'Užsakymas grąžintas',
    });
  }

  if (events.find((event) => event.eventName === 'Order.Complete') === undefined) {
    timelineEvents.push({
      title: 'Nuoma sėkmingai atlikta',
    });
  }

  return timelineEvents;
};

export { GenerateEvents };
