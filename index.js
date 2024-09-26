import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let blogs = [];

app.get('/', (req, res) => {
    res.render('index.ejs', {
        blogs: blogs,
    });
});

app.post('/', (req, res) => {
    const newBlog = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    };

    // Check if the blog already exists
    const existingBlog = blogs.find(blog => blog.title === newBlog.title);

    if (!existingBlog) {
        blogs.push(newBlog);
    }

    res.render('index.ejs', {
        blogs: blogs,
    });
});

app.get('/write-a-blog', (req, res) => {
    res.render('writeBlog.ejs');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
});