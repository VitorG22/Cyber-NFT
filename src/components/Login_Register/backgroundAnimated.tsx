import { ReactNode, useEffect } from "react";
import { ArtArray } from "../../utils/ArtsArray";

export function BackGroundAnimated(): ReactNode {


    const backgroundImagesPosition = [
        {
            'imagePath': ArtArray[2].path,
            'X': 10,
            'Y': 10,
            'Z': 10,
            'width': '200px',
            'aspect': 3 / 3,
            'blur': '1px'
        },
        {
            'imagePath': ArtArray[6].path,
            'X': 17,
            'Y': 56,
            'Z': 10,
            'width': '120px',
            'aspect': 2 / 3,
            'blur': '1px'
        },
        {
            'imagePath': ArtArray[26].path,
            'X': 33,
            'Y': 28,
            'Z': -10,
            'width': '60px',
            'aspect': 2 / 3,
            'blur': '2px'
        },
        {
            'imagePath': ArtArray[32].path,
            'X': 29,
            'Y': 60,
            'Z': 10,
            'width': '60px',
            'aspect': 3 / 3,
            'blur': '5px'
        },
        {
            'imagePath': ArtArray[7].path,
            'X': 53,
            'Y': 10,
            'Z': 10,
            'width': '130px',
            'aspect': 4 / 3,
            'blur': '1px'
        },
        {
            'imagePath': ArtArray[14].path,
            'X': 80,
            'Y': 35,
            'Z': 10,
            'width': '120px',
            'aspect': 2 / 3,
            'blur': '1px'
        },
        {
            'imagePath': ArtArray[28].path,
            'X': 78,
            'Y': 65,
            'Z': 10,
            'width': '500px',
            'aspect': 3 / 3,
            'blur': '4px'
        },
        {
            'imagePath': ArtArray[17].path,
            'X': 62,
            'Y': 60,
            'Z': 10,
            'width': '60px',
            'aspect': 1 / 1,
            'blur': '10px'
        },
        {
            'imagePath': ArtArray[9].path,
            'X': 67,
            'Y': 18,
            'Z': 10,
            'width': '60px',
            'aspect': 2 / 3,
            'blur': '2px'
        },
        {
            'imagePath': ArtArray[41].path,
            'X': 50,
            'Y': 80,
            'Z': 10,
            'width': '200px',
            'aspect': 3 / 2,
            'blur': '1px'
        },
    ]

    useEffect(() => {

        var imagesElements = Array.from(document.getElementsByClassName('imageAnimatedCard'))
        imagesElements.forEach((element, index) => {
            var HTMLElement = element as HTMLElement
            HTMLElement.style.transition = `ease 10s`

            var countX = 0
            setInterval(() => {
                var stepCount = Math.random()
                HTMLElement.style.transform = `translate(${backgroundImagesPosition[index].X + Math.cos(countX * 2)}vw,${backgroundImagesPosition[index].Y - Math.sin(countX * 2)}vh)`
                countX += stepCount
            }, 10000);


        })
    }, [])


    return (

        <div className='BackGroundAnimated'>
            {backgroundImagesPosition.map((element) => {
                return <div
                    className="imageAnimatedCard"
                    key={element.imagePath}
                    style={{
                        'display': 'flex',
                        'width': `${element.width}`,
                        'position': 'absolute',
                        'transform': `translate(${element.X}vw,${element.Y}vh)`,
                        'zIndex': `${element}`,
                        'aspectRatio': `${element.aspect}`,
                        'overflow': 'hidden',
                        'alignItems': 'center',
                        'borderRadius': '15px',
                        'filter': `blur(${element.blur})`,
                        'opacity': '15%'
                    }}>
                    <img
                        src={element.imagePath}
                        style={{ 'display': 'flex', 'width': '100%' }} />
                </div>
            })}
        </div>
    )
}

