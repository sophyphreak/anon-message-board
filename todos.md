TODOS:
I can POST a reply to a thead on a specific board by passing form data text, delete_password, & thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array will be saved \_id, text, created_on, delete_password, & reported.

- api
  I can GET an entire thread with all it's replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields.
- tests
- api
  I can delete a post(just changing the text to '[deleted]') if I send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. (Text response will be 'incorrect password' or 'success')
- tests
- api
  I can report a reply and change it's reported value to true by sending a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. (Text response will be 'success')
- tests
- api
  Complete functional tests that wholely test routes and pass.
