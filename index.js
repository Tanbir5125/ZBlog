import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

let blogs = [];

app.get('/', (req, res) => {
    res.render('index.ejs',{
        blogs,
    });
});

app.post('/showBlogs', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    const newBlog = {
        title,
        author,
        content,
        id: blogs.length,
    };

    blogs.push(newBlog);

    res.redirect('/');
})

app.get('/showBlogs/:id', (req, res) => {
    const blogId = req.params.id;
    const blog = blogs[blogId];

    if (blog) {
        res.render('showBlogs.ejs', { blog, blogId});
    } else {
        res.redirect('/');
    }
});

app.get('/write-a-blog', (req, res) => {
    res.render('writeBlog.ejs');
});

app.get('/edit-blog/:id', (req, res) => {
    const blogId = req.params.id;
    const blog = blogs[blogId];

    if (blog) {
        res.render('editBlog.ejs', { blog, blogId });
    } else {
        res.redirect('/');
    }
});

app.post('/edit-blog/:id', (req, res) => {
    const blogId = req.params.id;
    const updatedBlog = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        id: blogId,
    };

    if (blogs[blogId]) {
        blogs[blogId] = updatedBlog;
    }

    res.redirect('/');
});

app.post('/delete-blog/:id', (req, res) => {
    const blogId = req.params.id;

    if (blogs[blogId]) {
        blogs.splice(blogId, 1);
        blogs = blogs.map((blog, index) => ({...blog, id: index }));
    }

    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
});