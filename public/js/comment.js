//function event handler to handle the form contents

const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector('#comment-desc').value;
  //or querySelector tenant id from handlebars pg.

// window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  const response = await fetch(`/api/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      tenantFirstName,
      tenantLastName,
      phone,
      emerContact,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    //redirect to `/view_tenant/${id}`
    document.location.replace(`/view_tenant/${id}`);
  } else {
    alert('Failed to edit tenant');
  }
}

//calls in #update_tenant submit button
document.querySelector('#update_tenant').addEventListener('submit', updateTenantFormHandler);

const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

const newFormHandler = async (event) => {
    event.preventDefault();
      
    const description = document.querySelector('#comment-desc').value.trim();

    console.log(description);
  
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ description,  }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/posts`);
      } else {
        alert('Failed to create post');
      }
    }
  };



document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);