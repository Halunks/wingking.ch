import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Recipe , { RecipeProps } from '../components/Recipe';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {

    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.recipe.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: RecipeProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((recipe) => (
            <div key={recipe.id} className="recipe">
              <Recipe recipe={recipe} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .recipe {
          background: var(--geist-background);
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
  );
};

export default Drafts;