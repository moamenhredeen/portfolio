const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const {Marked} = require('marked');
const prettier = require('prettier');
const Prism = require('prismjs');

const marked = new Marked();
marked.use({
  hooks: {
    preprocess(markdown) {
      const {body} = fm(markdown);
      return body;
    }
  },
  renderer: {
    code({text, lang, escaped}) {
      const  hightlightedCode = Prism.highlight(text, Prism.languages[lang], lang)
      return `
      <div class="code-snippet-wrapper">
      <pre class="code-snippet language-${lang}"><code>${hightlightedCode}</code></pre>
      <button class="copy-code-snippet">copy</button>
      </div>`;
    }
  }
})

const postsDirectory = path.join(__dirname, '../src/posts');
const outputDirectory = path.join(__dirname, '../src/posts/generated');


try {
  const metadataList = [];
  const markdownFiles = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'))
  for (const fileName of markdownFiles) {
    const content = fs.readFileSync(path.join(postsDirectory, fileName), {encoding: 'utf8'});

    const renderedHtml = marked.parse(content);
    const fileNameWithHtmlExtension = fileName.replace(/\..+$/, '.html');
    prettier.format(
      `<!-- WARNING: do not change the content of this file. content of this file was auto generated using marked -->\n${renderedHtml}`,
      {
        parser: 'html'
      }).then(data => {
      fs.writeFileSync(path.join(outputDirectory, fileNameWithHtmlExtension), data, {encoding: 'utf8', flag: 'w+'});
    });

    const {attributes} = fm(content);
    if(attributes && attributes.title) {
      metadataList.push({
        id: attributes.title.toLowerCase().replace(/[^\w]+/g, '-'),
        title: '',
        description: '',
        date: Date.now(),
        status: 'in progress',
        url: fileNameWithHtmlExtension,
        ...attributes,
      });
    }
  }

  fs.writeFileSync(path.join(outputDirectory, 'posts.json'), JSON.stringify(metadataList, null, 2));
} catch (err) {
  console.log(err)
}
