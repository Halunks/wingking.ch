import React from "react"
import {GetStaticProps} from "next"
import Layout from "../components/Layout"
import Recipe, {RecipeProps} from "../components/Recipe"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.recipe.findMany({
        where: {published: true},
        include: {
            author: {
                select: {name: true},
            },
        },
    });
    return {props: {feed}};
};

type Props = {
    feed: RecipeProps[]
}

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>All Recipes</h1>
                <main>
                    {props.feed.map((recipe) => (
                        <div key={recipe.id} className="recipe">
                            <Recipe recipe={recipe}/>
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
              .recipe {
                background: white;
                transition: box-shadow 0.1s ease-in;
              }

              .recipe:hover {
                box-shadow: 1px 1px 3px #aaa;
              }

              .recipe + .recipe {
                margin-top: 2rem;
              }
            `}</style>
        </Layout>
    )
}

export default Blog
