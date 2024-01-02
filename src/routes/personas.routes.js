import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req,res)=>{
    res.render('personas/add');
});

router.post('/add', async(req, res)=>{
    try{
        const {dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente} = req.body;
        const newPersona = {
            dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente
        }
        await pool.query('INSERT INTO Cliente SET ?', [newPersona]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM Cliente');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [persona] = await pool.query('SELECT * FROM Cliente WHERE idCliente = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente} = req.body;
        const {id} = req.params;
        const editPersona = {dniCliente, apellidoCliente, nombreCliente, direccionCliente, edadCliente};
        await pool.query('UPDATE Cliente SET ? WHERE idCliente = ?', [editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM Cliente WHERE idCliente = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;