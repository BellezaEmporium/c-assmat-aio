import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

export const CalendarApp = () => {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/planning');
        setEvents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du planning :', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ marginTop: '16px' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="fr"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
      />
    </div>
  );
};