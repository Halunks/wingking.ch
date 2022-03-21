import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import defaultImage from '../public/images/wings-default.jpg'
import defaultAuthor from '../public/images/alex-maeder.jpg'

export type RecipeProps = {
    id: number;
    title: string;
    author: {
        name: string;
        lastName: string;
        email: string;
    } | null;
    createdAt: string;
    content: string;
    published: boolean;
};

const Recipe: React.FC<{ recipe: RecipeProps }> = ({recipe}) => {
    const authorName = recipe.author ? recipe.author.name : "Unknown author";
    return (
        <div onClick={() => Router.push("/r/[id]", `/r/${recipe.id}`)}>
            <h2>{recipe.title}</h2>
            <Image
                src={defaultImage}
                layout="responsive"
            />
            <div className="imageWrapper">
                <Image
                    src={defaultAuthor}
                    className="authorImage"
                    height="150px"
                    width="150px"
                />
            </div>
            <small className="author">By {authorName}</small>
            <ReactMarkdown children={recipe.content}/>
            <style jsx>{`
              div {
                color: inherit;
                padding: 2rem;
              }

              @media only screen and (max-width: 800px) {
                div {
                  padding: 1rem;
                }
              }

              .author {
                display: flex;
                flex-direction: column;
              }

              .imageWrapper {
                margin-top: 0.8rem;
                border-radius: 50%;
                padding-left: 0;
                padding-bottom: 0;
              }
            `}</style>
        </div>
    );
};

export default Recipe;
