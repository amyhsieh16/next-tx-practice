"use client"

import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"

export default function CreateForm() {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const ticket = {
            title,
            body,
            priority,
            user_email: 'sss@kl.cc'
        }
        const res = await fetch('http://localhost:4000/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        })

        if(res.status === 201) {
            router.refresh()
            router.push('/tickets')
        }
    }

    return (
       <form onSubmit={handleSubmit} className="w-1/2">
            <label>
                <span>Title:</span>
                <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br></br>
            <label>
                <span>Body:</span>
                <input
                    required
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </label>
            <br></br>
            <label>
                <span>Priority:</span>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <button 
                className="btn-primary"
                disabled={isLoading}
            >
                {isLoading && <span className="ml-2">Adding...</span>}
                {!isLoading && <span className="ml-2">🚀</span>}
            </button>
       </form>
    )
}