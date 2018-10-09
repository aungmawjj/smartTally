import config from '../config';


export function getErrorMsg(error) {
  switch(error.code) {
  case error.PERMISSION_DENIED:
    return "User denied the request for Geolocation.";

  case error.POSITION_UNAVAILABLE:
    return "Location information is unavailable.";

  case error.TIMEOUT:
    return "The request to get user location timed out.";

  case error.UNKNOWN_ERROR:
    return "An unknown error occurred while getting Location.";

  default:
    return "An unknown error occurred while getting Location.";
    
  }
}

export function getCurrentPosition()  {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      currentPosition => {
        resolve (currentPosition);
      },
      error => {
        resolve (error);
      },
      config.positionOptions,
    );
  }); 
}