/* eslint-disable no-unused-vars */
const express = require('express');
const axios = require('axios');

class location {
  constructor(street, city, number) {
    this.street = street;
    this.city = city;
    this.number = number;
  }

  getLatLong(street, city, number) {
    this.street = street.split(' ').join('');
    this.city = city.split(' ').join('');
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${this.street},+${this.city}&key=AIzaSyAbEaLFOEnoAi0EQp8-IfjVRs7piD9jNd8`);
  }

  get(street, city, number) {
    this.getLatLong(street, city, number);
  }
}

module.exports = location;
