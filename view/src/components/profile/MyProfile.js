import React, { Component } from 'react';
import MyInfo from './MyInfo'
import MyPostsList from './MyPostsList'
import Navbar from '../home/Navbar'


export class MyProfile extends Component {
    state={
        myInfo:{
            name:'Asma',
            email:'Asmaa.ALfauri@gmail.com',
            phoneNo: '0777522506'
        },
        myPost:[
          {
            title:'q1 for html',
            code:'<html><html/>'
           },
           {
            title:'q2 for html',
            code:'<html><html/>'
           }
        ]
    }
      
    render() {
        const {myInfo,myPost}=this.state
        return (
            <div>
                <MyInfo myInfo={myInfo}/>
                <MyPostsList myPost={myPost}/>
            </div>
        )
    }
}

export default MyProfile
