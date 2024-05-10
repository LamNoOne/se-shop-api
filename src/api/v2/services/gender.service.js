"use strict"

const { Gender } = require("~/api/v2/models")
const ApiError = require("~/core/api.error")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const createGender = async ({ name }) => {
    try {
        return await Gender.create({ name })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    }
}

const getAllGenders = async ({ filter, selector, pagination, sorter }) => {
    try {
        return await Gender.findAll({
            where: filter,
            attributes: selector,
            offset: pagination.skip,
            limit: pagination.limit,
            order: sorter,
        })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
    }
}

const getGenderByName = async ({ name }) => {
    return await Gender.findOne({
        where: { name },
    })
}

const getGenderById = async ({ id }) => {
    const gender = await Gender.findByPk(id)
    if (!gender) throw new ApiError(StatusCodes.NOT_FOUND, "Item not found")
    return gender
}

const updateGenderById = async ({ id, name }) => {
    const gender = await Gender.findOne({
        where: { id },
    })
    if (!gender) throw new ApiError(StatusCodes.NOT_FOUND, "Item not found")
    return await gender.update({ name })
}

const deleteGenderById = async ({ id }) => {
    const gender = await Gender.findByPk(id)
    if (!gender) throw new ApiError(StatusCodes.NOT_FOUND, "Item not found")
    const { dataValues } = await gender.destroy()
    if (!dataValues)
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )
}

const deleteGenderByIds = async ({ ids }) => {
    const numberDeletedItems = await Gender.destroy({
        where: { id: ids },
    })
    const NO_ITEMS_DELETEDS = 0
    if (numberDeletedItems === NO_ITEMS_DELETEDS)
        throw new ApiError(StatusCodes.BAD_REQUEST, "No items are deleted")
}

module.exports = {
    createGender,
    getAllGenders,
    getGenderByName,
    getGenderById,
    updateGenderById,
    deleteGenderById,
    deleteGenderByIds,
}
