/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const express = require('express');
const httpError = require('http-errors');

const Model = require('../../models/building.model');
const service = require('./building.service');

exports.getAllBuildingWithClassrooms = (req, res, next) => {
    return service.findAll()
        .then(list => {
            res.json(list);
        });
};

exports.updateBuilding = (req, res, next) => {
    const { buildingId, className } = req.body;
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new httpError.BadRequest('Missing field')            
        );
    }
    const update = {
        buildingId: buildingId,
        className: className        
    };
    return service.update(req.params.id, update)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            console.log(err);
            next(new httpError.InternalServerError('Could not updated building'));
        });
};

