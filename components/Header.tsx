import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import Image from "next/image";
import logo from '../public/images/logo.svg'
import {BsFileEarmarkPlus} from "react-icons/bs";
import {AiOutlineLogin, AiOutlineLogout} from "react-icons/ai";
import {ImFilesEmpty} from "react-icons/im";

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    const {data: session, status} = useSession();

    let left = (
        <div className="left">
            <Link href="/" passHref={true}>
                <Image
                    src={logo}
                    height={80}
                    width={80}
                    alt="logo of a chicken wing"
                />
            </Link>
            <Link href="/" passHref={true}>
                <a className="title">
                </a>
            </Link>
            <Link href="/" passHref={true}>
                <a className="title" data-active={isActive('/')}>
                    WINGKING<span className="span">.CH</span>
                </a>
            </Link>
            <style jsx>{`
              .title {
                font-size: xx-large;
                color: #D67300;
                margin-left: 15px;
              }

              .span {
                color: #924600;
              }

              a {
                text-decoration: none;
                color: var(--geist-foreground);
                display: inline-block;
              }

              .left a[data-active='false'] {
                color: gray;
              }

              a + a {
                margin-left: 1rem;
              }

              .left {
                display: flex;
                justify-content: center;
                align-items: center;
              }

              @media only screen and (min-width: 800px) {
                .title {
                  margin-left: 0;
                  font-size: xxx-large;
                }
              }
            `}</style>
        </div>
    );

    let right = null;

    if (status === 'loading') {
        left = (
            <div className="left">
                <Link href="/" passHref={true}>
                    <a className="bold" data-active={isActive('/')}>
                        Feed
                    </a>
                </Link>
                <style jsx>{`
                  .bold {
                    font-weight: bold;
                  }

                  a {
                    text-decoration: none;
                    color: var(--geist-foreground);
                    display: inline-block;
                  }

                  .left a[data-active='true'] {
                    color: gray;
                  }

                  a + a {
                    margin-left: 1rem;
                  }
                `}</style>
            </div>
        );
        right = (
            <div className="right">
                <p>Validating session ...</p>
                <style jsx>{`
                  .right {
                    display: flex;
                    justify-content: center;
                  }
                `}</style>
            </div>
        );
    }

    if (!session) {
        right = (
            <div className="right">
                <p className="micro">Want to add a recipe?</p>
                <Link href="/api/auth/signin" passHref={true}>
                    <a className="icon" data-active={isActive('/signup')}><AiOutlineLogin/></a>
                </Link>
                <style jsx>{`
                  .micro {
                    padding: 0;
                    font-size: 20px;
                    margin: 0 1rem 0 0;
                    display: flex;
                    align-items: center;
                  }

                  a {
                    text-decoration: none;
                    color: var(--geist-foreground);
                    background-color: rgb(219 219 219);
                    height: 3rem;
                    display: flex;
                    align-items: center;
                  }

                  a + a {
                    margin-left: 1rem;
                  }

                  .right {
                    display: flex;
                    justify-content: center;
                    height: 3rem;
                  }

                  .right a {
                    border: 1px solid var(--geist-foreground);
                    padding: 1rem 2rem;
                    border-radius: 3px;
                  }

                  .icon {
                    font-size: 24px;
                  }

                  .icon:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                  }
                `}</style>
            </div>
        );
    }

    if (session) {
        left = (
            <div className="left">
                <Link href="/" passHref={true}>
                    <Image
                        src={logo}
                        height={80}
                        width={80}
                        alt="logo of a chicken wing"
                    />
                </Link>
                <Link href="/" passHref={true}>
                    <a className="title">
                    </a>
                </Link>
                <Link href="/" passHref={true}>
                    <a className="title" data-active={isActive('/')}>
                        WINGKING<span className="span">.CH</span>
                    </a>
                </Link>
                <style jsx>{`
                  .title {
                    font-weight: bold;
                    font-size: xx-large;
                    color: #D67300;
                    margin-left: 15px;
                  }

                  @media only screen and (min-width: 800px) {
                    .title {
                      margin-left: 0;
                      font-size: xxx-large;
                    }
                  }

                  .span {
                    color: #924600;
                  }

                  .main {
                    margin-left: 25px;
                  }

                  a {
                    text-decoration: none;
                    color: var(--geist-foreground);
                    display: flex;
                    font-size: 20px;
                  }

                  .left a[data-active='false'] {
                    color: gray;
                  }

                  .left {
                    align-items: center;
                    justify-content: center;
                    display: flex;
                  }

                  a + a {
                    margin-left: 1rem;
                  }

                  @media only screen and (max-width: 800px) {
                    .title {
                      margin-left: 0;
                    }
                  }
                `}</style>
            </div>
        );
        right = (
            <div className="right">
                <p className="user">
                    {session.user.name}
                </p>
                <Link href="/create" passHref={true}>
                    <button>
                        <a className="icon"><BsFileEarmarkPlus/></a>
                    </button>
                </Link>
                <Link href="/drafts" passHref={true}>
                    <button>
                        <a className="icon" data-active={isActive('/drafts')}><ImFilesEmpty/></a>
                    </button>
                </Link>
                <button onClick={() => signOut()}>
                    <a className="icon"><AiOutlineLogout/></a>
                </button>
                <style jsx>{`
                  a {
                    text-decoration: none;
                    color: var(--geist-foreground);
                    display: flex;
                    font-size: 14px;
                  }

                  .icon {
                    font-size: 24px;
                  }

                  p {
                    display: flex;
                    align-items: center;
                    padding-right: 0.5rem;
                    font-size: 20px;
                  }

                  a + a {
                    margin-left: 1rem;
                  }

                  .right {
                    display: flex;
                    justify-content: flex-end;
                    height: 3rem;
                    margin-top: 0.5rem;
                  }

                  .right a {
                    border: 1px solid var(--geist-foreground);
                    padding: 0.5rem 1rem;
                    border-radius: 3px;
                  }

                  button {
                    border: none;
                    background-color: rgb(219 219 219);
                    margin-right: 0.5rem;
                    margin-left: 0.5rem;
                  }

                  button:hover {
                    background: rgba(0, 0, 0, 0.05);
                  }

                  @media only screen and (max-width: 800px) {
                    button {
                      margin-left: 0;
                    }

                    .right a {
                      padding: 0.5rem 0.5rem;
                    }
                  }
                `}</style>
            </div>
        );
    }

    return (
        <nav>
            <header className="header">
                {left}
                {right}
                <style jsx>{`
                  nav {
                    display: flex;
                    padding: 2rem;
                    align-items: center;
                  }

                  @media only screen and (max-width: 800px) {
                    .header {
                      display: flex;
                      flex-direction: column;
                      padding: 0.5rem;
                    }
                  }

                  @media only screen and (min-width: 801px) {
                    .header {
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                      align-items: center;
                      font-size: 16px;
                      padding: 1rem;
                    }
                  }
                `}</style>
            </header>
        </nav>
    );
};

export default Header;