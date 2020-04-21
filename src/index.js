import '@/styles/styles.css';
import '@/styles/scss.scss';
import Post from '@/models/Post.js'

const post = new Post('Заголовок 1');

console.log('post to string: ' + post.toString());
