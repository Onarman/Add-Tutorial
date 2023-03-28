import React from 'react'
import AddTutorial from '../components/AddTutorial'
import TutorialList from '../components/TutorialList'
import axios from "axios";
import { useState, useEffect } from 'react';

const Home = () => {

    const [tutorials, setTutorials] = useState();

    const url = "https://639973e416b0fdad773d2329.mockapi.io/Onarmantasktracker";

    //!GET (read)
    const getTutorials = async () => {
        try {
            const { data } = await axios.get(url);
            setTutorials(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTutorials()
    }, [])

    //!POST (Create)
    const addTutorials = async (tutorial) => {
        try {
            await axios.post(url, tutorial)
        } catch (error) {
            console.log(error);
        }
        getTutorials()
    }

    //!DELETE (delete)
    const deleteTutorial = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
        } catch (error) {
            console.log(error)
        }
        getTutorials()
    }

    //! UPDATE (put: Whole update,patch:Partially Update)

    const editTutorial = async (id, title, desc) => {
        const filtered = tutorials
            .filter((tutor) => tutor.id === id)
            .map(() => ({ title: title, description: desc }))

        console.log(filtered);
        try {
            await axios.put(`${url}/${id}`, filtered[0])
        } catch (error) {
            console.log(error)
        }
        getTutorials()
    }



    return (
        <div>
            <AddTutorial addTutorials={addTutorials} />
            <TutorialList
                tutorials={tutorials}
                deleteTutorial={deleteTutorial}
                editTutorial={editTutorial}
            />
        </div>

    )
}

export default Home













