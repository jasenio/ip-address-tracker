import {useState, useEffect, useContext} from "react";
import {useMediaQuery} from "react-responsive";
import {LLContext} from "./App";
import axios from "axios"
export const DisplayIP = () => {
    const desktop =  useMediaQuery({
        query: '(min-width: 800px)'
      });
    const [IP, setIP] = useState("");
    const [DIP, setDIP] = useState("");
    const [City, setCity] = useState("");
    const [Region, setRegion] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [Timezone, setTimezone] = useState("");
    const [Isp, setIsp] = useState("");
    const {setLL} = useContext(LLContext);
    let options = {
        method: 'GET',
        url: 'https://geo.ipify.org/api/v2/country,city?apiKey=at_eCm91cK9Vzz6pWdP6YZFHguaTLblI&ipAddress=' + IP,
    };
    useEffect(()=>{
        options = {...options, url: 'https://geo.ipify.org/api/v2/country,city?apiKey=at_eCm91cK9Vzz6pWdP6YZFHguaTLblI&ipAddress= ' + IP}
        console.log(IP);
        console.log(options.url);
    }, [IP]);
    const fetchAPI = () => {
        axios.request(options).then(function (response) {
            setDIP(response.data.ip);
            if (response.data.location.city !== undefined) setCity(response.data.location.city + ",");
            setRegion(response.data.location.region);
            if (response.data.location.postalCode !== undefined) setPostalCode(response.data.location.postalCode);
            setTimezone(response.data.location.timezone);
            setIsp(response.data.isp);
            console.log(response.data.location);
            console.log(response.data.location.lat);
            setLL({
                Lat: response.data.location.lat,
                Lon: response.data.location.lng
            })
        }).catch(function (error) {
            console.error(error);
            alert("Not a valid IP");
        });
    }
    return <div className = "DisplayIP" >
                <div className = "title">IP Address Tracker</div>
                <div className = "enterIP">
                    <input type = "text" onChange = {
                        (event) => {
                            setIP(event.target.value);
                        }
                    } placeholder = "Search for any IP Address or domain"></input>
                    <button className = "submit" onClick = {fetchAPI}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
                    </button>
                </div>
            <div className = "IPInfo">
                <div className ="DIP">
                    <p>IP ADDRESS</p>
                    {DIP}
                </div>
                {desktop && <hr/>}
                <div className ="Location">
                    <p>LOCATION</p>
                    {City + " " + Region + " " + PostalCode}
                </div>
                {desktop && <hr/>}
                <div className ="Timezone">
                    <p>TIMEZONE</p>
                    {Timezone}
                </div>
                {desktop && <hr/>}
                <div className ="Isp">
                    <p>ISP</p>
                    {Isp}
                </div>
            </div>
    </div>
}