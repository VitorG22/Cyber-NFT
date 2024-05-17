import { ReactNode } from "react";
import './Sass/loading.css'

export default function Loading(props: {
    class: 'skeleton' | 'round' | 'pulse' | 'square'
}): ReactNode {

    switch (props.class) {
        case "skeleton":
            return (
                <span className="skeleton">
                    <div className='penunbra'></div>
                </span>
            )
        case "round":
            return (
                <span className="round">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </span>
            )
        case "pulse":
            return (
                <span className="pulse"></span>
            )
        case "square":
            return (
                <span className="square">
                    <div className='box1'></div>
                    <div className='box2'></div>
                    <div className='box3'></div>
                </span>
            )
    }
}