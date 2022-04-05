import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import defaultAuthor from '../public/images/alex-maeder.jpg'
import defaultPicture from '../public/images/wings-default.jpg'

export type RecipeProps = {
    id: number;
    title: string;
    author: {
        name: string;
        lastName: string;
        email: string;
    } | null;
    image: string;
    // TODO implement when db model valid
    // createdAt: string;
    // updatedAt: string;
    content: string;
    published: boolean;
};


const Recipe: React.FC<{ recipe: RecipeProps }> = ({recipe}) => {
    const authorName = recipe.author ? recipe.author.name : "Unknown author";
    return (
        <div onClick={() => Router.push("/r/[id]", `/r/${recipe.id}`)}>
            <h2>{recipe.title}</h2>
            <Image
                src={defaultPicture}
                key={recipe.id}
                layout="responsive"
                alt="Cooked chicken wings"
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

              @media only screen and (max-width: 800px) {
                div {
                  padding: 1rem;
                }
              }
            `}</style>
        </div>
    );
};

export default Recipe;
