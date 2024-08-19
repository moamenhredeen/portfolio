const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const postsDirectory = path.join(__dirname, '../src/posts');
const outputFilePath = path.join(__dirname, '../src/posts/posts.json');

try {
  posts = [];
  fs.readdirSync(postsDirectory)
    .filter(name => name.endsWith('.md'))
    .forEach((fileName, index) => {
      const content = fs.readFileSync(path.join(postsDirectory, fileName), {encoding: 'utf8'});
      const {attributes} = fm(content);
      posts.push({
        id: index,
        title: '',
        description: '',
        date: '',
        status: 'in progress',
        url: fileName,
        ...attributes,
      });
    });

  fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));
} catch (err) {
  console.log(err)
}
