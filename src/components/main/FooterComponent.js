import React from "react"

const FooterComponent = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left" style={{backgroundColor: "blue", position: "relative", bottom: "0", left: "0", color: "white"}}>
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Footer Content</h5>
                <p>Here you can use rows and columns to organize your footer content.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3" style={{color: "white"}}>
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                    <li><a href="#!">Link 3</a></li>
                    <li><a href="#!">Link 4</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3" style={{color: "white"}}>
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                    <li><a href="#!">Link 3</a></li>
                    <li><a href="#!">Link 4</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3" style={{backgroundColor: "blue", position: "relative", bottom: "0", left: "0", color: "white"}}>© 2021 Copyright:
        <a href="https://mdbootstrap.com/"> Nea Bebe car service</a>
    </div>

</footer>

export default FooterComponent