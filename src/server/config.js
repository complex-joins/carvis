export const PORT = process.env.PORT || 8000;
import express from 'express';
import path from 'path';

export const configureServer = function(app) {
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.static(path.join(__dirname, '/../../node_modules')));
};
