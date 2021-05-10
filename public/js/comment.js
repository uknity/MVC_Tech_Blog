//function event handler to handle the form contents

const addCommentFormHandler = async (event) => {
      console.log('you are in the add comment form handler');
      event.preventDefault();
      const description = document.querySelector('#comment-desc').value.trim();
      const button = document.querySelector('#newCommentButton');
      const post_id = button.getAttribute('data-id');

      console.log(description);

      if (description) {
        console.log('post_id', post_id);
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({
              description,
              // user_id,
              // post_id,
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            console.log('you made it through comment js');
            document.location.reload();
            document.location.replace(`/posts/${post_id}`);
          } else {
            alert('Failed to add comment');
          }
        };
      };

        //calls in #new-comment-form submit button
        document.querySelector('#new-comment-form').addEventListener('submit', addCommentFormHandler);


        // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
        // const post_id = window.location.toString().split('/')[
        //   window.location.toString().split('/').length - 1
        // ];
        // const id = window.location.toString().split('/')[
        //     window.location.toString().split('/').length - 1
        //   ];

        // const newFormHandler = async (event) => {
        //     event.preventDefault();



        //   if (description) {
        //     const response = await fetch(`/api/comments`, {
        //       method: 'POST',
        //       body: JSON.stringify({ description,  }),
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     });

        //     if (response.ok) {
        //       document.location.replace(`/posts`);
        //     } else {
        //       alert('Failed to create post');
        //     }
        //   }
        // };



        // document
        //   .querySelector('.new-comment-form')
        //   .addEventListener('submit', newCommentFormHandler);

        // const response = await fetch(`/api/comments`, {
        //   method: 'POST',
        //   body: JSON.stringify({ description,  }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        // }