import {Button} from "react-bootstrap";


export const NotFoundPage = () => {

    return (

        <div className={"page-not-found"}>
            <img className={"img-fluid"} src={require('../../assets/images/404.png')}/>
            <div className={"text-center pt-5"}>
                <Button className={"go-home-btn py-2 px-5"} href={"/"}>
                    Home
                </Button>

            </div>
        </div>
    );
}