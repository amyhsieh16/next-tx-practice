import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { notFound } from "next/navigation";

interface Ticket {
    id: number
    title: string
    content: string,
    body: string,
    priority: string,
    user_email: string,
}

async function getTicket(id: number) : Promise<Ticket>{
    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 0
        }
    });

    if(!res.ok) {
        notFound();
    }

    return res.json();
}


export default async function TicketDetail({ params } : { params: { id: number } }) {
    const ticket = await getTicket(params.id);

    return (
        <main>
            <nav>
                <h2>Tickets Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by{ticket.user_email}</small>
                <p>{ticket.body}</p>
            </div>
        </main>
    )
}