import Link from 'next/link'
import Logo from './logo.jpg'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav>
            <Image
                src = {Logo}
                alt = 'Heep Logo'
                width={70}
                quality={100}
                placeholder='blur'
            />
            <h1>Heep</h1>
            <Link href="/">Home</Link>
            <Link href="/tickets">Tickets</Link>
        </nav>
    )
}