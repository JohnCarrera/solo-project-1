const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { GroupImage } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    let { imageId } = req.params;
    imageId = Number(imageId);

    let imageById = await GroupImage.findAll({
        where: {
            id: imageId
        }
    });

    if (!imageById.length) {
        const err = new Error("Group Image couldn't be found");
        err.status = 404;
        err.title = 'Not found'
        return next(err);
    }

    let image = imageById[0];

    image.destroy();

    res.json({
        message: 'Successfully deleted',
        StatusCode: 200
    });

});

module.exports = router;
