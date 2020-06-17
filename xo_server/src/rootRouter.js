const express = require('express');

class routerBuilder {
  _router;
  _midlewares;
  constructor(midlewares) {
    this._router = express.Router();
    this._midlewares = midlewares || [];
  }
  get (event, handler) {
    this._router.get(event, this._midlewares, handler);
  }
  post (event, handler) {
    this._router.post(event, this._midlewares, handler);
  }
  // put, delete... - to be implemented
  build () {
    return this._router;
  }
}

module.exports = routerBuilder;