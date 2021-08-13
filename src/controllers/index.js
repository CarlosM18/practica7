const {Pool} =require('pg')
const path = require('path')

const pool=new Pool({
    host: 'ec2-44-196-250-191.compute-1.amazonaws.com',
    port: 5432,
    user: 'vetiwtppfgydoi',
    password: '0e1f884129c9368248d9938b92b0bdf2e4c92c8bc42219af8e96987f46b37e92',
    database: 'd9nqjqnq0u9m0f',
    ssl:{
        rejectUnauthorized: false,
    },
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const getTarea=async (req,res)=>{

    const respuesta=await pool.query('SELECT * FROM tarea ORDER BY _id')
    console.log(respuesta.rows);
        res.render("tarea", {
            tareas: respuesta.rows
        });  
}

const getTareaById=async (req,res)=>{
    const tarea=await pool.query('SELECT * FROM tarea WHERE _id=$1',[req.params.id])
    const tareas=await pool.query('SELECT * FROM tarea ORDER BY _id')
        res.render("tarea", {
            tarea: tarea.rows[0],
            tareas: tareas.rows
        });
}

const createTarea=async (req,res)=>{
    if(req.body._id===''){
        const {nombre} = req.body
        const respuesta= await pool.query('INSERT INTO tarea(nombre) VALUES ($1)',[nombre])
        res.redirect('/')
    }else{
        updateTarea(req,res)
    }

}

const deleteTarea= async (req,res)=>{
    await pool.query('DELETE FROM tarea WHERE _id=$1',[req.params.id])
    res.redirect('/')
}

const updateTarea= async (req,res)=>{
    const id=req.body._id
    const {nombre}=req.body
    await pool.query('UPDATE tarea SET nombre=$1 WHERE _id=$2',[nombre,id])
    res.redirect('/')
}

const updateEstadoTarea= async (req,res)=>{
    const id=req.params.id
    await pool.query('UPDATE tarea SET estado=$1 WHERE _id=$2',['true',id])
    res.redirect('/')
}    //COMENTADO/

module.exports={
    getTarea,
    createTarea,
    getTareaById,
    deleteTarea,
    updateTarea,
    updateEstadoTarea
}