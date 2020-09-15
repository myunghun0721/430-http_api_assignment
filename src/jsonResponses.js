const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};


const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  const  xml = '<response><message>This is a successful response</message></response>'
  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) =>{
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (params.id == 'unauthorized' || params.loggedIn !=='yes') {
    responseJSON.message = 'Missing logged in query parameter set to yes';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
}

const forbidden = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (params.id == 'forbidden' || params.valid !=='true') {
    responseJSON.message = 'You do not have access to this content';
    responseJSON.id = 'forbidden';

    return respondJSON(request, response, 403, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
}

const internal = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (params.id == 'internal' || params.valid !=='true') {
    responseJSON.message = 'Internal Server Error. Something went wrong.';
    responseJSON.id = 'internal';

    return respondJSON(request, response, 500, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
}

const notImplemented = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (params.id == 'notImplemented' || params.valid !=='true') {
    responseJSON.message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
    responseJSON.id = 'notImplemented';

    return respondJSON(request, response, 501, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
}

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
