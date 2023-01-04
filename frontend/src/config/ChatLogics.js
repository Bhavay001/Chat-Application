// we know it is a single user chat so user will have the id of logged in user and selected/user to send msg
// we send the logged in user and selecte user
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// this tells if the person sending message is same or not
// it takes (all messages , current message , index of current msg , logged in user id)

export const isSameSender = (messages, m, i, userId) => {
  // checks if next message sender is same as current msg sender or not
  // check if current msg is not equal to the logged in user
  // because in logged in user we will not display the profile pic
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

// we need to margin the sender msg to the right and the recieved to the left
export const isSameSenderMargin = (messages, m, i, userId) => {
  // gives last msg of every recieved msg in continuation
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    // checks ekdum last msg of recieved
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
