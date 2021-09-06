/**
 * @TODO : Mongoose modellek segítségével frissitsen egy 'building' entitást az adatbázisban.
 * - el kell menteni egy új "classroom" entitást.
 * - ki kell nyeri az új "classroom" id-ját.
 * - az id-t helyezze el a megfelelő 'Building' entitás 'classrooms' listájába
 *
 * A @getAll metódus adja vissza a populált teljes "building" listát
 */

exports.update = (buildingId, className) => Model.findByIdAndUpdate(buildingId, className, { new: true });

exports.getAll = () => Model.find().populate('classrooms');

const Model = require('../../models/building.model');
