Documentation of using the authentication dependent systems.
The following is using Postman as API testing platform.
## GUI-Related

### Register a new User.
There are two classes of register. One can register the Manager (which later on will be automatic), and one can register Prosumers.

**POST** to **/register**

Currently you need to send an ID and a password to create a User.
Sending ID = "Manager" will occupy and create the Manager position.

The following is an example of creating a user:
```json
{
    "id": "prosumer1",
    "password": "bralosenord123"
}
```
You can expect a response as:
```
{
  success: true
  Sucessfully signed up
  prosumer1
}
```

If no ID, no password or already claimed ID is sent you can expect a response:

```
{
  Need a user ID and Password.
}
```
Or
```
{
  Id already claimed.
}
```

### Login a User.
Login in a registered user will provide a session token which is stored in cookies for that user.
This token will be required for any GUI related action of the user to authenticate that this is a legitimate request.

**POST** to **/login**

You can login as both types of user using the same form as when registering:
```
{
    "id": "pelle2",
    "password": "tjosan123"
}
```

When entering a correct ID and Password you can expect an answer as:
```
{
  success: true,
  message: 'Successfully Logged in!',
  _id (<-- The long user id)
  pelle2
  authToken (<-- long weird string with your authentication/session token) 
}
```

If ID or Password is incorrect you can expect a response:
```
{
  success: false,
  User id not found.
}
```

Or

```
{
  success: false,
  Wrong Password.
}
```

### Logout a User

**GET** to **/logout**

Logout a user requires an active session token in cookies, or spoofing a Bearer token via Postman.

The following response is given if a legitimate session token is found connected to the user id.

```
{
  success: true,
  Successfully logged out.
}
```
If an error occurs or no active token is found the response will simply be the corresponding error message.






