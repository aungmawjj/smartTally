import config from '../config';

export function updateObjectInList(list, object){
  let found = false;
  let newList = list.map(o => {
    if (o._id === object._id) {
      found = true;
      return object;
    }
    return o;
  });
  if(found) return newList;
  return newList.concat(object);
}

export async function getErrorMsg(error, msg={}) {

  let errorText = 'Failed to connect';

  if(error.text) {
    errorText = await error.text();
    if (errorText.length > config.SNACKBAR_MAX_CHAR) {
      errorText = 'Bad Request';
    }
  }

  switch(error.status){

  case 401:
    return msg.msg401 || errorText;

  case 400:
    return msg.msg400 || errorText;

  default:
    return msg.default || errorText;
  }
}