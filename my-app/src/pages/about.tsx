import React from 'react';
import Footer from '@/components/general/footer';
import '@/app/about.css';

const About = () => (
    <div style={{position: 'relative'}}>
        <div className="container">
            <div className="logoContainer" onClick={() => window.location.href = "/"} style={{cursor: "pointer"}}>
                <img src="/LOGO_TEXTO.png" alt="Logo" className="centeredImage"/>
            </div>
            <h1 className="title">tu mesa de proyectos</h1>
            <div className="aboutUsContainer">
                <h1> Bienvenido a Table! Tu mesa de proyectos.</h1>
                <p>
                    Table será tu nueva puerta de acceso al mundo de la arquitectura y el diseño de proyectos. Con Table 
                    podrás buscar y encontrar aquellos profesionales que te ayudarán a concretar tus sueños. No importa 
                    que no conozcas ninguna oficina de arquitectura, o que no sepas en qué se especializan los distintos 
                    estudios de diseño. Table te ayuda a conocer y comparar, para que puedas elegir como más te convenga.
                </p>
                <p>
                    Esta plataforma se origina de nuestra experiencia personal en el mercado de la arquitectura. Tras 
                    algunos años ejerciendo esta profesión, nos dimos cuenta de que las personas no saben bien qué hacemos 
                    los arquitectos, o si es que nos especializamos en algún tipo de proyecto en particular. Esta falta de
                    información es un gran problema al momento de elegir, ya que no se tiene el conocimiento real de cómo 
                    discriminar entre oficinas de arquitectura. Finalmente, las personas escogen a la oficina de arquitectura
                     que les recomiendan sus conocidos, o bien optan por un arquitecto de su círculo cercano, eligiendo no 
                     necesariamente aquella que sea más adecuada para el proyecto que quieren desarrollar.
                </p>
                <p>
                    Además, sabemos por experiencia que como arquitecto, salir y darse a conocer en el mercado de la 
                    arquitectura no es cosa fácil. Los arquitectos dependemos muchas veces del “boca a boca”. Table te ayuda 
                    a mostrar tu trabajo, para que compitas de igual a igual con oficinas de mayor experiencia y puedas 
                    ampliar tu exposición para darte a conocer ante un más amplio círculo de futuros clientes. Con Table te 
                    emparejamos la cancha.
                </p>
                <h2>
                    todos los derechos reservados
                </h2>
            </div>
        </div>
    </div>
)

export default About;