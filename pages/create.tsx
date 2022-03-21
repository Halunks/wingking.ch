import React, {useState} from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('' +
        'Servings: 12 wings\n\n' +
        'Prep: 15 mins\n\n' +
        'Marinate: 2 hrs\n\n' +
        'Cook: 35 mins\n\n' +
        '## Ingredients\n' +
        '- 1 clove of garlic\n' +
        '- 1 tsp. salt\n' +
        '- 1 tsp. pepper\n' +
        '- 4 tbsp. chili powder\n' +
        '- 3 cups grill sauce\n\n' +
        '## Instructions\n' +
        'Adjust oven rack to upper-middle position and preheat oven to 450°F (230°C). Line a rimmed baking sheet with aluminium foil and set a heat-proof wire rack inside. \n' +
        '\n' +
        'Pat dry chicken wings liberally with paper towels, squeezing out as much moisture as you can. Transfer them to a large bowl.\n' +
        'In a small bowl, combine the baking powder, garlic powder, salt and pepper together, whisking well to combine, and sprinkle the mixture over the wings. Toss wings through the baking powder mixture until evenly coated. \n' +
        'Arrange on rack, leaving about 1-inch of space between each wing.\n' +
        'Bake for 30 minutes; flip and continue to cook until crisp and golden brown, (about 20-30 minutes longer), until golden browned and crispy.\n' +
        'While wings are cooking, whisk together hot sauce, butter and sugar. Toss wings through the sauce to evenly coat.\n' +
        'Serve wings immediately with blue cheese dressing or ranch dressing, and celery sticks.\n\n' +
        '## History of the Recipe\n' +
        'Tell us about the history of your recipe!\n\n' +
        '## Side Notes\n' +
        'Adjust, create and bring your unique recipe style to life by following markdown language rules.');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = {title, content};
            await fetch('/api/recipe', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });
            await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>New Draft</h1>
                    <p>
                        Make use of <a href="https://www.markdownguide.org/cheat-sheet/"> markdown language</a> to style
                        your recipe. There's an example below.
                    </p>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Recipe Title"
                        type="text"
                        value={title}
                    />
                    <textarea
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Recipe"
                        rows={35}
                        value={content}
                    />
                    <input disabled={!content || !title} type="submit" value="Create"/>
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
              .page {
                background: var(--geist-background);
                padding: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              input[type='text'],
              textarea {
                width: 100%;
                padding: 0.5rem;
                margin: 0.5rem 0;
                border-radius: 0.25rem;
                border: 0.125rem solid rgba(0, 0, 0, 0.2);
              }

              input[type='submit'] {
                background: #ececec;
                border: 0;
                padding: 1rem 2rem;
              }

              .back {
                margin-left: 1rem;
              }
            `}</style>
        </Layout>
    );
};

export default Draft;