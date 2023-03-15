const request = require('supertest');
const express = require('express');
const artistSearchController = require('../src/controllers/artist.controller');



describe('artistSearchController', () => {
    
    it('should return search results for valid artist name', async () => {
      const req = { query: { artistName: 'Cher' } };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await artistSearchController(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  
    it('should return random search results for invalid artist name', async () => {
      const req = { query: { artistName: 'BBBBBBAAAAAA' } };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await artistSearchController(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
    
    it('should throw an error for an invalid request', async () => {
      const req = { query: {} };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await artistSearchController(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });