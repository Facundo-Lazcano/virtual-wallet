const { Movements } = require('../database')

const getMovements = async (req, res, next) => {
  const movements = await Movements.findAll({ where: { user_id: req.userId } })
  res.json(movements)
}

const getMovementById = async (req, res, next) => {
  const { id } = req.params
  const movement = await Movements.findOne({ where: { id } })
  res.json(movement)
}

const addMovement = async (req, res, next) => {
  const { amount, description, movement_type, date, category } = req.body
  const user_id = req.userId
  const movement = await Movements.create({
    amount,
    description,
    user_id,
    movement_type,
    date,
    category
  })
  res.json({
    movement
  })
}

const editMovement = async (req, res, next) => {
  const { amount, description, category } = req.body
  const movement = await Movements.update(
    { amount, description, category },
    {
      where: { id: req.params.id }
    }
  )
  res.json({
    movement
  })
}

const deleteMovement = async (req, res, next) => {
  await Movements.destroy({ where: { id: req.params.id } })
  res.json({ message: 'Movement deleted' })
}

module.exports = {
  getMovements,
  getMovementById,
  addMovement,
  editMovement,
  deleteMovement
}
