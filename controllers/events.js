const {response} = require('express');
const Event = require('./../models/Events')


const getEvents = async(req,res = response) =>{

    const event = await Event.find().populate('user','name');

    res.json({
        ok:true,
        event
    })

}

const createEvent = async(req,res = response) =>{

    const event  = new Event(req.body);


    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        return res.json({
            ok:true,
            event: eventSaved
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Wait...'
        })
    }
}

const updateEvent = async(req,res = response) =>{

    const idEvent = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(idEvent);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'The event doesnt exists...'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You dont have privilege to do that'
            })
        }

       const newEvent = {
        ...req.body,
        user:uid
       }

       const updatedEvet = await Event.findByIdAndUpdate(idEvent, newEvent, {new: true});

       
       res.status(200).json({
        ok:true,
        event: updatedEvet
    })

    } catch (error) {
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:'Wait...'
        })
    }

}

const deleteEvent = async(req,res = response) =>{

    const idEvent = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(idEvent);

        if(!event){
            return  res.status(404).json({
                ok:false,
                msg:'The event doesnt exists...'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You dont have privilege to do that'
            })
        }

        await Event.findByIdAndDelete(idEvent);

       
        res.status(200).json({
        ok:true,
    })

    } catch (error) {
        console.log(err);
         res.status(500).json({
            ok:false,
            msg:'Wait...'
        })
    }


}

module.exports = {getEvents,createEvent,updateEvent,deleteEvent}

