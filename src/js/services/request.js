const requestNotes = async (endpoint, method, request_body) => {
  const base_url = 'https://notes-api.dicoding.dev/v2';

  switch (method) {
    case 'GET':
      // show loading indicator
      const container = document.querySelector('main');
      const loader = document.querySelector('loading-ping');
      container.setAttribute('class', 'container mx-auto p-5 min-h-dvh flex justify-center items-center');
      loader.setAttribute('class', 'block');

      try {
        // get notes response and show success message on console
        const response = await fetch(base_url + endpoint);
        const result = await response.json();
        responseMessage('log', result);
        return result;
        // if error, show error message on console
      } catch (error) {responseMessage('error');}
      finally {
        // hide loading indicator
        container.setAttribute('class', 'container mx-auto p-5 pt-[100px] min-h-dvh');
        loader.classList.replace('block', 'hidden');
      }
      break;

    case 'POST':
      // if request_body undefined, use the first value, otherwise use the second value 
      const options = !request_body ? {method: 'POST'} : {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request_body),
      };

      try {
        // post notes request and show success message on console
        const response = await fetch(base_url + endpoint, options);
        const result = await response.json();
        responseMessage('log', result);
        // if error, show error message on console
      } catch (error) {responseMessage('error');}
      break;

    case 'DELETE':
      try {
        // delete notes and show success message on console
        const options = {method: 'DELETE'}
        const response = await fetch(base_url + endpoint, options);
        const result = await response.json();
        responseMessage('log', result);
        // if error, show error message on console
      } catch (error) {responseMessage('error');}
      break;
  }
};

// response message function
const responseMessage = (type, response) => {
  switch (type) {
    case 'log':
      console.info({
        status: response.status,
        message: response.message
      });
      break;

    case 'error':
      console.error({
        status: 'unsuccessfull',
        message: 'error'
      });
      break;
  }
};

export default requestNotes;