// Event Listener for blog post form submission and initialization
document.addEventListener('DOMContentLoaded', function () {
	const newPostBtn = document.getElementById('newPostBtn');
	const postForm = document.getElementById('postForm');
	const blogPostForm = document.getElementById('blogPostForm');
	// Display stored posts on page load
	displayBlogPosts();

	// Make forum display style = block when new post button is clicked
	newPostBtn.addEventListener('click', () => {
		postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
	});

	// Handle form submission
	blogPostForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const title = document.getElementById('postTitle').value;
		const content = document.getElementById('postContent').value;

		saveBlogPost(title, content);

		// Reset form and hide it
		blogPostForm.reset();
		postForm.style.display = 'none';
	});
});

// Default author
let author = "Alan Kavanagh";

function saveBlogPost(title, content) {
	const posts = getBlogPosts();
	const newPost = {
		id: Date.now(),
		title: title,
		content: content,
		author: author,
		date: new Date().toLocaleDateString()
	};
	posts.push(newPost);
	localStorage.setItem('blogPosts', JSON.stringify(posts));
	displayBlogPosts();
}

function getBlogPosts() {
	const posts = localStorage.getItem('blogPosts');
	return posts ? JSON.parse(posts) : [];
}

function deletePost(postId) {
	const posts = getBlogPosts();
	const updatedPosts = posts.filter(post => post.id !== postId);
	localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
	displayBlogPosts();
}

// Displays blog posts and used to update page when a new post is added or deleted
function displayBlogPosts() {
	const posts = getBlogPosts();
	const blogPostsDiv = document.getElementById('blogPosts');
	blogPostsDiv.innerHTML = '';
	posts.sort((a, b) => b.id - a.id); // Sort posts by ID in descending order

	posts.forEach(post => {
		const postElement = document.createElement('div');
		postElement.className = 'blog-post';
		postElement.innerHTML = `
			<div class="post-header">
            	<h3>${post.title}</h3>
				<button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
			</div>
            <p>${post.content}</p>
            <small>By ${post.author} on ${post.date}</small>
        `;
		blogPostsDiv.appendChild(postElement);
	});
}
