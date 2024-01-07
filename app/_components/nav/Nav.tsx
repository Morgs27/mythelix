import Link from 'next/link';
import'./Nav.scss';
import { getServerSession } from 'next-auth';
import {options} from "@/app/api/auth/[...nextauth]/options";
import Image from 'next/image';

const Nav = async () => {

    const session = await getServerSession(options);

    return (
        <nav className={'navbar'}>

                <Link href="/" className='home__link fade-in fade-left fade-time-10'>
                    <Image src="/logo-white.png" alt="Mythelix" width={100} height={100} />
                    Mythelix
                </Link>

                <div className="navbar__links">
                    {session
                    ? (
                        <>
                        <Link className={'fade-in fade-time-10 fade-delay-6 '} href="/Marketplace">Marketplace </Link> 
                        <Link className={'fade-in fade-time-10  fade-delay-6'} href="/Collection">Collection </Link> 
                        <Link className={'fade-in fade-time-10 fade-delay-6 '} href="/Leaderboard">Leaderboard </Link> 
                        <Link className={'fade-in fade-time-10 fade-delay-6 '} href="/Store">Store  </Link> 
                        <Link className={'fade-in fade-time-10 fade-delay-6 '} href="/api/auth/signout?callbackUrl=/">Logout </Link> 
                        </>
                    )
                    : <Link className={'fade-in fade-time-10 fade-delay-6 '} href="/auth/signin">Login / Register</Link>
                    }
                </div>
        </nav>
    );
};

export default Nav;
