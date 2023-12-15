import Link from 'next/link';
import styles from './nav.module.scss';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

const Nav = async () => {

    const session = await getServerSession(options);

    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/Member">
                        Member
                    </Link>
                </li>
                <li>
                    <Link href="/ClientMember">
                        Client Member
                    </Link>
                </li>
                <li>
                    <Link href="/CreateUser">
                        Create User
                    </Link>
                </li>
                {session
                ? <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> 
                : <Link href="/api/auth/signin">Login</Link>
                }

            </ul>
        </nav>
    );
};

export default Nav;
