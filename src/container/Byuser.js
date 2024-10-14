import React from 'react'
import { useEffect, useState } from 'react';
import '../components/Status.css'
import plusmore from '../assets/plusmore.png'
import CardUser from '../components/Cards/Card1';
import availableimg from '../assets/availableimg.png'
import notavailableimg from '../assets/notavailableimg.png'

import usr1 from '../assets/usr-1.png'
import usr2 from '../assets/usr-2.png'
import usr3 from '../assets/usr-3.png'
import usr4 from '../assets/usr-4.png'
import usr5 from '../assets/usr-5.png'
import usr6 from '../assets/usr-6.png'
import usr7 from '../assets/usr-7.png'

const Byuser = (props) => {
    let available=true;
    const [tick, setTick] = useState([{ "id": "CAM" }]);
    const [users, setusers] = useState([{ "id": "CAM" }])
    const [usermass, setusermass] = useState([]);

    useEffect(() => {

        hello();
    }, []);

    useEffect(() => {
        // useridfunc();
        count();
    }, [tick,users,props.order])


    async function hello() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();


            setTick(result.tickets);
            setusers(result.users);
            // console.log("tickets", users);

        } catch (error) {
            console.error("Error:", error);
        }


    }

    function count() {
        let masspre = [];
        users.forEach((user) => {
            let temp = [];
            tick.forEach((ticket) => {
                
                if (ticket.userId === user.id) {

                    temp.push(ticket);
                }
            }

            )
            if(props.order==="Title"){
                temp.sort((a, b) => a.title.localeCompare(b.title));
            
            }else{
                
                temp.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
           
            }
            
            masspre.push(temp);
           
        })

        setusermass(masspre);
        
        console.log("hello this is by user");
        
    }
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
      };

  return (
        <div className='Boards'>
            {usermass.map((user) => {
                return (
                    <div className='Board'>
                        <div className='boardHeading'>
                            <img src={user[0] && usrImageMap[user[0].userId]||usr1} className='headingImg2' alt=''></img>
                            
                            {
                                
                                users.map((item) => {
                                    // return item.id === user[0].userId ? (
                                        // let usex=user[0];
                                        if(
                                            user[0] &&
                                             item.id === user[0].userId){
                                                available=item.available;
                                                
                                            return(
                                                <p className='cText' style={{ width: "500px" }}>{item.name}</p>
                                            )
                                        }
                                        return null;
                                        
                                    // ) : null;
                                })
                            }
                            
                               
                            <p className='cText'>{user.length}</p>
                            {
                            available && <img src={availableimg} className='dot' alt='img' />
                            }
                            {
                                (!available)&&<img src={notavailableimg} className='dot' alt='img'/>
                            }
                            <div className='boardHeading' id='pluske'>

                                <img src={plusmore} className='headingImg' alt=''></img>
                            </div>


                        </div>

                        <div className='Cards'>

                            {
                                user.length > 0 &&
                                user.map((ticket) => {
                                    return (
                                        (<CardUser ticket={ticket} available={available}></CardUser>)
                                    )
                                })
                            }
                        </div>

                    </div>
                );
            })}
            </div>
    )
}

export default Byuser