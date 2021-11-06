import React from "react";
import "../Stylesheets/FooterStyles.css";

function Footer(){
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <p>
                copyright &#169; {year}
            </p>
        </footer>
    )
}

export default Footer;