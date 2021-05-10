//form handler for creating a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();
  if (title && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

//form handler for deleting a post
const delButtonHandler = async (event) => {
  event.preventDefault();
  console.log('you are in delete button handler');
  
  const post_id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  };

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.deleteBut')
  .addEventListener('click', delButtonHandler);
