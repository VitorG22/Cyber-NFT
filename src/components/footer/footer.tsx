import { ReactNode } from "react";
import './sass/footer.css'

export default function Footer():ReactNode{
    return(
        <div className="footerSection" id='Contact'>
            <section>
                <ul>
                    <li><p>Resources</p></li>
                    <li><a>Blog</a></li>
                    <li><a>Why Us?</a></li>
                    <li><a>Customer Review</a></li>
                </ul>
            </section>
            <footer>
                <ul>
                    <li><button>information</button></li>
                    <li><button>Terms of uses</button></li>
                </ul>
                    <p>Merely illustrative images</p>
            </footer>
                
        </div>
    )
}