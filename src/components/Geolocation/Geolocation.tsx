import React, {Component} from "react";

type StateType = {
    long: number | string
    lat: number | string
}
class Geolocation extends Component<{}, StateType>{
    constructor(props: any){
        super(props)
        this.state ={
            long: "",
            lat: ""
        }
    }


    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position)=> this.setState({long: position.coords.longitude, lat: position.coords.latitude}) , (position) => console.log(position))
    }
    // doesnt work because typescript ... sigh
    componentDidUpdate(){
        fetch(`api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=1e219ed5464a4a5149059a5abb7e04b3`)
        .then(res=> res.json())
        .then(json => console.log(json))
    }

    render(){
        return(
            <div>
                <h1>Geolocation Component to get user Location attributes : to continue turn on  device location</h1>
                <h4>latitude: {this.state.lat}</h4>
                <h4>longitude: {this.state.long}</h4>
            </div>
        )
    }
}

export default Geolocation
