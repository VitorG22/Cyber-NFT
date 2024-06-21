import { useEffect, useRef } from "react"

import "./Sass/dropArea.css"

export default function DropArea({ labelText, FunctionToSetFilePath }: { labelText: string, FunctionToSetFilePath: React.Dispatch<React.SetStateAction<string | ArrayBuffer | undefined>> }) {
    const $dropArea = useRef<HTMLLabelElement>(null)


    useEffect(() => {
        // const $dropArea = document.getElementById("modalDropArea")

        $dropArea.current?.addEventListener("dragover", (e) => {
            e.preventDefault()
            console.log("over")
        })
        $dropArea.current?.addEventListener("dragenter", (e) => {
            e.preventDefault()
            console.log("enter")
        })
        $dropArea.current?.addEventListener("drop", (e) => {
            e.preventDefault()
            console.log("drop")
        })
    }, [])


    function HandleReadFile(file: FileList | null) {

        if (!file) return
        console.log(file)

        let reader = new FileReader()
        reader.onload = () => {
            console.log("reader init")
            if (reader.result != null) {
                console.log(reader.result)
                FunctionToSetFilePath(reader.result)
            }
        }

        reader.readAsDataURL(file[0])
    }

    return (
        <>
            <p className='ModalImageInput'>{labelText}</p>
            <input
                type='file'
                accept='image/png image/jpeg'
                id={labelText}
                className='modalDropAreaInput'
                onChange={(e) => HandleReadFile(e.target.files)}
            />
            <label
                htmlFor={labelText}
                className='modalDropArea'
                id='modalDropArea'
                ref={$dropArea}
                onDrop={(e) => HandleReadFile(e.dataTransfer.files)}
            >
                Select or Drop Here
            </label>
        </>
    )
}