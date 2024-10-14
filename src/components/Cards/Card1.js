import React, { useEffect, useState } from 'react';
import './Card.css';
import tag from '../../assets/tag.png'
import img0 from '../../assets/nopriority.png'
import img4 from '../../assets/urgent.png'
import img3 from '../../assets/high.png'
import img2 from '../../assets/medium.png'
import img1 from '../../assets/low.png'
import done from '../../assets/Done.png'
import Cancelled from '../../assets/canceled.png'
import backlogimg from '../../assets/backlog.png'
import inprogressimg from '../../assets/in progress.png'
import todo from '../../assets/to do.png'

const CardUser = (props) => {
    const [available, setavailable] = useState(false);
    let dotuser;
    
    const [users, setusers] = useState([]);

    useEffect(() => {
        hello();
    }, []);

    async function hello() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();

        setusers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }


    }
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
      };
    const statusImageMap={
        "Todo": todo,
        "In progress":inprogressimg,
        "Backlog":backlogimg,
        "Done":done,
        "Cancelled":Cancelled,

    }

      useEffect(() => {
        users.map((user) => {
                               
            if(
                props.ticket &&
                 user.id === props.ticket.userId){
                    setavailable(user.available);
                
            }  })   
      }, [users])
      
      
    //   const usrImage=usrImageMap[props.ticket.userId]||usr1;
      const imgSrc = priorityImageMap[props.ticket.priority] || img0;
      const statusImgSrc=statusImageMap[props.ticket.status]||todo;
    if(available===true){
        dotuser=<div className='availableUser' />;

    }else{
        dotuser=<div className='notavailableUser' />;
    }
   
    

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <text className='cardId'>{props.ticket.id}</text>
                    <text className='cardTitle'><img  src={statusImgSrc} alt='img'></img>{props.ticket.title}</text>
                </div >
            </div>


            <div className='lowerBox'>
                <div className='priorityBox'><img className='priorityImg' src={imgSrc} alt='logo' /></div>

                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='logo' />
                    <tag className='tagText'>{props.ticket.tag}</tag>
                </div>

            </div>
        </div>
    );
};

export default CardUser;