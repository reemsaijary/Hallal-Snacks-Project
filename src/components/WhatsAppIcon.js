
import { FaWhatsapp } from 'react-icons/fa'; 
import './WhatsAppIcon.css'; 

const WHATSAPP_NUMBER = "96103675158"; 

function WhatsAppIcon() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <a 
      href={whatsappLink} 
      className="whatsapp-fixed-btn" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-text">Chat with us</span>
      <FaWhatsapp size={25} />
    </a>
  );
}

export default WhatsAppIcon;