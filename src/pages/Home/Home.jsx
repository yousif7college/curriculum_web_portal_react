import React from 'react'
import "./Home.scss"
import { Image } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'

export default function Home() {
    return (
        <div className="Home">
            <div className="shade">
                <Image src={logo} />
                <h1>University Of Baghdad</h1>
                <h2>Curriculum Web Portal</h2>
            </div>
        </div>
    )
}
