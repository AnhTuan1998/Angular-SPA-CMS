(function(window) {
  window.environment = window.environment || {};

  switch (window.location.hostname) {
    case 'localhost':
      window.environment.BASE_URL = 'http://localhost:8080';
      break;
    default:
      break;
  }
})(this);
