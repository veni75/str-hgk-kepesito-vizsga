const express = require('express');
const createError = require('http-errors');

const Model = require('../../models/student.model');
const service = require('./student.service');

exports.create = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return service.create(req.body)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return service.findAll()
        .then(list => {
            res.json(list);
        });
};

exports.findOne = (req, res, next) => {
    return service.findOne(req.params.id)
        .then(entity => {
            if (!entity) {
                return next(new createError.NotFound("Student is not found"));
            }
            return res.json(entity);
        });
};

exports.update = (req, res, next) => {
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return service.update(req.params.id, req.body)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            console.log(err);
            next(new createError.InternalServerError('Student could not updated'));
        });
};

exports.delete = (req, res, next) => {
    return service.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            return next(new createError.InternalServerError('Could not deleted user'));
        });
};