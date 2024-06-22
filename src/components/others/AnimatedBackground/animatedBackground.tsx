import { ReactNode } from "react";
import './sass/animatedBgStyle.css'
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'


export default function LightsBackground(): ReactNode {
    return (
        <div className="background">
            <span></span>
            <span></span>
        </div>
    )
}

export function PurpleBackground() {
    return (
        <section className='BackgroundContainer' >
            <div className='stopPropagationLayer'></div>
            <ShaderGradientCanvas
                importedFiber={{ ...fiber, ...drei, ...reactSpring }}
                style={{
                    position: 'absolute',
                    top: 0,
                }}
            >
                <ShaderGradient
                    cDistance={3.5}
                    cPolarAngle={0}
                    // cAzimuthAngle={0}
                    positionX={0}
                    positionY={0}
                    positionZ={1.4}
                    rotationX={0}
                    rotationY={0}
                    rotationZ={90}

                    type="waterPlane"
                    color1="#000000"
                    color2="#000000"
                    color3='#390048'
                    uSpeed={.04}
                    range='disabled'
                    uDensity={1}
                    uStrength={2}
                    brightness={3.5}
                    reflection={1}

                    dampingFactor={0}
                    grain='off'
                    toggleAxis={false}
                />


            </ShaderGradientCanvas>
        </section>

    )

}