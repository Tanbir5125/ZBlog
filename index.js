import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

let blogs = [];

app.get('/', (req, res) => {
    res.render('index', {
        blogs,
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

    res.redirect('/');
});

app.get('/write-a-blog', (req, res) => {
    res.render('writeBlog');
});

app.get('/edit-blog/:id', (req, res) => {
    const blogId = req.params.id;
    const blog = blogs[blogId];

    if (blog) {
        res.render('editBlog', { blog, blogId });
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
    };

    if (blogs[blogId]) {
        blogs[blogId] = updatedBlog;
    }

    res.redirect('/');
});

app.post('/delete-blog/:id',(req,res)=>{
    const blogId = req.params.id;

    if(blogs[blogId]) {
        blogs.splice(blogId, 1);
    }

    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
});