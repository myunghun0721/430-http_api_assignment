const respondJSON = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  // response.write(JSON.stringify(content));
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message></response>`;
    return respondJSON(request, response, 200, responseXML, 'text/xml');
  }

  const meesageStr = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, meesageStr, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  const meesageStr = JSON.stringify(responseJSON);

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondJSON(request, response, 400, responseXML, 'text/xml');
    }
    return respondJSON(request, response, 400, meesageStr, 'application/json');
  }

  return respondJSON(request, response, 200, meesageStr, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  const meesageStr = JSON.stringify(responseJSON);

  if (params.id === 'unauthorized' || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing logged in query parameter set to yes';
    responseJSON.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondJSON(request, response, 401, responseXML, 'text/xml');
    }

    return respondJSON(request, response, 401, meesageStr, 'application/json');
  }

  return respondJSON(request, response, 200, meesageStr, 'application/json');
};

const forbidden = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  const meesageStr = JSON.stringify(responseJSON);

  if (params.id === 'forbidden' || params.valid !== 'true') {
    responseJSON.message = 'You do not have access to this content';
    responseJSON.id = 'forbidden';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondJSON(request, response, 403, responseXML, 'text/xml');
    }

    return respondJSON(request, response, 403, meesageStr, 'application/json');
  }

  return respondJSON(request, response, 200, meesageStr, 'application/json');
};

const internal = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  const meesageStr = JSON.stringify(responseJSON);

  if (params.id === 'internal' || params.valid !== 'true') {
    responseJSON.message = 'Internal Server Error. Something went wrong.';
    responseJSON.id = 'internal';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondJSON(request, response, 500, responseXML, 'text/xml');
    }

    return respondJSON(request, response, 500, meesageStr, 'application/json');
  }

  return respondJSON(request, response, 200, meesageStr, 'application/json');
};

const notImplemented = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  const meesageStr = JSON.stringify(responseJSON);

  if (params.id === 'notImplemented' || params.valid !== 'true') {
    responseJSON.message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
    responseJSON.id = 'notImplemented';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
      return respondJSON(request, response, 501, responseXML, 'text/xml');
    }

    return respondJSON(request, response, 501, meesageStr, 'application/json');
  }

  return respondJSON(request, response, 200, meesageStr, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  const meesageStr = JSON.stringify(responseJSON);

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;

    return respondJSON(request, response, 404, responseXML, 'text/xml');
  }

  return respondJSON(request, response, 404, meesageStr, 'application/json');
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
