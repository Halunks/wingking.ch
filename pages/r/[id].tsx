import React from "react"
import {GetServerSideProps} from "next"
import ReactMarkdown from "react-markdown"
import Router from "next/router";
import Layout from "../../components/Layout"
import {RecipeProps} from "../../components/Recipe"
import {useSession} from "next-auth/react";
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: Number(params?.id) || -1,
        },
        include: {
            author: {
                select: {name: true, email: true},
            },
        },
    });
    return {
        props: recipe,
    };
};

async function publishRecipe(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
        method: 'PUT',
    });
    await Router.push('/');
}

async function deleteRecipe(id: number): Promise<void> {
    await fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
    });
    Router.push('/');
}

const Recipe: React.FC<RecipeProps> = (props) => {
    const {data: session, status} = useSession();
    if (status === 'loading') {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    const postBelongsToUser = session?.user?.email === props.author?.email;
    let title = props.title;
    if (!props.published) {
        title = `${title} (Draft)`;
    }

    return (
        <Layout>
            <div>
                <h2>{title}</h2>
                <p>By {props?.author?.name || "Unknown author"}</p>
                {/* eslint-disable-next-line react/no-children-prop */}
                <ReactMarkdown children={props.content}/>
                {
                    !props.published && userHasValidSession && postBelongsToUser && (
                        <button onClick={() => publishRecipe(props.id)}>Publish</button>
                    )
                }
                {
                    userHasValidSession && postBelongsToUser && (
                        <button onClick={() => deleteRecipe(props.id)}>Delete</button>
                    )
                }
            </div>
            <style jsx>{`
              .page {
                background: var(--geist-background);
                padding: 2rem;
              }

              .actions {
                margin-top: 2rem;
              }

              button {
                background: #ececec;
                border: 0;
                border-radius: 0.125rem;
                padding: 1rem 2rem;
              }

              button + button {
                margin-left: 1rem;
              }
            `}</style>
        </Layout>
    )
}

export default Recipe
