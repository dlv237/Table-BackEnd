import Footer from "../components/general/footer";

export default function Edit() {
    return (
        <div className="container">
            <div className="logoContainer">
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage" />
            </div>
            <h1 className="title">tu mesa de proyectos</h1>
            <h1 className="title" style={{marginTop: "20vh"}}>Estamos trabajando para usted!</h1>
            <Footer />
        </div>
    );
}