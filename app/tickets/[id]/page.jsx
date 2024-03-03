import React from "react";
import { notFound } from "next/navigation";

//default value for dynamicParams is true
export const dynamicParams = true; //if this is set to false, next js will server up a default 404 page, when a request for an id comes, which doesnt not exist in the prerendered pages for ids

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:4000/tickets`);

  const tickets = await res.json();

  return tickets.map((ticket) => ({ id: ticket.id }));
}

async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const TicketDetails = async ({ params }) => {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
