
import React, { useState } from "react";

function Contact() {
	const [showDetails, setShowDetails] = useState(false);

	const handleContactClick = (e) => {
		e.preventDefault();
		setShowDetails(true);
	};

	return (
		<div className="page">
			<h1>Contact Us</h1>
			{!showDetails ? (
				<form className="form" onSubmit={handleContactClick}>
					<button type="submit">Contact</button>
				</form>
			) : (
				<div className="contact-details" style={{marginTop: '20px', fontSize: '18px'}}>
					<p><strong>Name:</strong> HDIMS</p>
					<p><strong>Contact No:</strong> +0123456789</p>
					<p><strong>Email ID:</strong>HDIMS@gmail.com</p>
				</div>
			)}
		</div>
	);
}

export default Contact;
