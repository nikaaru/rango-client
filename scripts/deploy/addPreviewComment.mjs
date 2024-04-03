import { createComment } from './path/to/githubFunctions.js'; // Adjust the path accordingly

async function run() {
  const issueNumber = process.env.ISSUE_NUMBER;
  const appUrl = process.env.APP_URL;
  const playgroundUrl = process.env.PLAYGROUND_URL;
  const owner = process.env.OWNER;
  const repo = process.env.REPO;

  const commentBody = `App Preview URL: ${appUrl}\nPlayground Preview URL: ${playgroundUrl}`;

  try {
    await createComment(issueNumber, commentBody, owner, repo);
    console.log('Comment added successfully.');
  } catch (error) {
    console.error('Error adding comment:', error);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});