import React from 'react';
import '../../styles/faltal.css';

const Fatal = (props) => (
    <div>
    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>4<span></span>4</h1>
			</div>
			<h2>Oops! Page Not Be Found</h2>
            <p>{props.mensaje}</p>
			<a href="/">Regresa a la pagina de Inicio</a>
		</div>
	</div>
    </div>
);

export default Fatal;