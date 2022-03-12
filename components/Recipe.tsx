import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

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

const Recipe: React.FC<{ recipe: RecipeProps }> = ({ recipe }) => {
  const authorName = recipe.author ? recipe.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/r/[id]", `/r/${recipe.id}`)}>
      <h2>{recipe.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={recipe.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Recipe;
