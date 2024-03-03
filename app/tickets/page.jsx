import React from "react";
import TicketsList from "./TicketsList";

const Tickets = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
      </nav>

      <TicketsList />
    </main>
  );
};

export default Tickets;
