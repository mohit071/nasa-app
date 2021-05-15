import React, { Component } from 'react';
import _ from 'lodash';
// components
import Loader from './loader';
// services
import asteroidService from '../services/asteroidService';

class Asteroid extends Component {
    constructor(){
        super();
         this.state = {
             data : {
                 astNum : '',
                 currentAsteroid : {}
             },
             isLoading : false,
             hasError : true,
         }
    }
    


    handleChange=(e)=>{
        let data = {...this.state.data};
        const {astNum} = this.state.data;
        const  {name , value} = e.currentTarget;
        let hasError;
        data[name] = value;
    
        if(value.trim().length < 0){
            hasError = true;
        }
        else{
            hasError = !(/^\d+$/.test(value));
        }
         
        this.setState({data,hasError});
    }

    submitHandler=async()=>{
        this.setState({isLoading : true});
        try {
            const {data :responseData } = await asteroidService.getAsteroids(this.state.data.astNum);
            const {
                name,
                nasa_jpl_url,
                is_potentially_hazardous_asteroid
             } = responseData;

            const currentAsteroid = {
                 name,
                 nasa_jpl_url,
                 is_potentially_hazardous_asteroid
             };
             
            let data = {...this.state.data};
            data.currentAsteroid = currentAsteroid;
            this.setState({ data,isLoading : false });


        } catch (error) {
            alert(error.message);
            this.setState({isLoading : false});
        }
    }

    selectRandomAsteroid(asteroids){
       const id = Math.floor((Math.random()*20));
       const {
        name,
        nasa_jpl_url,
        is_potentially_hazardous_asteroid
       } = asteroids[id];

       const asteroid = {
           name,
           nasa_jpl_url,
           is_potentially_hazardous_asteroid
       }

       return asteroid;
    }

    randomHandler=async()=>{
        this.setState({isLoading : true});
        try {
            const { 
                data : responseData
            } = await asteroidService.getRandomAsteroid();
            const { near_earth_objects : asteroids } = responseData;
            const asteroid = this.selectRandomAsteroid(asteroids);
            let data = {...this.state.data};
            data.currentAsteroid = asteroid;
            this.setState({ data,isLoading : false })
        }
        catch (error) {
            alert(error.message);
            this.setState({isLoading : false})
        }
    }


    renderField(field){
        const asteroid = this.state.data.currentAsteroid;

        return (
            <div key={field} className="field-container">
            <div className = "field-header">
                {field.toUpperCase()}
            </div>
            {field !=='nasa_jpl_url' &&
                <div className = "field-data">
                {String(asteroid[field])}
            </div>          
            }

            {field ==='nasa_jpl_url' &&
                <div className = "field-data">
                    <a href={`${asteroid[field]}`} target='_blank' rel="noreferrer"> navigate</a>
            </div>           
            }
            </div>

        )
    }


    render() { 
        const currentAsteroid = {...this.state.data.currentAsteroid}
        return ( 
            <React.Fragment>
            {this.state.isLoading && <Loader></Loader>}

            {!this.state.isLoading && 
            <React.Fragment>
                <input type="text"
             value={this.state.data.astNum} 
             onChange={(e)=>this.handleChange(e)} 
             placeholder="Enter valid asteroid Id"
             className = "input" 
             name="astNum" 
             id = "astdNum" 
             />
            <button 
            className ="button submit-button" 
            onClick={this.submitHandler}  
            disabled={this.state.hasError}>
                Submit
            </button>
            <button 
            className ="button random-button" 
            onClick={this.randomHandler}>
                Random
            </button>
            {
                !_.isEmpty(currentAsteroid) && 
                Object.keys(currentAsteroid).map((field)=>{
                    return this.renderField(field);
                })

            }
            </React.Fragment>
            }
            
            </React.Fragment>

         );
    }
}
 
export default Asteroid;