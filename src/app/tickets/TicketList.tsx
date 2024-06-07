import Link from "next/link";

interface Ticket {
    id: number
    title: string
    content: string,
    body: string,
    priority: string
}

async function getTickets() : Promise<Ticket[]>{
    const res = await fetch('http://localhost:4000/tickets', {
        next: {
            revalidate: 0
        }
    });

    return res.json();
}


export default async function TicketList() {
    const tickets = await getTickets();

    return (
        tickets.length === 0 ? (
            <p>No tickets to display</p>
        ):(
            tickets.map((ticket: Ticket) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0,200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))
        )     
    )
}