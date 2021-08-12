const { Router } = require('express')
const router = Router()
const {getTarea, createTarea, getTareaById, updateTarea,updateEstadoTarea,deleteTarea } = require('../controllers/index')

router.get('/', getTarea)
router.post('/', createTarea)
router.get('/:id', getTareaById)

router.get('/delete/:id', deleteTarea)
router.put('/usuarios/:id', updateTarea)

module.exports = router
